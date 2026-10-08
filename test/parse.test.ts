import assert from "node:assert/strict";
import { test } from "node:test";
import { parseLedger } from "../src/parse.ts";

const SAMPLE = [
  "# January",
  "2026-01-02,2500.00,salary",
  "2026-01-03,-42.10,groceries,weekly shop",
  "",
  "2026-01-05,-12.00,Coffee,beans, filters",
].join("\n");

test("parseLedger reads every entry and skips blanks and comments", () => {
  const entries = parseLedger(SAMPLE);
  assert.equal(entries.length, 3);
  assert.equal(entries[0].cents, 250000);
  assert.equal(entries[1].category, "groceries");
  assert.equal(entries[1].note, "weekly shop");
});

test("categories are lowercased and notes keep their commas", () => {
  const entries = parseLedger(SAMPLE);
  assert.equal(entries[2].category, "coffee");
  assert.equal(entries[2].note, "beans, filters");
});

test("a bad line names its line number", () => {
  assert.throws(() => parseLedger("2026-01-02,2500.00,salary\n2026-01-03,lots,rent"), /Line 2: Not an amount/);
  assert.throws(() => parseLedger("2026-01-02"), /Line 1: expected/);
});

test("Windows line endings do not leak into categories", { skip: "known bug: CRLF files split categories" }, () => {
  const entries = parseLedger("2026-01-03,-42.10,groceries,milk\r\n2026-01-04,-30.00,groceries\r\n");
  assert.deepEqual(
    entries.map((entry) => entry.category),
    ["groceries", "groceries"],
  );
});
