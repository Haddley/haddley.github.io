---
title: "Next.js (Part 4)"
description: "A comprehensive guide covering next.js (part 4)"
date: "2025-09-20"
category: "Web Development"
image: "/assets/images/2560px-nextjs-logo.svg-1536x920.png"
tags: ["azure","aws","git","github"]
---

# Next.js (Part 4)

## Deploying to Azure

![AWS](/assets/images/nextjs4/2560px-nextjs-logo.svg-1536x920.png)
*This file is licensed under the Creative Commons Attribution-Share Alike 4.0 International license.*


## Deploying a Next.js site to Azure

% npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"

% npm run dev

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.25.59-pm-1126x734.png)
*npx create-next-app*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.27.44-pm-1836x986.png)
*localhost:3000*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.27.59-pm-1294x176.png)
*Azure App Service: Deploy to Web App*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.28.08-pm-1276x162.png)
*Select the folder to deploy*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.28.16-pm-1270x172.png)
*Create new Web App...*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.28.44-pm-1302x278.png)
*haddley-nextjs-blog*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.28.52-pm-1284x308.png)
*Node 14 LTS*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.28.58-pm-1272x248.png)
*Select a pricing tier*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.29.48-pm-1684x684.png)
*Deploying*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-2.35.07-pm-1836x993.png)
*Deployed*


## Articles

Create /articles and /articles/[id] pages


## Updated solution

Deploy update

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-3.05.58-pm-1066x688.png)
*Deploy*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-3.00.59-pm-944x204.png)
*Deployment completed*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-3.00.10-pm-1836x944.png)
*/articles*

![](/assets/images/nextjs4/screen-shot-2021-11-11-at-3.00.20-pm-1836x944.png)
*/articles/[id]*


## next-auth

% npm install next-auth

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-10.59.47-am-1836x694.png)
*Deploy update to Azure*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-8.13.42-am-1836x1127.png)
*GitHub OAuth Application*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-5.40.25-pm-1836x937.png)
*next-auth URL, Client ID and Client Secret added to Azure App Service*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-10.55.17-am-1636x852.png)
*User must be signed in to access /articles*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-10.55.27-am-1632x846.png)
*User must be signed in to access /articles/1*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-10.46.54-am-1836x1037.png)
*Sign in*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-10.55.40-am-1626x842.png)
*Sign in with GitHub*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-10.47.17-am-1836x898.png)
*Authorize the Haddley Nextjs Blog app*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-10.47.33-am-1836x635.png)
*Authorize Haddley*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-10.55.52-am-1632x842.png)
*Signed in*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-10.56.07-am-1628x846.png)
*/articles page*

![](/assets/images/nextjs4/screen-shot-2021-11-12-at-11.02.13-am-1630x854.png)
*/articles/1 page*


## Azure Active Directory

The AzureADProvider from "next-auth/providers/azure-ad" can be used connect Nextjs and Azure Active Directory.

![](/assets/images/nextjs4/screen-shot-2022-01-13-at-11.11.13-am-1836x926.png)
*environment settings*

![](/assets/images/nextjs4/screen-shot-2022-01-13-at-11.14.22-am-1836x925.png)
*Application (client) ID, Directory (tenant) ID and 1 secret*

![](/assets/images/nextjs4/screen-shot-2022-01-13-at-11.14.42-am-1836x934.png)
*Client Secret*

![](/assets/images/nextjs4/screen-shot-2022-01-13-at-11.16.04-am-1836x983.png)
*Redirect URIs and Implicit flows*

![](/assets/images/nextjs4/screen-shot-2022-01-13-at-11.17.40-am-1836x1100.png)
*/api/auth/signin*
