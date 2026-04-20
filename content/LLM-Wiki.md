---
title: "LLM Wiki"
description: "Karpathy's LLM Wiki"
date: "2026-04-20"
categories: ["AI"]
image: "/assets/images/LLMWiki/obsidian-logo.svg"
tags: "claude-code, ai-agent, anthropic, agentic-coding, ollama, llm, wiki, "
hidden: false
slug: "LLMWiki"
---

Andrej Karpathy published a concept for building a personal knowledge base using LLMs — a "wiki" where you ingest raw source documents (PDFs, emails, notes) and have Claude synthesise structured wiki pages from them. Each page follows a consistent YAML frontmatter schema with type, sources, confidence level, and related pages. A master index tracks everything and an activity log records every ingest. The power is in the cross-referencing: once your documents are in the wiki, you can ask Claude to compare cases, find patterns, or draft documents grounded entirely in your own ingested material.

I applied this to a personal project — building a knowledge base around a dog attack case — and was immediately struck by how useful it became. Within an afternoon I had ingested correspondence, legal precedents, council records, and court filing templates, and could query across all of them with Claude Code.

![CLAUDE.md wiki schema showing project structure and ingest workflow](assets/images/LLMWiki/Screenshot-2026-04-20-at-5.00.32-PM.png)
*I set up the CLAUDE.md file defining the wiki schema — project structure, YAML frontmatter conventions, and the ingest workflow*

![Obsidian graph view showing interconnected wiki pages and source documents](assets/images/LLMWiki/Screenshot-2026-04-20-at-5.01.11-PM.png)
*I opened the Obsidian graph view showing the knowledge base with all the interconnected wiki pages and source documents*

![Claude Code prompt asking to compare case to Dog Attack in Sydney Park](assets/images/LLMWiki/Screenshot-2026-04-20-at-5.04.06-PM.png)
*I asked Claude Code to compare my case to a similar Dog Attack case I had ingested into the wiki*

![Claude Code reading wiki pages to build the case comparison](assets/images/LLMWiki/Screenshot-2026-04-20-at-5.04.22-PM.png)
*Claude Code read the relevant wiki pages and began building the comparison*

![Claude Code comparison table showing parallels between the two dog attack cases](assets/images/LLMWiki/Screenshot-2026-04-20-at-5.04.40-PM.png)
*Claude Code produced a detailed side-by-side comparison table highlighting the strong parallels between the two cases*

![Claude Code prompt to draft a Rule 5.2 summons and affidavit](assets/images/LLMWiki/Screenshot-2026-04-20-at-5.10.10-PM.png)
*I asked Claude Code to draft a Rule 5.2 summons and affidavit using the ingested legal precedents and case details*

![Claude Code editing the summons draft, updating dates and adding statutory references](assets/images/LLMWiki/Screenshot-2026-04-20-at-5.14.31-PM.png)
*Claude Code edited the draft, updating dates and inserting the relevant Companion Animals Act provisions*

![Preview of the affidavit showing the Relief Sought section](assets/images/LLMWiki/Screenshot-2026-04-20-at-5.16.28-PM.png)
*I previewed the affidavit — the Relief Sought section asked the council to disclose the dog owner's registered residential address*

![Preview of the summons addressed to Central Coast Council](assets/images/LLMWiki/Screenshot-2026-04-20-at-5.17.32-PM.png)
*The completed summons addressed to Central Coast Council, citing Rule 5.2 of the Uniform Civil Procedure Rules 2005*

## References

- [A pattern for building personal knowledge bases using LLMs](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [Karpathy's LLM Wiki: The Complete Guide to His Idea File](https://antigravity.codes/blog/karpathy-llm-wiki-idea-file)
