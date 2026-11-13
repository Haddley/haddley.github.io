---
type: post
slug: gamenight2
title: "Game Night (Part 2)"
date: "2026-08-16"
part: 2
builds_on: [gamenight1, gamenight3]
topics: [webrtc-connectivity, stun-and-turn, network-topology, nat-traversal]
tools: [WebRTC, PeerJS, Metered]
status: current
checked: "2026-11-05"
source_hash: "2712433c7569"
generated_by: gemma4:12b
---

**Summary.** I explain how WebRTC manages different connection paths like STUN and TURN to connect devices across different networks. I also describe how I use a visual badge to indicate whether a player is using a direct connection or a relay server.

## What I did
- I identified that TURN is a fallback for restrictive networks rather than the primary path.
- I integrated a TURN relay from Metered to ensure connectivity for players behind restrictive NATs.
- I implemented a visual badge to show the connection status to the user.
- I created a test suite to verify that the relay credentials and paths function correctly.

## Claims
- TURN is a fallback mechanism for difficult network conditions rather than the standard path.
  > "The important thing I got wrong before I understood this properly: **TURN is the fallback, not the normal path.** Two phones on separate home broadband connections almost always land on 🌐 — STUN alone gets them talking directly."
- PeerJS defaults to STUN only which can prevent connections on restrictive networks.
  > "PeerJS's default configuration is STUN-only, which is exactly the gap that leaves remote players unable to connect at all when they're behind a restrictive NAT."
- I use port 443 and TLS to ensure the relay works on restricted corporate or hotel networks.
  > "The `:443` and `turns:` TLS entries matter specifically for devices on HTTPS-only networks (some corporate and hotel wifi block everything except port 443), so at least one of the five candidates gets through whatever firewall is in the way."
- The relay is the only method that costs money because it routes data through a server.
  > "The relay only kicks in for the genuinely awkward cases, and it's the only one of the three that costs anything, because every byte of game data is doubling back through a server instead of going device-to-device."
- A badge on the relay icon indicates the connection is passing through a relay server.
  > "A: The connection is going through a relay server rather than a direct path between the two browsers."
- The test suite forces a relay policy to confirm that the credentials still work.
  > "The end-to-end test suite forces `iceTransportPolicy: 'relay'` to throw away every non-relay candidate and confirm both ends actually light up 📡 against the real Metered servers, which doubles as a check that the credentials still work."

## Outcome
I built a system that ensures remote players can connect regardless of their network restrictions while providing a visual indicator of the connection path.

## Caveats
The post does not show the specific internal logic of the PeerJS library, only how I configure it and interpret the results.
