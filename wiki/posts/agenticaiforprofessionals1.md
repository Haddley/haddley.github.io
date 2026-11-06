---
type: post
slug: agenticaiforprofessionals1
title: "Agentic AI for Professionals (Part 1)"
date: "2026-08-18"
part: 1
builds_on: [contextinjection, langchain, docker, agenticaiforprofessionals2]
topics: [agentic-ai, rag-architecture, llm-research-workflows, software-development-lifecycle]
tools: [Claude Code, Docker, Ollama, FastAPI, React, TypeScript]
status: current
checked: "2026-11-05"
source_hash: "ed4e9c5084f9"
generated_by: gemma4:12b
---

**Summary.** I used a structured LLM-wiki research process to analyze the architecture of Thomson Reuters CoCounsel. I then translated those findings into a multi-phase implementation plan for a simplified legal research assistant.

## What I did
- Conducted nine research passes on CoCounsel products and corporate history.
- Identified key design principles like fixed skill catalogs and scoped RAG.
- Established a local-first development workflow using Docker and Ollama.
- Generated a seven-phase checklist for the application build.
- Completed the initial repository scaffolding and container setup.

## Claims
- The research process was iterative and grew in scope over nine passes.
  > "The research started narrow and grew across nine separate research passes over official product pages, press releases, and five YouTube transcripts."
- CoCounsel uses a fixed catalog of skills rather than an open chat box.
  > "**A fixed, tested catalog of skills — not an open chat box.** CoCounsel includes named skills such as Prepare for a Deposition, Draft Correspondence, Search a Database, Review Documents, Summarize a Document, Extract Contract Data, Contract Policy Compliance, and Timeline."
- The system is restricted to performing tasks within that specific catalog.
  > "It is restricted to only performing tasks inside that catalog."
- The system uses a curated, scoped document set rather than the open web.
  > "That constraint turned out to be the right one to build around, not a limitation to route past: a curated, scoped document set someone actually put together by hand, then a single RAG-grounded Q&A skill run on top of it."
- The development order prioritizes local execution before cloud deployment.
  > "That's not a cost-saving afterthought; it's the explicit build order, and it's also just a more honest way to develop something before paying to run it."
- The implementation plan is structured as a sequenced, checklist-style guide.
  > "Once the architecture was settled, I asked Claude Code to turn it into a sequenced, checklist-style build plan rather than trying to hold the whole thing in conversation:"
- The first phase of development is complete and the containers started cleanly.
  > "Phase 0 is done — I asked Claude Code to go ahead, and once Docker was actually installed on this machine, `docker compose up --build` pulled the `pgvector/pgvector:pg16` image, built both custom images, and started all three containers cleanly."

## Outcome
I established a technical roadmap and completed the initial infrastructure for a legal research assistant that mirrors CoCounsel's core design principles.

## Caveats
The post does not yet cover the RAG core or the specific bugs found during the integration of the LLM layer.
