import { parseDate } from "./dates.ts";
import { toCents } from "./money.ts";

/** One line of a ledger file. */
export interface Entry {
  date: Date;
  /** Negative for money going out, positive for money coming in. */
  cents: number;
  category: string;
  note: string;
}

/**
 * Parse a ledger file: one entry per line, `date,amount,category[,note]`.
 * Blank lines and lines starting with `#` are skipped. A note may itself
 * contain commas; everything after the third comma belongs to it.
 */
export function parseLedger(text: string): Entry[] {
  const entries: Entry[] = [];
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    if (line.trim() === "" || line.trimStart().startsWith("#")) {
      return;
    }
    const [date, amount, category, ...rest] = line.split(",");
    if (amount === undefined || !category) {
      throw new Error(`Line ${index + 1}: expected date,amount,category[,note]`);
    }
    try {
      entries.push({
        date: parseDate(date),
        cents: toCents(amount),
        category: category.toLowerCase(),
        note: rest.join(",").trim(),
      });
    } catch (error) {
      throw new Error(`Line ${index + 1}: ${(error as Error).message}`);
    }
  });
  return entries;
}
