---
title: "Azure Foundry"
description: "Creating an Agent"
date: "2026-03-10"
categories: ["AI", "Azure"]
image: "/assets/images/azuresearchvector/posts-meta.svg"
tags: "azure-ai-foundry, azure-ai-search, vector-search, embeddings, rag"
hidden: false
slug: "azurefoundryagent"
---

# Creating an Agent in Azure AI Foundry

I started by creating a new resource group in the Azure portal to contain all the resources for this project.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.29.22-PM.png)
*I created a new resource group named Haddley-Foundry-RG in the Central US region*

I searched the Azure Marketplace for "foundry" and found the Microsoft Foundry service.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.29.58-PM.png)
*I searched the Marketplace for "foundry" and selected Microsoft Foundry*

I filled in the Foundry resource details, naming the resource Haddley-Foundry with a default project of proj-haddley-foundry.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.30.31-PM.png)
*I entered the Foundry resource name and default project name*

I reviewed the configuration and clicked Create.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.31.28-PM.png)
*I reviewed the Foundry resource settings before creating*

The Foundry deployment completed successfully.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.32.34-PM.png)
*The AIFoundry deployment completed*

I navigated to the Foundry resource overview in the Azure portal.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.32.51-PM.png)
*The Haddley-Foundry resource overview with the Go to Foundry portal button*

I opened the Microsoft Foundry portal and saw the project overview with the API key and endpoint details.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.33.16-PM.png)
*The proj-haddley-foundry project overview showing the API key, project endpoint, and Azure OpenAI endpoint*

A dialog prompted me to select the project to continue with.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.33.32-PM.png)
*I selected proj-haddley-foundry to continue*

The Microsoft Foundry home page loaded, showing the latest model arrivals.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.34.06-PM.png)
*The Microsoft Foundry welcome page showing GPT-5.4, GPT-5.3-chat, and Grok 4.1 fast as new arrivals*

## Setting up Storage

I returned to the Azure Marketplace and searched for a storage account to hold the documents I wanted to index.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.37.52-PM.png)
*I searched the Marketplace for "azure storage account"*

I configured a new storage account named haddleystorageaccount for machine learning workloads.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.40.08-PM.png)
*I created a storage account with the Machine learning and artificial intelligence workload type*

I reviewed the storage account settings and clicked Create.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.41.14-PM.png)
*I reviewed the storage account configuration before creating*

The storage account deployed successfully.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.45.04-PM.png)
*The storage account deployment completed*

I created a new blob container named haddleystoragecontainer inside the storage account.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.45.56-PM.png)
*I created the haddleystoragecontainer blob container*

The container appeared in the list alongside the system $logs container.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.46.14-PM.png)
*Both containers are now listed in the storage account*

I opened the container and prepared to upload files.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.46.30-PM.png)
*I opened the Upload blob panel in the empty container*

I selected the [health-plan PDF documents](https://github.com/Azure-Samples/azure-search-sample-data/tree/main/health-plan) from my local machine to upload.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.52.01-PM.png)
*I selected six health-plan PDF files from my local health-plan folder*

All six PDFs uploaded successfully to the container.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.52.20-PM.png)
*The six health-plan PDF blobs are now stored in haddleystoragecontainer*

## Deploying an Embedding Model

I searched the Microsoft Foundry model catalog for the text-embedding-ada-002 model.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.53.59-PM.png)
*I searched for "text-embedding-ada-002" in the Foundry model catalog*

I reviewed the text-embedding-ada-002 model details page.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.54.22-PM.png)
*The text-embedding-ada-002 model detail page showing it is a Direct from Azure model provided by Azure OpenAI*

The model deployed successfully with a 500,000 tokens-per-minute rate limit.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.54.47-PM.png)
*The text-embedding-ada-002 deployment details showing Target URI and provisioning state Succeeded*

## Creating an Azure AI Search Service

I searched the Marketplace for Azure AI Search to create a search index.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.55.44-PM.png)
*I searched the Marketplace for "azure ai search"*

I configured a search service named haddleyaisearch on the Free pricing tier.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.56.16-PM.png)
*I created the haddleyaisearch service in Central US on the Free tier*

The search service deployed successfully.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.56.35-PM.png)
*The search service deployment completed successfully*

I viewed the haddleyaisearch overview showing the service is Running.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.57.01-PM.png)
*The haddleyaisearch service overview showing Running status and the search endpoint URL*

## Indexing with RAG

I clicked Import data (new) and selected Azure Blob Storage as the data source.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.57.16-PM.png)
*I selected Azure Blob Storage as the data source for the import wizard*

I selected RAG as the scenario to enable AI-powered answers.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.57.25-PM.png)
*I selected the RAG scenario to ingest text for AI-powered answers*

I connected the wizard to my haddleystoragecontainer.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-5.59.03-PM.png)
*I configured the Azure Blob Storage connection to haddleystoragecontainer*

The vectorization step initially showed no Azure OpenAI service available, so I needed to create one.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.00.04-PM.png)
*The Vectorize your text step showed no Azure OpenAI service available*

I filled in the Create Azure OpenAI form with the name haddley-azure-openai on Standard S0.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.00.43-PM.png)
*I entered the Azure OpenAI instance name and selected the Standard S0 pricing tier*

I reviewed and submitted the Azure OpenAI deployment.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.01.03-PM.png)
*I submitted the Create Azure OpenAI deployment*

The deployment started and the resource was being created.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.01.28-PM.png)
*The Azure OpenAI deployment was in progress*

Back in the RAG wizard, the haddley-azure-openai service appeared but had no deployments yet.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.02.23-PM.png)
*The Azure OpenAI service was selected but showed no deployments with a supported model*

I navigated to the Azure OpenAI model catalog in Foundry and found text-embedding-ada-002.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.04.09-PM.png)
*I opened the text-embedding-ada-002 model page in the Azure OpenAI section of Foundry*

I deployed the model with a Standard GlobalStandard deployment type.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.04.26-PM.png)
*I deployed text-embedding-ada-002 with a Standard deployment type*

Returning to the RAG wizard, text-embedding-ada-002 was now available to select.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.04.54-PM.png)
*I selected text-embedding-ada-002 as the vectorization model*

I skipped image vectorization and moved to the advanced settings.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.05.04-PM.png)
*I left image vectorization unconfigured and clicked Next*

I enabled the semantic ranker and kept the indexing schedule set to Once.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.05.13-PM.png)
*I enabled the semantic ranker in the advanced settings*

I reviewed the RAG configuration and clicked Create.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.05.23-PM.png)
*I reviewed the full RAG configuration before creating the index*

The index was created successfully and indexing began.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.05.50-PM.png)
*The Create succeeded dialog confirmed the index and indexer were created*

I opened the Search explorer and tested the index with a sample question about health insurance costs.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.07.34-PM.png)
*The Search explorer returned relevant results from the health-plan PDFs for my query*

## Creating the Agent

Back in the Foundry home, I clicked Start building and selected Create agent.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.08.16-PM.png)
*I clicked Start building and selected Create agent from the dropdown*

I named the new agent haddley-health-plan-agent.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.08.49-PM.png)
*I entered haddley-health-plan-agent as the agent name*

The agent playground opened and I clicked to add a tool.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.09.31-PM.png)
*The agent playground opened — I clicked Set up a data source via tools to add Azure AI Search*

I selected Azure AI Search from the tool catalog.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.09.40-PM.png)
*I selected Azure AI Search from the available tools*

I confirmed the Azure AI Search tool selection.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.09.51-PM.png)
*I selected Azure AI Search and clicked Add tool*

No existing connections were available so I created a new one.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.10.04-PM.png)
*No Azure AI Search connections were available — I clicked Connect to new resource*

I connected to the haddleyaisearch service using an API key.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.10.20-PM.png)
*I selected haddleyaisearch and connected via API Key*

The rag-1773125823872 index appeared and I selected it.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.10.40-PM.png)
*I selected the rag-1773125823872 index to connect to the agent*

With the Azure AI Search tool connected and pointing at the RAG index, I typed a question in the chat.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.11.34-PM.png)
*I asked the agent whether the cost of health insurance is spread out over the course of the year*

The agent responded with a clear answer citing the Benefit_Options.pdf document.

![](assets/images/azurefoundryagent/Screenshot-2026-03-10-at-6.14.35-PM.png)
*The agent answered correctly, explaining that health insurance costs are deducted from each paycheck, and cited Benefit_Options.pdf as the source*

## References

- [Quickstart: Vector search in the Azure portal](https://learn.microsoft.com/en-us/azure/search/search-get-started-portal-import-vectors)
