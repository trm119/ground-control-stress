# Split a large issue into subtasks

The issue is in `issue.md`. Read it, read enough of the repository to know
what it touches, and write `breakdown.json`. Change nothing else — you are not
implementing any of this.

## What to write

```json
{
  "summary": "<two sentences: what the whole issue comes to, and how you split it>",
  "subtasks": [
    {
      "title": "<a short imperative sentence>",
      "body": "<markdown: what to do, which files, how to know it worked>",
      "dependsOn": []
    }
  ]
}
```

- Between **2 and 8** subtasks. Fewer than two means the issue did not need
  splitting; more than eight means you are splitting by file rather than by
  outcome.
- Each subtask is **one pull request's worth** of work: it can be written,
  reviewed and merged on its own, and it leaves the repository working.
- List them in dependency order, and give `dependsOn` the **indexes** of the
  earlier subtasks in this same list that must land first. A subtask may only
  depend on one before it. Most should depend on nothing.

## How to split

- Split by outcome, not by layer. "Add the endpoint and its test" beats
  "write all the types" followed by "write all the code".
- Put the thing everything else needs first, on its own.
- Say in each body what a person should see when it is done, so the reviewer of
  that one pull request can tell.
- Do not invent work the issue did not ask for. If part of the issue is
  genuinely one indivisible change, leave it as one subtask and say so in the
  summary.
