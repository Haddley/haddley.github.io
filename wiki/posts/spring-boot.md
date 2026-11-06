---
type: post
slug: spring-boot
title: "Java Spring Boot (Part 1)"
date: "2021-04-06"
part: 1
builds_on: [reactusestateuseeffect]
topics: [spring-boot, rest-api, json-serialization, static-content-serving]
tools: [Spring Boot, Spring Tool Suite, Maven, React, Java]
status: current
checked: "2026-11-06"
source_hash: "14681e1fb7c8"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to create a REST API using Spring Boot and Spring Tool Suite. I show how to serve a React client from the same project to provide a unified web application.

## What I did
- I created a REST API with a Book class and a BooksRestController.
- I implemented @RestController and @GetMapping to handle HTTP requests.
- I added a React application to the static resources folder.
- I configured the project to serve both the frontend and the API from one origin.

## Claims
- The @RestController annotation ensures the methods return data instead of web pages.
  > "A: It marks the class as a controller whose methods return data, not web pages."
- The @PathVariable annotation extracts a variable from the URL path.
  > "In /books/{id}, the {id} part is a variable, and @PathVariable hands its value to the method."
- A missing book ID results in a 404 Not Found status instead of an empty page.
  > "So I would expect a 404 Not Found response and not an empty page."
- Serving the React app from the same project avoids cross-origin configuration.
  > "Because the page and the API share one origin, I did not have to configure anything for cross-origin requests."
- The current implementation stores books in memory only.
  > "The books are held in memory only, so they are lost when the application stops."

## Outcome
I built a Spring Boot project that serves a REST API and a React frontend from a single server. I concluded that Spring Boot can serve a REST API with very little code.

## Caveats
The current implementation does not use a database and loses all data when the application stops.
