// Amounts are held as integer cents everywhere, so totals never drift the way
// floating-point dollars do. Only the edges of the program (parsing a ledger
// line, printing a report) deal in "12.34" strings.

/** "12.34" -> 1234, "-0.5" -> -50. Throws on anything that is not an amount. */
export function toCents(text: string): number {
  const trimmed = text.trim();
  if (!/^-?\d+(\.\d{1,2})?$/.test(trimmed)) {
    throw new Error(`Not an amount: "${text}"`);
  }
  const negative = trimmed.startsWith("-");
  const [whole, fraction = ""] = trimmed.replace("-", "").split(".");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return negative ? -cents : cents;
}

/** 1234 -> "12.34", -1234 -> "-12.34". */
export function formatMoney(cents: number): string {
  const dollars = Math.trunc(cents / 100);
  const rest = Math.abs(cents % 100).toString().padStart(2, "0");
  return `${dollars}.${rest}`;
}
