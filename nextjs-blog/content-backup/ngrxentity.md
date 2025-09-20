---
title: "NGRX entity"
description: "A comprehensive guide covering ngrx entity"
date: "2025-09-20"
category: "Development"
image: "/assets/images/ngrxentity.png"
tags: ["ai","ml","git","github","testing"]
---

# NGRX entity

NGRX entity Managing record collections This file is licensed under the Creative Commons 4.0. json-server I extended my haddley-ngrx project to include support for posts. I used json-server to create a simple api % npm i json-server npm i json-server Github co-pilot suggested an addition to the scripts section of package.json I created a db.json in the project's root folder I started the server by running npm run server I used chrome to request details of all posts. Accessing the server ng generate service services/post ng test providedIn: 'root' (no need to add service to app.module.ts) co-pilot suggests creating a post.model file (why not?) co-pilot suggests that we include a body field (why not?) co-pilot suggests that we include a deletePost method (why not) post.service.ts imports HttpClientModule Testing a service Initially I wrote tests that called the running json-server. Executed 6 of 6 success post.service.spec.ts Karma results in a web page The json-server shows the POST, DELETE and GET requests Mock the HTTP client I installed jasmine-auto-spies. % npm i --include=dev jasmine-auto-spies I updated the tests to use the mock. npm i --include=dev jasmine-auto-spies Executed 6 of 6 success post.service.spec.ts Karma results in a web page NGRX Entity Entity provides an API to manipulate and query entity collections. Reduces boilerplate for creating reducers that manage a collection of models. Provides performant CRUD operations for managing entity collections. Extensible type-safe adapters for selecting entity information. post.actions.ts post.effect.ts post.reducer.ts post.selector.ts app.component.html app.component.ts Load Posts Success Load Posts Failure (service not running) References GitHub repository
