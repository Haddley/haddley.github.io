---
title: "Codespaces and Authentication"
description: "A comprehensive guide covering codespaces and authentication"
date: "2025-09-20"
category: "Development"
image: "/assets/images/codespacesauthentication.png"
tags: ["react","javascript","azure","java","git"]
---

# Codespaces and Authentication

React (Part 4) Codespaces and Authentication React-icon by Facebook does not meet the threshold of originality needed for copyright protection Codespaces and Authentication I used GitHub Codespaces to create a React app, I published the React App using Azure Static Web Sites and GitHub Actions. I used a staticwebapp.config.json file to enable user login and Authentication. I navigated to GitHub and clicked on the Codespaces link I clicked on the React|Use this template button Codespaces opened and "npm start" was executed I ran "npm run build" (noticing that generated files were saved to the /build folder). I published the react project as a new GitHub repository The repository was named Haddley/codespaces-react I navigated to https://portal.azure.com I clicked on the "Static Web Apps" link I clicked the + Create link I created a new resource group I selected the free plan (for hobby and personal projects). I left the Source as GitHub (the default) I selected the codespaces-react repository. I selected the React project presets (with output location "build") I clicked the Create button I navigated to the web site https://gentle-field-0fe462e10.5.azurestaticapps.net A placeholder page was displayed I navigated to the GitHub repository I clicked on the Actions tab An automatic build was already running I navigated to the codespace and selected the "Stop codespace" option The automatic build was successful The React application was deployed to Azure I navigated to the Static Web Application's Azure Active Directory login page https://gentle-field-0fe462e10.5.azurestaticapps.net /.auth/login/aad I logged in using my Azure Active Directory credentials I clicked the Accept button I clicked the Grant Consent button I was returned to the React app home page Adding a NavBar and staticwebapp.config.json I added React Router a NavBar and a staticwebapp.config.json file. Updated project folder structure staticwebapp.config.json updated JavaScript Home page About page Secret page References Configure Azure Static Web Apps Create A Navbar In React With Routing
