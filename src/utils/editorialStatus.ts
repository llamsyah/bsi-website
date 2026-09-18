import { assertCalendarDate } from './calendarDate.ts';

export type EditorialTemporalStatus = 'upcoming' | 'current' | 'recent' | 'past' | 'published';

interface EditorialDates { readonly eventStart?: string; readonly eventEnd?: string; }
const DAY_MS = 86_400_000;

export function getEditorialTemporalStatus(referenceDate: string, item: EditorialDates, recentDays = 30): EditorialTemporalStatus {
  assertCalendarDate(referenceDate);
  if (!item.eventStart) return 'published';
  assertCalendarDate(item.eventStart);
  const eventEnd = item.eventEnd ?? item.eventStart;
  assertCalendarDate(eventEnd);
  if (eventEnd < item.eventStart) throw new RangeError('Editorial event end cannot precede its start');
  if (!Number.isInteger(recentDays) || recentDays < 0) throw new RangeError('recentDays must be a non-negative integer');
  if (referenceDate < item.eventStart) return 'upcoming';
  if (referenceDate <= eventEnd) return 'current';
  const reference = Date.parse(`${referenceDate}T00:00:00Z`);
  const end = Date.parse(`${eventEnd}T00:00:00Z`);
  return (reference - end) / DAY_MS <= recentDays ? 'recent' : 'past';
}

export const editorialStatusLabels: Readonly<Record<EditorialTemporalStatus, string>> = {
  upcoming: 'Akan datang', current: 'Sedang berlangsung', recent: 'Baru berlangsung', past: 'Arsip kegiatan', published: 'Cerita terpilih',
};
