---
type: concept
slug: business-central-development
title: "Business Central development"
description: "I explore advanced Business Central development by integrating AI models, Azure Functions, and external systems."
posts: [bcmcp1, bcmcp2, bcmcp3, bcmcp4, bcmcp5, bcmcp6, bcmcp7, businesscentralbusinessevents, azurefunctionsbc2, azurefunctionsbc]
status: current
checked: "2026-11-26"
source_hash: "b72253149900"
generated_by: gemma4:12b
---

**Summary.** I explore advanced Business Central development by integrating AI models, Azure Functions, and external systems. My posts demonstrate how to build robust integrations that ensure data integrity while enhancing functionality through automation and external services.

## The idea
- Integrate AI models using MCP servers to perform tasks like inventory lookups and order creation.
- Use specific tool configurations and plain text files to keep AI actions within safe and defined boundaries.
- Develop Azure Functions to handle capabilities like QR code generation that Business Central cannot perform alone.
- Implement safety mechanisms and human-in-the-loop processes to bridge the gap between AI drafts and final actions.
- Utilize the ExternalBusinessEvent attribute to notify external systems of real-time changes via the API.

## Claims
- A small, specific list of tools is more effective and manageable for an AI assistant than a large list.
  > "Ten tools you understand are better than four hundred you do not." — bcmcp1
- The AI can successfully identify stock levels and list prices for specific items.
  > "It found the item, read the stock (586) and the list price (192.80) and answered." — bcmcp2
- The AI can consult official documentation to understand actions before it processes any data.
  > "Microsoft runs a second MCP server for exactly this: **Microsoft Learn**." — bcmcp3
- The AI follows specific business rules and house rules before it interacts with Business Central.
  > "It followed this one: the question was asked, and the date is in a field I can see." — bcmcp4
- A human must review and approve a transaction before the system executes a web API call to post the order.
  > "That is on purpose, but a draft that nobody can post is only half a job." — bcmcp6
- The system blocks any order that fails a predefined rule.
  > "Any fail means the order is blocked." — bcmcp7
- The [ExternalBusinessEvent] attribute makes custom events available for external integration.
  > "This attribute marks a business event as available for external integration through the Business Central API." — businesscentralbusinessevents
- The extension handles both base64 and binary image formats for QR codes.
  > "✅ **Dual Format Support:** Handles both base64 and binary image responses" — azurefunctionsbc2
- Business Central cannot generate a QR code on its own.
  > "Business Central cannot draw a QR code by itself." — azurefunctionsbc

## What I concluded
Effective Business Central development combines innovative AI integration with robust safety protocols and external service connections. These methods ensure that automated processes remain accurate, secure, and aligned with specific business rules.
