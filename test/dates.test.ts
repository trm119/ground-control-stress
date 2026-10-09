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

test("parseDate rejects impossible dates", () => {
  // Day out of range for month
  assert.throws(() => parseDate("2026-02-31"), /Not a date/);
  assert.throws(() => parseDate("2026-02-30"), /Not a date/);
  assert.throws(() => parseDate("2026-02-29"), /Not a date/); // 2026 is not a leap year
  assert.throws(() => parseDate("2026-04-31"), /Not a date/); // April has 30 days

  // Invalid month
  assert.throws(() => parseDate("2026-13-01"), /Not a date/);
  assert.throws(() => parseDate("2026-00-01"), /Not a date/);

  // Invalid day (zero)
  assert.throws(() => parseDate("2026-01-00"), /Not a date/);
});

test("parseDate accepts valid dates including leap year 29 Feb", () => {
  // 2028 is a leap year, so 2028-02-29 is valid
  const leap = parseDate("2028-02-29");
  assert.equal(leap.getUTCFullYear(), 2028);
  assert.equal(leap.getUTCMonth(), 1); // February = 1
  assert.equal(leap.getUTCDate(), 29);

  // Edge of months
  assert.equal(parseDate("2026-01-31").getUTCDate(), 31);
  assert.equal(parseDate("2026-04-30").getUTCDate(), 30);
});
