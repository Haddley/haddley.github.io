---
type: post
slug: promptdialog3
title: "Business Central (Part 3)"
date: "2024-05-24"
part: 3
builds_on: []
topics: [business-central, markdown-rendering, control-add-ins, llm-integration]
tools: [Business Central, ShowdownJS, JavaScript]
status: current
checked: "2026-11-06"
source_hash: "9649657b911f"
generated_by: gemma4:12b
---

**Summary.** I extended the PromptDialog to render Markdown-formatted LLM responses as HTML. I integrated the ShowdownJS library via a control add-in to ensure that complex elements like tables and bold text display correctly.

## What I did
- I extended the PromptDialog to render Markdown-formatted LLM responses as HTML.
- I added a control add-in that uses the ShowdownJS library.
- I created a function to clear the container and convert Markdown to HTML.
- I implemented a process to update the page whenever a new answer arrives.

## Claims
- Raw Markdown text is difficult for users to read.
  > "Because LLMs typically return Markdown, displaying the raw text was hard to read."
- A control add-in allows the execution of JavaScript and HTML inside a Business Central page.
  > "A: A way to run JavaScript and HTML inside a Business Central page."
- The ShowdownJS library converts Markdown into HTML.
  > "A: A JavaScript library that converts Markdown into HTML."
- The system turns on table support for the converter.
  > "The add-in loads showdown.min.js and my MarkdownBoxFunctions.js, and I turned on its table support."
- The function sets the innerHTML from text that a language model wrote.
  > "The function sets innerHTML from text that a language model wrote."
- Output from a model should be treated with care before it is put on a page.
  > "Output from a model should be treated with care before it is put on a page."

## Outcome
I built a MarkdownBox control add-in that transforms raw LLM output into formatted HTML. This ensures that features like tables and bold text are readable for the user.

## Caveats
The post does not show the specific steps for sanitizing the output before it is displayed on the page.
