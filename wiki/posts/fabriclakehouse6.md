---
type: post
slug: fabriclakehouse6
title: "Microsoft Fabric (Part 6)"
date: "2026-11-28"
part: 6
builds_on: ["fabriclakehouse5", "fabriclakehouse4", "deepseekharnessollama", "deepseekharness"]
topics: ["fabric-data-agents", "identity-management", "sql-ambiguity", "service-principals", "mcp-servers"]
tools: ["Microsoft Fabric", "DeepSeek Harness", "sqlcmd", "Azure CLI", "Python", "Model Context Protocol"]
status: current
checked: "2026-11-27"
source_hash: "7cc5f919b402"
generated_by: gemma4:12b
---

**Summary.** I rebuilt for DeepSeek Harness what one person needs from a Fabric data agent: example queries, running as the asker, and a callable endpoint. I also showed with a second user that database permissions set the boundary, and found that the tutorial's own example SQL is ambiguous.

## What I did
- I rebuilt the core requirements for a single user: example queries, identity-based execution, and a callable endpoint.
- I created an example file to provide clear instructions and tie-break ambiguous SQL results.
- I implemented a web service and an MCP server to allow other tools to call the harness.
- I tested the security boundaries of the system using a service principal and a separate identity.
- I found that the tutorial's repeat-purchase example is ambiguous, and stated a tie-break.

## Claims
- The original tutorial SQL is ambiguous because it does not specify how to handle multiple records on the same date.
  > "The tutorial's own repeat-purchase example is ambiguous: it gives different answers depending on how it is run, and many customers tie on their first order date."
- Adding a tie-break to the order by clause makes the results reproducible.
  > "Once I stated the assumption, by adding `SalesOrderNumber, SalesOrderLineNumber` to the `ORDER BY`, both forms gave −51.48%."
- The tool behaves as the person who asks because it uses the credentials of the runner.
  > "The tool already works that way, because `sqlcmd` signs in with the Azure CLI account of whoever runs it."
- A service principal allows the tool to run with a specific set of permissions.
  > "I used a temporary service principal, `fabric-harness-demo-temp`, added to the workspace as a Viewer."
- The database limit only holds against the specific identity that the tool uses.
  > "So the database limit only holds against the identity that the tool uses."
- The harness can read other sign-ins if it has the ability to run commands.
  > "A harness that can run commands can also read your other sign-ins."

## Outcome
I built a local web service and an MCP server that let another tool call the harness, and I showed that database permissions decide what each user can read. I did not build the controls that an organisation needs around an agent.

## Caveats
I did not build or test the organizational controls such as auditing, policy overrides, or managed data boundaries.
