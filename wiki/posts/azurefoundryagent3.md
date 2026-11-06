---
type: post
slug: azurefoundryagent3
title: "Azure Foundry Agent (Part 2)"
date: "2026-10-27"
part: 2
builds_on: [azurefoundryagent2, azurefoundryagent]
topics: [hosted-agents, azure-ai-search, python-development, llm-evaluation]
tools: [Azure AI Foundry, Azure AI Search, Azure Developer CLI (azd), PyMuPDF, pypdf, Claude]
status: current
checked: "2026-11-05"
source_hash: "d34f524a9ecd"
generated_by: gemma4:12b
---

**Summary.** I built a hosted agent in Microsoft Foundry that uses custom Python code to process deposition PDFs and search an Azure AI Search index. The agent successfully retrieved and cited specific page and line numbers, though it still requires human oversight to identify complex logical conflicts between documents.

## What I did
- I built a hosted agent using Python code to replace a simple prompt agent.
- I integrated a search tool to query an Azure AI Search index of case documents.
- I configured the agent to automatically download and load my custom skills at startup.
- I tested the agent's ability to summarize transcripts and answer cross-document questions.
- I evaluated the agent's performance in identifying legal conflicts.

## Claims
- The hosted agent uses my own Python code and runs in a dedicated sandbox.
  > "In this post I build a hosted agent, which is my own Python code that Foundry runs."
- The agent downloads and unpacks skills from Foundry at startup.
  > "It downloads the skill at startup.** The code asks the Skills API for each name in `SKILL_NAMES`, unpacks the archive, and gives the folder to a `SkillsProvider`."
- The agent successfully retrieved information and cited correct page and line numbers.
  > "I checked every citation against the transcript pages, and they were right."
- The agent missed two specific conflicts that I found by reading the documents manually.
  > "In my runs the model missed both conflicts that I found by reading."
- The first deployment took 1 minute and 35 seconds.
  > "The first deploy took 1 minute 35 seconds. azd zips the source, uploads it, and Foundry resolves the dependencies and builds the agent remotely."
- The agent uses its own identity to access the search index without a secret key.
  > "It reads the index with its own identity, so there is no secret in an environment variable."

## Outcome
I built a hosted agent that automates the extraction of transcript data and performs cross-document searches. I concluded that while the agent is excellent for retrieval and citation, a lawyer must still verify the final analysis.

## Caveats
The agent's ability to identify nuanced logical contradictions between documents is not yet reliable enough to replace human review.
