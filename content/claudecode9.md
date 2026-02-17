---
title: "Claude Code (Part 8)"
description: "Python FastAPI"
date: "2026-02-01"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "ai"
hidden: false
slug: "claudecode9"
---

# Technical Agility & Rapid Development

I utilize a comprehensive understanding of software frameworks and development principles to build solutions efficiently. Claude Code acts as my catalyst, accelerating this process across diverse domains.

- Adaptability: Quickly pivot between different technology stacks, such as React Native for mobile development and PowerShell for infrastructure scripting.
- Speed: Translate high-level requirements into production-ready code at an accelerated pace.
- Precision: Select and implement the optimal tools for each unique challenge.
Demonstration: Creating a scalable Python API with FastAPI.


## User

```prompt
Create a FastAPI Python application secured with Microsoft Entra ID (Azure AD) so only members of my organization can access it. Deploy to Azure Container Apps using Azure CLI scripts.
Requirements:
Auth: Validate JWT tokens using PyJWT against Microsoft's JWKS endpoint. Accept both v1.0 and v2.0 Azure AD tokens (different issuers and audiences). Check signature, expiration, audience, issuer, and tenant ID. Support role-based access control via app roles.
Project structure: Full starter template with routers, Pydantic models, pydantic-settings config, CORS, structured logging (structlog), global error handling middleware, and pytest tests that bypass auth via dependency_overrides.
Deployment: Azure CLI shell scripts for creating infrastructure (Container Apps environment), deploying (using az containerapp up --source . with a Dockerfile), configuring env vars, and teardown.
Config: Derive all Azure AD URLs from just tenant ID. Required env vars: AZURE_AD_TENANT_ID, AZURE_AD_CLIENT_ID. Optional: AZURE_AD_APP_ID_URI for v1.0 token audience.
```







![](/assets/images/claudecode8/Screenshot 2026-02-02 at 3.07.35 PM.png)
*App running*

[Azure Hosted App](https://wonderful-grass-039e46710.1.azurestaticapps.net)


## References

- [Vibe Coding Fundamentals In 33 minutes](https://www.youtube.com/watch?v=iLCDSY2XX7E)

- [Vibe Coding 101 with Replit](https://www.deeplearning.ai/short-courses/vibe-coding-101-with-replit)

- [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0)

- [How Replacing Developers With AI is Going Horribly Wrong](https://www.youtube.com/watch?v=ts0nH_pSAdM)
