import test from 'node:test';
import assert from 'node:assert/strict';
import { margondaPrograms, faculties, homeProgramPreviewSample } from '../src/data/programs.ts';
import { filterPrograms } from '../src/utils/programSearch.ts';

const programs = margondaPrograms.programs;
const expectedFaculties = {
  'teknik-informatika': ['rekayasa-perangkat-lunak', 'informatika', 'teknologi-informasi', 'sistem-informasi', 'teknik-elektro', 'teknik-industri'],
  'ekonomi-bisnis': ['akuntansi', 'manajemen'],
  'komunikasi-bahasa': ['sastra-inggris', 'ilmu-komunikasi'],
  'ilmu-kesehatan': ['psikologi'],
};
const ids = (items) => items.map((program) => program.id);

test('current Margonda offering contains exactly the eleven verified S1 programs', () => {
  assert.equal(programs.length, 11);
  assert.deepEqual(ids(programs).sort(), Object.values(expectedFaculties).flat().sort());
  assert.equal(new Set(ids(programs)).size, 11);
  assert.ok(programs.every((program) => program.degree === 'S1' && program.slug === program.id));
});

for (const [faculty, expectedIds] of Object.entries(expectedFaculties)) {
  test(`faculty filter uses the verified mapping: ${faculty}`, () => {
    assert.ok(faculties[faculty]);
    assert.deepEqual(ids(filterPrograms(programs, '', faculty)), expectedIds);
  });
}

test('all programs have day classes; only three have evening classes', () => {
  assert.ok(programs.every((program) => program.classes.includes('pagi-siang')));
  assert.deepEqual(ids(programs.filter((program) => program.classes.includes('sore-malam'))),
    ['informatika', 'sistem-informasi', 'ilmu-komunikasi']);
  assert.ok(programs.every((program) => program.classes.every((time) => ['pagi-siang', 'sore-malam'].includes(time))));
  assert.equal(margondaPrograms.fridaySaturdayAvailable, false);
});

test('only Sistem Informasi has verified accreditation; descriptions retain source provenance', () => {
  const accredited = programs.filter((program) => program.accreditation);
  assert.deepEqual(ids(accredited), ['sistem-informasi']);
  assert.equal(accredited[0].accreditation.label, 'Unggul');
  assert.ok(programs.every((program) => program.description && new URL(program.overviewSource).hostname.endsWith('bsi.ac.id')));
});

test('search ignores case, leading/trailing and repeated whitespace', () => {
  assert.deepEqual(ids(filterPrograms(programs, '  SiSTem   informasi  ')), ['sistem-informasi']);
  assert.deepEqual(ids(filterPrograms(programs, 'TEKNIK')), ['teknik-elektro', 'teknik-industri']);
});

test('search and faculty intersect, including zero results', () => {
  assert.deepEqual(ids(filterPrograms(programs, 'ilmu', 'komunikasi-bahasa')), ['ilmu-komunikasi']);
  assert.deepEqual(filterPrograms(programs, 'informatika', 'ekonomi-bisnis'), []);
  assert.deepEqual(filterPrograms(programs, 'tidak ada'), []);
});

test('all, blank and unrecognized filters safely retain query matching', () => {
  assert.equal(filterPrograms(programs).length, 11);
  assert.equal(filterPrograms(programs, '   ', 'all').length, 11);
  assert.deepEqual(ids(filterPrograms(programs, 'psikologi', 'unknown')), ['psikologi']);
  assert.equal(filterPrograms(programs, '', '').length, 11);
  assert.deepEqual(filterPrograms([], 'test', 'unknown'), []);
});

test('filtering does not mutate source data and approved Home sample is preserved', () => {
  const original = ids(programs);
  filterPrograms(programs, 'teknik', 'teknik-informatika');
  assert.deepEqual(ids(programs), original);
  assert.deepEqual(ids(homeProgramPreviewSample), ['rekayasa-perangkat-lunak', 'manajemen', 'ilmu-komunikasi', 'psikologi']);
});
