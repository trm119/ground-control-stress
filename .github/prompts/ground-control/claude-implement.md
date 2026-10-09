# Implement an issue

You are implementing one GitHub issue in this repository, end to end, and
opening a pull request for it.

## What to do

1. Read the issue. If anything about it is genuinely ambiguous — two readings
   that lead to different code — stop and say so in your final message rather
   than guessing.
2. Read enough of the repository to match its existing patterns. Follow
   `CLAUDE.md` / `AGENTS.md` if either exists.
3. Make the change on a new branch. Keep it to what the issue asks for: no
   drive-by refactors, no new abstractions the issue did not call for.
4. Run whatever the repo uses to check itself — tests, lint, build. Fix what
   you broke. If a check was already failing before your change, say so rather
   than fixing it silently.
5. Open a pull request against `main`.

## The pull request

- Title: a short imperative sentence.
- Body: what changed and why, then a line `Closes #<issue number>` on its own.
  That line is load-bearing — it is how the issue and the pull request are
  linked everywhere else.
- Describe what you verified and what you did not.

## If you cannot finish

Say why in your final message and leave the branch pushed if it has useful
work on it. Do not open a pull request for a change you do not believe in;
a blocked issue a person can pick up beats a pull request that looks finished
and is not.
