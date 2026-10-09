---
name: agent-workflows
description: "What the agent workflows in this repository do and how to start them: the labels that hand an issue or pull request to an agent, and what each leaves behind. Use it when asked what runs here, how to hand work to an agent, or what an agent:* or autocomplete label means."
---

# Agent workflows in this repository

Ground Control installed these workflows, and labels are how work is handed to them: add the label and the matching agent picks the issue or pull request up. Each one reports back in a comment on the issue or pull request it worked on.

## The workflows

### Implementer

Hand it an issue and it writes the change on a branch and opens a pull request that closes the issue. Add the `agent:implement` label to an issue.

### Issue researcher

Reads the code around an issue and comments with what it found, changing nothing. Add the `agent:research` label to an issue.

### Reviewer

Reviews every pull request and leaves a verdict: approved, or what needs to change. It runs on every pull request; nothing to add.

### Repairer

Fixes what the reviewer asked for and pushes to the same branch, up to four rounds. Add the `autocomplete` label to a pull request.

### Autocomplete

Gets an opted-in pull request the rest of the way: fixes failing checks and resolves merge conflicts, then pushes. Add the `autocomplete` label to a pull request.

### Large-issue breakdown

Splits an issue too big for one pull request into ordered subtasks and hands the first ones to the implementer. Add the `agent:breakdown` label to an issue.

### Queue keeper

Hands the next subtask to the implementer once the subtasks it waited on are closed. Nothing to add: it watches issues close.

## Labels

| Label | Meaning |
| --- | --- |
| `agent:implement` | Hand this issue to an agent to implement. |
| `agent:claimed` | An agent is working on this issue. |
| `agent:pr-opened` | An agent opened a pull request for this issue. |
| `agent:blocked` | An agent stopped without finishing; a person is needed. |
| `agent:research` | Hand this issue to an agent to investigate. |
| `agent:researched` | Research is finished; the findings are on the issue. |
| `autocomplete` | Let agents finish this pull request: review feedback, failing checks and merge conflicts. |
| `autocomplete:escalated` | An agent loop on this pull request hit its round cap and stopped. |
| `agent:breakdown` | Split this issue into subtasks an agent can implement one at a time. |
| `agent:decomposed` | This issue was split into subtasks. |
| `agent:subtask` | A subtask an agent split off a larger issue. |
| `agent:waiting` | Waits for the subtasks it depends on to close; handed on automatically. |

## Where they are

The workflows are in `.github/workflows/`; the prompt each one runs is in `.github/prompts/ground-control/`.
