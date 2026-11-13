---
type: post
slug: claudecode14
title: "Claude Code (Part 14)"
date: "2026-06-04"
part: 14
builds_on: [claudecowork1]
topics: [claude-code, legal-tech, deposition-summaries, prompt-engineering]
tools: [Claude Code, VS Code, Markdown]
status: current
checked: "2026-11-05"
source_hash: "348ebbe31ef7"
generated_by: gemma4:12b
---

**Summary.** I built a Claude Code skill called page-line-summary to automate the creation of professional deposition summaries from transcript files. The tool processes transcripts into structured Markdown documents that include case captions, examination indices, and strategic takeaways for attorney review.

## What I did
- I developed a skill to generate Page-Line Deposition Summaries.
- I integrated a process to capture case theory and representation side.
- I implemented a two-column table format for transcript references and summaries.
- I tested the skill using a personal injury case transcript.
- I configured the output to include strategic key takeaways.

## Claims
- The skill generates a professional summary from transcript files.
  > "I built a Claude Code skill called `page-line-summary` that generates professional Page-Line Deposition Summaries from transcript files."
- The tool produces a structured Markdown document for attorney review.
  > "It reads the transcript, asks which side you represent and your case theory, then produces a structured Markdown document — case caption, examination index, two-column page:line table, and strategic key takeaways — ready for attorney review."
- The skill installs with a single curl command.
  > "The skill installs with a single curl command and runs directly from the Claude Code CLI."
- The summary focuses on admissions, inconsistencies, and damages.
  > "The goal is about one page of summary per five to ten pages of transcript, focusing on admissions, inconsistencies, damages, and facts that directly support or undermine the case theory."
- The summary identifies the most strategically significant facts.
  > "3–5 bullet points identifying the most strategically significant facts from the standpoint of the represented side (or neutral observations if no side was given)."

## Outcome
I built a Claude Code skill that automates the creation of standard litigation deposition summaries. It transforms raw transcripts into structured, actionable documents for legal professionals.

## Caveats
The post does not show the specific internal prompt logic used to generate the summary.
