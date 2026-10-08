// Ledger dates are calendar days with no time zone. They are parsed into UTC
// midnight and only ever read back with the getUTC* accessors.

/** Parse "YYYY-MM-DD" into a Date at UTC midnight. */
export function parseDate(text: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text.trim());
  if (!match) {
    throw new Error(`Not a date: "${text}"`);
  }
  const [, year, month, day] = match;
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
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
