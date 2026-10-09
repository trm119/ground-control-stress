// Ledger dates are calendar days with no time zone. They are parsed into UTC
// midnight and only ever read back with the getUTC* accessors.

/** Parse "YYYY-MM-DD" into a Date at UTC midnight. */
export function parseDate(text: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text.trim());
  if (!match) {
    throw new Error(`Not a date: "${text}"`);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  // Validate month range (1-12)
  if (month < 1 || month > 12) {
    throw new Error(`Not a date: "${text}"`);
  }

  // Validate day range for the given month, accounting for leap years
  const daysInMonth = daysPerMonth(year, month);
  if (day < 1 || day > daysInMonth) {
    throw new Error(`Not a date: "${text}"`);
  }

  return new Date(Date.UTC(year, month - 1, day));
}

/** Number of days in a given month of a given year. */
function daysPerMonth(year: number, month: number): number {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  }
  return 31;
}

/** Whether a year is a leap year. */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** The "YYYY-MM" month a date falls in. */
export function monthKey(date: Date): string {
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}`;
}

/** Back to "YYYY-MM-DD". */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
