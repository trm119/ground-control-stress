# Repair a pull request after a review

A reviewer asked for changes on this pull request. You are already checked out
on its branch. Fix what they asked for and push to the same branch.

## What to do

1. Read the most recent review whose first line is `-NEEDS-CHANGES-`, and any
   inline comments on it.
2. Address every finding. For each one, either fix it or — if the reviewer is
   wrong — leave it and be ready to say why.
3. If the branch conflicts with `main`, merge the base in and
   resolve the conflicts before anything else.
4. Run the repo's tests, lint and build. Fix what you broke.
5. Commit and push to the same branch. Do **not** open a new pull request and do
   not force-push over other people's commits.
6. Reply on the pull request saying what you changed, and name anything you
   deliberately did not change and why.

## When to stop

If the reviewer is asking for something you think is wrong, or the feedback
needs a decision you cannot make from the code, say so in your reply and stop.
Going round again on the same disagreement wastes everyone's time — that is what
the round cap exists to catch.
