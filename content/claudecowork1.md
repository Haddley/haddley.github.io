---
title: "Claude Cowork (Part 1)"
description: "Using the page-line-summary skill in Claude Cowork to generate a deposition summary from a transcript PDF"
date: "2026-06-04"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "claude-cowork, ai-agent, anthropic, page-line-summary, legal, litigation"
hidden: false
slug: "claudecowork1"
---

Claude Cowork is the desktop app version of Claude — it works with projects (local folders), skills, and scheduled tasks, but without needing the terminal. This post shows the same `page-line-summary` skill from [Claude Code (Part 14)](/posts/claudecode14/) running inside Cowork: I uploaded the skill through the UI, attached the transcript with `@`, answered the two context questions, and got back the same structured deposition summary — no curl command or CLI required.

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-6.47.47-PM.png)
*I selected the Homs v. Salvador project from the Work in a project dropdown*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-6.48.29-PM.png)
*I clicked Allow when Cowork asked for permission to access the project folder*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-6.49.29-PM.png)
*I opened the Skills panel in Customize and saw the page-line-summary skill listed under personal skills*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-6.49.44-PM.png)
*I clicked the + button to see the options for adding a skill, including Upload a skill*


![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.26.01-PM.png)
*The Upload skill dialog accepts a .md file or .zip containing a SKILL.md*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.26.28-PM.png)
*After uploading, Cowork confirmed the skill with an "Uploaded page-line-summary" badge*



![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.26.57-PM.png)
*The page-line-summary skill detail view showing its trigger and description inside Cowork*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.27.18-PM.png)
*The skill picker showed page-line-summary with its description as a tooltip. I could have typed /page-line-summary*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.27.34-PM.png)
*I typed @ to attach a file and the project's transcript appeared in the picker*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.27.45-PM.png)
*I attached the PDF transcript directly to the skill invocation before submitting*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.30.35-PM.png)
*The skill asked which side I represent — I selected Defense*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.31.02-PM.png)
*I entered my case theory in the free-text field: preexisting condition*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.31.44-PM.png)
*The skill started reading the transcript and immediately flagged the key knee limitation admission on p.14*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.32.50-PM.png)
*Reading pages 45–60, the skill flagged the 65% permanent partial disability rating — two years before the accident*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.39.51-PM.png)
*The skill assembled the summary and wrote the output file — 92 pages processed, 30 table entries*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.42.49-PM.png)
*The skill reported its single most significant finding and linked the output document in Google Drive*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.44.11-PM.png)
*The formatted summary opened in Google Drive with the full case caption and page-line table*

## References

- [Legal AI Is Growing Up. Chatbots Were Just the Awkward Phase.](https://www.youtube.com/watch?v=QeIqRnOhs9E&t=1768s)


