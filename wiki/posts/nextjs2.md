---
type: post
slug: nextjs2
title: "Next.js (Part 2)"
date: "2021-11-06"
part: 2
builds_on: []
topics: [static-generation, server-side-rendering, data-fetching, catch-all-routes]
tools: [Next.js, SWR, npm]
status: current
checked: "2026-11-06"
source_hash: "0ecfecb37fa1"
generated_by: gemma4:12b
---

**Summary.** I explore the different pre-rendering methods available in Next.js, specifically Static Generation and Server-side Rendering. I demonstrate how to combine these strategies with SWR and catch-all routes to build dynamic web applications.

## What I did
- I compared Static Generation and Server-side Rendering.
- I used getStaticProps and getServerSideProps to fetch data.
- I implemented catch-all routes for dynamic paths.
- I integrated useSWR for client-side data fetching.

## Claims
- Static Generation creates HTML during the build process while Server-side Rendering creates it during the request.
  > "Static Generation generates HTML at build time; Server-side Rendering generates it on each request."
- I used getStaticProps and getStaticPaths together to generate multiple pages at build time.
  > "I used `getStaticProps` and `getStaticPaths` together to generate multiple pages at build time."
- I used the next export command to create static HTML files for a web server.
  > "I used `next export` to generate static HTML pages that I could upload to a static web server."
- I used useSWR to fetch data on the client side after the server-side parts of a page loaded.
  > "After the server-side rendered parts of a page downloaded, I used `useSWR` to fetch data client-side and populate the remaining parts of the page."
- Catch-all routes with three dots allow a single file to match multiple nested paths.
  > "`pages/post/[...slug].js` matches `/post/a`, but also `/post/a/b`, `/post/a/b/c`, and so on."

## Outcome
I built a multi-page application that utilizes different rendering strategies based on the specific needs of each page. I also implemented a system for handling dynamic nested routes.

## Caveats
The post does not detail the specific internal logic of the web service calls used to fetch data.
