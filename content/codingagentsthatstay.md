---
title: "Coding Agents That Stay"
description: "If coding agents maintain solutions as well as create them, what are low-code platforms such as Dataverse worth?"
date: "2026-10-18"
categories: ["Power Platform","AI"]
image: "/assets/images/codingagentsthatstay/posts-meta.svg"
tags: "dataverse, sharepoint, governance, vibe-coding, coding-agents, low-code"
hidden: false
slug: "codingagentsthatstay"
---

DevOps spent years arguing that whoever builds a system should also run it. I think coding agents may finally settle that argument: the agent that builds a solution can also look after it. And it will not just be developers using them. Business analysts, testers, support technicians, platform engineers, administrators and auditors will probably each use agents for their own part of the work, at which point "coding agent" starts to undersell what they are.

I can see no reason why a coding agent could not help to maintain a solution just as easily as it creates a new one. If anything, coding agents may be even more impressive in that role. Much of maintenance is repetitive and rule-based, and a lot of it is reading what is already there and checking it against what should be there. In principle, an agent can review permissions on a schedule, check that backups ran and can actually be restored, apply platform upgrades and test them, keep integrations and a CI/CD pipeline working, and flag the app that nobody has touched in a year.

I have spent a few days over the last few months trying to make coding agents work with Dataverse, and I have already seen a small version of this. In [Claude Code (Part 16)](/posts/claudecode16/), Microsoft's Dataverse plugin turned on auditing, set an audit retention period, and checked and assigned security roles. None of that was construction. It was exactly the kind of work that gets forgotten after an app is built.

If that is where coding agents are heading, the interesting questions change. What does an agent need in order to look after a hundred apps? What are Dataverse and SharePoint worth when an agent is doing the looking-after? Can Microsoft get out of its own way? And who else wants the job? I do not have definitive answers. What I have is a working hypothesis, some evidence, and several reasons to hold it loosely.

:::brain-power Before you read on
List the jobs that are left over once an internal app has been built: everything someone has to do in its second year. Which of them could a coding agent do today? Which of them could it only do if every app followed the same few rules?
:::

## What agents that stay would break

If agents stay, two of the familiar platform pitches get weaker at once.

**The first is "you do not have to write code".** The original Power Platform proposition was democratisation: business users build apps without writing code, and IT gets governance as a by-product of the platform everyone was going to use anyway. David Ramel of Visual Studio Magazine notes that this proposition "can appear less distinctive in the age of agentic AI, when natural-language coding tools let a much broader group of users 'vibe code' applications". Gartner's June 2026 guidance describes the same pressure from the demand side: business users are actively requesting Lovable, Replit, Claude Code and Codex, and "in most cases, software engineering leaders are under high executive pressure to give them the access while still being accountable for governance, security and long-term sustainability".

That is consistent with what I saw. When I sat in front of Claude Code and asked it to build a Dataverse solution, I was not impressed by the platform. I was impressed by the agent. The platform felt like friction between the agent and the outcome.

**The second is "the platform remembers the obligations that people forget".** This is the governance pitch, and until recently I thought it was the durable one. Large corporates do not avoid spinning up new databases because they lack imagination. They avoid it because a database is a permanent obligation. But that pitch rests on the obligations being tedious and easy to forget. An agent does not find them tedious, and, if it is set up to check, it does not forget. Whether agents are reliable enough to be trusted with those obligations is a separate question, and I come back to it below.

That is the honest consequence of agents that stay, and it is why the rest of this post matters.

## What an agent still needs: a few common rules, not one platform

My first instinct was that an agent needs one governed platform to maintain against. I no longer think that is quite right.

An agent can probably understand Supabase, SQLite, Postgres and Dataverse, and five different authentication models, with little more effort than it takes to understand one. If that is right, understanding each app is not the hard part, and a different database for each solution may cost an agent very little.

Gartner's June 2026 guidance suggests what the alternative to one platform might look like. It recommends that engineering leaders "do not provide direct access to vibe coding tools or AI coding agents", but instead "expose the access through a self-service platform that enforces governance, security, and usage controls by design". That platform could be bought. Or it could be a few common rules that every app follows, written in plain English, perhaps as a wiki of Markdown files.

That is less far-fetched than it sounds, because it is how agents already take instructions. Microsoft's Dataverse plugin is itself a set of Markdown files. Its skills say, in English, to confirm the environment before the first write, never to change a setting outside an allowlist of 37, and that "exit 0 isn't proof". In my runs for [Part 16](/posts/claudecode16/), the agent followed every one of them. An organisation could write its own rules the same way, for which identity providers an app may use, where its audit events go, and how it is recorded in the inventory, and every agent that builds or maintains an app would read them first.

:::fireside-chat Tonight: the coding agent and the governed platform
**Coding agent:** I built that app in an afternoon, on Supabase. Your way would have taken a month of clicking through editors.

**Governed platform:** I believe you. Who can see the data in it?

**Coding agent:** Whoever has the connection string. I put it in the config file.

**Governed platform:** And when the person who asked for it leaves?

**Coding agent:** I will still be here. I can review the permissions, check the backups and apply the upgrades, on Supabase, SQLite or anything else. I do not get bored of it.

**Governed platform:** I am sure you can. But when someone leaves, where do you switch off their access for all hundred apps at once? And where does the auditor look?

**Coding agent:** Your approved identity providers, audit logs nobody can edit and an inventory would do. I do not need you for that.

**Governed platform:** Fair. Then my job is to be worth more than the minimum: the data already governed, a safe way to change it, and less work for you per app.

**Coding agent:** Then make yourself easy to work with, and cheap enough, and I will use you.

**Governed platform:** That is the part I have not got right yet.
:::

:::no-dumb-questions
**Q: Does it have to be one platform? Could each app use a different database and authentication model, with the agent understanding them all?**

A: Each app can use a different database. The agent will understand them all. What should not vary is identity, audit and the inventory, because those are where the questions that cut across every app get answered: who can see what, who has left, and what happened.

**Q: Would a few documentation and reuse standards be more than enough?**

A: Nearly. Agents are good at following standards and at checking that others followed them, which is why standards are more realistic now than they used to be. But standards need something to point at: approved identity providers, audit logs that cannot be edited, an inventory. With those in place, a few standards may well be enough for many organisations.

**Q: What is an AILCAP?**

A: An AI-augmented low-code application platform: Gartner's name for a low-code platform that also includes AI code assistants and AI agents, with governance controls built in. Gartner defines AILCAPs as platforms for "accelerated development and maintenance of applications, using model-driven development tools, prebuilt component catalogs, AI code assistants, and AI agents". Note the word maintenance.
:::

## What happens to the roles?

Most of the debate about coding agents treats them like a project team. They build something, hand it over, and leave other teams to carry the obligations: permissions, audit trails, backup, retention, upgrade paths, and integration with other solutions and systems. In a large business those obligations land on the cloud and platform engineers, the security and identity team, the database administrators, the Microsoft 365 and Power Platform administrators, and the business owner of the app.

Large businesses still have business analysts and project managers, developers and testers, and operations staff, although in a cloud world many of those titles have changed. Here is my guess at how agents that build and run would change each of them. It is a guess, not a finding, and the honest answer for most roles is "less doing, more deciding and checking".

| Role today | What it does now | If agents build and run |
|---|---|---|
| Business analyst, product owner or product manager | Works out what the business needs, and writes it down | More important, not less. An agent builds whatever it is asked for, so asking for the right thing, and confirming it was delivered, becomes the job |
| Project manager, delivery manager or scrum master | Plans the work, tracks it and manages the risks | Less tracking of tasks, more deciding what an agent may change, and when, and coordinating the people who have to approve it |
| Developer, or Power Platform maker | Designs and writes the solution | Directs agents, reviews their work, and handles what they get wrong. Fewer people may write code by hand; more will read it |
| Tester, QA engineer or quality engineer | Checks that the solution works | Defines what "working" means, and builds the checks that agents run against every change, including the nightly checks against the standards |
| Service desk or support technician | Takes the call, raises a ticket, and passes most fixes on to another team | Fixes more directly, with an agent, for the kinds of change that are approved in advance. The ticket does not disappear: the agent writes it, recording what changed and why. Anything outside the agreed limits still goes to someone else to approve |
| Cloud engineer, platform engineer or site reliability engineer (what operations staff and system administrators have mostly become) | Runs the infrastructure and keeps services up | Runs the services the common rules depend on: identity, audit logs and the inventory, and the checks against the standards. This is where much of the old operations work moves |
| Database administrator | Looks after databases, backups and performance | Fewer hands-on tasks, more setting the rules that agents follow, and checking that restores actually work |
| Security, and identity and access management | Decides who can do what, and watches for trouble | Decides what agents themselves may do, and holds the keys they must not have |
| Microsoft 365 and Power Platform administrators, and the Center of Excellence | Run the tenant, environments and data policies, and set the rules for makers | Set the rules for agents as well as makers, and decide where Dataverse and SharePoint add enough to be worth using |
| Data owner or data steward | Decides who may see the data, and how long it is kept | Unchanged in principle, but asked far more often, by agents |
| Internal audit, risk and compliance | Checks that the controls were followed | Asks for evidence that the common rules were followed, including evidence of what the agents did |

If this is right, the pattern is that most roles move toward deciding and checking, and the common rules are what both are measured against.

:::watch-it An agent that builds and runs can break segregation of duties
Some role divisions are there on purpose. Segregation of duties says the person who builds a change should not be the one who approves it, deploys it to production, or grants themselves access, and audit frameworks in regulated and listed companies expect that separation. An agent that builds and runs a solution collapses it. The likely answer is not to drop the rule, but to split the work: one agent builds, a different agent or a person approves, and the audit log records who did what.
:::

## Why it matters now

Today's agents mostly do build and hand over, and the evidence of what that leaves behind is already appearing.

Retool's 2026 survey of 307 CTOs, CIOs and CISOs found that 93% are at least somewhat concerned about vibe-coded internal tools running in production, and 38% rank them among their top operational risks. Only 5% are very confident they have full visibility into all internal tools. And 51% said that when asked about production incidents caused by AI-generated internal tools, the honest answer was "not to my knowledge, but I can't say for certain". The most interesting number to me is not the fear. It is the stated preference for where controls should live: 55% say security and access controls should live in a centralised platform underneath the app, while only 7% want them configured inside each generated app by the builder.

The failure modes are concrete. A security review by Escape.tech analysed over 5,600 publicly available applications and identified more than 2,000 vulnerabilities, 400+ exposed secrets, and 175 instances of exposed personally identifiable information, including medical records. Medhat Galal, senior vice president of engineering at Appian, described the pattern in blunt terms: "It looks great and then they run into one problem after the other. If they can make it functional, they can't make it secure... You end up being a big maintainer of AI systems instead of building the application".

Read with this post's idea in mind, those numbers describe a gap, not a destiny. They are what happens when agents build, nobody, human or agent, stays to look after the result, and there are no common rules for anyone to look after it against.

:::watch-it Who paid for the survey?
The survey that most strongly supports the governance argument comes from Retool, a company that sells governance tooling. That does not make the numbers wrong, but it does mean the questions were written by someone with an interest in the answer.
:::

## What Dataverse and SharePoint add above the minimum

If the minimum is a few common rules and the services behind them, then the honest test for Dataverse and SharePoint is not "platform or chaos". It is: what do they add above the minimum, and is it worth what they cost?

Part of the minimum is already Microsoft's. For many organisations Entra is at least the main identity provider, and SharePoint inherits it, along with the rest of the Microsoft 365 estate's access controls, authentication and audit trail. An agent querying a SharePoint list inherits those controls rather than reconstructing them. That is an architectural property, not a feature that can be generated from a prompt. But it also means Microsoft can supply much of what the common rules depend on without Dataverse being involved at all.

Microsoft's bet is that Dataverse adds enough to be worth it. The July 6, 2026 Dataverse announcement did not lead with "easier building". According to WindowsForum's analysis of the announcement, Microsoft is "trying to make Dataverse the governed substrate beneath agents, apps, copilots, and developer workflows". The more specific argument is that Dataverse can supply "the missing middle: not merely storage, and not merely a connector, but a governed operational environment where coding agents and business agents can touch enterprise data without bypassing role-based access control, authentication policy, or administrative oversight".

What Dataverse and SharePoint can add above the minimum, as I see it:

1. **The data is already governed.** Dynamics data lives in Dataverse, and documents live in SharePoint. An agent that maintains a solution next to that data inherits the permissions on it. An agent that copies the data out has to recreate them.
2. **A contract for change.** Solutions, publishers, layering and import validation give change a defined shape. Imagine having a conversation with an agent that decides the right approach is to merge two existing solutions into one, and then lays out the migration plan. That only works if "solution" means something precise, and in Dataverse it does. That merge-and-migrate conversation is, to me, more exciting to demo than a natural-language app builder, and it is a more durable approach for the business.
3. **Less work per app.** On a governed platform, the standards are already met when the app is created: role-based security, audit and environments come with it. Without one, the agent has to meet them app by app, and the checking agent has to keep confirming that it did.
4. **A place for accountability to live.** Owners, environments and the admin centre. An agent can do the work, and it can make the answer to "who owns this?" much easier to find. It is harder to see an agent being the answer.

All four are valuable only if an agent can reach them easily, and only if they cost less than meeting the standards some other way. If not, the agent will probably route around them, to a Postgres database, a config file and the common rules.

:::no-dumb-questions
**Q: Why Dataverse and SharePoint together?**

A: Because they are the two places in the Microsoft estate where agents are most likely to find business data already governed: Dataverse for structured data and the apps built on it, SharePoint for documents and lists. SharePoint is also the clearest example of governance being inherited rather than built.

**Q: If Entra is part of the minimum, does Microsoft win anyway?**

A: Microsoft is well placed for the identity part, although many organisations run Okta or another provider alongside Entra, and possibly for the audit part. Dataverse does not win automatically. It has to earn its place by doing more than the minimum, at a price that makes sense.
:::

## Can Microsoft get out of its own way?

This is the question my own experiments speak to most directly.

I started with Microsoft's own Dataverse Skills plugin. I tried it, and it did not work well for what I needed: Claude fell back between different toolchains, hit path bugs, and never cleanly produced the artifact I was after. I wrote that experience up only recently, in [Claude Code (Part 16)](/posts/claudecode16/). Because of that experience, I built my own skill, one that generates solution XML offline: [Claude Code (Part 13)](/posts/claudecode13/). That was also frustrating, in a different way: a long tail of undocumented element-ordering and option-set casing rules that I had to discover by breaking things.

:::under-the-hood What got in the way
- **Five ways in.** The PAC CLI, the Dataverse CLI, the Python SDK, the Web API and the MCP server. The plugin needs a whole overview skill just to decide which one to use.
- **Path bugs.** Web API paths that start with `/api/data/...` fail on a Mac, and Claude hit that three times in one request before it found the form that works.
- **Sign-in.** The PAC CLI's device-code sign-in crashed after authenticating, and the plugin's own Dataverse CLI app appears as "unverified" on the consent screen.
- **Traps.** A managed solution's publisher becomes read-only, solution XML has ordering and casing rules that nobody documents, and failed managed upgrades can leave holding solutions behind that block the next import.
:::

To be fair, the plugin also shows Microsoft doing important things right. It confirms the environment before the first write, it limits admin changes to an allowlist of 37 settings, it refused to change a setting outside that list, and it checks its own work: one skill has a section that begins "exit 0 isn't proof". Those are exactly the guardrails an agent that stays needs.

So the question is probably not whether Microsoft understands governance. The plugin suggests it does. The question is whether it can make the governed path the easiest path for an agent: one command-line tool, consistent on every operating system, with the API first and the portal second, and licensing that does not make a Postgres database and the common rules look cheaper. I suspect a governance layer that is harder to use than the alternative will lose to the alternative, however sound its architecture is.

The deeper problem may be harder to fix than the bugs. The maker portal was designed for people clicking through graphical editors, not for agents driving APIs. For the platform, the implication is that the maker experience stops being the product. The product becomes the governed substrate: first-class APIs, deterministic authoring surfaces, real drift detection, real diagnostic telemetry when a solution upgrade does something surprising, and an honest story about what happens when an agent-generated app goes wrong.

## Who else wants the job?

If the prize is "the place agents maintain against", Microsoft is not the only company that has noticed. Some want to be the whole platform, and some only want to be the layer that checks the common rules. The groups I would watch:

- **Enterprise platforms with their own system of record.** Salesforce launched [Agentforce Vibes](https://techcrunch.com/2025/10/01/salesforce-launches-enterprise-vibe-coding-product-agentforce-vibes/) in October 2025, an enterprise coding agent that works through Salesforce's own sandboxes and DevOps Center, with governance from the Salesforce platform.
- **Governance layers that sit across everyone else.** ServiceNow pitched its [AI Control Tower](https://www.cxtoday.com/security-privacy-compliance/servicenow-ai-agent-governance-knowledge-2026/) at its Knowledge 2026 event as the governance layer for agents wherever they are built, and in May 2026 it [extended that governance to Microsoft Agent 365](https://nasdaq.com/press-release/servicenow-expands-ai-agent-governance-through-deeper-integration-microsoft-2026-05). That is a competitor offering to govern Microsoft's own agents, which looks like the common-rules play: governing apps without owning them.
- **Data platforms that govern at the data layer.** Databricks makes [Unity Catalog the control point](https://developers.databricks.com/perspectives/agent-bricks-and-unity-catalog-make-databricks-the-practical-choice-for-company-data-agents) for permissions and lineage across data, models, agents and apps, with apps and their operational database running inside the same governed workspace.
- **Low-code platforms repositioning.** Gartner's 2026 Magic Quadrant for AI-augmented low-code platforms evaluates Microsoft alongside Appian, OutSystems, Mendix, Salesforce, ServiceNow, Retool and others. [Mendix](https://www.mendix.com/resources/gartner-magic-quadrant-for-low-code-application-platforms/) and [OutSystems](https://www.outsystems.com/blog/posts/gartner-augmented-ai-lcap-outsystems-a-leader) both say they are Leaders. Retool's survey is, in effect, its pitch for this role.
- **Vibe-coding platforms moving up-market.** [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise) now offers SSO, SCIM, audit logs and scheduled security scans. An independent [hardening guide](https://howtoharden.com/guides/lovable/) notes that most of those controls ship switched off, and that there is no admin API for them, which looks like governance added as an afterthought.
- **Developer-first backends.** Supabase and similar Postgres platforms are popular with vibe-coding tools because they are fast and cheap. Their governance is something you configure yourself, table by table, and when it is missed the results are public: [CVE-2025-48757](https://nvd.nist.gov/vuln/detail/CVE-2025-48757) covered Lovable-generated apps whose Supabase row-level security let anyone read and write their tables. It is one example of what can happen when an app is built without common rules.
- **Platform teams inside large companies.** Gartner's "self-service platform that enforces governance by design" does not have to be bought. Some organisations will set the common rules and run the services behind them themselves, and point their agents at them.

The interesting pattern is that everyone is converging on the same claim from different starting points: the system of record, the governance layer, the low-code platform, the data platform and the vibe-coding tool all now say they are the safe place for agents to work. Only some of them are also the place where the data already lives.

## Whose data is it, what does it cost, and does vendor lock-in survive?

There is a part of this that the governance argument usually skips. It matters how much the governed platform costs, and it matters who really owns the data in it.

Some organisations do not realise how restrictive their software licensing agreements are until they try to get their data out, or to reach it from something new. Then they are left asking two uncomfortable questions. Is this my data? And why do I have to pay the vendor money to access data I own?

Agents that stay make those questions sharper, not softer. An agent that reviews permissions, checks records and tests upgrades reads and writes a lot of data, and reading and writing data is exactly what platform licences tend to meter: by user, by request, by storage, or by the route the data takes. Every platform in the previous section has its own version of this. If the governed path charges for each look at your own data, the agent, or the person paying for it, will be tempted to copy the data somewhere cheaper. That copy is ungoverned, and the whole argument for the platform falls over.

So when I ask what Dataverse and SharePoint add above the minimum, the honest answer has a price attached. A governed platform is worth paying for when it makes looking after the data easier. It is not worth paying for if its main effect is to make the data hard to reach, for people and agents alike.

And here, as with everything else, agents may change the picture. Data migration is exactly the kind of work coding agents could be really good at: reading one schema, mapping it to another, moving the data in batches, checking the counts, and repeating until nothing is missing. If moving from one platform to another becomes a few days of an agent's work instead of a year-long project, vendor lock-in becomes much less of an issue. That cuts both ways for Microsoft. It weakens one of the strongest points in Dataverse's favour, that the data is already there, because "already there" matters less when moving is cheap. It also means every platform has to win on how good it is to work in, not on how hard it is to leave.

The rules are moving in the same direction. Under the EU Data Act, cloud providers [may no longer charge customers for switching](https://www.deloittelegal.de/dl/en/services/legal/perspectives/cloud-switching-eu-data-act.html) to another provider from 12 January 2027, although charges for ordinary data transfer outside a switch remain. And worries about IT sovereignty, in Europe and elsewhere, are pushing organisations to ask where their data lives and whose laws apply to it. The European Commission has signed a [sovereign cloud contract with four European providers](https://www.bankinfosecurity.net/europe-spurs-digital-sovereignty-213m-cloud-contract-a-31455), and Microsoft and AWS are responding with EU data boundaries and sovereign cloud offerings of their own.

Put those together: agents that can migrate, rules that make leaving cheaper, sovereignty concerns that make some organisations want to leave, and platforms that all have to be rebuilt for agents anyway. A lot is changing at once. If that continues, incumbency may count for less than it has for a long time, and there may be everything to play for.

So does vendor lock-in survive? My tentative answer is that technical lock-in may weaken, while contractual lock-in does not. If an agent can move the data and rebuild the app in days, the cost of leaving that kept organisations in place shrinks. But the licence still decides who may reach the data, how often, and at what price, and the contract still decides what it costs to leave. Lock-in may move from the technology to the agreement. That is one more reason to read the licence before the agent does.

:::watch-it Read the licence before the agent does
Before you let an agent loose on a platform, find out what the licence says about access by other applications, automated access through the APIs, request limits, storage charges, and exporting data when you leave. An agent will happily run up a bill, or hit a limit at the worst moment, without ever asking whose data it is.
:::

## The assumptions underneath this post

While writing this, I kept finding claims that rested on assumptions I had not stated. Here they are, with the reason each one might be wrong.

1. **Agents will be reliable enough to maintain real systems.** I have seen an agent change settings and roles in a development environment, with a confirmation at almost every step. That is a long way from looking after production systems with nobody watching.
2. **Agent work will stay cheap.** My own runs were cheap. Maintenance never stops, though, and the cost of an agent's time, and of the requests it makes against metered platforms, may change the sums.
3. **Organisations will let agents act.** Segregation of duties, regulators and plain caution may keep agents advising rather than acting for a long time.
4. **The hard part is what happens across apps, not inside each one.** The security research keeps finding problems inside single apps. If those turn out to be the bigger risk, the emphasis of this post is wrong.
5. **Understanding a hundred different stacks is cheap for an agent.** It sounds plausible, and I have not tested it.
6. **My experience generalises.** It is a few days with one platform, one plugin and one development environment.
7. **The vendors mean what they say.** Much of what I know about where Microsoft and the others are heading comes from their own announcements, and from analysts' reading of them.

If several of these turn out to be wrong, so does most of this post.

## What the evidence cannot tell us

I want to be explicit about the limits of the evidence I am using, because I have been burned before by reading too much into a clean narrative.

My own experiments are a few days of work from one practitioner. They are useful for understanding failure modes. They are not evidence about what large enterprises will buy. The idea at the top of this post, that agents will stay to maintain what they build, is a prediction too, and so is the idea that a few common rules are the minimum they need.

:::pencil Ask the questions that matter now
Pick one internal app in your organisation that someone built recently, with or without a coding agent. Answer five questions about it:

1. If its owner left today, would their access to it be removed automatically, keys and all?
2. Does it write audit events somewhere they cannot be quietly edited?
3. Is it in an inventory, with a named owner?
4. Who owns it if it breaks next year?
5. Which of its maintenance jobs could an agent do for you today?

:::answer
There is no single right answer. If the first four answers are "no", "no", "no" and "nobody", the app is exactly the kind of debt this post is about, however quickly it was built. If the first three are "yes", the app follows the common rules, whatever database it uses, and an agent has something to maintain it against. The fifth answer tells you how much of the looking-after an agent could take on, and whether a governed platform would save it enough work to be worth the price.
:::
:::

## What would change my mind

Three things, roughly.

1. **Agents prove unreliable at maintenance.** If agent-made permission changes and upgrades start causing incidents, organisations will keep engineers in that loop, and the idea at the top of this post weakens.
2. **Organisations manage without even common rules.** Agents will understand inconsistent stacks; that is not the test. The test is whether organisations can revoke access, audit and check an agent's work across a hundred apps with no common rules for identity, audit or the inventory. If they can, even the common rules are optional.
3. **Enterprises will not trust agents with the keys.** If organisations refuse to let agents change permissions or apply production upgrades, agents stay builders, and the older argument about people carrying the obligations comes back.

There are also things I simply do not know. I do not know whether enterprises will buy the governed-substrate story, settle for common rules, or buy cheaper construction and accept the debt as a cost of speed: the Retool data suggests they are worried, but worry is not the same as willingness to pay. I do not know how much of the current friction is transitional and how much is structural. And I do not know whether the "governance" framing is genuinely Microsoft's strategic bet or a post-hoc rationalisation of a platform whose original pitch is weakening. The July 2026 language is consistent with a real strategic shift. It is also consistent with good marketing.

## Who looks after what gets built?

If I had to state my current position in one sentence, it would be this: coding agents will not just build things and hand them over, and once they stay, what they need is probably not one platform but a few common rules for identity, audit and the inventory, and the standards that go with them, so Dataverse and SharePoint have to earn their place by what they add above that, at a price that makes sense, and in a form agents find easy to work with.

The question has moved twice. It started as "can AI build the app?" It moved to "who owns what gets built?" I now think it is "who looks after it, and what do they look after it against?" The answer I would bet on, loosely, is an agent, working to a few common rules, with a named person, most likely the business owner of the app, accountable.

:::bullet-points In short
- I think coding agents will not just build and hand over. Like a DevOps team, they could build and run what they build, and maintenance may suit them better than construction.
- That weakens both familiar platform pitches: "you do not have to write code" and "the platform remembers what people forget".
- Most roles may move toward deciding and checking: analysts define, developers review, quality engineers write the checks, and platform engineers run the services the common rules depend on. Segregation of duties still applies to agents.
- Agents can probably cope with a different database for every app. What they may need is a few common rules: approved identity providers, audit logs nobody can edit, every app in an inventory, and a few standards they follow and check.
- Dataverse and SharePoint have to earn their place above that minimum: data already governed, a contract for change, and less work per app. Microsoft is well placed for identity without Dataverse at all.
- My experiments say Microsoft has not yet made the governed path the easy one for agents.
- Salesforce, ServiceNow, Databricks, the low-code vendors and even the vibe-coding tools all want to be the place agents work, or the layer above it.
- Cost and data ownership matter as much as governance: a platform that charges you to reach your own data invites ungoverned copies.
- Agents may make migration cheap, the EU Data Act makes switching cheaper, and sovereignty worries make leaving attractive. Incumbency may count for less, and there may be everything to play for. Technical lock-in may weaken; contractual lock-in does not.
- The question is now "who looks after what gets built, and against what?"
:::

## References

- David Ramel, [Low-Coding in the Age of AI: Dataverse Embraces Copilot, Claude and Cursor](https://visualstudiomagazine.com/articles/2026/07/14/low-coding-in-the-age-of-ai-dataverse-embraces-copilot-claude-and-cursor.aspx), Visual Studio Magazine, July 14, 2026
- WindowsForum, [Dataverse Expands Coding Agent Plugin to Claude, Cursor, and Copilot with MCP Governance](https://windowsforum.com/news/dataverse-expands-coding-agent-plugin-to-claude-cursor-and-copilot-with-mcp-governance.435235/), an analysis of Microsoft's July 6, 2026 Dataverse announcement
- Gartner, [Govern Vibe Coding for Citizen Developers With Self-Service Platforms](https://www.gartner.com/doc/reprints?id=00ThR00000CtN1yUAF&ct=260828&st=sb), Nitish Tyagi, June 29, 2026, ID G00858202
- Gartner, [Magic Quadrant for AI-Augmented Low-Code Application Platforms](https://www.gartner.com/doc/reprints?id=00ThR00000Ix62DUAR&ct=260930&st=sb), September 28, 2026, ID G00841123
- Retool, [The State of AI Governance in 2026](https://retool.com/blog/ai-governance-report-2026), June 17, 2026
- Escape.tech, [Methodology: How we discovered over 2k high-impact vulnerabilities in apps built with vibe coding platforms](https://escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding/), October 29, 2025
- SiliconANGLE, [AI writes enterprise code fast. Cleaning it up is another story entirely](https://siliconangle.com/2026/04/28/ai-generated-code-cant-vibe-way-past-enterprise-reality-appianworld/), April 28, 2026
- TechCrunch, [Salesforce launches enterprise vibe coding product Agentforce Vibes](https://techcrunch.com/2025/10/01/salesforce-launches-enterprise-vibe-coding-product-agentforce-vibes/), October 1, 2025
- CX Today, [ServiceNow Moves to Govern Every AI Agent in the Enterprise](https://www.cxtoday.com/security-privacy-compliance/servicenow-ai-agent-governance-knowledge-2026/), 2026
- ServiceNow, [ServiceNow expands AI agent governance through deeper integration with Microsoft](https://nasdaq.com/press-release/servicenow-expands-ai-agent-governance-through-deeper-integration-microsoft-2026-05), May 5, 2026
- Databricks, [Agent Bricks and Unity Catalog make Databricks the practical choice for company data agents](https://developers.databricks.com/perspectives/agent-bricks-and-unity-catalog-make-databricks-the-practical-choice-for-company-data-agents)
- Lovable, [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise), and How to Harden, [Lovable Hardening Guide](https://howtoharden.com/guides/lovable/)
- NIST National Vulnerability Database, [CVE-2025-48757](https://nvd.nist.gov/vuln/detail/CVE-2025-48757)
- Deloitte Legal, [Cloud switching under the EU Data Act](https://www.deloittelegal.de/dl/en/services/legal/perspectives/cloud-switching-eu-data-act.html)
- Bank Info Security, [Europe Spurs Digital Sovereignty With $213M Cloud Contract](https://www.bankinfosecurity.net/europe-spurs-digital-sovereignty-213m-cloud-contract-a-31455)
- Mendix, [2026 Gartner Magic Quadrant for AI-Augmented Low-Code Application Platforms](https://www.mendix.com/resources/gartner-magic-quadrant-for-low-code-application-platforms/), and OutSystems, [OutSystems is a Leader in the Gartner Magic Quadrant for AILCAP](https://www.outsystems.com/blog/posts/gartner-augmented-ai-lcap-outsystems-a-leader)
- My earlier experiments: [Claude Code (Part 13): building dv-generate](/posts/claudecode13/) and [Claude Code (Part 16): Microsoft's Dataverse plugin](/posts/claudecode16/)
