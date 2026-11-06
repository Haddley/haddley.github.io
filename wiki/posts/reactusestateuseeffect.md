---
type: post
slug: reactusestateuseeffect
title: "React useState and useEffect"
date: "2021-02-08"
builds_on: []
topics: [react-hooks, state-management, side-effects, api-fetching]
tools: [React, useState, useEffect, useContext, useReducer]
status: current
checked: "2026-11-06"
source_hash: "dacdd4f2db15"
generated_by: gemma4:12b
---

**Summary.** I explain how to manage state and side effects in React functional components. I demonstrate how to use the useState and useEffect hooks to fetch data from an API.

## What I did
- I used React Hooks to manage state and side effects.
- I implemented useState to track component values.
- I used useEffect to handle lifecycle events and data fetching.
- I integrated these hooks to call an API from a functional component.

## Claims
- I used React Hooks to manage state and side effects in React function components.
  > "I used React Hooks to manage state and side effects in React function components."
- The useState hook manages component state for values like checked status or API data.
  > "**useState** — manages component state, useful for tracking values like checked/unchecked or data fetched from an API."
- The useEffect hook replaces several lifecycle methods.
  > "**useEffect** — replaces componentDidMount, componentDidUpdate, and componentWillUnmount."
- I used the hook to fetch data before the component renders.
  > "I used it to fetch data before rendering."
- The useContext hook allows for global state access without manual prop passing.
  > "**useContext** — makes global state accessible to any component without passing props down manually."
- The useReducer hook is a preferred alternative to useState for complex state logic.
  > "**useReducer** — preferable to useState for complex state logic; provides an alternative to Redux."

## Outcome
I built a React application that fetches data from an API using the useState and useEffect hooks.

## Caveats
The post does not provide a detailed comparison of Redux versus useReducer.
