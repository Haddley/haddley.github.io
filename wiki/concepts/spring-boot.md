---
type: concept
slug: spring-boot
title: "Spring Boot"
description: "I explore the versatility of Spring Boot by building everything from REST APIs and GraphQL endpoints to full-stack web applications."
posts: [spring-boot-7, spring-boot-6, spring-boot-5, spring-boot-4, spring-boot-3, spring-boot-2, spring-boot]
status: current
checked: "2026-11-06"
source_hash: "0355266e13bd"
generated_by: gemma4:12b
---

**Summary.** I explore the versatility of Spring Boot by building everything from REST APIs and GraphQL endpoints to full-stack web applications. I also cover essential features like Spring Security, data persistence with Spring Data JPA, and automated deployment workflows.

## The idea
- Building REST APIs and GraphQL interfaces to serve data.
- Implementing security features like OAuth2 and role-based access.
- Managing data persistence using Spring Data JPA and H2 databases.
- Creating web frontends using Thymeleaf or integrated React clients.
- Automating deployment to cloud platforms like Azure.

## Claims
- The @RestController annotation ensures that methods return data instead of web pages.
  > "A: It marks the class as a controller whose methods return data, not web pages." — spring-boot
- Spring Data JPA reduces the amount of boilerplate code needed for data access.
  > "I created a Spring Boot application using Spring Data JPA, which provides high-level, repository-style interfaces for data access and reduces boilerplate code." — spring-boot-3
- The application never sees the user's GitHub password when using OAuth2.
  > "The application sends the browser to GitHub, the user signs in there, and GitHub sends the browser back with proof, so my application never sees the GitHub password." — spring-boot-6
- The schema acts as the contract between the client and the server in a GraphQL API.
  > "A: The contract between the client and the server." — spring-boot-5
- Thymeleaf fills HTML placeholders with model data before the browser renders the page.
  > "I write an HTML page with placeholders, and Thymeleaf fills them in with the model data before the browser sees the page." — spring-boot-4
- The H2 database stores data in memory so that changes are lost when the application stops.
  > "The H2 database is in memory, so my changes are lost when the application stops." — spring-boot-5
- A push to GitHub updates the live site without a manual upload.
  > "A push to GitHub was enough to update the live website, with no manual upload." — spring-boot-2
- Azure Spring Apps is a managed service that handles the underlying Kubernetes infrastructure.
  > "**It is fully managed, and it runs on Kubernetes.** Each service instance has two dedicated Kubernetes clusters that Azure Spring Apps manages and hides from me." — spring-boot-7

## Where the posts differ
- The application moves from in-memory storage to persistent data management and eventually to managed cloud infrastructure.
  > "The books are held in memory only, so they are lost when the application stops." — spring-boot
  > "Everything in it disappears when the application stops, and the data loader puts the two items back on the next start." — spring-boot-3
- The front-end approach shifts from a unified React project to a rendered Thymeleaf template.
  > "Because the page and the API share one origin, I did not have to configure anything for cross-origin requests." — spring-boot
  > "I write an HTML page with placeholders, and Thymeleaf fills them in with the model data before the browser sees the page." — spring-boot-4

## What I concluded
Spring Boot provides a comprehensive framework for building secure, scalable, and data-driven applications. It supports diverse architectures ranging from simple REST APIs to complex, cloud-deployed web systems.
