# ledger-lite

A tiny command-line ledger. Keep your money in a plain text file, one line per
transaction, and ask it for a balance, a per-category report, monthly totals or
your largest expenses. No database, no account, no dependencies.

Amounts are stored as integer cents internally, so totals never drift the way
floating-point dollars do. Dates are calendar days with no time zone.

The code is plain TypeScript run directly by Node 24, which strips types at
load time. There is no build step: `src/` is what runs and `test/` is what
checks it.

## Usage

```
npm run ledger -- balance examples/sample.ledger
npm run ledger -- report examples/sample.ledger
npm run ledger -- months examples/sample.ledger
npm run ledger -- top examples/sample.ledger 3
```

A ledger line is `date,amount,category[,note]`, for example
`2026-01-05,-84.20,groceries,weekly shop`. See `examples/sample.ledger`.

## Development

```
npm test
```

Node 24 or newer. Each module in `src/` is a handful of pure functions with a
matching file in `test/`; `src/cli.ts` is the only part that touches the disk.

## Roadmap

- Budgets: read a monthly budget file, compare it with what was spent, and warn
  when a category goes over.
- Recurring transactions and a simple forecast.
- An `export` command that writes the ledger back out as normalized CSV.
- A `--category` filter for `balance`, and averages per category.
- Better input handling: impossible dates, Windows line endings.
- Proper documentation of the file format, and a contributing guide.
