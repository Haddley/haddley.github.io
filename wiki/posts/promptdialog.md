---
type: post
slug: promptdialog
title: "Business Central (Part 1)"
date: "2024-05-24"
part: 1
builds_on: [promptdialog2]
topics: [business-central, copilot-experience, prompt-dialog, al-programming]
tools: [Business Central, Azure OpenAI, AL Language]
status: current
checked: "2026-11-06"
source_hash: "9f2cf47f8714"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to build a Copilot experience in Business Central using the PromptDialog page type. I show how to set up the UI components and logic so the page functions correctly before connecting to an actual AI model.

## What I did
- I created a Copilot page using the PromptDialog type.
- I configured the prompt area, content area, and system actions.
- I implemented a prompt guide with a Capital City example.
- I developed the RunGeneration procedure to handle both Generate and Regenerate actions.
- I verified that the page UI works by echoing the prompt text.

## Claims
- The PromptDialog page type is specifically designed for Copilot experiences.
  > "A: A page type for Copilot experiences."
- The PromptDialog page includes a prompt area, a content area, and system actions.
  > "It has a prompt area for the user's request, a content area for the output, and system actions such as Generate, Regenerate, OK and Cancel."
- The prompt guide provides a set of ready-made prompts for the user.
  > "A: A set of ready-made prompts."
- The Generate and Regenerate actions both call the same RunGeneration procedure.
  > "Both the Generate and the Regenerate actions call the same RunGeneration procedure."
- The page UI and button logic function independently of the AI model connection.
  > "That means the page, its buttons and the OK and Cancel handling all work before any AI is involved."
- The current version of RunGeneration only echoes the prompt text.
  > "The procedure only joins a fixed sentence to the prompt, so it echoes the question."

## Outcome
I built a functional PromptDialog page that handles user input and system actions. This structure allows for a seamless transition to a real AI model in the next part.

## Caveats
The current implementation of RunGeneration does not call a language model.
