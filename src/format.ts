import { formatMoney } from "./money.ts";
import type { CategoryTotal, MonthTotal } from "./totals.ts";

/** The `report` table: one line per category under a header and a rule. */
export function formatReport(rows: CategoryTotal[]): string {
  const header = "CATEGORY".padEnd(16) + "AMOUNT".padStart(12);
  const rule = "=".repeat(28);
  const body = rows.map((row) => row.category.padEnd(16) + formatMoney(row.cents));
  return [header, rule, ...body].join("\n");
}

/** The `months` listing: "YYYY-MM  amount" per line. */
export function formatMonths(rows: MonthTotal[]): string {
  return rows.map((row) => `${row.month}  ${formatMoney(row.cents)}`).join("\n");
}
