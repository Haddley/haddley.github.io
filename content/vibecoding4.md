---
title: "Vibe Coding (Part 4)"
description: "Deploying to Docker"
date: "2026-01-30"
categories: ["AI"]
image: "/assets/images/chatgpt-logo.svg"
tags: "ai"
hidden: true
slug: "vibecoding4"
---

## User

```markdown
How do I ensure that this code is deployed to Azure every time it is pushed to github (assuming that the tests pass)?
```

## Agent

```markdown
To deploy to Azure App Service after tests pass, you need:

Modify main.py:203-204 - Use PORT environment variable instead of hardcoded 8080
Create Dockerfile - Container deployment is recommended due to heavy ML dependencies (torch, fastai)
Create .github/workflows/deploy-azure.yml - Workflow with test job followed by deploy job using needs: test
Set up Azure resources - Container Registry + App Service
Add GitHub secrets - AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_SUBSCRIPTION_ID
```

![](/assets/images/vibecoding4/Screenshot 2026-01-30 at 11.10.42 AM.png)
*docker build -t ai-colorizer .*

![](/assets/images/vibecoding4/Screenshot 2026-01-30 at 11.12.01 AM.png)
*docker run -d -p 8080:8080 ai-colorizer*

![](/assets/images/vibecoding4/Screenshot 2026-01-30 at 11.12.24 AM.png)
*docker desktop Images*

![](/assets/images/vibecoding4/Screenshot 2026-01-30 at 11.12.32 AM.png)
*docker desktop Containers*

![](/assets/images/vibecoding4/Screenshot 2026-01-30 at 11.12.47 AM.png)
*container log*

![](/assets/images/vibecoding4/Screenshot 2026-01-30 at 11.13.29 AM.png)
*http://127.0.0.1:8080/*

## References

- [Vibe Coding Fundamentals In 33 minutes](https://www.youtube.com/watch?v=iLCDSY2XX7E)