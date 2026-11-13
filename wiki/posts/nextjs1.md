---
type: post
slug: nextjs1
title: "Next.js (Part 1)"
date: "2021-11-05"
part: 1
builds_on: []
topics: [nextjs-framework, client-side-navigation, css-modules, styled-components]
tools: [Next.js, React, CSS Modules, Styled Components, Babel]
status: current
checked: "2026-11-06"
source_hash: "3b8d0a87285e"
generated_by: gemma4:12b
---

**Summary.** I built a blog using the Next.js framework to learn the core features of the platform. I explored components for navigation, metadata, and styling methods like CSS Modules and Styled Components.

## What I did
- I scaffolded the project using the official starter template.
- I implemented client-side navigation using the Link component.
- I integrated CSS Modules and Styled Components for styling.
- I configured the project to support styled-components via a .babelrc file.

## Claims
- The Link component improves navigation performance between pages.
  > "It improved navigation performance between the index and second-post pages."
- Next.js prefetches code for linked pages in the background during a production build.
  > "In a production build, Next.js automatically prefetches the code for linked pages in the background."
- I used the next/head component to set the title tag.
  > "I used the `next/head` component to set the `<title>` tag for a Next.js page."
- I used the specific naming convention for CSS Modules supported by Next.js.
  > "I used CSS Modules with the `[name].module.css` file naming convention supported by Next.js."

## Outcome
I built a functional blog that demonstrates core Next.js features and styling integrations.

## Caveats
The post does not cover advanced server-side rendering configurations or complex state management.
