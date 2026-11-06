---
type: post
slug: claudecowork1
title: "Claude Cowork (Part 1)"
date: "2026-06-04"
part: 1
builds_on: [claudecode14]
topics: [claude-cowork, deposition-summaries, skill-integration, legal-tech]
tools: [Claude Cowork, Claude Code, PDF]
status: current
checked: "2026-11-05"
source_hash: "372669d1d176"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to use the page-line-summary skill within the Claude Cowork desktop application. I show how the application simplifies the process of generating deposition summaries from transcript PDFs without requiring terminal commands.

## What I did
- I uploaded the skill as a zip file through the user interface.
- I attached a deposition transcript using the @ command.
- I answered context questions regarding the case theory.
- I generated a structured page line summary from the transcript.

## Claims
- Claude Cowork is a desktop application that supports projects and skills without terminal requirements.
  > "Claude Cowork is the desktop app version of Claude — it works with projects (local folders), skills, and scheduled tasks, without needing the terminal."
- I did not need to use a curl command to install the skill.
  > "I didn't need a curl command to install the skill."
- The skill picker displays the description of the skill as a tooltip.
  > "The skill picker showed page-line-summary with its description as a tooltip."
- I attached the PDF deposition transcript directly to the skill invocation.
  > "*I attached the PDF deposition transcript directly to the skill invocation before submitting*"
- The summary includes 3 to 5 bullet points of strategically significant facts.
  > "3–5 bullet points identifying the most strategically significant facts from the standpoint of the represented side (or neutral observations if no side was given)."
- The summary must lead with the single most important finding.
  > "Lead with the single most important finding."

## Outcome
I built a workflow to automate the extraction of key facts from legal transcripts using Claude Cowork. I successfully generated a structured summary from a deposition transcript.

## Caveats
The post does not show the specific internal logic of the skill's code.
