---
title: "Agentic AI for Professionals"
part: 1
description: "Using a structured LLM-wiki research process to study Thomson Reuters CoCounsel's architecture, then turning that research into an implementation plan for a simplified legal research assistant"
date: "2026-08-18"
categories: ["AI"]
image: "/assets/images/agenticaiforprofessionals1/hero-cocounsel.png"
tags: "llm-wiki, rag, claude-code, legal-tech, product-research"
hidden: false
slug: "agenticaiforprofessionals1"
---

This `agentic-ai-for-professionals` project includes a research wiki, `llmwiki/`, that Claude Code maintains itself, with its own schema and its own workflow, sitting alongside `apps/` where the application code lives.

Instead of opening Claude Code and asking it to build something, I spent the first several sessions asking it to *research* Thomson Reuters' CoCounsel products.

This first post is about "NSW Legal Research Assistant," an app inspired by Thomson Reuters' CoCounsel Legal and the background of that product.

## Researching Thomson Reuters CoCounsel, one pass at a time

The research started narrow and grew across nine separate research passes over official product pages, press releases, and five YouTube transcripts. Research is naturally iterative like this: each pass works from whatever is in front of it, and the picture sharpens as more sources come in.

A [Tech Series interview with Thomson Reuters' CTO Joel Hron](https://www.youtube.com/watch?v=RM6EmiAGSeg), hosted by Marcelo Santis, and a hands-on CoCounsel Legal demo with a former Casetext VP were the two sources that filled the picture out properly. From the Hron interview I learned that he founded ThoughtTrace, and I confirmed the acquisition itself against [Thomson Reuters' own Legal Current announcement](https://www.legalcurrent.com/thomson-reuters-acquires-thoughttrace/): agreement announced March 2022, deal confirmed April 14, 2022, financial terms not disclosed. From his position as CTO after that deal, Joel went on to architect a roughly $3.2B acquisition strategy spanning ThoughtTrace, Casetext, Materia, and several others. **CoCounsel was originally created by Casetext**, founded 2013 and acquired by Thomson Reuters for $650M in 2023, over a year before Materia. Materia's 2024 acquisition extended an *already-existing* CoCounsel platform into tax and accounting.

## What CoCounsel Legal's architecture looks like

![](assets/images/agenticaiforprofessionals1/thomsonreuters-cocounsel-au.png)
*Thomson Reuters' own CoCounsel product page for the Australian market*

The richest detail came from that [same hands-on demo transcript](https://www.youtube.com/watch?v=VTOiMbOTLaE) and a later [bar-association CLE webinar](https://www.youtube.com/watch?v=6IbckYMUVCs). A few things stood out as genuinely deliberate design choices, not incidental implementation detail:

**[RAG](/posts/contextinjection/) grounding is the core trust mechanism, not a feature.** Every answer has to be grounded in specified or uploaded data, with a hyperlink and an excerpt from the source document backing every claim — "showing its work" serves two purposes at once: the model can't just free-associate, and the professional using it can verify a claim without redoing the underlying research themselves. This is the single most repeated design principle across every CoCounsel source found in the whole research effort. It's also the same pattern I've built hands-on before, from an early [LangChain RAG app](/posts/langchain/) through to a more recent [Azure AI Foundry agent](/posts/azurefoundryagent/) (backed by Chroma and then Azure AI vector search).

**A fixed, tested catalog of skills — not an open chat box.** CoCounsel includes named skills such as Prepare for a Deposition, Draft Correspondence, Search a Database, Review Documents, Summarize a Document, Extract Contract Data, Contract Policy Compliance, and Timeline. It is restricted to only performing tasks inside that catalog. Some customers complain "we don't let CoCounsel do enough" — the design philosophy prioritises not generating unguarded, untested output over maximising perceived capability.

Our **"Search a Database"** skill (inspired by the CoCouncil Legal "Search a Database" skill) answers a prompt using relevant chunks from a user-curated set of documents — not a web-scale index.** In the Thomson Reuters demo, the presenter used a 200-contract database she had assembled herself, documents added to it by hand. By design, a database — a curated set of documents — is strictly scoped to whatever has been manually uploaded, never the open web.

Our **"Review Documents"** skill (inspired by the CoCouncil Legal "Review Documents" skill) genertes a multi-question, multi-document grid — not a single chat answer. Rather than one question grounded by the relevant chunks from a set of documents, it runs a set of questions against the relevant chunks of every document in a scoped set in turn, returning a results grid with one row per document, one column per question, distinct from "Search a Database"'s single grounded answer.

Our **"Skill-chaining"** feature allows the results of one skill to be reused. To draft a letter say. 

## From research to plan

The documents this app is grounded on are legal case decisions, manually copied into a couple of `nsw-legal-research-assistant` databases — exactly the same manual-curation step CoCounsel Legal's own "Search a Database" traditionally required, per the research above: databases there are user-assembled document sets too, not an automated index of anything. That constraint turned out to be the right one to build around, not a limitation to route past: a curated, scoped document set someone actually put together by hand, then a single RAG-grounded Q&A skill run on top of it.

## Turning the plan into an architecture

I wanted this build to line up with Thomson Reuters' current engineering choices. That reframed the architecture decision away from "the leanest possible personal project" toward deliberately mirroring Thomson Reuters' confirmed stack wherever the research had actually established what that stack was:

| Layer | Decision | Why |
|---|---|---|
| Backend | Python + FastAPI | Matches Thomson Reuters' confirmed choice for Materia/CoCounsel Tax |
| Frontend | React + TypeScript | Matches their confirmed choice for the CoCounsel Applications team |
| Retrieval | Postgres + pgvector, containerized | Real RAG rather than context-stuffing, justified by a realistic 50–200 document corpus; matches their Postgres-centric data layer |
| LLM orchestration | Provider-agnostic wrapper — Anthropic, OpenAI, DeepSeek, **and Ollama** | Mirrors their own confirmed multi-model principle; Ollama is a deliberate *addition* beyond their stack (they're cloud-API-only at their scale) — a demonstration of broader range, not an attempt to match them exactly |
| Local development | Docker Compose | Runs the whole stack — Postgres, backend, frontend — on my own 32GB M4 MacBook Air, no cloud dependency to get started, using the same [Docker](https://haddley.github.io/posts/docker/) fundamentals I've relied on before |
| Deployment target | AWS, specifically EKS | Matches their confirmed infrastructure, and I've actually run an EKS cluster before ([haddley.github.io/posts/amazoneks](https://haddley.github.io/posts/amazoneks/)) |
| MCP | A server exposing the Q&A skill, built now rather than deferred to a later version | Directly mirrors the external integration strategy (MCP/A2A) Thomson Reuters is confirmed to be building right now — the single most literal skill-match available |

The local-vs-cloud split matters for how this series will unfold: everything runs locally first — [Docker](/posts/docker/) Compose on the M4 MacBook Air, Ollama for models that need no API key and no cloud dependency at all — and only gets deployed to AWS once it's provably working end to end. That's not a cost-saving afterthought; it's the explicit build order, and it's also just a more honest way to develop something before paying to run it.

## The build plan, and what's done so far

Once the architecture was settled, I asked Claude Code to turn it into a sequenced, checklist-style build plan rather than trying to hold the whole thing in conversation:

- **Phase 0** — repo scaffolding: FastAPI backend, React/TypeScript frontend, `docker-compose.yml` wiring backend/frontend/Postgres+pgvector together, `.env.example` documenting every provider's variables up front.
- **Phase 1** — curated document ingestion: manual PDF upload, page-safe chunking, embeddings.
- **Phase 2** — the provider-agnostic LLM layer (Anthropic/OpenAI/DeepSeek/Ollama behind one interface).
- **Phase 3** — the one core skill: RAG-grounded, citation-linked Q&A, with an explicit no-answer-without-grounding guardrail.
- **Phase 4** — the React/TypeScript frontend: upload view, chat view with pinpoint citations.
- **Phase 5** — an MCP server exposing the same skill to Claude Code or any other MCP client.
- **Phase 6** — local validation and hardening, expanding the corpus toward the full 50–200 document range.
- **Phase 7** — AWS/EKS deployment, mirroring my own known `eksctl`/`kubectl` workflow.

Phase 0 is done — I asked Claude Code to go ahead, and once Docker was actually installed on this machine, `docker compose up --build` pulled the `pgvector/pgvector:pg16` image, built both custom images, and started all three containers cleanly. `curl http://localhost:8000/health` came back `{"status":"ok","database":"ok","llm_provider":"anthropic"}` — a real round-trip through Postgres, not just a liveness ping — and the frontend served on `localhost:5173`.

[Part 2](/posts/agenticaiforprofessionals2/) covers Phases 1 through 3 — the actual RAG core, running entirely on the M4 with Docker and Ollama, including a similarity-threshold bug that only showed up once I asked the system a question its documents genuinely couldn't answer.
