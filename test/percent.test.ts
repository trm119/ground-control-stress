import assert from "node:assert/strict";
import { test } from "node:test";
import { percentOf } from "../src/percent.ts";

test("percentOf rounds to one decimal place", () => {
  assert.equal(percentOf(1, 4), 25);
  assert.equal(percentOf(1, 3), 33.4);
});

test("percentOf ignores signs", () => {
  assert.equal(percentOf(-13000, -26000), 50);
});

test("percentOf of a zero whole is zero", () => {
  assert.equal(percentOf(5, 0), 0);
});
