---
title: "Azure Foundry Agent"
part: 4
description: "Building a supervisor agent in Microsoft Foundry that answers Minnesota traffic-law questions by calling six specialist agents over the Agent2Agent protocol, with the setup, the three errors I hit, and a first look at what the supervisor does"
date: "2026-10-28"
categories: ["AI", "Azure"]
image: "/assets/images/azurefoundryagent5/posts-meta.svg"
tags: "azure-ai-foundry, subagents, a2a, agent-orchestration, prompt-agents, legal-research"
hidden: false
slug: "azurefoundryagent5"
---

# Subagents in Foundry: a supervisor and six specialists

:::watch-it This is an early version
I built the agents and ran the first questions, and this post shows the build. I have not finished the test. The comparison with one agent that holds every document, and the full set of 62 questions, are still to come, and I will update this post when they are done. Everything below that sounds like a result comes from the first 32 questions only.
:::

In [orchestration1](/posts/orchestration1/) I compared several ways to build an agent that answers questions about Minnesota traffic and car law from six documents. One of them was **subagents**: a supervisor decides which specialist to ask, rewrites the question, and each specialist holds one document. I built that with LangChain on my own Mac.

In this post I build the same design in Microsoft Foundry. In [Part 3](/posts/azurefoundryagent4/) I built a voice agent from a template and gave it a tool. Here every agent is a plain prompt agent, and the new part is how one agent calls another.

:::brain-power Before you read on
In LangChain a subagent is a tool that the supervisor calls. Foundry has prompt agents but, as I found out, no longer has a tool that wraps one agent inside another. What would you use instead, and what would have to be true for the call to work?
:::

## Where "connected agents" went

Foundry used to have a feature called Connected Agents, in which one agent held others as tools. Microsoft's documentation says it is not available in the new Foundry Agent Service. It gives two replacements:

- **The A2A tool.** An agent calls any endpoint that speaks the [Agent2Agent protocol](https://a2a-protocol.org/latest/), including another Foundry agent with incoming A2A switched on.
- **Workflows.** A declarative flow that runs several agents in sequence, in a group chat, or with a person in the loop.

A supervisor that decides at run time which specialist to call is closest to the A2A tool, so I used that. The mapping from orchestration1 is direct:

| In orchestration1 (LangChain) | In Foundry |
|---|---|
| Supervisor agent | Prompt agent `mn-law-supervisor` |
| One tool per specialist | One A2A tool per specialist |
| Specialist agent holding one document | Prompt agent with the document in its instructions, incoming A2A enabled |
| The tool's description | The specialist's agent card |
| Credentials | A project connection of type `RemoteA2A` |

## The six specialists

Each specialist is a prompt agent whose instructions are a short set of rules followed by one of the six documents. The documents are the ones from orchestration1: speeding, the hands-free phone law, driving while impaired, reckless driving, lemon law and car sales, and car accidents. They run from 2,586 to 5,924 words, and none of them is long enough to need a search index.

```python
RULES = """You are the {title} specialist in a Minnesota traffic and car law service.

Answer only from the document below. Quote the statute or case that supports each point, with its
section number. If the document does not cover the question, say so plainly and do not guess or
fill the gap from memory. If the question depends on a fact you were not given, say which fact it
depends on instead of assuming it. Keep the answer short. This is general information, not legal
advice.

--- DOCUMENT ---
"""

agent = project.agents.create_version(
    agent_name=agent_name(area),
    definition=PromptAgentDefinition(model=model, instructions=RULES.format(title=title) + doc),
)
```

Creating the agent is not enough for another agent to call it. Incoming A2A is off by default, and the portal cannot switch it on yet, so I used the SDK to add an **agent card** and enable the protocol.

```python
project.agents.update_details(
    agent_name=name,
    agent_endpoint=AgentEndpointConfig(
        protocol_configuration=ProtocolConfiguration(
            responses=ResponsesProtocolConfiguration(), a2a=A2AProtocolConfiguration())),
    agent_card=AgentCard(
        version="1.0", description=about,
        skills=[AgentCardSkill(id=area, name=title, description=about)]),
)
```

The agent card is what a calling agent sees about its target, so the `description` is doing the job that a tool description does in LangChain. I wrote one sentence for each area, such as "Questions about using or holding a phone or other device while driving."

I asked the phone specialist a question directly before I connected anything, to check it worked alone.

```PROMPT
Is it illegal to hold my phone at a red light?
```

It answered from its document and quoted § 169.475, subd. 2(a) and the rule that a car stopped at a traffic light is still part of traffic. The call used 3,647 input tokens.

![](assets/images/azurefoundryagent5/agents-list.jpg)
*I opened the Agents list and found the six specialists, the supervisor and the flat agent I will use as a baseline*

## Connecting the supervisor to the specialists

Each specialist needs a project connection that stores its A2A address and how to sign in to it. The target is the specialist's A2A base path, `.../agents/<name>/endpoint/protocols/a2a`, and the authentication is the calling agent's own identity, so there is no key to store.

```python
body = {"properties": {"authType": "AgenticIdentityToken", "category": "RemoteA2A",
                       "target": f"{endpoint}/agents/{agent_name(area)}/endpoint/protocols/a2a",
                       "audience": "https://ai.azure.com", "Credentials": {}, "metadata": {}}}
# PUT .../connections/a2a-<area>?api-version=2025-04-01-preview
```

The six connections appear in the portal under **Tools**, with the type Agent2Agent (A2A).

![](assets/images/azurefoundryagent5/tools-a2a-connections.jpg)
*I opened Tools and found the six a2a connections next to the MCP connection from Part 3*

I opened one to see what Foundry stored. The authentication is "Microsoft Entra Agent Identity", and the page gives the connection ID that an agent uses to refer to it.

![](assets/images/azurefoundryagent5/a2a-connection-details.jpg)
*I opened a2a-speeding and read its endpoint, its authentication and its connection ID*

## The supervisor

The supervisor holds no law. Its instructions tell it to pick the areas, rewrite the question so that it stands on its own, call the specialists, and build the answer only from what they return. A question outside the six areas gets no call at all.

```python
INSTRUCTIONS = """You answer questions about Minnesota traffic and car law by asking specialists.
You have six specialist tools, one for each area of law. You hold no law yourself.

1. Decide which area or areas the question belongs to. A question can need more than one.
2. Rewrite the question for each specialist so that it stands on its own: put in the facts the user
   gave, leave out the rest. Then call that specialist.
3. If the question does not belong to any area, call no specialist and say it is outside what you cover.
4. Build the final answer only from what the specialists returned. Keep their section numbers.
   If a specialist says its document does not cover something, say so. Do not fill the gap yourself.
This is general information, not legal advice."""

tools = [A2ATool(a2a_version=A2AProtocolVersion.V1_0, base_url=target, project_connection_id=f"a2a-{area}")
         for area in AREAS]
```

![](assets/images/azurefoundryagent5/supervisor-playground.jpg)
*I opened mn-law-supervisor in the playground and found its instructions and its six A2A tools*

## Three errors before the first answer

The first call to the supervisor failed three times, with three different messages. Each one told me something about how the connection works.

:::watch-it Three errors, and the last one was a permission
1. `does not have a valid target URL specified, and no server URL was provided`. I had passed the full Azure resource ID of the connection and nothing else. Adding `base_url` to the tool fixed this message.
2. `Connection ... not found`, with the full resource ID and the base URL. The connection existed, and both the portal and the SDK could read it. Passing the connection **name**, `a2a-speeding`, instead of the ID, gave the same message in shorter form.
3. The cause of the last one was permission. The supervisor has its own identity, and that identity needs the **Foundry Agent Consumer** role before it can call another agent's endpoint. Microsoft's documentation says so, and the error message does not. I assigned the role on the project to the supervisor's `instance_identity`, and the call worked at once.
:::

```bash
az role assignment create \
  --assignee-object-id <supervisor instance_identity principal id> \
  --assignee-principal-type ServicePrincipal \
  --role eed3b665-ab3a-47b6-8f48-c9382fb1dad6 \
  --scope <project resource id>
```

## What one call looks like

I asked the supervisor the same phone question, and then a speeding question. A response from a Foundry agent is a list of output items, and a call to a specialist appears as two of them: the call and its output.

```json
{ "type": "a2a_preview_call",
  "name": "a2a-speeding",
  "arguments": "{\"message\":{\"parts\":[{\"kind\":\"text\",\"text\":\"In Minnesota, what is the speed limit in an urban district when nothing is posted? Please answer the default speed limit rule ...\"}]}}" }
{ "type": "a2a_preview_call_output",
  "name": "a2a-speeding",
  "output": "In an urban district with no posted limit, the default statutory speed limit is **30 mph**. The document says ..." }
{ "type": "message", "phase": "final_answer", "content": "... the default speed limit in an urban district when nothing is posted is **30 mph** ..." }
```

That is everything I need to check the design. The `name` says which specialist the supervisor chose, `arguments` holds the question as the supervisor rewrote it, and `output` is what the specialist said. In orchestration1 I scored "did it call the right specialists" from the same three pieces of information.

:::no-dumb-questions
**Q: The item type says `preview`, but I asked for A2A version 1.0. Why?**
A: I do not know yet. The tool was created with `A2AProtocolVersion.V1_0`, and the output items are still called `a2a_preview_call`. I will find out before I finish this post.

**Q: Does the supervisor's token count include the specialists?**
A: No. The specialist runs inside the A2A call and its tokens are not in the supervisor's usage. The phone question used 2,725 input tokens at the supervisor and the specialist's own call, made separately, used 3,647. Any cost comparison with one big agent has to add them up, not read the supervisor's number.
:::

## A first look: the supervisor can stop too early

I ran the first 32 of orchestration1's 62 single-turn questions through the supervisor, two at a time, and scored them the way I did there: did it call the expected specialists, and does the answer contain the required facts.

| Category | Questions | Required facts present | Expected specialists called |
|---|---|---|---|
| Single area | 19 | 12 | 13 |
| More than one area | 4 | 3 | 1 |
| Noisy wording | 3 | 2 | 2 |
| Outside the six areas | 6 | 6 | 5 |
| **All** | **32** | **23** | **21** |

The numbers matter less than one pattern in them. On nine questions that belong to one of the six areas, the supervisor called no specialist at all. It wrote a line announcing what it was about to do, and then stopped.

> I'm going to check a Minnesota DWI specialist for the exact legal threshold.

That was the whole answer to "What blood alcohol level makes it a DWI for a regular driver?" A user would see a promise and no result. The specialist for that question worked when I called it directly, so the fault is in the supervisor, not in the documents. I have not fixed it, and I have not yet tried the obvious changes, which are to tell the supervisor to call a tool before it replies and to set the tool choice to required. I will run those and keep both sets of results, so the post shows the before and after.

I also hit the token limit of the model deployment, and that is a result too. Foundry returned `exceeded token rate limit` to a question I typed into the playground while another test was running.

![](assets/images/azurefoundryagent5/playground-rate-limit-error.jpg)
*I typed a question into the supervisor's playground and got a token rate limit error while another test was running*

## What is still to do

- Fix the supervisor so that it always calls a specialist when the question belongs to one, and compare the new results with the ones above.
- Run all 62 questions, and the eight held-out ones.
- Build the baseline: one agent that holds all six documents, about 25,900 words, in a single prompt. In orchestration1 this was the design to beat. Each question costs roughly 40,000 input tokens here, and it is the run that used up the quota.
- Take screenshots of the supervisor answering in the playground and of its traces.
- Find out why the call items say `preview`.

:::bullet-points What I know so far
- **Foundry has no Connected Agents any more.** The A2A tool replaces it, and each specialist needs incoming A2A enabled with the SDK, because the portal cannot do it yet.
- **A supervisor needs the Foundry Agent Consumer role on its own identity.** Without it, the error says the connection was not found, which sent me looking in the wrong place.
- **Each call is visible.** The output items name the specialist and show the rewritten question and the answer.
- **The supervisor can reply without calling anything.** It happened on nine of the first 32 questions, and it is the first thing I will fix.
:::

## Cleaning up

I have not run any of these commands. The agents and connections stay in the project until I do.

```python
for area in AREAS:
    project.agents.delete(agent_name(area))
project.agents.delete("mn-law-supervisor")
project.agents.delete("mn-law-flat")
```

Delete the six `a2a-<area>` connections from **Tools** in the portal, or with `az rest --method delete` against each connection, and remove the role assignment for the supervisor's identity.

## References

- [Connect to an A2A agent endpoint from Foundry Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/agent-to-agent)
- [Enable incoming A2A on a Foundry agent](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/enable-agent-to-agent-endpoint)
- [Agent Orchestration, part 1: the same design built with LangChain](/posts/orchestration1/)
- [Part 3: the legal intake voice agent](/posts/azurefoundryagent4/)
