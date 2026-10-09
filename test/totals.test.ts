import assert from "node:assert/strict";
import { test } from "node:test";
import { parseLedger } from "../src/parse.ts";
import { averageByCategory, balance, monthlyTotals, topExpenses, totalsByCategory } from "../src/totals.ts";

const ENTRIES = parseLedger(
  [
    "2026-01-02,2500.00,salary",
    "2026-01-03,-42.10,groceries",
    "2026-01-10,-57.90,groceries",
    "2026-01-15,-1200.00,rent",
    "2026-02-01,2500.00,salary",
    "2026-02-03,-30.00,groceries",
  ].join("\n"),
);

test("balance sums every entry", () => {
  assert.equal(balance(ENTRIES), 367000);
});

test("totalsByCategory puts the biggest spend first", () => {
  const rows = totalsByCategory(ENTRIES);
  assert.deepEqual(
    rows.map((row) => [row.category, row.cents, row.count]),
    [
      ["rent", -120000, 1],
      ["groceries", -13000, 3],
      ["salary", 500000, 2],
    ],
  );
});

test("monthlyTotals has one row per month", () => {
  assert.deepEqual(monthlyTotals(ENTRIES), [
    { month: "2026-01", cents: 120000 },
    { month: "2026-02", cents: 247000 },
  ]);
});

test("topExpenses never includes income", () => {
  const top = topExpenses(ENTRIES, 10);
  assert.ok(top.every((entry) => entry.cents < 0));
  assert.equal(top[0].category, "rent");
});

test("averageByCategory rounds to the nearest cent and keeps the report order", () => {
  assert.deepEqual(averageByCategory(ENTRIES), [
    { category: "rent", cents: -120000 },
    { category: "groceries", cents: -4333 },
    { category: "salary", cents: 250000 },
  ]);
});

test("averageByCategory of nothing is nothing", () => {
  assert.deepEqual(averageByCategory([]), []);
});
