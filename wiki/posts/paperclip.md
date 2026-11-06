---
type: post
slug: paperclip
title: "Paperclip"
date: "2026-03-28"
builds_on: []
topics: [ai-agents, autonomous-orchestration, multi-agent-systems, cloud-deployment]
tools: [Paperclip, Claude Code, Azure, Vite, Socket.io, Docker]
status: current
checked: "2026-11-06"
source_hash: "e8e12bc27de3"
generated_by: gemma4:12b
---

**Summary.** I explored Paperclip, an open-source tool that allows for the creation of companies staffed entirely by AI agents. I demonstrated how these agents can autonomously handle everything from hiring and planning to software development and cloud deployment.

## What I did
- I set up a company and a CEO agent using the Paperclip wizard.
- I assigned the CEO the task of hiring a founding engineer and creating a roadmap.
- I approved the hiring request and watched the engineer build the core infrastructure.
- I oversaw the deployment of the platform to Azure.
- I verified the final products by playing the games in a browser.

## Claims
- The CEO agent successfully created a multi-stage roadmap and a hiring plan.
  > "Phase 2 covered Product Designer, Backend Engineer, and Growth Lead, along with a four-milestone product roadmap."
- The Founding Engineer built a real-time session management service.
  > "FAC-2 completed with a full summary: JWT auth, room-store, socket handler, REST API, server entry with CORS and Socket.io."
- The system produced a fully functional trivia game with a scoreboard.
  > "It had built a trivia game engine with shuffled questions, speed bonuses, and a scoreboard."
- The web client was upgraded to a Progressive Web App.
  > "FAC-6 done: the web client was now a full Progressive Web App — manifest, service worker, icons, Add to Home Screen support."
- The agent chose a PWA over a native shell for the initial launch.
  > "PWA won on every axis that mattered for launch: same codebase, instant updates, WebSocket support."
- The infrastructure was successfully deployed to Azure with public URLs.
  > "FAC-12 came back done — both services live with public URLs, WebSocket connections confirmed."

## Outcome
I built a functioning multiplayer games platform with a trivia game and a PWA client. The entire process was managed by autonomous agents without me writing any code.

## Caveats
The post does not detail the specific costs of the Azure resources beyond the estimated monthly fee for the B1 plan.
