---
type: post
slug: rag1
title: "Model Context Protocol (Part 3)"
date: "2026-09-18"
part: 3
builds_on: [ollamadeepsekr1applemacbookinstall]
topics: [retrieval-augmented-generation, vector-embeddings, model-context-protocol, docker-containerization]
tools: [Ollama, Postgres, pgvector, FastAPI, React, Claude Code]
status: current
checked: "2026-11-06"
source_hash: "d8ca6e5861df"
generated_by: gemma4:12b
---

**Summary.** I build a Retrieval-Augmented Generation stack to provide relevant context to a language model. I conclude by exposing the search functionality to Claude Code using the Model Context Protocol.

## What I did
- Verified that a local model can generate vector embeddings.
- Set up a Postgres database with the pgvector extension.
- Created a FastAPI backend to manage embedding storage and search.
- Built a React frontend to interact with the search functionality.
- Exposed the search tool to Claude Code via MCP.

## Claims
- RAG provides context by finding relevant text before the model generates an answer.
  > "Retrieval-Augmented Generation, RAG for short, is the pattern behind most of the useful AI applications being built right now: instead of asking a language model to answer purely from what it happened to be trained on, you find the specific, real, relevant text first, hand that to the model as context, and ask it to answer from that."
- The search function is shared between the HTTP route and the MCP tool to prevent them from drifting apart.
  > "One function serves both the HTTP route and the MCP tool, so the two cannot drift apart."
- The MCP tool uses a docstring to describe its purpose to the AI model.
  > "The function's docstring — the triple-quoted string directly below its definition — is not a comment for human readers only; MCP clients, including Claude Code, read it directly and show it to the AI model as the description of what this tool does and when to use it, which is why it is written as a clear, complete sentence rather than a terse label."
- The -T flag is necessary for Docker to ensure the stdio stream remains clean for MCP.
  > "The `-T` flag on `docker compose exec` disables allocating a pseudo-terminal for the executed command — appropriate for a process like this one that communicates over raw stdio rather than expecting an interactive terminal session, and necessary here because allocating one can interfere with the clean stdio byte stream MCP's protocol depends on."
- The .mcp.json file must be in the project root for Claude Code to find it.
  > "It needs to sit at the very top, next to `docker-compose.yml`, `backend/`, and `frontend/`, not underneath any of them."
- The project is built in five verified phases to ensure each component works independently.
  > "Five phases, each verified independently before the next one depended on it: Ollama answering a plain HTTP call with 768 real numbers; Postgres running a real vector similarity query against them; FastAPI gluing the two together behind two small endpoints; React giving it a face; MCP exposing the identical search function to an AI agent, no second implementation required."

## Outcome
I built a functional RAG stack that provides a search tool for Claude Code. This system allows an AI agent to access specific, relevant data through the Model Context Protocol.

## Caveats
The post does not show how Claude Code will choose to use the tool or how well it will perform with the results.
