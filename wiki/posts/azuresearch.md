---
type: post
slug: azuresearch
title: "Azure Search (Part 1)"
date: "2026-02-09"
part: 1
builds_on: []
topics: [full-text-search, azure-search, data-indexing, json-parsing]
tools: [Azure Portal, Azure Storage Account, Azure AI Search, JSON]
status: current
checked: "2026-11-05"
source_hash: "512bfc15cd40"
generated_by: gemma4:12b
---

**Summary.** I set up a full-text search in the Azure portal using hotel data. I demonstrated how to use the import data wizard to create a searchable index from a JSON file.

## What I did
- I created a resource group and a storage account to hold the hotel data.
- I provisioned a search service using the Free pricing tier.
- I used the import data wizard to create a data source, an index, a skillset, and an indexer.
- I configured field attributes like filterable and searchable to control how the search engine processes the data.

## Claims
- The Free pricing tier is sufficient for a walkthrough because it provides enough storage and resources.
  > "A: It costs nothing, and it is enough for a walkthrough: 50 MB of storage, 1 replica and 1 partition."
- The search service is the resource I pay for while the index holds the searchable copy of the data.
  > "A: The search service is the resource that I pay for."
- The wizard automatically creates four specific objects to manage the data pipeline.
  > "Based on the status list on the final screen, the wizard created four objects on the search service: a data source that points at the container, an index with the fields I saw, a skillset, and an indexer that runs the pipeline."
- Searchable fields are the specific fields that a keyword search looks inside.
  > "Searchable fields are the ones that a keyword search looks inside."
- The search query successfully returned the Stay-Kay City Hotel with a rating of 3.6.
  > "It returned the Stay-Kay City Hotel with a rating of 3.6*"
- Field attributes like filterable and sortable determine what actions I can perform on each field.
  > "Field attributes such as filterable, sortable and facetable decide what I can do with each field."

## Outcome
I built a functional search service that allows users to find hotels using keywords rather than just exact IDs.

## Caveats
The Free pricing tier does not include a service level agreement and is not intended for production use.
