---
type: post
slug: nextjs3
title: "Next.js (Part 3)"
date: "2021-11-07"
part: 3
builds_on: []
topics: [api-routes, next-auth, authentication-providers, session-management]
tools: [Next.js, next-auth, GitHub, JSON Web Tokens]
status: current
checked: "2026-11-06"
source_hash: "bbfdbd155c02"
generated_by: gemma4:12b
---

**Summary.** I explain how to implement API routes and authentication within a Next.js application. I demonstrate how to protect specific routes and manage user sessions using the next-auth library.

## What I did
- Created API endpoints using the /pages/api directory.
- Implemented dynamic routes for the API.
- Integrated next-auth with GitHub as the provider.
- Configured environment variables for security.
- Verified user sessions before returning data.

## Claims
- I used the pages directory to create API endpoints.
  > "I added a file to the `/pages/api` directory to create each endpoint."
- I used next-auth to protect unauthorized access.
  > "I used `next-auth` to prevent unauthorized access to protected API methods and pages."
- I used GitHub as the authentication provider.
  > "Here I used GitHub as an authentication provider."
- I used JSON Web Tokens if I did not need to persist user data.
  > "Specifying a database is optional — if I didn't need to persist user data or support email sign-in, JSON Web Tokens would be used for session storage instead."
- I updated the configuration file to specify a database.
  > "To specify a database, I updated the `[...nextauth].js` file and the relevant environment variables."

## Outcome
I built a system that protects API methods and web pages using next-auth. I established a workflow for managing user sessions and data persistence.

## Caveats
The post does not show how to implement email sign-in since that requires a database.
