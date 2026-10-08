import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { formatDate } from "./dates.ts";
import { formatMonths, formatReport } from "./format.ts";
import { formatMoney } from "./money.ts";
import { parseLedger } from "./parse.ts";
import { balance, monthlyTotals, topExpenses, totalsByCategory } from "./totals.ts";

export const USAGE = `Usage: ledger <command> <file> [options]

Commands:
  balance <file>     The overall balance
  report <file>      Totals per category, biggest spend first
  months <file>      Totals per month
  top <file> [n]     The n largest expenses (default 5)`;

/** Run one command and return what it prints. Throws with a message on bad input. */
export function run(argv: string[]): string {
  const [command, file, extra] = argv;
  if (!command || command === "help" || command === "--help") {
    return USAGE;
  }
  if (!file) {
    throw new Error(`Missing ledger file.\n\n${USAGE}`);
  }
  const entries = parseLedger(readFileSync(file, "utf8"));
  switch (command) {
    case "balance":
      return formatMoney(balance(entries));
    case "report":
      return formatReport(totalsByCategory(entries));
    case "months":
      return formatMonths(monthlyTotals(entries));
    case "top": {
      const n = extra === undefined ? 5 : Number(extra);
      if (!Number.isInteger(n) || n < 1) {
        throw new Error(`top: n must be a positive whole number, got "${extra}"`);
      }
      return topExpenses(entries, n)
        .map((entry) => {
          const note = entry.note ? `  ${entry.note}` : "";
          return `${formatDate(entry.date)}  ${formatMoney(entry.cents).padStart(10)}  ${entry.category}${note}`;
        })
        .join("\n");
    }
    default:
      throw new Error(`Unknown command "${command}".\n\n${USAGE}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(run(process.argv.slice(2)));
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;
  }
}
