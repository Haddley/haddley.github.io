---
title: "Claude Code (Part 7)"
description: "MCP Servers"
date: "2026-01-26"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode7"
---

One limitation of AI coding assistants is that their training data has a cutoff — they may give outdated advice about library APIs that have changed since they were trained. [Context7](https://context7.com) is a [Model Context Protocol (MCP) server](mcpserver.html) that fetches real-time, version-specific documentation and injects it into Claude's context, helping to reduce errors from stale knowledge.

I set it up as a test using a React 17 → React 18 migration scenario.

## Generate an example React 17 application

I used Claude Code to generate a simple React 17 app using the old `ReactDOM.render()` API:

```prompt
generate a very simple React 17 example that uses ReactDOM.render() API.
```

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.47.42-PM.png)
*Claude generated a package.json targeting React 17*

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.49.11-PM.png)
*Claude generated index.js using the React 17 ReactDOM.render() API*

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.49.25-PM.png)
*The app ran at http://localhost:3000*

## Without Context7

I asked Claude to migrate the app to React 18 without the MCP server:

```prompt
How would you migrate this React 17 project to React 18?
```

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.51.59-PM.png)
*Claude analysed the project and described the migration steps*

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.52.26-PM.png)
*Claude correctly identified the need to replace ReactDOM.render() with createRoot()*

Claude already knew the correct migration path from its training data — no MCP server needed for this well-known API change.

## Adding Context7

I added the Context7 MCP server to Claude Code:

```text
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key <YOUR_CONTEXT7_API_KEY>
```

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-6.45.13-PM.png)
*I ran the command to add the Context7 MCP server*

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-6.45.57-PM.png)
*Context7 was saved to ~/.claude/settings.json*

## With Context7

I repeated the migration prompt, this time telling Claude to use Context7:

```prompt
How would you migrate this React 17 project to React 18? **use context7**
```

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.53.27-PM.png)
*I asked Claude to migrate the project using Context7 for documentation*

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.54.23-PM.png)
*Claude requested permission to query the Context7 MCP server*

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.55.28-PM.png)
*Claude fetched the React 18 migration docs from Context7*

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.57.16-PM.png)
*Claude presented its migration plan based on the live documentation*

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.58.59-PM.png)
*I approved the bash command to install the React 18 packages*

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.59.14-PM.png)
*The updated app ran at http://localhost:3000*

The key change Claude applied in both cases:

```text
Before:
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

After:
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

![](/assets/images/claudecode7/Screenshot-2026-01-26-at-5.59.54-PM.png)
*Migration complete — the app ran correctly on React 18*

For a well-known migration like React 17 → 18, Claude didn't need Context7 — the knowledge was already in its training data. Context7 becomes more valuable for newer, less-documented libraries or for keeping up with rapidly changing APIs where training data may be out of date.

## References

- [Claude Code Tutorial #7 - MCP Servers](https://www.youtube.com/watch?v=52KBhQqqHuc&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=7)

- [Context7 is the perfect example of a good MCP, but does it improve coding in RooCode?](https://www.youtube.com/watch?v=aGVgoh3b2ro)
