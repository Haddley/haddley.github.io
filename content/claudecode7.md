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

The Challenge

You need to migrate a React application from version 17 to 18, but you're unsure about breaking changes and new patterns.


```text
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key 
```

Traditional Approach (Without Context7)

```prompt
How would you migrate this React 17 project to React 18?
```

Context7-Powered Approach

```prompt
/init
```

```prompt
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key ctx7sk-f99eabb8-852c-4d68-8f77-a61713eb204d
```

```prompt
How would you migrate this React 17 project to React 18? **use context7**
```



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



![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.47.42 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.49.11 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.49.25 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.51.59 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.52.26 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.53.27 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.54.23 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.55.28 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.57.16 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.58.59 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.59.14 PM.png)
**

![](/assets/images/claudecode7/Screenshot 2026-01-26 at 5.59.54 PM.png)
**


![](/assets/images/claudecode6/Screenshot 2026-01-21 at 6.43.28 PM.png)
*All 11 tests pass*



## References

- [Claude Code Tutorial #7 - MCP Servers](https://www.youtube.com/watch?v=52KBhQqqHuc&list=PL4cUxeGkcC9g4YJeBqChhFJwKQ9TRiivY&index=7)

- [Context7 is the perfect example of a good MCP, but does it improve coding in RooCode?](https://www.youtube.com/watch?v=aGVgoh3b2ro)