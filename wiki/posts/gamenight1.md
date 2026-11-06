---
type: post
slug: gamenight1
title: "Game Night (Part 1)"
date: "2026-08-16"
part: 1
builds_on: [gamenight2, gamenight3]
topics: [peer-to-peer-networking, distributed-state, web-rtc-data-channels, stateless-backend-architecture]
tools: [PeerJS, HTML, Playwright]
status: current
checked: "2026-11-05"
source_hash: "868614a37ef4"
generated_by: gemma4:12b
---

**Summary.** I built a suite of multiplayer party games that function as pure static HTML without a backend server. The post explains how I use a peer-to-peer mesh and host-authoritative state to keep all devices in sync.

## What I did
- I built a collection of multiplayer games using static HTML and no backend.
- I implemented a peer-to-peer architecture where one browser holds the authoritative state.
- I designed a system where devices identify as players or spectators based on initial messages.
- I identified and fixed a critical bug regarding stale peer IDs after page refreshes.
- I implemented a heartbeat and timeout system to handle silent disconnections.

## Claims
- The project uses no database or server process.
  > "There's no database and no server process anywhere in this project."
- The host browser holds the entire authoritative state of the game.
  > "Every game follows the same pattern: whichever browser creates the room registers a PeerJS peer ID and holds a single global object — I call it `H` — as the entire authoritative state of the game."
- The system determines a device's role based on the first message it sends.
  > "It waits for the first message to say so:"
- The distinction between a phone and a TV is a simple boolean set by a human.
  > "The only difference between them is one boolean, `isTvHost`, set purely by which button a human tapped — not by screen size, not by user agent, not by anything the browser can actually tell about its own hardware."
- A peer ID changes every time a browser opens a connection or refreshes.
  > "A PeerJS connection's `peer` id is a fresh random string every time a browser opens a connection — including after a page refresh."
- The close event does not fire when a user simply closes a browser tab.
  > "The other assumption I had to unlearn: `conn.on('close')` — the event you'd reach for to detect a player leaving — **does not fire when someone just closes the tab.** I measured it directly: a phone closed mid-turn in Plump Trek, watched for 75 seconds, zero close events."
- A missing heartbeat caused the game to wait 70 seconds for a dropped player.
  > "It costs one timeout the first time it happens per player, rather than every single turn, which is what made a four-player game with one dropped phone unplayable before the fix — the room was paying a 70-second wait every single lap."

## Outcome
I built a suite of multiplayer games that maintain a synchronized state across a peer-to-peer mesh without a central server. I also developed a robust way to handle silent disconnections in a decentralized environment.

## Caveats
The post does not show how the system handles network partitions or complex routing issues in a large-scale mesh.
