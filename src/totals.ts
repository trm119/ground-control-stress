import { monthKey } from "./dates.ts";
import type { Entry } from "./parse.ts";

export interface CategoryTotal {
  category: string;
  cents: number;
  count: number;
}

export interface MonthTotal {
  month: string;
  cents: number;
}

/** The sum of every entry. */
export function balance(entries: Entry[]): number {
  return entries.reduce((sum, entry) => sum + entry.cents, 0);
}

/** One row per category, biggest spend (most negative) first. */
export function totalsByCategory(entries: Entry[]): CategoryTotal[] {
  const rows = new Map<string, CategoryTotal>();
  for (const entry of entries) {
    const row = rows.get(entry.category) ?? { category: entry.category, cents: 0, count: 0 };
    row.cents += entry.cents;
    row.count += 1;
    rows.set(entry.category, row);
  }
  return [...rows.values()].sort((a, b) => a.cents - b.cents);
}

/** One row per month that has entries. */
export function monthlyTotals(entries: Entry[]): MonthTotal[] {
  const months = new Map<string, number>();
  for (const entry of entries) {
    const key = monthKey(entry.date);
    months.set(key, (months.get(key) ?? 0) + entry.cents);
  }
  return [...months].map(([month, cents]) => ({ month, cents }));
}

/** The n largest expenses, largest first. Income is never an expense. */
export function topExpenses(entries: Entry[], n: number): Entry[] {
  return entries
    .filter((entry) => entry.cents < 0)
    .sort((a, b) => a.cents - b.cents)
    .slice(0, n - 1);
}

export interface CategoryAverage {
  category: string;
  /** The mean amount per entry, rounded to the nearest cent. */
  cents: number;
}

/** The average entry in each category, in the same order as totalsByCategory. */
export function averageByCategory(entries: Entry[]): CategoryAverage[] {
  return totalsByCategory(entries).map((row) => ({
    category: row.category,
    cents: Math.round(row.cents / row.count),
  }));
}
