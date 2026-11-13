---
type: post
slug: spring-boot-2
title: "Java Spring Boot (Part 2)"
date: "2023-10-26"
part: 2
builds_on: []
topics: [spring-boot, github-actions, azure-app-service, continuous-deployment]
tools: [Spring Boot, start.spring.io, Visual Studio Code, GitHub, Microsoft Azure, Maven]
status: current
checked: "2026-11-06"
source_hash: "e9b6002a1404"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to create a Spring Boot application and deploy it to a live website. I show how GitHub Actions automates the deployment process so that every push to the repository updates the site automatically.

## What I did
- I generated a Spring Boot project using start.spring.io.
- I configured the project to run locally and verified the code.
- I set up an Azure App Service with a Basic B1 plan to enable continuous deployment.
- I configured a GitHub Actions workflow to build and deploy the application.
- I verified that pushing new code updates the live website automatically.

## Claims
- I used start.spring.io to generate the initial project skeleton.
  > "A: A web page that generates the skeleton of a Spring Boot project."
- I chose Java 17 to ensure the project matched the Azure runtime.
  > "I wanted the project and the runtime to match, so I chose Java 17 in both."
- The Basic B1 plan was necessary because the Free plan does not allow continuous deployment.
  > "When I chose the Free pricing plan, the Continuous deployment option was disabled, so I went back and selected the Basic B1 plan."
- The build job sets up the environment and creates the JAR file.
  > "A build job checks out the code, sets up Java 17, runs mvn clean install, and uploads the JAR file."
- The deploy job sends the JAR file to the web app using a secret publish profile.
  > "A deploy job waits for the build job, downloads the JAR file, and sends it to the haddley-java Web App using a publish profile that GitHub keeps as a secret."
- A push to GitHub updates the live site without a manual upload.
  > "A push to GitHub was enough to update the live website, with no manual upload."

## Outcome
I built a Spring Boot application that automatically redeploys to Azure App Service whenever I push changes to my GitHub repository.

## Caveats
The post does not show the specific contents of the secret publish profile used by GitHub.
