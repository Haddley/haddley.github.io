---
type: post
slug: codingagentsthatstay
title: "Coding Agents That Never Leave?"
date: "2026-10-18"
builds_on: [claudecode16, claudecode13, codingagentsroles]
topics: [coding-agents, low-code-platforms, software-maintenance, ai-governance, data-sovereignty]
tools: [Dataverse, Claude Code, Supabase, SQLite, Postgres, Entra]
status: current
checked: "2026-11-05"
source_hash: "a42d21745548"
generated_by: gemma4:12b
---

**Summary.** I explore how coding agents that can maintain systems challenge the value proposition of low-code platforms like Dataverse. I conclude that if an agent can manage a solution independently, the primary value of a platform shifts from ease of creation to the specific governance and contractual benefits it provides.

## What I did
- I analyzed the role of coding agents in the lifecycle of software maintenance.
- I evaluated the current value of low-code platforms in an agent-centric workflow.
- I examined the impact of agent capabilities on technical and contractual lock-in.
- I identified the specific rules that agents need to manage diverse systems effectively.

## Claims
- Coding agents can perform the maintenance tasks that typically follow the initial build of an application.
  > "List the jobs that are left over once an internal app has been built: everything someone has to do in its second year."
- An agent can manage multiple different database types and authentication models with minimal extra effort.
  > "An agent can probably understand Supabase, SQLite, Postgres and Dataverse, and five different authentication models, with little more effort than it takes to understand one."
- The primary value of a platform like Dataverse must now be its ability to provide more than just basic common rules.
  > "It is worth paying for only if it gives agents more than the common rules do, at a price that makes sense, in a form they find easy to work with."
- Technical lock-in may decrease as agents make migration easier, but contractual lock-in remains a risk.
  > "Technical lock-in may weaken as agents make migration cheap; contractual lock-in does not."
- Agents will happily incur high costs or hit API limits without understanding the underlying contract.
  > "An agent will happily run up a bill, or hit a limit at the worst moment, without ever asking whose data it is."
- I have seen an agent successfully change settings and roles in a development environment.
  > "**Agents will be reliable enough to maintain real systems.** I have seen an agent change settings and roles in a development environment, with a confirmation at almost every step."

## Outcome
I concluded that coding agents may make the 'maintenance' argument for low-code platforms weaker unless those platforms offer specific governance advantages that agents cannot replicate on their own.

## Caveats
The reliability of agents in production environments and the speed of organizational adoption of agent-led actions remain uncertain.
