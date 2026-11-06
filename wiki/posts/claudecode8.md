---
type: post
slug: claudecode8
title: "Claude Code (Part 8)"
date: "2026-02-01"
part: 8
builds_on: []
topics: [ai-assisted-development, lisp-interpreters, web-development, github-pages-deployment]
tools: [Claude Code, ChatGPT, VS Code, Jest, Azure, GitHub Actions]
status: current
checked: "2026-11-05"
source_hash: "9731f8d44bea"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how I use Claude Code as a core part of my development toolkit to build a complex application from scratch. I built a Scheme-like LISP interpreter with a Jupyter-style UI using only vanilla web technologies guided by AI.

## What I did
- I collaborated with Claude Code to design and implement a LISP interpreter.
- I developed the application using only HTML, CSS, and JavaScript.
- I established a testing suite and a deployment pipeline.
- I hosted the final application on GitHub Pages.

## Claims
- I use AI as a core part of my development toolkit rather than just a simple helper.
  > "AI isn't just a helper for me—it’s a core part of my development toolkit."
- I built a LISP interpreter with a Jupyter-style UI using only vanilla web technologies.
  > "To demonstrate this, I built a Scheme-like LISP interpreter with a Jupyter-style notebook UI, entirely in vanilla HTML/CSS/JS with no dependencies — guided by Claude Code from first prompt to deployed app."
- Claude drafted a full implementation plan once the requirements were settled.
  > "Claude then drafted a full implementation plan:"
- The interpreter successfully evaluated a factorial function.
  > "*I created a factorial function and it evaluated correctly*"
- The interpreter returned a meaningful error message during testing.
  > "*I tested error handling — the interpreter returned a meaningful error message*"
- I chose a simpler hosting route using GitHub Pages because the project had no dependencies.
  > "Because the interpreter is just a folder of static HTML, CSS, and JavaScript with no build step and no dependencies, I pushed it to its own GitHub repository, `Haddley/lisp`, and switched on GitHub Pages for that repository."

## Outcome
I built a functional LISP interpreter with a custom UI and deployed it to the web. The project demonstrates how AI can augment developer capabilities across various programming languages.

## Caveats
The post does not detail the specific internal logic of the parser or tokenizer, but provides a link to the live application to see them in action.
