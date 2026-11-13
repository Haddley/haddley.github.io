---
type: post
slug: claudecode13
title: "Claude Code (Part 13)"
date: "2026-06-03"
part: 13
builds_on: []
topics: [power-platform, dataverse-xml, claude-code-skills, solution-management]
tools: [Claude Code, Power Platform, Dataverse, Python, Power Platform CLI (pac)]
status: current
checked: "2026-11-05"
source_hash: "a45e65232738"
generated_by: gemma4:12b
---

**Summary.** I built a Claude Code skill called dv-generate to automate the creation of Dataverse solution XML for Power Platform. I tested the skill against numerous scenarios to determine how it handles complex operations like updates, deletions, and synchronization between environments.

## What I did
- I built and installed the dv-generate skill for Claude Code.
- I used the skill to generate unmanaged solutions and then exported them as managed solutions for deployment.
- I ran 16 different change scenarios to test the capabilities and limitations of the tool.
- I developed a Python script to compare local XML files against the actual state of the development environment.

## Claims
- The skill generates unmanaged solutions because the platform only supports hand-editing unmanaged files.
  > "Microsoft also only supports hand-editing the customizations file of an unmanaged export."
- The skill does not support removing components because removal behavior is inconsistent in Dataverse.
  > "That is deliberate, because removal behaved differently every time I tried it:"
- The tool successfully handles adding columns, tables, and environment variables.
  > "**It works for:** adding a column, a choice option, a table, an environment variable or a connection reference, and changing a column label or an environment variable default."
- The pull script identifies differences between the local XML and the development environment.
  > "`pull.py` exports the unmanaged solution from dev and reports what differs from your saved XML, in both directions:"
- The script can automatically update the local XML to match the platform's version.
  > "With `--apply` it replaces your saved XML with dev's export, which is the platform's XML rather than the skill's templates, so review it with `git diff`."
- The skill provides the necessary templates and rules for Claude to generate valid XML.
  > "The skill is mostly knowledge: templates, rules, and gotchas that Claude needs to generate valid Dataverse XML."

## Outcome
I built a functional skill that automates the generation of Dataverse solutions while identifying specific boundaries where manual intervention is still required.

## Caveats
The skill does not support changing a column's type or automatically removing components from the XML.
