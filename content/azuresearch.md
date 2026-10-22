---
title: "Azure Search"
part: 1
description: "Setting up a full-text keyword search over hotel data in the Azure portal, with a storage account, a Free search service and the import data wizard"
date: "2026-02-09"
categories: ["AI", "Azure"]
image: "/assets/images/azuresearch/posts-meta.svg"
tags: "azure-ai-search, full-text-search, cognitive-search"
hidden: false
slug: "azuresearch"
---

In this post I set up a full-text search in the Azure portal. I follow Microsoft's [Quickstart: Full-text search in the Azure portal](https://learn.microsoft.com/en-us/azure/search/search-get-started-portal) and index the [hotel sample data](https://github.com/Azure-Samples/azure-search-sample-data/blob/main/hotels/HotelsData_toAzureBlobs.json), so that I can search hotels by keyword.

Here is the plan. I create a resource group and a storage account that holds the JSON file, then create a search service, and then run the import data wizard to turn the file into a searchable index.

:::brain-power Before you read on
A database can find a hotel when I give it an exact id. What does a search service have to do differently to find hotels when I type a few words like new york hotel with pool or gym?
:::

## Look at the data

The sample is a JSON file of hotels.

![](assets/images/azuresearch/Screenshot-2026-02-09-at-3.58.15-PM.png)
*The sample hotel data on GitHub: a JSON file of hotels, each with a name, a description in English and French, a category, tags, a rating and an address*

## Create a resource group and a storage account

I put everything in one resource group, so that I can delete it all in one step when I have finished.

![](assets/images/azuresearch/Screenshot-2026-02-09-at-3.59.10-PM.png)
*I created a resource group called fulltext in East US to hold everything for this walkthrough*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-3.59.25-PM.png)
*I reviewed the resource group settings and clicked Create*

The data has to live somewhere that the search service can reach. I used a blob container in a storage account.

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.00.28-PM.png)
*I searched the Marketplace for storage account and chose the Microsoft Storage account*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.02.11-PM.png)
*I named the storage account fulltextstorageaccount, put it in the fulltext resource group in East US, and chose Standard performance with locally redundant storage*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.02.34-PM.png)
*I reviewed the storage account settings and clicked Create*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.03.12-PM.png)
*The storage account deployment is complete*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.03.41-PM.png)
*The fulltextstorageaccount overview*

## Upload the hotel data

The container now needs the file that I will index.

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.04.18-PM.png)
*I created a private container called hotels-sample*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.04.51-PM.png)
*I chose the HotelsData_toAzureBlobs.json file to upload*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.05.18-PM.png)
*The container now holds HotelsData_toAzureBlobs.json, a 318 KiB block blob*

## Create the search service

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.05.58-PM.png)
*I searched the Marketplace for search service and chose Azure AI Search*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.06.52-PM.png)
*I named the service fulltextsearchservice, put it in Central US, and chose the Free pricing tier*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.07.44-PM.png)
*The search service deployment succeeded*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.07.58-PM.png)
*The fulltextsearchservice overview shows the Free tier and the Running status. Import data (new) is in the toolbar*

:::no-dumb-questions
**Q: Why use the Free pricing tier?**

A: It costs nothing, and it is enough for a walkthrough: 50 MB of storage, 1 replica and 1 partition. It has no service level agreement, so it is not for production.

**Q: What is the difference between a search service and an index?**

A: The search service is the resource that I pay for. An index lives inside it, and it holds the searchable copy of my data. One service can hold several indexes.
:::

## Run the import data wizard

The wizard connects to the data, builds an index from it, and loads the index.

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.08.11-PM.png)
*The import wizard asks for a data source, and I chose Azure Blob Storage*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.08.28-PM.png)
*I chose the Keyword search scenario, which ingests text for a keyword search*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.09.40-PM.png)
*I pointed the wizard at fulltextstorageaccount and the hotels-sample container. The parsing mode started as JSON array*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.13.18-PM.png)
*I changed the parsing mode to JSON and left deletion tracking and managed identity switched off*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.14.16-PM.png)
*The wizard offers optional AI enrichments: extract phrases, split text and extract entities. I did not select any of them*

## Look at the index fields

The wizard guesses a type and a set of attributes for every field.

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.14.53-PM.png)
*The wizard previews the index fields it built from the JSON, such as HotelId, HotelName, Description, Category and Tags, with a type for each*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.27.22-PM.png)
*I opened the HotelId field to look at its attributes: filterable, sortable and searchable, with the Standard Lucene analyzer*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.35.54-PM.png)
*The SmokingAllowed field is a Boolean that is retrievable, filterable and facetable, but not sortable*

:::no-dumb-questions
**Q: What do retrievable, filterable, sortable, facetable and searchable mean?**

A: Retrievable fields can come back in the results. Filterable fields can be used in a filter, such as a rating above 3.1. Sortable fields can order the results. Facetable fields can be counted into groups, such as hotels per category. Searchable fields are the ones that a keyword search looks inside.
:::

:::pencil Choose the attributes
The SmokingAllowed field is a Boolean. Which of the five attributes would you switch on for it, if the only things you ever want to do are filter hotels by it and show the value in the results?

:::answer
Retrievable and filterable. Searchable would only matter if someone typed words to search inside the field, and a true or false value is a poor fit for that. In the wizard, I left it as retrievable, filterable and facetable, which also lets me count how many hotels allow smoking.
:::
:::

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.37.07-PM.png)
*I enabled the semantic ranker and set the indexing schedule to Once*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.37.47-PM.png)
*The review page shows the data source, the object name prefix hotels-sample, AI enrichments Disabled, the semantic ranker Enabled and the schedule Once*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.38.07-PM.png)
*The wizard created the data source, the index, the skillset and the indexer*

:::under-the-hood What the wizard created
Based on the status list on the final screen, the wizard created four objects on the search service: a data source that points at the container, an index with the fields I saw, a skillset, and an indexer that runs the pipeline. They share one name prefix, hotels-sample. I turned off AI enrichments, so the skillset has nothing to do in this run.
:::

## Search the index

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.39.00-PM.png)
*In the Search explorer, I typed new york hotel with pool or gym. The index holds 1 document and 23.1 KB*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.40.28-PM.png)
*In the JSON view, the same query runs as a semantic search and returns 1 result, with a search score and a reranker score*

![](assets/images/azuresearch/Screenshot-2026-02-09-at-4.47.41-PM.png)
*I tried a keyword query for Budget, with a filter of Rating gt 3.1 and a select of four fields. It returned the Stay-Kay City Hotel with a rating of 3.6*

:::test-drive Try it yourself
1. Open the index in the Search explorer and type a few words from a hotel description.
2. Switch to the JSON view and add a filter, such as Rating gt 3.1.
3. Add a select with only the fields you need, and see how the results shrink.
4. Check the document count at the top of the page against the number of hotels in your file.
:::

:::bullet-points Recap
- A search service builds an index from my data, and a keyword search looks inside the fields that are marked searchable.
- I used a resource group, a storage account with one JSON file, and a Free search service.
- The import data wizard created a data source, an index, a skillset and an indexer for me.
- Field attributes such as filterable, sortable and facetable decide what I can do with each field.
- My index held only one document, so I would check the parsing mode and the document count before I relied on the results.
:::

## References

- [Quickstart: Full-text search in the Azure portal](https://learn.microsoft.com/en-us/azure/search/search-get-started-portal)
