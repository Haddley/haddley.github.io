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

Using [Context7](https://context7.com) with Claude Code might solve problems of outdated information in the AI coding assistant left over from training. After the Context7 [model context protocol server](mcpserver.html) is added to Claude Code the agent fetches real-time, version-specific library documentation for Claude,  helping to reduce errors?


## Generate an example React 17 application

I used Claude Sonnet 4.5 and GitHub Copilot to generate an example React 17 application

```prompt
generate a very simple React 17 example that uses ReactDOM.render() API.
```

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.47.42 PM.png)
*package.json*

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.49.11 PM.png)
*index.js*

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.49.25 PM.png)
*http://localhost:3000*

## Without Context7

```prompt
How would you migrate this React 17 project to React 18?
```

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.51.59 PM.png)
*I'll help you migrate this React 17 project to React 18...*

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.52.26 PM.png)
*Use createRoot() instead of ReactDOM.render()*

Without the Context7 model context protocol server Claude Code was able to identify the need to use createRoot() instead of ReactDOM.render().

As a test I added the [Context7](https://context7.com) [model context protocol server](mcpserver.html)

```text
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key ctx7sk-f99eabb8-852c-4d68-8f77-a61713eb204d
```

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 6.45.13 PM.png)
*claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key ctx7sk-f99eabb8-852c-4d68-8f77-a61713eb204d*

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 6.45.57 PM.png)
*/Users/neilhaddley/.claude/settings.json*

## With Context7

```prompt
How would you migrate this React 17 project to React 18? **use context7**
```

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.53.27 PM.png)
*How would you migrate this React 17 project to React 18? **use context7***

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.54.23 PM.png)
*Do you want to proceed with mcp_context7_...*

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.55.28 PM.png)
*Do you want to proceed with mcp_context7_query-docs...*

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.57.16 PM.png)
*Accept this plan?*

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.58.59 PM.png)
*Allow this bash command?*

With Context7's help Claude Code was again able to identify the need to use createRoot() instead of ReactDOM.render().

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.59.14 PM.png)
*http://localhost:3000 (updated)*


```text
Replace the deprecated ReactDOM.render() with the new createRoot() API:

Before:


import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
After:


import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.59.54 PM.png)
*Migration complete*

## References

- [Claude Code Tutorial #7 - MCP Servers](https://www.youtube.com/watch?v=52KBhQqqHuc&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=7)

- [Context7 is the perfect example of a good MCP, but does it improve coding in RooCode?](https://www.youtube.com/watch?v=aGVgoh3b2ro)