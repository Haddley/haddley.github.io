---
type: post
slug: agenticaiforprofessionals4
title: "Agentic AI for Professionals (Part 4)"
date: "2026-08-26"
part: 4
builds_on: [agenticaiforprofessionals1, agenticaiforprofessionals2, agenticaiforprofessionals3]
topics: [agentic-ai, legal-tech, citation-graph-analysis, automated-legal-research]
tools: [nsw-legal-research-assistant, Thomson Reuters CoCounsel Legal, NSW Caselaw]
status: current
checked: "2026-11-05"
source_hash: "26f7392c333f"
generated_by: gemma4:12b
---

**Summary.** I built a Brief Builder feature into the nsw-legal-research-assistant to automate the process of turning a pleading into a structured legal motion. The feature demonstrates how agentic AI can handle complex tasks like identifying core arguments, fetching relevant authorities, and navigating citation graphs to ground legal reasoning.

## What I did
- I built a Brief Builder feature inspired by Thomson Reuters CoCounsel Legal.
- I implemented a system to extract and verify facts from uploaded pleadings.
- I integrated a citation-graph lead system to suggest related cases and legislation.
- I automated the development of legal arguments by grounding them in a dynamic authority database.
- I ensured the system maintains strict citation integrity by refusing to fabricate information.

## Claims
- The Brief Builder is a new feature inspired by Thomson Reuters CoCounsel Legal.
  > "This post is a new feature entirely: **Brief Builder**, inspired by the newly announced Brief Builder feature in Thomson Reuters CoCounsel Legal — take a pleading in, propose candid arguments, develop each one against real authority, and produce a properly formatted motion."
- The system ensures every key fact is an exact substring of the uploaded document.
  > "Every key fact is verified as an exact substring of the uploaded document before it is ever shown."
- The app provides one-click leads from a judgment's own citation list when a call is ungrounded.
  > "Along the way, a newer feature gets its first real workout: when a develop call comes back ungrounded, the app now offers one-click leads pulled straight out of an already-fetched judgment's own citation list."
- The system identifies and presents related cases and legislation from the citation graph without manual input.
  > "Right below that, a feature new to this build: a second section pulls related cases and legislation straight out of the citation graph of documents already sitting in the authority database — no search, nobody typed anything:"
- The app does not fabricate citations to fill gaps in the reasoning.
  > "The behavior worth naming is the same one from every prior beat in this series: the app never fabricates a citation to fill a gap, whether that gap is a single argument with nothing to say or a citation-graph lead that only points *near* the case actually worth following."
- The system provides a plain-English search result that includes the target case.
  > "Typing the plain-English `defective motor vehicle` instead returns a real, on-topic result set with the target case as the **second** hit:"

## Outcome
I built a Brief Builder that automates the transition from a pleading to a grounded legal motion. The system successfully identifies, develops, and grounds legal arguments using a combination of plain-English search and citation-graph navigation.

## Caveats
The post uses a fictional case fact pattern where identifying details have been changed.
