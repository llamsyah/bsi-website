import test from 'node:test';
import assert from 'node:assert/strict';
import { september2026 as period, registration } from '../src/data/admissions.ts';
import { getAdmissionsStatus } from '../src/utils/admissionsStatus.ts';
import { assertCalendarDate, formatCalendarDate, getJakartaDate, millisecondsUntilJakartaMidnight } from '../src/utils/calendarDate.ts';

const boundaries = [
  ['2025-10-14', 'upcoming', null, 'i'],
  ['2025-10-15', 'active', 'i', 'ii'],
  ['2026-02-08', 'active', 'i', 'ii'],
  ['2026-02-09', 'active', 'ii', 'iii'],
  ['2026-04-08', 'active', 'ii', 'iii'],
  ['2026-04-09', 'active', 'iii', 'iv'],
  ['2026-06-04', 'active', 'iii', 'iv'],
  ['2026-06-05', 'active', 'iv', 'v'],
  ['2026-07-02', 'active', 'iv', 'v'],
  ['2026-07-03', 'active', 'v', 'vi'],
  ['2026-08-14', 'active', 'v', 'vi'],
  ['2026-08-15', 'active', 'vi', 'khusus'],
  ['2026-09-10', 'active', 'vi', 'khusus'],
  ['2026-09-11', 'active', 'khusus', null],
  ['2026-09-15', 'active', 'khusus', null],
  ['2026-10-02', 'active', 'khusus', null],
  ['2026-10-03', 'closed', null, null],
];

for (const [date, state, active, next] of boundaries) {
  test(`${date}: ${state}, active=${active ?? 'none'}`, () => {
    const result = getAdmissionsStatus(date, period);
    assert.equal(result.state, state);
    assert.equal(result.activeWave?.id ?? null, active);
    assert.equal(result.nextWave?.id ?? null, next);
    assert.equal(result.registrationAvailable, state === 'active');
    assert.equal(result.waves.filter(item => item.state === 'active').length, active ? 1 : 0);
    assert.equal(result.referenceDate, date);
  });
}

test('verified dataset retains period, campus, class start and official destination', () => {
  assert.equal(period.id, 'september-2026');
  assert.equal(period.intake, '2026-09');
  assert.equal(period.campus, 'margonda');
  assert.equal(period.classStart, '2026-09-21');
  assert.equal(period.registrationUrl, registration.url);
  assert.equal(period.registrationUrl, 'https://pmbubsi.id/pmb');
  assert.equal(period.waves.length, 7);
  assert.equal(period.waves.at(-1).label, 'Gelombang Khusus');
  assert.equal(period.evidence.verificationStatus, 'VERIFIED');
});

test('class start does not close the special registration wave', () => {
  assert.equal(getAdmissionsStatus('2026-09-21', period).activeWave?.id, 'khusus');
});

test('closed period retains past context but never an active or next wave', () => {
  const status = getAdmissionsStatus('2027-01-01', period);
  assert.equal(status.state, 'closed');
  assert.equal(status.activeWave, null);
  assert.equal(status.nextWave, null);
  assert.equal(status.registrationAvailable, false);
  assert.equal(status.previousWave.id, 'khusus');
  assert.ok(status.waves.every(item => item.state === 'past'));
  assert.equal(status.openingDate, '2025-10-15');
  assert.equal(status.closingDate, '2026-10-02');
});

test('before opening all waves are upcoming, none is past or active', () => {
  const status = getAdmissionsStatus('2025-01-01', period);
  assert.equal(status.previousWave, null);
  assert.equal(status.activeWave, null);
  assert.ok(status.waves.every(item => item.state === 'upcoming'));
});

test('future gap has no active wave and correctly identifies previous/next', () => {
  const gapPeriod = { ...period, waves: [
    { id: 'first', label: 'First', startDate: '2027-01-01', endDate: '2027-01-10' },
    { id: 'next', label: 'Next', startDate: '2027-01-15', endDate: '2027-01-20' },
  ] };
  for (const date of ['2027-01-11', '2027-01-14']) {
    const status = getAdmissionsStatus(date, gapPeriod);
    assert.equal(status.state, 'upcoming');
    assert.equal(status.registrationAvailable, false);
    assert.equal(status.activeWave, null);
    assert.equal(status.previousWave.id, 'first');
    assert.equal(status.nextWave.id, 'next');
    assert.deepEqual(status.waves.map(item => item.state), ['past', 'upcoming']);
  }
});

test('pure engine leaves its input unchanged and supports another period', () => {
  const original = JSON.stringify(period);
  const future = { ...period, id: 'future-example', waves: [
    { id: 'only', label: 'Example', startDate: '2028-02-29', endDate: '2028-02-29' },
  ] };
  assert.equal(getAdmissionsStatus('2028-02-29', future).activeWave.id, 'only');
  assert.equal(getAdmissionsStatus('2028-03-01', future).state, 'closed');
  assert.equal(JSON.stringify(period), original);
});

test('invalid date-only inputs are rejected rather than normalized', () => {
  for (const invalid of ['2026-02-29', '2026-04-31', '2026-13-01', '2026-00-01', '2026-09-00', '2026-9-11', '0000-01-01', '1900-02-29', '2026-09-11T00:00:00Z', '']) {
    assert.throws(() => getAdmissionsStatus(invalid, period), RangeError);
  }
  assert.doesNotThrow(() => assertCalendarDate('2000-02-29'));
});

test('invalid configuration cannot silently claim registration is open', () => {
  const wave = period.waves[0];
  const invalidWaves = [
    [],
    [{ ...wave, endDate: '2025-10-14' }],
    [{ ...wave, startDate: '2025-02-30' }],
    [wave, { ...period.waves[1], startDate: wave.endDate }],
    [period.waves[1], wave],
    [wave, { ...period.waves[1], id: wave.id }],
  ];
  for (const waves of invalidWaves) {
    assert.throws(() => getAdmissionsStatus('2026-01-01', { ...period, waves }), RangeError);
  }
});

test('Jakarta midnight switches VI to Khusus, independently of visitor zone', () => {
  const before = new Date('2026-09-10T16:59:59.999Z');
  const after = new Date('2026-09-10T17:00:00.000Z');
  assert.equal(getJakartaDate(before), '2026-09-10');
  assert.equal(getJakartaDate(after), '2026-09-11');
  assert.equal(getAdmissionsStatus(getJakartaDate(before), period).activeWave.id, 'vi');
  assert.equal(getAdmissionsStatus(getJakartaDate(after), period).activeWave.id, 'khusus');
  assert.equal(millisecondsUntilJakartaMidnight(before), 1);
  assert.equal(millisecondsUntilJakartaMidnight(after), 86_400_000);
});

test('Jakarta midnight closes registration after the inclusive final day', () => {
  assert.equal(getAdmissionsStatus(getJakartaDate(new Date('2026-10-02T16:59:59Z')), period).state, 'active');
  assert.equal(getAdmissionsStatus(getJakartaDate(new Date('2026-10-02T17:00:00Z')), period).state, 'closed');
});

test('date formatting and Jakarta conversion ignore the process timezone', () => {
  const previousZone = process.env.TZ;
  try {
    for (const zone of ['UTC', 'America/Los_Angeles', 'Asia/Jakarta', 'Pacific/Kiritimati']) {
      process.env.TZ = zone;
      assert.equal(formatCalendarDate('2026-09-11'), '11 September 2026');
      assert.equal(getJakartaDate(new Date('2026-09-10T17:00:00Z')), '2026-09-11');
      assert.equal(getAdmissionsStatus('2026-09-11', period).activeWave.id, 'khusus');
    }
  } finally {
    if (previousZone === undefined) delete process.env.TZ;
    else process.env.TZ = previousZone;
  }
});
