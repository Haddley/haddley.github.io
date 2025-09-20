---
title: "NGRX entity"
description: "A comprehensive guide covering ngrx entity"
date: "2025-09-20"
category: "Development"
image: "/assets/images/ngrxentity/hero.png"
tags: ["ai","git","github","testing"]
---

# NGRX entity

## Managing record collections

![](/assets/images/ngrxentity/ngrx.svg)
*This file is licensed under the Creative Commons 4.0.*


## json-server

I extended my haddley-ngrx project to include support for posts.

I used json-server to create a simple api

```bash
% npm i json-server

```

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.21.40-pm-1536x284.png)
*npm i json-server*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.22.53-pm-1536x503.png)
*Github co-pilot suggested an addition to the scripts section of package.json*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.26.07-pm-1536x676.png)
*I created a db.json in the project's root folder*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.27.45-pm-1536x717.png)
*I started the server by running npm run server*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.28.45-pm-1420x744.png)
*I used chrome to request details of all posts.*


## Accessing the server

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.11.54-pm-1536x433.png)
*ng generate service services/post*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.13.08-pm-1536x913.png)
*ng test*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.16.26-pm-1536x356.png)
*providedIn: 'root' (no need to add service to app.module.ts)*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.21.24-pm-1536x574.png)
*co-pilot suggests creating a post.model file (why not?)*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.23.22-pm-1536x351.png)
*co-pilot suggests that we include a body field (why not?)*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-5.21.38-pm-1536x615.png)
*co-pilot suggests that we include a deletePost method (why not)*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-6.33.32-pm-1536x552.png)
*imports HttpClientModule*


## Testing a service

Initially I wrote tests that called the running json-server.

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-10.33.14-am-1536x746.png)
*Executed 6 of 6 success*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-10.32.47-am-1536x849.png)
*Karma results in a web page*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-10.33.29-am-1536x846.png)
*The json-server shows the POST, DELETE and GET requests*


## Mock the HTTP client

I installed jasmine-auto-spies.

```bash
% npm i --include=dev jasmine-auto-spies
```

I updated the tests to use the mock.

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-10.56.26-am-1536x141.png)
*npm i --include=dev jasmine-auto-spies*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-11.32.27-am-1536x782.png)
*Executed 6 of 6 success*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-11.32.46-am-1536x486.png)
*Karma results in a web page*


## NGRX Entity

Entity provides an API to manipulate and query entity collections.

Reduces boilerplate for creating reducers that manage a collection of models.
Provides performant CRUD operations for managing entity collections.
Extensible type-safe adapters for selecting entity information.

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-3.08.35-pm-1536x498.png)
*Load Posts Success*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-3.09.38-pm-1536x476.png)
*Load Posts Failure (service not running)*
