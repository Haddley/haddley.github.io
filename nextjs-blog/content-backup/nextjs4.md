---
title: "Next.js (Part 4)"
description: "A comprehensive guide covering next.js (part 4)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/nextjs4.png"
tags: ["azure","git","github"]
---

# Next.js (Part 4)

Next.js (Part 4) Deploying to Azure This file is licensed under the Creative Commons Attribution-Share Alike 4.0 International license. Deploying a Next.js site to Azure % npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter" % npm run dev npx create-next-app localhost:3000 Azure App Service: Deploy to Web App Select the folder to deploy Create new Web App... haddley-nextjs-blog Node 14 LTS Select a pricing tier Deploying Deployed Articles Create /articles and /articles/[id] pages /articles/index.js /articles/[id]/index.js Updated solution Deploy update Deploy Deployment completed /articles /articles/[id] next-auth % npm install next-auth /pages/api/auth/[...nextauth].js /pages/articles/index.js and /pages/articles/[id]/index.js Deploy update to Azure GitHub OAuth Application next-auth URL, Client ID and Client Secret added to Azure App Service User must be signed in to access /articles User must be signed in to access /articles/1 Sign in Sign in with GitHub Authorize the Haddley Nextjs Blog app Authorize Haddley Signed in /articles page /articles/1 page Azure Active Directory The AzureADProvider from "next-auth/providers/azure-ad" can be used connect Nextjs and Azure Active Directory. [...nextauth.js] (updated) environment settings Application (client) ID, Directory (tenant) ID and 1 secret Client Secret Redirect URIs and Implicit flows /api/auth/signin
