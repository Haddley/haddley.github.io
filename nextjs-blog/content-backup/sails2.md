---
title: "Sails (Part 2)"
description: "A comprehensive guide covering sails (part 2)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/sails2.png"
tags: ["azure","ai","git","github"]
---

# Sails (Part 2)

Sails (Part 2) Sails and the Azure Cosmos DB API for MongoDB By http://sailsjs.com/ Fair use Articles api % sails generate api articles generate api articles Blueprint API Once the articles api has been created I can use the Blueprint API to create article items. On the laptop I navigate to http://localhost:1337/articles. /articles /articles/Create?title=<title>&body=<body> Push to GitHub The new code is published to https://haddley-sails.azurewebsites.net after it is pushed to the GitHub repository. Push to GitHub GitHub action in progress GitHub action completed Creating and Destroying items Once the articles model update has been published to Azure I can use the Blueprint API to create and to remove (destroy) article items. I navigate to https://haddley-sails.azurewebsites.net/articles. /articles/Create?... /articles/Destroy?... /articles Azure Cosmos DB API for MongoDB In the screenshots above I have been using local disk storage and the sails-disk adapter. Below I update the application to use the Azure Cosmos DB for MongoDB. Overview updated connections.js updated model /articles Data Explorer Push changes to GitHub GitHub action in progress https://haddley-sails.azurewebsites.net/articles connected to Azure Cosmos DB for MongoDB References Build a Sails.js App
