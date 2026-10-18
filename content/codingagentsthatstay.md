---
title: "Coding Agents That Never Leave?"
description: "If coding agents maintain solutions as well as create them, what are low-code platforms such as Dataverse worth?"
date: "2026-10-18"
categories: ["Power Platform","AI","Microsoft 365","DevOps"]
image: "/assets/images/codingagentsthatstay/posts-meta.svg"
tags: "dataverse, sharepoint, governance, vibe-coding, coding-agents, low-code"
hidden: false
slug: "codingagentsthatstay"
---

DevOps spent years arguing that whoever builds a system should also run it. I think coding agents may finally settle that argument: the agent that builds a solution can also look after it. And it will not just be developers using them. Business analysts, testers, support technicians, platform engineers, administrators and auditors will probably each use agents for their own part of the work.

I can see no reason why a coding agent could not help to maintain a solution just as easily as it creates a new one. If anything, coding agents may be even more impressive in that role. Much of maintenance is repetitive and rule-based, and a lot of it is reading what is already there and checking it against what should be there. In principle, an agent can review permissions on a schedule, check that backups ran and can actually be restored, apply platform upgrades and test them, keep integrations and a CI/CD pipeline working, and flag the app that nobody has touched in a year.

I have spent a few days over the last few months trying to make coding agents work with Dataverse, and I have already seen a small version of this. In [Claude Code (Part 16)](/posts/claudecode16/), Microsoft's Dataverse plugin turned on auditing, set an audit retention period, and checked and assigned security roles. None of that was construction. It was exactly the kind of work that gets forgotten after an app is built.

If coding agents never leave, one question matters more than the rest for anyone who has bet on a low-code platform: what are platforms such as Dataverse worth when an agent does the looking-after? I do not have a definitive answer. What I have is a working hypothesis, some evidence, and several reasons to hold it loosely.

:::brain-power Before you read on
List the jobs that are left over once an internal app has been built: everything someone has to do in its second year. Which of them could a coding agent do today? Which of them could it only do if every app followed the same few rules?
:::

## What agents that never leave would break

Two of the familiar low-code pitches get weaker at once.

**The first is "you do not have to write code".** The original Power Platform proposition was democratisation: business users build apps without writing code, and IT gets governance as a by-product. David Ramel of Visual Studio Magazine notes that this proposition "can appear less distinctive in the age of agentic AI, when natural-language coding tools let a much broader group of users 'vibe code' applications". That is consistent with what I saw. When I asked Claude Code to build a Dataverse solution, I was not impressed by the platform. I was impressed by the agent. The platform felt like friction between the agent and the outcome.

**The second is "the platform remembers the obligations that people forget".** This is the governance pitch, and until recently I thought it was the durable one. Large corporates do not avoid spinning up new databases because they lack imagination. They avoid it because a database is a permanent obligation. But that pitch rests on the obligations being tedious and easy to forget. An agent does not find them tedious, and, if it is set up to check, it does not forget.

## What agents need instead: common rules, written down

My first instinct was that an agent needs one governed platform to maintain against. I no longer think that is quite right.

An agent can probably understand Supabase, SQLite, Postgres and Dataverse, and five different authentication models, with little more effort than it takes to understand one. If that is right, a different database for each solution may cost an agent very little. What it needs is for every app to follow the same few rules: which identity providers it may use, where its audit events go so that nobody can quietly edit them, and how it is recorded in an inventory with a named owner.

Gartner's June 2026 guidance points in this direction. It recommends that engineering leaders "do not provide direct access to vibe coding tools or AI coding agents", but instead "expose the access through a self-service platform that enforces governance, security, and usage controls by design". That platform could be bought. Or it could be a few common rules that every app follows, written in plain English, perhaps as a wiki of Markdown files.

That is less far-fetched than it sounds, because it is how agents already take instructions. Microsoft's Dataverse plugin is itself a set of Markdown files. Its skills say, in English, to confirm the environment before the first write, never to change a setting outside an allowlist of 37, and that "exit 0 isn't proof". In my runs for Part 16, the agent followed every one of them. An organisation could write its own rules the same way, and every agent that builds or maintains an app would read them first.

There are signs that the people who would own those rules want them. In Retool's 2026 survey of 307 CTOs, CIOs and CISOs, 55% say security and access controls should live in a centralised platform underneath the app, while only 7% want them configured inside each generated app by the builder. Retool sells governance tooling, so that is not neutral evidence, but it is a signal.

:::fireside-chat Tonight: the coding agent and the governed platform
**Coding agent:** I built that app in an afternoon, on Supabase. Your way would have taken a month of clicking through editors.

**Governed platform:** I believe you. And when the person who asked for it leaves?

**Coding agent:** I will still be here. I can review the permissions, check the backups and apply the upgrades, on Supabase, SQLite or anything else.

**Governed platform:** Then where do you switch off a leaver's access for all hundred apps at once? And where does the auditor look?

**Coding agent:** Your approved identity providers, audit logs nobody can edit and an inventory would do. I do not need you for that.

**Governed platform:** Fair. Then my job is to be worth more than the minimum: the data already governed, a safe way to change it, and less work for you per app.

**Coding agent:** Then make yourself easy to work with, and cheap enough, and I will use you.

**Governed platform:** That is the part I have not got right yet.
:::

## So what is Dataverse worth?

If the minimum is a few common rules and the services behind them, the honest test for Dataverse and SharePoint is not "platform or chaos". It is: what do they add above the minimum, and is it worth what they cost?

Part of the minimum is already Microsoft's. For many organisations Entra is at least the main identity provider, and SharePoint inherits it, along with the rest of the Microsoft 365 estate's access controls, authentication and audit trail. An agent querying a SharePoint list inherits those controls rather than reconstructing them. But that also means Microsoft can supply much of the minimum without Dataverse being involved at all.

Microsoft's bet is that Dataverse adds enough to be worth it. According to WindowsForum's analysis of the July 6, 2026 Dataverse announcement, Microsoft is "trying to make Dataverse the governed substrate beneath agents, apps, copilots, and developer workflows". What Dataverse and SharePoint can add above the minimum, as I see it:

1. **The data is already governed.** Dynamics data lives in Dataverse, and documents live in SharePoint. An agent that maintains a solution next to that data inherits the permissions on it. An agent that copies the data out has to recreate them.
2. **A contract for change.** Solutions, publishers, layering and import validation give change a defined shape. Imagine having a conversation with an agent that decides the right approach is to merge two existing solutions into one, and then lays out the migration plan. That only works if "solution" means something precise, and in Dataverse it does. That conversation is, to me, more exciting to demo than a natural-language app builder.
3. **Less work per app.** On a governed platform, much of the rules are met as soon as the app is created: role-based security, audit and environments come with it. Without one, the agent has to meet them app by app, and keep checking that it did.
4. **A place for accountability to live.** Owners, environments and the admin centre. An agent can make the answer to "who owns this?" much easier to find. It is harder to see an agent being the answer.

All four are valuable only if an agent can reach them easily, and only if they cost less than meeting the rules some other way. That is where my own experience is less encouraging. I started with Microsoft's Dataverse plugin, and it did not work well for what I needed: Claude fell back between different toolchains, hit path bugs, and never cleanly produced the artifact I was after. My own skill, which writes solution XML offline ([Part 13](/posts/claudecode13/)), was frustrating in a different way: a long tail of undocumented element-ordering and option-set casing rules that I had to discover by breaking things. There are five different ways in (the PAC CLI, the Dataverse CLI, the Python SDK, the Web API and the MCP server), sign-in crashed, and a managed solution's publisher turned read-only underneath me.

To be fair, the plugin also shows Microsoft doing important things right: the environment check, the allowlist, and the self-checking. So the question is probably not whether Microsoft understands governance. It is whether it can make the governed path the easiest path for an agent: one command-line tool, consistent on every operating system, with the API first and the portal second, and licensing that does not make a Postgres database and the common rules look cheaper. I suspect a governed platform that is harder to use than the alternative will lose to the alternative, however sound its architecture is.

Microsoft is not the only vendor making this bet. Other enterprise platforms, data platforms, low-code vendors and even the vibe-coding tools are all adding governance for agents, and some of them offer to govern agents built on everyone else's platforms too.

## And does vendor lock-in survive?

There is a part of this that the governance argument usually skips. Some organisations do not realise how restrictive their software licensing agreements are until they try to get their data out, or to reach it from something new. Then they are left asking two uncomfortable questions. Is this my data? And why do I have to pay the vendor money to access data I own?

Agents that never leave make those questions sharper. An agent that maintains apps reads and writes a lot of data, and that is exactly what platform licences tend to meter. If the governed path charges for each look at your own data, someone will be tempted to copy the data somewhere cheaper, and that copy is ungoverned.

But agents may also change the picture. Data migration is exactly the kind of work coding agents could be really good at: reading one schema, mapping it to another, moving the data in batches, checking the counts, and repeating until nothing is missing. If moving from one platform to another becomes a few days of an agent's work instead of a year-long project, vendor lock-in becomes much less of an issue, and "the data is already there" counts for less in Dataverse's favour.

The rules are moving in the same direction. Under the EU Data Act, cloud providers [may no longer charge customers for switching](https://www.deloittelegal.de/dl/en/services/legal/perspectives/cloud-switching-eu-data-act.html) to another provider from 12 January 2027. And worries about IT sovereignty, in Europe and elsewhere, are pushing organisations to ask where their data lives and whose laws apply to it: the European Commission has signed a [sovereign cloud contract with four European providers](https://www.bankinfosecurity.net/europe-spurs-digital-sovereignty-213m-cloud-contract-a-31455). A lot is changing at once. If that continues, incumbency may count for less than it has for a long time, and there may be everything to play for.

So does vendor lock-in survive? My tentative answer is that technical lock-in may weaken, while contractual lock-in does not. The licence still decides who may reach the data, how often, and at what price. Lock-in may move from the technology to the agreement.

:::watch-it Read the licence before the agent does
Before you let an agent loose on a platform, find out what the licence says about access by other applications, automated access through the APIs, request limits, storage charges, and exporting data when you leave. An agent will happily run up a bill, or hit a limit at the worst moment, without ever asking whose data it is.
:::

## What I might be wrong about

This post rests on assumptions, and any of them could be wrong.

1. **Agents will be reliable enough to maintain real systems.** I have seen an agent change settings and roles in a development environment, with a confirmation at almost every step. That is a long way from looking after production systems with nobody watching.
2. **Organisations will let agents act.** Segregation of duties, regulators and plain caution may keep agents advising rather than acting for a long time. I look at what this means for people's jobs in a [companion post on the roles](/posts/codingagentsroles/).
3. **Agent work will stay cheap.** Maintenance never stops, and the cost of an agent's time, and of the requests it makes against metered platforms, may change the sums.
4. **The hard part is what happens across apps.** Security research keeps finding problems inside single apps: Escape.tech found more than 2,000 vulnerabilities and 400+ exposed secrets in over 5,600 publicly available vibe-coded apps. If problems like those are the bigger risk, the emphasis of this post is wrong.
5. **Organisations need common rules at all.** If they can revoke access, audit and check an agent's work across a hundred apps with no common rules, even the minimum is optional.
6. **My experience generalises.** It is a few days with one platform, one plugin and one development environment.
7. **The vendors mean what they say.** Microsoft's "governed substrate" language is consistent with a real strategic shift. It is also consistent with good marketing.

:::pencil Ask the questions that matter now
Pick one internal app in your organisation that someone built recently, with or without a coding agent. Answer five questions about it:

1. If its owner left today, would their access to it be removed automatically, keys and all?
2. Does it write audit events somewhere they cannot be quietly edited?
3. Is it in an inventory, with a named owner?
4. Who owns it if it breaks next year?
5. Which of its maintenance jobs could an agent do for you today?

:::answer
There is no single right answer. If the first four answers are "no", "no", "no" and "nobody", the app is exactly the kind of debt this post is about, however quickly it was built. If the first three are "yes", the app follows the common rules, whatever database it uses, and an agent has something to maintain it against. The fifth answer tells you how much of the looking-after an agent could take on, and whether a platform such as Dataverse would save it enough work to be worth the price.
:::
:::

## Who looks after what gets built?

The question has moved twice. It started as "can AI build the app?" It moved to "who owns what gets built?" I now think it is "who looks after it, and what do they look after it against?"

The answer I would bet on, loosely, is an agent, working to a few common rules written in plain English, with a named person accountable. In that world a low-code platform such as Dataverse is no longer worth paying for because it saves writing code. It is worth paying for only if it gives agents more than the common rules do, at a price that makes sense, in a form they find easy to work with.

:::bullet-points In short
- Coding agents may never leave: the agent that builds a solution can also maintain it.
- That weakens two low-code pitches: "you do not have to write code" and "the platform remembers what people forget".
- Agents can probably cope with a different database for every app. What they need is a few common rules, which can be written in plain English, as agents' own instructions already are.
- Dataverse has to earn its place above those rules, with governed data, a contract for change and less work per app, and Microsoft has not yet made that path easy for agents.
- Technical lock-in may weaken as agents make migration cheap; contractual lock-in does not. Read the licence before the agent does.
:::

## References

- David Ramel, [Low-Coding in the Age of AI: Dataverse Embraces Copilot, Claude and Cursor](https://visualstudiomagazine.com/articles/2026/07/14/low-coding-in-the-age-of-ai-dataverse-embraces-copilot-claude-and-cursor.aspx), Visual Studio Magazine, July 14, 2026
- WindowsForum, [Dataverse Expands Coding Agent Plugin to Claude, Cursor, and Copilot with MCP Governance](https://windowsforum.com/news/dataverse-expands-coding-agent-plugin-to-claude-cursor-and-copilot-with-mcp-governance.435235/), an analysis of Microsoft's July 6, 2026 Dataverse announcement
- Gartner, [Govern Vibe Coding for Citizen Developers With Self-Service Platforms](https://www.gartner.com/doc/reprints?id=00ThR00000CtN1yUAF&ct=260828&st=sb), Nitish Tyagi, June 29, 2026, ID G00858202
- Retool, [The State of AI Governance in 2026](https://retool.com/blog/ai-governance-report-2026), June 17, 2026
- Escape.tech, [Methodology: How we discovered over 2k high-impact vulnerabilities in apps built with vibe coding platforms](https://escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding/), October 29, 2025
- Deloitte Legal, [Cloud switching under the EU Data Act](https://www.deloittelegal.de/dl/en/services/legal/perspectives/cloud-switching-eu-data-act.html)
- Bank Info Security, [Europe Spurs Digital Sovereignty With $213M Cloud Contract](https://www.bankinfosecurity.net/europe-spurs-digital-sovereignty-213m-cloud-contract-a-31455)
- My earlier experiments: [Claude Code (Part 13): building dv-generate](/posts/claudecode13/) and [Claude Code (Part 16): Microsoft's Dataverse plugin](/posts/claudecode16/)
- The companion post: [Coding Agents That Never Leave: What Happens to the Roles?](/posts/codingagentsroles/)
