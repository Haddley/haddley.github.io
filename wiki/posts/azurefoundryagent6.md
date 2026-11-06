---
type: post
slug: azurefoundryagent6
title: "Azure Foundry Agent (Part 5)"
date: "2026-10-30"
part: 5
builds_on: [azurefoundryagent5, contextinjection, langchain, rag1, agenticaiforprofessionals2]
topics: [azure-foundry-iq, retrieval-augmented-generation, prompt-engineering, model-context-protocol]
tools: [Azure Foundry IQ, Azure AI Search, Model Context Protocol, Microsoft Learn]
status: current
checked: "2026-11-05"
source_hash: "91aee8873da4"
generated_by: gemma4:12b
---

**Summary.** I evaluate the Azure Foundry IQ module by applying it to a set of Minnesota law documents. I compare a vague agent against a strict agent to see how different instructions affect the accuracy and reliability of the retrieved information.

## What I did
- I followed the Microsoft Foundry IQ learning module using six law documents.
- I built a knowledge base and two agents with different instruction sets.
- I tested both agents against 17 specific questions.
- I compared these results with my previous RAG implementations.
- I analyzed how strict instructions prevent the model from using outside knowledge.

## Claims
- The module's provided code fails because it is outdated and lacks a project connection.
  > "Its tool snippet fails with a 401 because it leaves out a project connection, and its `agent` call style is already deprecated."
- The vague agent provided information from outside the documents while the strict agent did not.
  > "The difference showed up on questions the documents do not cover: the vague agent answered 3 of 6 of them with legal information the documents do not directly cover, and the strict agent answered none of them that way."
- The vague agent answered several questions correctly using its internal memory.
  > "It answered 5 of the 6 outside questions confidently from memory, with figures such as a licence renewal fee, Wisconsin speed limits and a stop sign fine."
- The strict agent correctly used the knowledge base and provided clickable sources.
  > "*I asked about DWI while asleep in a parked car, and the strict agent answered with the section name and two clickable references into the search index*"
- A citation only proves where a passage came from and not that it supports the claim.
  > "A citation shows the source of a passage."
- Strict rules can lead to over-refusal of questions the model could have answered.
  > "Strict rules can over-refuse, so read the refusals too."

## Outcome
I built a system that demonstrates how strict instructions can force an agent to stay within the bounds of a specific knowledge base. I concluded that the difference between a helpful and a reliable agent often lies in the specificity of the instructions.

## Caveats
The results are based on a single run of 17 questions, and the vague agent's performance could vary on a rerun.
