# Get a pull request the rest of the way

This pull request is either failing its checks, conflicting with
`main`, or both. You are already checked out on its branch — if
there is a conflict, the merge has been started for you and the conflicted files
are in the tree with their markers.

## What to do

1. Read `autocomplete-context.md`. It names the failing checks and holds what
   each of them printed.
2. If there are conflict markers, resolve every one of them. Keep what both
   sides were trying to do; if the two are genuinely incompatible, stop (see
   below) rather than picking one and hoping.
3. Make the **smallest** change that turns the failing checks green. Fix the
   cause, not the check: do not delete a test, loosen an assertion or skip a
   lint rule to make the red go away.
4. Run whatever the repository uses to check itself — the `package.json`
   scripts, or whatever else the repo's own instructions name — and keep going
   until they pass.
5. Write what you did to `autocomplete.md`. The first line is used as the
   commit subject, so make it a short imperative sentence; put the detail under
   it.

## What not to touch

- Never edit anything under `.github/`. The workflows and prompts are Ground
  Control's, and a run that rewrites its own instructions cannot be trusted.
- Never force-push and never rewrite history. Someone else may be reading this
  branch.
- Do not widen the change: no drive-by refactors, no reformatting of files you
  did not otherwise touch.

## When to stop

If fixing this needs a decision a person has to make — two conflicting changes
that both look deliberate, a failing test whose correct answer is a product
question, a check that needs a secret nobody has set — write why to
`autocomplete.md` and change nothing else. Nothing is pushed, and the pull
request waits for a person. That is the right outcome, not a failure.
