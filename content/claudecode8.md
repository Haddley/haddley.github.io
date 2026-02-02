---
title: "Claude Code (Part 8)"
description: "Vibe Coding"
date: "2026-02-01"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode8"
---

## User

```prompt
I would like to create a web page LISP Interpreter. Do you have any questions?
```

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 4.53.54 PM.png)
*I would like to create a web page LISP Interpreter. Do you have any questions?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 4.54.55 PM.png)
*Scheme-like?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 4.56.06 PM.png)
*Notebook style?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 4.56.27 PM.png)
*Vanilla HTML/CSS/JS?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 4.56.53 PM.png)
*Standard library?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 4.57.35 PM.png)
*Allow grep?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 4.58.02 PM.png)
*Scheme LISP interpreter JavaScript implementation archtecture 2025?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 4.59.01 PM.png)
*Allow fetching this url?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.02.15 PM.png)
*https://www.chidiwilliams.com/posts/how-to-write-a-lisp-interpreter-in-javascript*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.02.33 PM.png)
*A quick introduction to Scheme*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.02.48 PM.png)
*The basic architecture of the interpreter*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.05.00 PM.png)
*Claude's Plan*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.05.38 PM.png)
*Interpreter Architecture*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.06.02 PM.png)
*Implemenation Order*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.06.17 PM.png)
*Verification Plan*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.06.50 PM.png)
*mkdir?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.14.17 PM.png)
*Open index.html*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.15.10 PM.png)
*Open with Live Server*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.15.48 PM.png)
*LISP Notebook*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.16.18 PM.png)
*Run*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.17.48 PM.png)
*Created factorial example*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.18.41 PM.png)
*Tested error handling*

## User

```prompt
How can we add unit tests and integration tests?
```

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.23.18 PM.png)
*Allow this bash command?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.28.30 PM.png)
*Modify source files?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.28.51 PM.png)
*Full coverage?*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.37.16 PM.png)
*Yes, and auto-accept*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 5.37.54 PM.png)
*Edit types.js*


![](/assets/images/claudecode8/Screenshot 2026-02-01 at 9.01.42 PM.png)
*continue*

![](/assets/images/claudecode8/Screenshot 2026-02-01 at 9.08.54 PM.png)
*npm test*



![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.27.30 AM.png)
*test commands*

## User

```prompt
/init
```

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.44.24 AM.png)
*/init*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.49.45 AM.png)
*Commit CLAUDE.md*


## User

```prompt
How do I ensure that this code is deployed to Azure everytine it is pushed to github (assuming that the tests pass)?
```


![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.51.38 AM.png)
*How do I ensure that this code is deployed to Azure*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.52.17 AM.png)
*Option 1: Azure Static Web Apps (Recommended)*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.58.59 AM.png)
*mkdir .github/workflows*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.59.20 AM.png)
*azure-static-web-apps.yml (replaced later)*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 4.00.10 AM.png)
*next steps*


![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.27.46 PM.png)
*portal.azure.com Create a resource*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.28.27 PM.png)
*Static Web App*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.29.14 PM.png)
*Create a new Resource Group*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.33.30 PM.png)
*Free plan. Source GitHub*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.33.42 PM.png)
*Build Details*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.34.19 PM.png)
*Create*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.35.00 PM.png)
*Your deployment is complete*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.35.19 PM.png)
*Open Link in New Tab*

[Azure Hosted App](https://wonderful-grass-039e46710.1.azurestaticapps.net)

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.35.52 PM.png)
*Congratulations on your new site!*



![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.51.15 PM.png)
*GitHub Action*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 2.59.10 PM.png)
*Azure Secret added to GitHub repository*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.01.19 PM.png)
*Header Text color --accent*

# User

```prompt
update --accent and --accent-hover colors to be brighter
```


![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.04.38 PM.png)
*css updated. change pushed*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.05.41 PM.png)
*GitHub Action. Tests passes. App Deployed*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.06.17 PM.png)
*Deploy Job successfuk*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.07.08 PM.png)
*--accent color updated*

![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.07.35 PM.png)
*App running*

[Azure Hosted App](https://wonderful-grass-039e46710.1.azurestaticapps.net)


## References

- [Vibe Coding 101 with Replit](https://www.deeplearning.ai/short-courses/vibe-coding-101-with-replit)