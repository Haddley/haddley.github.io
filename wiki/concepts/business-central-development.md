---
type: concept
slug: business-central-development
title: "Business Central development"
description: "I explore advanced Business Central development by integrating AI models through the Model Context Protocol (MCP) to automate complex tasks."
posts: [bcmcp1, bcmcp2, bcmcp3, bcmcp4, bcmcp5, bcmcp6, bcmcp7, deepseekharnessaccounting, deepseekharnessbusinesscentral, businesscentralbusinessevents]
status: current
checked: "2026-11-26"
source_hash: "fe2b348940ee"
generated_by: gemma4:12b
---

**Summary.** I explore advanced Business Central development by integrating AI models through the Model Context Protocol (MCP) to automate complex tasks. I also demonstrate how to use specific attributes to trigger real-time notifications for external systems.

## The idea
- Use specific tool configurations to limit AI access and improve performance.
- Integrate Microsoft Learn documentation to help AI understand procedures.
- Implement human-in-the-loop workflows to safely bridge AI drafts and final actions.
- Utilize sandbox environments to test AI capabilities without risking production data.
- Leverage the ExternalBusinessEvent attribute for real-time external integrations.

## Claims
- A small, specific list of tools is more effective and manageable than providing the AI with every available option.
  > "Ten tools you understand are better than four hundred you do not." — bcmcp1
- A full configuration with 414 tools is inefficient and breaks the harness.
  > "The harness gave up on it, so the harness had no tools at all." — deepseekharnessbusinesscentral
- The AI can now access official documentation to understand specific actions.
  > "Microsoft runs a second MCP server for exactly this: **Microsoft Learn**." — bcmcp3
- The AI correctly identified the stock level and list price for a specific item.
  > "It found the item, read the stock (586) and the list price (192.80) and answered." — bcmcp2
- The tool ensures that a human must review and approve a transaction before the system executes a web API call to post the order.
  > "That is on purpose, but a draft that nobody can post is only half a job." — bcmcp6
- The system blocks any order that fails a predefined rule.
  > "Any fail means the order is blocked." — bcmcp7
- The [ExternalBusinessEvent] attribute makes custom events available for external integration.
  > "This attribute marks a business event as available for external integration through the Business Central API." — businesscentralbusinessevents
- The AI followed the rule and placed the correct date in the field.
  > "It followed this one: the question was asked, and the date is in a field I can see." — bcmcp4

## Where the posts differ
- The posts transition from discussing the inefficiency of large tool lists to implementing specific, restricted configurations for better AI performance.
  > "It took 148 seconds just to list them and about 390,000 tokens to describe them." — bcmcp1
  > "The harness gave up on it, so the harness had no tools at all." — deepseekharnessbusinesscentral

## What I concluded
Effective Business Central development involves creating controlled environments where AI can perform complex tasks under human supervision. Developers can also enhance system connectivity by using specific attributes to notify external applications of real-time changes.
