---
title: "Agentic AI for Professionals"
part: 6
description: "A single-session pass of real hardening on nsw-legal-research-assistant — closing Part 5's retrieval-completeness bug, a Database rename driven by CoCounsel's own research, combinable primary-law/practical-guidance source layers validated the same day by Thomson Reuters' own Brief Builder launch, and a UI redesign matching CoCounsel Core's actual interface"
date: "2026-08-20"
categories: ["AI"]
image: "/assets/images/agenticaiforprofessionals6/01-database-skill-tiles-source-filter.png"
tags: "rag, retrieval, legal-tech, citation-grounding, ui-design"
hidden: false
slug: "agenticaiforprofessionals6"
---

[Part 1](/posts/agenticaiforprofessionals1/) covered the research; [Part 2](/posts/agenticaiforprofessionals2/) and [Part 3](/posts/agenticaiforprofessionals3/) built the RAG core, frontend, and MCP server; [Part 4](/posts/agenticaiforprofessionals4/) ran it live against Thomson Reuters' own demo script; [Part 5](/posts/agenticaiforprofessionals5/) questioned RAG itself as the default and closed with an open question — what other retrieval-completeness gaps are sitting in this corpus, unfound. This post isn't a numbered phase. It's a single session's worth of real hardening: the Part 5 bug actually closed, a rename driven by the project's own research wiki, a new combinable source-layer axis that Thomson Reuters independently validated the same day, and a UI redesign that finally matches CoCounsel Core's actual interface instead of a plain chat panel.

![](assets/images/agenticaiforprofessionals6/01-database-skill-tiles-source-filter.png)
*The redesigned shell: a Database dropdown, a Research/Review/Draft/Summarize skill-tile landing view, and a source-layer filter scoping search to primary law only*

## Closing Part 5's cliffhanger: the retrieval-completeness bug, for real

Part 5 ended on a bug that looked architectural — a superseded damages figure outranking the corrected one — and a question about whether that was a limitation of RAG itself. It wasn't. It was two ordinary, fixable problems.

The first: repeated header/footer boilerplate diluting chunk embeddings. JADE/BarNet-sourced PDFs embed a publication-info block on every page, eating into the fixed per-chunk character budget with text that says nothing about the page itself:

```python
# backend/app/pipeline/pdf_extraction.py
# A line repeating verbatim across this fraction of a document's pages is
# treated as running header/footer boilerplate (publisher watermarks, "View
# this document in a browser" navigation chrome, etc.) rather than page
# content. Frequency-based, not a hardcoded JADE-specific string list, so
# it generalizes to any repeated header/footer pattern from any PDF source.
_BOILERPLATE_MIN_PAGES = 3
_BOILERPLATE_MIN_FRACTION = 0.4
```

The second, and the one that actually mattered here: single-pass top-k retrieval could rank a chunk from the *wrong* page of a relevant document above the chunk from the *right* page, simply because cross-document ranking doesn't know two chunks belong to the same case. The fix is a genuine two-stage retrieval:

```python
# backend/app/rag/retrieval.py
# Two-stage when document_id isn't already given: stage 1 below finds WHICH
# documents are relevant across the whole scoped pool; stage 2 re-scans just
# those documents with a wider budget and a relaxed threshold, since
# document-level relevance is already established by stage 1 -- catches a
# chunk that's genuinely part of a relevant document but didn't win the
# cross-document ranking (e.g. a later page correcting an earlier one),
# without reopening the false-positive risk of relaxing the threshold
# globally.
```

Stage 1 runs the normal similarity search across the whole scoped pool. Stage 2 takes every document that had at least one chunk clear the bar, and re-scans *just those documents* with more chunks and a relaxed threshold — because once a document is already known to be relevant, missing its correcting page is a worse failure than a slightly noisier top-k. That's the honest ending Part 5 didn't have yet: not "no approach reliably closes this gap," but a specific, fixable bug in RAG's retrieval layer, now closed underneath every skill in the app at once.

## Conversation history, still entirely client-held

Follow-up questions like "what sentence was imposed?" don't retrieve well on their own — nothing in the text says which case "that" refers to. A new module rewrites them before retrieval, using recent conversation history:

```python
# backend/app/rag/condense.py
"""Conversation-aware query rewriting: turns a vague follow-up ("What
sentence was imposed?") into a self-contained question ("What sentence was
imposed on each defendant in R v Evans, R v Rawlinson and R v Proud [2014]
NSWSC 979?") using recent conversation history, before retrieval runs.

...this call only ever changes what question gets embedded and searched
for. It never touches citation-sourcing -- citations are still built in
Python from whatever chunks the (possibly rewritten) question actually
retrieves, exactly as before. A bad rewrite degrades to today's behavior
(a question that doesn't retrieve well, or an honest "not found"); it has
no path to a fabricated citation, because nothing about how citations are
sourced changes here.
"""
```

The guardrail is the same one that's run through every skill in this series since Part 2: a worse rewrite can only produce a worse *retrieval*, never a worse *citation*, because citations are still Python-constructed from real rows, never generated by the model.

## Combinable source layers — and Thomson Reuters validated the design the same day

CoCounsel Legal sells "primary law" (Westlaw) and "practical guidance" (Practical Law) as separate, combinable subscription layers. This app now has the same axis, per-document and per-chunk:

```python
# backend/app/rag/retrieval.py
# A document classified primary_law can still contain an editorial insert --
# NSW judgments and JADE republications sometimes carry a HEADNOTE the source
# itself explicitly disclaims as not being part of the judgment (confirmed
# directly in this corpus: Rigby v State of New South Wales [2022] NSWCA 14,
# p.2, "HEADNOTE / This headnote is not to be read as part of the judgment").
# source_layer classifies the whole document (a reasonable default -- most
# of a judgment PDF genuinely is the judgment), but a chunk landing inside
# one of these inserts shouldn't inherit primary_law confidence just because
# its parent document mostly is one.
_EDITORIAL_INSERT_RE = re.compile(r"headnote.{0,80}not to be read as part of the judgment", re.IGNORECASE | re.DOTALL)
```

The filter surfaces directly in the search bar — "All sources / Primary law only / Practical guidance only," visible in the hero screenshot above — and scopes retrieval, not just display.

This is where the timing got genuinely strange. The same day this shipped, Thomson Reuters put out the GA press release for the next generation of CoCounsel Legal, headlined by a new feature called **Westlaw Brief Builder**. Digging into its own help documentation turned up this line, verbatim: *"You automatically get access to Westlaw Brief Builder if you have one of the following subscriptions: CoCounsel Legal / Westlaw Advantage with CoCounsel Essentials."* That's Thomson Reuters naming the exact layer *combination* — primary law plus practical guidance — as the literal product-access mechanism, on the same day this app's `source_layer` field went in, independently. Not proof of anything beyond coincidence in timing, but real confirmation that "combinable layers" isn't a made-up framing — it's how the actual product is sold.

The honest gap in the other direction: Brief Builder's own workflow is a genuine multi-checkpoint pipeline — select a motion type, review an AI-generated intake summary, select/edit proposed arguments, then research *only the selected arguments* with the ability to redevelop a single one — compared to this app's Draft skill, which is one instruction, one LLM call, one draft. That's a real, out-of-scope-for-now capability difference, not something to paper over.

## Matter becomes Database

Small on its own, but driven by the same research discipline as everything else in this series — not a cosmetic relabel:

> Per wiki research (`cocounsel-legal-original-architecture-and-skills.md`), CoCounsel's own "Database" concept is scoped by case, client, or industry — broader than "matter," and this app's own collections (e.g. "Dog Bite Case Law (Jade)") already aren't always matter-scoped.

Paired with it: real deletion. `DELETE /documents/{id}` cascades chunks, verifications, wiki pages, and the stored PDF file; `DELETE /collections/{id}` is an explicit, irreversible decision — delete the database and every document inside it, not just the grouping:

```python
# backend/app/collections.py
def delete_collection(session: Session, collection: Collection) -> int:
    """Explicit user decision: deleting a database deletes every document
    inside it too (chunks, embeddings, stored PDFs), not just the grouping.
    Document.collection_id's FK is ondelete="SET NULL" at the DB level --
    the right default for any other path that might delete a Collection
    row -- but that would only orphan documents into "All documents", not
    remove them, so this explicitly deletes each one first."""
```

The frontend backs that up with a real confirmation cost: typing the database's own name back before "Delete database" does anything, visible in the sidebar in the hero screenshot.

## Upload hardening: duplicates, multi-file, and a database that isn't real

Three small fixes, same root cause — a v0 upload flow that had never been pushed on:

- **Duplicate detection.** Every uploaded PDF gets a SHA-256 of its raw bytes; a second upload of the same file into the same database is rejected rather than silently duplicating chunks and skewing retrieval counts.
- **Multi-file upload**, with document titles backfilled from the stored filename for anything that predates it.
- **Blocking uploads into "All documents"** — the unscoped view across every database was never a real collection to upload *into*, just a display mode, and the upload form used to let you try anyway.

## Persistent chat sessions and a real Summarize skill

CoCounsel Core's demo shows reloadable chat history in a sidebar — this app's chat used to be entirely stateless, by deliberate Phase 6.5 design. That decision gets reversed here, but narrowly:

> `ChatSession`/`ChatExchange` give the frontend real, reloadable chat history — a deliberate reversal of the earlier Phase 6.5 "stateless, nothing stored server-side" decision. `app/rag/qa.py`'s `answer_question()` is completely untouched: persistence is a pure write-after-read side effect... History stays client-sent exactly as before, so prompt processing and persistence remain independent — omit `session_id` and behavior is unchanged from before this commit.

The new Summarize skill deliberately doesn't use similarity retrieval — a generic "summarize this document" has no query to embed-search against — so it evenly samples chunks across the whole document instead:

```python
# backend/app/rag/summarize.py
def _sample_indices(total: int, max_chunks: int) -> list[int]:
    """Evenly spaced indices across [0, total), always including index 0 and
    total-1, so the summary reflects the whole document (opening AND
    closing/outcome), not just its first N chunks."""
```

Verified live against the 1,461-chunk Civil Liability Handbook: it correctly sampled 40 excerpts across the whole document and self-reported the sampling limit in its own output, rather than silently presenting a partial read as complete.

## A UI shell that actually matches CoCounsel Core's IA

Every screenshot in this post is this redesign. Dark navy icon rail, white sidebar and content area, the skill-tile landing view, "Documents" result cards with highlighted citations, a trust badge, and — replacing every citation that used to pop a new tab — a real split-pane PDF viewer for same-origin, locally-stored documents. Bulk-import citations pointing at jade.io or NSW Caselaw still open in a new tab, since those generally can't be framed anyway.

Deliberate simplifications, written down rather than silently decided: no multi-workspace switcher, since this is a single-user app and Database selection already plays that scoping role; no fake "Results" tab; Draft stays a follow-up-only action on an already-grounded answer, never a standalone "start here" tile, because its entire trust design depends on reusing only facts that are already grounded.

## New corpora, and a bot-detection wall

The "Rental Eviction Case Law (Jade)" database in every screenshot above exists because the Jade scraping pipeline — originally built narrow, for one corpus — got generalized. A plain headless fetch hit Jade's bot-detection wall outright; the fix was driving a real, non-headless Chrome through a dedicated Playwright profile instead. That work also caught a pre-existing title-extraction bug: preferring the page's first `<h2>` over `document.title` broke on at least one Fair Work Commission decision, where the first `<h2>` was a body section heading, not the case title.

Two new corpora came out of the generalized pipeline: `rental-eviction-cases` (50 ingested, 49 original PDFs kept, `source_trust="verified"` per explicit request) and `parking-fine-cases` (19 ingested, `source_trust="bulk_import"`). Different trust tiers, on purpose — the difference in provenance is real, not cosmetic.

## The bug: a citation link that broke exactly when a document earned more trust

Bulk-imported citations used to be told apart from locally-stored PDFs by checking `source_trust === "bulk_import"` — reasonable, until a bulk-imported document could be manually upgraded to `source_trust="verified"` to suppress its "unverified source" badge, while still genuinely having no PDF on disk:

```typescript
// frontend/src/citations.tsx
// source_url is the reliable signal for "no local PDF, link to the real
// source page instead": it's set by every bulk-text-import path and never
// by ingest_pdf(). This is deliberately independent of source_trust, which
// is only a display choice -- a bulk-imported document can be marked
// source_trust="verified" to suppress the "unverified source" badge while
// still having no stored PDF, so gating this on source_trust alone (as it
// used to be) 404s on GET /documents/{id}/file for exactly that case.
export function citationHref(citation: Citation): string {
  if (citation.source_url) return citation.source_url;
  return documentFileUrl(citation.document_id, citation.page_number);
}
```

Two fields that used to move together — provenance and trust display — stopped moving together the moment trust became something a person could upgrade independently of provenance. The same bug was hiding a second time in `ReviewPanel.tsx`'s "Review all" links, which never had a `source_url` fallback at all.

## Live: a scoped, filtered question, and a drafted letter

Scoped to Rental Eviction Case Law (Jade), filtered to primary law only:

> **During the COVID-19 pandemic, was there a moratorium on evicting tenants for rent arrears in NSW, and how did the court treat it in this case?**

Real output, fifteen citations deep across two documents:

> A moratorium on evicting tenants for rent arrears existed during the COVID-19 pandemic in NSW. From [2], we see that the Residential Tenancies Regulation 2019 (NSW) was amended to include a new Part 6A "Response to COVID-19 pandemic," which provided for a "moratorium period" of six months (reg 41A). [...] The moratorium did not apply in this specific case because the tenant was not an "impacted tenant" — there was no evidence to allow a finding that Mr Herbert was an "impacted tenant," and therefore the protections given by the regulation were not engaged.

![](assets/images/agenticaiforprofessionals6/02-covid-moratorium-answer.png)
*Grounded answer, primary-law-only, with fifteen page-linked citations across [2020] NSWCA 74 and [2021] NSWCATCD 80*

Click **Draft from this…**, and the same skill-chaining pattern from Part 4 runs again — no new retrieval, just the answer and citations already on screen, reused into a different shape:

![](assets/images/agenticaiforprofessionals6/03-draft-prompt-empty.png)
*The Draft prompt, empty*

> draft a letter to the client summarizing this outcome

![](assets/images/agenticaiforprofessionals6/04-draft-prompt-typed.png)
*Instruction typed, "Drafting..." in progress*

Real output — a full client letter, grounded in nothing but the citations already established above:

> Dear Client, Re: COVID-19 Moratorium on Evictions in NSW. [...] During this time, a new Part 6A "Response to COVID-19 pandemic" was added to the Residential Tenancies Regulation 2019 (NSW), which included a moratorium period of six months [2]. However, in our specific case, the court found that the protections given by this regulation were not engaged because you were not an "impacted tenant," as there was no evidence to support this designation [6].

![](assets/images/agenticaiforprofessionals6/05-draft-letter-output.png)
*The drafted letter, with the same review-before-use disclaimer from Part 4: "Draft — reuses only the facts/citations above, not independently re-verified. Review before use."*

## What's still ahead

The multi-question Review grid — one question set run against every document in a database, table-shaped output — is real and shipped now too, closing another gap Part 4 could only demo one question at a time. What's still genuinely ahead is unchanged from Part 3: Phase 7, deploying all of this to AWS EKS, and a real Anthropic-vs-Ollama comparison once cloud API keys are actually in the mix rather than taken on faith. Same rule as every post in this series — document what's built, not what's planned.
