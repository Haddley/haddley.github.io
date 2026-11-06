---
type: post
slug: gamenight5
title: "Game Night (Part 5)"
date: "2026-08-16"
part: 5
builds_on: [gamenight1, gamenight2, gamenight3]
topics: [unit-testing, no-build-tools, peer-to-peer-networking, automated-audits, ux-testing]
tools: [PeerJS, HTML, JavaScript, GitHub]
status: current
checked: "2026-11-05"
source_hash: "bb69130974a8"
generated_by: gemma4:12b
---

**Summary.** I explain how I test a project that lacks a build step, a server, and modules by extracting logic from raw HTML and using transcript-driven tests. I demonstrate how these techniques catch regressions, prevent scope collisions, and verify that the game mechanics are actually fun.

## What I did
- I extracted game logic from HTML to run unit tests without a browser.
- I implemented automated audits to detect global scope collisions.
- I used real network connections to verify PeerJS and TURN configurations.
- I created a transcript-driven test to ensure the auction mechanics feel correct.

## Claims
- The project uses a unique architecture where every game is a single HTML file with inline scripts.
  > "Every game is one self-contained HTML file with an inline `<script>`."
- I use a specific audit to catch cases where a shared file and a game share a global name.
  > "There's a second kind of audit that's just as sharp, for a completely different failure: **common.js and a game's inline script share one global lexical scope.** A top-level `const`/`let`/`class` name that exists in both is a SyntaxError — not a warning, a SyntaxError — and a SyntaxError takes the *entire* inline script down with it."
- I use real network connections only when the test must prove the network actually functions as expected.
  > "A: When the thing you are proving depends on the real network, such as whether TURN credentials still work."
- I use a transcript-driven test to ensure the auction feels fast and impatient rather than just checking constants.
  > "Everything downstream is judged against that transcript, not against a hardcoded number."
- I use a specific test to ensure the auction remains fast by failing if it takes longer than 32 seconds.
  > "A lot nobody bids on has to be the **fastest** thing in the whole game, not the slowest — it used to take 38 seconds and the test now fails above 32."
- I use a specific test to ensure the auction feels honest by not shortening the test time.
  > "And the test is honest about its own cost: it takes about three minutes, and the comment says plainly why it isn't shortened — the windows *are* the subject, so speeding it up would test a different, faster, less honest version of the auction than the one anybody actually plays."

## Outcome
I built a robust testing suite that validates both the technical correctness of the code and the subjective feel of the gameplay.

## Caveats
The post does not show how the game feels to a human player, only how the transcript-driven tests measure the pacing of the auction.
