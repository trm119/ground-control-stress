import assert from "node:assert/strict";
import { test } from "node:test";
import { formatMonths, formatReport } from "../src/format.ts";

test("formatReport prints a header, a rule and one line per category", () => {
  const lines = formatReport([
    { category: "rent", cents: -120000, count: 1 },
    { category: "groceries", cents: -13000, count: 3 },
  ]).split("\n");
  assert.equal(lines.length, 4);
  assert.match(lines[0].toLowerCase(), /category/);
  assert.match(lines[2], /^rent\s+-1200\.00/);
  assert.match(lines[3], /^groceries\s+-130\.00/);
});

test("formatMonths prints one month per line", () => {
  assert.equal(
    formatMonths([
      { month: "2026-01", cents: 120000 },
      { month: "2026-02", cents: -500 },
    ]),
    "2026-01  1200.00\n2026-02  -5.00",
  );
});
