---
title: "Agentic AI for Professionals"
part: 1
description: "Using a structured LLM-wiki research process to study Thomson Reuters CoCounsel's architecture, then turning that research into an implementation plan for a simplified NSW Caselaw research assistant"
date: "2026-08-18"
categories: ["AI"]
image: "/assets/images/agenticaiforprofessionals1/hero-nsw-caselaw.png"
tags: "llm-wiki, rag, claude-code, legal-tech, product-research"
hidden: false
slug: "agenticaiforprofessionals1"
---

I've started a new project, `agentic-ai-for-professionals`, and this post is really about pulling back the curtain on something I've been doing for a while rather than introducing something new: keeping research and planning documents living alongside the code in the same dev repo, not just the code itself. The [Game Night series](/posts/gamenight1/) already showed a lighter version of this — every game there has its own companion `*plan.md` written before a line of it got built. This project just makes the pattern more formal: a proper research wiki, `llmwiki/`, that Claude Code maintains itself, with its own schema and its own workflow, sitting alongside `apps/` where the actual application code lives. Instead of opening Claude Code and asking it to build something, I spent the first several sessions asking it to *research* something — treating product research as a discipline in its own right, with the same rigour I'd want from a human analyst, before a single line of application code got written. This first post is about that research process, what it actually found, and how it turned into a concrete plan to build a simplified, personal version of Thomson Reuters' CoCounsel Legal, grounded on the free [NSW Caselaw](https://www.caselaw.nsw.gov.au/about) database instead of a commercial one.

## The llmwiki approach

The repo's `CLAUDE.md` sets up two halves: `llmwiki/`, a research wiki Claude Code owns and maintains, and `apps/`, where actual applications get built once the research says something's worth building. The wiki itself splits further — `llmwiki/raw/` holds immutable source material (press releases, product pages, YouTube transcripts I pasted in), and `llmwiki/wiki/` is entirely LLM-generated from it, with a fixed schema on every page:

```
---
title: Page Title
type: concept | entity | source-summary | comparison
sources: [list of llmwiki/raw/ files referenced]
related: [list of wiki pages linked]
created: YYYY-MM-DD
updated: YYYY-MM-DD
confidence: high | medium | low
---
```

That `confidence` field matters more than a formality — it's an honest record of how sure the research actually is. And the workflow is deliberately a loop, not a one-shot summarise-and-forget: an **ingest** step reads a new raw source and updates every wiki page it touches; a **query** step answers a question by reading the existing wiki first and citing `[[wiki-links]]` rather than free-associating; and a **lint** step — the one I think matters most — periodically checks the whole wiki for contradictions between pages, orphaned pages nothing links to, concepts mentioned but never given their own page, and claims that a newer source has quietly superseded.

## Researching Thomson Reuters CoCounsel, one pass at a time

The research started narrow — Materia, a tax/audit/accounting AI startup Thomson Reuters acquired in October 2024 — and grew across nine separate research passes over official product pages, press releases, and five YouTube transcripts I supplied directly. Research is naturally iterative like this: each pass works from whatever's in front of it, and the picture sharpens as more sources come in. The origin story is a good example of that in action.

Two transcripts I fed in during the third pass filled the picture out properly: a Tech Series interview with Thomson Reuters' CTO Joel Hron, and a hands-on CoCounsel Legal demo with a former Casetext VP. Between them, the fuller lineage came out: **CoCounsel was created by Casetext**, founded 2013 and acquired by Thomson Reuters for $650M in 2023 — over a year *before* Materia. Joel Hron himself founded a different company entirely, ThoughtTrace (acquired 2022), and from his position as CTO went on to architect a roughly $3.2B acquisition strategy spanning ThoughtTrace, Casetext, Materia, and several others. Materia's 2024 acquisition extended an *already-existing* CoCounsel platform into tax and accounting, rather than creating the brand itself.

That's the value of keeping a wiki instead of just chatting and moving on: the earlier read was written down, with its sources and a `confidence` rating attached, so a later, better-sourced pass could update it in place rather than the two versions just sitting in disconnected conversations. The update is left visible in the wiki's log rather than silently overwritten, so the reasoning trail — what was known when — stays intact.

## What CoCounsel Legal's architecture actually looks like

The richest architectural detail came from that same hands-on demo transcript and a later bar-association CLE webinar. A few things stood out as genuinely deliberate design choices, not incidental implementation detail:

**RAG grounding is the core trust mechanism, not a feature.** Every answer has to be grounded in specified or uploaded data, with a hyperlink and an excerpt from the source document backing every claim — "showing its work" serves two purposes at once: the model can't just free-associate, and the professional using it can verify a claim without redoing the underlying research themselves. This is the single most repeated design principle across every CoCounsel source found in the whole research effort.

**A "Trust Team" of licensed lawyers writes the test suites.** Described in one source as "law school type exams for a machine" — domain experts working directly alongside the ML engineers, as a genuine hiring line and career path, not a QA afterthought. Accuracy benchmarks were deliberately never published; trust gets built through the citation/verification UX instead.

**A fixed, tested catalog of eight skills — not an open chat box.** CoCounsel Core is the platform name, not one of the eight skills it hosts, which ships exactly eight named skills — Prepare for a Deposition, Draft Correspondence, Search a Database, Review Documents, Summarize a Document, Extract Contract Data, Contract Policy Compliance, and Timeline. Crucially, it's restricted to only performing tasks inside that catalog: it will not attempt to draft a legal brief if no "draft a brief" skill has been built and tested yet, even though the underlying model technically could. Some customers complain "we don't let CoCounsel do enough" — the design philosophy prioritises not generating unguarded, untested output over maximising perceived capability.

**"Search a Database" is just a user-curated document set — not a web-scale index.** One demo used a 200-contract database the presenter had assembled herself; databases are strictly scoped to whatever's been uploaded, never the open web. That one detail turned out to be the key that unlocked the NSW app below.

Underneath all of it: Thomson Reuters runs a private, dedicated GPT-4 instance under a zero-retention relationship with OpenAI — uploaded content never trains the model and never persists at OpenAI's end.

## From research to plan: grounding a simplified version on NSW Caselaw

![](assets/images/agenticaiforprofessionals1/nsw-caselaw-about.png)
*NSW Caselaw's own About page — the free, government-run case-law platform this app is grounded on*

Thomson Reuters does serve the Australian market, through a CoCounsel product grounded in Westlaw Advantage Australia and Practical Law Australia, with Westlaw Precision Australia carrying both AI-assisted research and a "Keycite Cited With" citator feature — so this isn't a jurisdiction they've left completely unserved. The sharpest direct rival there is actually LexisNexis's Lexis+ with Protégé — the same incumbent-content-plus-AI-agent playbook, run by the other major legal publisher, right down to both companies renaming their AI products within months of each other in 2026.

There's also a free, open alternative already in this market: [JADE.io](https://jade.io/), run by BarNet, the NSW Bar Association's own technology arm — Australia's structural equivalent of CourtListener. It has a citator genuinely comparable in depth to Westlaw's KeyCite, comprehensive coverage of NSW's tribunals going back decades, and a direct PDF download on every case page — which makes it a genuinely useful *source* for this app's own manual-upload workflow, not just a competitor to think about abstractly. What it doesn't have, confirmed three separate ways — marketing pages, live screenshots, and a full read of its own help documentation, with zero mentions of AI or chatbot features anywhere across roughly 159,000 characters of it — is any AI layer at all. That's a real, confirmed instance of the same free-content/no-AI-layer gap CourtListener occupies in the US, not an assumption carried over from that comparison.

I asked Claude Code to pull [NSW Caselaw's](https://www.caselaw.nsw.gov.au/about) own About page directly rather than assume anything about it, and the actual picture is genuinely mixed. It's free, public, run by the NSW Department of Communities and Justice, covering 10 courts and 6 tribunal systems from 1986 to present using Medium Neutral Citation — but there's no API and no bulk-download mechanism. A follow-up pass over its actual reuse policy resolved the bigger worry: judicial decisions carry their own dedicated authorisation, and commercial reuse isn't prohibited, subject to attribution, accuracy, and non-official-status conditions. But that policy also requires reuse to "exclude external robots from indexing decisions" — a real constraint on any product that wants to crawl and index NSW Caselaw at web scale, with no confirmed API alternative in sight.

That looked like a hard blocker for a while, until it connected back to the CoCounsel architecture finding above: **"Search a Database" was never a web index to begin with.** `nsw-legal-research-assistant`, built the same way — manually finding and downloading specific decisions through NSW Caselaw's own search, uploading them into a small curated knowledge base, then running one RAG-grounded Q&A skill on top — never triggers the robots-exclusion clause at all. It's individual, manual, non-automated retrieval, squarely inside what the policy already permits. The blocker only becomes real if this ever grows into a general product indexing NSW Caselaw broadly for many users — which isn't this first version's problem to solve.

## Turning the plan into an architecture

I wanted this build to line up with Thomson Reuters' current engineering choices. That reframed the architecture decision away from "the leanest possible personal project" toward deliberately mirroring Thomson Reuters' confirmed stack wherever the research had actually established what that stack was:

| Layer | Decision | Why |
|---|---|---|
| Backend | Python + FastAPI | Matches Thomson Reuters' confirmed choice for Materia/CoCounsel Tax |
| Frontend | React + TypeScript | Matches their confirmed choice for the CoCounsel Applications team |
| Retrieval | Postgres + pgvector, containerized | Real RAG rather than context-stuffing, justified by a realistic 50–200 document corpus; matches their Postgres-centric data layer |
| LLM orchestration | Provider-agnostic wrapper — Anthropic, OpenAI, DeepSeek, **and Ollama** | Mirrors their own confirmed multi-model principle; Ollama is a deliberate *addition* beyond their stack (they're cloud-API-only at their scale) — a demonstration of broader range, not an attempt to match them exactly |
| Local development | Docker Compose | Runs the whole stack — Postgres, backend, frontend — on my own 32GB M4 MacBook Air, no cloud dependency to get started |
| Deployment target | AWS, specifically EKS | Matches their confirmed infrastructure, and I've actually run an EKS cluster before ([haddley.github.io/posts/amazoneks](https://haddley.github.io/posts/amazoneks/)) |
| MCP | A server exposing the Q&A skill, in v0 scope, not deferred | Directly mirrors the external integration strategy (MCP/A2A) Thomson Reuters is confirmed to be building right now — the single most literal skill-match available |

The local-vs-cloud split matters for how this series will unfold: everything runs locally first — Docker Compose on the M4 MacBook Air, Ollama for models that need no API key and no cloud dependency at all — and only gets deployed to AWS once it's provably working end to end. That's not a cost-saving afterthought; it's the explicit build order, and it's also just a more honest way to develop something before paying to run it.

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
