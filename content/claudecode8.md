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

AI isn't just a helper for me—it’s a core part of my development toolkit. By using tools like Claude Code and ChatGPT to write, debug, and understand code in **Python, JavaScript, C#, Business Central AL, and C++**, I’ve turned AI into a versatile collaborator across every language I work with.


One way to think about it is as a pair programmer — a virtual coding partner that never tires. This isn't about automating the developer away; it's about augmenting their capabilities.

## Building a LISP Notebook

To demonstrate this, I built a Scheme-like LISP interpreter with a Jupyter-style notebook UI, entirely in vanilla HTML/CSS/JS with no dependencies — guided by Claude Code from first prompt to deployed app.

### Planning the build

I started by asking Claude what it needed to know:

```prompt
I would like to create a web page LISP Interpreter. Do you have any questions?
```

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-4.53.54-PM.png)
*I described the project and asked Claude if it had questions*

Claude asked a series of clarifying questions to nail down the design:

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-4.54.55-PM.png)
*Claude asked whether to use a Scheme-like dialect*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-4.56.06-PM.png)
*Claude asked whether to use a notebook-style UI*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-4.56.27-PM.png)
*Claude asked whether to use vanilla HTML/CSS/JS with no frameworks*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-4.56.53-PM.png)
*Claude asked which standard library functions to include*

With the requirements settled, Claude researched the best approach:

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-4.57.35-PM.png)
*Claude asked permission to search for reference implementations*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-4.58.02-PM.png)
*Claude searched for LISP interpreter architecture examples*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-4.59.01-PM.png)
*Claude asked permission to fetch a reference article*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.02.15-PM.png)
*Claude fetched the reference article on writing a LISP interpreter in JavaScript*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.02.33-PM.png)
*Claude read the introduction to Scheme from the article*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.02.48-PM.png)
*Claude absorbed the basic interpreter architecture*

Claude then drafted a full implementation plan:

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.05.00-PM.png)
*Claude presented its plan*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.05.38-PM.png)
*Claude outlined the interpreter architecture — tokeniser, parser, evaluator, environment*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.06.02-PM.png)
*Claude set out the implementation order*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.06.17-PM.png)
*Claude defined a verification plan for each component*

### Building and running

Claude created the project structure and I opened it with Live Server:

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.06.50-PM.png)
*Claude asked permission to create the project directories*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.14.17-PM.png)
*I opened index.html in VS Code*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.15.10-PM.png)
*I launched the app with Live Server*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.15.48-PM.png)
*The LISP Notebook was running in the browser*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.16.18-PM.png)
*I ran the first expression in the notebook*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.17.48-PM.png)
*I created a factorial function and it evaluated correctly*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.18.41-PM.png)
*I tested error handling — the interpreter returned a meaningful error message*

## Adding tests

```prompt
How can we add unit tests and integration tests?
```

Claude proposed using Jest and began setting up the test suite:

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.23.18-PM.png)
*Claude asked permission to run the npm install command for Jest*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.28.30-PM.png)
*Claude asked permission to modify the source files to make them testable*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.28.51-PM.png)
*Claude planned full coverage across the tokeniser, parser, and evaluator*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.37.16-PM.png)
*I approved with auto-accept so Claude could write all the test files*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-5.37.54-PM.png)
*Claude edited types.js to export the types needed for testing*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-9.01.42-PM.png)
*I asked Claude to continue*

![](/assets/images/claudecode8/Screenshot-2026-02-01-at-9.08.54-PM.png)
*Claude ran npm test*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.27.30-AM.png)
*All tests passed*

## Initialising CLAUDE.md

```prompt
/init
```

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.44.24-AM.png)
*I ran /init to generate a CLAUDE.md for the project*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.49.45-AM.png)
*Claude committed CLAUDE.md to the repository*

## Deploying to Azure

```prompt
How do I ensure that this code is deployed to Azure everytime it is pushed to github (assuming that the tests pass)?
```

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.51.38-AM.png)
*I asked Claude how to set up CI/CD to Azure*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.52.17-AM.png)
*Claude recommended Azure Static Web Apps as the simplest option*

Claude created the GitHub Actions workflow:

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.58.59-AM.png)
*Claude created the .github/workflows directory*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.59.20-AM.png)
*Claude created the azure-static-web-apps.yml workflow file*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-4.00.10-AM.png)
*Claude outlined the remaining manual steps in the Azure portal*

I created the Static Web App resource in the Azure portal:

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.27.46-PM.png)
*I navigated to portal.azure.com and created a new resource*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.28.27-PM.png)
*I selected Static Web App*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.29.14-PM.png)
*I created a new Resource Group for the app*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.33.30-PM.png)
*I selected the Free plan and linked it to the GitHub repository*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.33.42-PM.png)
*I configured the build details*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.34.19-PM.png)
*I clicked Create*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.35.00-PM.png)
*Deployment complete*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.35.19-PM.png)
*I opened the app link*

[Azure Hosted App](https://wonderful-grass-039e46710.1.azurestaticapps.net)

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.35.52-PM.png)
*The app was live on Azure Static Web Apps*

I connected the Azure deployment token to GitHub Actions:

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.51.15-PM.png)
*The GitHub Action was running*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-2.59.10-PM.png)
*I added the Azure deployment secret to the GitHub repository settings*

## Making a change end-to-end

To verify the full pipeline, I asked Claude to update the accent colours:

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.01.19-PM.png)
*I identified the CSS accent colour variable to update*

```prompt
update --accent and --accent-hover colors to be brighter
```

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.04.38-PM.png)
*Claude updated the CSS and pushed the change*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.05.41-PM.png)
*The GitHub Action triggered — tests passed and the app deployed*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.06.17-PM.png)
*The deploy job completed successfully*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.07.08-PM.png)
*The updated accent colour was visible in the app*

![](/assets/images/claudecode8/Screenshot-2026-02-02-at-3.07.35-PM.png)
*The full app running on Azure with the new colour scheme*

[Azure Hosted App](https://wonderful-grass-039e46710.1.azurestaticapps.net)

## References

- [Vibe Coding Fundamentals In 33 minutes](https://www.youtube.com/watch?v=iLCDSY2XX7E)

- [Vibe Coding 101 with Replit](https://www.deeplearning.ai/short-courses/vibe-coding-101-with-replit)

- [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0)

- [How Replacing Developers With AI is Going Horribly Wrong](https://www.youtube.com/watch?v=ts0nH_pSAdM)
