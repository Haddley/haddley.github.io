---
title: "Spec-Driven AI Tools"
part: 3
description: "Trying BMAD on the same calculator and the same two feature requests as OpenSpec and Spec-Kit — starting with discovering that BMAD has been substantially rewritten since the article that prompted this series, and what its own setup step asked me that neither other tool did"
date: "2026-09-29"
categories: ["AI"]
tags: "bmad, spec-driven-development, claude-code, agentic-coding, ai-agent"
image: "/assets/images/specdriven3/hero-specdriven-bmad.svg"
slug: "specdriven3"
hidden: true
---

Third post in a series trying three spec-driven AI development tools against the same fixed task, prompted by [Ran the Builder's honest take on three spec-driven AI tools](https://ranthebuilder.cloud/blog/i-tested-three-spec-driven-ai-tools-here-s-my-honest-take). [Part 1](/posts/specdriven1/) covered OpenSpec, [Part 2](/posts/specdriven2/) covered Spec-Kit; this one covers [BMAD](https://github.com/bmad-code-org/BMAD-METHOD), on a fresh copy of the exact same baseline calculator and the exact same two feature requests — Programmer Mode and Statistics Mode.

## A version surprise, before anything else

The source article describes BMAD as "a full-lifecycle framework with dedicated elicitation and course-correction workflows," scored for "iterative refinement through adversarial review processes." Before installing anything, I checked the actual repository — and found BMAD has moved fast enough that this framing may already be describing a different tool than what installs today:

```bash
gh api repos/bmad-code-org/BMAD-METHOD/releases --jq '.[0:5] | .[] | {tag: .tag_name, published: .published_at}'
```

```
v6.12.0 — 2026-09-04
v6.11.0 — 2026-08-10
v6.10.0 — 2026-07-03
v6.9.0  — 2026-06-22
v6.8.0  — 2026-05-25
```

A release roughly every month, several with breaking changes to skill names and directory layouts — v6.11.0's changelog alone renamed `bmad-quick-dev` to `bmad-build`, cut the core skill count from fourteen to eight, and merged six separate review skills into one. The classic agent files and `elicitation`/`correct-course` terminology the article describes do still exist as skills (`bmad-advanced-elicitation`, `bmad-correct-course`), but the whole installation and invocation mechanism has moved to a Claude Code/Codex "skills" plugin architecture that looks nothing like what an older write-up would have walked through.

I am testing what installs **today** — v6.13.0-next — the same way I tested OpenSpec and Spec-Kit at their current versions, not trying to reconstruct whatever version the article actually ran. That itself is a finding worth stating plainly: a tool comparison can go stale within months in this space, and BMAD's own changelog is the most direct evidence of that in this series.

## Installing it

A fresh worktree, branched from the same baseline commit as the other two:

```bash
git branch bmad 711a808
git worktree add ../specdriven-bmad bmad
```

BMAD installs as a Claude Code plugin, not a CLI that scaffolds project files directly:

```bash
claude plugin marketplace add bmad-code-org/bmad-plugins
claude plugin install bmad-method@bmad --scope project
```

This is a different shape from `openspec init` or `specify init` already: it does not write anything into the project beyond enabling the plugin in `.claude/settings.json`. The actual skills load from a global plugin cache (`~/.claude/plugins/cache/bmad/...`), which meant the very first command hit a permission wall neither other tool did — reading the skill's own reference files, since they live outside the project directory:

> *"I need permission to read the skill's reference files outside the project directory. Could you approve access to `~/.claude/plugins/cache/bmad/bmad-method/6.13.0-next/skills/bmad-project-context/references/`?"*

Granted via `--add-dir`, and it proceeded — but this is a third distinct friction pattern across three tools now: OpenSpec pre-authorizes its own CLI (`Bash(openspec:*)`); Spec-Kit pre-authorizes nothing, so every Bash call needs approval; BMAD's plugin skills need filesystem read access outside the project entirely, because the skill definitions themselves are not local files.

The second surprise: `bmad-method` alone was not enough. Running `bmad setup` (the README's stated next step) needed a skill literally named `bmad`, which turned out to live in a *separate* plugin, `bmad-toolbox`:

```bash
claude plugin install bmad-toolbox@bmad --scope project
```

Two plugins to get to the same starting line OpenSpec and Spec-Kit each reached with one install command.

## Setup, and BMAD's own version of "leave it empty"

`bmad setup` itself hit the same non-interactive Bash wall the other two tools did — every command needing approval with no one able to grant it. I ran its underlying script myself:

```bash
uv run --no-cache "$SKILL_ROOT/scripts/setup.py" --project-root "$(pwd)" --skill "$SKILL_ROOT"
```

This scaffolded `_bmad/` (config, scripts) and, critically, `_bmad/config.toml` — which is where BMAD's real distinguishing feature showed up unprompted: five named agent personas, not a generic role list —

```toml
[agents.bmad-agent-analyst]
name = "Mary"
title = "Business Analyst"
description = "Channels Porter's strategic rigor... Speaks like a treasure hunter narrating the find"

[agents.bmad-agent-pm]
name = "John"
title = "Product Manager"
description = "Drives Jobs-to-be-Done over template filling... Speaks like a detective interrogating a cold case"

[agents.bmad-agent-architect]
name = "Winston"
title = "System Architect"

[agents.bmad-agent-dev]
name = "Amelia"
title = "Senior Software Engineer"
description = "Test-first discipline (red, green, refactor), 100% pass before review, no fluff all precision"
```

Neither OpenSpec nor Spec-Kit have any equivalent of this — a cast of characters with stated voices, not just role labels. Whether that changes the actual output quality or is closer to flavor text is something I want to watch for as the workflow runs.

Next, `bmad-project-context` — the equivalent of OpenSpec's context field and Spec-Kit's constitution. I ran it the same way: no pre-supplied specifics, watching what it did on its own.

```PROMPT
bmad setup
```

*(then, once the plugin gap was resolved, prompted again to run `bmad-project-context`)*

This is the first of the three tools' setup steps to actually **stop and ask**, rather than silently deciding. It asked four real questions before drafting anything:

> *"1. Governance/policy — any branch rules, frozen paths, or required approval process? 2. Trial integrity — since this repo is explicitly a comparison baseline across three tools, is there a rule like 'keep changes scoped to what BMAD produces' so the comparison stays fair? 3. Outside docs — any handbook or planning doc beyond what's in this repo? 4. Known pitfalls — has an agent already gotten something wrong here worth recording?"*

Like Spec-Kit's constitution step, it had read the README closely enough to notice this repo's own stated purpose as a three-tool comparison baseline, and asked about it directly rather than silently encoding it the way Spec-Kit's constitution did. I answered the way I answered the other two tools' equivalent steps — genuinely nothing, blank slate on all four — and it wrote `AGENTS.md`:

```markdown
## specdriven
A plain HTML/CSS/JS four-function calculator, a flat monochrome homage
to the Windows 1.0 Calculator. Fixed baseline used to trial three
spec-driven AI dev tools (OpenSpec, Spec-Kit, BMAD), each starting
from the same commit.

## Conventions that differ from defaults
- Operators chain left-to-right as entered (`5 + 3 × 2` = `16`), not
  by operator precedence.
- Divide by zero is intentional behavior, not a bug...
- Keep `calculator-logic.js` free of DOM access...
```

Twenty lines, three sections, done. Both OpenSpec's context and Spec-Kit's constitution ended up producing far more text when I gave them nothing — Spec-Kit in particular wrote five full governance principles with a semver amendment policy. BMAD's own reasoning for staying small was explicit: *"small on purpose since every line here is loaded every session."* A third genuinely different philosophy for the same "give the tool context about the project" step: OpenSpec — optional, does nothing if skipped; Spec-Kit — mandatory, ceremony-heavy, versioned; BMAD — mandatory, deliberately minimal, budget-conscious.

Next: `bmad-spec` for Programmer Mode.
