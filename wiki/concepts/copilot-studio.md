---
type: concept
slug: copilot-studio
title: "Copilot Studio"
description: "I explore how to build and customize Copilot Studio agents to interact with Business Central and Dynamics 365 data."
posts: [powerapps9, copilotstudiobctools, customercopilotstudio, blogcopilotstudio, customcopilotstudio, configurecopilotsinglesignonforweb, topics, createactionbasedonaflow]
status: current
checked: "2026-11-16"
source_hash: "a3722b7ece17"
generated_by: gemma4:12b
---

**Summary.** I explore how to build and customize Copilot Studio agents to interact with Business Central and Dynamics 365 data. My posts demonstrate how to use tools, global variables, and Power Automate flows to provide context-aware responses and perform actions like creating records.

## The idea
- Copilot Studio was called Power Virtual Agents until November 2023.
- Use Copilot Studio agents to extend standard functionality in model-driven apps and Business Central.
- Leverage global variables and generative AI to provide personalized responses based on active records.
- Configure tools and Power Automate flows to allow the Copilot to find, create, and update data.
- Implement authentication and single sign-on to secure access to private company data.
- Use custom topics and token endpoints to connect Copilots to specific content like blog posts.

## Claims
- The Copilot in a model-driven app is actually a Copilot Studio agent.
  > "**Q: So the Copilot panel in my app is a Copilot Studio agent?**" — powerapps9
- A tool is an action that the agent chooses to call based on its name and description.
  > "A: An action that the agent can choose to call." — copilotstudiobctools
- I used global variables and generative AI features to build a solution that recognizes the specific customer record currently open in Business Central.
  > "I used the Global Variable and Generative AI features in Copilot studio." — customercopilotstudio
- The generative answers feature allows the Copilot to respond when no specific topic matches.
  > "A: It lets the Copilot answer with generated text when no Topic matches the question." — customercopilotstudio
- Microsoft Copilot Studio supports single sign-on to allow users to stay signed in across the page and the copilot.
  > "SSO allows copilots on your website to sign customers in if they're already signed in to the page or app where the copilot is deployed." — configurecopilotsinglesignonforweb
- Power Automate flows can be initiated directly from the Business Central interface.
  > "Power Automate flows can be created from the Business Central user interface." — createactionbasedonaflow
- The system successfully returned the three company names from the production environment.
  > "It returned the three company names.*" — topics
- The Token Endpoint is the address the extension uses to reach the Copilot.
  > "A: The address that the Business Central extension uses to reach the published Copilot." — blogcopilotstudio

## What I concluded
Copilot Studio provides a versatile framework for creating intelligent agents that can interact with specific business data and perform complex actions. By combining global variables, custom tools, and Power Automate, you can create highly contextual and secure AI experiences.
