---
type: post
slug: LLM-Wiki
title: "LLM Wiki"
date: "2026-04-20"
builds_on: []
topics: [llm-knowledge-bases, claude-code-workflows, knowledge-graph-construction, structured-data-ingestion]
tools: [Claude Code, Obsidian, YAML]
status: current
checked: "2026-11-05"
source_hash: "ac39f314f135"
generated_by: gemma4:12b
---

**Summary.** I built a personal knowledge base using Claude Code inspired by Andrej Karpathy's LLM Wiki. I ingested various documents into a structured system to enable Claude to perform complex cross-referencing and drafting tasks.

## What I did
- I established a consistent YAML frontmatter schema for all wiki pages.
- I created a master index and an activity log to track all ingested content.
- I defined the project structure and ingest workflow in a CLAUDE.md file.
- I ingested legal documents and records into the system.
- I used Claude Code to compare cases and draft legal documents.

## Claims
- The system uses a consistent YAML schema to organize data.
  > "Each page follows a consistent YAML frontmatter schema with type, sources, confidence level, and related pages."
- I used a specific file to define the wiki schema and workflow.
  > "*I set up the CLAUDE.md file defining the wiki schema — project structure, YAML frontmatter conventions, and the ingest workflow*"
- The system allows for cross-referencing to find patterns and draft documents.
  > "The power is in the cross-referencing: once your documents are in the wiki, you can ask Claude to compare cases, find patterns, or draft documents grounded entirely in your own ingested material."
- I successfully used the system to draft a Rule 5.2 summons and affidavit.
  > "*I asked Claude Code to draft a Rule 5.2 summons and affidavit using the ingested legal precedents and case details*"
- I used the system to compare my specific case to other similar cases.
  > "*I asked Claude Code to compare my case to a similar Dog Attack case I had ingested into the wiki*"

## Outcome
I built a structured knowledge base that allows me to query across diverse documents and generate grounded content. I proved the effectiveness of this system by applying it to a complex legal case.

## Caveats
The post does not detail the specific manual effort required to clean raw data before ingestion.
