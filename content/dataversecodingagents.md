---
title: "Dataverse, SharePoint, and the Coding Agent"
description: "A cautious reading of what coding agents mean for Dataverse: the building story is getting weaker, and the governance story may be getting stronger"
date: "2026-10-18"
categories: ["Power Platform","AI"]
image: "/assets/images/dataversecodingagents/posts-meta.svg"
tags: "dataverse, sharepoint, governance, vibe-coding, coding-agents, low-code"
hidden: false
slug: "dataversecodingagents"
---

I have spent a few days over the last few months trying to make coding agents work with Dataverse. The experience has left me skeptical of the platform's building story, and scratching my head about its governance story. But I have been wrong before, the evidence is not yet conclusive, and I am trying to be explicit about where the signal ends and the guesswork begins.

## What I actually did, and in what order

I started with Microsoft's own Dataverse Skills plugin. I tried it, and it did not work well for what I needed: Claude fell back between different toolchains, hit path bugs, and never cleanly produced the artifact I was after. I wrote that experience up only recently, in [Claude Code (Part 16)](/posts/claudecode16/).

Because of that experience, I built my own skill, one that generates solution XML offline and imports the result: [Claude Code (Part 13)](/posts/claudecode13/). That was also frustrating, in a different way: a long tail of undocumented element-ordering and option-set casing rules that I had to discover by breaking things.

Two frustrating experiences are not a trend. They are a reason to ask better questions.

:::brain-power Before you read on
Suppose a coding agent could build any internal app you asked for in an afternoon. Which jobs would still be left over once the app was built? Make a list before you read the next section.
:::

## The question I am trying to answer

The question is not "will coding agents replace low-code platforms?" That framing is too coarse to be useful. The better question is: if coding agents make application construction cheaper, which parts of the platform stack become less valuable, and which become more valuable?

I do not have a definitive answer. What I have is a working hypothesis, some evidence that points in one direction, and several reasons to hold it loosely.

| Probably less valuable | Possibly more valuable |
|---|---|
| "You do not have to write code" | Permissions and role-based access |
| Graphical editors for building | Audit trails and retention |
| The maker experience as the product | Backup, upgrade paths and ownership |
| | Integration with other solutions and systems |
| | A central view of everything that was built |

This table is my hypothesis, not a finding. The rest of the post is about how much evidence there is for each column.

## The part of the low-code pitch that is under strain

The original Power Platform proposition was democratisation: business users build apps without writing code, and IT gets governance as a by-product of the platform everyone was going to use anyway. David Ramel of Visual Studio Magazine notes that this proposition "can appear less distinctive in the age of agentic AI, when natural-language coding tools let a much broader group of users 'vibe code' applications".

That is a fair observation, and it is consistent with what I saw. When I sat in front of Claude Code and asked it to build a Dataverse solution, I was not impressed by the platform. I was impressed by the agent. The platform felt like friction between the agent and the outcome.

Gartner's June 2026 guidance describes the same pressure from the demand side: business users are actively requesting Lovable, Replit, Claude Code and Codex, and "in most cases, software engineering leaders are under high executive pressure to give them the access while still being accountable for governance, security and long-term sustainability".

If the platform's only differentiator were "you do not have to write code", that differentiator is being eroded. I think that part of the argument is reasonably well supported.

## The part that may be more durable than it looks

Here is where I slow down. The fact that construction gets cheaper does not mean the obligations around what gets built get cheaper. Large corporates do not avoid spinning up new databases because they lack imagination. They avoid it because a database is a permanent obligation: permissions, audit trails, backup, retention, upgrade paths, integration with other solutions and systems, and the person who eventually leaves.

Coding agents do not remove that obligation. On the evidence I have seen, they relocate it. Instead of one governed database, you get a larger number of generated applications, each with its own connection strings and its own integrations, each owned by whoever prompted it, each potentially invisible to the central team.

The survey data supports this concern, though I want to be careful about what it can and cannot tell us. Retool's 2026 survey of 307 CTOs, CIOs and CISOs found that 93% are at least somewhat concerned about vibe-coded internal tools running in production, and 38% rank them among their top operational risks. Only 5% are very confident they have full visibility into all internal tools. And 51% said that when asked about production incidents caused by AI-generated internal tools, the honest answer was "not to my knowledge, but I can't say for certain".

The most interesting number to me is not the fear. It is the stated preference for where controls should live: 55% say security and access controls should live in a centralised platform underneath the app, while only 7% want them configured inside each generated app by the builder. That is a preference, not proof of what works. But it is a signal about where the buying centre wants the control plane.

The failure modes are also concrete enough to take seriously. A security review by Escape.tech analysed over 5,600 publicly available applications and identified more than 2,000 vulnerabilities, 400+ exposed secrets, and 175 instances of exposed personally identifiable information, including medical records. Medhat Galal, senior vice president of engineering at Appian, described the pattern in blunt terms: "It looks great and then they run into one problem after the other. If they can make it functional, they can't make it secure... You end up being a big maintainer of AI systems instead of building the application".

I do not think this proves that governed platforms win. It does suggest that the governance problem is not solved by better code generation, and that the problem may get larger as generation gets easier.

:::watch-it Who paid for the survey?
The survey that most strongly supports the governance argument comes from Retool, a company that sells governance tooling. That does not make the numbers wrong, but it does mean the questions were written by someone with an interest in the answer. I come back to this below.
:::

## What Microsoft appears to be doing

What I find more informative than the analyst commentary is Microsoft's own repositioning. The July 6, 2026 Dataverse announcement did not lead with "easier building". According to WindowsForum's analysis of the announcement, Microsoft is "trying to make Dataverse the governed substrate beneath agents, apps, copilots, and developer workflows".

The more specific argument in that announcement is that Dataverse can supply "the missing middle: not merely storage, and not merely a connector, but a governed operational environment where coding agents and business agents can touch enterprise data without bypassing role-based access control, authentication policy, or administrative oversight". The same analysis characterises Microsoft's strategy as trying to win "by making the boring enterprise substrate—identity, permissions, catalogs, connectors, certification, admin controls—feel like the safest path to production".

I read that as a concession dressed as a product announcement. It concedes that the building experience is no longer the moat. The bet is that the governance layer underneath the building experience is the moat instead.

Gartner has arrived at a similar split from a different direction. Its June 2026 guidance recommends that engineering leaders "do not provide direct access to vibe coding tools or AI coding agents", but instead "expose the access through a self-service platform that enforces governance, security, and usage controls by design". It further recommends AI-augmented low-code application platforms (AILCAPs) as "the default application development choices, where feasible", while limiting vibe coding platforms to prototypes and personal applications.

Gartner defines AILCAPs as platforms for "accelerated development and maintenance of applications, using model-driven development tools, prebuilt component catalogs, AI code assistants, and AI agents", with governance controls and insights built in. That definition is not identical to Dataverse, but the overlap is substantial. The analyst recommendation and Microsoft's repositioning point at the same architectural bet.

SharePoint makes a quieter version of the same argument. Its advantage was never that it was easier to build on. It is that governance is inherited from the surrounding Microsoft 365 estate: the same access controls, authentication and audit trail that apply everywhere else. An agent querying a list inherits those controls rather than reconstructing them. That is an architectural property, not a feature that can be generated from a prompt.

:::no-dumb-questions
**Q: What is an AILCAP?**

A: An AI-augmented low-code application platform: Gartner's name for a low-code platform that also includes AI code assistants and AI agents, with governance controls built in. Gartner recommends them as the default choice where feasible, and limits vibe coding platforms to prototypes and personal applications.

**Q: Why bring SharePoint into a post about Dataverse?**

A: Because it is the clearest example of governance being inherited rather than built. A SharePoint list sits inside the Microsoft 365 estate, so an agent that queries it gets the same access controls, authentication and audit trail as everything else, without anyone configuring them for that app.

**Q: Is this an argument against coding agents?**

A: No. I was impressed by the agent, not by the platform. The argument is about where the obligations land once the agent has finished building.
:::

## What the survey data cannot tell us

I want to be explicit about the limits of the evidence I am using, because I have been burned before by reading too much into a clean narrative.

Retool sells governance tooling. A survey that finds widespread demand for governance tooling is not neutral evidence, even if the underlying numbers are honestly reported. The report is not entirely consistent with itself either: one passage gives 59% for the "can't say for certain" answer where the chart gives 51%, and two of its charts cite 397 and 387 respondents rather than 307.

The 5,600-application sample from Escape.tech is a security research sample, not a representative census of enterprise applications. It is weighted toward publicly discoverable apps built on particular platforms, and most of it (about 4,000 apps) comes from Lovable. The Gartner figures (60% of vibe-coded applications retired by 2028, 30% of engineering teams under material capacity strain) are predictions, not observations, and Gartner itself disclaims that its publications should be construed as statements of fact.

My own experiments are two data points from one practitioner. They are useful for understanding failure modes. They are not evidence about what large enterprises will buy.

So the honest position is this: the direction of the signal is consistent across Microsoft's positioning, Gartner's guidance, the survey data and my own experience. But the signal is not yet strong enough to justify a confident prediction about market outcomes.

## What this might mean, if the signal holds

If the governance hypothesis is right, the practical implication is uncomfortable for the platform vendors and clarifying for buyers.

For the platform, the implication is that the maker experience stops being the product. The product becomes the governed substrate: first-class APIs, deterministic authoring surfaces, real drift detection, real diagnostic telemetry when a solution upgrade does something surprising, and an honest story about what happens when an agent-generated app goes wrong. That is less exciting to demo than a natural-language app builder. It is more durable as a business.

For the buyer, the implication is that the question to ask about a coding agent is not "how fast can it build?" It is "what does it inherit, and who owns it when it breaks?" If the answer is "nothing, and nobody", the speed is a liability dressed as productivity.

The formulation I keep coming back to is this: coding agents are the construction crew, and governed platforms are the building code, the inspection regime and the title deed. If construction gets cheaper, the building code does not become less important. It becomes more important, because more gets built, by more people, with less oversight.

:::fireside-chat Tonight: the construction crew and the building code
**Coding agent:** I built that app in an afternoon. Your way would have taken a month of clicking through editors.

**Governed platform:** I believe you. Who can see the data in it?

**Coding agent:** Whoever has the connection string. I put it in the config file.

**Governed platform:** And when the person who asked for it leaves?

**Coding agent:** Then somebody else will have to ask me to change it. If they know it exists.

**Governed platform:** That is my whole job: knowing it exists, knowing who can see it, and keeping a record of what happened. I am slower to build on. I may also be the reason the app is still safe to run in two years.

**Coding agent:** Or I could look after the app myself. Reviewing permissions, checking backups, applying upgrades: I can do all of that, and I do not get bored of it.

**Governed platform:** Then you will want one place where the permissions are defined, one audit log and one backup system to check. Otherwise you have a hundred apps and a hundred different jobs.

**Coding agent:** So you would be the thing I maintain against.

**Governed platform:** If I can make myself easy enough for you to work with. That is the part I have not got right yet.
:::

That is a hypothesis, not a conclusion. It is consistent with the evidence I have seen. It is also the kind of tidy framing that can survive longer than the facts warrant.

:::pencil Ask the buyer's question
Pick one internal app in your organisation that someone built recently, with or without a coding agent. Answer three questions about it:

1. What does it inherit: sign-in, permissions, audit, backup?
2. Who owns it if it breaks next year?
3. Would the central IT team find it if they went looking?

:::answer
There is no single right answer. If the answers are "nothing", "nobody" and "no", the app is exactly the kind of governance debt this post is about, however quickly it was built. If it sits on a governed platform, most of the first answer comes for free, and the other two are much easier to answer.
:::
:::

## The strongest counter-argument: agents that maintain

Everything above assumes that coding agents build things and then walk away, leaving people to carry the obligations. I think this is the weakest assumption in my own argument.

There is no reason why a coding agent cannot help to maintain a solution as easily as it creates a new one. Maintenance may even suit agents better than construction does. It is repetitive, it is rule-based, and most of it is reading what is already there and checking it against what should be there. An agent could review permissions on a schedule, check that backups ran and can actually be restored, apply platform upgrades and test them, keep a CI/CD pipeline green, and flag the app that nobody has touched in a year.

I have already seen a small version of this. In [Part 16](/posts/claudecode16/), the Dataverse plugin's `dv-admin` and `dv-security` skills turned on auditing, set an audit retention period, and checked and assigned security roles. None of that was construction. It was exactly the kind of work that gets forgotten after the app is built.

If agents take on maintenance, much of the case for governed platforms weakens. That case rests on obligations that people find tedious and forget. An agent does not find them tedious, and it does not forget.

Two things make me hesitate before concluding that the platform no longer matters.

1. **An agent needs something to maintain against.** Reviewing permissions is easy when they are defined in one place, and hard when every app invented its own. Checking backups needs a backup system. An audit needs an audit log. A governed platform is, among other things, a consistent surface that makes maintenance tractable. An agent looking after a hundred apps that each handle security differently has a hundred different jobs.
2. **Someone still has to be accountable.** An agent can do the work, and it can make the answer to "who owns this?" much easier to find. It is harder to see an agent being the answer.

So the shift may not be from governed platforms to ungoverned agents. It may be to agents as the maintenance crew, working on a governed substrate. If that is right, the strongest form of the governance argument is not "people will not maintain these apps". It is "agents will maintain them best when there is one consistent platform underneath". I hold that loosely too: the next generation of agents may simply be good at maintaining a hundred inconsistent apps.

## What I am still not sure about

There are several things I do not know, and I would rather name them than paper over them.

I do not know whether enterprises will actually buy the governed-substrate story, or whether they will buy cheaper construction and accept the governance debt as a cost of speed. The Retool data suggests they are worried, but worry is not the same as willingness to pay.

I do not know whether Microsoft can execute the governance-substrate story well enough. My own experience with the Dataverse Skills plugin suggests the current programmatic surface is not yet good enough to make the governed path the path of least resistance. A governance layer that is harder to use than the ungoverned alternative will lose to the ungoverned alternative, regardless of how sound its architecture is.

I do not know how much of the current friction is transitional and how much is structural. The path bugs and toolchain fragmentation I hit may be fixed. The deeper problem, that the maker portal was designed for humans clicking through graphical editors and not for agents driving APIs, may not be fixed as quickly.

And I do not know whether the "governance" framing is genuinely Microsoft's strategic bet or a post-hoc rationalisation of a platform whose original pitch is weakening. The July 2026 language is consistent with a real strategic shift. It is also consistent with good marketing.

## A working hypothesis, not a verdict

If I had to state my current position in one sentence, it would be this: the claim that Dataverse is worth using because it is easier than code is getting weaker, and the claim that it is worth using because it owns the blast radius is getting stronger, but I would not bet the architecture on that yet without seeing whether the platform can make governance the path of least resistance.

What would change my mind? Three things, roughly.

1. If enterprises show through actual purchasing behaviour that they prefer ungoverned speed and are willing to absorb the maintenance and security consequences, the governance pitch is weaker than it looks.
2. If Microsoft ships a programmatic surface that makes the governed path genuinely easier than the alternative (not just safer, but easier), the hypothesis gains support.
3. If the current generation of coding agents turns out to be a transient phase, and the next generation solves the ownership and maintainability problem natively, the whole framing shifts again. This is the one I now think matters most, for the reasons in the previous section.

I do not know which of those will happen. What I do know is that the question has moved. It is no longer "can AI build the app?" It is "who owns what gets built?" That is a harder question, and it is not one that code generation answers by itself.

:::bullet-points In short
- Coding agents make building cheaper. They do not make the obligations around what gets built any cheaper.
- The "you do not have to write code" pitch for low-code platforms is weakening.
- The "we own the blast radius" pitch may be getting stronger, and Microsoft's own Dataverse announcement points that way.
- The evidence is consistent but not conclusive: a vendor survey, a skewed security sample, analyst predictions, and two experiments of my own.
- A governed path that is harder to use than the ungoverned one will lose, however sound its architecture.
- Coding agents may maintain solutions as well as they build them, and that is the strongest challenge to the governance argument.
- Even then, agents probably maintain best against one consistent, governed platform, and a person still has to be accountable.
- The question has moved from "can AI build the app?" to "who owns what gets built, and who looks after it?"
:::

## References

- David Ramel, [Low-Coding in the Age of AI: Dataverse Embraces Copilot, Claude and Cursor](https://visualstudiomagazine.com/articles/2026/07/14/low-coding-in-the-age-of-ai-dataverse-embraces-copilot-claude-and-cursor.aspx), Visual Studio Magazine, July 14, 2026
- WindowsForum, [Dataverse Expands Coding Agent Plugin to Claude, Cursor, and Copilot with MCP Governance](https://windowsforum.com/news/dataverse-expands-coding-agent-plugin-to-claude-cursor-and-copilot-with-mcp-governance.435235/), an analysis of Microsoft's July 6, 2026 Dataverse announcement
- Gartner, [Govern Vibe Coding for Citizen Developers With Self-Service Platforms](https://www.gartner.com/doc/reprints?id=00ThR00000CtN1yUAF&ct=260828&st=sb), Nitish Tyagi, June 29, 2026, ID G00858202
- Gartner, [Magic Quadrant for AI-Augmented Low-Code Application Platforms](https://www.gartner.com/doc/reprints?id=00ThR00000Ix62DUAR&ct=260930&st=sb), September 28, 2026, ID G00841123
- Retool, [The State of AI Governance in 2026](https://retool.com/blog/ai-governance-report-2026), June 17, 2026
- Escape.tech, [Methodology: How we discovered over 2k high-impact vulnerabilities in apps built with vibe coding platforms](https://escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding/), October 29, 2025
- SiliconANGLE, [AI writes enterprise code fast. Cleaning it up is another story entirely](https://siliconangle.com/2026/04/28/ai-generated-code-cant-vibe-way-past-enterprise-reality-appianworld/), April 28, 2026
- My earlier experiments: [Claude Code (Part 13): building dv-generate](/posts/claudecode13/) and [Claude Code (Part 16): Microsoft's Dataverse plugin](/posts/claudecode16/)
