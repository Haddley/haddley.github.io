---
type: post
slug: orchestration2
title: "Agent Orchestration (Part 2)"
date: "2026-09-24"
part: 2
builds_on: [orchestration1, orchestration3, mcpserver, promptflow4]
topics: [agent-orchestration, a2a-protocol, json-rpc, server-sent-events, agent-discovery]
tools: [Python, uv, curl, Starlette, Uvicorn, a2a-sdk]
status: current
checked: "2026-11-06"
source_hash: "54630275c0d5"
generated_by: gemma4:12b
---

**Summary.** I explain the Agent2Agent (A2A) protocol, which allows one AI agent to communicate with another as a peer rather than just a tool. I demonstrate the protocol by running a Python sample that includes agent card discovery, raw JSON-RPC calls, and both streaming and non-streaming requests.

## What I did
- I compared the A2A protocol to the Model Context Protocol.
- I set up a local Python environment using uv to run the official samples.
- I performed manual curl requests to verify the raw wire protocol.
- I executed the official SDK client to verify the full implementation.
- I verified the difference between public and extended agent cards.

## Claims
- A2A is designed for agent-to-agent communication rather than tool integration.
  > "A2A solves the next problem up: connecting one agent to another agent it does not control and did not write."
- The protocol uses standard technologies like HTTP, JSON-RPC, and SSE.
  > "A2A deliberately reuses existing, boring, well-understood technology rather than inventing anything new: plain HTTP, JSON-RPC 2.0 for the request/response shape, and Server-Sent Events (SSE) for streaming."
- The Python environment setup required a specific version of Python to support the a2a-sdk.
  > "`uv` downloaded a real CPython 3.12 build on the spot, entirely separate from the system's Python 3.9, and used it to create the virtual environment."
- The raw curl calls revealed that the SDK requires specific PascalCase method names.
  > "A genuine, real mismatch: this particular SDK version (`a2a-sdk==1.1.0`) registers its JSON-RPC methods under PascalCase names derived from its underlying protobuf definitions — `SendMessage`, not `message/send` — confirmed directly from the SDK's own source:"
- The server requires a specific version header to avoid being rejected.
  > "The fix, found in the SDK's own `constants.py`, is one header:"
- Streaming calls return a series of events for every state transition.
  > "Four separate events, each one a real, individually-delivered Server-Sent Event, matching `agent_executor.py`'s own four steps one for one — the task first `SUBMITTED`, then a `status_update` moving it to `WORKING`, then an `artifact_update` carrying the actual result the moment it exists, and finally a `status_update` moving it to `COMPLETED`."
- Extended cards allow agents to hide specific skills from unauthenticated users.
  > "Two skills instead of one — `echo_bot_super_mode` only ever appears here, never in the public card fetched at the start of this post, which is the whole point of an extended card: an agent can offer more to a client that proves who it is than to one that has not."

## Outcome
I successfully demonstrated a functional agent-to-agent exchange using the A2A protocol. I proved that the protocol works for both raw wire calls and high-level SDK implementations.

## Caveats
The sample code used for this demonstration does not include an authentication scheme for the primary demonstration of the message flow.
