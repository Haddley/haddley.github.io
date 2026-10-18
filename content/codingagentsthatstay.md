---
title: "Coding Agents That Stay"
description: "Coding agents will not just build apps and walk away. If they stay to maintain them, what are Dataverse and SharePoint worth, and who else wants the job?"
date: "2026-10-18"
categories: ["Power Platform","AI"]
image: "/assets/images/codingagentsthatstay/posts-meta.svg"
tags: "dataverse, sharepoint, governance, vibe-coding, coding-agents, low-code"
hidden: false
slug: "codingagentsthatstay"
---

Most of the debate about coding agents assumes that they build things and then walk away, leaving people to carry the obligations: permissions, audit trails, backup, retention, upgrade paths, integration with other solutions and systems, and the person who eventually leaves. I no longer believe that assumption will hold.

There is no reason why a coding agent cannot help to maintain a solution just as easily as it creates a new one. If anything, coding agents may be even more impressive in that role. Maintenance is repetitive, it is rule-based, and most of it is reading what is already there and checking it against what should be there. An agent can review permissions on a schedule, check that backups ran and can actually be restored, apply platform upgrades and test them, keep integrations and a CI/CD pipeline working, and flag the app that nobody has touched in a year.

I have spent a few days over the last few months trying to make coding agents work with Dataverse, and I have already seen a small version of this. In [Claude Code (Part 16)](/posts/claudecode16/), Microsoft's Dataverse plugin turned on auditing, set an audit retention period, and checked and assigned security roles. None of that was construction. It was exactly the kind of work that gets forgotten after an app is built.

If that is where coding agents are heading, the interesting questions change. What are Dataverse and SharePoint worth when an agent is doing the looking-after? Can Microsoft get out of its own way? And who else wants the job? I do not have definitive answers. What I have is a working hypothesis, some evidence, and several reasons to hold it loosely.

:::brain-power Before you read on
List the jobs that are left over once an internal app has been built: everything someone has to do in its second year. Which of them could a coding agent do today? Which could it do if every app kept its permissions, logs and backups in the same place?
:::

## What agents that stay would break

Two of the platform pitches get weaker at once.

**The first is "you do not have to write code".** The original Power Platform proposition was democratisation: business users build apps without writing code, and IT gets governance as a by-product of the platform everyone was going to use anyway. David Ramel of Visual Studio Magazine notes that this proposition "can appear less distinctive in the age of agentic AI, when natural-language coding tools let a much broader group of users 'vibe code' applications". Gartner's June 2026 guidance describes the same pressure from the demand side: business users are actively requesting Lovable, Replit, Claude Code and Codex, and "in most cases, software engineering leaders are under high executive pressure to give them the access while still being accountable for governance, security and long-term sustainability".

That is consistent with what I saw. When I sat in front of Claude Code and asked it to build a Dataverse solution, I was not impressed by the platform. I was impressed by the agent. The platform felt like friction between the agent and the outcome.

**The second is "the platform remembers the obligations that people forget".** This is the governance pitch, and until recently I thought it was the durable one. Large corporates do not avoid spinning up new databases because they lack imagination. They avoid it because a database is a permanent obligation. But that pitch rests on the obligations being tedious and easy to forget. An agent does not find them tedious, and it does not forget.

So if agents stay, both of the familiar arguments for a governed platform get weaker. That is the honest consequence of the idea, and it is why the rest of this post matters.

## What an agent still needs: something consistent to maintain against

Here is where I slow down. An agent that maintains needs something to maintain against.

Reviewing permissions is easy when they are defined in one place, and hard when every app invented its own. Checking backups needs a backup system. An audit needs an audit log. Keeping integrations working needs to know what the integrations are. An agent looking after a hundred generated apps, each with its own connection strings and its own integrations, each owned by whoever prompted it, has a hundred different jobs. An agent looking after a hundred apps on one governed platform has one job, done a hundred times.

So the role of the platform may not disappear. It may change from being the person's building tool to being the agent's workplace.

Microsoft appears to be making exactly that bet. The July 6, 2026 Dataverse announcement did not lead with "easier building". According to WindowsForum's analysis of the announcement, Microsoft is "trying to make Dataverse the governed substrate beneath agents, apps, copilots, and developer workflows". The more specific argument is that Dataverse can supply "the missing middle: not merely storage, and not merely a connector, but a governed operational environment where coding agents and business agents can touch enterprise data without bypassing role-based access control, authentication policy, or administrative oversight".

Gartner has arrived at a similar split from a different direction. Its June 2026 guidance recommends that engineering leaders "do not provide direct access to vibe coding tools or AI coding agents", but instead "expose the access through a self-service platform that enforces governance, security, and usage controls by design". It recommends AI-augmented low-code application platforms (AILCAPs) as "the default application development choices, where feasible", while limiting vibe coding platforms to prototypes and personal applications.

SharePoint makes a quieter version of the same argument. Its advantage was never that it was easier to build on. It is that governance is inherited from the surrounding Microsoft 365 estate: the same access controls, authentication and audit trail that apply everywhere else. An agent querying a list inherits those controls rather than reconstructing them. That is an architectural property, not a feature that can be generated from a prompt.

:::fireside-chat Tonight: the coding agent and the governed platform
**Coding agent:** I built that app in an afternoon. Your way would have taken a month of clicking through editors.

**Governed platform:** I believe you. Who can see the data in it?

**Coding agent:** Whoever has the connection string. I put it in the config file.

**Governed platform:** And when the person who asked for it leaves?

**Coding agent:** I will still be here. I can review the permissions, check the backups and apply the upgrades. I do not get bored of it.

**Governed platform:** Then you will want one place where the permissions are defined, one audit log and one backup system to check. Otherwise you have a hundred apps and a hundred different jobs.

**Coding agent:** So you would be the thing I maintain against.

**Governed platform:** If I can make myself easy enough for you to work with. That is the part I have not got right yet.
:::

## Why it matters now

Today's agents mostly do build and walk away, and the evidence of what that leaves behind is already appearing.

Retool's 2026 survey of 307 CTOs, CIOs and CISOs found that 93% are at least somewhat concerned about vibe-coded internal tools running in production, and 38% rank them among their top operational risks. Only 5% are very confident they have full visibility into all internal tools. And 51% said that when asked about production incidents caused by AI-generated internal tools, the honest answer was "not to my knowledge, but I can't say for certain". The most interesting number to me is not the fear. It is the stated preference for where controls should live: 55% say security and access controls should live in a centralised platform underneath the app, while only 7% want them configured inside each generated app by the builder.

The failure modes are concrete. A security review by Escape.tech analysed over 5,600 publicly available applications and identified more than 2,000 vulnerabilities, 400+ exposed secrets, and 175 instances of exposed personally identifiable information, including medical records. Medhat Galal, senior vice president of engineering at Appian, described the pattern in blunt terms: "It looks great and then they run into one problem after the other. If they can make it functional, they can't make it secure... You end up being a big maintainer of AI systems instead of building the application".

Read with this post's idea in mind, those numbers describe a gap, not a destiny. They are what happens when agents build and nobody, human or agent, stays to look after the result.

:::watch-it Who paid for the survey?
The survey that most strongly supports the governance argument comes from Retool, a company that sells governance tooling. That does not make the numbers wrong, but it does mean the questions were written by someone with an interest in the answer. I come back to this below.
:::

## What Dataverse and SharePoint are worth if agents stay

If agents do the looking-after, the value of Dataverse and SharePoint is no longer their building tools. It is four things an agent can lean on.

1. **One place to maintain against.** Identity through Entra, role-based security, audit, environments and data policies are defined once. An agent reviewing permissions across Dataverse has one job.
2. **The data is already there.** Dynamics data lives in Dataverse, and documents live in SharePoint. An agent that maintains a solution next to that data inherits the permissions on it. An agent that copies the data out has to recreate them.
3. **A contract for change.** Solutions, publishers, layering and import validation give change a defined shape. Imagine having a conversation with an agent that decides the right approach is to merge two existing solutions into one, and then lays out the migration plan. That only works if "solution" means something precise, and in Dataverse it does.
4. **A place for accountability to live.** Owners, environments and the admin centre. An agent can do the work, and it can make the answer to "who owns this?" much easier to find. It is harder to see an agent being the answer.

That merge-and-migrate conversation is, to me, more exciting to demo than a natural-language app builder, and it is a more durable approach for the business.

But all four are valuable only if an agent can reach them easily. If it cannot, it will route around them, to a Postgres database and a config file.

:::no-dumb-questions
**Q: If agents can maintain anything, why does the platform matter at all?**

A: Because "anything" is the expensive version. An agent can probably maintain a hundred inconsistent apps, but it will do a better, cheaper and more checkable job against one consistent set of permissions, logs and backups. Whether that difference stays large as agents improve is one of the open questions at the end of this post.

**Q: What is an AILCAP?**

A: An AI-augmented low-code application platform: Gartner's name for a low-code platform that also includes AI code assistants and AI agents, with governance controls built in. Gartner defines AILCAPs as platforms for "accelerated development and maintenance of applications, using model-driven development tools, prebuilt component catalogs, AI code assistants, and AI agents". Note the word maintenance.

**Q: Why Dataverse and SharePoint together?**

A: Because they are the two places in the Microsoft estate where agents are most likely to find business data already governed: Dataverse for structured data and the apps built on it, SharePoint for documents and lists. SharePoint is also the clearest example of governance being inherited rather than built. A SharePoint list sits inside the Microsoft 365 estate, so an agent that queries it gets the same access controls, authentication and audit trail as everything else, without anyone configuring them for that app.
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

So the question is not whether Microsoft understands governance. It does. The question is whether it can make the governed path the easiest path for an agent: one command-line tool, consistent on every operating system, with the API first and the portal second, and licensing that does not make the ungoverned database look cheaper. A governance layer that is harder to use than the ungoverned alternative will lose to the ungoverned alternative, regardless of how sound its architecture is.

The deeper problem may be harder to fix than the bugs. The maker portal was designed for people clicking through graphical editors, not for agents driving APIs. For the platform, the implication is that the maker experience stops being the product. The product becomes the governed substrate: first-class APIs, deterministic authoring surfaces, real drift detection, real diagnostic telemetry when a solution upgrade does something surprising, and an honest story about what happens when an agent-generated app goes wrong.

## Who else wants the job?

If the prize is "the place agents maintain against", Microsoft is not the only company that has noticed. The groups I would watch:

- **Enterprise platforms with their own system of record.** Salesforce launched [Agentforce Vibes](https://techcrunch.com/2025/10/01/salesforce-launches-enterprise-vibe-coding-product-agentforce-vibes/) in October 2025, an enterprise coding agent that works through Salesforce's own sandboxes and DevOps Center, with governance from the Salesforce platform. ServiceNow went further at its Knowledge 2026 event, pitching its [AI Control Tower](https://www.cxtoday.com/security-privacy-compliance/servicenow-ai-agent-governance-knowledge-2026/) as the governance layer for agents wherever they are built, and in May 2026 it [extended that governance to Microsoft Agent 365](https://nasdaq.com/press-release/servicenow-expands-ai-agent-governance-through-deeper-integration-microsoft-2026-05). That is a competitor offering to govern Microsoft's own agents.
- **Low-code platforms repositioning.** Gartner's 2026 Magic Quadrant for AI-augmented low-code platforms evaluates Microsoft alongside Appian, OutSystems, Mendix, Salesforce, ServiceNow, Retool and others. [Mendix](https://www.mendix.com/resources/gartner-magic-quadrant-for-low-code-application-platforms/) and [OutSystems](https://www.outsystems.com/blog/posts/gartner-augmented-ai-lcap-outsystems-a-leader) both say they are Leaders. Retool's survey is, in effect, its pitch for this role.
- **Data platforms that govern at the data layer.** Databricks makes [Unity Catalog the control point](https://developers.databricks.com/perspectives/agent-bricks-and-unity-catalog-make-databricks-the-practical-choice-for-company-data-agents) for permissions and lineage across data, models, agents and apps, with apps and their operational database running inside the same governed workspace.
- **Vibe-coding platforms moving up-market.** [Lovable for Enterprise](https://docs.lovable.dev/introduction/lovable-for-enterprise) now offers SSO, SCIM, audit logs and scheduled security scans. An independent [hardening guide](https://howtoharden.com/guides/lovable/) notes that most of those controls ship switched off, and that there is no admin API for them, which is exactly the "governance as an afterthought" problem.
- **Developer-first backends.** Supabase and similar Postgres platforms are popular with vibe-coding tools because they are fast and cheap. Their governance is something you configure yourself, table by table, and when it is missed the results are public: [CVE-2025-48757](https://nvd.nist.gov/vuln/detail/CVE-2025-48757) covered Lovable-generated apps whose Supabase row-level security let anyone read and write their tables.
- **Platform teams inside large companies.** Gartner's "self-service platform that enforces governance by design" does not have to be bought. Some organisations will build their own, and point their agents at it.

The interesting pattern is that everyone is converging on the same claim from different starting points: the system of record, the low-code platform, the data platform and the vibe-coding tool all now say they are the safe place for agents to work. Only some of them are also the place where the data already lives.

## Whose data is it, what does it cost, and can you leave?

There is a part of this that the governance argument usually skips. It matters how much the governed platform costs, and it matters who really owns the data in it.

Some organisations do not realise how restrictive their software licensing agreements are until they try to get their data out, or to reach it from something new. Then they are left asking two uncomfortable questions. Is this my data? And why do I have to pay the vendor money to access data I own?

Agents that stay make those questions sharper, not softer. An agent that reviews permissions, checks records and tests upgrades reads and writes a lot of data, and reading and writing data is exactly what platform licences tend to meter: by user, by request, by storage, or by the route the data takes. Every platform in the previous section has its own version of this. If the governed path charges for each look at your own data, the agent, or the person paying for it, will be tempted to copy the data somewhere cheaper. That copy is ungoverned, and the whole argument for the platform falls over.

So when I ask what Dataverse and SharePoint are worth, the honest answer has a price attached. A governed platform is worth paying for when it makes looking after the data easier. It is not worth paying for if its main effect is to make the data hard to reach, for people and agents alike.

And here, as with everything else, agents may change the picture. Data migration is exactly the kind of work coding agents could be really good at: reading one schema, mapping it to another, moving the data in batches, checking the counts, and repeating until nothing is missing. If moving from one platform to another becomes a few days of an agent's work instead of a year-long project, vendor lock-in becomes much less of an issue. That cuts both ways for Microsoft. It weakens one of the strongest points in Dataverse's favour, that the data is already there, because "already there" matters less when moving is cheap. It also means every platform has to win on how good it is to work in, not on how hard it is to leave.

The rules are moving in the same direction. Under the EU Data Act, cloud providers [may no longer charge customers for switching](https://www.deloittelegal.de/dl/en/services/legal/perspectives/cloud-switching-eu-data-act.html) to another provider from 12 January 2027, although charges for ordinary data transfer outside a switch remain. And worries about IT sovereignty, in Europe and elsewhere, are pushing organisations to ask where their data lives and whose laws apply to it. The European Commission has signed a [sovereign cloud contract with four European providers](https://www.bankinfosecurity.net/europe-spurs-digital-sovereignty-213m-cloud-contract-a-31455), and Microsoft and AWS are responding with EU data boundaries and sovereign cloud offerings of their own.

Put those together: agents that can migrate, rules that make leaving cheaper, sovereignty concerns that make some organisations want to leave, and platforms that all have to be rebuilt for agents anyway. Everything is changing at once. Incumbency counts for less than it has for a long time, and there is everything to play for.

:::watch-it Read the licence before the agent does
Before you let an agent loose on a platform, find out what the licence says about access by other applications, automated access through the APIs, request limits, storage charges, and exporting data when you leave. An agent will happily run up a bill, or hit a limit at the worst moment, without ever asking whose data it is.
:::

## What the evidence cannot tell us

I want to be explicit about the limits of the evidence I am using, because I have been burned before by reading too much into a clean narrative.

Retool sells governance tooling. A survey that finds widespread demand for governance tooling is not neutral evidence, even if the underlying numbers are honestly reported. The report is not entirely consistent with itself either: one passage gives 59% for the "can't say for certain" answer where the chart gives 51%, and two of its charts cite 397 and 387 respondents rather than 307.

The 5,600-application sample from Escape.tech is a security research sample, not a representative census of enterprise applications. It is weighted toward publicly discoverable apps built on particular platforms, and most of it (about 4,000 apps) comes from Lovable. The Gartner figures (60% of vibe-coded applications retired by 2028, 30% of engineering teams under material capacity strain) are predictions, not observations, and Gartner itself disclaims that its publications should be construed as statements of fact. Most of what I found about the other players comes from their own announcements.

My own experiments are a few days of work from one practitioner. They are useful for understanding failure modes. They are not evidence about what large enterprises will buy, and the idea at the top of this post, that agents will stay to maintain what they build, is a prediction too.

:::pencil Ask the questions that matter now
Pick one internal app in your organisation that someone built recently, with or without a coding agent. Answer four questions about it:

1. What does it inherit: sign-in, permissions, audit, backup, integrations?
2. Who owns it if it breaks next year?
3. Would the central IT team find it if they went looking?
4. Which of its maintenance jobs could an agent do for you today?

:::answer
There is no single right answer. If the first three answers are "nothing", "nobody" and "no", the app is exactly the kind of debt this post is about, however quickly it was built. The fourth answer is the interesting one: if an agent could do most of the jobs, but only if the app's permissions, logs and backups lived somewhere consistent, then you have found the argument for a governed platform in your own organisation.
:::
:::

## What would change my mind

Three things, roughly.

1. **Agents prove unreliable at maintenance.** If agent-made permission changes and upgrades start causing incidents, organisations will keep people in that loop, and the idea at the top of this post weakens.
2. **Agents cope easily with inconsistency.** If the next generation of agents can maintain a hundred apps that each do security differently as cheaply as a hundred apps on one platform, the case for a governed substrate weakens with it.
3. **Enterprises will not trust agents with the keys.** If organisations refuse to let agents change permissions or apply production upgrades, agents stay builders, and the older argument about people carrying the obligations comes back.

There are also things I simply do not know. I do not know whether enterprises will buy the governed-substrate story, or buy cheaper construction and accept the debt as a cost of speed: the Retool data suggests they are worried, but worry is not the same as willingness to pay. I do not know how much of the current friction is transitional and how much is structural. And I do not know whether the "governance" framing is genuinely Microsoft's strategic bet or a post-hoc rationalisation of a platform whose original pitch is weakening. The July 2026 language is consistent with a real strategic shift. It is also consistent with good marketing.

## Who looks after what gets built?

If I had to state my current position in one sentence, it would be this: coding agents will not just build things and walk away, and once they stay, the value of Dataverse and SharePoint is not that they are easier than code, but that they give agents one consistent, governed place to do the looking-after, if Microsoft can make that place easy enough to work in.

The question has moved twice. It started as "can AI build the app?" It moved to "who owns what gets built?" I now think it is "who looks after it, and what do they look after it against?" The answer I would bet on, loosely, is an agent, working on a governed platform, with a person accountable.

:::bullet-points In short
- Coding agents will not just build and walk away. They can maintain solutions too, and maintenance may suit them better than construction.
- That weakens both familiar platform pitches: "you do not have to write code" and "the platform remembers what people forget".
- An agent still needs something consistent to maintain against: one set of permissions, one audit log, one backup system, one view of the integrations.
- That is what Dataverse and SharePoint can offer, if Microsoft makes them easy for agents to use, and my experiments say it has not yet.
- Salesforce, ServiceNow, Databricks, the low-code vendors and even the vibe-coding tools all want to be that place.
- Cost and data ownership matter as much as governance: a platform that charges you to reach your own data invites ungoverned copies.
- Agents may make migration cheap, the EU Data Act makes switching cheaper, and sovereignty worries make leaving attractive. Incumbency counts for less, and there is everything to play for.
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
