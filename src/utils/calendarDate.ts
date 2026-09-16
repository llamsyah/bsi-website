export const ADMISSIONS_TIME_ZONE = 'Asia/Jakarta';

/** Reject timestamps, non-padded dates and impossible calendar dates. */
export function assertCalendarDate(value: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new RangeError(`Invalid calendar date: ${value}`);
  const [year, month, day] = value.split('-').map(Number) as [number, number, number];
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > days[month - 1]!) {
    throw new RangeError(`Invalid calendar date: ${value}`);
  }
}

const displayFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});

export function formatCalendarDate(value: string): string {
  assertCalendarDate(value);
  // UTC is only a formatting container; no conversion to the visitor's zone.
  return displayFormatter.format(new Date(`${value}T00:00:00Z`));
}

export function formatCalendarRange(start: string, end: string): string {
  return `${formatCalendarDate(start)} – ${formatCalendarDate(end)}`;
}

const jakartaFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: ADMISSIONS_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
});

/** The caller supplies the instant; only this boundary converts an instant to a date. */
export function getJakartaDate(instant: Date): string {
  const parts = jakartaFormatter.formatToParts(instant);
  const part = (type: string) => parts.find(item => item.type === type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

/** Jakarta uses UTC+07:00 without daylight saving. Refresh at its next midnight. */
export function millisecondsUntilJakartaMidnight(instant: Date): number {
  const midnight = new Date(`${getJakartaDate(instant)}T00:00:00+07:00`).getTime();
  return midnight + 86_400_000 - instant.getTime();
}
