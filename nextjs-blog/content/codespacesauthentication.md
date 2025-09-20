---
title: "Codespaces and Authentication"
description: "A comprehensive guide covering codespaces and authentication"
date: "2025-09-20"
category: "Development"
image: "/assets/images/codespacesauthentication/hero.png"
tags: ["react","azure","git","github"]
---

# Codespaces and Authentication

## Codespaces and Authentication

![](/assets/images/codespacesauthentication/logo512-512x512.png)
*React-icon by Facebook does not meet the threshold of originality needed for copyright protection*


## Codespaces and Authentication

I used GitHub Codespaces to create a React app, I published the React App using Azure Static Web Sites and GitHub Actions. I used a staticwebapp.config.json file to enable user login and Authentication.

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.28.25-am-1836x627.png)
*I navigated to GitHub and clicked on the Codespaces link*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.28.54-am-1836x1057.png)
*I clicked on the React|Use this template button*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.30.00-am-1836x1126.png)
*Codespaces opened and "npm start" was executed*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.30.39-am-1836x1119.png)
*I ran "npm run build" (noticing that generated files were saved to the /build folder).*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.32.02-am-1836x1052.png)
*I published the react project as a new GitHub repository*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.32.28-am-1836x1123.png)
*The repository was named Haddley/codespaces-react*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.34.16-am-1836x989.png)
*I navigated to https://portal.azure.com*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.34.38-am-1836x497.png)
*I clicked on the "Static Web Apps" link*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.34.55-am-1836x985.png)
*I clicked the + Create link*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.36.33-am-1836x988.png)
*I created a new resource group*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.36.54-am-1836x988.png)
*I selected the free plan (for hobby and personal projects). I left the Source as GitHub (the default)*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.37.38-am-1836x983.png)
*I selected the codespaces-react repository. I selected the React project presets (with output location "build")*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.38.06-am-1836x1051.png)
*I clicked the Create button*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.38.49-am-1836x686.png)
*I navigated to the web site https://gentle-field-0fe462e10.5.azurestaticapps.net*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.39.02-am-1836x1120.png)
*A placeholder page was displayed*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.39.49-am-1836x803.png)
*I navigated to the GitHub repository*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.39.59-am-1836x909.png)
*I clicked on the Actions tab*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.40.25-am-1836x1124.png)
*An automatic build was already running*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.40.45-am-1836x889.png)
*I navigated to the codespace and selected the "Stop codespace" option*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.41.11-am-1836x815.png)
*The automatic build was successful*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.41.27-am-1836x1124.png)
*The React application was deployed to Azure*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.42.49-am-1836x407.png)
*I navigated to the Static Web Application's Azure Active Directory login page https://gentle-field-0fe462e10.5.azurestaticapps.net/.auth/login/aad*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.43.06-am-1836x1120.png)
*I logged in using my Azure Active Directory credentials*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.44.49-am-1836x1124.png)
*I clicked the Accept button*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.45.05-am-1836x1120.png)
*I clicked the Grant Consent button*

![](/assets/images/codespacesauthentication/screenshot-2024-03-06-at-10.45.16-am-1836x1117.png)
*I was returned to the React app home page*


## Adding a NavBar and staticwebapp.config.json

I added React Router a NavBar and a staticwebapp.config.json file.

![](/assets/images/codespacesauthentication/screenshot-2024-03-07-at-6.00.12-pm-1836x1000.png)
*Updated project folder structure*

![](/assets/images/codespacesauthentication/screenshot-2024-03-07-at-6.08.42-pm-2136x1105.png)
*Home page*

![](/assets/images/codespacesauthentication/screenshot-2024-03-07-at-6.08.55-pm-2136x1104.png)
*About page*

![](/assets/images/codespacesauthentication/screenshot-2024-03-07-at-6.09.25-pm-2136x1107.png)
*Secret page*
