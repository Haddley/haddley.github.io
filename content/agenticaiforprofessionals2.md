---
title: "Agentic AI for Professionals"
part: 2
description: "Building the RAG core of a legal research assistant entirely on a 32GB M4 MacBook Air — page-safe chunking, a provider-agnostic LLM layer, and citations that can't be hallucinated"
date: "2026-08-18"
categories: ["AI"]
image: "/assets/images/agenticaiforprofessionals2/hero-nsw-caselaw-home.png"
tags: "rag, pgvector, ollama, fastapi, docker"
hidden: false
slug: "agenticaiforprofessionals2"
---

[Part 1](/posts/agenticaiforprofessionals1/) covered the research — how a structured LLM-wiki process traced Thomson Reuters CoCounsel's real architecture, and how that turned into a plan for `nsw-legal-research-assistant`, an app inspired by Thomson Reuters CoCounsel Legal and grounded on a manually-curated document set — a starting scope, not a ceiling. 

This post is the actual build: Phases 1 through 3 of that plan, all of it running locally on my 32GB M4 MacBook Air through [Docker](/posts/docker/) Compose, with [Ollama](https://ollama.com/) serving both the chat model and the embeddings — no cloud API required to get a working system end to end.

![](assets/images/agenticaiforprofessionals2/nsw-caselaw-recent-decisions.png)
*NSW Caselaw's "recent decisions" list*

## The data model: documents and chunks

Two tables, deliberately small. A `Document` row holds whatever metadata I can extract from a case — filename, title, medium-neutral citation, court, decision date. A `Chunk` row holds one piece of extracted text, its page number, and its embedding vector:

```python
# backend/app/models.py
EMBEDDING_DIM = settings.ollama_embed_dimensions   # 768 for nomic-embed-text

class Document(Base):
    __tablename__ = "documents"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    filename: Mapped[str] = mapped_column(String, nullable=False)
    title: Mapped[str | None] = mapped_column(String, nullable=True)
    citation: Mapped[str | None] = mapped_column(String, nullable=True)
    court: Mapped[str | None] = mapped_column(String, nullable=True)
    chunks: Mapped[list["Chunk"]] = relationship(back_populates="document", cascade="all, delete-orphan")

class Chunk(Base):
    __tablename__ = "chunks"
    document_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("documents.id", ondelete="CASCADE"))
    page_number: Mapped[int] = mapped_column(Integer, nullable=False)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    embedding: Mapped[list[float]] = mapped_column(Vector(EMBEDDING_DIM), nullable=False)
```

The `EMBEDDING_DIM` constant matters more than it looks: it's fixed at table-creation time, and it has to match whichever model actually generated the vectors. The distinction that matters isn't Ollama versus OpenAI — Ollama is just the runtime serving the model locally. It's the embedding model itself: `nomic-embed-text` here is an open-weights model, 768 dimensions, running for free on this laptop, versus a closed model like OpenAI's `text-embedding-3-small` at 1536 dimensions, reachable only through their API. Switching embedding models later isn't a config flip — it means migrating this column, since vectors from two different models aren't interchangeable or even comparable, whatever host happens to be serving them.

## Ingestion

A locally-downloaded, manually-copied-in PDF goes in through `POST /documents`, gets text-extracted page by page via `pypdf`, and then chunked into roughly 800-character pieces — sentence-grouped, simple on purpose for this first working version, each chunk tagged with its source page number so a citation later in this post can point at an exact page. It's the same `pypdf` library under the hood as my [earlier LangChain RAG project](/posts/langchain/) — there I went through LangChain's `PyPDFLoader` wrapper and let `load_and_split()` handle it; here I use `pypdf.PdfReader` directly.

## A provider-agnostic LLM layer, with Ollama as the default

Every LLM provider sits behind one abstract interface, so the RAG skill itself never has to know or care which one is actually answering:

```python
# backend/app/llm/base.py
class LLMProvider(ABC):
    @abstractmethod
    def generate(self, prompt: str, context: str | None = None) -> str: ...
```

```python
# backend/app/llm/__init__.py
def get_llm_provider() -> LLMProvider:
    if settings.llm_provider == "anthropic":
        return AnthropicProvider(settings.anthropic_api_key, settings.anthropic_model)
    if settings.llm_provider == "openai":
        return OpenAICompatibleProvider(settings.openai_api_key, settings.openai_model)
    if settings.llm_provider == "deepseek":
        return OpenAICompatibleProvider(settings.deepseek_api_key, settings.deepseek_model, base_url=settings.deepseek_base_url)
    if settings.llm_provider == "ollama":
        return OllamaProvider(settings.ollama_base_url, settings.ollama_chat_model)
    raise ValueError(f"Unsupported llm_provider: {settings.llm_provider!r}")
```

One env var, `LLM_PROVIDER`, picks which one loads. For local development on the M4 that's `ollama`, pointed at `host.docker.internal:11434` so the backend container can reach Ollama running on the host machine rather than needing its own copy inside Docker. Two models actually live on this laptop right now:

```
$ ollama list
NAME                       ID              SIZE      MODIFIED
llama3.1:8b                46e0c10c039e    4.9 GB    55 minutes ago
nomic-embed-text:latest    0a109f422b47    274 MB    About an hour ago
```

`llama3.1:8b` handles chat generation — it answers in 2–3 seconds with plenty of headroom on 32GB of unified memory. `nomic-embed-text` handles embeddings, at 768 dimensions, which is what `EMBEDDING_DIM` above is actually reading. I'd already put Ollama through its paces on Apple Silicon in [an earlier post benchmarking DeepSeek R1 locally](/posts/ollamadeepsekr1applemacbookinstall/), where the 7B/14B/32B/70B variants ran in 25 seconds to under 2 minutes depending on parameter count and the Mac doing the work — so reaching for it again here as the default provider was an easy call. Neither needs an API key, a network connection past the first `ollama pull`, or a cent of cloud spend — which is exactly the point of building this layer as swappable rather than hard-coding a single provider: the same code that runs free on my own machine today can point at Anthropic's API with one environment variable change once this is worth paying for, without touching a line of the RAG logic itself.

## Retrieval, generation, and citations that can't be hallucinated

Mirroring CoCounsel's fixed-catalog philosophy from [Part 1](/posts/agenticaiforprofessionals1/) `nsw-legal-research-assistant` we focused on progressively adding skills. 

Our "Search a Database" skill and "Review Documents" skills both use the same Postgres/pgvector retrieval and the same `answer_question()` function underneath — Review Documents calls it once per document instead of once globally. 

It's the same [RAG](/posts/contextinjection/) pattern from that [earlier post](/posts/langchain/) — inject relevant retrieved text into the prompt rather than relying on the model's own training data — just with Postgres/pgvector doing the retrieval instead of LangChain. Retrieval embeds the question with the same provider used at ingest time and pulls the nearest chunks by cosine distance, dropping anything below a similarity threshold:

```python
# backend/app/rag/retrieval.py
def retrieve_relevant_chunks(session: Session, question: str) -> list[RetrievedChunk]:
    provider = get_embedding_provider()
    [query_vector] = provider.embed([question])
    distance = Chunk.embedding.cosine_distance(query_vector)
    rows = session.execute(
        select(Chunk, Document, distance.label("distance"))
        .join(Document, Chunk.document_id == Document.id)
        .order_by(distance)
        .limit(settings.rag_top_k)
    ).all()

    results = []
    for chunk, document, dist in rows:
        similarity = 1 - dist
        if similarity < settings.rag_similarity_threshold:
            continue
        results.append(RetrievedChunk(..., similarity=similarity))
    return results
```

Generation then builds a numbered context block from whatever survived that filter and instructs the model to answer *only* from it:

```python
# backend/app/rag/qa.py
SYSTEM_PROMPT_TEMPLATE = """You are a legal research assistant. Answer the question using ONLY the numbered \
source excerpts below -- do not use any outside knowledge, even if you know the \
answer. Cite every factual claim inline using the excerpt's bracket marker, e.g. \
[1]. If the excerpts do not contain enough information to answer, say so \
explicitly instead of guessing.

{context_block}"""
```

The detail I think matters most here: citation *metadata* — case name, medium-neutral citation, page number — is read straight off the retrieved database rows, never generated by the model. The LLM only chooses which numbered excerpt to reference inline; it can never invent a citation that doesn't correspond to a real, retrieved chunk, because the citation objects returned by `/qa` are built in Python from the query results, not parsed out of the model's own text. That's the same "show its work, and make the showing un-fakeable" pattern CoCounsel uses, implemented as a structural guarantee rather than a prompt instruction I'm just hoping the model follows.

## What's still ahead

Phases 1 through 3 are done and validated against a live stack — data layer, LLM orchestration, and the one core RAG skill. What's still checkbox-unticked in the build plan is the part a screenshot would actually show: Phase 4's React/TypeScript upload-and-chat interface, and Phase 5's MCP server exposing this same skill over the Model Context Protocol — Claude Code is the client I'll reach for first, but any MCP client can call it once it's standing. Those become their own post once they exist — I'd rather document what's actually built than write ahead of the code.
