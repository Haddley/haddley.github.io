---
type: post
slug: azuresearchvector
title: "Azure Search (Part 2)"
date: "2026-03-10"
part: 2
builds_on: []
topics: [retrieval-augmented-generation, vector-search, azure-ai-search, embedding-models]
tools: [Azure AI Foundry, Azure AI Search, Azure OpenAI, Azure Blob Storage]
status: current
checked: "2026-11-05"
source_hash: "135c3ac9dd45"
generated_by: gemma4:12b
---

**Summary.** I built an AI agent in Microsoft Foundry that answers questions based on specific health-plan PDF documents. I used Azure AI Search with vector embeddings to provide the agent with the necessary context for retrieval-augmented generation.

## What I did
- I created a resource group and a Foundry resource to host the project.
- I uploaded health-plan PDFs to a blob container and used the RAG wizard to create a vector index.
- I deployed the text-embedding-ada-002 model to facilitate vectorization.
- I connected the agent to the search index using an API key.
- I tested the agent's ability to provide accurate answers with citations from the source documents.

## Claims
- The embedding model converts document chunks and questions into lists of numbers representing meaning.
  > "A: It turns each chunk of a document, and later each question, into a list of numbers that stands for its meaning."
- The embedding model is only used to find passages, while a separate model writes the final answer.
  > "The agent uses a separate model to write the answer from the passages that the search returns."
- I tested the index in the Search explorer first to ensure the search returned the correct passages.
  > "If the search returns the wrong passages, the agent will write a fluent answer from the wrong material, so I checked the search first."
- I used an API key for the connection because it is the quickest method to set up.
  > "A: It was the option I used, and it is the quickest to set up."
- The wizard required a specific Azure OpenAI resource for the embedding model even though I had a deployment in Foundry.
  > "The wizard needed its own Azure OpenAI resource with the embedding model deployed, even though I had already deployed the model in Foundry."
- The agent successfully cited the Benefit_Options.pdf document as the source for its answer.
  > "The agent cited Benefit_Options.pdf, and its answer was that health insurance costs are deducted from each paycheck."

## Outcome
I built an AI agent that provides accurate, cited answers from a specific set of PDF documents using a RAG architecture.

## Caveats
I used an API key for the connection which is not recommended for production environments where identity-based connections are preferred.
