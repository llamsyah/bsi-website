import test from 'node:test';
import assert from 'node:assert/strict';
import { margondaPrograms } from '../src/data/programs.ts';
import { september2026 } from '../src/data/admissions.ts';
import { calculateTuition, resolveProgramSelection } from '../src/utils/tuition.ts';
import { getCostComposition, getSspComparison } from '../src/utils/tuitionVisuals.ts';

const scenariosFor = programId => september2026.waves.map(wave => calculateTuition({ programId, waveId: wave.id }));

test('all 77 compositions conserve the approved total and use its exact four components', () => {
  for (const program of margondaPrograms.programs) {
    for (const result of scenariosFor(program.id)) {
      const parts = getCostComposition(result);
      assert.deepEqual(parts.map(part => part.key), ['registration', 'preCollege', 'semesterTuition', 'ssp']);
      assert.deepEqual(parts.map(part => part.amount), [result.registration, result.preCollege, result.semesterTuition, result.ssp]);
      assert.equal(parts.reduce((sum, part) => sum + part.amount, 0), result.initialTotal);
      assert.ok(Math.abs(parts.reduce((sum, part) => sum + part.fraction, 0) - 1) < 1e-12);
      for (const part of parts) assert.ok(Math.abs(part.fraction * result.initialTotal - part.amount) < 1e-8);
    }
  }
});

test('all wave comparisons use row SSP minus the explicit selected reference', () => {
  const scenarios = scenariosFor('informatika');
  for (const [selectedIndex, selected] of scenarios.entries()) {
    const rows = getSspComparison(scenarios, selected);
    assert.equal(rows.length, 7);
    rows.forEach((row, index) => {
      assert.equal(row.wave.id, scenarios[index].wave.id);
      assert.equal(row.amount, scenarios[index].ssp);
      assert.equal(row.difference, scenarios[index].ssp - selected.ssp);
      assert.equal(row.fraction, scenarios[index].ssp / 6000000);
      assert.equal(row.relation, index === selectedIndex ? 'selected' : index < selectedIndex ? 'earlier' : 'later');
    });
  }
});

test('the four requested scenarios retain exact initial totals and semester tuition', () => {
  for (const [programId, waveId, initial, semester] of [
    ['rekayasa-perangkat-lunak', 'i', 8340000, 3980000],
    ['informatika', 'iv', 11340000, 4980000],
    ['manajemen', 'vi', 12840000, 4980000],
    ['sistem-informasi', 'khusus', 12840000, 4980000],
  ]) {
    const result = calculateTuition({ programId, waveId });
    const parts = getCostComposition(result);
    assert.equal(result.initialTotal, initial);
    assert.equal(parts.find(part => part.key === 'semesterTuition').amount, semester);
    const rows = getSspComparison(scenariosFor(programId), result);
    assert.equal(rows.find(row => row.relation === 'selected').wave.id, waveId);
    assert.equal(rows.find(row => row.relation === 'selected').difference, 0);
  }
});

test('Khusus and VI have equal bar ratios and zero difference without losing chronology', () => {
  const scenarios = scenariosFor('manajemen');
  const selected = scenarios.find(item => item.wave.id === 'vi');
  const rows = getSspComparison(scenarios, selected);
  const special = rows.find(item => item.wave.id === 'khusus');
  assert.equal(special.amount, selected.ssp);
  assert.equal(special.difference, 0);
  assert.equal(special.fraction, 1);
  assert.equal(special.relation, 'later');
  assert.equal(rows.find(item => item.wave.id === 'iv').difference, -1500000);
});

test('no wave selection retains comparison amounts but invents no selection or difference', () => {
  const rows = getSspComparison(scenariosFor('psikologi'), null);
  assert.equal(rows.length, 7);
  for (const row of rows) {
    assert.equal(row.relation, 'unselected');
    assert.equal(row.difference, null);
    assert.ok(row.amount > 0);
  }
});

test('every query-selected program feeds composition and comparison from the same result', () => {
  for (const program of margondaPrograms.programs) {
    const query = new URLSearchParams({ program: program.slug });
    const selection = resolveProgramSelection(query.get('program'));
    const result = calculateTuition({ programId: selection.program.id, waveId: 'iv' });
    assert.equal(result.program.id, program.id);
    assert.equal(getCostComposition(result).find(part => part.key === 'semesterTuition').amount, result.semesterTuition);
    const rows = getSspComparison(scenariosFor(selection.program.id), result);
    assert.equal(rows.find(row => row.relation === 'selected').amount, result.ssp);
  }
});
