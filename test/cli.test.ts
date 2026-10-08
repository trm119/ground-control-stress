import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { run, USAGE } from "../src/cli.ts";

const SAMPLE = fileURLToPath(new URL("../examples/sample.ledger", import.meta.url));

test("no command prints the usage", () => {
  assert.equal(run([]), USAGE);
  assert.equal(run(["--help"]), USAGE);
});

test("balance prints the overall balance of the sample", () => {
  assert.equal(run(["balance", SAMPLE]), "2242.45");
});

test("report lists rent first", () => {
  const lines = run(["report", SAMPLE]).split("\n");
  assert.match(lines[2], /^rent/);
});

test("top rejects a count that is not a positive whole number", () => {
  assert.throws(() => run(["top", SAMPLE, "zero"]), /positive whole number/);
});

test("an unknown command is an error that shows the usage", () => {
  assert.throws(() => run(["frobnicate", SAMPLE]), /Unknown command "frobnicate"/);
});
