import test from 'node:test';
import assert from 'node:assert/strict';
import { getEditorialTemporalStatus } from '../src/utils/editorialStatus.ts';

const semot = { eventStart: '2026-09-20', eventEnd: '2026-09-20' };

test('event status moves through upcoming, current, recent and past', () => {
  assert.equal(getEditorialTemporalStatus('2026-09-18', semot), 'upcoming');
  assert.equal(getEditorialTemporalStatus('2026-09-20', semot), 'current');
  assert.equal(getEditorialTemporalStatus('2026-09-21', semot), 'recent');
  assert.equal(getEditorialTemporalStatus('2026-10-20', semot), 'recent');
  assert.equal(getEditorialTemporalStatus('2026-10-21', semot), 'past');
});

test('date ranges stay current through the inclusive final day', () => {
  const ormik = { eventStart: '2026-09-16', eventEnd: '2026-09-19' };
  assert.equal(getEditorialTemporalStatus('2026-09-15', ormik), 'upcoming');
  assert.equal(getEditorialTemporalStatus('2026-09-18', ormik), 'current');
  assert.equal(getEditorialTemporalStatus('2026-09-19', ormik), 'current');
  assert.equal(getEditorialTemporalStatus('2026-09-20', ormik), 'recent');
});

test('undated stories use a neutral published state', () => {
  assert.equal(getEditorialTemporalStatus('2026-09-18', {}), 'published');
});

test('invalid dates and ranges are rejected', () => {
  assert.throws(() => getEditorialTemporalStatus('2026-02-30', semot), RangeError);
  assert.throws(() => getEditorialTemporalStatus('2026-09-18', { eventStart: '2026-09-20', eventEnd: '2026-09-19' }), RangeError);
  assert.throws(() => getEditorialTemporalStatus('2026-09-18', semot, -1), RangeError);
});
