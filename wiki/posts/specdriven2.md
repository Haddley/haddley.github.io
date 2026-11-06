---
type: post
slug: specdriven2
title: "Spec-Driven AI Tools (Part 2)"
date: "2026-09-29"
part: 2
builds_on: [specdriven1]
topics: [spec-driven-development, ai-agent-workflows, automated-testing, software-architecture]
tools: [OpenSpec, Spec-Kit, uv, Python, Bash]
status: current
checked: "2026-11-06"
source_hash: "ff641b924547"
generated_by: gemma4:12b
---

**Summary.** I conducted a comparative analysis of two spec-driven AI development tools, OpenSpec and Spec-Kit, by running them against the same set of requirements. I found that Spec-Kit's constitution-driven workflow caught a math error in its own specification and an integer-truncation bug during the convergence phase.

## What I did
- I set up both tools in a shared repository using separate worktrees to prevent file collisions.
- I ran both tools through a full development cycle for a calculator application.
- I compared the resulting designs, task organization, and error-catching capabilities.
- I performed a second pass of the Spec-Kit cycle to ensure the system converged on all requirements.

## Claims
- Spec-Kit's constitution produced binding rules even when I provided no input.
  > "With no principle input from me, it read the repo itself — README, `package.json`, file structure — and wrote five actual, binding principles: a Separation of Concerns rule (logic/DOM split), Test-First for calculation logic, No Build Step, Simplicity/YAGNI, and one I did not expect:"
- The two tools produced different technical designs for handling negative numbers.
  > "Same ambiguity, same unstated request, two different real designs."
- Spec-Kit organized tasks by user story rather than by technical layer.
  > "This is a materially different organization from OpenSpec's by-layer tasks.md (engine, then UI, then tests) — Spec-Kit's structure is explicitly built around the idea that a team could split US1/US2/US3 across people and work them in parallel, values the source article specifically praised OpenSpec for."
- The plan step in Spec-Kit caught a math error in the specification.
  > "Convergence caught a real integer-truncation bug, and the plan step caught a math error in its own spec."
- Spec-Kit's implementation included features that OpenSpec's proposal excluded.
  > "`/speckit-implement` built the whole feature unprompted: a `dataSet`/`dataEntryStarted`-based engine extension, `toggleSign`/`addDataPoint`/`removeDataPoint`/`clearDataSet`/`requestSum`/`requestAverage`/`requestStdDev`, and a `stats-panel` UI with a per-entry remove button — the User Story 4 scope OpenSpec's proposal had explicitly excluded."

## Outcome
I concluded that Spec-Kit's constitution-driven approach provides a more robust governance framework that caught specific technical errors during the development cycle.

## Caveats
The comparison shows that different tools produce different technical designs for the same requirements, meaning the choice of tool impacts the final implementation.
