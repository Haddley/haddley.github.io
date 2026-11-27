---
type: post
slug: fabriclakehouse6
title: "Microsoft Fabric (Part 6)"
date: "2026-11-28"
part: 6
builds_on: ["fabriclakehouse5", "fabriclakehouse4", "deepseekharnessollama", "deepseekharness"]
topics: ["microsoft-fabric", "data-agents", "sql-ambiguity", "identity-management", "mcp-servers"]
tools: ["Microsoft Fabric", "DeepSeek Harness", "sqlcmd", "Azure CLI", "Python", "Model Context Protocol"]
status: current
checked: "2026-11-27"
source_hash: "df19390c0856"
generated_by: gemma4:12b
---

**Summary.** I rebuilt for DeepSeek Harness what one person needs from a Fabric data agent: example queries, running as the asker, and a callable endpoint. I also showed with a second user that database permissions set the boundary, found that the tutorial's own example SQL is ambiguous, and found that the harness can read other sign-ins on my laptop.

## What I did
- I rebuilt the requirements for a single user including example queries, a specific identity, and a callable endpoint.
- I created an examples.md file from the tutorial's example queries, and stated a tie-break for the ambiguous one.
- I implemented a web service and an MCP server to allow other tools to call the harness.
- I tested the security boundaries of the harness by attempting to access different files and identities.
- I differentiated between the features I built for an individual and the controls an organization requires.

## Claims
- The tutorial's example SQL is ambiguous because many customers have multiple order lines on their first date.
  > "The tutorial's own repeat-purchase example is ambiguous: it gives different answers depending on how it is run, and many customers tie on their first order date."
- Adding a tie-break to the order by clause makes the results reproducible.
  > "Once I stated the assumption, by adding `SalesOrderNumber, SalesOrderLineNumber` to the `ORDER BY`, both forms gave −51.48%."
- The harness can access other sign-ins if it is allowed to run commands.
  > "A harness that can run commands can also read your other sign-ins."
- The database limit only holds against the specific identity that the tool uses.
  > "So the database limit only holds against the identity that the tool uses."
- I used a service principal to simulate a limited user for testing.
  > "I used a temporary service principal, `fabric-harness-demo-temp`, added to the workspace as a Viewer."
- The web service I wrote uses only the standard library.
  > "It uses only the standard library:"

## Outcome
I built a local web service and an MCP server that let another tool call the harness, and I showed that database permissions decide what each user can read. I did not build the controls that an organisation needs around an agent.

## Caveats
I did not build or test the specific controls that an organization needs to manage a multi-user environment.
