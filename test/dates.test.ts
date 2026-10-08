import assert from "node:assert/strict";
import { test } from "node:test";
import { formatDate, monthKey, parseDate } from "../src/dates.ts";

test("parseDate reads YYYY-MM-DD as UTC midnight", () => {
  const date = parseDate("2026-03-09");
  assert.equal(date.getUTCFullYear(), 2026);
  assert.equal(date.getUTCMonth(), 2);
  assert.equal(date.getUTCDate(), 9);
  assert.equal(date.getUTCHours(), 0);
});

test("parseDate rejects other shapes", () => {
  assert.throws(() => parseDate("03/09/2026"), /Not a date/);
  assert.throws(() => parseDate("2026-3-9"), /Not a date/);
});

test("monthKey and formatDate round-trip", () => {
  const date = parseDate("2026-11-30");
  assert.equal(monthKey(date), "2026-11");
  assert.equal(formatDate(date), "2026-11-30");
});
