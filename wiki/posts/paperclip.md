---
type: post
slug: paperclip
title: "Paperclip"
date: "2026-03-28"
builds_on: []
topics: ["ai-agents", "autonomous-software-engineering", "multiplayer-game-development", "cloud-deployment"]
tools: ["Paperclip", "Claude Code", "Azure", "Docker", "Vite", "Socket.io"]
status: current
checked: "2026-11-16"
source_hash: "e2f155ba5de1"
generated_by: gemma4:12b
---

**Summary.** I explored the capabilities of Paperclip, an open-source tool for running a company staffed entirely by AI agents. I demonstrated how these agents can autonomously build a multiplayer games platform, manage a product roadmap, and deploy to the cloud without human intervention.

## What I did
- I initialized a company and created a CEO agent using Claude Code.
- I assigned the CEO the task of hiring a founding engineer and creating a hiring plan.
- I approved the hiring of a founding engineer to build a real-time session management service.
- I oversaw the agents as they built a trivia game and deployed the platform to Azure.
- I ran the agents in autonomous mode to complete a final Tic-Tac-Toe game.

## Claims
- The CEO agent produced a detailed hiring plan for a full-stack founding engineer.
  > "Within minutes it produced a detailed hiring plan."
- The agent created a backlog of 8 tasks across four specific roadmap milestones.
  > "It also created 8 backlog tasks across the four roadmap milestones."
- The founding engineer built a real-time session management service including JWT auth and socket handlers.
  > "FAC-2 completed with a full summary: JWT auth, room-store, socket handler, REST API, server entry with CORS and Socket.io."
- The first playable game was a trivia engine with a scoreboard and shuffled questions.
  > "It had built a trivia game engine with shuffled questions, speed bonuses, and a scoreboard."
- The PWA option won over a native shell because it shared the same codebase and supported WebSockets.
  > "PWA won on every axis that mattered for launch: same codebase, instant updates, WebSocket support."
- The deployment used a B1 Linux App Service Plan which costs approximately 13 to 15 dollars per month.
  > "I asked the CEO about costs — the B1 Linux App Service Plan runs ~$13-15/month."

## Outcome
I built a fully functional, deployed multiplayer games platform where the agents handled the architecture, coding, and deployment.

## Caveats
The post does not show the specific prompts or internal reasoning steps the agents used to resolve complex bugs during the development process.
