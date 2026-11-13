---
type: post
slug: sharepointwebpart1
title: "SharePoint Web Part (Part 1)"
date: "2021-02-11"
part: 1
builds_on: [reactusestateuseeffect]
topics: [sharepoint-framework, react-components, state-management, typescript-development]
tools: [SharePoint Framework, Microsoft Teams, Microsoft Outlook, TypeScript, React, Yeoman]
status: current
checked: "2026-11-06"
source_hash: "4b58c9e850ce"
generated_by: gemma4:12b
---

**Summary.** I explain how to create and publish a SharePoint web part using the SharePoint Framework. I demonstrate how to integrate React components and manage state within the framework.

## What I did
- I used the SharePoint Framework to build a web part.
- I used Yeoman to generate a React component.
- I integrated the CalendarWebPart class with a React component.
- I refactored the React component into a function component.
- I explored state management using React hooks.

## Claims
- The SharePoint Framework supports multiple Microsoft platforms.
  > "I used the SharePoint Framework (SPFx) to build a web part for Microsoft SharePoint, Microsoft Teams, and Microsoft Outlook."
- The SharePoint Framework relies on TypeScript and front-end libraries.
  > "The SharePoint Framework is a page and web part model for client-side development that depends on TypeScript and front-end libraries such as React."
- The local workbench displays web parts during development.
  > "When I ran gulp serve, the web parts were available in the local workbench."
- Function components make the code easier to read.
  > "I reimplemented the Calendar React component as a function component, which made the code easier to read."
- React hooks can manage state for the component.
  > "If the Calendar component needs to maintain state, I can use React useState and useEffect hooks."

## Outcome
I built a functional SharePoint web part that integrates a React component. I also demonstrated how to simplify code by using function components.

## Caveats
The post does not cover the specific configuration of the local workbench environment.
