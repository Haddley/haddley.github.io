---
title: "Coding Agents That Never Leave: What Happens to the Roles?"
description: "If coding agents build and maintain solutions, what changes for business analysts, developers, testers, support technicians, platform engineers and auditors?"
date: "2026-10-18"
categories: ["AI","DevOps"]
image: "/assets/images/codingagentsroles/posts-meta.svg"
tags: "coding-agents, it-operations, segregation-of-duties, governance, job-roles"
hidden: false
slug: "codingagentsroles"
---

In [Coding Agents That Never Leave?](/posts/codingagentsthatstay/) I argued that coding agents may not just build solutions and hand them over: the agent that builds a solution can also maintain it. That post asked what low-code platforms such as Dataverse are worth in that world. This one asks a different question: what happens to the people?

Most of the debate about coding agents treats them like a project team. They build something, hand it over, and leave other teams to carry the obligations: permissions, audit trails, backup, retention, upgrade paths, and integration with other solutions and systems. In a large business those obligations land on the cloud and platform engineers, the security and identity team, the database administrators, the Microsoft 365 and Power Platform administrators, and the business owner of the app.

Large businesses still have business analysts and project managers, developers and testers, and operations staff, although in a cloud world many of those titles have changed. Here is my guess at how agents that build and run would change each of them. It is a guess, not a finding, and the honest answer for most roles is "less doing, more deciding and checking".

| Role today | What it does now | If agents build and run |
|---|---|---|
| Business analyst, product owner or product manager | Works out what the business needs, and writes it down: requirements, business cases, business plans | An agent can draft much of the writing. Deciding what the business actually needs matters more, not less: an agent builds whatever it is asked for, so asking for the right thing, and confirming it was delivered, becomes the job |
| Project manager, delivery manager or scrum master | Writes the project proposal and plan, tracks the work and manages the risks | An agent can draft the proposal and the plan, and keep the plan up to date. Less tracking of tasks, more deciding what an agent may change, and when, and coordinating the people who have to approve it |
| Developer, or Power Platform maker | Designs and writes the solution | Directs agents, reviews their work, and handles what they get wrong. Fewer people may write code by hand; more will read it |
| Tester, QA engineer or quality engineer | Checks that the solution works | Defines what "working" means, and builds the checks that agents run against every change |
| Service desk or support technician | Takes the call, raises a ticket, and passes most fixes on to another team | Fixes more directly, with an agent, for the kinds of change that are approved in advance. The ticket does not disappear: the agent writes it, recording what changed and why. Anything outside the agreed limits still goes to someone else to approve |
| Cloud engineer, platform engineer or site reliability engineer (what operations staff and system administrators have mostly become) | Runs the infrastructure and keeps services up | Runs the services the common rules depend on: identity, audit logs and the inventory, and the checks that every app follows the rules. This is where much of the old operations work moves |
| Database administrator | Looks after databases, backups and performance | Fewer hands-on tasks, more setting the rules that agents follow, and checking that restores actually work |
| Security, and identity and access management | Decides who can do what, and watches for trouble | Decides what agents themselves may do, and holds the keys they must not have |
| Microsoft 365 and Power Platform administrators, and the Center of Excellence | Run the tenant, environments and data policies, and set the rules for makers | Set the rules for agents as well as makers, and decide where Dataverse and SharePoint add enough to be worth using |
| Data owner or data steward | Decides who may see the data, and how long it is kept | Unchanged in principle, but asked far more often, by agents |
| Internal audit, risk and compliance | Checks that the controls were followed | Asks for evidence that the common rules were followed, including evidence of what the agents did |

If this is right, the pattern is that most roles move toward deciding and checking, and the common rules are what both are measured against.

:::no-dumb-questions
**Q: Will a support technician be able to fix a bug directly, with an agent, without raising a ticket?**

A: Technically, probably yes. Whether they should depends on what the ticket was for. A ticket is a record of what happened, and often it is also the approval. So my guess is: yes, for kinds of fix that are approved in advance, but the ticket does not disappear. The agent writes it, and anything outside the agreed limits still goes to someone else to approve.

**Q: Do business analysts and project managers still have a job?**

A: I think so, but with less writing. Coding agents are already good at drafting business plans, business cases and project proposals, not just code, which is one more sign that "coding agent" undersells what they are. What an agent cannot do is decide which proposal the business should back, or own the assumptions inside it. An agent builds exactly what it is asked for, so working out what to ask for, and checking that it was delivered, becomes the hard part.
:::

:::watch-it An agent that builds and runs can break segregation of duties
Some role divisions are there on purpose. Segregation of duties says the person who builds a change should not be the one who approves it, deploys it to production, or grants themselves access, and audit frameworks in regulated and listed companies expect that separation. An agent that builds and runs a solution collapses it. The likely answer is not to drop the rule, but to split the work: one agent builds, a different agent or a person approves, and the audit log records who did what.
:::

None of this has happened yet, and some of it may not. Organisations may decide that agents should advise rather than act, and regulators may agree. But if agents do stay to look after what they build, the people around them will spend less of their time doing the work, and more of it deciding what the work should be and checking that it was done.

:::bullet-points In short
- Today, the obligations of a finished app are spread across several teams.
- If agents build and maintain, most roles move toward deciding and checking.
- Analysts may matter more, developers review more than they write, testers write the checks, and platform engineers run the services the common rules depend on.
- Support technicians may fix more problems directly, but the agent writes the ticket.
- Segregation of duties still applies: one agent builds, and someone else approves.
:::

## References

- [Coding Agents That Never Leave?](/posts/codingagentsthatstay/), the post this one follows
- [Claude Code (Part 16): Microsoft's Dataverse plugin](/posts/claudecode16/)
