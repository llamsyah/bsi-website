import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAssistant, MAX_QUESTION_LENGTH } from '../src/assistant/resolver.ts';
import { askAssistant } from '../src/assistant/service.ts';
import { createAssistantMessage, isAssistantActionAllowed } from '../src/assistant/render.ts';
import { margondaPrograms, faculties, classTimes } from '../src/data/programs.ts';
import { september2026, registration } from '../src/data/admissions.ts';
import { campus } from '../src/data/campus.ts';
import { margondaAPreview } from '../src/data/facilities.ts';
import { scholarships } from '../src/data/scholarships.ts';
import { tuition } from '../src/data/tuition.ts';
import { calculateTuition } from '../src/utils/tuition.ts';
import { formatCalendarDate } from '../src/utils/calendarDate.ts';
import { formatRupiah } from '../src/utils/currency.ts';

const request = (question, referenceDate = '2026-09-17') => ({ question, referenceDate });
const ask = (question, date) => resolveAssistant(request(question, date));

test('offering list uses all eleven shared programs and handles daftar without confusing registration', () => {
  for (const query of ['program apa saja di Margonda?', 'DAFTAR PROGRAM', 'jurusan']) {
    const result = ask(query);
    assert.equal(result.status, 'answered');
    for (const program of margondaPrograms.programs) assert.ok(result.text.includes(program.name));
    assert.equal(result.actions[0].href, '/program-studi');
  }
});

test('program existence answers use shared description; invalid programs never gain an offering claim', () => {
  for (const name of ['Informatika', 'Psikologi']) {
    assert.match(ask(`ada ${name}?`).text, /tercantum dalam daftar program Margonda/);
  }
  for (const name of ['Astronomi', 'Kedokteran', 'D3', 'Keperawatan', 'Ilmu Hukum']) {
    assert.equal(ask(`ada ${name}?`).status, 'unsupported');
  }
  assert.equal(ask('gaji lulusan Informatika?').status, 'unsupported');
  assert.equal(ask('akreditasi program Informatika?').status, 'unsupported');
});

for (const [id, name] of Object.entries(faculties)) {
  test(`faculty query resolves ${name} before matching a program substring`, () => {
    const result = ask(`jurusan di ${name} apa saja?`);
    assert.equal(result.status, 'answered');
    for (const program of margondaPrograms.programs.filter(p => p.facultyId === id)) assert.ok(result.text.includes(program.name));
    assert.match(result.text, /mencakup:/);
  });
}

test('classes come from the shared offering, no invented evening/weekend classes', () => {
  for (const program of margondaPrograms.programs) {
    const result = ask(`S1 ${program.name} ada kelas malam?`);
    assert.equal(result.status, program.classes.includes('sore-malam') ? 'answered' : 'unsupported');
    for (const time of program.classes) assert.ok(result.text.includes(classTimes[time]));
  }
  assert.match(ask('kelas Jumat Sabtu?').text, /tidak dibuka/);
  assert.equal(ask('kelas malam?').status, 'clarify');
  assert.equal(ask('biaya kelas malam S1 Manajemen?').status, 'unsupported');
});

for (const program of margondaPrograms.programs) {
  test(`${program.name} cost response agrees with Task 06, including URL`, () => {
    const result = ask(`biaya kuliah S1 ${program.name} berapa?`);
    const expected = calculateTuition({ programId: program.id, waveId: 'khusus' });
    assert.equal(result.status, 'answered');
    assert.ok(result.text.includes(formatRupiah(expected.semesterTuition)));
    assert.ok(result.text.includes(formatRupiah(expected.initialTotal)));
    assert.match(result.text, /Bukan tagihan sekaligus atau total sampai lulus/);
    assert.equal(new URL(result.actions[0].href, 'https://example.test').searchParams.get('program'), program.slug);
  });
}

for (const wave of september2026.waves) {
  test(`${wave.label} SSP response agrees with shared fee data`, () => {
    const result = ask(`SSP ${wave.label} berapa?`);
    assert.equal(result.status, 'answered');
    assert.ok(result.text.includes(formatRupiah(tuition.sspByWave[wave.id])));
    assert.match(result.text, /bukan pernyataan bahwa gelombangnya sedang dibuka/);
  });
}

test('SSP definition, numeric wave aliases and ambiguous costs', () => {
  assert.match(ask('apa itu SSP?').text, /Sumbangan Sarana Pendidikan/);
  assert.ok(ask('SSP gelombang 6?').text.includes(formatRupiah(tuition.sspByWave.vi)));
  for (const query of ['biaya?', 'SSP berapa?', 'SSP gelombang VII', 'biaya Informatika dan Manajemen']) assert.equal(ask(query).status, 'clarify');
});

test('current PMB answers use every shared wave and close after the last boundary', () => {
  for (const wave of september2026.waves) {
    for (const date of [wave.startDate, wave.endDate]) assert.ok(ask('sekarang gelombang apa?', date).text.includes(`dibuka sesuai jadwal ${wave.label}`));
  }
  assert.match(ask('pendaftaran masih dibuka?', '2025-10-14').text, /belum dibuka/);
  assert.match(ask('pendaftaran masih dibuka?', '2026-10-03').text, /telah ditutup/);
  assert.match(ask('sekarang gelombang apa?', '2027-01-01').text, /Belum ada periode berikutnya/);
});

test('tuition outside active period does not imply active Wave I or Khusus', () => {
  for (const date of ['2025-10-14', '2026-10-03']) {
    const result = ask('biaya Informatika?', date);
    assert.ok(result.text.includes('Rp4.980.000'));
    assert.match(result.text, /Tidak ada gelombang aktif/);
    assert.doesNotMatch(result.text, /Estimasi komponen biaya awal/);
  }
  assert.ok(ask('biaya Informatika gelombang I', '2026-10-03').text.includes('Rp9.340.000'));
  assert.equal(ask('biaya Informatika 2027').status, 'unsupported');
});

test('specific schedule, class start and registration actions use shared sources', () => {
  assert.ok(ask('kapan Gelombang Khusus selesai?').text.includes(formatCalendarDate(september2026.waves.at(-1).endDate)));
  assert.ok(ask('kapan mulai kuliah?').text.includes(formatCalendarDate(september2026.classStart)));
  const result = ask('cara daftar?');
  assert.ok(result.text.includes('Registrasi online'));
  assert.deepEqual(result.actions.map(a => a.href), ['/pmb', registration.url]);
  assert.equal(ask('kapan gelombang VII?').status, 'clarify');
});

test('campus addresses match application data including project-confirmed Margonda B', () => {
  for (const building of campus.buildings) assert.ok(ask(`alamat ${building.name}`).text.includes(building.address));
});

test('facility answers preserve A scope and do not invent B facilities', () => {
  const result = ask('fasilitas Margonda A');
  for (const name of margondaAPreview.names) assert.ok(result.text.includes(name));
  for (const query of ['fasilitas Margonda B', 'fasilitas kampus B', 'fasilitas gedung B']) {
    assert.equal(ask(query).status, 'unsupported');
    assert.match(ask(query).text, /belum tersedia/);
    for (const name of margondaAPreview.names) assert.ok(!ask(query).text.includes(name));
  }
});

test('scholarship answers preserve source descriptions and never determine eligibility', () => {
  const result = ask('beasiswa apa saja?');
  for (const item of scholarships.items) assert.ok(result.text.includes(item.description));
  assert.match(result.text, /tidak menentukan kelayakan/);
  assert.match(result.text, /belum dikurangi beasiswa/);
  assert.equal(ask('beasiswa Golden Ticket?').status, 'unsupported');
});

test('unsupported, empty, overlong and HTML-like queries have explicit safe outcomes', () => {
  for (const query of ['ramalan cuaca', '<img src=x onerror=alert(1)>', '<script>alert(1)</script>']) assert.equal(ask(query).status, 'unsupported');
  assert.equal(ask('   ').status, 'clarify');
  assert.equal(ask('x'.repeat(MAX_QUESTION_LENGTH + 1)).status, 'clarify');
});

test('local asynchronous service keeps the structured resolver contract', async () => {
  assert.deepEqual(await askAssistant(request('biaya Manajemen?')), ask('biaya Manajemen?'));
});

test('response links allow only known internal routes and official registration', () => {
  for (const href of ['/program-studi', '/biaya-beasiswa?program=informatika', '/biaya-beasiswa#beasiswa', registration.url]) assert.equal(isAssistantActionAllowed(href), true);
  for (const href of ['javascript:alert(1)', 'data:text/html,hi', '//evil.test', '/\\evil.test', '/unknown', 'https://evil.test', '/\n/evil.test']) assert.equal(isAssistantActionAllowed(href), false);
});

test('actual renderer uses literal text nodes for user/response markup and drops unsafe actions', () => {
  // A minimal DOM sink spy: any attempted HTML parsing fails this test immediately.
  class Element {
    children = [];
    constructor(tag) { this.tag = tag; }
    append(...children) { this.children.push(...children); }
    set innerHTML(_) { throw new Error('Unsafe HTML sink'); }
  }
  const document = { createElement: tag => new Element(tag) };
  const payload = '<img src=x onerror=alert(1)><script>alert(2)</script>';
  const user = createAssistantMessage(document, payload);
  assert.equal(user.children[1].textContent, payload);
  const bot = createAssistantMessage(document, payload, { text: payload, status: 'unsupported', sourceContext: payload, actions: [{ label: payload, href: '/pmb' }, { label: 'bad', href: 'javascript:alert(1)' }] });
  assert.equal(bot.children[1].textContent, payload);
  assert.equal(bot.children[2].textContent, payload);
  assert.equal(bot.children[3].children.length, 1);
  assert.equal(bot.children[3].children[0].textContent, payload);
});
