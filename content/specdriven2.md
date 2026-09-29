---
title: "Spec-Driven AI Tools"
part: 2
description: "Trying Spec-Kit's constitution-first workflow against the same baseline calculator and the same two feature requests as OpenSpec — starting with what happened when I left its constitution argument empty"
date: "2026-09-29"
categories: ["AI"]
tags: "spec-kit, spec-driven-development, claude-code, agentic-coding, github"
image: "/assets/images/specdriven2/hero-specdriven-speckit.svg"
slug: "specdriven2"
hidden: true
---

This is the second post in a series trying three spec-driven AI development tools against the same fixed task, prompted by [Ran the Builder's honest take on three spec-driven AI tools](https://ranthebuilder.cloud/blog/i-tested-three-spec-driven-ai-tools-here-s-my-honest-take). [Part 1](/posts/specdriven1/) covered OpenSpec and the baseline calculator itself; this one covers [Spec-Kit](https://github.com/github/spec-kit), GitHub's entry, run against a fresh copy of the exact same starting commit and the exact same two feature requests — Programmer Mode and Statistics Mode, both real Windows Calculator features, both worded the way I would naturally ask for them rather than engineered to hit specific traps.

## A fresh copy, same baseline

OpenSpec's history is on `main` of [github.com/Haddley/specdriven](https://github.com/Haddley/specdriven). For Spec-Kit I branched `spec-kit` from the baseline commit — before OpenSpec touched anything — and checked it out as a separate worktree, so the two tools' generated files never collide and both stay in one repo to link to.

```bash
git branch spec-kit 711a808   # the baseline commit, pre-OpenSpec
git worktree add ../specdriven-spec-kit spec-kit
```

## Installing Spec-Kit

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

Spec-Kit needs Python 3.11+ and the `uv` package manager; the CLI installs itself into its own managed environment regardless of the system Python version. Then, inside the fresh worktree:

```bash
specify init --here --integration claude --non-interactive --force
```

(`--force` because the directory already held the baseline calculator's files — a fresh clone of an empty directory would not need it.)

```
Initialize Specify Project
├── ● Check required tools (ok)
├── ● Select coding agent integration (claude)
├── ● Install integration (Claude Code)
├── ● Install shared infrastructure (scripts (sh) + templates)
├── ● Constitution setup (copied from template)
├── ● Install bundled workflow (speckit installed)
└── ● Finalize (project ready)

Next Steps
1. /speckit-constitution - Establish project principles
2. /speckit-specify - Create baseline specification
3. /speckit-plan - Create implementation plan
4. /speckit-tasks - Generate actionable tasks
5. /speckit-implement - Execute implementation
6. /speckit-converge - Assess the codebase and append remaining work as tasks
```

That scaffolds `.specify/` (memory, scripts, templates, workflow registry) and six `.claude/skills/speckit-*` skills — plus three optional ones (`clarify`, `analyze`, `checklist`) it lists separately as enhancements, not required steps.

Already, this is a different shape from OpenSpec. OpenSpec's six commands were all peers — propose, apply, sync, archive, explore, update — and its project context (`config.yaml`) was one optional field I could leave blank without consequence. Spec-Kit's own CLI output lists **constitution first**, before a single feature can be specified, and — as I found out next — leaving it empty does not mean skipping it.

## The constitution, with no input

I left `config.yaml`'s context blank for OpenSpec on purpose, to watch it navigate ambiguity from a cold start. To run the fair equivalent here, I invoked `/speckit-constitution` with no arguments at all:

```PROMPT
/speckit-constitution
```

This is the first real structural difference the article's framing predicted, and it showed up immediately: unlike OpenSpec's context field, which I could leave blank and it would simply mean "no extra context," `.specify/memory/constitution.md` starts as an unfilled template — `[PROJECT_NAME] Constitution`, `[PRINCIPLE_1_NAME]`, and so on. That is not valid running state. With no principle input from me, it read the repo itself — README, `package.json`, file structure — and wrote five actual, binding principles: a Separation of Concerns rule (logic/DOM split), Test-First for calculation logic, No Build Step, Simplicity/YAGNI, and one I did not expect:

> **IV. Baseline Fidelity for Cross-Tool Comparison** — *"This repository is a fixed starting point used to trial spec-driven AI development tools (OpenSpec, Spec-Kit, BMAD) side by side, each beginning from the same baseline commit and given the same feature requests. Changes MUST NOT quietly alter the comparison premise... Rationale: the value of this repo is comparability; silent behavior drift breaks that."*

It read this experiment's own premise straight out of the README I wrote — the README's setup section literally says this repo exists to trial OpenSpec, Spec-Kit, and BMAD — and turned it into a binding **MUST-NOT** governance clause for its own run. I did not ask for that and would not have thought to. It is a genuinely funny, and genuinely honest, side effect of "derive principles from the repo": the repo's own experimental purpose became part of its constitution.

Every principle came with a stated rationale, in the same style OpenSpec's `design.md` used — this is clearly a shared convention across these tools, not one tool's invention. The whole file is version-governed too: `1.0.0`, ratified today, with a semver amendment policy (MAJOR for principle removals, MINOR for new principles, PATCH for wording) written into a Governance section — a level of process ceremony OpenSpec's optional one-paragraph context field never asked for.

## Specifying Programmer Mode

```PROMPT
/speckit-specify Add a Programmer Mode, like calculators have had since Windows 7 — support switching to binary, octal, and hexadecimal, and calculating in those bases.
```

No clarifying question, same as OpenSpec. It wrote `specs/001-programmer-mode/spec.md` as three prioritized user stories (P1: enter/view numbers in another base, P2: calculate in that base, P3: switch bases mid-session without losing the value — each with an explicit "Independent Test"), twelve functional requirements, five measurable success criteria, and — distinct from OpenSpec's structure — a separate `checklists/requirements.md` that has to pass before planning can proceed. It passed cleanly, with a note explaining why no `[NEEDS CLARIFICATION]` markers were needed.

Here is the first genuine point of divergence between the two tools, not just of documentation style: OpenSpec chose a fixed 32-bit two's-complement word for negative values. Spec-Kit chose something else entirely:

> *"Negative values are shown as a leading minus sign followed by the magnitude in the selected base (sign-magnitude), not as two's-complement bit patterns. Bit width / word size (byte, word, dword, qword) selection is out of scope."*

Same ambiguity, same unstated request, two different real designs. Neither is wrong — sign-magnitude is arguably the simpler, more honest choice given neither of us asked for a specific word size — but it means whichever tool a team picks will ship a calculator that behaves differently for the exact same feature request, which is worth knowing going in.

## Planning it

```PROMPT
/speckit-plan
```

This stalled immediately: *"I'll pause here — please approve the `setup-plan.sh --json` command."* Checking why revealed a real structural difference from OpenSpec: none of Spec-Kit's skills declare an `allowed-tools` frontmatter the way OpenSpec's `propose`/`apply` pre-authorize `Bash(openspec:*)`. So in a non-interactive session, *every* Bash call needs approval here — even Spec-Kit's own bundled setup scripts — not just calls outside a pre-approved pattern. I ran the script myself and fed its JSON back in a follow-up turn, the same way I handled OpenSpec's verification gaps.

The output was five separate files — `plan.md`, `research.md`, `data-model.md`, `contracts/calculator-engine.md`, `quickstart.md` — a noticeably different shape from OpenSpec's single `design.md`. The centerpiece is `plan.md`'s **Constitution Check**, a literal pass/fail table, one row per principle:

| Principle | Result |
|---|---|
| I. Separation of Concerns | PASS |
| II. Test-First for Calculation Logic | PASS |
| III. No Build Step | PASS |
| IV. Baseline Fidelity | PASS |
| V. Simplicity & Minimalism | PASS |

OpenSpec's optional context field has no equivalent gate — it is informational, not enforced. This is a real, structural difference the source article's "constitution every spec inherits" framing predicted, and it is genuinely stricter than what OpenSpec does.

`research.md` explained the sign-magnitude choice with a rationale that reads differently in kind from OpenSpec's:

> *"JavaScript's built-ins already do exactly what the spec requires: `parseInt` accepts a radix... `toString(radix)` on a negative number already returns sign-magnitude form... with zero extra code."*

OpenSpec's design reasoning was domain-modelling-driven — what should a Programmer Mode integer *be*. Spec-Kit's is implementation-convenience-driven — what does the platform give us for free. Both are legitimate engineering reasoning, but they are different instincts, and it shows in the resulting feature: OpenSpec's is more fully specified (bit width, defined overflow) at the cost of more implementation; Spec-Kit's is simpler at the cost of leaving overflow behavior essentially unaddressed — `research.md` says plainly that "no test scenario in the spec exceeds `Number.MAX_SAFE_INTEGER`," which is true, but is also just not a real answer to what happens when one does.

## Generating tasks

```PROMPT
/speckit-tasks
```

Same approval wall (`setup-tasks.sh`), same workaround. The result: 23 tasks organized **by user story** — Setup, Foundational, then US1/US2/US3 phases, each task tagged `[P]` where it can run in parallel and labeled with which story it belongs to. This is a materially different organization from OpenSpec's by-layer tasks.md (engine, then UI, then tests) — Spec-Kit's structure is explicitly built around the idea that a team could split US1/US2/US3 across people and work them in parallel, values the source article specifically praised OpenSpec for.

The most concrete evidence yet that the constitution is not just documentation showed up here, unprompted:

> *"Tests are included as real tasks (not skipped as 'optional') because this project's constitution (Principle II) mandates test-first coverage for all `CalculatorEngine` changes."*

That is a direct, causal line from a decision made three steps earlier — with no input from me — to a concrete difference in this step's output. OpenSpec's context field never got to demonstrate anything like that, because I left it empty and it simply did nothing. Here, "empty" still produced a governing document, and that document is now visibly steering what gets built.

Next: `/speckit-implement`, to see whether the code matches what all of this planning promised.
