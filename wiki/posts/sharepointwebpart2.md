---
type: post
slug: sharepointwebpart2
title: "SharePoint Web Part (Part 2)"
date: "2021-02-14"
part: 2
builds_on: [reactusestateuseeffect, restapiservice]
topics: [sharepoint-framework, react-hooks, web-part-deployment, rest-apis]
tools: [React, SharePoint, react-big-calendar, SharePoint Framework]
status: current
checked: "2026-11-06"
source_hash: "f095788807aa"
generated_by: gemma4:12b
---

**Summary.** I explain how to create and publish a SharePoint Web Part. I demonstrate the integration of a calendar component and the deployment process to a SharePoint tenant.

## What I did
- I added the react-big-calendar component to the solution.
- I updated the Calendar Component using React hooks.
- I navigated to a SharePoint site with a Calendar list.
- I created a .sppkg package using specific commands.
- I deployed the web part to the app catalog site.

## Claims
- I integrated the react-big-calendar library into the project.
  > "I added the react-big-calendar events calendar component to the SharePoint Web Part solution."
- I used React hooks to manage the state and effects of the component.
  > "I updated the Web Part's Calendar Component to include react-big-calendar, again using React's useEffect and useState hooks."
- I used a specific SharePoint site to find a valid Calendar list.
  > "The Local Workbench does not have a Calendar list, so I navigated to the workbench page on a SharePoint site that does (e.g. https://haddleyoffice365.sharepoint.com/sites/AllStaff/_layouts/15/workbench.aspx)."
- I generated the deployment package using a set of commands.
  > "I used these commands to create a .sppkg package:"
- I published the web part by moving the package to the app catalog.
  > "I deployed the web part by copying the .sppkg package to the SharePoint tenant's app catalog site."

## Outcome
I built a functional Calendar Web Part and published it to a SharePoint tenant.

## Caveats
The post does not show the specific command syntax used to create the package.
