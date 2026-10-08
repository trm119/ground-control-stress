import assert from "node:assert/strict";
import { test } from "node:test";
import { formatMoney, toCents } from "../src/money.ts";

test("toCents reads whole and fractional amounts", () => {
  assert.equal(toCents("12.34"), 1234);
  assert.equal(toCents("12.3"), 1230);
  assert.equal(toCents("12"), 1200);
  assert.equal(toCents("-42.10"), -4210);
  assert.equal(toCents(" 7.05 "), 705);
});

test("toCents rejects things that are not amounts", () => {
  assert.throws(() => toCents("12.345"), /Not an amount/);
  assert.throws(() => toCents("twelve"), /Not an amount/);
  assert.throws(() => toCents(""), /Not an amount/);
});

test("formatMoney prints two decimals", () => {
  assert.equal(formatMoney(1234), "12.34");
  assert.equal(formatMoney(-1234), "-12.34");
  assert.equal(formatMoney(5), "0.05");
  assert.equal(formatMoney(0), "0.00");
});
