---
type: post
slug: sails2
title: "Sails (Part 2)"
date: "2021-10-12"
part: 2
builds_on: []
topics: [sails-js, azure-cosmos-db, mongodb-integration, deployment-workflow]
tools: [Sails.js, Azure Cosmos DB, MongoDB, GitHub, Blueprint API]
status: current
checked: "2026-11-06"
source_hash: "b86f61b97a28"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to transition a Sails.js application from local storage to a cloud-based database. I specifically focus on integrating the Azure Cosmos DB API for MongoDB to manage data in a production environment.

## What I did
- I created article items using the Blueprint API.
- I deployed the updated code to an Azure web service.
- I switched the storage backend from local disk to Azure Cosmos DB.
- I verified the functionality by creating and destroying items on the live site.

## Claims
- I used the Blueprint API to populate the database with articles.
  > "Once the articles API was created, I used the Blueprint API to create article items."
- The application is hosted on a live Azure website.
  > "The new code was published to https://haddley-sails.azurewebsites.net after I pushed it to the GitHub repository."
- I replaced the local disk storage with Azure Cosmos DB.
  > "I updated the application to use the Azure Cosmos DB for MongoDB."
- I verified the CRUD operations on the live production URL.
  > "I navigated to https://haddley-sails.azurewebsites.net/articles."

## Outcome
I built a Sails.js application that successfully utilizes Azure Cosmos DB for MongoDB as its primary data store.

## Caveats
The post does not detail the specific configuration steps for the Azure Cosmos DB connection string.
