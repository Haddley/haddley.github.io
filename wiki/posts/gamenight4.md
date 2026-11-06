---
type: post
slug: gamenight4
title: "Game Night (Part 4)"
date: "2026-08-16"
part: 4
builds_on: ["gamenight1"]
topics: ["analytics-integration", "google-ads-experimentation", "event-tracking", "static-site-metrics"]
tools: ["GA4", "Google Ads", "PeerJS", "Buy Me a Coffee"]
status: current
checked: "2026-11-06"
source_hash: "8894981679e9"
generated_by: gemma4:12b
---

**Summary.** I explain how I integrated Google Analytics 4 into a static site to track user engagement and intent. I also describe a small-scale Google Ads experiment to test if paid search can drive new traffic to the games.

## What I did
- Integrated GA4 into a shared JavaScript file to track all games simultaneously.
- Defined specific Key Events to distinguish between user intent and actual transactions.
- Created a redirect page to accurately track QR code scans.
- Launched a low-budget Google Ads campaign to test paid search performance.

## Claims
- I use a single shared file to ensure consistent tracking across all games.
  > "A: One place means one implementation, so the events behave the same way in every game and cannot drift apart."
- I chose not to use the default purchase event because the site cannot verify actual payments.
  > "GA4 ships a default suggested `purchase` Key Event on every property, and I deliberately never touched it."
- I created a specific redirect page to capture QR code scans that bypass the main page.
  > "The QR scan needed its own tiny redirect page, `bmc.html`, because a phone camera reads a QR code's encoded URL and opens it directly — it never touches the page the image is sitting on, so no `onclick` handler on that page can ever fire for an actual scan, only for someone tapping the rendered image on their own screen."
- I set a strict cap on ad spending to keep the experiment controlled.
  > "A cap limits the damage, but it does not make the experiment free."
- I excluded specific keywords like gambling to avoid irrelevant search traffic.
  > "And a short account-level negative-keyword list, because a search for `download`, `apk`, `jobs`, or `buy` has nothing to do with a free browser game — and `casino real money` specifically exists because the card games (Blackjack, Go Fish, I Doubt It) would otherwise pull in real-money-gambling search intent that bounces the instant it lands on a game with no wagering in it at all."
- I kept the ad budget very low to treat the campaign as a controlled experiment.
  > "A dollar a day with a ten-cent cap per click is about as far from an ongoing ad spend as a live campaign can get — it's closer to a controlled experiment than marketing, and I'm watching GA4's Realtime report for `room_created` events carrying a `google`/`cpc` source before I'd ever consider raising the budget."

## Outcome
I built a system to measure user engagement and intent on a static site and established a method for testing paid growth.

## Caveats
The current ad spend is a small experiment and does not represent a full marketing strategy.
