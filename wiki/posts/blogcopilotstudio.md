---
type: post
slug: blogcopilotstudio
title: "Blog Copilot Studio"
date: "2024-03-24"
builds_on: []
topics: [business-central-extensions, copilot-studio, token-endpoints, authentication-methods]
tools: [Business Central, Copilot Studio, AL Language]
status: current
checked: "2026-11-05"
source_hash: "fca4326447a2"
generated_by: gemma4:12b
---

**Summary.** I built a Business Central extension that allows users to query my blog content through a Copilot Studio chatbot. I demonstrated how to connect a custom page to a Copilot using a Token Endpoint and specific authentication settings.

## What I did
- Created a Copilot in Copilot Studio with public blog content.
- Configured the Copilot to use No authentication for public access.
- Developed a Business Central extension to host the chat page.
- Linked the extension to the Copilot using the Token Endpoint.
- Verified that the Copilot answers questions based on the blog posts.

## Claims
- The extension provides a page where users can chat with the Copilot via the Token Endpoint.
  > "A Business Central extension gives users a page that chats with it, through the Token Endpoint."
- I chose No authentication because the blog content is public.
  > "A: The Copilot only answers questions about the content of this public blog, so I did not need to sign anyone in."
- The Token Endpoint is the address the extension uses to reach the Copilot.
  > "A: The address that the Business Central extension uses to reach the published Copilot."
- No authentication is not suitable for Copilots that access private or company data.
  > "That is acceptable when it only draws on public blog posts, but do not choose it for a Copilot that can see private or company data."
- The Copilot can answer questions based on the content of the blog.
  > "A Copilot Studio Copilot can answer questions from the content of this blog."

## Outcome
I built a Business Central extension that enables users to interact with blog content through a Copilot Studio chatbot.

## Caveats
The use of No authentication is only appropriate for public content and should not be used for private data.
