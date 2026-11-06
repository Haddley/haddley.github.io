---
type: post
slug: ngrxentity
title: "NGRX entity"
date: "2023-02-18"
builds_on: []
topics: [ngrx-entity, json-server, unit-testing, state-management]
tools: [NgRx Entity, json-server, Jasmine, Chrome, npm]
status: current
checked: "2026-11-06"
source_hash: "845e4fcfff76"
generated_by: gemma4:12b
---

**Summary.** I integrated NgRx Entity into my project to manage collections of models more efficiently. I also set up a mockable backend using json-server to facilitate testing and data retrieval.

## What I did
- I extended the project to include support for posts.
- I set up a local API using json-server.
- I implemented NgRx Entity to manage data collections.
- I replaced real server calls in tests with mocks.

## Claims
- I used a local server to provide data for the application.
  > "I used json-server to create a simple api"
- I used a specific configuration to avoid registering the service in the main module.
  > "*I used `providedIn: 'root'` so I didn't need to add the service to app.module.ts*"
- I switched from real server calls to mocks in my test suite.
  > "I updated the tests to use the mock."
- NgRx Entity reduces the amount of code needed for reducers.
  > "It reduces boilerplate for reducers that manage a collection of models and provides performant CRUD operations with type-safe adapters."

## Outcome
I built a system that manages entity collections with less boilerplate and performant CRUD operations. I established a reliable testing workflow using mocks.

## Caveats
The post does not show the specific implementation details of the custom adapters.
