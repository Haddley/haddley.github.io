---
title: "Business Central (Part 29) PromptDialog 3"
description: "A comprehensive guide covering business central (part 29) promptdialog 3"
date: "2025-09-20"
category: "Development"
image: "/assets/images/posts-meta.svg"
tags: ["javascript","java","ai","ml","business central"]
---

# Business Central (Part 29) PromptDialog 3

## Prompt Dialog Markdown (Part 3)

![](/assets/images/promptdialog3/dynamics365-color.svg)
*By Microsoft, Public Domain*


## Prompt Dialog Markdown

Large Language Models (LLMs) generate responses in Markdown format for several key reasons, rooted in both their training and practical utility:

**Training Data Influence:**
LLMs are trained on vast datasets that include technical documentation, forums (e.g., GitHub, Stack Overflow), and web content where Markdown is prevalent. This exposure teaches them to recognize and replicate Markdown syntax for structuring information, such as lists, headers, or code blocks.
**User Instructions:**
Users often explicitly request formatted outputs (e.g., "Provide a bulleted list in Markdown"). LLMs adhere to these prompts, leveraging Markdown to organize responses with elements like # headers, - bullets, or triple backticks for code snippets.
**Enhanced Readability and Structure:**
Markdown helps LLMs present complex information clearly. For example:
Code snippets: Enclosed in ``` to avoid syntax conflicts.
Bold/italics: Emphasize key terms (example).
Tables/Headers: Organize data systematically.
**Platform Compatibility:**
Many platforms (e.g., chatbots, note-taking apps) render Markdown, ensuring outputs display neatly. Even in plain text, Markdown remains legible (e.g., *italics* is intuitive).
**Developer Design Choices:**
Model creators might encourage Markdown for consistency, especially in technical contexts (e.g., generating API docs). This aligns with user expectations in developer communities.
**Simplified Formatting:**
Markdown is lightweight and easy to generate programmatically, making it ideal for LLMs to handle without complex rendering logic.

![](/assets/images/promptdialog3/screenshot202025-05-2320at205.36.56e280afpm-2136x962.png)
*I provided a prompt that would return a Markdown formatted response*

![](/assets/images/promptdialog3/screenshot202025-05-2320at205.48.51e280afpm-2136x951.png)
*The Markdown formatted result was hard to read*

![](/assets/images/promptdialog3/screenshot202025-05-2320at207.24.56e280afpm-2136x1196.png)
*I added a controladdin to the PromptDialog*

![](/assets/images/promptdialog3/screenshot202025-05-2320at206.24.52e280afpm-1915x837.png)
*The CreateHTMLFromMarkdown JavaScript function is the key move*

![](/assets/images/promptdialog3/screenshot202025-05-2320at207.17.39e280afpm-1472x617.png)
*Open in Sources panel*

![](/assets/images/promptdialog3/screenshot202025-05-2320at207.04.50e280afpm-1476x568.png)
*Debugging the JavaScript*
