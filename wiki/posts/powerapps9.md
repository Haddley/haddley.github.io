---
type: post
slug: powerapps9
title: "Adding a Custom Topic to the Copilot in a Model-Driven App"
date: "2026-06-01"
builds_on: [topics]
topics: [copilot-studio, model-driven-apps, custom-topics, dataverse-integration]
tools: [Power Apps, Copilot Studio, Dataverse]
status: current
checked: "2026-11-06"
source_hash: "c902728a517f"
generated_by: gemma4:12b
---

**Summary.** I explored the capabilities of the built-in Copilot panel in model-driven apps and discovered it is powered by a Copilot Studio agent. I demonstrated how to extend this agent with custom topics to provide answers that are not available in the standard Dataverse tables.

## What I did
- I built a simple Contacts app to test the default Copilot capabilities.
- I identified a gap where the Copilot could not answer general knowledge questions.
- I created a custom topic in Copilot Studio to address that specific gap.
- I added the customized agent to my solution to ensure it remains available in other environments.

## Claims
- The Copilot in a model-driven app is actually a Copilot Studio agent.
  > "**Q: So the Copilot panel in my app is a Copilot Studio agent?**"
- The default Copilot cannot create records directly.
  > "It could not create records directly, but it offered a link to the Contacts form to do it manually."
- Copilot Studio can automatically generate a topic canvas from a description.
  > "Copilot Studio generated a topic canvas with trigger phrases and a message node containing the answer — no manual canvas editing needed."
- Customizing the agent in Copilot Studio does not automatically add it to your solution.
  > "Customising the agent in Copilot Studio did not add it to my Contacts solution."
- You must use Add existing to ensure the customized agent travels with the app.
  > "I used Add existing to put the customised agent into the solution, so that it travels with the app."

## Outcome
I built a customized Copilot agent that provides specific answers to questions outside of the standard data scope. I also established a workflow to ensure these customizations remain part of the solution during deployment.

## Caveats
Copilot features change quickly, so the user interface may look different than what is shown in the post.
