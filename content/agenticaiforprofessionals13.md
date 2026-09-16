---
title: "Agentic AI for Professionals"
part: 13
description: "The missing piece needed to actually reproduce this app: the real ingest_pdf() function tying PDF extraction, page-safe chunking, embedding, and a database write into one pipeline, including the real production bug (a publisher's running footer silently sabotaging retrieval) that shaped the extraction code — plus the complete .env.example, docker-compose.yml, requirements.txt, and .mcp.json a developer would need to actually stand this app up from zero"
date: "2026-09-17"
categories: ["AI"]
image: "/assets/images/agenticaiforprofessionals13/hero-ingestion.svg"
tags: "ingestion, pypdf, docker-compose, reproducibility, pipeline"
hidden: false
slug: "agenticaiforprofessionals13"
---

Every post from [Part 6](/posts/agenticaiforprofessionals6/) through [Part 12](/posts/agenticaiforprofessionals12/) traced what happens to a question asked against chunks that already exist in Postgres. None of them covered how those chunks got there in the first place — genuinely the single biggest gap in this series for anyone trying to actually reproduce this app, rather than just understand a request that assumes the data already exists. This post closes it: the real function that turns an uploaded PDF into rows in the `chunks` table, and the actual configuration files a developer needs to stand up a working copy from nothing.

## The whole pipeline, in one function

`POST /documents` — one of 42 real routes this app exposes, most of which this series has never mentioned — calls `ingest_pdf()`:

```python
# backend/app/pipeline/ingest.py
def ingest_pdf(
    session: Session, *, filename: str, pdf_bytes: bytes,
    title: str | None = None, citation: str | None = None, court: str | None = None,
    collection_id: uuid.UUID | None = None, source_layer: str | None = None,
) -> Document:
    content_hash = hashlib.sha256(pdf_bytes).hexdigest()
    duplicate = session.scalar(
        select(Document).where(Document.content_hash == content_hash, Document.collection_id == collection_id)
    )
    if duplicate is not None:
        raise ValueError(f"{filename!r} is byte-identical to an already-uploaded document...")

    pages = extract_pages(pdf_bytes)
    if not pages:
        raise ValueError(f"No extractable text found in {filename!r}")

    if citation is None:
        citation = _guess_citation(pages[0].text)
    if title is None:
        title = derive_title_from_filename(filename)
    if source_layer is None:
        source_layer = "primary_law" if citation else "practical_guidance"

    document = Document(filename=filename, content_hash=content_hash, title=title,
                         citation=citation, court=court, collection_id=collection_id, source_layer=source_layer)
    session.add(document)
    session.flush()  # assigns document.id without committing yet

    storage_dir = Path(settings.document_storage_dir)
    storage_dir.mkdir(parents=True, exist_ok=True)
    (storage_dir / f"{document.id}.pdf").write_bytes(pdf_bytes)

    drafts = chunk_pages(pages)
    provider = get_embedding_provider()
    vectors = provider.embed([d.text for d in drafts])

    for draft, vector in zip(drafts, vectors, strict=True):
        session.add(Chunk(document_id=document.id, chunk_index=draft.chunk_index,
                           page_number=draft.page_number, text=draft.text, embedding=vector))

    session.commit()
    session.refresh(document)
    return document
```

Reading this top to bottom is genuinely reading the entire ingestion pipeline: **hash** the raw bytes (`hashlib.sha256`) and check for a byte-identical duplicate already in the same collection — a real fix for a real bug (dragging the same PDF in twice used to silently create two full duplicate documents, doubling storage with no warning). **Extract** page-numbered text (`extract_pages`, below). **Guess** a citation and title if none were supplied, and classify the document as `primary_law` or `practical_guidance` based on whether a citation was actually found — the same heuristic [Part 8](/posts/agenticaiforprofessionals8/)'s system prompt reacts to. **Create** the `Document` row and `session.flush()` it — flush assigns the database-generated `id` immediately without fully committing the transaction yet, needed because the chunks about to be created reference `document.id` as a foreign key. **Write** the raw PDF bytes to disk, at a path derived from that same id — this is what [Part 11](/posts/agenticaiforprofessionals11/)'s citation-click iframe actually opens. **Chunk** the pages (`chunk_pages`, below) and **embed** every chunk's text in one batched call to [Part 7](/posts/agenticaiforprofessionals7/)'s `get_embedding_provider()`. **Loop** over chunks and their matching vectors together — `zip(drafts, vectors, strict=True)` pairs them up positionally, and `strict=True` makes Python raise an error immediately if the two lists ever come out different lengths, rather than silently mismatching a chunk's text with the wrong embedding. **Commit** the whole transaction — the `Document` row, every `Chunk` row, all at once.

## Extraction: a real production bug, not a hypothetical one

```python
# backend/app/pipeline/pdf_extraction.py
_BOILERPLATE_MIN_PAGES = 3
_BOILERPLATE_MIN_FRACTION = 0.4

def _strip_repeated_boilerplate(raw_pages: list[str]) -> list[str]:
    if len(raw_pages) < _BOILERPLATE_MIN_PAGES:
        return raw_pages
    line_page_counts: dict[str, int] = {}
    for page_text in raw_pages:
        for line in {ln.strip() for ln in page_text.splitlines() if ln.strip()}:
            line_page_counts[line] = line_page_counts.get(line, 0) + 1
    threshold = max(_BOILERPLATE_MIN_PAGES, int(len(raw_pages) * _BOILERPLATE_MIN_FRACTION))
    boilerplate_lines = {line for line, count in line_page_counts.items() if count >= threshold}
    if not boilerplate_lines:
        return raw_pages
    cleaned = []
    for page_text in raw_pages:
        kept = [ln for ln in page_text.splitlines() if ln.strip() not in boilerplate_lines]
        cleaned.append("\n".join(kept).strip())
    return cleaned
```

This function exists because of a real, specific failure this app's build log records: PDFs sourced from Jade/BarNet embed a roughly five-line publication-info block on *every single page* — a watermark, a "view this document in a browser" navigation line. Left in place, that boilerplate ate into each chunk's fixed 800-character budget on every page, diluting the embedding of otherwise-highly-relevant text enough to push a genuinely important chunk — a case's own "Decision:" summary line, in the real investigation this function's comment references — below the similarity threshold [Part 7](/posts/agenticaiforprofessionals7/) covers, so it never got retrieved at all. `line_page_counts` counts how many *distinct pages* each unique line of text appears on (using a `set` comprehension, `{ln.strip() for ln in ... if ln.strip()}`, so a line repeated twice on one page only counts once for that page). Any line appearing on at least 40% of pages (and at least 3 pages, guarding against false positives on very short documents) is treated as running header/footer noise and stripped from every page before chunking ever sees it. This is **frequency-based, not a hardcoded list of known JADE strings** — it generalises to any repeated boilerplate from any PDF source, precisely because it never assumes what the noise says, only that it says the *same thing, over and over, on almost every page* — which real page content essentially never does.

## Chunking: never crossing a page, and a second real bug

```python
# backend/app/pipeline/chunking.py
TARGET_CHUNK_CHARS = 800

def chunk_pages(pages: list[PageText]) -> list[ChunkDraft]:
    drafts: list[ChunkDraft] = []
    index = 0
    for page in pages:
        for piece in _split_into_chunks(page.text, TARGET_CHUNK_CHARS):
            drafts.append(ChunkDraft(chunk_index=index, page_number=page.page_number, text=piece))
            index += 1
    return drafts
```

The outer loop is over *pages*, and the inner loop never lets a chunk span two pages — this single structural choice is why a citation can ever say "p.9" unambiguously: every chunk traces to exactly one page, by construction, not by convention. `_split_into_chunks` groups sentences (split on `re.split(r"(?<=[.!?])\s+", text)` — a regex using a **lookbehind**, `(?<=[.!?])`, meaning "split after a `.`, `!`, or `?`, but do not consume that punctuation mark itself") up to roughly 800 characters per chunk. A second real bug shaped what happens next:

```python
def _hard_split(sentence: str, target_chars: int) -> list[str]:
    if len(sentence) <= target_chars:
        return [sentence]
    words = sentence.split()
    pieces: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if current and len(candidate) > target_chars:
            pieces.append(current)
            current = word
        else:
            current = candidate
    if current:
        pieces.append(current)
    return pieces
```

Real NSW statutory drafting routinely runs a whole numbered list of sub-paragraphs — separated by semicolons and newlines, never a sentence-ending period — as one unbroken "sentence" by the regex above's definition. Before this function existed, that meant one chunk with no upper size limit at all, which surfaced live as a real embedding call failing outright: *"input (2252 tokens) is too large to process,"* on a genuine NSW statutory-rule PDF. `_hard_split` is the fix — for any single "sentence" still too long, split on whitespace at up to `target_chars` each, **never mid-word**, guaranteeing every chunk this module ever produces stays under an embedding provider's own input limit regardless of how the source document is punctuated. [Part 9](/posts/agenticaiforprofessionals9/)'s `test_pipeline.py` walkthrough covers the two tests that lock this exact behaviour in place.

## What a developer actually needs to reproduce this

The complete, real configuration files — not fragments referenced across a dozen posts.

**`.env.example`** (the exact file in the repo root of the app):

```bash
# --- Database ---
POSTGRES_USER=nsw_legal
POSTGRES_PASSWORD=changeme
POSTGRES_DB=nsw_legal_research

# --- LLM provider selection: anthropic | openai | deepseek | ollama ---
LLM_PROVIDER=anthropic

# --- API keys (only the selected provider's key is required) ---
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
DEEPSEEK_API_KEY=

# --- Chat model per provider (all have working defaults; override if needed) ---
# ANTHROPIC_MODEL=claude-sonnet-5
# OPENAI_MODEL=gpt-4o-mini
# DEEPSEEK_MODEL=deepseek-v4-pro
# DEEPSEEK_BASE_URL=https://api.deepseek.com

# --- Ollama (local models); default assumes Ollama running on the host, not in a container ---
OLLAMA_BASE_URL=http://host.docker.internal:11434
# OLLAMA_CHAT_MODEL=llama3.1:8b
```

Note the honest gap this file itself leaves: `EMBEDDING_PROVIDER` and `OLLAMA_EMBED_MODEL` are not listed here at all — they default in `config.py` (`"ollama"` and `"nomic-embed-text"`, confirmed live in [Part 7](/posts/agenticaiforprofessionals7/)) and simply never needed overriding in this deployment, so nobody added them to the example file. A developer copying this file gets working embeddings by accident of matching defaults, not because the example documents the choice.

**`requirements.txt`** (pinned versions, real):

```
fastapi==0.115.6
uvicorn[standard]==0.32.1
pydantic-settings==2.6.1
psycopg[binary]==3.2.3
sqlalchemy==2.0.36
pgvector==0.3.6
pypdf==5.1.0
python-docx==1.1.2
striprtf==0.0.28
httpx==0.28.1
openai==1.57.4
anthropic==0.40.0
mcp==2.0.0
json_repair==0.63.3
```

**`.mcp.json`** (repo root — this is what actually lets Claude Code discover the tools [Part 8](/posts/agenticaiforprofessionals8/) traced):

```json
{
  "mcpServers": {
    "nsw-legal-research-assistant": {
      "command": "docker",
      "args": ["compose", "-f", "apps/nsw-legal-research-assistant/docker-compose.yml",
                "exec", "-T", "backend", "python", "-m", "app.mcp_server"]
    }
  }
}
```

**The complete `docker-compose.yml`**, all three services together for the first time in this series (Parts 5, 9, and 12 each showed one service in isolation):

```yaml
services:
  postgres:
    image: pgvector/pgvector:pg16
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-nsw_legal}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-changeme}
      POSTGRES_DB: ${POSTGRES_DB:-nsw_legal_research}
    ports: ["5432:5432"]
    volumes:
      - pg_data:/var/lib/postgresql/data
      - ./backend/db/init:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-nsw_legal}"]
      interval: 5s
      timeout: 5s
      retries: 10

  backend:
    build: ./backend
    restart: unless-stopped
    env_file: [.env]
    environment:
      DATABASE_URL: postgresql+psycopg://${POSTGRES_USER:-nsw_legal}:${POSTGRES_PASSWORD:-changeme}@postgres:5432/${POSTGRES_DB:-nsw_legal_research}
    ports: ["8000:8000"]
    volumes:
      - ./backend/app:/app/app
      - ./backend/tests:/app/tests
      - ./backend/scripts:/app/scripts
      - pdf_storage:/app/storage
    depends_on:
      postgres:
        condition: service_healthy

  frontend:
    build: ./frontend
    restart: unless-stopped
    environment:
      VITE_API_BASE_URL: http://localhost:8000
    ports: ["5173:5173"]
    volumes:
      - ./frontend/src:/app/src
    depends_on: [backend]

volumes:
  pg_data:
  pdf_storage:
```

With these four files, the real Dockerfiles from Parts 9 and 12, and `docker compose up --build`, a developer now has everything this series has shown scattered across a dozen posts in one place.

## What is still not covered

Even with this post, honestly: 36 of the app's 42 real routes remain unexplained by this series — the entire Brief Builder feature (multi-stage argument development, citation-graph leads, DOCX drafting via `pandoc`), the Review Documents skill, the RAG/Wiki/Hybrid comparison mode, and the Jade live-fetch automation sidecar that put this series' own running example into the database in the first place. Those are real, working, substantial features — genuinely enough material for a second course covering this same app's higher-level product features, distinct from the infrastructure arc Parts 5 through 13 have covered. This post closes the gap between "understands the code" and "could actually run it"; it does not claim to document the whole application.
