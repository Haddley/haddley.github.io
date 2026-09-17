---
title: "RAG"
part: 1
description: "Building a Retrieval-Augmented Generation stack, five pieces at a time: testing Ollama's embeddings API from the command line, standing up a throwaway Postgres and pgvector container, a minimal FastAPI backend that stores and searches real embeddings, a minimal React frontend to drive it, and finally exposing the same search function to Claude Code over MCP — every step run for real, with genuine output at each stage, including two real SDK gotchas hit and fixed along the way"
date: "2026-09-18"
categories: ["AI"]
image: "/assets/images/rag1/hero-rag-toy-stack.svg"
tags: "rag, ollama, pgvector, fastapi, react, mcp"
hidden: false
slug: "rag1"
---

Retrieval-Augmented Generation, RAG for short, is the pattern behind most of the useful AI applications being built right now: instead of asking a language model to answer purely from what it happened to be trained on, you find the specific, real, relevant text first, hand that to the model as context, and ask it to answer from that. My [Agentic AI for Professionals](/posts/agenticaiforprofessionals5/) series traces this pattern in full inside a real, substantial application. This series is the opposite approach: the smallest possible version of the same pieces, built one at a time, so the mechanism itself is visible without a real app's features in the way.

Five phases, each one working and verified before moving to the next: Ollama answering from the command line, a real Postgres and pgvector container, a FastAPI backend that actually stores and searches real embeddings, a React frontend to use it from a browser, and finally exposing that same search function to Claude Code over MCP. Nothing here is simulated — every command below was actually run, and every output shown is the genuine result.

## Phase 1 — Ollama, from the command line, no code at all

Before any Python or Docker, the one thing every later phase depends on: can a model on this machine turn text into a vector of numbers at all? [Ollama](https://ollama.com) is a local LLM host — already covered on this blog in an [earlier post about running DeepSeek locally](/posts/ollamadeepsekr1applemacbookinstall/) — and it exposes this over a plain local HTTP API, so the very first check needs nothing but `curl`.

**Confirm Ollama is running and the embedding model is available:**

```bash
ollama list
```

```
NAME                       ID              SIZE      MODIFIED
nomic-embed-text:latest    0a109f422b47    274 MB    4 minutes ago
qwen3.5:2b                 324d162be6ca    2.7 GB    26 hours ago
gemma4:12b                 4eb23ef187e2    7.6 GB    3 weeks ago
gemma4:26b                 5571076f3d70    17 GB     3 weeks ago
qwen2.5:14b                7cdf5a0187d5    9.0 GB    4 weeks ago
llama3.1:8b                46e0c10c039e    4.9 GB    4 weeks ago
```

If `nomic-embed-text` is not in that list, pull it: `ollama pull nomic-embed-text`. It is a small (274 MB), fast, purpose-built embedding model — not a chat model, and not meant to answer questions, only to translate text into vectors.

**Ask it to actually embed something:**

```bash
curl -s http://localhost:11434/api/embeddings -d '{"model": "nomic-embed-text", "prompt": "hello world"}'
```

The response is one JSON object with a single field, `embedding`, holding hundreds of floating-point numbers — long enough that reading its length and a preview is more useful than the raw output:

```
embedding length: 768
first 6 values: [-0.1523367315530777, -0.030708782374858856, -3.9119129180908203, 0.19170008599758148, 0.13367228209972382, 1.5930511951446533]
```

768 numbers, every time, for any input text — that fixed length is the entire contract this whole series is built on. Two pieces of text with similar meaning end up as two vectors that are close together in that 768-dimensional space; two pieces of text with unrelated meaning end up far apart. Nothing about the numbers themselves means anything to a human reading them; what matters is only how close one vector sits to another, which is exactly what Phase 3 below asks Postgres to compute.

## Phase 2 — a real, throwaway Postgres with pgvector

Postgres does not support the vector data type until the `pgvector` extension is enabled, and this needs a Postgres image that actually ships the extension's compiled binary — a plain `postgres` image is not enough.

**`docker-compose.yml`:**

```yaml
services:
  postgres:
    image: pgvector/pgvector:pg16
    container_name: rag-toy-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-rag}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-rag}
      POSTGRES_DB: ${POSTGRES_DB:-rag_db}
    ports:
      - "5433:5432"
    volumes:
      - rag_pg_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-rag}"]
      interval: 5s
      timeout: 5s
      retries: 10

volumes:
  rag_pg_data:
```

**`db/init/001_enable_pgvector.sql`** — runs automatically, exactly once, the first time the container starts against an empty volume:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

Port `5433`, not the default `5432`, is deliberate — it leaves the default port free for any other real Postgres already running on the same machine. Bring it up and check the extension activated, independently of any application code:

```bash
docker compose up -d postgres
docker exec rag-toy-postgres psql -U rag -d rag_db -c "\dx"
```

```
                             List of installed extensions
  Name   | Version |   Schema   |                     Description
---------+---------+------------+------------------------------------------------------
 plpgsql | 1.0     | pg_catalog | PL/pgSQL procedural language
 vector  | 0.8.6   | public     | vector data type and ivfflat and hnsw access methods
(2 rows)
```

A real, running database, with nothing in it yet, ready for Phase 3 to write to.

## Phase 3 — a minimal FastAPI backend, with real embeddings

Two endpoints: one to add a piece of text (embed it for real, store it), one to search (embed the query for real, ask Postgres which stored vectors are closest).

**`backend/main.py`:**

```python
import os
from contextlib import asynccontextmanager

import httpx
import psycopg
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

DATABASE_URL = os.environ["DATABASE_URL"]
OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://host.docker.internal:11434")
EMBED_MODEL = "nomic-embed-text"
EMBED_DIM = 768


def embed(text: str) -> list[float]:
    with httpx.Client(timeout=30.0) as client:
        response = client.post(
            f"{OLLAMA_BASE_URL}/api/embeddings",
            json={"model": EMBED_MODEL, "prompt": text},
        )
        response.raise_for_status()
        return response.json()["embedding"]


def as_vector_literal(vec: list[float]) -> str:
    return "[" + ",".join(str(v) for v in vec) + "]"


@asynccontextmanager
async def lifespan(app: FastAPI):
    with psycopg.connect(DATABASE_URL) as conn:
        conn.execute(
            f"CREATE TABLE IF NOT EXISTS items (id serial PRIMARY KEY, text text NOT NULL, embedding vector({EMBED_DIM}) NOT NULL)"
        )
        conn.commit()
    yield


app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


class Item(BaseModel):
    text: str


@app.post("/items")
def add_item(item: Item) -> dict:
    vec = embed(item.text)
    with psycopg.connect(DATABASE_URL) as conn:
        conn.execute(
            "INSERT INTO items (text, embedding) VALUES (%s, %s::vector)",
            (item.text, as_vector_literal(vec)),
        )
        conn.commit()
    return {"text": item.text, "embedding_length": len(vec)}


@app.get("/search")
def search(q: str) -> list[dict]:
    vec = as_vector_literal(embed(q))
    with psycopg.connect(DATABASE_URL) as conn:
        rows = conn.execute(
            "SELECT text, embedding <=> %s::vector AS distance FROM items ORDER BY distance LIMIT 5",
            (vec,),
        ).fetchall()
    return [{"text": text, "distance": float(distance)} for text, distance in rows]
```

`OLLAMA_BASE_URL` defaults to `host.docker.internal` — the hostname Docker Desktop provides specifically so a container can reach a service (Ollama) running on the host machine rather than inside another container. `embed()` is a real HTTP call to the exact endpoint Phase 1 tested by hand; `add_item` and `search` both call it, so the query and every stored item are embedded by the identical model, which is what makes comparing them meaningful at all.

**`backend/Dockerfile`:**

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY main.py .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

Added to `docker-compose.yml` as a second service, `backend`, on port `8001`, depending on `postgres` being healthy first. Brought up with `docker compose up -d --build backend`, then tested with three genuinely different sentences and one query that names none of them directly:

```bash
curl -X POST localhost:8001/items -d '{"text": "The dog ran across the park"}'
curl -X POST localhost:8001/items -d '{"text": "A cat sat on the mat"}'
curl -X POST localhost:8001/items -d '{"text": "The stock market fell sharply today"}'
curl "localhost:8001/search?q=puppies%20playing%20outside"
```

```json
[
  {"text": "The dog ran across the park", "distance": 0.4117},
  {"text": "A cat sat on the mat", "distance": 0.5587},
  {"text": "The stock market fell sharply today", "distance": 0.6228}
]
```

Nothing in the query — "puppies playing outside" — shares a single word with "The dog ran across the park," and yet it ranks closest, by a real margin, over the cat sentence, which in turn ranks well ahead of the unrelated stock-market sentence. That ordering is not a coincidence or a cherry-picked result; it is the entire point of an embedding model — it is comparing meaning, not vocabulary, and `pgvector`'s `<=>` operator is doing real geometry on 768 real numbers to produce it.

## Phase 4 — a minimal React frontend

Two inputs, two buttons, one list — enough to drive the two endpoints above from a browser instead of `curl`.

**`frontend/src/App.jsx`:**

```jsx
import { useState } from "react";

const API_BASE_URL = "http://localhost:8001";

export default function App() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function addItem() {
    await fetch(`${API_BASE_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
  }

  async function search() {
    const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    setResults(await res.json());
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={search}>Search</button>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r.text} (distance: {r.distance.toFixed(4)})</li>
        ))}
      </ul>
    </div>
  );
}
```

One real, easy-to-repeat mistake worth naming here: a plain Vite React project needs `@vitejs/plugin-react` (and a `vite.config.js` that loads it) for JSX to compile correctly. Leave it out, and Vite falls back to a JSX transform that emits `React.createElement(...)` calls without ever importing `React` — the page loads, the network tab looks fine, and the screen just stays blank, failing silently in the browser console rather than at build time. Both files are two-minutes-each additions, and worth doing from the start rather than debugging a blank page later.

Wired up as a third `frontend` service in `docker-compose.yml`, on port `5174`, and opened in a real browser:

![](assets/images/rag1/toy-rag-frontend.png)
*The real, working result — typed into an actual browser, hitting the actual FastAPI backend, which called the actual Ollama embeddings endpoint Phase 1 tested by hand*

## Phase 5 — exposing it to Claude Code over MCP

Everything so far is reachable over HTTP — `curl`, or the React app. [MCP](https://modelcontextprotocol.io) (Model Context Protocol) is a third way in, specifically for AI coding agents: instead of a browser calling `GET /search`, Claude Code (or any MCP-compatible client) can call a named *tool* directly, over a local process boundary rather than a network request.

The cleanest way to expose it reuses the exact function `GET /search` already calls — no second implementation to keep in sync with the first:

**`backend/mcp_server.py`:**

```python
from mcp.server.mcpserver import MCPServer

from main import search

server = MCPServer("toy-rag")


@server.tool()
def search_toy_rag(query: str) -> list[dict]:
    """Search the toy RAG item store for the items most semantically similar
    to the query, using real Ollama embeddings and real pgvector cosine
    distance."""
    return search(q=query)


if __name__ == "__main__":
    server.run()
```

`@server.tool()` is MCP's equivalent of FastAPI's `@app.get(...)` — it registers a callable thing an AI agent can discover and invoke, over **stdio** (standard input/output) rather than a network socket. `server.run()` defaults to stdio transport, which is exactly what a locally-spawned tool like this needs.

**Add `mcp==2.0.0` to `backend/requirements.txt`** and rebuild. Then verify it actually works before trusting it to Claude Code — a real client, over a real stdio connection, calling the real tool:

```python
# backend/mcp_smoke_test.py
import asyncio
import os

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

QUERY = "puppies playing outside"


async def main() -> None:
    params = StdioServerParameters(command="python", args=["mcp_server.py"], env=dict(os.environ))
    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            tools = await session.list_tools()
            print("Tools exposed:", [t.name for t in tools.tools])

            result = await session.call_tool("search_toy_rag", {"query": QUERY})
            if result.is_error:
                raise RuntimeError(f"Tool call failed: {result.content[0].text}")
            items = result.structured_content["result"]
            print(f"\nQuery: {QUERY!r}")
            for item in items:
                print(f"  {item['text']!r}  (distance: {item['distance']:.4f})")


if __name__ == "__main__":
    asyncio.run(main())
```

```bash
docker exec rag-toy-backend python mcp_smoke_test.py
```

```
Tools exposed: ['search_toy_rag']

Query: 'puppies playing outside'
  'The dog ran across the park'  (distance: 0.4117)
  'A cat sat on the mat'  (distance: 0.5587)
  'The stock market fell sharply today'  (distance: 0.6228)
```

Getting there took two real, genuine bugs, both worth naming rather than editing out of this post after the fact:

- **`StdioServerParameters` does not inherit the parent process's environment by default.** Without `env=dict(os.environ)`, the spawned `mcp_server.py` process has no `DATABASE_URL` at all, and crashes on import with a bare `KeyError` before ever reaching the MCP handshake — a real, documented gotcha, not a hypothetical one.
- **A tool returning `list[dict]` does not land as one JSON blob in `result.content[0].text`.** This particular SDK version (`mcp==2.0.0`) serializes each dict in the list as its own separate `TextContent` block instead. `result.structured_content["result"]` sidesteps the issue entirely — it hands back the tool's actual return value, already parsed, under a `"result"` key.

## Checking it interactively with MCP Inspector

The smoke test above proves the server works, but only by reading printed text. [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) is the official tool for actually poking at an MCP server from a browser — point it at the same command `.mcp.json` will use, no code required:

```bash
npx -y @modelcontextprotocol/inspector docker compose exec -T backend python mcp_server.py
```

This starts a local web UI (`http://127.0.0.1:6274`, with an auth token in the URL) and immediately spawns the server, ready to connect:

![](assets/images/rag1/inspector-tool-form.png)
*Real Inspector, connected to the real `toy-rag` server — the tool's docstring rendered directly from `mcp_server.py`'s own source, and a form generated from `search_toy_rag`'s one parameter*

Filling in `puppies playing outside` and clicking **Execute Tool** sends a real `tools/call` request over the same stdio connection the smoke test used, and the result makes the earlier gotcha visible rather than just documented:

![](assets/images/rag1/inspector-tool-result.png)
*Three separate result blocks — one per dict in the returned list, exactly as `mcp_smoke_test.py`'s docstring describes — plus the clean, pre-parsed "Structured Output" section below them, and the real `tools/call` message logged on the right at 340ms*

This is worth doing before ever pointing a real AI agent at a new MCP server: Inspector shows the exact JSON-RPC traffic (the message log on the right, timestamped, every `initialize`, `tools/list`, and `tools/call` round trip), which is the fastest way to catch a shape mismatch like the `list[dict]` one here before it becomes a confusing failure inside Claude Code instead, where the underlying protocol messages are not normally visible at all.

## Adding it to Claude Code

Two files, both in the project root (the `rag-toy-stack` directory itself, next to `docker-compose.yml`):

**`.mcp.json`:**

```json
{
  "mcpServers": {
    "toy-rag": {
      "command": "docker",
      "args": ["compose", "exec", "-T", "backend", "python", "mcp_server.py"]
    }
  }
}
```

`docker compose exec` runs the command *inside* the already-running `backend` container, which is why no environment variables need repeating here — `DATABASE_URL` and `OLLAMA_BASE_URL` are already set on that container by `docker-compose.yml` itself, the same way they are for the FastAPI process already running in it. Confirmed directly, from the host, exactly as Claude Code itself would invoke it:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' \
  | docker compose exec -T backend python mcp_server.py
```

```json
{"jsonrpc":"2.0","id":1,"result":{"capabilities":{"experimental":{},"prompts":{"listChanged":false},"resources":{"listChanged":false,"subscribe":false},"tools":{"listChanged":false}},"protocolVersion":"2025-06-18","serverInfo":{"name":"toy-rag","version":""}}}
```

A real JSON-RPC response, `serverInfo.name` reading back `"toy-rag"` — the exact string this post's `MCPServer("toy-rag")` set, confirming this is genuinely the same server the smoke test already exercised, just started the way an MCP client starts it rather than the way a Python script did.

**To actually connect it:** with the stack running (`docker compose up -d`), open Claude Code in the `rag-toy-stack` directory. A project-scoped `.mcp.json` it has not seen before prompts for approval before its tools become available — once approved, `/mcp` lists it as a connected server along with `search_toy_rag`. If Claude Code was already running in that directory before `.mcp.json` was added, restart the session (or reconnect MCP servers) to pick it up; it will not appear retroactively in an already-running session.

Rather than describe what happens next, here is a genuinely separate Claude Code session, started fresh in that exact directory, asked exactly this:

```bash
cd rag-toy-stack
claude -p "search the toy RAG store for something about pets"
```

![](assets/images/rag1/claude-code-mcp-transcript.png)
*A real, separate `claude -p` invocation — not this session, a distinct process, started fresh in the `rag-toy-stack` directory. It discovers the tool, calls it with `query: "pets"`, gets back the real Postgres/Ollama result, and reasons over it correctly*

Two things worth noticing in that transcript, both real rather than assumed: **`ToolSearch` runs first**, before the actual tool call — MCP tools, like a lot of tools available to Claude Code, are discovered on demand rather than all loaded up front, so the first step is finding `mcp__toy-rag__search_toy_rag` by name before it can be called. **The query Claude Code actually sent was `"pets"`**, not the full sentence it was asked — it distilled the request down to the search term itself before calling the tool, which is why the exact distances (0.393, 0.476) differ slightly from this post's earlier "puppies playing outside" run: a different embedded string produces a different, but still correctly-ranked, result. The tool itself, the function it calls, and the Postgres query underneath are identical either way.

## What actually got built

Five phases, each verified independently before the next one depended on it: Ollama answering a plain HTTP call with 768 real numbers; Postgres running a real vector similarity query against them; FastAPI gluing the two together behind two small endpoints; React giving it a face; MCP exposing the identical search function to an AI agent, no second implementation required. Every one of the three original "bits" — database, backend, frontend — is the same shape as the much larger [Agentic AI for Professionals](/posts/agenticaiforprofessionals5/) series traces through a real production application, just stripped down far enough to see the mechanism moving on its own, and the MCP layer is the same "same skill, two interfaces" pattern that series covers in far more depth. The next post in this series picks one of these five pieces and goes deeper.
