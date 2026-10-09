# Review a pull request

You are reviewing one pull request. Write your review to `review.md` and
change nothing else.

## The verdict line

The **first line** of `review.md` must be exactly one of:

- `-APPROVED-` — you would merge this as it stands.
- `-NEEDS-CHANGES-` — something in it is wrong.

Nothing else on that line. Everything downstream reads it.

Leave a blank line, then the review.

## What to look for, in order

1. **Correctness.** Does it do what the pull request says? Read the actual code
   paths, including the error and empty cases.
2. **Damage.** Anything that loses data, breaks an existing caller, or opens a
   security hole. Say so first and plainly.
3. **Fit.** Does it match how this repository already does things?
4. **Tests.** Is the new behaviour covered, and does the test actually fail
   without the change?

## How to write it

- Lead with the verdict's reason in one sentence.
- One bullet per finding, each naming the file and line.
- Distinguish "this is wrong" from "I would have done this differently". Only
  the first justifies `-NEEDS-CHANGES-`.
- If it is fine, say so briefly. A short approval is a good review.
