---
title: "Plants vs. Zombies Clone"
description: "Vibe coding a vanilla JS Plants vs. Zombies clone with Claude Code, complete with Playwright visual regression tests"
date: "2026-06-16"
categories: ["AI", "JavaScript"]
image: "/assets/images/plantsvszombies/wallnut-thumbnail.png"
tags: "claude-code, vibe-coding, anthropic, game-development, playwright"
slug: "plantsvszombies"
---

I spent a lazy evening vibe coding a Plants vs. Zombies clone with Claude Code. The whole game lives in a single vanilla JavaScript file running on an HTML5 canvas — no frameworks, no build step — with sprites pulled from the [UnityPlantsVsZombiesClone](https://github.com/HectorPulido/UnityPlantsVsZombiesClone) repo and the official [Plants vs. Zombies wiki](https://plantsvszombies.wiki.gg/wiki/Plants_vs._Zombies/Gallery). I had Claude Code set up a Playwright-based visual regression test that screenshots the running game and compares it pixel-by-pixel against reference images, so I can keep adding plants and zombies without breaking the layout.


![](/assets/mp4/plantsvszombies/peashooter-sunflower-wallnut-vs-zombie-conehead.mp4)
*I recorded a demo video of the peashooter, sunflower, and wallnut fighting off a zombie and conehead*

![](assets/images/plantsvszombies/Screenshot-2026-06-16-at-5.05.36-AM.png)
*I asked Claude Code to create a video demonstrating sunflower and walnut vs zombie and conehead gameplay, and checked the .gitignore conventions before recording the demo*

![](assets/images/plantsvszombies/Screenshot-2026-06-16-at-5.08.10-AM.png)
*I watched Claude Code work through the walnut and sunflower sprite assets while timing crackedness for the demo*

![](assets/images/plantsvszombies/Screenshot-2026-06-16-at-5.25.54-AM.png)
*I generated a visual regression test that compares the finished game screen against a reference Plants vs. Zombies image*

![](assets/images/plantsvszombies/Screenshot-2026-06-16-at-5.26.06-AM.png)
*I reviewed the compare-reference.js script Claude Code wrote to crop matching regions and compute pixel-difference SSIM scores*

## References

- [UnityPlantsVsZombiesClone](https://github.com/HectorPulido/UnityPlantsVsZombiesClone)
- [Plants vs. Zombies/Gallery](https://plantsvszombies.wiki.gg/wiki/Plants_vs._Zombies/Gallery)
