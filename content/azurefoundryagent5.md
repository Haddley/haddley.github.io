---
title: "Azure Foundry Agent"
part: 4
description: "Building a supervisor agent in Microsoft Foundry that answers Minnesota traffic-law questions by calling six specialist agents over the Agent2Agent protocol, and testing it on 62 questions against one agent that holds every document"
date: "2026-10-28"
categories: ["AI", "Azure"]
image: "/assets/images/azurefoundryagent5/posts-meta.svg"
tags: "azure-ai-foundry, subagents, a2a, agent-orchestration, prompt-agents, legal-research"
hidden: false
slug: "azurefoundryagent5"
---

# Subagents in Foundry: a supervisor and six specialists

In [orchestration1](/posts/orchestration1/) I compared several ways to build an agent that answers questions about Minnesota traffic and car law from six documents. One of them was **subagents**: a supervisor decides which specialist to ask, rewrites the question, and each specialist holds one document. I built that with LangChain on my own Mac.

In this post I build the same design in Microsoft Foundry, and test it on the same 62 questions. In [Part 3](/posts/azurefoundryagent4/) I built a voice agent from a template and gave it a tool. Here every agent is a plain prompt agent, and the new part is how one agent calls another.

Here is where it ended up, on 62 questions with a simple check that the required facts appear in the answer:

| Design | In-scope questions with the required facts | Routed as expected | Seconds for 62 questions | Input tokens for 62 questions |
|---|---|---|---|---|
| Supervisor and seven specialists over A2A | 50 of 56 (89%) | 55 of 62 (89%) | 434 | about 566,000 (estimated) |
| One agent holding all six documents | 56 of 56 (100%) | not applicable | 668 | 2,174,855 |

The supervisor used about a quarter of the tokens and was faster, and it scored lower, which is the trade I expected: less context per question costs some answers. The six out-of-scope questions have no required facts, so a keyword check cannot fail them, and I leave them out of the facts column. The rest of this post shows how I built it, the connection errors I hit, how it did on the 62 questions, what happens when a specialist needs more information, and where it still goes wrong.

:::brain-power Before you read on
In LangChain a subagent is a tool that the supervisor calls. Foundry has prompt agents but, as I found out, no longer has a tool that wraps one agent inside another. What would you use instead, and what would have to be true for the call to work?
:::

## Where "connected agents" went

Foundry used to have a feature called Connected Agents, in which one agent held others as tools. Microsoft's documentation says it is not available in the new Foundry Agent Service. It gives two replacements:

- **The A2A tool.** An agent calls any endpoint that speaks the [Agent2Agent protocol](https://a2a-protocol.org/latest/), including another Foundry agent with incoming A2A switched on.
- **Workflows.** A declarative flow that runs several agents in sequence, in a group chat, or with a person in the loop.

A supervisor that decides at run time which specialist to call is closest to the A2A tool, so I used that. I did not build a workflow, because the workflow page says Foundry is retiring workflows on 1 December 2026 and tells anyone building new ones to use Microsoft Agent Framework. A fixed-routing design, where code picks the specialist and the model does not decide, would be worth trying there, and I have not.

The mapping from orchestration1 is direct:

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

The agent card is what a calling agent sees about its target, so the `description` is doing the job that a tool description does in LangChain. I wrote one sentence for each area, such as "Questions about using or holding a phone or other device while driving." I fetched the phone specialist's card with a signed-in request to check it. It lists the endpoint three ways, JSON-RPC for A2A 1.0, JSON-RPC for 0.3 and HTTP+JSON for 0.3, and it says text is the only input and output mode and that streaming is off.

I asked the phone specialist a question directly before I connected anything, to check it worked alone.

```PROMPT
Is it illegal to hold my phone at a red light?
```

It answered from its document and quoted § 169.475, subd. 2(a) and the rule that a car stopped at a traffic light is still part of traffic. The call used 3,647 input tokens.

![](assets/images/azurefoundryagent5/agents-list.jpg)
*I opened the Agents list and found the six specialists, the supervisor and the flat agent I used as a baseline*

## Connecting the supervisor to the specialists

Each specialist needs a project connection that stores its A2A address and how to sign in to it. The target is the specialist's A2A base path, `.../agents/<name>/endpoint/protocols/a2a`, and the authentication is the calling agent's own identity, so there is no key to store.

```python
body = {"properties": {"authType": "AgenticIdentityToken", "category": "RemoteA2A",
                       "target": f"{endpoint}/agents/{agent_name(area)}/endpoint/protocols/a2a",
                       "audience": "https://ai.azure.com", "Credentials": {}, "metadata": {}}}
# PUT .../connections/a2a-<area>?api-version=2025-04-01-preview
```

The connections appear in the portal under **Tools**, with the type Agent2Agent (A2A).

![](assets/images/azurefoundryagent5/tools-a2a-connections.jpg)
*I opened Tools and found the six a2a connections next to the MCP connection from Part 3*

I opened one to see what Foundry stored. The authentication is "Microsoft Entra Agent Identity", and the page gives the connection ID that an agent uses to refer to it.

![](assets/images/azurefoundryagent5/a2a-connection-details.jpg)
*I opened a2a-speeding and read its endpoint, its authentication and its connection ID*

## The supervisor

The supervisor holds no law. Its instructions tell it to pick the areas, rewrite the question so that it stands on its own, call the specialists, and build the answer only from what they return. A question outside the six areas goes to a seventh specialist, `mn-law-outside`, whose only job is to say the question is outside the six areas and name them.

```python
INSTRUCTIONS = """You answer questions about Minnesota traffic and car law by asking specialists.
You have seven specialist tools: one for each of six areas of law, and one for anything outside them.
You hold no law yourself.

1. Decide which area or areas the question belongs to. A question can need more than one.
2. Rewrite the question for each specialist so that it stands on its own: put in the facts the user
   gave, leave out the rest. Then call that specialist. Call every specialist the question needs.
3. If the question does not belong to any of the six areas, call the outside specialist.
4. Build the final answer only from what the specialists returned. Keep their section numbers.
   If a specialist says its document does not cover something, say so. Do not fill the gap yourself.
This is general information, not legal advice."""

tools = [A2ATool(a2a_version=A2AProtocolVersion.V1_0, base_url=target, project_connection_id=conn)
         for conn in connections]

agent = project.agents.create_version(
    agent_name="mn-law-supervisor",
    definition=PromptAgentDefinition(model=model, instructions=INSTRUCTIONS, tools=tools,
                                     tool_choice="required"))
```

The line that matters most is `tool_choice="required"`. It makes every response start with a tool call, so the supervisor cannot answer from its own memory or stop at a sentence that announces a call. The seventh specialist exists because of that setting: the six out-of-scope questions must not reach a legal specialist, and with a call required they need somewhere else to go. The supervisor is still all A2A.

![](assets/images/azurefoundryagent5/supervisor-playground.jpg)
*I opened the supervisor in the playground and found the seven-tool instructions and the A2A tools*

## Connection errors

A call from the supervisor to a specialist can fail with three different messages before it works.

| Message | What I saw |
|---|---|
| `does not have a valid target URL specified, and no server URL was provided` | The tool had only the connection's full Azure resource ID. Adding `base_url` to the tool changed this message. |
| `Connection ... not found` | The connection existed, and the portal and the SDK could both read it. It appeared when I called a connection straight after creating it. One connection, `a2a-outside`, kept returning it for more than eight minutes. Two connections that I created and then left alone for four and five minutes worked on their first call. |
| `Failed to fetch agent card: ... 404 ... not accessible to the configured identity` | It appeared for a new agent whose own identity had no role. About three minutes after I assigned the **Foundry Agent Consumer** role to that identity, the same call worked. |

```bash
az role assignment create \
  --assignee-object-id <supervisor instance_identity principal id> \
  --assignee-principal-type ServicePrincipal \
  --role eed3b665-ab3a-47b6-8f48-c9382fb1dad6 \
  --scope <project resource id>
```

Two rules follow from what I saw. Create the connections first and do not call them for about five minutes. And give every agent that holds A2A tools the Foundry Agent Consumer role on the project. Each agent has its own identity, so a second supervisor needs its own assignment. This is what happened to me on three connections and two agents, and it is not documented behaviour.

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

![](assets/images/azurefoundryagent5/playground-dwi-answer.jpg)
*I asked the supervisor the DWI question in the playground and found the call, the call output and the message in the response*

The portal's trace view lists the same three items. It tells you that the detail comes from the agent's responses and that to see distributed traces you connect Application Insights, which I did not do.

![](assets/images/azurefoundryagent5/response-trace.jpg)
*I opened the trace for that response and found the three items under a single response*

:::no-dumb-questions
**Q: The item type says `preview`, but I asked for A2A version 1.0. Why?**
A: I read the agent back with the SDK. The tool is stored as type `a2a` with `a2a_version` 1.0, which Microsoft lists as the generally available version. So the `preview` is in the name of the output item, not in the tool I created. I cannot see which protocol version Foundry used on the wire, so I do not claim one.

**Q: Does the supervisor's token count include the specialists?**
A: No. The specialist runs inside the A2A call and its tokens are not in the supervisor's usage. I estimate them below from the size of each document.
:::

## The test

I used the 62 single-turn questions from orchestration1. Each one is labelled with the specialists it should reach and the facts the answer must contain. There are 43 single-area questions, 9 that need more than one area, 4 with noisy wording, and 6 outside the six areas, where the right move is to call no specialist.

I scored each answer two ways, the same as the first half of orchestration1. **Facts** means every required fact appears in the answer, which is a keyword check. **Routed** means the set of specialists the supervisor called matches one of the expected sets. I ran every question three times through the supervisor and once through the flat agent, and never ran two designs at the same time. I stopped a second flat run at 33 of 62 questions to save tokens, so the flat agent's score rests on one run.

I also built the baseline from orchestration1: one agent, `mn-law-flat`, with all six documents in its instructions, about 25,900 words in a single prompt.

## The results

| Design | In-scope questions with the facts (56) | Routed (62) | Seconds for 62 questions |
|---|---|---|---|
| Supervisor, run 1 | 50 (89%) | 55 | 434 |
| Supervisor, run 2 | 46 (82%) | 54 | 443 |
| Supervisor, run 3 | 50 (89%) | 55 | 439 |
| One agent holding all six documents | 56 (100%) | not applicable | 668 |

By category in run 1, the supervisor had the required facts on 40 of 43 single-area questions, 6 of 9 multi-area questions and 4 of 4 noisy questions. On 55 of the 56 in-scope questions it made at least one specialist call. Across the three runs, the specialists called were identical on 56 of the 62 questions, and 52 questions had the required facts in all three runs. So the score is fairly steady, but a run can lose a few answers, as run 2 did.

### Checking the answers, not only the keywords

A keyword check is blunt. It cannot fail the six out-of-scope questions, and it fails an answer that writes "10%" where the check wants "ten percent". So I also had a model grade some answers against the source documents. It does not know which design wrote an answer, and it sees only the documents for that question's areas. I picked 19 questions: the 9 where the supervisor missed a keyword or the routing, plus 10 chosen at random. That model is `gpt-5.4-mini`, the same family as every agent in this post, because it was the only model I had quota for. A grader from the same family can be lenient.

| | Passed the judge (19 questions) |
|---|---|
| Supervisor | 14 |
| One agent holding all six documents | 15 |

I read five of the disputed answers myself, and the judge was wrong on three of them.

- **Too strict on the flat agent, twice.** For the stop-sign fine, the flat agent said the documents give no amount and then quoted a petty misdemeanor maximum of $300. That figure is in the speeding document, so the answer is grounded. For the breath-test question it cited two DWI cases, and both are in the DWI document.
- **Too lenient on the supervisor, once.** For "I was texting while doing 105 mph", the supervisor covered only the phone penalty. It never mentioned the speed or the six-month revocation, and the judge passed it.
- **Right on the other two.** The supervisor wrongly said a question about gross negligence was outside its areas, which is a real failure. And its lemon-law deduction answer, "10 cents per mile or 10% of the purchase price", was right, so the keyword check was the one at fault.

With those three corrections, the totals are about 13 for the supervisor and 17 for the flat agent out of 19. I read only five of the 38 answers, so treat those totals as approximate. In the 10 random questions, both designs did well, and the judge failed one flat answer that I judged to be grounded.

### Where the supervisor still goes wrong

- **Multi-area questions.** It made 64 specialist calls for 62 questions, so it almost never asked two specialists. "I was texting while doing 105 mph" went to the phone specialist and not to speeding. A DWI-against-speeding comparison went to the DWI specialist alone.
- **Two out-of-scope questions reached a specialist.** "What is the speed limit in Wisconsin?" and a question about the fine for running a stop sign both went to the speeding specialist. In a separate test of the Wisconsin question the supervisor used the outside specialist, so this varies from run to run.
- **Misroutes.** One question went to the outside specialist that belongs to reckless driving, one went to the reckless specialist that belongs to speeding, and one went to the accident specialist that belongs to DWI.
- **Six answers missed a keyword.** Five were real misses. The sixth, the lemon-law deduction, was right and wrote "10%" where the check wanted "ten percent".

### The cost

The supervisor's own usage was 195,540 input tokens for 62 questions, against 2,174,855 for the flat agent, but that number leaves out the specialists. I estimated them. The phone specialist used 3,647 input tokens for a 2,586-word document, about 1.35 tokens a word, so I applied that rate to the document each call used. The 64 specialist calls come to about 371,000 input tokens, and the whole supervisor design to about 566,000. That is 3.8 times fewer than the flat agent. It is an estimate, because Foundry does not report the specialists' tokens.

It took 434 seconds for the supervisor and 668 for the flat agent, so the supervisor was also faster, even though each question makes two model calls in sequence.

## When a specialist needs more information

In orchestration1 an agent could pause and ask the user a question with `ask_user`. The matching feature in A2A is a task state called `input-required`. A supervisor has to handle a specialist that needs a fact, so I tested it on one question, twice. It is the lemon-law question "My car has been in the shop three times for the same issue. Do I qualify for a refund?", where the answer depends on whether the car was bought new or used. I used separate test agents: a lemon-law specialist told to ask one short question when it does not know whether the car was new or used, and a supervisor that holds only that specialist.

**The question comes back as a finished answer.** I called the specialist directly with the A2A client library. The reply was a task whose state was `TASK_STATE_COMPLETED`, not `TASK_STATE_INPUT_REQUIRED`, and the question was in the task's artifact text. The task also carried a `contextId`. My second message, sent with that `contextId`, was answered for a used car without being asked again. So the supervisor has to read the text to know that a reply is a question.

**The supervisor can relay it.** In the first run, the supervisor's instructions told it to rewrite each question so that it stands on its own (rule 1), and then:

```text
2. If the specialist's reply is a question for the person, not an answer, pass that question on to the user in your own
   reply and stop. Do not answer it yourself and do not guess.
3. When the user answers, send their answer to the same specialist, then build your reply from what it returns.
```

On the first turn it called the specialist, received "I need one fact first: was the car bought new or used?", and put that question to the user. On the second turn it sent the user's reply to the specialist, together with the facts from earlier, and the specialist gave the used-car answer.

```json
{ "type": "a2a_preview_call", "name": "a2a-lemon-ask",
  "arguments": "{\"message\":{\"parts\":[{\"kind\":\"text\",\"text\":\"The user says: The car was a used car from a dealer, and it had about 50,000 miles when they bought it. They previously said the car has been in the shop three times for the same issue. Please explain whether they may qualify for a refund ...\"}]}}" }
```

In a second run I changed rule 3 to "send the user's words to the same specialist exactly as written", and set `tool_choice` to required. This time the specialist did not ask on the first turn. The supervisor forwarded the user's sentence unchanged on the second turn, and the specialist gave a used-car answer.

:::watch-it Three things this does not show
- **With the automatic tool choice, one version of this supervisor called the specialist and another announced a call and made none, on both turns.** This agent holds one specialist, so the failure is not caused by having seven tools. The run with a required tool call made both calls.
- **The specialist asked in one of two runs.** In the other it answered both branches, new and used. Telling a specialist to ask is not enough on its own.
- **I could not tell whether Foundry keeps the specialist's conversation through the supervisor's tool.** The call has no `contextId`, and the user's reply alone produced a similar answer. The safe pattern is the one in the first run: restate what the specialist needs in each call.
:::

The 62-question supervisor does none of this. Its specialists are told to say which fact an answer depends on, not to ask for it, and its instructions have no rule for relaying a question.

## The rate limit, and what it did to the test

The flat agent needs about 35,000 input tokens a question, so running four at a time used up the deployment's tokens-per-minute limit, and a question I typed into the supervisor's playground at the same time failed.

![](assets/images/azurefoundryagent5/playground-rate-limit-error.jpg)
*I typed a question into the supervisor's playground and got a token rate limit error while the flat agent's test was running*

The deployment had 100,000 tokens a minute, and my subscription allows 200,000 for this model, so I raised it to that. After that the flat agent ran all 62 questions with no errors, one question at a time. The limit is per minute and I did not see a weekly one.

## What I conclude, and what I do not

For this task, on these 62 questions, the single agent that held all six documents was more accurate than my supervisor on every check I ran, and it needed no routing. The supervisor used about a quarter of the tokens and was faster. If the documents did not fit in one prompt, or if the cost mattered more than the last six answers, the supervisor would be the answer. The six documents fit in one prompt here, which is why the flat agent works at all.

I did not test any of this:

- **Most answers by anything but keywords.** A model judged 19 of the 62 questions, and I read five answers. The rest are keyword checks only.
- **A flat agent run twice.** Its second run stopped at 33 questions to save tokens.
- **The eight held-out questions and a full conversation.** The clarification test above is one question, run twice.
- **A fixed-routing design.** I did not build a workflow or an Agent Framework router, so I cannot say whether code that picks the specialist would handle the multi-area questions better.
- **Removing the role from an agent that worked.** I tested a new agent without the role and then with it.

:::bullet-points What I know
- **Foundry has no Connected Agents any more.** The A2A tool replaces it, and each specialist needs incoming A2A enabled with the SDK, because the portal cannot do it yet.
- **Each call is visible.** The output items name the specialist and show the rewritten question and the answer.
- **A required tool call keeps the supervisor from answering without asking.** It needs an outside specialist so that out-of-scope questions still have somewhere to go.
- **A specialist's question arrives as a finished answer.** Foundry did not use `input-required`, so the supervisor has to read the text.
- **Every agent with A2A tools needs the Foundry Agent Consumer role,** and a new connection needs about five minutes before its first call.
- **The supervisor traded accuracy for cost.** It had the required facts on 50 of 56 in-scope questions against 56 of 56 for one agent holding everything, and used about a quarter of the tokens.
- **Multi-area questions are its weak spot.** It made 64 specialist calls for 62 questions.
:::

## Cleaning up

I have not run any of these commands. The agents and connections stay in the project until I do.

```python
for area in AREAS:
    project.agents.delete(agent_name(area))
for name in ("mn-law-supervisor", "mn-law-outside", "mn-law-flat", "mn-law-lemon-ask", "mn-law-ask-supervisor"):
    project.agents.delete(name)
```

Delete the connections from **Tools** in the portal, or with `az rest --method delete` against each one. There are six `a2a-<area>` connections, `a2a-offscope` that the supervisor uses for the outside specialist, `a2a-outside`, which my failed first attempt left behind, and `a2a-lemon-ask` for the clarification test. Remove the role assignments for the two supervisors' identities too. The raised token limit on the deployment stays until I lower it.

## References

- [Connect to an A2A agent endpoint from Foundry Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/agent-to-agent)
- [Enable incoming A2A on a Foundry agent](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/enable-agent-to-agent-endpoint)
- [Build a workflow in Microsoft Foundry, which says workflows retire on 1 December 2026](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow)
- [Agent Orchestration, part 1: the same design built with LangChain](/posts/orchestration1/)
- [Part 3: the legal intake voice agent](/posts/azurefoundryagent4/)
