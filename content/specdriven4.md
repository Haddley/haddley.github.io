---
title: "Spec-Driven AI Tools"
part: 4
description: "The comparison: what OpenSpec, Spec-Kit, and BMAD each did with the identical calculator and the identical two feature requests — where they genuinely agreed, where they quietly built different products, what it cost, and where the source article held up against running all three myself"
date: "2026-09-30"
categories: ["AI"]
tags: "openspec, spec-kit, bmad, spec-driven-development, claude-code, agentic-coding"
image: "/assets/images/specdriven4/hero-specdriven-verdict.svg"
slug: "specdriven4"
hidden: false
---

This is the last of four posts trying three spec-driven AI development tools against the same fixed task, prompted by [Ran the Builder's honest take on three spec-driven AI tools](https://ranthebuilder.cloud/blog/i-tested-three-spec-driven-ai-tools-here-s-my-honest-take). [Part 1](/posts/specdriven1/) ran [OpenSpec](https://github.com/Fission-AI/OpenSpec), [Part 2](/posts/specdriven2/) ran [Spec-Kit](https://github.com/github/spec-kit), [Part 3](/posts/specdriven3/) ran [BMAD](https://github.com/bmad-code-org/BMAD-METHOD) — each on a fresh copy of the same flat, four-function, Windows 1.0-style calculator, each given the identical two feature requests, worded the same way every time: a Programmer Mode and a Statistics Mode, both real Windows Calculator features, neither request engineered to hit a trap I already expected.

This post is where that control actually pays off. Three tools, one task, no averaging across different projects — so where they disagree, it is a real disagreement about what to build or how to check it, not noise from testing different things.

## The same ambiguities, three honestly different answers

I never specified bit width, negative-number formatting, or the standard-deviation formula. Here is what each tool did with that silence.

| Question | OpenSpec | Spec-Kit | BMAD |
|---|---|---|---|
| Negative numbers in Programmer Mode | Two's-complement, fixed 32-bit word — silently decided, rationale in `design.md` | Sign-magnitude — silently decided, rationale in `research.md` | Sign-magnitude — **asked me directly**, defaulted on "keep it simple" |
| Bitwise ops / word-size selection | Excluded — silent, documented non-goal | Excluded — silent, documented non-goal | Excluded — **asked me directly** |
| Disable invalid digit keys visually | Yes — DOM-level, "UI communicates what's valid" | **No** — explicit YAGNI call against the letter of its own requirement | Yes — DOM-level |
| Standard deviation formula | Population (n) — silently decided | Sample (n−1) — silently decided, and its own worked example initially got the math wrong (caught and fixed at planning) | Sample (n−1) — **asked me directly** |
| Empty-data-set Sum | Errors, same as Average/StdDev | Errors, same as Average/StdDev | Shows `0` — Average/StdDev still error (mathematically the more precise split) |
| Data-point removal | Out of scope, explicit non-goal | **In scope** — its own User Story 4 | Out of scope, explicit non-goal |
| Statistics + Programmer Mode coexistence | Statistics mode disables Programmer's operators/base toggle | Declared explicitly independent/orthogonal | Mutually exclusive — activating one turns the other off; data list persists across toggles |
| Standard arithmetic operators during Statistics Mode | Disabled | Disabled (a planning-stage decision, not a written requirement) | **Left live, deliberately** — reviewed, found reachable, kept as matching real Windows Calculator's "compute a value, then Add it" workflow |

Read across a row and the pattern holds: every ambiguity got a real answer, every answer was different at least once, and in three cases (negative-number format, bitwise scope, stddev formula) BMAD is the one tool that actually asked me instead of deciding on its own. I answered "keep it simple" every time I was asked, specifically so I would see each tool's own default rather than my own preference — the asking itself is the finding, not which default came out.

The two most consequential divergences are the operator-disabling ones. Three tools built three different products from "add a Statistics Mode," and only one of them — BMAD, after its review layer checked a finding and rejected it as a deliberate feature rather than a bug — actually lets you compute an expression and capture its result into the data set, which is closer to how the real Windows Calculator Statistics box behaves than either of the other two implementations.

## Three verification models, not one

This is where the three tools stopped resembling each other most.

**OpenSpec**: propose → apply → sync → archive. Once a change is archived, OpenSpec never looks at it again. Nothing in this series' two OpenSpec runs surfaced a bug after the fact, but that is not the same as OpenSpec having no bugs — it is that nothing in its workflow goes looking. I hand-verified both features myself (`npm test`, then clicking through the browser) precisely because the tool's own workflow stops at archive.

**Spec-Kit**: `/speckit-converge`, a step I had to explicitly re-invoke, sometimes several times. For Programmer Mode it took three rounds to reach "Converged" — round one found two test-coverage gaps, round two found a genuine integer-truncation bug (division in Programmer Mode wasn't truncating, so `11 ÷ 10` in binary displayed as `1.1`, directly contradicting the integer-only requirement — I reproduced it myself before trusting the claim), round three confirmed clean. For Statistics Mode, one round, zero findings — though the plan step for that same feature had already caught something rarer: a math error in its own earlier `/speckit-specify` output, a worked example that asserted the wrong standard deviation for a data set (I verified by hand: population stddev of `{2,4,4,4,5,5,7,9}` is `2`, which is what the spec wrongly claimed; sample stddev, what its own requirement actually specified, is `≈2.138090`). That is Spec-Kit catching a contradiction in its own prior output before a line of code existed, which is arguably a stronger result than catching the equivalent bug after implementation.

**BMAD**: a three-layer parallel review (named "Blind Hunter," "Edge Case Hunter," "Verification Gap") that runs automatically inside the same build pass, before anything reaches me. Across both features it found six real, patchable defects — Programmer Mode's activation not truncating a fractional value and a substring-matching bug in digit validation; Statistics Mode's Add silently re-adding a just-computed statistic and an inconsistent display formatter, plus assorted cosmetic fixes — and, just as informative, it correctly rejected several plausible-sounding false findings with a stated reason each, and correctly kept the "operators stay live" behavior as a deliberate feature rather than patching it away. I never saw a broken intermediate version of either feature.

Ranked by how much verification actually happened without my asking for a second pass: BMAD ran automatically every time; Spec-Kit ran only when I re-invoked it, but iterated until clean and caught its own spec's math error along the way; OpenSpec ran zero times after archive, by design.

## Who can actually read the documentation

A claim worth checking directly against our own artifacts, because it is easy to assert and easy to get backwards: which tool's documentation is written for a person, and which for the agent implementing it.

**All three core specs turned out to read the same way — clean prose, no code.** OpenSpec's archived spec:

```markdown
## Requirement: Base mode selection
The system SHALL provide a control to switch the active calculation base
among Decimal, Hexadecimal, Octal, and Binary...
```

Spec-Kit's `spec.md`, by explicit enforced rule — its own pre-planning checklist requires *"No implementation details," "Written for non-technical stakeholders"* — reads indistinguishably:

```markdown
### User Story 1 - Enter and view numbers in another base (Priority: P1)
A user switches the calculator into Programmer Mode and selects Binary, Octal,
or Hexadecimal. They enter a number using only the digits valid for that
base and see it displayed correctly.
```

Where the three tools actually diverge is what surrounds that clean core, and what happens to it afterward.

**Spec-Kit separates audiences into different files, most rigorously of the three — at the cost of volume.** Its `spec.md` stays clean, but four more files sit beside it, and they are unambiguously written for the implementer, not a stakeholder:

```markdown
# Contract: `CalculatorEngine` public API
| Field | Type | Description |
|---|---|---|
| `mode` | `"standard" \| "programmer"` | **New.** Current calculator mode. |
```

That split is a real strength — a non-technical reviewer never has to open `contracts/` or `research.md` — but the volume is a real, independently documented cost. A [genuine Spec-Kit usage report](https://github.com/github/spec-kit/issues/860) describes *"uncontrolled complexity escalation... 420 lines → 873 lines for similar features," "no guidance on 'appropriate size,'"* on real projects — a pattern our two small features didn't trigger, but a fair thing to weigh in.

**BMAD keeps everything in one file, marked but not separated.** Its `SPEC.md` puts human intent and engineering detail back to back:

```markdown
## Intent
**Problem:** The calculator only operates in decimal; users who need quick
binary/octal/hex conversions... have no way to switch bases.

## Code Map
- `calculator-logic.js` -- `CalculatorEngine`: add `base` state (default 10)
  and `setBase`...
```

The `<frozen-after-approval>` tag wrapping the human-owned section is a genuinely useful boundary marker — it tells a reader exactly where to stop if that is all they need — but it is a marker inside one document, not a separate file you could hand a stakeholder without the engineering detail riding along underneath it.

**Only OpenSpec produces something that stays true after the work is done.** Spec-Kit's and BMAD's specs live in their own per-feature folder and stay there; nothing merges them into a whole-system view. OpenSpec's delta model does exactly that — both archived changes in this series folded cleanly into one evolving `openspec/specs/` directory, so a team member arriving cold, months later, can open one file per capability and get an accurate answer with no changelog-archaeology required. That is a different, and arguably more valuable, kind of readability than "clean prose at planning time," and it is the one none of this series' comparisons captured until the archive step actually got tested.

(One external comparison making the rounds claims — using a citation I checked and could not verify — that Spec-Kit's output is "hard to read for non-technical reviewers (BAs/QA)." Our own artifacts don't support that as stated: its `spec.md` is the most rule-enforced human-safe document of the three. The real, checkable version of that concern is the volume risk above, not the register of the spec itself.)

## Operational friction, running all three the same way

None of the three tools' own slash-command skills declared enough pre-authorization to run start-to-finish without me approving something, but the shape of the friction differed:

- **OpenSpec** pre-authorizes its own CLI calls (`Bash(openspec:*)` in its command frontmatter), so a non-interactive run gets furthest before hitting a wall — usually only at verification (`npm test`), which the workflow explicitly expects a human to run anyway.
- **Spec-Kit** pre-authorizes nothing. Every Bash call, including its own bundled setup scripts, needed approval. I ran those scripts myself and fed the output back, every single step.
- **BMAD** needed the most: two separate plugins to reach the same starting line the other two reached with one install command, a filesystem-read approval for skill reference files living outside the project (they load from a global plugin cache, not local project files), a one-time subagent-authorization prompt, and the same per-Bash-call wall as Spec-Kit on top of all of it. The heaviest lift of the three to run unattended — none of which reflects on output quality, but a real cost a team would feel from day one.

## What it cost

Pulled from the actual session transcripts of every `claude` invocation across all three tool runs — real token counts, not estimates:

| | Cache write | Cache read | Output | Approx. cost | vs. OpenSpec |
|---|---:|---:|---:|---:|---:|
| **OpenSpec** | 1,083,092 | 18,027,680 | 270,815 | **≈$9.02** | 1.0× |
| **Spec-Kit** | 2,988,806 | 49,760,105 | 664,711 | **≈$24.07** | 2.7× |
| **BMAD** | 4,414,254 | 40,756,494 | 462,433 | **≈$23.81** | 2.6× |

(Sonnet 5 pricing, standard cache-token multipliers — cache write ≈1.25× input rate, cache read ≈0.1×.) OpenSpec was the clear cheapest in our own runs, and Spec-Kit and BMAD landed close together at roughly 2.6–2.7× OpenSpec's cost.

Two honest caveats before trusting that table too far. First, it measures what it actually cost *us* to run this investigation, friction included — every non-interactive Bash-approval workaround was an extra round-trip, and BMAD's own multi-agent review architecture spawns more calls by design than a single-agent tool ever would, so part of OpenSpec's advantage here is "asked for fewer workarounds," which is a real advantage but not purely a measure of raw model cost. Second, these numbers are not directly comparable to the source article's own figures — different model generation, different task, different measurement method (per-tool total there, per-session-directory sum here). The article reports OpenSpec at $95 total (the highest *implementation* cost of its non-BMAD-Full group, in fact), Spec-Kit at $75, BMAD Quick at $85, and BMAD Full — a heavier mode we never exercised, since our `bmad-build` runs stayed on its lightweight path both times — at $200. Its own stated conclusion: *"BMAD Quick, Spec-Kit, and OpenSpec land in the same ballpark on both speed and cost. The differences are noise."* Our numbers disagree with the article's exact rank order between OpenSpec and Spec-Kit, but land on a similar shape: three tools within roughly the same order of magnitude, one heavier mode of one tool (BMAD Full, which we did not test) as the real outlier.

## Against the source article

Worth stating plainly where independently running all three actually changed my view, rather than confirming what I read first.

**"OpenSpec assumes context and adds unstated rationale."** This undersells it. Every judgment call I watched OpenSpec make — 32-bit two's-complement, the overflow-wraparound rule, population standard deviation — came with a named alternative it considered and rejected, in a dedicated Decisions section, before a line of code existed. It did not ask me, but it did not hide its reasoning either. "Silent but documented" is a real, different thing from "silent and unstated," and the article's phrasing reads as the latter.

**"BMAD: full-lifecycle framework with dedicated elicitation and course-correction workflows."** True, and worth a footnote: BMAD has been substantially rewritten (v6, a skills-based architecture, monthly releases with real breaking changes) since whatever version the article likely tested. The classic `elicitation`/`correct-course` concepts survive as skills, but the tool that installs today is not the same shape the article's description implies. That is itself a finding — a spec-driven-tools comparison can go stale within months in this space, and BMAD's own changelog is the clearest evidence of that in this whole series.

**"OpenSpec: best out-of-the-box experience, parallel work by default."** Confirmed, specifically on the low-friction dimension — fewest approval walls, no plugin installs, fastest path from a bare repo to an archived, working change. I would not use "parallel work by default" to describe what I actually saw, though: OpenSpec's `tasks.md` groups by implementation layer (engine, then UI, then tests), where Spec-Kit's is explicitly organized by user story with `[P]` parallel markers and a stated MVP-first strategy — if "built for a team to split work" is the claim, Spec-Kit's task structure is the one that actually shows it.

**Cost claims generally.** The specific multipliers sometimes repeated about this space (that OpenSpec is dramatically cheaper, or that BMAD costs many times more by default) are not supported by either the article's own published figures or by what we measured running all three ourselves. Both datasets show three tools in a broadly similar cost band, with only BMAD's heavier PRD/architecture mode — which neither the article's "BMAD Quick" arm nor our own runs exercised — landing meaningfully higher.

## Mainstream standard, lightweight choice, simulated dev team

A framing worth keeping, refined against everything above:

**Spec-Kit reads as the most conventionally rigorous.** GitHub-backed, the heaviest artifact set of the three (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `tasks.md`, plus a pre-planning quality checklist), and the only one with a literal enforced gate — the Constitution Check, a pass/fail table checked against every principle before planning can proceed. Closest to a conventional, audited SDLC of the three, and it earned that with the article's spec math-error catch and the division-truncation bug, both real.

**OpenSpec reads as the lightweight choice**, more precisely: low-ceremony rather than strictly "agile" in the formal sense — nothing about sprints, backlogs, or iteration cadence, just the fastest, cheapest, least-friction path from a plain request to an archived, working, documented change. Its delta-spec model genuinely works: two archived changes accumulated cleanly into a living `specs/` directory that read as accurate both times.

**BMAD reads as the simulated development team, and not just as branding.** Five named personas with distinct stated voices, a literal `team = "software-development"` field in its own config, and — the concrete evidence, not just the flavor — it is the only tool that stopped and asked me real product decisions the way a PM actually would, and the only one whose review process is explicitly adversarial by design (three differently-named review layers, each checking the others' blind spots) rather than a single pass.

## So, which one

Not "which is best" in the abstract — which is what the article itself was right to avoid too. Grounded in what actually happened across six full feature cycles:

- **Want the fastest, cheapest path to a working, documented change, and you are comfortable owning your own judgment calls without being asked?** OpenSpec. Its documented-but-silent decisions are a real trade-off, not a flaw, and the delta-spec model held up honestly under the one test I could give it.
- **Want the most rigorous, most conventional process, with an enforced gate and a workflow that keeps checking itself until it can prove correctness?** Spec-Kit. It caught the most surprising bug in this whole series — a contradiction in its own earlier output — before any code existed.
- **Want to be asked rather than guessed for, and want verification to happen automatically rather than on your own initiative?** BMAD. It is the heaviest to set up and the most expensive of the three in our own runs, and that cost bought something real: the only tool that treats "check whether this is actually a bug before fixing it" as seriously as "find bugs."

All three repos are public and unedited: [github.com/Haddley/specdriven](https://github.com/Haddley/specdriven) — `main` for OpenSpec, `spec-kit` and `bmad` branches for the other two — full commit history from the identical baseline through every propose, plan, build, and review, nothing cleaned up after the fact.
