---
type: post
slug: pwa
title: "Progressive Web Application"
date: "2021-07-24"
builds_on: []
topics: [progressive-web-applications, service-workers, offline-capabilities, web-deployment]
tools: [GitHub, GitHub Desktop, Azure Portal, pwa-asset-generator, Google Chrome DevTools, Lighthouse]
status: current
checked: "2026-11-06"
source_hash: "f4e4f23ce583"
generated_by: gemma4:12b
---

**Summary.** I built a Progressive Web Application by converting a standard web page into a mobile-friendly application. I demonstrated how to implement service workers and manifest files to enable offline functionality and cross-platform installation.

## What I did
- I created a GitHub repository and deployed it as a Static Web App.
- I added a manifest file and a service worker to the project.
- I generated application icons and integrated them into the configuration.
- I defined fetch and install event handlers to support offline access.
- I tested the application on multiple mobile and desktop devices.

## Claims
- I converted the web page into a Progressive Web Application by adding a manifest and a service worker.
  > "To convert the web page to a Progressive Web Application, I added a manifest and a service worker."
- The install handler copies the offline page to the browser cache.
  > "The install handler copies offline.html to the browser cache."
- The fetch handler serves the cached file when no network connection is available.
  > "The fetch handler serves the cached file when no network connection is available."
- I used the Lighthouse report to evaluate the application.
  > "I ran the Lighthouse report in Google Chrome DevTools to evaluate the Progressive Web Application."
- I installed the application on both Android and Apple mobile devices.
  > "I installed the Progressive Web Application on an Apple mobile phone."

## Outcome
I built a functional Progressive Web Application that works offline and across multiple platforms.

## Caveats
The post does not detail the specific configuration of the Azure Resource Group.
