import test from 'node:test';
import assert from 'node:assert/strict';
import { academicPrograms, programsForDegree } from '../src/data/academic.ts';
import { graduatePrograms, graduateIntake } from '../src/data/graduate.ts';
import { margondaPrograms } from '../src/data/programs.ts';
import { parseAcademicSelection, academicHref, validAcademicContext } from '../src/utils/academicSelection.ts';
import { getGraduateCost } from '../src/utils/graduateCosts.ts';
import { calculateTuition } from '../src/utils/tuition.ts';
import { resolveAssistant } from '../src/assistant/resolver.ts';
import { isAssistantActionAllowed } from '../src/assistant/render.ts';

test('normalized catalog preserves eleven S1 records and isolates two S2 offerings', () => {
  assert.deepEqual(programsForDegree('S1').map(p => p.id), margondaPrograms.programs.map(p => p.id));
  assert.equal(programsForDegree('S1').length, 11);
  assert.equal(programsForDegree('S2').length, 2);
  assert.equal(new Set(academicPrograms.map(p => p.slug)).size, 13);
  assert.ok(!academicPrograms.some(p => /hukum|internasional/.test(p.id)));
  for (const p of graduatePrograms) {
    assert.equal(p.campus, 'margonda');
    assert.deepEqual(p.classOptions, ['jumat-sabtu']);
    assert.deepEqual(p.intakePeriods, [graduateIntake.id]);
    assert.equal(p.durationSemesters, 3);
    assert.equal(calculateTuition({ programId: p.id, waveId: 'khusus' }), null);
  }
});
test('S2 admissions has no S1 wave/status/date fallback', () => {
  assert.equal(graduateIntake.registrationWindow, null);
  assert.equal(graduateIntake.lectureStart, null);
  assert.equal('waves' in graduateIntake, false);
  for (const date of ['2025-10-15', '2026-09-18', '2026-10-03']) {
    const response = resolveAssistant({ question: 'S2 pendaftaran dibuka?', referenceDate: date });
    assert.match(response.text, /belum dapat ditentukan/);
    assert.doesNotMatch(response.text, /Gelombang Khusus|21 September|Pendaftaran dibuka sesuai/);
  }
});
test('query contract handles defaults, legacy slugs, S2 inference and mismatches', () => {
  assert.equal(parseAcademicSelection('').degreeLevel, 'S1');
  for (const program of margondaPrograms.programs) {
    const state = parseAcademicSelection(`program=${program.slug}`);
    assert.equal(state.degreeLevel, 'S1'); assert.equal(state.program.id, program.id); assert.equal(state.error, null);
  }
  assert.equal(parseAcademicSelection('program=magister-manajemen').degreeLevel, 'S2');
  for (const query of ['jenjang=s2&program=manajemen', 'jenjang=s1&program=magister-manajemen', 'program=__proto__', 'jenjang=s3', 'program=%3Cscript%3E']) {
    const state = parseAcademicSelection(query); assert.ok(state.error); assert.equal(state.program, undefined);
  }
  assert.equal(validAcademicContext({ degreeLevel: 'S2', programId: 'manajemen' }).programId, undefined);
  assert.equal(validAcademicContext({ degreeLevel: 'S3' }), undefined);
});
test('deep links round trip degree/program and remain assistant-allowlisted', () => {
  for (const program of academicPrograms) for (const path of ['/program-studi', '/biaya-beasiswa', '/pmb']) {
    const href = academicHref(path, { degreeLevel: program.degreeLevel, programId: program.id });
    const state = parseAcademicSelection(href.split('?')[1]);
    assert.equal(state.program.id, program.id); assert.equal(state.degreeLevel, program.degreeLevel);
    assert.equal(isAssistantActionAllowed(href), true);
  }
});
test('published MM inconsistency and MTI alternatives are preserved without an all-in sum', () => {
  const mm = getGraduateCost('magister-manajemen');
  const mti = getGraduateCost('magister-teknologi-informasi');
  assert.equal(mm.cost.programTotal, 35000000); assert.equal(mm.cost.semesterPayment, 11700000);
  assert.deepEqual(mm.cost.installment, { count: 18, amount: 1950000 });
  assert.equal(mm.semesterProduct, 35100000); assert.equal(mm.installmentProduct, 35100000);
  assert.equal(mm.difference, 100000); assert.equal(mm.inconsistent, true);
  assert.equal(mti.cost.programTotal, 45000000); assert.equal(mti.cost.semesterPayment, 15000000);
  assert.deepEqual(mti.cost.installment, { count: 18, amount: 2500000 });
  assert.equal(mti.semesterProduct, 45000000); assert.equal(mti.installmentProduct, 45000000); assert.equal(mti.inconsistent, false);
  for (const result of [mm, mti]) {
    assert.equal(result.cost.registration, 500000); assert.equal(result.cost.matriculation, 2500000); assert.equal(result.cost.almamater, 500000);
    assert.equal(result.cost.componentInclusion, null); assert.equal(result.cost.installmentDueDates, null);
    assert.deepEqual(result.cost.exclusions, ['Remedial', 'Tesis', 'Wisuda']);
    assert.equal('initialTotal' in result, false); assert.equal('ssp' in result.cost, false);
  }
  assert.equal(getGraduateCost('manajemen'), null); assert.equal(getGraduateCost('__proto__'), null);
});
const ask = (question, context) => resolveAssistant({ question, context, referenceDate: '2026-09-18' });
test('assistant retains graduate program for follow-up costs and installments', () => {
  for (const [question, id, amount] of [['S2 TI ada?', 'magister-teknologi-informasi', '45.000.000'], ['S2 Manajemen ada?', 'magister-manajemen', '35.000.000']]) {
    const existence = ask(question); assert.equal(existence.status, 'answered'); assert.equal(existence.context.programId, id);
    const fees = ask('berapa biayanya?', existence.context); assert.ok(fees.text.includes(amount)); assert.doesNotMatch(fees.text, /Gelombang Khusus|prakuliah/);
    const installment = ask('bisa dicicil?', fees.context); assert.match(installment.text, /18 ×/);
    assert.ok(installment.actions.every(a => a.href.includes('jenjang=s2') && a.href.includes(id)));
  }
});
test('assistant resolves degree before overlapping names and avoids S1 leakage', () => {
  assert.equal(ask('biaya Manajemen?').status, 'clarify');
  assert.equal(ask('S2 biaya?').status, 'clarify');
  const prior = { degreeLevel: 'S2', programId: 'magister-manajemen' };
  assert.match(ask('SSP S2 berapa?', prior).text, /tidak mencantumkan/);
  assert.match(ask('kelas S2 kapan?', prior).text, /Jumat \/ Sabtu/);
  assert.match(ask('S1 biaya Manajemen?', prior).text, /per semester/);
  assert.equal(ask('S1 biaya Manajemen?', prior).context.degreeLevel, 'S1');
  assert.equal(ask('S2 Informatika ada?', prior).status, 'clarify');
  assert.equal(ask('S2 Hukum ada?', prior).status, 'unsupported');
  assert.equal(ask('<script>S2 TI</script>', prior).status, 'unsupported');
  assert.equal(ask('S2 TI 2027?', prior).status, 'unsupported');
});
