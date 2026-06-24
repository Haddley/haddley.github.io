---
title: "Space Invaders"
description: "Building a Space Invaders clone three ways: OpenCode with Big Pickle, OpenCode with DeepSeek V4 Pro, and Claude Code with Sonnet 4.6"
date: "2026-06-19"
categories: ["AI", "JavaScript"]
tags: "claude-code, vibe-coding, game-development, canvas, web-audio"
slug: "invaders"
image: "/assets/images/invaders/invaders-thumbnail.png"
---

I wanted to investigate OpenCode — an open source AI coding agent that works with any model. To give it a real test I decided to build a Space Invaders clone, and then run the same prompt three times: once with OpenCode Big Pickle, once with OpenCode and the DeepSeek API, and once with Claude Code Sonnet 4.6.

OpenCode is open source and installs with a single command:

```bash
curl -fsSL https://opencode.ai/install | bash
```

![](assets/images/invaders/Screenshot-2026-06-19-at-11.22.11-AM.png)
*I installed OpenCode, upgrading from 1.3.0 to 1.17.8*

## Run 1 — OpenCode Big Pickle

I navigated to the invaders project directory and launched OpenCode.

Big Pickle is a free coding model. It is offered directly by OpenCode with a 200,000-token context window and zero usage costs.

![](assets/images/invaders/Screenshot-2026-06-19-at-11.26.10-AM.png)
*I ran `opencode` in the invaders project folder*

I had already written a PRD and PDD for the game, so I gave OpenCode a single prompt pointing at those documents.

```PROMPT
Build invaders game see PRD.md and PDD.md
```

![](assets/images/invaders/Screenshot-2026-06-19-at-11.27.52-AM.png)
*OpenCode read both documents and started the Build task using the Big Pickle model*

![](assets/images/invaders/Screenshot-2026-06-19-at-11.31.27-AM.png)
*OpenCode created all the source files — constants, sprites, audio, input, entities, and the engine*

After the files were created, I opened the game in a browser and nothing appeared. I told OpenCode the game wasn't working.

![](assets/images/invaders/Screenshot-2026-06-19-at-11.46.09-AM.png)
*OpenCode spun up a local HTTP server to serve the ES modules and immediately spotted a 404 — the game loop was never reaching the START state*

![](assets/images/invaders/Screenshot-2026-06-19-at-11.46.42-AM.png)
*OpenCode diagnosed the issue: `this.lastTime` was initialised to `0`, causing a huge delta on the first frame that broke the game loop. It changed it to `performance.now()`*

![](assets/images/invaders/Screenshot-2026-06-19-at-11.47.20-AM.png)
*The game was running — all three alien types, four shields, the player cannon, score and lives tracking*

The game worked end-to-end, but I noticed the UFO sound kept playing after the saucer flew off screen. I reported the bug.

![](assets/images/invaders/Screenshot-2026-06-19-at-11.52.15-AM.png)
*OpenCode added a check to call `audio.stopUFO()` before dead UFO entities were filtered from the array*

![](assets/images/invaders/Screenshot-2026-06-19-at-11.54.38-AM.png)
*OpenCode confirmed the fix: "Now when a UFO exits the screen, `audio.stopUFO()` is called before it's filtered out from entities"*

The game is playable at [/invaders-bigpickle/index.html](/invaders-bigpickle/index.html).

## Run 2 — OpenCode DeepSeek

For the second run I connected OpenCode to DeepSeek V4 Pro via the cloud API. The setup steps are documented in the [DeepSeek API docs](https://api-docs.deepseek.com/guides/coding_agents).

![](assets/images/invaders/Screenshot-2026-06-19-at-5.30.41-PM.png)
*The DeepSeek API docs show the exact steps: run `opencode`, type `/connect`, enter your API key, and select the model*

I ran `opencode` in the invaders-deepseek folder and typed `/connect` to open the provider picker.

![](assets/images/invaders/Screenshot-2026-06-19-at-5.26.08-PM.png)
*I typed `/connect`, searched for DeepSeek, and selected it from the provider list*

![](assets/images/invaders/Screenshot-2026-06-19-at-5.26.39-PM.png)
*I selected DeepSeek V4 Pro from the model list*

![](assets/images/invaders/Screenshot-2026-06-19-at-5.26.53-PM.png)
*I left the variant set to Default*

With DeepSeek V4 Pro connected, I entered the same prompt as Run 1.

![](assets/images/invaders/Screenshot-2026-06-19-at-5.30.06-PM.png)
*I entered the same prompt — "build invaders game see PRD.md and PDD.md. fresh start." — with DeepSeek V4 Pro*

![](assets/images/invaders/Screenshot-2026-06-19-at-5.36.28-PM.png)
*DeepSeek validated imports and syntax across all 21 source files before starting the build*

![](assets/images/invaders/Screenshot-2026-06-19-at-5.37.22-PM.png)
*DeepSeek outlined the full file structure and started a local HTTP server to serve the ES modules*

The game had a SyntaxError in audio.js — an orphaned function body left by an earlier edit.

![](assets/images/invaders/Screenshot-2026-06-19-at-5.38.06-PM.png)
*DeepSeek diagnosed and fixed it: the `playSound()` function header had been separated from its body. It restored the declaration.*

![](assets/images/invaders/Screenshot-2026-06-19-at-5.38.52-PM.png)
*The game ran — score 290, UFO crossing the screen, the formation thinned and shields taking hits*

After a few rounds, I noticed the player didn’t reappear after dying. I reported the bug.

![](assets/images/invaders/Screenshot-2026-06-19-at-5.40.00-PM.png)
*DeepSeek traced it to the dead-entity filter removing the player before `_handlePlayerRespawn` could push it back. It fixed it by pushing the player back into `this.entities` after respawn.*

![](assets/images/invaders/Screenshot-2026-06-19-at-5.40.35-PM.png)
*The fix worked — I played on to 550 points with the UFO still crossing and the formation well thinned*

![](assets/images/invaders/Screenshot-2026-06-19-at-5.50.41-PM.png)
*The DeepSeek usage dashboard showed 42 API requests and 1.89 million tokens for the entire run — $0.09*

The game is playable at [/invaders-deepseek/index.html](/invaders-deepseek/index.html).

## Run 3 — Claude Code Sonnet 4.6

For the third run I used Claude Code with Sonnet 4.6, working from the same PRD and PDD.

![](assets/images/invaders/Screenshot-2026-06-19-at-1.00.05-PM.png)
*I launched Claude Code v2.1.183 (Sonnet 4.6) in the invaders-claude folder — it read the PRD and PDD and immediately started planning the build*

![](assets/images/invaders/Screenshot-2026-06-19-at-1.02.22-PM.png)
*I restarted with a clean prompt: "build invaders game see PRD.md and PDD.md. fresh start."*

![](assets/images/invaders/Screenshot-2026-06-19-at-1.11.20-PM.png)
*Claude Code announced the plan — constants, entities, then engine — and asked permission to create the directory structure*

![](assets/images/invaders/Screenshot-2026-06-19-at-1.12.05-PM.png)
*Claude Code wrote sprites.js, defining all the pixel-art alien and player sprites as ASCII string arrays*

![](assets/images/invaders/Screenshot-2026-06-19-at-1.16.03-PM.png)
*Claude Code wrote engine.js — the game loop, state machine, collision detection, score and wave management*

![](assets/images/invaders/Screenshot-2026-06-19-at-1.16.23-PM.png)
*Claude Code asked permission to create index.html, showing the canvas element and the script tag loading engine.js*

![](assets/images/invaders/Screenshot-2026-06-19-at-1.16.56-PM.png)
*Claude Code refined the march tempo in audio.js — the interval now scales dynamically with the number of remaining aliens*

![](assets/images/invaders/Screenshot-2026-06-19-at-2.06.27-PM.png)
*I played a round — the formation thinned to about 34 aliens, the shields took damage, and the score reached 260*

![](assets/images/invaders/Screenshot-2026-06-19-at-1.20.51-PM.png)
*Claude Code listed everything it had built, then spotted the UFO audio bug: the saucer sound didn't stop when it left the screen*
![](assets/images/invaders/Screenshot-2026-06-19-at-1.24.30-PM.png)
*Claude Code fixed it: `audio.stopUFO()` now fires as soon as the UFO exits the screen, before the dead-entity filter removes it from the array*


The game is playable at [/invaders-claude/index.html](/invaders-claude/index.html).

## What I learned

All three models produced a (mostly) working Space Invaders clone from a single prompt — which still feels remarkable. The differences were in the path they took to get there.

Big Pickle (OpenCode's free model) moved fast and produced a complete file structure in one pass, but needed two rounds of debugging to fix a game-loop timing bug and a UFO audio leak. Both bugs were caught by playing the game, not by the model proactively.

DeepSeek V4 Pro was the most thorough during the build phase — it validated syntax across all 21 source files before serving them, and caught a malformed function body in audio.js that would have silently broken the audio system. It still needed prompting to find the player-respawn bug, but once I reported it the trace was precise.

Claude Code was the most methodical overall. It presented a build plan before writing a single file, asked for permission at each write step, and caught the UFO audio bug itself without being told. The permission flow slows things down but means you always know what's about to change.

The UFO audio bug — where the saucer sound keeps playing after the sprite exits the screen — appeared in two of the three runs. Big Pickle needed prompting to find it; Claude Code caught it proactively after finishing the build.

## References

- [OpenCode](https://opencode.ai) — open source AI coding agent
- [OpenCode GitHub](https://github.com/sst/opencode) — source and documentation
- [DeepSeek API](https://api-docs.deepseek.com/guides/coding_agents) — integrate DeepSeek with OpenCode
- [Web Audio API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) — used for all synthesized audio
- [Space Invaders — Wikipedia](https://en.wikipedia.org/wiki/Space_Invaders) — the 1978 Taito original
- [How to Lose a Trillion-Dollar AI Business in 90 Minutes](https://www.youtube.com/watch?v=0RxMj0L0-fY&t=1606s)
