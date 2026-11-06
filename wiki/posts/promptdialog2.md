---
type: post
slug: promptdialog2
title: "Business Central (Part 2)"
date: "2024-05-24"
part: 2
builds_on: []
topics: [azure-openai, business-central, copilot-capabilities, api-security]
tools: [Business Central, Azure OpenAI, Copilot]
status: current
checked: "2026-11-06"
source_hash: "f8ecdcda1193"
generated_by: gemma4:12b
---

**Summary.** I explain how to connect a Business Central Prompt Dialog to Azure OpenAI to generate dynamic AI responses. I demonstrate how to register Copilot capabilities and securely manage API credentials.

## What I did
- Connected the PromptDialog to Azure OpenAI.
- Implemented the RunGeneration procedure to call the chat completions API.
- Registered an LLM capability for the Copilot and agent capabilities page.
- Configured the endpoint, deployment name, and API key.
- Demonstrated how to verify the capability in Business Central.

## Claims
- The system uses Azure OpenAI to provide real responses instead of static text.
  > "I connected the Business Central PromptDialog to Azure OpenAI, so the Copilot generates real AI responses rather than static text."
- The GetApiKey procedure uses a placeholder string that is marked NonDebuggable.
  > "The GetApiKey procedure in the code returns a fixed string, and it is marked NonDebuggable."
- Real keys must be stored in a protected location like a key vault rather than in source code.
  > "Keep real keys and endpoints in a protected store, such as Isolated Storage or a key vault, and read them at run time."
- A Copilot capability is a registered entry that informs Business Central of the features an extension offers.
  > "A: A registered entry that tells Business Central which Copilot features an extension offers."
- The code requires an endpoint, a deployment name, and an API key.
  > "A: An endpoint, a deployment name and an API key."
- The RunGeneration procedure now provides real answers from the model.
  > "RunGeneration now calls Azure OpenAI's chat completions, so the Copilot gives real answers."

## Outcome
I built a functional Prompt Dialog that connects to Azure OpenAI to provide real AI responses. I also established a method for registering and securing Copilot capabilities.

## Caveats
The post uses a placeholder key in the code and does not show the implementation of a secure key vault.
