import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { margondaPrograms } from '../src/data/programs.ts';
import { september2026 } from '../src/data/admissions.ts';
import { tuition } from '../src/data/tuition.ts';
import { calculateTuition, resolveProgramSelection, getDefaultTuitionWave } from '../src/utils/tuition.ts';
import { formatRupiah } from '../src/utils/currency.ts';

const expectedSemesters = {
  'rekayasa-perangkat-lunak': 3980000, informatika: 4980000,
  'teknologi-informasi': 4980000, 'sistem-informasi': 4980000,
  'sastra-inggris': 3980000, 'ilmu-komunikasi': 4980000,
  akuntansi: 4980000, manajemen: 4980000,
  'teknik-elektro': 3980000, 'teknik-industri': 3980000, psikologi: 3980000,
};
const expectedSsp = { i: 2500000, ii: 3000000, iii: 3600000, iv: 4500000, v: 5400000, vi: 6000000, khusus: 6000000 };

for (const [programId, semester] of Object.entries(expectedSemesters)) {
  test(`${programId}: verified semester tuition and all seven complete estimates`, () => {
    for (const [waveId, ssp] of Object.entries(expectedSsp)) {
      const result = calculateTuition({ programId, waveId });
      assert.equal(result.semesterTuition, semester);
      assert.equal(result.registration, 260000);
      assert.equal(result.preCollege, 1600000);
      assert.equal(result.ssp, ssp);
      assert.equal(result.semesterOneSubtotal, 1860000 + semester);
      assert.equal(result.initialTotal, 1860000 + semester + ssp);
      assert.equal(result.surcharge, semester - 3980000);
      assert.equal(result.periodId, september2026.id);
      assert.ok(Number.isSafeInteger(result.initialTotal));
    }
  });
}

test('tuition mappings exactly cover shared programs and shared waves', () => {
  assert.deepEqual(margondaPrograms.programs.map(p => p.id).sort(), Object.keys(expectedSemesters).sort());
  assert.deepEqual(Object.keys(tuition.sspByWave).sort(), september2026.waves.map(w => w.id).sort());
  assert.equal(tuition.surchargeProgramIds.length, 6);
  assert.ok(tuition.surchargeProgramIds.every(id => expectedSemesters[id] === 4980000));
});

test('invalid and unsupported inputs return null, including prototype property names', () => {
  for (const programId of ['', 'd3', 's1keperawatan', 's2mm', 's2ti', 'hubungan-internasional', 'ilmu-hukum', '__proto__']) {
    assert.equal(calculateTuition({ programId, waveId: 'i' }), null);
  }
  for (const waveId of ['', 'vii', 'VI', 'toString', '__proto__']) {
    assert.equal(calculateTuition({ programId: 'informatika', waveId }), null);
  }
});

test('all shared slugs resolve to the correct program; missing/invalid query safely defaults', () => {
  for (const program of margondaPrograms.programs) {
    assert.equal(resolveProgramSelection(program.slug).program.id, program.id);
    assert.equal(resolveProgramSelection(program.slug).invalid, false);
  }
  for (const value of ['', 'INFORMATIKA', '<script>', 's2mm']) {
    assert.equal(resolveProgramSelection(value).program.id, 'rekayasa-perangkat-lunak');
    assert.equal(resolveProgramSelection(value).invalid, true);
  }
  assert.equal(resolveProgramSelection(null).invalid, false);
});

test('automatic selection respects every inclusive shared wave boundary', () => {
  for (const wave of september2026.waves) {
    assert.equal(getDefaultTuitionWave(wave.startDate), wave.id);
    assert.equal(getDefaultTuitionWave(wave.endDate), wave.id);
  }
  assert.equal(getDefaultTuitionWave('2025-10-14'), null);
  assert.equal(getDefaultTuitionWave('2026-10-03'), null);
  assert.equal(getDefaultTuitionWave('2027-01-01'), null);
  assert.equal(getDefaultTuitionWave('2026-09-17'), 'khusus');
  assert.throws(() => getDefaultTuitionWave('invalid'), RangeError);
});

test('SSP comparison is independent of semester surcharges, including equal VI/Khusus', () => {
  const low = calculateTuition({ programId: 'informatika', waveId: 'i' });
  const high = calculateTuition({ programId: 'informatika', waveId: 'khusus' });
  assert.equal(high.initialTotal - low.initialTotal, 3500000);
  assert.equal(high.ssp, calculateTuition({ programId: 'psikologi', waveId: 'vi' }).ssp);
});

test('rupiah formatting is consistent for zero and multi-million values', () => {
  assert.equal(formatRupiah(0), 'Rp0');
  assert.equal(formatRupiah(3980000), 'Rp3.980.000');
  assert.equal(formatRupiah(12840000), 'Rp12.840.000');
});

test('legacy S1 scenarios preserve subtotal/SSP while total explicitly includes full SSP', () => {
  // Extract only the historical data literal, never execute the legacy application.
  const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const literal = source.match(/const tierData = (\{[\s\S]*?\n\});/)[1];
  const legacy = runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000 });
  for (const [programId, tier] of [['rekayasa-perangkat-lunak', 's1umum'], ['informatika', 's1khusus'], ['manajemen', 's1khusus']]) {
    for (const [index, waveId] of ['i', 'iii', 'vi'].map(id => [Object.keys(expectedSsp).indexOf(id), id])) {
      const old = legacy[tier];
      const result = calculateTuition({ programId, waveId });
      assert.equal(result.semesterOneSubtotal, old.pendaftaran + old.prakuliah + old.bajuLab + old.kuliah);
      assert.equal(result.ssp, old.sspWave[index]);
      assert.equal(result.initialTotal, result.semesterOneSubtotal + old.sspWave[index]);
    }
  }
});
