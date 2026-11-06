---
type: post
slug: specdriven1
title: "Spec-Driven AI Tools (Part 1)"
date: "2026-09-29"
part: 1
builds_on: [specdriven2]
topics: [spec-driven-development, ai-tool-evaluation, automated-documentation, software-architecture]
tools: [OpenSpec, Node.js, Git]
status: current
checked: "2026-11-06"
source_hash: "d17ea365ae65"
generated_by: gemma4:12b
---

**Summary.** I tested the OpenSpec tool by running it through two full cycles to implement Programmer and Statistics modes on a custom calculator. I found that while the tool successfully generated accurate documentation and code, its behavior regarding interactive prompts and internal logic choices varied between runs.

## What I did
- I built a plain HTML/CSS/JS calculator as a fixed point of comparison.
- I ran the OpenSpec tool to implement a Programmer Mode.
- I ran the OpenSpec tool to implement a Statistics Mode.
- I compared the resulting documentation and code against the original requirements.
- I analyzed the consistency of the tool's behavior across both runs.

## Claims
- The calculator project is separated into logic and DOM layers to ensure it is testable.
  > "The calculation engine (`calculator-logic.js`) is separated from the DOM wiring (`calculator.js`), so it is directly testable: twelve tests cover the four operations, chained entry, decimal input, and division by zero."
- OpenSpec did not ask any clarifying questions before generating the first set of documents.
  > "OpenSpec did not ask a single clarifying question."
- The tool made several independent decisions regarding bit width and overflow behavior without asking.
  > "That matters, because the request I gave it left real decisions open, and it made every one of them itself:"
- The tool flagged a specific risk regarding the engine level of button disabling.
  > "It also flagged a risk against itself, unprompted: disabling the operator and base-toggle keys is DOM-layer only (matching Programmer Mode's precedent), so calling `engine.setOperator()` directly while Statistics mode is active would not actually be blocked at the engine level."
- The second proposal used the first one as a precedent for its own logic.
  > "That is a real, observable consequence of `specs/` already holding one archived capability: the second proposal used the first as precedent instead of deciding from nothing."
- The tool's behavior for the archive command varied between the two runs despite identical conditions.
  > "Same command, same clean-checks situation, different behavior."
- The final specifications for both features read as accurate documentation of the calculator's behavior.
  > "`openspec/specs/` now holds two capabilities, `programmer-mode` and `statistics-mode`, from two separately archived changes, each still reading as accurate documentation of what the calculator actually does."

## Outcome
I concluded that OpenSpec successfully produces accurate documentation and code from delta specs, though it occasionally exhibits inconsistent interaction patterns.

## Caveats
I did not see the tool attempt to merge a modified requirement without losing an existing scenario because neither proposal touched the same capability twice.
