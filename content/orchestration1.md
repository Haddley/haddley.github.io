---
title: "Agent Orchestration"
part: 1
description: "Four ways to build an agent that answers questions from six documents, using the multi-agent patterns LangChain documents, tested on a small local model, with the problems I hit and how I fixed them"
date: "2026-09-21"
categories: ["AI"]
tags: "agent-orchestration, subagents, langchain, ollama, grounding, evaluation"
image: "/assets/images/orchestration1/hero-orchestration-routing.svg"
slug: "orchestration1"
hidden: false
---

**Are subagents worth it? Not always certainly.** On `qwen2.5:14b` the router passed all 18 questions that have a fact check, skills passed 16, and subagents and one big prompt passed 15 each. The three designs that fit the model's window used a similar number of prompt tokens at the median, within about 17 percent of each other. What set them apart was how each one failed. The router once sent a question to all six specialists. Skills twice loaded the wrong document. Subagents once declined a question it should have answered, and could not answer a comparison across two documents.

Subagents should earn their place when a specialist does heavy work in its own context, when specialists run in parallel, or when a specialist sits behind a boundary you cannot load into one prompt. This task is none of those, and I did not test them.

*This is part 1 of a series on agent orchestration. It is about agents you build yourself, in one process. [Part 2](/posts/orchestration2/) and [part 3](/posts/orchestration3/) are about agents you do not control, called over the Agent2Agent protocol.*

Everything below comes from real runs on 20 and 21 September 2026 on my own laptop. This is a post about agent design, and it is not legal advice. The six documents are general information drawn from the 2025 Minnesota Statutes and from court opinions, and they leave out a great deal.

## The task

Six documents on Minnesota traffic and car law, about 25,800 words, written from the statutes and court opinions: speeding, the hands-free phone law, driving while impaired (DWI), reckless driving, lemon law and car sales, and car accidents. Every quotation in them is checked against the source text by a script, which gives every question an answer I can check.

The six documents come to about 37,000 tokens. That number matters, because the model I use, `qwen2.5:14b` running locally in Ollama, has a 32,768-token window.

## Four ways to build it

These use the names from LangChain's [multi-agent documentation](https://docs.langchain.com/oss/python/langchain/multi-agent). I built the last three from LangChain's own tutorials.

| Design | How it works | LangChain's name |
|---|---|---|
| **All in one prompt** | One agent, all six documents in its system prompt | (what the patterns exist to avoid) |
| **Skills** | One agent with a `load_skill` tool. It sees a list of the six documents and loads the one it needs | Skills |
| **Router** | A graph classifies the question, sends it to the right specialists in parallel, and combines their answers | Router |
| **Subagents** | A supervisor agent calls a specialist agent for each area, as a tool. Each specialist holds one document | Subagents |

## Results on `qwen2.5:14b`

Nineteen questions from a set of 62, one run each. They cover all six areas and include questions that need two documents, questions about court decisions, and one that is outside the six areas. I picked them from a 24-question subset that I fixed earlier, in two batches, the first after seeing some of the flat agent's results, so do not treat the selection as random. A design "passes" when its answer contains the fact I required, such as "four" for the lemon-law repair rule. That is a blunt check and it does not measure whether an answer is complete.

| Design | Questions run | Passed the fact check | Mean prompt tokens | Median prompt tokens | Largest prompt | Median seconds | Mean model calls |
| --- | --- | --- | --- | --- | --- | --- | --- |
| All in one prompt | 19 | 15 of 18 | 16,386 | 16,386 | 16,386 | 409 | 1.0 |
| Skills | 19 | 16 of 18 | 9,228 | 9,489 | 9,436 | 209 | 2.1 |
| Router | 19 | 18 of 18 | 9,880 | 8,965 | 8,780 | 93 | 3.4 |
| Subagents | 19 | 15 of 18 | 8,142 | 8,147 | 8,779 | 142 | 2.9 |

| Question | All in one prompt | Skills | Router | Subagents |
|---|---|---|---|---|
| L1 (lemon) | pass, 16,386 tok, 372 s | pass, lemon, 9,535 tok, 219 s | pass, lemon, 8,969 tok, 210 s | pass, lemon, 10,128 tok, 160 s |
| S1 (speeding) | pass, 16,386 tok, 410 s | pass, speeding, 6,692 tok, 113 s | pass, speeding, 6,114 tok, 23 s | pass, speeding, 7,271 tok, 127 s |
| D5 (dwi) | fail, 16,386 tok, 429 s | pass, dwi, 9,904 tok, 207 s | pass, dwi, 9,319 tok, 46 s | pass, dwi, 10,436 tok, 188 s |
| A2 (accident) | pass, 16,386 tok, 354 s | pass, accident, 7,535 tok, 173 s | pass, accident, 7,025 tok, 197 s | pass, accident, 8,147 tok, 126 s |
| P1 (phone) | pass, 16,386 tok, 409 s | pass, phone, 4,936 tok, 97 s | pass, phone, 4,410 tok, 116 s | pass, phone, 5,582 tok, 124 s |
| L5 (lemon) | pass, 16,386 tok, 381 s | pass, lemon, 9,543 tok, 204 s | pass, lemon, 9,197 tok, 100 s | pass, lemon, 10,174 tok, 236 s |
| D7 (dwi) | pass, 16,386 tok, 403 s | pass, dwi, 9,912 tok, 209 s | pass, dwi, 9,391 tok, 60 s | fail, dwi, 10,900 tok, 280 s |
| C6 (reckless) | pass, 16,386 tok, 370 s | pass, reckless, 5,847 tok, 107 s | pass, reckless, 5,261 tok, 34 s | pass, reckless, 6,394 tok, 142 s |
| M2 (dwi) | fail, 16,386 tok, 68 s | fail, dwi, 9,912 tok, 216 s | pass, dwi+speeding, 15,246 tok, 122 s | fail, dwi+speeding, 16,044 tok, 123 s |
| C3 (dwi) | pass, 16,386 tok, 370 s | pass, dwi, 9,876 tok, 433 s | pass, phone+accident+reckless+lemon+speeding+dwi, 38,505 tok, 1114 s | pass, dwi, 10,508 tok, 272 s |
| C4 (dwi) | pass, 16,386 tok, 411 s | pass, dwi, 9,908 tok, 405 s | pass, dwi, 9,352 tok, 56 s | pass, dwi, 10,520 tok, 80 s |
| L3 (lemon) | pass, 16,386 tok, 407 s | pass, lemon, 9,489 tok, 348 s | pass, lemon, 8,965 tok, 51 s | pass, lemon, 10,094 tok, 68 s |
| F3 (lemon) | pass, 16,386 tok, 411 s | pass, lemon, 9,489 tok, 323 s | pass, lemon, 9,127 tok, 101 s | pass, lemon, 10,128 tok, 289 s |
| P2 (phone) | pass, 16,386 tok, 405 s | pass, phone, 4,908 tok, 173 s | pass, phone, 4,375 tok, 52 s | pass, phone, 5,524 tok, 206 s |
| R1 (reckless) | pass, 16,386 tok, 410 s | pass, reckless, 5,791 tok, 177 s | pass, reckless, 5,467 tok, 125 s | pass, reckless, 6,434 tok, 265 s |
| C2 (speeding) | pass, 16,386 tok, 672 s | pass, dwi, 19,317 tok, 368 s | pass, speeding, 6,184 tok, 64 s | pass, speeding, 7,344 tok, 292 s |
| C7 (speeding) | fail, 16,386 tok, 680 s | pass, speeding, 6,696 tok, 220 s | pass, speeding, 6,309 tok, 93 s | pass, speeding, 7,337 tok, 89 s |
| O3 (outside) | answered, 16,386 tok, 641 s | declined, speeding, 6,684 tok, 207 s | declined, speeding, 6,220 tok, 61 s | declined, none, 777 tok, 13 s |
| F1 (reckless) | pass, 16,386 tok, 419 s | fail, dwi, 19,352 tok, 421 s | pass, phone+dwi+reckless, 18,283 tok, 163 s | fail, none, 953 tok, 54 s |

### What the results show

- **All in one prompt does not fit.** The six documents are 37,010 tokens. Ollama evaluated 16,386 of them on every question, 44 percent, so the agent answered from a truncated prompt. It passed 15 of 18, and it failed the DWI felony question, the two-document comparison and the laser-evidence question. It also did not decline the out-of-scope question. Asked for the speed limit in Wisconsin, it answered with figures from the Minnesota document. Its median was 409 seconds, because it could not cache the prompt. I do not know which part of the documents it kept. On `gemma4:12b`, whose window is 262,144 tokens, the same design matched the subagents on accuracy across 70 questions, so this is a fact about the model window and not about the design.
- **Router passed all 18.** It is the only design that passed the two-area question (M2, DWI versus speeding), by classifying it into both areas and combining the answers. Its cost is in its errors, not its typical question. On C3, a question about the right to a lawyer before a breath test, its classifier chose all six areas. That ran six specialists, made eight model calls and used 38,505 prompt tokens over 1,114 seconds, and the answer was still right. On the out-of-scope question it classified the question into speeding, ran that specialist, and then said the document does not cover Wisconsin, at a cost of 6,220 tokens.
- **Skills passed 16 of 18.** It loaded one document on almost every question, and its median was 9,489 tokens. It has two clear failures. On M2 the one-load limit gave it only the DWI document for a comparison. On F1, a question about texting while hitting a pedestrian, it loaded the DWI document, which is the wrong one, and failed. On C2, the drug-dog question, it also loaded the DWI document and gave an answer about DWI probable cause. That answer contained the words my check looks for, so it passed, but it did not use the speeding document, which holds the rule from *Rodriguez*. On the out-of-scope question it loaded the speeding document before saying the question was outside it.
- **Subagents passed 15 of 18.** On D7, the sleeping-in-a-parked-car question, the answer was right in substance, citing *Kozak*, but it did not contain the words "physical control" that my check requires. It also called a Court of Appeals decision a ruling of the Supreme Court. On M2 the supervisor split the question in two, but each specialist sees only its own document, so both said the document does not cover the comparison. On F1 the supervisor called no specialist and told me the question was outside its scope, although it is squarely about reckless driving. On the out-of-scope question it declined without calling anyone, at a cost of 777 tokens, which was the cheapest correct decline of the four.
- **Tokens are similar at the median.** The medians were 8,147 for subagents, 8,965 for the router and 9,489 for skills, against a fixed 16,386 for the truncated prompt. The means are 8,142, 9,880 and 9,228. The subagents mean is low partly because of the two questions it wrongly declined or refused to route, which cost under 1,000 tokens each. On questions where all three routed correctly, the supervisor used about 1,000 more tokens than the router, because it rewrites the question and then restates the answer around the specialist's call.
- **The seconds are not a ranking.** Ollama caches prompts between questions. The router took 23 seconds on a speeding question that reused a cached prompt and 1,114 on the six-area fan-out.
- **Passing hides some problems.** The skills answer to C2 passed while using the wrong document. The router's and skills' answers to M2 mention demerit points or points on your license, which the documents do not cover. My check looks for required facts, not for extra claims.

### What to take from it

- **Check the window first.** If the documents fit in the model's window, one agent holding them is the simplest design. On `qwen2.5:14b` six documents do not fit, and the truncated agent also answered an out-of-scope question from the wrong material.
- **A small model's routing decisions are the weak point in every design.** The router's classifier, the skills agent's choice of skill, and the supervisor's decision to call a specialist each went wrong at least once. A larger model would probably do better, and I did not test one.
- **If questions span areas, use a router,** and cap how many areas it may choose. It was the most accurate here, and it is a graph you can read.
- **If a question needs one area, skills is the smallest design.** It needs the two guards described below, and it cannot answer a question that spans two areas.
- **Use subagents for work that needs its own context or boundary,** such as a specialist that runs many searches and returns a short summary, specialists that run in parallel, or an agent you cannot load into one prompt at all. For looking things up in six documents they were no more accurate than the simpler designs.

## Two problems I hit in the skills design, and the fixes

I fixed each after seeing it fail, so the "after" numbers are not an untouched test.

**A repeated tool call.** In one reply `qwen2.5:14b` asked for `load_skill("lemon")` twice, with two different call IDs, so two identical 36,201-character results went into the conversation. LangChain's docs say many models issue several tool calls in one response and that the runtime executes them together. The skills tutorial adds no guard. I wrote a small middleware, `DropDuplicateToolCalls`, that removes exact repeats before they run. The same question then loaded the document once and used 9,429 prompt tokens instead of 17,748, and took 151 seconds instead of 407.

**A second document loaded "just in case".** On three of four questions the skills agent loaded a second skill it did not need: the seat-belt question loaded the DWI document too, the DWI felony question loaded reckless driving, and a phone question loaded the accident document. That doubled the prompt. I first told the agent in its prompt to load one skill, and it made no difference: A2 loaded the same two documents again. LangChain documents `ToolCallLimitMiddleware` for a model that calls a tool too often, and I limited `load_skill` to one call per question.

| Question | Guard against repeats only | Plus a prompt instruction to load one | Plus a limit of one load |
| --- | --- | --- | --- |
| A2 | accident+dwi, 16,141 tokens, 408 s | accident+dwi, 16,203 tokens, 508 s | accident, 7,535 tokens, 173 s |
| D5 | dwi+reckless, 14,445 tokens, 339 s | dwi+reckless, 14,507 tokens, 477 s | dwi, 9,904 tokens, 207 s |
| P1 | phone+accident, 11,139 tokens, 213 s | not run | phone, 4,936 tokens, 97 s |

The cost is that a question spanning two areas gets only one document. That is why LangChain points multi-domain questions at the router and subagents patterns. The limit also does not make the agent choose the right skill. On the drug-dog question and on the texting-and-a-pedestrian question it loaded the DWI document instead of the right one.

## Asking the user a question

A good agent asks when it needs a fact. I tested this on `gemma4:12b` with conversations that start with a vague question, such as "My car keeps breaking down. Can I get my money back?", and a simulated user who answers only if asked. This ran before I rebuilt the designs above, so it used my earlier version of the skills idea, a route-then-load agent that is in the repository history.

LangChain's documentation has one mechanism for this. A placeholder tool named `ask_user`, `HumanInTheLoopMiddleware` to pause at it, a checkpointer on the top-level agent, and a `respond` decision to resume. I used exactly that.

The all-in-one agent and the route-then-load agent asked "was the car new or used?". The supervisor's specialist did not. The supervisor had rewritten the vague question into a general one that covered both cases before the specialist saw it, so the specialist had nothing to ask. Passing the user's own words to the specialist, which LangChain calls forking the input, did not change that in my one test. I did not rerun these conversations on `qwen2.5:14b`.

## Feedback for LangChain

1. The docs have no worked example of a subagent asking a clarifying question. The `respond` decision and the `ask_user` name appear only on the human-in-the-loop page, and the subagents page points to interrupts.
2. The supervisor decides what a subagent can ask about. A helpful rewrite hides the gap.
3. The skills tutorial has no guard against a model repeating a tool call, or loading skills it does not need. On a small model both happen, and `ToolCallLimitMiddleware` cannot tell a repeat from a second skill that is really needed.
4. `get_state` with subgraphs cannot see subagents called inside tools.
5. A checkpointer on the top-level agent is required, which is easy to miss when you start with a stateless single-turn agent.

## Limits of these tests

Nineteen questions on `qwen2.5:14b`, one run each, checked by string matching. I wrote the questions, and the documents are mine. The two problems above were fixed after I saw them fail. The skills design has the one-skill limit and the others have no equivalent limit. The DWI document was extended after the earlier `gemma4:12b` runs, so those figures describe the earlier version. The conversation tests are two conversations on one model.

## The code

**`traffic_law_agents.py`:**

```python
import argparse
import json
import operator
import os
import re
import sys
import time
from pathlib import Path
from typing import Annotated, Callable, Literal, TypedDict

from langchain.agents import create_agent
from langchain.agents.middleware import (AgentMiddleware, HumanInTheLoopMiddleware, ModelRequest, ModelResponse,
                                         ToolCallLimitMiddleware)
from langchain.messages import SystemMessage
from langchain.tools import ToolRuntime, tool
from langchain_ollama import ChatOllama
from langchain_core.callbacks import BaseCallbackHandler
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import END, START, StateGraph
from langgraph.types import Command, Send
from pydantic import BaseModel, Field

MODEL = os.environ.get("MODEL", "gemma4:12b")
SPECIALIST_CTX = int(os.environ.get("SPECIALIST_CTX", "16384"))
FLAT_CTX = int(os.environ.get("FLAT_CTX", "49152"))
SKILLS_CTX = int(os.environ.get("SKILLS_CTX", "24576"))
FORK_INPUT = os.environ.get("FORK_INPUT", "0") == "1"  # let a specialist see the user's own words, not only the supervisor's question
HERE = Path(__file__).parent
DISCLAIMER = "This is general information, not legal advice."

AREAS = {
    "speeding": ("speeding.md", "Speed limits and speeding tickets: statutory limits, school zones, work zones, passing, "
                                "driving over 100 mph, the penalties for ordinary speeding, how speed is proved with "
                                "radar or laser, and the law on traffic stops."),
    "phone": ("mobile-phone.md", "The hands-free law: holding or using a phone or similar device while driving, "
                                 "including navigation, maps, music and other apps, what is allowed hands-free, the "
                                 "penalties, and searches of phones."),
    "dwi": ("dwi.md", "Driving while impaired (DWI, also called DUI): alcohol and drug offenses, alcohol concentration "
                      "limits, test refusal, blood and breath testing, the four degrees, aggravating factors, license "
                      "revocation, open bottle law and physical control, and the court decisions on them."),
    "reckless": ("reckless-driving.md", "Reckless driving, street racing, careless driving and criminal vehicular "
                                        "homicide or operation: what they are, their penalties, and the court "
                                        "decisions on gross negligence."),
    "lemon": ("lemon-law.md", "Buying a car: the Minnesota lemon law for new cars, the dealer warranty for used cars, "
                              "refunds, as-is sales, fraud, damage and title disclosures, and the court decisions on "
                              "them."),
    "accident": ("car-accidents.md", "After a car accident: what a driver must do, hit and run, fault and comparative "
                                     "fault, seat belt evidence, no-fault insurance benefits, the tort threshold, and "
                                     "the court decisions on them."),
}
DOCS = {area: (HERE / "knowledge" / file).read_text() for area, (file, _) in AREAS.items()}

# In a conversation, agents also get an ask_user tool and this sentence. The single-turn prompts do not have it.
ASK_USER = ("If the answer depends on a fact the user has not given, and the document says that fact matters, for "
            "example whether a car is new or used, call the ask_user tool with one short question instead of guessing. ")

SPECIALIST_SYSTEM = (
    "You are the Minnesota {area} specialist. Answer using ONLY the document below. Cite statute sections and "
    "subdivisions as they appear in it. If the document does not answer the question, say \"The document does not "
    "cover that.\" and stop. Do not guess and do not use outside knowledge. @ASK@Answer in English in under 150 words.\n\n"
    "DOCUMENT:\n{doc}")

SUPERVISOR_SYSTEM = (
    "You route questions about Minnesota traffic law to specialists. You have no legal knowledge of your own, so never "
    "answer from memory. Each specialist covers one area and sees only the question you send it. Rewrite the user's "
    "question as a clear, complete, neutral question before you send it: remove chit-chat, names, guesses and typos, "
    "but keep every legal detail. Call a specialist for each area the question touches. When a question touches two "
    "or more areas, split it and send each specialist a separate question about only its own part, because a "
    "specialist can answer only from its own document. "
    "If no area fits, for example parking tickets, stop signs, vehicle registration, license renewal, other states or "
    "non-legal questions, do not call any specialist. Say the question is outside these six areas of Minnesota "
    "traffic and car law. When specialists "
    "answer, reply using only what they returned, without adding facts. If a specialist says its document does not "
    "cover something, say so. Always answer in English, and end with: " + DISCLAIMER)

FLAT_INSTRUCTIONS = (
    "You answer questions about six areas of Minnesota traffic and car law using ONLY the six documents below. Cite statute "
    "sections and subdivisions as they appear. If the question is outside these documents, or the documents do not "
    "answer it, say so and do not answer from outside knowledge. @ASK@Answer in English in under 150 words, and end with: "
    + DISCLAIMER + "\n\n")

SKILLS_SYSTEM = (
    "You answer questions about Minnesota traffic and car law using ONLY the skills you load with the load_skill tool. "
    "Load the one skill that fits the question. Load a second only if the question clearly needs a second area, and "
    "never load a skill just in case. Cite statute sections and subdivisions as they appear. If the question is outside the skills, or the skills you "
    "loaded do not answer it, say so and do not answer from outside knowledge. @ASK@Answer in English in under 150 words, "
    "and end with: " + DISCLAIMER)

CLASSIFY_SYSTEM = (
    "Analyze this question and decide which areas of Minnesota traffic and car law to consult. For each relevant area, "
    "write a targeted, complete sub-question for that area. Return ONLY the areas that are relevant, and return none if "
    "no area fits, for example parking tickets, stop signs, vehicle registration, license renewal, other states or "
    "non-legal questions.\n\nAvailable areas:\n{catalogue}")

SYNTHESIZE_SYSTEM = (
    "Synthesize the specialists' answers to this question: \"{query}\"\n\nUse only what the specialists returned, "
    "without adding facts. Combine them without repeating yourself, and say so if a specialist reported that its "
    "document does not cover something. Always answer in English, and end with: " + DISCLAIMER)


FORK_NOTE = ("You may be given the user's own words as well as the supervisor's cleaned-up question. Answer the "
             "supervisor's question, but if the user's words leave out a fact you need, ask for it. ")


def with_ask(text: str, ask: bool, extra: str = "") -> str:
    return text.replace("@ASK@", ASK_USER + extra if ask else "")


def flat_system(ask: bool) -> str:
    return with_ask(FLAT_INSTRUCTIONS, ask) + "\n\n".join(f"DOCUMENT: {a}\n{d}" for a, d in DOCS.items())


@tool
def ask_user(question: str) -> str:
    """Ask the user one short question when the answer depends on a fact they have not given."""
    return "The user has not answered."  # never runs: the middleware below pauses first and the reply replaces it


# LangChain's human-in-the-loop middleware pauses before ask_user runs. The person's reply comes back as a "respond"
# decision, which becomes the tool's result. This is the documented pattern for "ask user" style tools.
ASK_MIDDLEWARE = [HumanInTheLoopMiddleware(interrupt_on={"ask_user": {"allowed_decisions": ["respond"]}})]


NOT_ENGLISH = re.compile(r"[^\x00-\u024f\u2010-\u203a]")  # anything outside Latin letters and general punctuation

NUMBER = re.compile(r"\$?\d[\d,]*(?:\.\d+)?")

RUNS: list[dict] = []


def llm(max_output_tokens: int, num_ctx: int = SPECIALIST_CTX) -> ChatOllama:
    extra = {"reasoning": False} if os.environ.get("NO_THINK", "1") != "0" else {}  # set NO_THINK=0 for a model without a thinking mode
    if os.environ.get("OLLAMA_BASE_URL"):
        extra["base_url"] = os.environ["OLLAMA_BASE_URL"]
    return ChatOllama(model=MODEL, temperature=0, num_ctx=num_ctx, num_predict=max_output_tokens, **extra)


ASKED: list[str] = []
CHOSEN: list[str] = []  # the skills the skills agent loaded for the current question


def run_agent(agent, name: str, question: str, depth: int = 0, config: dict | None = None, reply=None) -> str:
    """Stream one agent invocation, print a trace, record its statistics, return its final message.
    A top-level agent that has the ask_user tool pauses with an interrupt. Passing reply, a function from the agent's
    question to the user's answer, resumes it with a "respond" decision. A specialist called from a tool leaves its
    interrupts to the caller."""
    pad = "    " * depth
    stats = {"agent": name, "model_calls": 0, "input_tokens": []}
    RUNS.append(stats)
    final = ""
    payload = {"messages": [{"role": "user", "content": question}]}
    while True:
        pending = []
        for update in agent.stream(payload, config=config, stream_mode="updates"):
            if "__interrupt__" in update:
                pending = list(update["__interrupt__"])
                continue
            for node in update.values():
                for m in (node or {}).get("messages", []):
                    if m.type == "ai":
                        stats["model_calls"] += 1
                        stats["input_tokens"].append((m.usage_metadata or {}).get("input_tokens", 0))
                        for call in m.tool_calls:
                            print(f"{pad}[{name}] calls {call['name']}({json.dumps(call['args'])[:300]})")
                        if not m.tool_calls:
                            final = m.content
                    elif m.type == "tool":
                        print(f"{pad}[{name}] <- {m.name}: {len(m.content):,} characters")
                        if m.name == "load_skill" and str(m.content).startswith("Loaded skill: "):
                            CHOSEN.append(str(m.content).split("\n")[0].removeprefix("Loaded skill: "))  # a blocked call does not count
        if not pending or reply is None:
            return final
        answers = {}
        for item in pending:
            decisions = []
            for request in item.value["action_requests"]:
                asked = request["args"]["question"]
                ASKED.append(asked)
                decisions.append({"type": "respond", "message": reply(asked)})
                print(f"{pad}[{name}] asks the user: {asked}\n{pad}[user] {decisions[-1]['message']}")
            answers[item.id] = {"decisions": decisions}
        payload = Command(resume=next(iter(answers.values())) if len(answers) == 1 else answers)


def specialist(area: str, ask: bool = False):
    file, about = AREAS[area]
    fork = ask and FORK_INPUT
    system = with_ask(SPECIALIST_SYSTEM, ask, FORK_NOTE if fork else "").format(area=area, doc=DOCS[area])
    agent = create_agent(llm(300), tools=[ask_user] if ask else [], system_prompt=system, name=area,
                         middleware=ASK_MIDDLEWARE if ask else [])

    @tool(f"ask_{area}_specialist", description=about)
    def ask_specialist(question: str, runtime: ToolRuntime) -> str:
        """Ask this specialist a complete, self-contained question."""
        if fork:
            # LangChain's "subagent inputs": build the subagent's input from the parent's state, here the user's messages
            said = [m.content for m in runtime.state["messages"] if m.type == "human"][-3:]
            question = ("The user wrote, oldest first:\n" + "\n".join(f"- {text}" for text in said)
                        + f"\n\nThe supervisor's version of the question:\n{question}")
        return run_agent(agent, f"{area} specialist", question, depth=1)

    return ask_specialist


class DropDuplicateToolCalls(AgentMiddleware):
    """Some models repeat the same tool call in one reply, and the runtime runs every copy. qwen2.5:14b did it to
    load_skill and doubled the prompt. LangChain's ToolCallLimitMiddleware counts calls, so it cannot tell a repeat from
    a second skill that a two-area question really needs. This removes only exact repeats, before they run."""

    def wrap_model_call(self, request: ModelRequest, handler: Callable[[ModelRequest], ModelResponse]) -> ModelResponse:
        response = handler(request)
        for message in response.result:
            calls = getattr(message, "tool_calls", None)
            if calls:
                unique = {(c["name"], json.dumps(c["args"], sort_keys=True)): c for c in reversed(calls)}
                message.tool_calls = list(reversed(list(unique.values())))
        return response


# LangChain's documented remedy for a model that calls a tool too often. qwen2.5:14b loaded a second document "just in
# case" on three of four questions, and asking it not to in the prompt did not stop it. The first skill it loaded was
# the right one every time, so one load per question keeps that one. A question that spans two areas gets only the
# first, which is why LangChain points multi-domain questions at the router and subagents patterns.
SKILL_LIMIT = ToolCallLimitMiddleware(tool_name="load_skill", run_limit=1)


# ---------------------------------------------------------------- skills pattern
# LangChain's skills pattern (docs: multi-agent/skills and the SQL assistant tutorial): one agent, a load_skill tool, and
# middleware that lists the skills in its system prompt. Loading a skill puts its text in the conversation.

@tool
def load_skill(skill_name: str) -> str:
    """Load the full document for one skill, using a skill name from the system prompt."""
    if skill_name not in DOCS:
        return f"There is no skill called {skill_name}. The skills are: {', '.join(AREAS)}."
    return f"Loaded skill: {skill_name}\n\n{DOCS[skill_name]}"


class SkillMiddleware(AgentMiddleware):
    """Add the skill names and descriptions to the system prompt, and register the load_skill tool."""

    tools = [load_skill]

    def __init__(self):
        self.skills_prompt = "\n".join(f"- **{area}**: {about}" for area, (_, about) in AREAS.items())

    def wrap_model_call(self, request: ModelRequest, handler: Callable[[ModelRequest], ModelResponse]) -> ModelResponse:
        addendum = (f"\n\n## Available Skills\n\n{self.skills_prompt}\n\n"
                    "Use the load_skill tool when you need detailed information about handling a specific type of request.")
        content = list(request.system_message.content_blocks) + [{"type": "text", "text": addendum}]
        return handler(request.override(system_message=SystemMessage(content=content)))


# ---------------------------------------------------------------- router pattern
# LangChain's router pattern (docs: multi-agent/router and the knowledge base tutorial): a StateGraph that classifies the
# question, fans out to the chosen agents in parallel with Send, and synthesizes their answers. It keeps no conversation.

class AgentInput(TypedDict):
    query: str


class Classification(TypedDict):
    source: Literal["speeding", "phone", "dwi", "reckless", "lemon", "accident"]
    query: str


class RouterState(TypedDict):
    query: str
    classifications: list[Classification]
    results: Annotated[list[dict], operator.add]  # the reducer collects the parallel results
    final_answer: str


class ClassificationResult(BaseModel):
    """Which areas to consult, each with a targeted sub-question."""
    classifications: list[Classification] = Field(description="Areas to consult, with a sub-question for each")


class UsageLog(BaseCallbackHandler):
    """Record the prompt size of every model call in the graph, and which node made it."""

    def __init__(self):
        self.nodes: dict = {}
        self.calls: list[tuple[str, int]] = []

    def on_chat_model_start(self, serialized, messages, *, run_id, metadata=None, **kwargs):
        namespace = (metadata or {}).get("langgraph_checkpoint_ns", "")
        self.nodes[run_id] = namespace.split("|")[0].split(":")[0]

    def on_llm_end(self, response, *, run_id, **kwargs):
        message = response.generations[0][0].message
        self.calls.append((self.nodes.get(run_id, ""), (message.usage_metadata or {}).get("input_tokens", 0)))


def build_router():
    catalogue = "\n".join(f"- {area}: {about}" for area, (_, about) in AREAS.items())

    def classify_query(state: RouterState) -> dict:
        structured = llm(200).with_structured_output(ClassificationResult)
        result = structured.invoke([("system", CLASSIFY_SYSTEM.format(catalogue=catalogue)), ("user", state["query"])])
        return {"classifications": result.classifications if result else []}  # an unparsable reply counts as no area

    def route_to_agents(state: RouterState) -> list[Send]:
        return [Send(c["source"], {"query": c["query"]}) for c in state["classifications"]]

    def specialist_node(area: str):
        agent = create_agent(llm(300), tools=[], system_prompt=with_ask(SPECIALIST_SYSTEM, False).format(area=area, doc=DOCS[area]))

        def node(state: AgentInput) -> dict:
            result = agent.invoke({"messages": [{"role": "user", "content": state["query"]}]})
            return {"results": [{"source": area, "result": result["messages"][-1].content}]}

        return node

    def synthesize_results(state: RouterState) -> dict:
        if not state["results"]:
            return {"final_answer": f"I am sorry, but the question is outside these six areas of Minnesota traffic and car law. {DISCLAIMER}"}
        formatted = "\n\n".join(f"**From {r['source']}:**\n{r['result']}" for r in state["results"])
        reply = llm(400).invoke([("system", SYNTHESIZE_SYSTEM.format(query=state["query"])), ("user", formatted)])
        return {"final_answer": reply.content}

    graph = StateGraph(RouterState).add_node("classify", classify_query).add_node("synthesize", synthesize_results)
    for area in AREAS:
        graph.add_node(area, specialist_node(area))
        graph.add_edge(area, "synthesize")
    graph.add_edge(START, "classify")
    graph.add_conditional_edges("classify", route_to_agents, list(AREAS))
    graph.add_edge("synthesize", END)
    return graph.compile()


def run_router(router, question: str) -> str:
    log = UsageLog()
    state = router.invoke({"query": question}, config={"callbacks": [log]})
    top = [tokens for node, tokens in log.calls if node in ("classify", "synthesize")]
    RUNS.append({"agent": "router", "model_calls": len(top), "input_tokens": top})
    for area in dict.fromkeys(node for node, _ in log.calls if node in AREAS):
        tokens = [t for node, t in log.calls if node == area]
        RUNS.append({"agent": f"{area} specialist", "model_calls": len(tokens), "input_tokens": tokens})
        print(f"    [router] {area}: {len(tokens)} model calls")
    print(f"[router] classified into: {[c['source'] for c in state['classifications']] or 'none'}")
    return state["final_answer"]


MODES = ("supervisor", "flat", "skills", "router")


def build(mode: str, memory: bool = False):
    """The agent for a design. With memory the agent keeps a conversation, and it can pause to ask the user a question."""
    saver = {"checkpointer": InMemorySaver()} if memory else {}
    ask = {"tools": [ask_user], "middleware": ASK_MIDDLEWARE} if memory else {"tools": [], "middleware": []}
    if mode == "flat":
        return create_agent(llm(400, FLAT_CTX), system_prompt=flat_system(memory), name="flat", **ask, **saver)
    if mode == "skills":  # the docs' skills agent always has a checkpointer, so every question runs on its own thread
        return create_agent(llm(400, SKILLS_CTX), system_prompt=with_ask(SKILLS_SYSTEM, memory), name="skills",
                            tools=ask["tools"], middleware=[SkillMiddleware(), DropDuplicateToolCalls(), SKILL_LIMIT] + ask["middleware"],
                            checkpointer=InMemorySaver())
    if mode == "router":
        return build_router()
    return create_agent(llm(400), tools=[specialist(a, memory) for a in AREAS], system_prompt=SUPERVISOR_SYSTEM,
                        name="supervisor", middleware=[DropDuplicateToolCalls()], **saver)


def context_for(mode: str) -> int:
    return {"flat": FLAT_CTX, "skills": SKILLS_CTX}.get(mode, SPECIALIST_CTX)


def score(result: dict, item: dict) -> None:
    """Add the checks for one answer: the facts it must contain, the specialists it should have reached, and whether it
    asked the user a question when it should (or should not) have."""
    answer = result["answer"].lower()
    result["facts_ok"] = all(any(alt.lower() in answer for alt in group) for group in item["must_include"])
    result["route_ok"] = set(result["specialists_called"]) in [set(s) for s in item["expected"]]
    result["clarify_ok"] = result["clarified"] == item.get("clarify", False)


def ensure_english(answer: str, num_ctx: int) -> tuple[str, int]:
    """This model sometimes drifts into another language. If it did, ask for the same answer in English."""
    if not NOT_ENGLISH.search(answer):
        return answer, 0
    reply = llm(400, num_ctx).invoke("Rewrite the following answer in English. Keep every citation and number exactly as "
                            "written.\n\n" + answer)
    return reply.content, (reply.usage_metadata or {}).get("input_tokens", 0)


def ask_once(agent, name: str, question: str, num_ctx: int = SPECIALIST_CTX, thread: str | None = None,
             reply=None) -> dict:
    RUNS.clear()
    ASKED.clear()
    started = time.time()
    CHOSEN.clear()
    if name == "router":
        answer = run_router(agent, question)
    else:
        answer = run_agent(agent, name, question, config={"configurable": {"thread_id": thread}} if thread else None,
                           reply=reply)
    answer, guard_tokens = ensure_english(answer, num_ctx)
    seconds = time.time() - started
    tokens = [t for r in RUNS for t in r["input_tokens"]] + ([guard_tokens] if guard_tokens else [])
    return {"answer": answer, "seconds": round(seconds, 1), "model_calls": len(tokens), "language_guard": bool(guard_tokens),
            "total_prompt_tokens": sum(tokens), "peak_prompt_tokens": max(tokens, default=0),
            "top_level_prompt_tokens": max(RUNS[0]["input_tokens"], default=0),
            "specialists_called": list(dict.fromkeys(CHOSEN)) if name == "skills"
            else list(dict.fromkeys(r["agent"].split()[0] for r in RUNS[1:])),
            "asked": list(ASKED), "clarified": bool(ASKED)}


# ---------------------------------------------------------------- evaluation

def numbers(text: str) -> set[str]:
    return {n.replace("$", "").replace(",", "").rstrip(".") for n in NUMBER.findall(text)}


def ungrounded_numbers(answer: str, question: str, areas: list[str]) -> list[str]:
    """Numbers in an answer that appear in neither the question nor the documents the answer could draw on."""
    allowed = numbers(question) | numbers(" ".join(DOCS[a] for a in (areas or list(DOCS))))
    return sorted(numbers(answer) - allowed - {""})


def evaluate(mode: str, ids: list[str] | None, questions_file: str, tag: str) -> None:
    questions = json.loads((HERE / questions_file).read_text())
    if ids:
        questions = [q for q in questions if q["id"] in ids]
    # Group questions by their first expected area so consecutive questions reuse the same server-side prompt cache.
    questions.sort(key=lambda q: (q["expected"][0][0] if q["expected"][0] else "~", q["id"]))
    out = HERE / "results" / f"{tag}-{mode}.jsonl"
    out.parent.mkdir(exist_ok=True)
    done = {json.loads(line)["id"] for line in out.read_text().splitlines()} if out.exists() else set()
    agent = build(mode)
    for item in questions:
        if item["id"] in done:
            continue
        print(f"\n=== {item['id']} ({item['category']}): {item['question']}")
        result = ask_once(agent, mode, item["question"], context_for(mode), thread=item["id"] if mode == "skills" else None)
        score(result, item)
        if mode == "flat":
            del result["route_ok"]  # a flat agent has no routing to check
        result.update({"id": item["id"], "category": item["category"], "question": item["question"]})
        print(f"--- answer ({result['seconds']}s, {result['total_prompt_tokens']:,} prompt tokens in "
              f"{result['model_calls']} calls)\n{result['answer']}")
        with out.open("a") as f:
            f.write(json.dumps(result) + "\n")


def converse(mode: str, conversations_file: str, ids: list[str] | None, tag: str) -> None:
    """Multi-turn test. Each conversation is a first question followed by follow-ups that often do not name their area.
    A turn may carry reply_if_asked, the facts the simulated user gives if the agent pauses to ask a question."""
    if mode == "router":
        raise SystemExit("LangChain's router keeps no conversation, so it is not run on the conversations")
    conversations = json.loads((HERE / conversations_file).read_text())
    if ids:
        conversations = [c for c in conversations if c["id"] in ids]
    out = HERE / "results" / f"{tag}-{mode}.jsonl"
    out.parent.mkdir(exist_ok=True)
    done = {(r["conversation"], r["turn"]) for r in map(json.loads, out.read_text().splitlines())} if out.exists() else set()
    for conv in conversations:
        finished = [(conv["id"], n) in done for n in range(1, len(conv["turns"]) + 1)]
        if all(finished):
            continue
        if any(finished):  # a resumed run cannot rebuild an agent's memory, so a conversation restarts from its first turn
            raise SystemExit(f"{conv['id']} is partly recorded in {out}; delete the file to rerun")
        agent = build(mode, memory=True)
        for number, turn in enumerate(conv["turns"], 1):
            print(f"\n=== {conv['id']} turn {number}: {turn['question']}")
            reply = lambda asked, t=turn: t.get("reply_if_asked", "I do not have any more details.")
            result = ask_once(agent, mode, turn["question"], context_for(mode), thread=conv["id"], reply=reply)
            score(result, turn)
            result.update({"conversation": conv["id"], "turn": number, "question": turn["question"]})
            print(f"--- answer ({result['seconds']}s, {result['total_prompt_tokens']:,} prompt tokens, top-level prompt "
                  f"{result['top_level_prompt_tokens']:,})\n{result['answer']}")
            with out.open("a") as f:
                f.write(json.dumps(result) + "\n")


def summarize(tags: list[str]) -> None:
    questions = {q["id"]: q for f in sorted(HERE.glob("questions*.json")) for q in json.loads(f.read_text())}
    for tag, name in [(t, n) for t in tags for n in MODES]:
        path = HERE / "results" / f"{tag}-{name}.jsonl"
        if not path.exists():
            continue
        rows = [json.loads(line) for line in path.read_text().splitlines()]
        print(f"\n--- {tag} {name}: {len(rows)} questions ---")
        print(f"{'category':<9}{'n':>4}{'route ok':>10}{'facts ok':>10}{'avg total tokens':>18}{'avg top prompt':>16}{'avg seconds':>13}")
        for cat in ("single", "multi", "noisy", "outside", "all"):
            sel = [r for r in rows if cat == "all" or r["category"] == cat]
            if not sel:
                continue
            facts = [r for r in sel if questions[r["id"]]["must_include"]]
            route = f"{sum(r['route_ok'] for r in sel)}/{len(sel)}" if name != "flat" else "n/a"
            print(f"{cat:<9}{len(sel):>4}{route:>10}{sum(r['facts_ok'] for r in facts):>6}/{len(facts):<3}"
                  f"{sum(r['total_prompt_tokens'] for r in sel) / len(sel):>18,.0f}"
                  f"{sum(r['top_level_prompt_tokens'] for r in sel) / len(sel):>16,.0f}"
                  f"{sum(r['seconds'] for r in sel) / len(sel):>13.1f}")
        flagged = {}
        for r in rows:
            bad = ungrounded_numbers(r["answer"], r["question"], r.get("specialists_called", []) if name != "flat" else [])
            if bad:
                flagged[r["id"]] = bad
        print(f"  answers with a number that is in neither the question nor the documents used: {len(flagged)}"
              + (f" {flagged}" if flagged else ""))
        guarded = sum(r.get("language_guard", False) for r in rows)
        if guarded:
            print(f"  language guard rewrote {guarded} answer(s) into English")
        if name != "flat":
            for r in rows:
                if not r["route_ok"]:
                    print(f"  routed wrong: {r['id']} called {r['specialists_called'] or 'nothing'}, expected {questions[r['id']]['expected']}")


def summarize_conversations(tags: list[str]) -> None:
    """One line per turn of each multi-turn run: whether the agent asked the user, and how big its prompts were."""
    for tag, name in [(t, n) for t in tags for n in MODES]:
        path = HERE / "results" / f"{tag}-{name}.jsonl"
        if not path.exists():
            continue
        rows = [json.loads(line) for line in path.read_text().splitlines()]
        print(f"\n--- {tag} {name}: {len(rows)} turns ---")
        print(f"{'turn':<8}{'asked':>6}{'ask ok':>8}{'facts':>7}{'route':>7}{'seconds':>9}{'total tokens':>14}{'top prompt':>12}")
        for r in rows:
            print(f"{r['conversation']}.{r['turn']:<5}{'yes' if r['clarified'] else 'no':>6}{'yes' if r['clarify_ok'] else 'NO':>8}"
                  f"{'yes' if r['facts_ok'] else 'NO':>7}{'n/a' if name == 'flat' else 'yes' if r['route_ok'] else 'NO':>7}{r['seconds']:>9.0f}"
                  f"{r['total_prompt_tokens']:>14,}{r['top_level_prompt_tokens']:>12,}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("question", nargs="?")
    parser.add_argument("--flat", action="store_true", help="one agent holding all six documents")
    parser.add_argument("--skills", action="store_true", help="one agent that loads a document as a skill when it needs it")
    parser.add_argument("--router", action="store_true", help="classify, fan out to specialists in parallel, synthesize")
    parser.add_argument("--eval", action="store_true", help="run the labelled question set")
    parser.add_argument("--ids", help="comma-separated question or conversation ids for --eval")
    parser.add_argument("--summary", action="store_true", help="summarize the results of each --tag")
    parser.add_argument("--conversations", help="conversation file: run it with --eval, or summarize with --summary")
    parser.add_argument("--questions", default="questions_scale.json", help="question set file for --eval")
    parser.add_argument("--tag", action="append", help="name for a run's result files; repeat it with --summary")
    args = parser.parse_args()
    mode = "flat" if args.flat else "skills" if args.skills else "router" if args.router else "supervisor"
    tag = (args.tag or ["run"])[0]
    ids = args.ids.split(",") if args.ids else None
    if args.summary and args.conversations:
        summarize_conversations(args.tag or ["run"])
    elif args.summary:
        summarize(args.tag or ["run"])
    elif args.eval and args.conversations:
        converse(mode, args.conversations, ids, tag)
    elif args.eval:
        evaluate(mode, ids, args.questions, tag)
    elif args.question:
        result = ask_once(build(mode), mode, args.question, context_for(mode), thread="ask" if mode == "skills" else None)
        print(f"\n--- answer ---\n{result['answer']}\n\n--- {result['seconds']}s, {result['total_prompt_tokens']:,} prompt "
              f"tokens in {result['model_calls']} model calls; largest single prompt {result['peak_prompt_tokens']:,} ---")
    else:
        sys.exit('usage: python traffic_law_agents.py [--flat | --skills | --router] "question" | --eval [--flat | --skills | --router] '
                 '[--tag T] [--questions F | --conversations F] | --summary [--conversations F] --tag T')
```

**`tools/check_clarification.py`,** which checks the LangChain plumbing with scripted models and no Ollama:

```python
"""Check the LangChain plumbing without a real model. Scripted fake models stand in for Ollama.

1. Subagents: a supervisor calls a specialist, the specialist pauses at ask_user through LangChain's human-in-the-loop
   middleware, the harness answers, and the specialist finishes.
2. Skills: an agent calls load_skill (twice in one reply, as qwen2.5:14b did), the repeat is dropped, and the document reaches its next model call once.
3. Router: a StateGraph classifies, fans out to a specialist with Send, and synthesizes.

Usage: python tools/check_clarification.py   (set FORK_INPUT=1 to check the forked specialist input as well)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import AIMessage
from langchain_core.outputs import ChatGeneration, ChatResult
from langchain_core.runnables import RunnableLambda

import traffic_law_agents as t


class Scripted(BaseChatModel):
    script: list = []
    seen: list = []

    @property
    def _llm_type(self) -> str:
        return "scripted"

    def bind_tools(self, tools, **kwargs):
        return self

    def _generate(self, messages, stop=None, run_manager=None, **kwargs):
        self.seen.append([(m.type, str(m.content)[:120]) for m in messages if m.type != "system"])
        return ChatResult(generations=[ChatGeneration(message=self.script.pop(0))])


def call(name, args, id):
    return AIMessage(content="", tool_calls=[{"name": name, "args": args, "id": id}])


# 1. subagents with a clarifying question
supervisor = Scripted(script=[call("ask_lemon_specialist", {"question": "Can I get my money back?"}, "c1"),
                              AIMessage(content="Under the lemon law the refund needs four repair attempts.")], seen=[])
specialist = Scripted(script=[call("ask_user", {"question": "Is the car new or used?"}, "c2"),
                              AIMessage(content="New car: four or more repairs of the same problem.")], seen=[])
t.llm = lambda max_tokens, num_ctx=0: supervisor if max_tokens == 400 else specialist
asked = []
result = t.ask_once(t.build("supervisor", memory=True), "supervisor", "Can I get my money back?", thread="check",
                    reply=lambda question: asked.append(question) or "It was new.")
assert asked == ["Is the car new or used?"] and result["asked"] == asked and result["clarified"], asked
assert result["specialists_called"] == ["lemon"] and "four" in result["answer"], result
if t.FORK_INPUT:
    first = specialist.seen[0][0][1]
    assert first.startswith("The user wrote") and "Can I get my money back?" in first, first
print("ok 1: the specialist's question reached the harness, and the reply reached the supervisor")

# 2. skills
duplicated = AIMessage(content="", tool_calls=[{"name": "load_skill", "args": {"skill_name": "lemon"}, "id": "c3"},
                                              {"name": "load_skill", "args": {"skill_name": "lemon"}, "id": "c4"}])
agent = Scripted(script=[duplicated, AIMessage(content="Four repairs.")], seen=[])
t.llm = lambda max_tokens, num_ctx=0: agent
result = t.ask_once(t.build("skills"), "skills", "How many repairs make a lemon?", thread="skills-check")
assert result["specialists_called"] == ["lemon"], result["specialists_called"]
second_call = " ".join(text for _, text in agent.seen[1])
assert "Loaded skill: lemon" in second_call, agent.seen[1]
assert sum(1 for kind, _ in agent.seen[1] if kind == "tool") == 1, "a repeated load_skill call should run once"
print("ok 2: load_skill ran and its document reached the next model call")

# 2b. skills, a second, different skill in the same reply: the limit lets the first run and blocks the second
two = AIMessage(content="", tool_calls=[{"name": "load_skill", "args": {"skill_name": "lemon"}, "id": "c5"},
                                        {"name": "load_skill", "args": {"skill_name": "dwi"}, "id": "c6"}])
agent = Scripted(script=[two, AIMessage(content="Four repairs.")], seen=[])
t.llm = lambda max_tokens, num_ctx=0: agent
result = t.ask_once(t.build("skills"), "skills", "How many repairs make a lemon?", thread="skills-limit")
loaded = " ".join(text for kind, text in agent.seen[1] if kind == "tool")
assert "Loaded skill: lemon" in loaded and "Loaded skill: dwi" not in loaded, agent.seen[1]
print("ok 2b: with one load allowed per question, the first skill loaded and the second was blocked")

# 3. router
class Classifier:
    def with_structured_output(self, schema):
        return RunnableLambda(lambda _: schema(classifications=[{"source": "lemon", "query": "How many repairs make a lemon?"}]))

routed = Scripted(script=[AIMessage(content="Four repairs.")], seen=[])
synth = Scripted(script=[AIMessage(content="Four repairs. This is general information, not legal advice.")], seen=[])
t.llm = lambda max_tokens, num_ctx=0: {200: Classifier(), 300: routed, 400: synth}[max_tokens]
result = t.ask_once(t.build("router"), "router", "How many repairs make a lemon?")
assert result["specialists_called"] == ["lemon"] and "Four repairs" in result["answer"], result
print("ok 3: the router classified, fanned out to the lemon specialist with Send, and synthesized")
```

Everything is in https://github.com/Haddley/mn-traffic-law-agents: the six documents and their sources, the questions, the designs in one script, and every result. `tools/validate_quotes.py` checks each quotation against the sources. Run it with `uv run --python 3.12 --with-requirements requirements.txt traffic_law_agents.py "your question"`, plus `--flat`, `--skills` or `--router`, and set `MODEL=qwen2.5:14b NO_THINK=0` for this post's model.

## The test data

The nineteen questions I ran, with the facts each answer had to contain. A semicolon separates groups that must all appear, and a slash separates alternatives within a group.

- **L1** How many repair attempts for the same problem does a new car need before Minnesota presumes it is a lemon? Areas: lemon. Required: four/4.
- **S1** What is the speed limit in an urban district in Minnesota when nothing is posted? Areas: speeding. Required: 30.
- **D5** What makes a DWI a felony in Minnesota? Areas: dwi. Required: three; ten years/10 years.
- **A2** In a lawsuit after a crash, can the other side use the fact that I was not wearing a seat belt to reduce my damages? Areas: accident. Required: not admissible/inadmissible/cannot/may not/not allowed.
- **P1** Can I use Google Maps for directions while I'm driving? Areas: phone. Required: navigation/gps; hold.
- **L5** The used car dealer sold my car 'as is' but lied about its condition. Does the as-is clause protect the dealer? Areas: lemon. Required: fraud.
- **D7** Can I be charged with DWI while sleeping in my parked car? Areas: dwi. Required: physical control.
- **C6** What did the Minnesota Supreme Court say gross negligence means for a driver? Areas: reckless. Required: very great negligence/scant care.
- **M2** How does the law treat a DWI differently from a speeding ticket? Areas: dwi + speeding. Required: petty misdemeanor; crime/misdemeanor.
- **C3** Do I get to talk to a lawyer before I decide whether to take the breath test? Areas: dwi. Required: limited right/right to counsel/right to consult.
- **C4** Can I be prosecuted for refusing a warrantless blood test? Areas: dwi. Required: cannot/not; blood.
- **L3** When a manufacturer has to refund a lemon, how much can it deduct for my use of the car? Areas: lemon. Required: ten cents/10 cents; ten percent/10 percent.
- **F3** My new car had the same transmission problem repaired four times by the dealer. Who owes me a refund? Areas: lemon. Required: manufacturer.
- **P2** Can I read a text message on my phone screen while driving if I'm using hands-free mode? Areas: phone. Required: read; not/cannot/prohibit/illegal.
- **R1** What counts as reckless driving in Minnesota? Areas: reckless. Required: consciously.
- **C2** Can an officer hold me after finishing a speeding ticket so a drug dog can sniff my car? Areas: speeding. Required: reasonable suspicion.
- **C7** What does the state have to show before a laser speed reading can be used against me? Areas: speeding. Required: external/tested.
- **O3** What is the speed limit in Wisconsin? Areas: none. Required: none, the question is outside the six areas.
- **F1** I hit a pedestrian while texting and they died. What crimes could I face? Areas: reckless or reckless + accident or phone + reckless or phone + reckless + accident or accident or phone + accident. Required: ten years/10 years.

The conversation file, `questions_followup.json`:

```json
[
 {
  "id": "K1",
  "turns": [
   {
    "question": "What is the speed limit in an urban district in Minnesota when nothing is posted? Do you need any additional details from me?",
    "expected": [
     [
      "speeding"
     ]
    ],
    "must_include": [
     [
      "30"
     ]
    ]
   },
   {
    "question": "What about in an alley?",
    "expected": [
     [
      "speeding"
     ]
    ],
    "must_include": [
     [
      "10",
      "ten"
     ]
    ]
   },
   {
    "question": "And if I was 25 mph over the limit there, would I pay anything extra?",
    "expected": [
     [
      "speeding"
     ]
    ],
    "must_include": [
     [
      "surcharge"
     ]
    ]
   }
  ]
 },
 {
  "id": "K2",
  "turns": [
   {
    "question": "What happens to my license if I'm clocked at 105 mph? Do you need any additional details from me?",
    "expected": [
     [
      "speeding"
     ]
    ],
    "must_include": [
     [
      "six months"
     ]
    ]
   },
   {
    "question": "Is that a crime or just a ticket?",
    "expected": [
     [
      "speeding"
     ]
    ],
    "must_include": [
     [
      "petty misdemeanor"
     ]
    ]
   },
   {
    "question": "What if I was also texting at the time?",
    "expected": [
     [
      "phone"
     ],
     [
      "phone",
      "speeding"
     ],
     [
      "phone",
      "reckless"
     ]
    ],
    "must_include": [
     [
      "hold",
      "hands-free",
      "hands free",
      "careless",
      "reckless"
     ]
    ]
   }
  ]
 },
 {
  "id": "K3",
  "turns": [
   {
    "question": "How big is the fine if I speed in a work zone? Do you need any additional details from me?",
    "expected": [
     [
      "speeding"
     ]
    ],
    "must_include": [
     [
      "$300",
      "300"
     ]
    ]
   },
   {
    "question": "Does that apply when no workers are there?",
    "expected": [
     [
      "speeding"
     ]
    ],
    "must_include": [
     [
      "workers"
     ]
    ]
   },
   {
    "question": "And what about a school zone?",
    "expected": [
     [
      "speeding"
     ]
    ],
    "must_include": [
     [
      "surcharge"
     ]
    ]
   }
  ]
 },
 {
  "id": "K4",
  "turns": [
   {
    "question": "My car keeps breaking down. Can I get my money back? Do you need any additional details from me?",
    "expected": [
     [
      "lemon"
     ]
    ],
    "must_include": [
     [
      "four",
      "4"
     ]
    ],
    "clarify": true,
    "reply_if_asked": "It was new, I bought it 8 months ago and the transmission has been repaired three times."
   },
   {
    "question": "It has also been out of service for a total of 35 business days.",
    "expected": [
     [
      "lemon"
     ]
    ],
    "must_include": [
     [
      "30"
     ]
    ]
   }
  ]
 },
 {
  "id": "K5",
  "turns": [
   {
    "question": "Can I sue the other driver after a car crash? Do you need any additional details from me?",
    "expected": [
     [
      "accident"
     ]
    ],
    "must_include": [
     [
      "4,000"
     ]
    ],
    "clarify": true,
    "reply_if_asked": "I had $2,500 in medical bills, no permanent injury, and I was off work for 10 days."
   },
   {
    "question": "What if the jury says I was 20 percent at fault?",
    "expected": [
     [
      "accident"
     ]
    ],
    "must_include": [
     [
      "reduc",
      "diminish",
      "proportion"
     ]
    ]
   }
  ]
 },
 {
  "id": "K6",
  "turns": [
   {
    "question": "Can I lose my license after a breath test? Do you need any additional details from me?",
    "expected": [
     [
      "dwi"
     ]
    ],
    "must_include": [
     [
      "90 days"
     ]
    ],
    "clarify": true,
    "reply_if_asked": "I took the test and it showed 0.10. I am 30 and have no prior incidents."
   },
   {
    "question": "What if I had refused instead?",
    "expected": [
     [
      "dwi"
     ]
    ],
    "must_include": [
     [
      "one year",
      "1 year"
     ]
    ]
   }
  ]
 }
]
```

## The knowledge documents

The six documents, exactly as the agents received them. You can also download them: [speeding.md](/assets/images/orchestration1/knowledge/speeding.md), [mobile-phone.md](/assets/images/orchestration1/knowledge/mobile-phone.md), [dwi.md](/assets/images/orchestration1/knowledge/dwi.md), [reckless-driving.md](/assets/images/orchestration1/knowledge/reckless-driving.md), [lemon-law.md](/assets/images/orchestration1/knowledge/lemon-law.md) and [car-accidents.md](/assets/images/orchestration1/knowledge/car-accidents.md).

### Speeding (`speeding.md`)

```markdown
# Minnesota speeding and speed limits

This document is general legal information about Minnesota speed limits and speeding offenses (petty misdemeanor traffic violations). It is not legal advice, and it does not cover every situation.

## Sources and currency

- Minn. Stat. § 169.14 (speed restrictions), § 169.011 (definitions), § 169.89 (penalties), and §§ 609.02 and 609.03 (definitions of petty misdemeanor and misdemeanor, and their maximum sentences).
- Text taken from the 2025 Minnesota Statutes, as published by the Office of the Revisor of Statutes at https://www.revisor.mn.gov/statutes/ and read on 2026-09-20. Laws passed in the 2026 legislative session may not be reflected.
- Section 169.14 was last amended by 2024 c 127 art 3 s 49-51.
- Court decisions: Minnesota Supreme Court and Court of Appeals opinions, and United States Supreme Court opinions, read in the Harvard Caselaw Access Project (https://case.law/) or on the Cornell Legal Information Institute site (https://www.law.cornell.edu/supremecourt/text/). Every passage placed in quotation marks in the case sections below was checked against the opinion text. The summaries of holdings are my own reading of each opinion and are short. Older opinions cite the same statutes by earlier subdivision numbers and dates, for example Minn. Stat. § 169.14 (1982).

## The basic speed rule

Section 169.14, subd. 1, applies everywhere and at every speed: "No person shall drive a vehicle on a highway at a speed greater than is reasonable and prudent under the conditions." The same subdivision adds that "Every driver is responsible for becoming and remaining aware of the actual and potential hazards then existing on the highway and must use due care in operating a vehicle." Speed must be restricted as necessary to avoid colliding with any person, vehicle or other conveyance. A driver can therefore break the law while under the posted or statutory limit if the speed is not reasonable and prudent for the conditions.

## Statutory speed limits

Section 169.14, subd. 2(a), sets these speeds "where no special hazard exists". Speeds above them are "prima facie evidence that the speed is not reasonable or prudent and that it is unlawful". The exception is that "the speed limit within any municipality shall be a maximum limit and any speed in excess thereof shall be unlawful".

| Where | Statutory limit |
|---|---|
| Urban district | 30 mph |
| Noninterstate expressways and noninterstate freeways | 65 mph |
| Locations not otherwise specified | 55 mph |
| Interstate highways outside an urbanized area with a population greater than 50,000 | 70 mph |
| Interstate highways inside an urbanized area with a population greater than 50,000 | 65 mph |
| Alleys | 10 mph |
| Residential roadways, if adopted by the road authority | 25 mph |
| Rural residential districts, if adopted by the road authority | 35 mph |

The 25 mph and 35 mph limits are not effective unless the road authority has erected signs showing the speed limit and where the residential roadway or rural residential district begins and ends (subd. 2(b) and (c)). Other subdivisions let road authorities set limits by sign; subd. 2(d) refers to "a speed limit designated on an appropriate sign under subdivision 4, 5, 5b, 5c, or 5e".

Definitions in § 169.011:

- "Urban district" means "the territory contiguous to and including any city street or town road that is built up with structures devoted to business, industry, or dwelling houses situated at intervals of less than 100 feet for a distance of a quarter of a mile or more" (subd. 90).
- "Residential roadway" means "a city street or town road that is either (1) less than one-half mile in total length, or (2) in an area zoned exclusively for housing that is not a collector or arterial street" (subd. 64).
- "Rural residential district" is territory along a city street or town road "built up with visible dwelling houses situated at intervals averaging 300 feet or less for a distance of a quarter of a mile or more" (subd. 69a).

## Passing on a two-lane highway

Section 169.14, subd. 2a, raises the limit by ten miles per hour over the posted limit while a driver is overtaking and passing another vehicle, but only when all four conditions are met: the driver is on a two-lane highway with one lane in each direction; the posted limit is 55 mph or higher; the driver is overtaking and passing another vehicle going the same way; and the driver meets the requirements in § 169.18.

## School zones

Under subd. 5a, local authorities may set a school speed limit within a school zone. It applies "when children are present, going to or leaving school during opening or closing hours or during school recess periods". It "shall not be lower than 15 miles per hour and shall not be more than 30 miles per hour below the established speed limit". It takes effect when signs mark the beginning and end of the zone, and "Any speed in excess of such posted school speed limit is unlawful." A school zone violation carries a surcharge equal to the fine, but not less than $25 (subd. 5a(d)).

## Work zones

Under subd. 5d, on a road with an established limit of 50 mph or greater, the limit is adjusted to 45 mph in a work zone when both (1) at least one lane or part of a lane is closed in either direction and (2) workers are present. It does not apply where positive barriers separate workers from traffic, where the work zone is in place for less than 24 hours, or where the road authority has set a different limit. Road authorities can also authorize reduced work zone limits, reducing the limit by no more than 20 mph on roads with a limit of 55 mph or more.

Under subd. 6a, a person convicted of violating a work zone speed limit, or any other provision of § 169.14 while in a work zone, "shall be required to pay a fine of $300", in addition to the surcharge under § 357.021, subd. 6. Section 169.011, subd. 95, defines "work zone".

## Extreme speed and large excesses

- **Over 100 mph.** Under subd. 1a, the license of a person who violates a speed limit "by driving in excess of 100 miles per hour, is revoked for six months under section 171.17, or for a longer minimum period of time applicable under section 169A.53, 169A.54, or 171.174".
- **20 mph or more over the limit.** Under subd. 2(d), a person who drives 20 miles per hour or more over the applicable limit "is assessed an additional surcharge equal to the amount of the fine imposed for the speed violation, but not less than $25".

## How speed is proved

Section 169.14, subd. 10(a): "In any prosecution in which the rate of speed of a motor vehicle is relevant, evidence of the speed as indicated on radar or other speed-measuring device, including but not limited to a speed safety camera system, is admissible in evidence, subject to the following conditions":

1. "the officer or traffic enforcement agent under section 169.147 operating the device has sufficient training to properly operate the equipment";
2. "the officer or traffic enforcement agent testifies as to the manner in which the device was set up and operated";
3. "the device was operated with minimal distortion or interference from outside sources"; and
4. "the device was tested by an accurate and reliable external mechanism, method, or system at the time it was set up."

Subd. 10(b): records of tests kept in the regular course of a law enforcement agency's operations "are admissible in evidence without further foundation as to the results of the tests", are available to a defendant on demand, and the subdivision does not "preclude or interfere with cross examination or impeachment of evidence of the rate of speed".

A patrol car speedometer reading is admissible under subd. 9 "on a showing that a vehicle is regularly used in traffic law enforcement and that the speedometer thereon is regularly and routinely tested for accuracy and a record of the results of said tests kept on file". The reading is "prima facie evidence" of the speed, "subject to correction by the amount of error, if any, shown to exist by the test made closest in time to the time of said reading".

## Setting and changing limits

- Trunk highways: subd. 4 lets the commissioner of transportation erect signs designating a reasonable and safe limit after "an engineering and traffic investigation". The limit is "effective when such signs are erected", and speeds over it are prima facie evidence that the speed is unlawful, "except that any speed limit within any municipality shall be a maximum limit and any speed in excess thereof shall be unlawful".
- Local streets and highways not on the trunk system: subd. 5 lets local authorities request the commissioner to authorize signs after an engineering and traffic investigation.
- City streets: subd. 5h lets a city "establish speed limits for city streets under the city's jurisdiction other than the limits provided in subdivision 2 without conducting an engineering and traffic investigation". It does not apply "to town roads, county highways, or trunk highways in the city", and the city "must erect appropriate signs to display the speed limit".
- Safe road zones: subd. 5i lets the commissioner set a temporary or permanent limit in a designated safe road zone, effective on the erection of signs, and "Any speed in excess of the posted limit is unlawful."
- Minimum speeds: subd. 8 lets the commissioner post a minimum speed on a trunk highway, and "Any speeds less than the posted minimum speeds shall be prima facie evidence that the speed is not reasonable or prudent and that it is unlawful."

## Reduced speed and civil cases

Section 169.14, subd. 3(a), requires a driver to "drive at an appropriate reduced speed" in listed situations, including when "approaching or passing an authorized emergency vehicle stopped with emergency lights flashing", when "approaching and crossing an intersection or railway grade crossing", "approaching and going around a curve", "approaching a hill crest", on "any narrow or winding roadway", and "when special hazards exist with respect to pedestrians or other traffic or by reason of weather or highway conditions". Under subd. 3(b), failing to reduce speed appropriately near a stopped emergency vehicle adds a surcharge equal to the fine, but not less than $25.

Subd. 7 says the speed limits in the chapter do not "relieve the plaintiff in any civil action from the burden of proving negligence on the part of the defendant as the proximate cause of an accident." How a speeding violation matters in a civil injury case is covered in the car accidents document.

## Speed safety cameras

Section 169.14, subd. 13(a), applies when a violation "is identified through the use of a speed safety camera system implemented under section 169.147". The owner or lessee of the vehicle "is guilty of a petty misdemeanor and must pay a fine of" $40, or $80 "if the violation is for a speed at least 20 miles per hour in excess of the speed limit". Under subd. 13(b), a first offense gets a warning with no fine or conviction, and a second offense is eligible for diversion that includes a traffic safety course. Subd. 13(c) says that does not apply to a violation in a commercial motor vehicle or by a holder of a commercial driver's license or learner's permit. Subd. 13(d) says it "applies to violations committed on or after August 1, 2025, and before August 1, 2029". Under subd. 14(a) the owner is not liable if, for example, the vehicle was stolen, another person is convicted for the same violation, or the owner provides a sworn statement that the owner "was not operating the vehicle at the time of the violation". Evidence from a camera system may be used "solely for a citation or prosecution for a violation under subdivision 13" (subd. 10(c)).

Subd. 12 makes it unlawful to "sell, offer for sale, use, or possess any radar jammer in this state", defined as a device designed or intended "to jam or interfere in any manner with a speed-measuring device operated by a peace officer".

## What kind of offense speeding is

Section 169.89, subd. 1, provides: "Unless otherwise declared in this chapter with respect to particular offenses, it is a petty misdemeanor for any person to do any act forbidden or fail to perform any act required by this chapter." Under subd. 2, a person charged with a petty misdemeanor "is not entitled to a jury trial", "is not subject to imprisonment" and faces "a fine of not more than $300". Section 609.02, subd. 4a, says a petty misdemeanor "does not constitute a crime".

A petty misdemeanor becomes a misdemeanor in two cases (§ 169.89, subd. 1): where the violation "is committed in a manner or under circumstances so as to endanger or be likely to endanger any person or property", or where it is a repeat, "when preceded by two or more petty misdemeanor convictions within the immediate preceding 12-month period". A misdemeanor is a crime for which a sentence of not more than 90 days or a fine of not more than $1,000, or both, may be imposed (§ 609.02, subd. 3; § 609.03).

## Reckless and careless driving

Reckless driving, racing and careless driving are separate crimes under Minn. Stat. § 169.13 and are covered in a separate document. Speeding alone is a petty misdemeanor, as described above, unless § 169.89, subd. 1, raises it to a misdemeanor.

## Leading cases: speed measurements and the evidence of speeding

**State v. Gerdes, 291 Minn. 353, 191 N.W.2d 428 (1971).** The Minnesota Supreme Court held that district courts may take judicial notice of the reliability of radar. This is known only through later decisions that cite it. In State v. Ali, the Court of Appeals described the rule this way: "In State v. Gerdes, 291 Minn. 353, 191 N.W.2d 428 (1971), the Minnesota Supreme Court held that district courts could take judicial notice of the reliability of radar."

**State v. Ali, 679 N.W.2d 359 (Minn. App. 2004).** Officer Johnson watched two vehicles in a 30 mph zone in Minneapolis and checked them with a laser speed-measuring device. The driver challenged his speeding conviction, arguing the laser evidence was inadmissible and the evidence insufficient. The Court of Appeals affirmed: "Because we conclude that the laser evidence was properly admitted, and that the laser reading and the officer's observations are sufficient to support appellant's conviction, we affirm." It said the courts accept "the reliability of radar speedometers where there is evidence they were operated by trained personnel who have adequately tested the accuracy of the particular device by which the defendant's speed was determined", and treated laser evidence the same way. Holding: laser speed readings are admissible when the operator is trained and the device was tested, and a court need not require the officer to qualify as an expert.

**State v. Olson, 887 N.W.2d 687 (Minn. App. 2016).** An officer used a handheld laser to clock Shane Olson at 70 miles per hour in a 55 zone. Olson argued that the officer's external test proved only that the unit measured distance accurately, and that speed depends on accurate time as well as distance. Section 169.14, subd. 10(a)(4), requires an external test. The Court of Appeals held: "Because the officer's external test verified not only that the laser unit was measuring distance accurately but also implicitly verified that it was measuring time accurately, the district court did not abuse its discretion by admitting the officer's testimony of the speed-device evidence, and we affirm." Holding: the external test required by subd. 10(a)(4) can be satisfied by a test of distance measurement that also verifies the timing.

**State v. Manley, 353 N.W.2d 649 (Minn. App. 1984).** A jury found Manley guilty of speeding under § 169.14, subd. 5, but the complaint had charged him under subd. 2, and the state was allowed to amend it after the state had rested its case. The elements of subd. 2 were "speed in excess of 55 m.p.h. or speed in excess of 30 m.p.h. in an urban district", and the elements of subd. 5 were "speed in excess of a posted speed limit which is authorized by the Commissioner of Transportation upon the basis of an engineering and traffic investigation". The court noted that under § 169.06, subd. 4(c), traffic-control devices are presumed to have been placed by lawful authority, so "under the amended charge, a presumption arose and the burden of going forward shifted to appellant." The Court of Appeals reversed the conviction because "the amendment charged a different offense which substantially prejudiced the rights of appellant." Holding: the state cannot switch from a statutory-limit charge to a posted-limit charge after the close of its evidence.

## Leading cases: the traffic stop for speeding

An ordinary speeding ticket begins with a traffic stop. These cases set the limits on what an officer can do during and after one. Cases arising from impaired-driving investigations are in the DWI document.

**Delaware v. Prouse, 440 U.S. 648 (1979).** The Supreme Court held "that except in those situations in which there is at least articulable and reasonable suspicion that a motorist is unlicensed or that an automobile is not registered, or that either the vehicle or an occupant is otherwise subject to seizure for violation of law, stopping an automobile and detaining the driver in order to check his driver's license and the registration of the automobile are unreasonable under the Fourth Amendment." It added: "We hold only that persons in automobiles on public roadways may not for that reason alone have their travel and privacy interfered with at the unbridled discretion of police officers."

**Pennsylvania v. Mimms, 434 U.S. 106 (1977).** The Court held "only that once a motor vehicle has been lawfully detained for a traffic violation, the police officers may order the driver to get out of the vehicle without violating the Fourth Amendment's proscription of unreasonable searches and seizures." It described the extra intrusion as de minimis, and it called the officer-safety justification both legitimate and weighty.

**Berkemer v. McCarty, 468 U.S. 420 (1984).** The Court held that Miranda warnings apply to custodial interrogation "regardless of the nature or severity of the offense", including a misdemeanor traffic offense. But it also held: "The similarly noncoercive aspect of ordinary traffic stops prompts us to hold that persons temporarily detained pursuant to such stops are not "in custody" for the purposes of Miranda." So roadside questions during an ordinary stop do not require Miranda warnings, and a driver is in custody for Miranda purposes when arrested.

**Whren v. United States, 517 U.S. 806 (1996).** The Court held: "As a general matter, the decision to stop an automobile is reasonable where the police have probable cause to believe that a traffic violation has occurred." It rejected the argument that the reasonableness of a stop depends on an officer's actual motive: "Subjective intentions play no role in ordinary, probable-cause Fourth Amendment analysis." A stop for a real traffic violation is lawful even if the officer hoped to find something else.

**State v. George, 557 N.W.2d 575 (Minn. 1997).** A trooper stopped Thomas George's motorcycle for an asserted illegal headlight configuration. The Minnesota Supreme Court held that "Trooper Vaselaar did not have an objective legal basis for suspecting that the George was driving his motorcycle in violation of any motor vehicle law (or that he was violating any other law)". It also held that the state had failed to prove voluntary consent to the ensuing search, and it reversed and vacated the conviction. Holding: a traffic stop needs an objective legal basis, meaning a real violation or reasonable suspicion of one.

**State v. Askerooth, 681 N.W.2d 353 (Minn. 2004).** An officer stopped Todd Askerooth for failing to obey a stop sign, learned he had no license, ordered him out, patted him down, and confined him in the squad car before getting consent to search his van. The Minnesota Supreme Court held that "Article I, Section 10 of the Minnesota Constitution requires that each incremental intrusion during a traffic stop be tied to and justified by one of the following: (1) the original legitimate purpose of the stop, (2) independent probable cause, or (3) reasonableness, as defined in Terry." It reversed. Holding: under the Minnesota Constitution, an officer may not expand a traffic stop step by step without a justification for each step.

**Rodriguez v. United States (U.S. 2015).** The Court held that "Absent reasonable suspicion, police extension of a traffic stop in order to conduct a dog sniff violates the Constitution's shield against unreasonable seizures." The tolerable duration of a stop is determined by its mission, "which is to address the traffic violation that warranted the stop", and "Authority for the seizure ends when tasks tied to the traffic infraction are—or reasonably should have been—completed." Checking the license, warrants, registration and proof of insurance are part of the mission.

**Heien v. North Carolina (U.S. 2014).** The Court held: "Because Darisse's mistake of law was reasonable, there was reasonable suspicion justifying the stop under the Fourth Amendment." An officer's reasonable mistake about what the law prohibits can support a stop. The Minnesota Supreme Court had reached the opposite result in State v. Anderson (2004), discussed in the DWI document, which concerned a stop based on a mistaken reading of the move-over law.

**Navarette v. California (U.S. 2014).** The Court held that a traffic stop "complied with the Fourth Amendment because, under the totality of the circumstances, the officer had reasonable suspicion that the truck's driver was intoxicated", on the strength of an anonymous 911 report that the truck had run the caller off the road.

## How the case law fits together (my summary)

- To prove speed, the state generally uses a radar or laser reading or a tested speedometer. The operator must be trained and the device tested by an external method, and the driver may cross-examine (§ 169.14, subd. 10; Ali; Olson).
- A stop for a traffic violation needs probable cause or reasonable suspicion of a real violation, and the officer's private motive does not matter (Whren, Prouse, George).
- During the stop, the officer may order the driver out of the car (Mimms), may ask routine questions without Miranda warnings (Berkemer), but cannot extend the stop beyond its mission without reasonable suspicion (Rodriguez). Under the Minnesota Constitution each expansion must be justified (Askerooth).
- The charge matters. Switching from an ordinary-limit charge to a posted-limit charge after the evidence closed was reversible error in Manley.

## What this document does not cover

- The dollar amount of an ordinary speeding ticket. It is not set out in the statutes above, and this document does not state it.
- Demerit points, insurance effects, and how to contest or pay a ticket.
- Reckless driving, racing and careless driving, which have their own document.
- Local ordinances, commercial drivers, and special limits for other vehicle types.
- Other sections of chapter 169.
- Court decisions not listed above. The list is a selection of leading decisions, not a complete one.
```

### The hands-free phone law (`mobile-phone.md`)

```markdown
# Minnesota law on driving with a mobile phone (the "hands-free" law)

This document is general legal information about Minnesota's law on using a phone or similar device while driving. It is not legal advice, and it does not cover every situation.

## Sources and currency

- Minn. Stat. § 169.475 (use of wireless communications device) and § 169.011, subd. 94 (definition of "wireless communications device"). Text taken from the 2025 Minnesota Statutes, as published by the Office of the Revisor of Statutes at https://www.revisor.mn.gov/statutes/ and read on 2026-09-20. Laws passed in the 2026 legislative session may not be reflected.
- Session law 2019 c 11 (H.F. 50), which amended § 169.475 and § 169.011, subd. 94. Its effective date is August 1, 2019, for acts committed on or after that date. Section 169.475 was later amended by 2023 c 68 art 4 s 50 and 51.
- Court decisions: United States Supreme Court opinions read on the Cornell Legal Information Institute site (https://www.law.cornell.edu/supremecourt/text/) and Minnesota opinions read in the Harvard Caselaw Access Project (https://case.law/). Every passage placed in quotation marks in the case sections below was checked against the opinion text. The summaries of holdings are my own reading and are short.
- Minnesota House Research Department, "Distracted Driving: Cell Phone Use While Driving", October 2019, https://www.house.mn.gov/hrd/pubs/ss/ssdistdrvg.pdf. This is nonpartisan legislative staff analysis, and it is the source for the first-offense fine and the surcharge below. It is dated October 2019, so those two amounts may have changed.

## What the law prohibits

Section 169.475, subd. 2(a): "when a motor vehicle is in motion or a part of traffic, the person operating the vehicle upon a street or highway is prohibited from":

1. "holding a wireless communications device with one or both hands"; or
2. using a wireless communications device to:
   - "initiate, compose, send, retrieve, or read an electronic message";
   - "engage in a cellular phone call, including initiating a call, talking or listening, and participating in video calling"; and
   - "access the following types of content stored on the device: video content, audio content, images, games, or software applications".

## Key definitions

- **Wireless communications device** (§ 169.011, subd. 94): "(1) a cellular phone, or (2) a portable electronic device that is capable of receiving and transmitting data, including but not limited to text messages and email, without an access line for service." It does not include "a device or feature that is permanently physically integrated into the vehicle", "a global positioning system or navigation system that is only capable of being used for navigation purposes", or "a two-way radio, citizens band radio, or amateur radio equipment used in accordance with Federal Communications Commission rules and regulations".
- **Electronic message** (§ 169.475, subd. 1(b)): "a self-contained piece of digital communication that is designed or intended to be transmitted between physical devices." It includes email, a text message, an instant message, "a command or request to access a web page", a voice mail message, a transmitted image, transmitted video content including through video calling, and transmitted gaming data. It does not include "voice or audio data transmitted as a result of making a phone call", data transmitted between a vehicle and a device in the vehicle, two-way, citizens band or amateur radio data, or "data transmitted automatically without direct initiation by a person".
- **Voice-activated or hands-free mode** (subd. 1(c)): a feature, accessory, wireless connection or built-in capability "that allows the person to use verbal or single touch commands to" activate or deactivate the device, and to activate or deactivate a function or software application of the device. It "does not include typing or scrolling on a device."
- **In motion or part of traffic** (subd. 1(d)): a vehicle "is not in motion or a part of traffic if the vehicle is lawfully stopped, is in a location that is not designed or ordinarily used for vehicular travel, and is not obstructing traffic". House Research explains that a vehicle stopped at a stop sign, at a traffic light or in a traffic jam is still part of traffic.

## What is allowed

Under § 169.475, subd. 3(a), the prohibitions do not apply if a person uses a wireless communications device:

1. "solely in a voice-activated or hands-free mode" to initiate or participate in a cellular phone call, "provided that the person does not hold the device with one or both hands", or to initiate, compose, send or listen to an electronic message;
2. to view or operate a GPS or navigation system without typing while the vehicle is in motion, "provided that the person does not hold the device with one or both hands";
3. to listen to audio-based content without scrolling or typing while the vehicle is in motion, and without holding the device;
4. "to obtain emergency assistance to (i) report a traffic accident, medical emergency, or serious traffic hazard, or (ii) prevent a crime about to be committed";
5. "in the reasonable belief that a person's life or safety is in immediate danger"; or
6. in an authorized emergency vehicle while performing official duties.

Subdivision 3(b) limits the hands-free exception: it "does not apply to accessing nonnavigation video content, engaging in video calling, engaging in live-streaming, accessing gaming data, or reading electronic messages." So a driver can use hands-free mode to dictate or listen to a message, but not to read one.

## Penalties

- **Second or later violation.** Section 169.475, subd. 2(b), provides: "A person who violates paragraph (a) a second or subsequent time must pay a fine of $275."
- **First violation.** The statute itself does not state an amount. House Research (October 2019) says the law lets the Judicial Council set the fine and that "The current fine for a first offense is $50." It also says tickets are "subject to the surcharge on all criminal and traffic offenses, which increases the amount an offender must pay by at least $75." These figures come from 2019 and may have changed.
- **Type of offense.** House Research describes violations as "payable offenses", which are "punished by a fine" like a speeding ticket, are "not technically crimes under Minnesota law" and "do not require a court appearance". It adds that "Failure to pay a fine can result in the suspension of a driver's license."
- **When it can become a crime.** House Research says that if phone use "results in some other dangerous driving conduct, prosecutors can charge a more serious crime", for example careless or reckless driving under Minn. Stat. § 169.13. Careless and reckless driving are misdemeanors, and reckless driving that causes great bodily harm or death is a gross misdemeanor.

## History of the statute

The history line of § 169.475 in the 2025 statutes lists these enactments: 2008 c 350 art 1 s 38, 2015 c 75 art 2 s 22, 2019 c 11 s 2, and 2023 c 68 art 4 s 50 and 51. The 2019 act is the hands-free law. House Research (October 2019) says the Legislature passed a hands free law making it illegal for drivers to use hand-held cell phones while driving, and adds: "While it was previously illegal to text while driving, the new law also increased restrictions on using all electronic communication devices." Conduct before August 1, 2019 was governed by the earlier text of the statute, which this document does not set out.

## How the pieces apply (my reading, not a quotation)

| Conduct while the vehicle is moving or part of traffic | Prohibited? | Why |
|---|---|---|
| Holding the phone to your ear for a call | Yes | Holding a wireless communications device with one or both hands (subd. 2(a)(1)) |
| Talking on a call through a car's built-in system or a paired earpiece, with the phone in a mount | Generally no | Hands-free mode with no holding (subd. 3(a)(1)) |
| Dictating a text message by voice | No | Voice-activated or hands-free mode allows initiating, composing, sending or listening to an electronic message (subd. 3(a)(1)(ii)) |
| Reading an incoming text on the screen | Yes | Hands-free mode does not extend to "reading electronic messages" (subd. 3(b)) |
| Typing a destination into a navigation app while driving | Yes | The navigation exception requires that the use not "require the driver to type" (subd. 3(a)(2)) |
| Following a map on a phone in a mount, with no typing and no holding | No | Navigation exception (subd. 3(a)(2)) |
| Scrolling through a music or podcast app | Yes | The audio exception requires that the use not require the driver "to scroll or type" (subd. 3(a)(3)) |
| Playing a video or a game, or watching a video call | Yes | Hands-free mode does not extend to "nonnavigation video content", "video calling" or "gaming data" (subd. 3(b)) |
| Stopped at a red light with the engine on, holding the phone | Yes | A vehicle is not "in motion or a part of traffic" only if it is lawfully stopped, in a location not designed or ordinarily used for vehicular travel, and not obstructing traffic (subd. 1(d)) |
| Calling 911 to report a crash | No | Emergency assistance exception (subd. 3(a)(4)) |

A driver's own phone is not the only concern. A vehicle's built-in screen is "permanently physically integrated into the vehicle" and so is not a "wireless communications device" under § 169.011, subd. 94.

## Related crimes when phone use leads to harm

The hands-free law is a fine-only offense, but phone use can be part of the evidence for more serious crimes. Careless driving under § 169.13, subd. 2(a), applies to a person who operates a vehicle "carelessly or heedlessly in disregard of the rights of others, or in a manner that endangers or is likely to endanger any property or any person". It is a misdemeanor. The reckless driving crime requires that the driver was "aware of and consciously disregarding a substantial and unjustifiable risk". Both are covered in the reckless and careless driving document.

If a driver causes the death of a human being as a result of operating a motor vehicle in a grossly negligent manner, § 609.2112, subd. 1(a)(1), makes it criminal vehicular homicide, punishable by imprisonment for not more than ten years or a fine of not more than $20,000, or both. Section 609.2113 does the same for great bodily harm (subd. 1, up to five years), substantial bodily harm (subd. 2, up to three years) and bodily harm (subd. 3, up to 364 days). House Research (2019) notes that "Several states, including Alaska, Illinois, Maryland, Pennsylvania, and Utah explicitly state that a person who is texting and causes an accident resulting in serious injury or death is guilty of a criminal offense", and that Minnesota's law relies on the existing crimes. The meaning of gross negligence is discussed in the reckless driving document (State v. Meany).

## Court decisions

I searched for published Minnesota Supreme Court and Court of Appeals decisions that interpret § 169.475 and did not find one. The search service I used limited how many queries I could make, so this is not proof that none exist. The cases below are general decisions on the Fourth Amendment and traffic stops that apply when a driver is stopped for phone use, and one decision on phones seized at arrest. Unpublished appellate opinions in Minnesota are not precedential and were not reviewed.

**Whren v. United States, 517 U.S. 806 (1996).** "As a general matter, the decision to stop an automobile is reasonable where the police have probable cause to believe that a traffic violation has occurred." "Subjective intentions play no role in ordinary, probable-cause Fourth Amendment analysis." My reading is that an officer who sees a driver holding a phone in motion has a lawful basis for a stop, whatever else the officer might also be thinking.

**Delaware v. Prouse, 440 U.S. 648 (1979).** A stop needs "at least articulable and reasonable suspicion" of a violation. My reading is that an officer cannot stop a driver at random to check for phone use.

**Heien v. North Carolina (U.S. 2014).** "Because Darisse's mistake of law was reasonable, there was reasonable suspicion justifying the stop under the Fourth Amendment." Because the hands-free law has several exceptions, an officer may be mistaken about what is prohibited. Under Heien, a reasonable mistake of law does not by itself make a stop unconstitutional. This is a federal rule, and the Minnesota Supreme Court has held in State v. Anderson (2004), discussed in the DWI document, that an officer's mistaken belief about a traffic law did not supply the basis for a stop in that case.

**Rodriguez v. United States (U.S. 2015).** "Authority for the seizure ends when tasks tied to the traffic infraction are—or reasonably should have been—completed." My reading is that after a stop for holding a phone, the officer may check the license and registration and write the ticket, but may not prolong the stop for unrelated investigation without reasonable suspicion.

**Riley v. California (U.S. 2014).** The Court held that "The police generally may not, without a warrant, search digital information on a cell phone seized from an individual who has been arrested." It concluded: "Our answer to the question of what police must do before searching a cell phone seized incident to an arrest is accordingly simple—get a warrant." The case is about a search after an arrest and not about phone use while driving, but it applies when a driver is arrested and the officer wants to look inside the phone. Being ticketed for a violation of § 169.475 does not by itself give an officer the right to look through the phone. My reading is that this limit still applies to the phone of a driver arrested for careless driving or DWI.

**State v. Meany, 262 Minn. 491 (1962), and State v. Kissner, 541 N.W.2d 317 (Minn. App. 1995).** These decisions on gross negligence apply to any driver, including a distracted one, whose conduct causes a death. They are summarized in the reckless driving document.

## How this fits together (my summary)

- The statute prohibits holding a device and prohibits using it for messages, calls and stored content, unless the device is used solely in hands-free mode or fits an exception. Reading a message is never allowed through hands-free mode.
- The statute applies whenever the vehicle is in motion or part of traffic, including at a red light.
- The ticket is a payable, fine-only offense. The second offense in the statute costs $275. The first-offense fine is set outside the statute.
- A stop for phone use is judged like any other traffic stop under the cases above. Searching the phone afterward generally needs a warrant.
- If phone use contributes to a crash, the driver can face careless or reckless driving, or criminal vehicular operation or homicide, which need different proof.

## What this document does not cover

- Whether the current first-offense fine and surcharge are still the 2019 amounts.
- Special rules for commercial drivers, school bus drivers or drivers holding a learner's permit or provisional license. Section 169.475 contains no separate provisions for them, but other laws may apply and were not researched.
- Local ordinances, and how tickets are contested.
- Court decisions not listed above. No published Minnesota appellate decision on § 169.475 was found, and the general cases above are a selection.
```

### Driving while impaired (`dwi.md`)

```markdown
# Minnesota driving while impaired (DWI)

This document is general legal information about Minnesota's impaired driving law and the leading court decisions that interpret it. It is not legal advice, and it does not cover every situation. Impaired driving charges can carry jail time and the loss of a driver's license, and anyone facing one should speak to a lawyer.

## Sources and currency

- Minn. Stat. chapter 169A: § 169A.03 (definitions), § 169A.20 (the offenses), §§ 169A.24 to 169A.27 (first- to fourth-degree DWI), §§ 169A.275 to 169A.277 (mandatory penalties and long-term monitoring), § 169A.33 (underage drinking and driving), § 169A.35 (open bottle law), § 169A.41 (preliminary screening test), § 169A.51 (implied consent) and § 169A.52 (test refusal or failure; revocation).
- Minn. Stat. § 171.178 (license revocation periods for DWI), and §§ 609.02 and 609.03 (definitions of misdemeanor and gross misdemeanor and their general maximum sentences).
- Text taken from the 2025 Minnesota Statutes, as published by the Office of the Revisor of Statutes at https://www.revisor.mn.gov/statutes/ and read on 2026-09-20. Laws passed in the 2026 legislative session may not be reflected. Section 169A.20 was last amended by 2023 c 63 art 4 s 28.
- Court decisions: Minnesota Supreme Court and Court of Appeals opinions, and United States Supreme Court opinions, read in the Harvard Caselaw Access Project (https://case.law/) or on the Cornell Legal Information Institute site (https://www.law.cornell.edu/supremecourt/text/). Every passage placed in quotation marks in the case sections below was checked against the opinion text. The summaries of holdings are my own reading of each opinion and are short. Older opinions cite the DWI statute by its former number, § 169.121, which was recodified as chapter 169A.
- Where a sentence below is my reading of how sections fit together, and not a quotation, it says so. Court decisions can be overruled or limited by later decisions, and this document notes the ones that were.

## Terminology

Chapter 169A of the Minnesota Statutes is titled "driving while impaired", and the offenses are called "driving while impaired" (DWI). I did not find the term "DUI" in the sections quoted here. Wherever this document says DWI, it means the offenses in § 169A.20.

## What is a DWI offense

Section 169A.20, subd. 1: "It is a crime for any person to drive, operate, or be in physical control of any motor vehicle, as defined in section 169A.03, subdivision 15, within this state or on any boundary water of this state when":

1. "the person is under the influence of alcohol";
2. "the person is under the influence of a controlled substance";
3. "the person is under the influence of an intoxicating substance and the person knows or has reason to know that the substance has the capacity to cause impairment";
4. "the person is under the influence of a combination of any two or more of" those substances or of cannabis-related substances (clause 8);
5. "the person's alcohol concentration at the time, or as measured within two hours of the time, of driving, operating, or being in physical control of the motor vehicle is 0.08 or more";
6. "the vehicle is a commercial motor vehicle and the person's alcohol concentration at the time, or as measured within two hours of the time, of driving, operating, or being in physical control of the commercial motor vehicle is 0.04 or more";
7. "the person's body contains any amount of a controlled substance listed in Schedule I or II, or its metabolite", other than cannabis flower, a cannabis product, a lower-potency hemp edible, a hemp-derived consumer product, an artificially derived cannabinoid, or tetrahydrocannabinols; or
8. "the person is under the influence of cannabis flower, a cannabis product, a lower-potency hemp edible, a hemp-derived consumer product, an artificially derived cannabinoid, or tetrahydrocannabinols".

Two points follow from the wording. The offense covers being "in physical control" of the vehicle as well as driving it, and a person can be guilty under clause 1 by being under the influence even if the alcohol concentration is below 0.08.

Definitions in § 169A.03:

- "Motor vehicle" means "every vehicle that is self-propelled and every vehicle that is propelled by electric power obtained from overhead trolley wires. The term includes motorboats in operation and off-road recreational vehicles, but does not include a vehicle moved solely by human power" (subd. 15).
- "Alcohol concentration" means the number of grams of alcohol per 100 milliliters of blood, per 210 liters of breath, or per 67 milliliters of urine (subd. 2).

## Refusing a chemical test is a separate crime

Section 169A.20, subd. 2: "It is a crime for any person to refuse to submit to a chemical test: (1) of the person's breath under section 169A.51 (chemical tests for intoxication), or 169A.52 (test refusal or failure; revocation of license); or (2) of the person's blood or urine as required by a search warrant".

Under the implied consent law, § 169A.51, subd. 1(a), a person who drives, operates or is in physical control of a motor vehicle in Minnesota "consents, subject to the provisions of sections 169A.50 to 169A.53 (implied consent law), and section 169A.20 (driving while impaired), to a chemical test of that person's blood, breath, or urine for the purpose of determining the presence of alcohol", and other substances, "administered at the direction of a peace officer". Subd. 1(b) says the test may be required when an officer has probable cause to believe the person was driving impaired and one of these conditions exists: the person has been lawfully arrested for DWI; the person was in an accident resulting in property damage, injury or death; the person refused the preliminary screening test; or the screening test showed an alcohol concentration of 0.08 or more.

## The preliminary screening test

Section 169A.41, subd. 1, lets a peace officer who "has reason to believe from the manner in which a person is driving, operating, controlling, or acting upon departure from a motor vehicle" that the driver may be violating the DWI law require "a sample of the driver's breath for a preliminary screening test using a device approved by the commissioner for this purpose". Subd. 2 limits its use: the result "must be used for the purpose of deciding whether an arrest should be made and whether to require the tests authorized in section 169A.51 (chemical tests for intoxication), but must not be used in any court action except" in the listed situations, which include proving that a chemical test "was properly required" and prosecutions for test refusal. My reading is that the roadside screening result is a tool for the officer's decision, not ordinary trial evidence of the alcohol concentration.

## The four degrees of DWI

Section 169A.20, subd. 3, says a person "may be sentenced as provided in" §§ 169A.24 to 169A.27. The degree depends on aggravating factors and prior history.

**Aggravating factors** (§ 169A.03, subd. 3) are:

1. "a qualified prior impaired driving incident within the ten years immediately preceding the current offense";
2. "having an alcohol concentration of 0.16 or more as measured at the time, or within two hours of the time, of the offense"; or
3. "having a child under the age of 16 in the motor vehicle at the time of the offense if the child is more than 36 months younger than the offender".

A "qualified prior impaired driving incident" includes "prior impaired driving convictions and prior impaired driving-related losses of license" (subd. 22).

| Degree | When it applies | Class of crime |
|---|---|---|
| First | A DWI committed within ten years of the first of three or more qualified prior impaired driving incidents, or after a prior felony conviction under § 169A.24 or specified related felonies (§ 169A.24, subd. 1) | Felony: up to seven years, a fine of up to $14,000, or both, with mandatory penalties under § 169A.276 (subd. 2) |
| Second | A DWI with two or more aggravating factors; or a test refusal with one aggravating factor (§ 169A.25, subd. 1) | Gross misdemeanor; mandatory penalties in § 169A.275 and long-term monitoring in § 169A.277 "may be applicable" |
| Third | A DWI with one aggravating factor; or a test refusal (§ 169A.26, subd. 1) | Gross misdemeanor; the same mandatory penalties and monitoring "may be applicable" |
| Fourth | Any other violation of § 169A.20, subd. 1 (§ 169A.27, subd. 1) | Misdemeanor |

Maximum sentences for the lower degrees: sections 169A.25 to 169A.27 state only the class of crime. My reading is that the general limits in § 609.03, which applies when no other punishment is provided, therefore apply. Under that section a gross misdemeanor carries "imprisonment for not more than 364 days or to payment of a fine of not more than $3,000, or both", and a misdemeanor carries "not more than 90 days" or "not more than $1,000", or both.

## Mandatory penalties for repeat offenders

These sections add minimum penalties to the maximums above.

**Nonfelony violations, § 169A.275.**

- Second offense (a DWI within ten years of a qualified prior incident), subd. 1(a): the court "shall sentence" the person to "a minimum of 30 days of incarceration, at least 48 hours of which must be served in a local correctional facility", or "eight hours of community work service for each day less than 30 days that the person is ordered to serve in a local correctional facility". The prosecutor may move, or the court may decide on its own, to sentence without the minimum if "substantial mitigating factors exist", and the reasons must be stated on the record (subd. 1(b) and (c)). Any sentence "must include a mandatory sentence that is not subject to suspension or a stay of imposition or execution, and that includes incarceration for not less than 48 hours or at least 80 hours of community work service" (subd. 1(d)).
- Third offense (within ten years of the first of two qualified prior incidents), subd. 2(a): "a minimum of 90 days of incarceration, at least 30 days of which must be served consecutively in a local correctional facility", or an intensive supervision program that requires the person to "consecutively serve at least six days in a local correctional facility". Under subd. 2(b), not more than 60 days of the minimum may be served on home detention or intensive probation, and under subd. 2(c) the penalties "must be imposed and executed".
- Fourth offense (within ten years of the first of three qualified prior incidents), subd. 3(a): a minimum of 180 days of incarceration with at least 30 days served consecutively in a local correctional facility, or an intensive supervision program with at least six days served consecutively, or staggered sentencing with a minimum of 180 days of incarceration. Under subd. 3(b) not more than 150 days may be served on home detention or intensive probation.
- Fifth offense or more (subd. 4): a minimum of one year of incarceration with at least 60 days served consecutively in a local correctional facility, or one of the other listed programs.

**Felony violations, § 169A.276.** Subd. 1(a): a person convicted of first-degree DWI is sentenced "to imprisonment for not less than three years", and the court may add a fine of not more than $14,000. Subd. 1(b): the court "may stay execution of this mandatory sentence as provided in subdivision 2" but "may not stay imposition or adjudication of the sentence or impose a sentence that has a duration of less than three years". Subd. 1(d): after release the commissioner "shall place the person on conditional release for five years". Subd. 3: "The court may not stay the execution of the driver's license revocation provisions of section 169A.54".

**Long-term monitoring, § 169A.277.** Subd. 1 applies to a person convicted of a DWI "within ten years of the first of two or more prior impaired driving convictions", or under 19 and previously convicted, or driving while the license was canceled as inimical to public safety. Subd. 2: when the court sentences such a person "to a stayed sentence and when electronic monitoring equipment is available", the court "shall require that the person participate in a program of electronic alcohol monitoring", for "a minimum of 30 consecutive days during each year of the person's probationary period". Subd. 3 requires the person to reimburse the cost "to the extent the person is able to pay".

## Underage drinking and driving

Section 169A.33, subd. 2: "It is a crime for a person under the age of 21 years to drive, operate, or be in physical control of a motor vehicle while consuming alcoholic beverages, or after having consumed alcoholic beverages while there is physical evidence of the consumption present in the person's body." Subd. 3 makes it a misdemeanor. Under subd. 4 the commissioner "shall suspend the person's driver's license or operating privileges for 30 days, or for 180 days if the person has previously been found to have violated subdivision 2". Under subd. 5, if the conduct also violates the DWI law, the DWI penalties apply instead of the license sanction in subd. 4.

## Open bottle law

Section 169A.35 makes three things a crime, all misdemeanors under subd. 5:

- Subd. 2: "to drink or consume an alcoholic beverage, distilled spirit, or 3.2 percent malt liquor in a motor vehicle when the vehicle is upon a street or highway".
- Subd. 3: "to have in possession, while in a private motor vehicle upon a street or highway, any bottle or receptacle containing an alcoholic beverage, distilled spirit, or 3.2 percent malt liquor that has been opened, or the seal broken, or the contents of which have been partially removed". "Possession" means "either that the person had actual possession of the bottle or receptacle or that the person consciously exercised dominion and control over the bottle or receptacle" (subd. 1(4)). The offense applies to a passenger as well as the driver.
- Subd. 4: for the owner, or the driver if the owner is not present, "to keep or allow to be kept" such an opened container in the vehicle.

Subd. 6(b): subdivisions 3 and 4 "do not apply to a bottle or receptacle that is in the trunk of the vehicle if it is equipped with a trunk, or that is in another area of the vehicle not normally occupied by the driver and passengers if the vehicle is not equipped with a trunk. However, a utility compartment or glove compartment is deemed to be within the area occupied by the driver and passengers." Subd. 6(a) exempts passengers in a bus operated by a motor carrier of passengers, a commercial pedal vehicle with five or more passengers, and a limousine.

## Effect on the driver's license

License revocation is a separate consequence from the criminal penalty, and it can start before any conviction. Under the statutes it is imposed by "the commissioner".

Under § 169A.52, subd. 3, a test refusal leads to revocation, and under subd. 4 a test failure (an alcohol concentration of 0.08 or more, or the presence of a Schedule I or II controlled substance or its metabolite other than marijuana or tetrahydrocannabinols) leads to revocation, "as provided in section 171.178". The minimum periods in § 171.178 are:

- **Test refusal** (subd. 3): "not less than one year" if the person has no qualified prior impaired driving incidents within the past 20 years. With one or more such incidents within the past 20 years, revocation lasts "until the commissioner determines that the person used an ignition interlock device in compliance with section 171.306 for the period of time described in subdivision 8".
- **Test failure** (subd. 4), with no qualified prior incidents within 20 years: "not less than 90 days"; "not less than 180 days if the person is under 21 years of age and the test results indicate an alcohol concentration of less than twice the legal limit"; and "not less than one year if the test results indicate an alcohol concentration of twice the legal limit or more". With one or more prior incidents within 20 years, revocation lasts until the ignition interlock requirement is met.
- **DWI conviction** (subd. 5), with no qualified prior incidents within 20 years, the periods are:
  - "not less than 30 days" for a conviction under § 169A.20, subd. 1;
  - "not less than 90 days" for a test refusal conviction under subd. 2;
  - "not less than 180 days if the person is under 21 years of age and the test results indicate an alcohol concentration of less than twice the legal limit"; and
  - "not less than one year if the test results indicate an alcohol concentration of twice the legal limit or more".

  With one qualified prior incident within 20 years, or two or more, revocation lasts "until the commissioner determines that the person used an ignition interlock device in compliance with section 171.306". Subd. 5(b) adds time when someone was hurt: "Whenever department records show that the violation involved personal injury or death to any person, at least 90 additional days must be added to the base periods provided in paragraph (a), clause (1), items (i) to (iv)." My reading is that a first-time driver convicted of DWI who injured someone faces at least 30 days plus 90 additional days, and more if under 21 or at twice the legal limit.
- **Criminal vehicular operation or homicide conviction** (subd. 6): for the versions of those crimes that involve impairment (clauses (2) to (6)), revocation is "until the commissioner determines that the person used an ignition interlock device in compliance with section 171.306". Those crimes are covered in the reckless driving document.

For a commercial motor vehicle, § 169A.52 provides for disqualification from operating one under § 171.165, including for a test result of 0.04 or more.

## Leading cases: what counts as "physical control"

The statute reaches a person who is "in physical control" of a vehicle, not only a person who is driving. The statute does not define the phrase, and the Minnesota Supreme Court has read it broadly.

**State, Department of Public Safety v. Juncewski, 308 N.W.2d 316 (Minn. 1981).** Police found David Juncewski inside a pickup truck parked on the side of a county road, seated behind and leaning against the steering wheel. The county court decided the state had not proved he was in physical control. The Minnesota Supreme Court reversed, reasoning that "Because Minnesota laws designed to prevent driving while intoxicated are to be broadly construed in the public's favor", Juncewski exercised the necessary control to have violated § 169.121. The opinion identified as an issue "Whether having the engine running is an essential element of the offense". Holding: a person can be in physical control of a vehicle without driving it, and a running engine is not required.

**Kozak v. Commissioner of Public Safety, 359 N.W.2d 625 (Minn. App. 1984).** A deputy found Joseph Kozak asleep in the driver's seat of a car parked on the highway shoulder. The Court of Appeals affirmed the finding that he was in physical control while under the influence. It observed: "The legislature has not defined the "physical control" element of § 169.121." It also noted that in 1978 the legislature deleted the word "actual" from "actual physical control", that this indicated a desire that the statute be given the "broadest possible effect". Holding: an intoxicated person asleep at the wheel of a parked car can be in physical control, in a license revocation proceeding.

**State v. Starfield, 481 N.W.2d 834 (Minn. 1992).** Deputies found Starfield in a car with the keys not in the ignition; keys were later found in her coat pocket at the jail. The court of appeals had vacated her physical control conviction because the jury was not instructed about whether the vehicle was operable. The Supreme Court reinstated the conviction: "Other courts have held, and we agree, that the state does not need to prove operability of the motor vehicle." It added that "There may be circumstances where operability of a vehicle is relevant on the issue of whether a person has physical control of a motor vehicle while under the influence of alcohol", but no supplementary instruction had been requested. Holding: the state does not have to prove the vehicle could be driven.

## Leading cases: stops and roadside investigation

A DWI case often begins with a traffic stop, and a stop needs a lawful basis. The Fourth Amendment cases on traffic stops generally are in the speeding document. These cases arose from impaired driving investigations.

**Marben v. State, Department of Public Safety, 294 N.W.2d 697 (Minn. 1980).** A trooper stopped Marben, had him do roadside coordination tests, concluded he was under the influence, arrested him, and read the implied consent advisory. The Supreme Court affirmed the revocation for refusing testing and concluded that "Marben was properly arrested", so the implied consent law was validly invoked. It is an early statement that a valid arrest for DWI is the gateway to the implied consent process.

**State v. Anderson, 683 N.W.2d 818 (Minn. 2004).** An officer stopped Matthew Anderson for violating the move-over law, Minn. Stat. § 169.18, subd. 11, but Anderson argued that he had in fact moved a lane away from the stopped emergency vehicle. The district court suppressed the impaired driving evidence because it concluded that Anderson was not actually violating the statute, and the court of appeals reversed, holding that an officer's reasonable interpretation of a statute, even if wrong, may support a stop. The Supreme Court framed the second question as whether "the officer's mistaken belief about the correct interpretation of a traffic law" could form the required objective basis for suspecting criminal activity. It reversed the court of appeals and reinstated the district court's decision, so the suppression order stood. The United States Supreme Court later took a different view under the Fourth Amendment in Heien v. North Carolina (2014): a reasonable mistake of law can justify a stop. See the speeding document for Heien.

**State v. Burbach, 706 N.W.2d 484 (Minn. 2005).** Peggy Burbach was stopped for speeding, and the officer asked to search the vehicle after detecting the odor of alcohol. The Supreme Court held, under Article I, Section 10 of the Minnesota Constitution, that "an officer's detection of the odor of alcohol coming from an adult passenger during a traffic stop does not, by itself, provide a reasonable, articulable suspicion of an open-container violation sufficient to permit an officer to expand the traffic stop by requesting to search the vehicle." Holding: the smell of alcohol on a passenger alone does not justify expanding a traffic stop into a request to search for open bottles.

**State v. Lopez, 698 N.W.2d 18 (Minn. App. 2005).** After a report of "something weird going down with a car in the parking lot", an officer approached Christine Lopez's vehicle with her emergency lights on and partially blocked it. The Court of Appeals held the officer's actions "created a showing of authority sufficient that a reasonable person would not feel free to leave" and so were a seizure, but upheld it as "a reasonable, limited emergency check on appellant's welfare". Holding: a welfare check that amounts to a seizure can be lawful if it is a limited emergency check.

**State v. Klamar, 823 N.W.2d 687 (Minn. App. 2012).** A trooper checked on a vehicle stopped on the side of an interstate in the early morning, smelled a strong odor of alcohol, and was told the driver had one drink. The trooper ordered the driver out to perform field sobriety tests. The Court of Appeals reversed the district court's dismissal, holding that "the trooper's approach to Klamar's vehicle to check on the welfare of its occupants was not a seizure" and that the later investigative seizure "was reasonable at its inception and in its scope".

**Wilkes v. Commissioner of Public Safety, 777 N.W.2d 239 (Minn. App. 2010).** An officer saw a vehicle stopped in the right lane of a road around midnight. The Court of Appeals held that "appellant's driving conduct and the totality of the circumstances support a reasonable, articulable suspicion of criminal activity", and affirmed the license revocation.

**Magnuson v. Commissioner of Public Safety, 703 N.W.2d 557 (Minn. App. 2005).** The Court of Appeals held that a stop based on a tip from an identified informant was lawful because "the police had reason to believe that the informant's tip was based on personal observation". It also held that the implied consent advisory did not violate due process because it did not warn that an alcohol concentration of .20 or more is an aggravating factor, since "due process does not require that the implied-consent advisory warn a driver of every possible consequence".

**Navarette v. California (U.S. 2014).** The United States Supreme Court held that a traffic stop "complied with the Fourth Amendment because, under the totality of the circumstances, the officer had reasonable suspicion that the truck's driver was intoxicated", based on a 911 call reporting that the truck had run the caller off the road.

**Michigan Department of State Police v. Sitz, 496 U.S. 444 (1990).** The Supreme Court considered "whether a State's use of highway sobriety checkpoints violates the Fourth and Fourteenth Amendments" and held: "We hold that it does not."

## Leading cases: the implied consent advisory and the right to counsel

**Friedman v. Commissioner of Public Safety, 473 N.W.2d 828 (Minn. 1991).** Joy Friedman's license was revoked for refusing an implied consent breath test after she was denied a chance to consult a lawyer. The Supreme Court reversed. It held under article I, section 6 of the Minnesota Constitution that "the right to counsel attaches at the chemical testing stage." The right is limited: "The right to counsel will be considered vindicated if the person is provided with a telephone prior to testing and given a reasonable time to contact and talk with counsel." and "If counsel cannot be contacted within a reasonable time, the person may be required to make a decision regarding testing in the absence of counsel." Holding: a driver asked to submit to a chemical test has a limited right to consult a lawyer first.

**State v. Melde, 725 N.W.2d 99 (Minn. 2006).** Two drivers argued that the advisory did not adequately warn them of the consequences of refusing. The Supreme Court held that the advisory "violates neither federal nor state procedural due process guarantees". It relied on South Dakota v. Neville: "This warning makes it clear that a test-refusal is not a "safe harbor."" and noted that "Minnesota drivers have a limited right to counsel before testing."

**State v. Hunn, 911 N.W.2d 816 (Minn. 2018).** Scott Hunn was asked at the jail whether he would consent to urine testing, without the deputy first reading the implied consent advisory. The Supreme Court held that "the limited right to counsel recognized by Friedman is triggered only when the implied-consent advisory is read." Holding: if the officer does not invoke the implied consent law, the Friedman right does not arise.

**State v. Rosenbush, 931 N.W.2d 91 (Minn. 2019).** An officer obtained a search warrant for Jennifer Rosenbush's blood and read her the newer advisory for blood and urine tests, which says only that refusal is a crime. The Supreme Court held that "the limited right to counsel established in Friedman does not apply when an individual is asked to submit to a blood test pursuant to a warrant".

**Mell v. Commissioner of Public Safety, 757 N.W.2d 702 (Minn. App. 2008).** The Court of Appeals held that a preliminary breath test given by a county jail as part of the routine booking process was permissible, and that the driver's right to counsel was not violated when he had two minutes to use the telephone and telephone book before the deputy required the test.

**State v. Larivee, 656 N.W.2d 226 (Minn. 2003).** The district court had ruled that a driver denied access to an independent blood-alcohol test suffered a due process violation. The Supreme Court held that when a person charged with a related driving offense is in custody, "the person must submit to the state's test as a condition precedent to the right to an independent test." Larivee had refused to let the officer direct the state's test, so the statute gave him no right to an additional test, and the Court affirmed the court of appeals on that statutory question.

**State v. Koppi, 798 N.W.2d 358 (Minn. 2011).** John Koppi was convicted of second-degree test refusal. The Supreme Court reversed and ordered a new trial because "the district court's instruction to the jury included an incorrect, purely subjective definition of probable cause and the instructional error was not harmless beyond a reasonable doubt". Holding: the jury must be given an objective standard of probable cause for the officer's request for a test.

## Leading cases: testing and the Fourth Amendment

This is the area where the law has changed most. The United States Supreme Court's decisions changed what Minnesota could do, and the Minnesota Supreme Court responded.

**Schmerber v. California, 384 U.S. 757 (1966).** A driver was hospitalized after a crash and police had a doctor draw his blood over his objection. The Court held that the privilege against self-incrimination "protects an accused only from being compelled to testify against himself, or otherwise provide the State with evidence of a testimonial or communicative nature", so the blood test did not violate it. On the Fourth Amendment, "Given these special facts, we conclude that the attempt to secure evidence of blood-alcohol content in this case was an appropriate incident to petitioner's arrest."

**South Dakota v. Neville, 459 U.S. 553 (1983).** The Court held: "a refusal to take a blood-alcohol test, after a police officer has lawfully requested it, is not an act coerced by the officer, and thus is not protected by the privilege against self-incrimination." It also held that the warning that a driver could lose the license "made it clear that refusing the test was not a 'safe harbor,' free of adverse consequences."

**State v. Shriner, 751 N.W.2d 538 (Minn. 2008).** After Janet Shriner caused a car accident, police took her blood without a warrant. The Minnesota Supreme Court held that "The rapid, natural dissipation of alcohol in the blood creates single-factor exigent circumstances that will justify the police taking a warrantless, nonconsensual blood draw from a defendant, provided that the police have probable cause to believe that defendant committed criminal vehicular operation." This single-factor rule was later rejected by the United States Supreme Court in Missouri v. McNeely.

**State v. Netland, 762 N.W.2d 202 (Minn. 2009).** Jakklyn Netland argued that the criminal test refusal statute was unconstitutional. The Supreme Court held that "Netland's right to due process was not violated and that the criminal test-refusal statute did not result in an unconstitutional search". The reasoning relied on the exigency of vanishing alcohol evidence, which McNeely later undercut.

**Missouri v. McNeely, 569 U.S. 141 (2013).** The Court held "that in drunk-driving investigations, the natural dissipation of alcohol in the bloodstream does not constitute an exigency in every case sufficient to justify conducting a blood test without a warrant." Whether an exigency exists depends on the totality of the circumstances.

**State v. Brooks, 838 N.W.2d 563 (Minn. 2013).** Police took blood and urine samples from Wesley Brooks without a search warrant. The Supreme Court held that "Brooks voluntarily consented to the searches at issue in this case" under the totality of the circumstances, so no warrant was needed. It cautioned that it did not hold that Brooks consented merely because Minnesota law provides that anyone who drives in Minnesota consents to testing.

**Birchfield v. North Dakota (U.S. 2016).** The Court held: "The Fourth Amendment permits warrantless breath tests incident to arrests for drunk driving but not warrantless blood tests." The reasoning weighed the intrusion of each kind of test against the government's need.

**State v. Bernard, 859 N.W.2d 762 (Minn. 2015).** William Bernard was charged with test refusal after refusing a breath test following a valid DWI arrest. The Supreme Court held that "a warrantless breath test of Bernard would have been constitutional under the search-incident-to-arrest exception to the Fourth Amendment's warrant requirement", and therefore that "the test refusal statute is a reasonable means to a permissive object and that it passes rational basis review". This result is consistent with Birchfield for breath tests.

**State v. Lindquist, 869 N.W.2d 863 (Minn. 2015).** Bonnie Lindquist's blood was drawn without a warrant before McNeely. The Supreme Court held that McNeely applied to her case on direct review, but that her test results did not need to be suppressed because the officer who facilitated the blood draw acted in objectively reasonable reliance on binding appellate precedent. This adopted the good-faith exception to the exclusionary rule in Minnesota for that situation.

**State v. Thompson, 886 N.W.2d 224 (Minn. 2016).** Ryan Thompson refused warrantless blood and urine tests after a DWI arrest and was convicted of test refusal. Applying Birchfield, the Supreme Court held: "a warrantless urine test does not qualify as a search incident to a valid arrest of a suspected drunk driver", and that Thompson "cannot be prosecuted for refusing to submit to an unconstitutional warrantless blood or urine test". The test refusal statute was unconstitutional as applied to him. A blood or urine test can still be required with a search warrant, and refusing a warranted test remains a crime under § 169A.20, subd. 2(2).

**Mitchell v. Wisconsin (U.S. 2019).** For a driver who is unconscious and cannot be given a breath test, a plurality of the Court concluded that "the exigent-circumstances doctrine generally permits a blood test without a warrant."

## How the case law fits together (my summary)

- A driver can be guilty by being in physical control of a vehicle without driving it. A running engine and an operable vehicle are not required (Juncewski, Starfield, Kozak).
- An officer needs a lawful reason to stop or seize a driver. The rules on reasonable suspicion are in the speeding document. In DWI investigations the courts have upheld stops based on driving conduct, a reliable tip, or a limited welfare check, and have refused to let the smell of alcohol on a passenger justify a search for open bottles.
- Minnesota drivers have a limited right to consult a lawyer before deciding whether to take a test under the implied consent advisory (Friedman), but only when the advisory is read and not when a warrant has been obtained (Hunn, Rosenbush).
- A breath test after a valid arrest for DWI can be required without a warrant, and refusing it can be charged as a crime (Birchfield, Bernard). Blood and urine tests generally need consent or a warrant, and a driver cannot be prosecuted for refusing a warrantless blood or urine test (Thompson). Alcohol dissipating in the blood is not by itself an emergency that removes the need for a warrant (McNeely).

## What this document does not cover

- Ignition interlock program details, limited licenses, and how to reinstate a license.
- Underage drinking and driving rules beyond the summary above, boating and snowmobile rules beyond the mention of motorboats above, and detailed rules for commercial drivers.
- Field sobriety test procedure, court procedure and plea negotiations.
- Criminal vehicular operation or homicide, which are in the car accidents document and the reckless driving document.
- Court decisions not listed above. The list is a selection of leading decisions, not a complete one.
```

### Reckless and careless driving (`reckless-driving.md`)

```markdown
# Minnesota reckless and careless driving

This document is general legal information about Minnesota's reckless driving and careless driving laws. It is not legal advice, and it does not cover every situation.

## Sources and currency

- Minn. Stat. § 169.13 (reckless or careless driving), last amended by 2019 c 10 s 1 and 2. Also §§ 609.02 and 609.03 (definitions of misdemeanor, gross misdemeanor and great bodily harm, and their general maximum sentences), and § 169.89, subd. 1 (penalties for traffic violations).
- Text taken from the 2025 Minnesota Statutes, as published by the Office of the Revisor of Statutes at https://www.revisor.mn.gov/statutes/ and read on 2026-09-20. Laws passed in the 2026 legislative session may not be reflected.
- Minn. Stat. §§ 609.2112, 609.2113 and 609.2114 (criminal vehicular homicide and operation), read from the 2025 statutes.
- Court decisions: Minnesota Supreme Court and Court of Appeals opinions, read in the Harvard Caselaw Access Project (https://case.law/). Every passage placed in quotation marks in the case sections below was checked against the opinion text. The summaries of holdings are my own reading and are short. Older opinions apply older versions of the statutes, including the earlier numbering and wording of § 169.13 and § 609.21.
- Minnesota House Research Department, "Distracted Driving: Cell Phone Use While Driving", October 2019, https://www.house.mn.gov/hrd/pubs/ss/ssdistdrvg.pdf, for how distracted driving can lead to these charges.

## Reckless driving

Section 169.13, subd. 1(a): "A person who drives a motor vehicle or light rail transit vehicle while aware of and consciously disregarding a substantial and unjustifiable risk that the driving may result in harm to another or another's property is guilty of reckless driving. The risk must be of such a nature and degree that disregard of it constitutes a significant deviation from the standard of conduct that a reasonable person would observe in the situation."

Two things are needed: the driver is aware of the risk and consciously disregards it, and the risk is a significant deviation from what a reasonable person would do.

**Racing** is reckless driving. Subd. 1(b): "A person shall not race any vehicle upon any street or highway of this state. Any person who willfully compares or contests relative speeds by operating one or more vehicles is guilty of racing, which constitutes reckless driving, whether or not the speed contested or compared is in excess of the maximum speed prescribed by law."

## How serious reckless driving is

Subd. 1(c): "A person who violates paragraph (a) or (b) is guilty of a misdemeanor. A person who violates paragraph (a) or (b) and causes great bodily harm or death to another is guilty of a gross misdemeanor."

"Great bodily harm" has the meaning in § 609.02, subd. 8: "bodily injury which creates a high probability of death, or which causes serious permanent disfigurement, or which causes a permanent or protracted loss or impairment of the function of any bodily member or organ or other serious bodily harm."

## Careless driving

Subd. 2(a): "Any person who operates or halts any vehicle upon any street or highway carelessly or heedlessly in disregard of the rights of others, or in a manner that endangers or is likely to endanger any property or any person, including the driver or passengers of the vehicle, is guilty of a misdemeanor."

Careless driving does not require that the driver was aware of the risk. It is a lesser standard than reckless driving, and it is also a misdemeanor.

## Sentences

- **Misdemeanor.** "a sentence of not more than 90 days or a fine of not more than $1,000, or both" (§ 609.02, subd. 3). Section 609.03 sets the same limits when no other punishment is provided.
- **Gross misdemeanor.** Section 609.03 provides "imprisonment for not more than 364 days or to payment of a fine of not more than $3,000, or both", when no other punishment is provided.

The House Research summary from 2019 described a reckless driving death as punishable by "up to a year in jail, a $3,000 fine, or both". The current text of § 609.03 says 364 days for a gross misdemeanor, and this document follows the statute.

## Where the section applies

Subd. 3(a): the section applies, but is not limited in application, to a person who drives in the prohibited manner "(1) upon the ice of any lake, stream, or river", or "(2) in a parking lot ordinarily used by or available to the public though not as a matter of right, and a driveway connecting the parking lot with a street or highway".

Subd. 3(b) says it does not apply to "(1) an authorized emergency vehicle, when responding to an emergency call or when in pursuit of an actual or suspected violator; (2) the emergency operation of any vehicle when avoiding imminent danger; or (3) any raceway, racing facility, or other public event sanctioned by the appropriate governmental authority."

Subd. 3(c): "Nothing in this section or section 609.035 or 609.04 shall limit the power of the state to prosecute or punish a person for conduct that constitutes any other crime under any other law of this state."

## Related rules

- **Ordinary traffic violations can become misdemeanors.** Section 169.89, subd. 1, makes most violations of chapter 169 a petty misdemeanor, "except that" a violation "committed in a manner or under circumstances so as to endanger or be likely to endanger any person or property" is a misdemeanor. That is separate from the reckless and careless driving offenses in § 169.13.
- **Distracted driving.** House Research (2019) says that if using an electronic device "results in some other dangerous driving conduct, prosecutors can charge a more serious crime", for example careless or reckless driving. It gives the example that composing or reading an electronic message while driving that endangers another person "could rise to the level of careless or reckless driving".

## The 2019 change to the reckless driving standard

Section 169.13 was last amended by 2019 c 10 s 1 and 2. The current text of subd. 1(a) requires that the driver be "aware of and consciously disregarding a substantial and unjustifiable risk". Decisions from before 2019 apply the earlier wording of the statute, and this document does not set that wording out. When a case below decided before 2019 speaks of reckless driving, it is describing the earlier standard, and the current text should be read for what applies today.

## Criminal vehicular homicide and operation

When careless or reckless driving causes a death or injury, the prosecutor can instead charge one of the criminal vehicular crimes. They are in §§ 609.2112 to 609.2114.

**Criminal vehicular homicide, § 609.2112, subd. 1(a).** A person "may be sentenced to imprisonment for not more than ten years or to payment of a fine of not more than $20,000, or both, if the person causes the death of a human being not constituting murder or manslaughter as a result of operating a motor vehicle" in any of eight ways:

1. "in a grossly negligent manner";
2. "in a negligent manner while under the influence of" alcohol, a controlled substance, a cannabis-related substance, or a combination;
3. "while having an alcohol concentration of 0.08 or more";
4. "while having an alcohol concentration of 0.08 or more, as measured within two hours of the time of driving";
5. "in a negligent manner while under the influence of an intoxicating substance" that the person knows or has reason to know can cause impairment;
6. "in a negligent manner while any amount of a controlled substance listed in Schedule I or II, or its metabolite" is present, other than the cannabis-related substances;
7. "where the driver who causes the collision leaves the scene of the collision in violation of section 169.09, subdivision 1 or 6"; or
8. where the driver knew that a peace officer had previously issued a citation or warning that the motor vehicle was defectively maintained, knew remedial action was not taken, had reason to know the defect created a present danger to others, and the death was caused by the defective maintenance.

Under subd. 1(b), for clauses 2 to 6 "occurring within ten years of a qualified prior driving offense, the statutory maximum sentence of imprisonment is 15 years." Under subd. 2 it is an affirmative defense to clause 6 that the defendant used the controlled substance according to a valid prescription.

**Criminal vehicular operation, § 609.2113.** The same eight ways apply, with the maximum depending on the harm caused:

- Great bodily harm (subd. 1): "not more than five years" or a fine of not more than $10,000, or both.
- Substantial bodily harm (subd. 2): "not more than three years" or a fine of not more than $10,000, or both.
- Bodily harm (subd. 3): "not more than 364 days" or a fine of not more than $3,000, or both.

**Unborn child, § 609.2114.** Subd. 1(a) makes it a crime to cause the death of an unborn child as a result of operating a motor vehicle in the same listed ways, with up to ten years or a fine of not more than $20,000, or both. Subd. 2 covers causing great bodily harm to an unborn child subsequently born alive, with up to five years or a fine of not more than $10,000, or both.

A driver who causes a death by grossly negligent driving is therefore facing a felony, not the misdemeanor of careless driving or the misdemeanor or gross misdemeanor of reckless driving. The difference between the levels of fault is the subject of the cases below.

## Leading cases: what reckless, careless and grossly negligent driving mean

**State v. Bolsinger, 221 Minn. 154, 21 N.W.2d 480 (1946), as explained in State v. Meany, 262 Minn. 491 (1962).** Bolsinger reviewed the meaning of the terms reckless and grossly negligent in the former criminal negligence statute for vehicles. The Bolsinger decision is known here only through Meany's description of it. Meany said: "In the Bolsinger case we held that" reckless "means in such a manner as to indicate either a willful or wanton disregard for the safety of persons or property". In Meany, the Minnesota Supreme Court restated the two standards. For reckless driving: "in order to constitute the crime in question by reckless driving, the accused must have known, or should have known, that his manner of driving the vehicle created an unreasonable risk of harm, but he need not have intended to cause harm." For gross negligence: "Briefly stated, we concluded that ‘grossly negligent,’ as used in our criminal negligence statute, means with very great negligence or without even scant care but not with such reckless disregard of probable consequences as is equivalent to a willful and intentional wrong." Meany added: "Proof of either reckless driving or grossly negligent driving will sustain a conviction under this statute." The defendant in Meany struck and killed a young girl walking on or beside a Bloomington street. Holding: gross negligence is a very high degree of carelessness, and it stops short of an intentional wrong.

**State v. White, 292 N.W.2d 16 (Minn. 1980).** Police officers saw White spin his pickup truck numerous times in a short period on a slippery downtown street early one morning and then park it in a traffic lane with the engine running. He was found guilty of reckless driving and disorderly conduct and not guilty of driving under the influence and simple assault. The Minnesota Supreme Court held: "We hold that this evidence was sufficient to support the guilty verdicts." It said the evidence "showed that he drove recklessly in such a manner as to indicate either a willful or wanton disregard for the safety of persons or property." Holding: reckless driving can be proved by conduct such as repeated spinning on a slippery street even though no crash occurred, and the wording is the pre-2019 standard.

**State v. Kissner, 541 N.W.2d 317 (Minn. App. 1995).** Jeffrey Kissner began to pass another vehicle in his passing lane when a northbound Chevrolet occupied that lane, and the collision happened. It was near a no-passing zone: the court noted that "A no-passing zone began approximately 325 feet south of the spot where the Chevrolet and appellant's Ford had come to rest", and a state trooper estimated that "approximately three to four seconds separated the Ford from the start of the no-passing zone". The Court of Appeals affirmed his convictions for criminal vehicular homicide and criminal vehicular operation causing substantial bodily harm. It said: "Applying the appropriate standard of review, we conclude that a jury could have reasonably found each element of the charged offenses, including the element of gross negligence required to prove criminal vehicular homicide and criminal vehicular operation causing substantial bodily harm." It also observed that the case "is lacking in a single dramatic piece of evidence, such as driving while intoxicated." Holding: a dangerous passing maneuver, without alcohol, can support a finding of gross negligence.

**State v. Rasinski, 472 N.W.2d 645 (Minn. 1991).** Gerald Rasinski was convicted of four felony counts of criminal vehicular operation resulting in death, two gross misdemeanor counts of DWI, and one misdemeanor count of careless driving after a July 4, 1989 collision in which two 19-year-old men were killed. The Minnesota Supreme Court affirmed the convictions and held that "the findings of the trial court adequately support the departure from the sentencing guidelines." On a lack of insurance, it agreed with the trial court that it shows "callousness towards other motorists, or at the very best, ... inadvertence toward the duty he owes to other motorists", and is a valid consideration of the seriousness of the charged offense". It reversed the order denying execution of the sentence and remanded.

**State v. Al-Naseer, 690 N.W.2d 744 (Minn. 2005).** Mohammed Al-Naseer's car struck and killed a man changing a flat tire on the side of Highway 10. He was convicted of two counts of criminal vehicular homicide, one for gross negligence and one for leaving the scene. The Minnesota Supreme Court held that the erroneous admission of a videotaped police interview was not harmless: "we conclude that the guilty verdict was not ‘surely unattributable’ to the erroneous admission of the videotaped interview and hold that the error was not harmless beyond a reasonable doubt." It also held the jury should have been instructed on the lesser-included offense of careless driving: "Both Al-Naseer and the state agree, as do we, that careless driving is a lesser-included offense with respect to criminal vehicular homicide — gross negligence." The failure to give the instruction meant the jury "was not in a position to weigh whether Al-Naseer's conduct constituted gross negligence or ordinary negligence. This was error." Finally, it held: "while the accident victim's death is a necessary element to be proved in order to establish criminal vehicular homicide, it is not an element that must be proved to establish gross negligence." Holding: the level of fault is judged by the driving conduct and not by how bad the result was, and a jury may have to be offered careless driving as the lesser charge.

**State v. Al-Naseer, 734 N.W.2d 679 (Minn. 2007).** On the leaving-the-scene theory, the Supreme Court held that the state must prove "that Al-Naseer had knowledge that he had been involved in the type of accident that would impose a duty to stop, an accident with a person or another vehicle." It affirmed the reversal of the conviction and remanded for reconsideration of the verdict under this mens rea standard. The court agreed "that both section 169.09, subdivisions 1 and 6, and section 609.21, subdivision 1(7), require some level of knowledge and are not strict liability statutes." Holding: leaving the scene is not a strict liability crime, and the driver must know they were in an accident with a person or vehicle.

**State v. Stavish, 868 N.W.2d 670 (Minn. 2015).** Derek Stavish was charged with three counts of criminal vehicular operation resulting in death, two counts of fourth-degree DWI, reckless driving and careless driving after a single-vehicle rollover crash that killed Brent Lehnen. The district court suppressed the results of a warrantless blood draw. The Supreme Court held: "We conclude that the State established under the totality-of-the-circumstances approach that exigent circumstances justified the warrantless blood draw." It affirmed the court of appeals, which had reversed the suppression. This case is discussed with the DWI blood-testing cases and shows how those rules apply in a fatal crash prosecution that includes reckless and careless driving counts.

**State v. Pflepsen, 590 N.W.2d 759 (Minn. 1999).** Richard Pflepsen was sentenced for criminal vehicular operation, careless driving and inattentive driving arising from one collision. The Supreme Court decided procedural questions about how the district court should have sentenced him and resentenced him on the lesser-included misdemeanor convictions, and concluded: "We reverse the court of appeals, vacate the district court's sentencing orders, and remand for adjudication of conviction and resentencing." It shows that careless and inattentive driving can be charged alongside a felony from the same crash.

**State v. Engle, 743 N.W.2d 592 (Minn. 2008).** This case concerns recklessly discharging a firearm, not driving, but shows how the Minnesota Supreme Court reads reckless in a criminal statute. It held that the offense "requires proof of a conscious or intentional act, in connection with the discharge of a firearm, that creates a substantial and unjustifiable risk that the actor is aware of and disregards." Similar language now appears in the reckless driving statute after the 2019 amendment.

## How the levels of fault fit together (my summary)

| Level | Statute | Fault standard | Class |
|---|---|---|---|
| Careless driving | § 169.13, subd. 2(a) | "carelessly or heedlessly in disregard of the rights of others", or in a way that endangers | Misdemeanor |
| Reckless driving | § 169.13, subd. 1 | aware of and consciously disregarding a substantial and unjustifiable risk | Misdemeanor; gross misdemeanor if great bodily harm or death results |
| Criminal vehicular operation or homicide by gross negligence | §§ 609.2112 to 609.2114 | "grossly negligent manner": very great negligence, without even scant care, not a willful wrong (Meany) | Felony or gross misdemeanor by injury level |
| Criminal vehicular operation or homicide while impaired | §§ 609.2112 to 609.2114 | negligent driving while under the influence, or alcohol concentration of 0.08 or more, or a listed drug in the body | Felony or gross misdemeanor by injury level |

Cases show that gross negligence is judged by the driving and not by the result (Al-Naseer 2005), that a jury may need to be offered careless driving as a lesser choice, that dangerous passing can be enough (Kissner), and that leaving the scene requires knowledge of the accident (Al-Naseer 2007).

## What this document does not cover

- Sentencing details, including how guideline sentences are calculated.
- How a prosecutor chooses between careless driving, reckless driving and other charges, and defenses.
- License consequences of a conviction, and court procedure.
- Court decisions not listed above. The list is a selection of leading decisions, not a complete one.
```

### Lemon law and car sales (`lemon-law.md`)

```markdown
# Minnesota lemon law and car sale refunds

This document is general legal information about Minnesota law on defective cars, warranties, refunds and misrepresentation in car sales, and the leading court decisions that apply it. It is not legal advice, and it does not cover every situation.

## Sources and currency

- Minn. Stat. § 325F.665 (new motor vehicle warranties; manufacturer's duty to repair, refund or replace, commonly called the lemon law), § 325F.662 (sale of used motor vehicles), § 325F.6655 (extension of warranty), § 325F.664 (new motor vehicle damage disclosures), § 325F.6641 (disclosure of vehicle damage), § 325F.6642 (title branding), § 325F.666 (unlawful reassignment of certain motor vehicle contracts), § 325F.69, subd. 1 (fraud and misrepresentation), § 8.31, subd. 3a (private remedies), and § 325G.19 (express warranties).
- Uniform Commercial Code sales sections in Minn. Stat. chapter 336: §§ 336.2-313 (express warranties), 336.2-314 (implied warranty of merchantability), 336.2-316 (exclusion or modification of warranties), 336.2-608 (revocation of acceptance), 336.2-714 and 336.2-715 (buyer's damages).
- Text taken from the 2025 Minnesota Statutes, as published by the Office of the Revisor of Statutes at https://www.revisor.mn.gov/statutes/ and read on 2026-09-20. Laws passed in the 2026 legislative session may not be reflected.
- Court decisions: Minnesota Supreme Court and Court of Appeals opinions, read in the Harvard Caselaw Access Project (https://case.law/). Every passage placed in quotation marks in the case sections below was checked against the opinion text. The summaries of holdings are my own reading and are short. Older opinions apply earlier versions of these statutes, so section numbers and subdivisions in them may differ from the current text.
- Where a sentence below is my reading of how sections fit together, or my own arithmetic, and not a quotation, it says so.

## Three different sets of rules

Which rules apply depends on who sold the vehicle and whether it was new or used.

1. **New vehicles: the manufacturer lemon law, § 325F.665.** It puts the duty to repair, and then to refund or replace, on the manufacturer.
2. **Used vehicles sold by a dealer: the used vehicle warranty, § 325F.662.** It puts a written warranty duty on the dealer, and the dealer may repair, replace or refund.
3. **Any car sale: general warranty, fraud and disclosure law.** This includes the Uniform Commercial Code, the consumer fraud statutes, and the damage and title disclosure statutes. These apply alongside the two special statutes. Sections 325F.665, subd. 11, and 325F.662, subd. 11, both say the remedy is nonexclusive: "Nothing in this section limits the rights or remedies which are otherwise available to a consumer under any other law."

## New vehicles: the lemon law (§ 325F.665)

### Who and what is covered

- **Consumer** (subd. 1(b)): "the purchaser or lessee, other than for purposes of resale or sublease, of a new motor vehicle used for personal, family, or household purposes at least 40 percent of the time, and a person to whom the new motor vehicle is transferred for the same purposes during the duration of an express warranty applicable to the motor vehicle."
- **Motor vehicle** (subd. 1(f)): "a passenger automobile as defined in section 168.002, subdivision 24, including pickup trucks and vans", the self-propelled chassis or van portion of a recreational vehicle sold or leased to a consumer in this state, and the chassis or van portion of an ambulance.
- **Manufacturer** (subd. 1(c)): a person engaged in the business of manufacturing, assembling or distributing motor vehicles who will "manufacture, assemble or distribute to dealers at least ten new motor vehicles" during the year under normal conditions.
- **Lease** (subd. 1(e)): a contract for the use of personal property by a natural person for a period "exceeding four months", used for personal, family or household purposes at least 40 percent of the time.

### The duty to repair (subd. 2)

If a new vehicle "does not conform to all applicable express warranties, and the consumer reports the nonconformity to the manufacturer, its agent, or its authorized dealer during the term of the applicable express warranties or during the period of two years following the date of original delivery", whichever is earlier, the manufacturer, its agent or its dealer "shall make the repairs necessary to conform the vehicle to the applicable express warranties", even if the repairs are made after the warranty or two-year period ends.

### The duty to refund or replace (subd. 3)

Subd. 3(a): if the manufacturer, its agents or its dealers "are unable to conform the new motor vehicle to any applicable express warranty by repairing or correcting any defect or condition which substantially impairs the use or market value of the motor vehicle to the consumer after a reasonable number of attempts", the manufacturer "shall either replace the new motor vehicle with a comparable motor vehicle or accept return of the vehicle from the consumer and refund to the consumer the full purchase price".

The refund includes:

- the full purchase price, "including the cost of any options or other modifications arranged, installed, or made by the manufacturer, its agent, or its authorized dealer within 30 days after the date of original delivery";
- "all other charges including, but not limited to, sales or excise tax, license fees and registration fees, reimbursement for towing and rental vehicle expenses incurred by the consumer as a result of the vehicle being out of service for warranty repair"; and
- less "a reasonable allowance for the consumer's use of the vehicle not exceeding ten cents per mile driven or ten percent of the purchase price, whichever is less".

If the manufacturer offers a replacement, "the consumer has the option of rejecting the replacement vehicle and requiring the manufacturer to provide a refund." Refunds "must be made to the consumer, and lienholder, if any, as their interests appear on the records of the registrar of motor vehicles." Under subd. 3(h) the sales or excise tax refunded is the tax paid less the tax multiplied by a fraction in which the numerator is the use allowance deducted and the denominator is the purchase price.

**Worked example (my own arithmetic, with made-up numbers, not from any source).** A consumer bought a new car for $30,000 and drove it 8,000 miles before returning it. Ten cents per mile is $800, and ten percent of the price is $3,000. The lesser figure is $800, so the maximum use allowance is $800. The refund would start from $30,000 plus the other listed charges, less $800.

### What counts as a reasonable number of attempts (subd. 3(b) to (f))

Subd. 3(b): "It is presumed that a reasonable number of attempts have been undertaken to conform a new motor vehicle to the applicable express warranties, if":

1. "the same nonconformity has been subject to repair four or more times by the manufacturer, its agents, or its authorized dealers within the applicable express warranty term or during the period of two years following the date of original delivery of the new motor vehicle to a consumer, whichever is the earlier date, but the nonconformity continues to exist"; or
2. "the vehicle is out of service by reason of repair for a cumulative total of 30 or more business days during the term or during the period, whichever is the earlier date."

Other rules:

- **Brakes and steering** (subd. 3(c)): if the nonconformity "results in a complete failure of the braking or steering system" and "is likely to cause death or serious bodily injury if the vehicle is driven", the presumption applies if the nonconformity has been subject to repair "at least once" and continues to exist.
- **Written notice** (subd. 3(e)): the four-repairs or 30-days presumption applies against a manufacturer "only if the manufacturer, its agent, or its authorized dealer has received prior written notification from or on behalf of the consumer at least once and an opportunity to cure the defect alleged." A dealer that receives the notice "must forward it to the manufacturer by certified mail, return receipt requested."
- **Three years** (subd. 3(f)): expiry of the periods in paragraph (b) "does not bar a consumer from receiving a refund or replacement vehicle" if the reasonable number of attempts "occur within three years following the date of original delivery", provided the consumer first reported the nonconformity during the term of the express warranty.
- **Extensions** (subd. 3(d) and § 325F.6655): the warranty term and the time periods are extended by any period during which repair services are not available because of a war, invasion, strike, or fire, flood or other natural disaster.
- **Notice given to the buyer** (subd. 3(g)): at the time of purchase or lease the manufacturer must give the consumer a separate written statement in ten-point capital type saying that if the vehicle is defective the consumer may be entitled under the lemon law to replacement or a refund, that the consumer must first notify the manufacturer, its agent or its dealer of the problem in writing and give them an opportunity to repair it, and that the consumer has a right to submit the case to the consumer arbitration program the manufacturer must offer in Minnesota.

### Leased vehicles (subd. 4)

A consumer who leases a new vehicle has the same rights, except that a lessee "is not entitled to a replacement vehicle, but is entitled only to a refund". The manufacturer refunds the lessee "the amount actually paid by the consumer on the written lease", including the additional charges, less the use allowance, and refunds the lessor the vehicle's original purchase price plus early termination costs "not to exceed 15 percent of the vehicle's original purchase price", less the amount the lessee actually paid.

### Returned vehicles (subd. 5 and subd. 14)

A vehicle returned under the lemon law may not be resold or re-leased in Minnesota unless the manufacturer provides the same express warranty, though it "need only last for 12,000 miles or 12 months after the date of resale, whichever is earlier", and gives the buyer a separate capital-letter statement that the vehicle was returned because it did not conform to the manufacturer's express warranty. A vehicle returned because of a complete failure of the braking or steering system likely to cause death or serious bodily injury "may not be resold in this state." Under subd. 14 the registrar records the term "lemon law vehicle" on the certificate of title and all later titles.

### The manufacturer's arbitration program (subds. 6 to 8)

Subd. 6(a): a manufacturer doing business in the state "shall operate, or participate in, an informal dispute settlement mechanism located in the state of Minnesota". Importantly, "The provisions of subdivision 3 concerning refunds or replacement do not apply to a consumer who has not first used this mechanism before commencing a civil action, unless the manufacturer allows a consumer to commence an action without first using this mechanism."

Other features of the program:

- The consumer may be charged a fee, but it "may not exceed the conciliation court filing fee in the county where the arbitration is conducted" (subd. 6(i)).
- Any party may be represented by an attorney (subd. 6(j)).
- The consumer must be given an adequate opportunity to have a technical expert selected and paid for by the consumer contest the manufacturer's claim that a problem falls within intended specifications (subd. 6(f)).
- The decision "is nonbinding on the parties involved, unless otherwise agreed by the parties." Any party may remove the decision to district court for a trial de novo, and a manufacturer aggrieved by the decision must do so within 30 days after receiving it (subd. 7). A written decision is "admissible as nonbinding evidence in any subsequent legal action".
- If a party removes a decision in bad faith, the court "shall award to the prevailing party three times the actual damages sustained, together with costs and disbursements, including reasonable attorney's fees" (subd. 8).

### Suing, deadlines and the dealer's role

- **Civil remedy** (subd. 9): "Any consumer injured by a violation of this section may bring a civil action to enforce this section and recover costs and disbursements, including reasonable attorney's fees incurred in the civil action." The attorney general may also act under § 8.31.
- **Deadline** (subd. 10): a civil action "must be commenced within three years of the date of original delivery of the new motor vehicle to a consumer". If the consumer applies to the informal dispute settlement mechanism within three years of delivery and is aggrieved by the decision, the action must be commenced "within six months after the date of the final decision by the mechanism."
- **Dealers** (subd. 13): "Nothing in this section imposes liability on a dealer or creates an additional cause of action by a consumer against a dealer, except for written express warranties made by the dealer apart from the manufacturer's warranties." The manufacturer cannot charge back to the dealer the cost of refunds or replacements unless the dealer failed to do the related repairs properly or in time.

My reading: for a new vehicle, the lemon law refund claim is against the manufacturer and not the selling dealer.

## Used vehicles: the dealer's warranty (§ 325F.662)

### Who and what is covered

- **Consumer** (subd. 1(a)): "the purchaser, other than for purposes of resale, of a used motor vehicle used primarily for personal, family, or household purposes."
- **Dealer** (subd. 1(b)): a motor vehicle dealer or lessor, "whether licensed or unlicensed", or the dealer's agent, engaged in the business of selling or arranging the sale of used vehicles in this state. It excludes, for example, banks and licensed auctioneers whose vehicle sales are incidental.
- **Used motor vehicle** (subd. 1(d)): a vehicle "driven more than the limited use necessary in moving or road testing a new motor vehicle prior to delivery to a consumer". A private seller is not a dealer under this section.

### The required written warranty (subd. 2)

Subd. 2(a): "Every used motor vehicle sold by a dealer is covered by an express warranty which the dealer shall provide to the consumer in writing." At a minimum:

| Mileage at sale | Minimum warranty |
|---|---|
| Less than 36,000 miles | at least 60 days or 2,500 miles, whichever comes first |
| 36,000 miles or more, but less than 75,000 miles | at least 30 days or 1,000 miles, whichever comes first |
| 75,000 miles or more, but less than 200,000 miles (unless sold by a new motor vehicle dealer) | at least 15 days or 500 miles, whichever comes first |

Subd. 2(b): the warranty must require the dealer, on a malfunction, defect or failure in a covered part, "to repair or replace the covered part, or at the dealer's election, to accept return of the used motor vehicle from the consumer and provide a refund to the consumer." My reading: the choice between repair, replacement and refund belongs to the dealer.

Covered parts include the engine's lubricated parts, block and cylinder head, the transmission's case and internal parts, the drive axle, brakes (master cylinder, wheel cylinders, hydraulic lines and fittings, and disc brake calipers), the steering gear housing and internal parts, the water pump and the externally mounted mechanical fuel pump. For vehicles with less than 36,000 miles, the list also includes the radiator and the alternator, generator and starter (subd. 2(c) and (d)).

The dealer's obligations continue after the warranty period ends "if the consumer promptly notified the dealer of the malfunction, defect, or failure in the covered part within the specified warranty period and, within a reasonable time after notification, brings the vehicle or arranges with the dealer to have the vehicle brought to the dealer for inspection and repair" (subd. 2(e)(1)). The warranty does not cover defects "which result from collision, abuse, negligence, or lack of adequate maintenance following sale to the consumer" (subd. 2(g)). The terms must be disclosed on the front of the Buyers Guide (subd. 2(h)).

### Vehicles a dealer need not warrant (subd. 3)

A dealer is not required to give the express warranty for a used vehicle, for example, that:

- was sold for a total cash sale price of less than $3,000 (except a vehicle of 75,000 miles or more that falls in the third mileage tier);
- has a diesel engine, or a gross weight of more than 9,000 pounds;
- was custom-built or modified for show or racing;
- is eight years of age or older, calculated from the first day in January of the model year (with the same exception);
- has 200,000 miles or more at the time of sale; or
- has a title bearing a "salvage" brand under § 168A.151.

### Waiver and automatic warranty (subds. 4 and 5)

A consumer may waive the warranty for a covered part only if the dealer discloses "in a clear and conspicuous typed or printed statement on the front of the Buyers Guide that the waived part contains a malfunction, defect, or repair problem" and the consumer circles the statement and signs the Buyers Guide next to it. Under subd. 5: "If a dealer fails to give the express warranty required by this section, the dealer nevertheless is considered to have given the express warranty as a matter of law."

### The refund (subd. 8)

Subd. 8(a): a refund "must consist of the full purchase price of the used motor vehicle and all other charges, including but not limited to excise tax, registration tax, license fees, and reimbursement for towing expenses incurred by the consumer as a result of the vehicle being out of service for warranty repair, less a reasonable allowance for the consumer's use of the vehicle not exceeding ten cents per mile driven or ten percent of the purchase price, whichever is less." It "must include the amount stated by the dealer as the trade-in value of any vehicle traded in and applied to the purchase price". The dealer must give an itemized statement of the amounts refunded (subd. 8(c)).

### Other used-vehicle rules

- **Honoring warranties** (subd. 7): the dealer must honor every express warranty, and after a covered part is repaired or replaced "remains responsible under the express warranty for that covered part for one additional warranty period". A dealer "may limit the duration of implied warranties to the duration of the express warranty."
- **Certified vehicles** (subd. 8a): it is unlawful to advertise or sell a used vehicle as certified if, for example, the dealer knows or should know the odometer was rolled back, the vehicle was reacquired under warranty laws, the title has a lemon law buyback, salvage, flood or similar brand, the vehicle has frame damage, the dealer fails to provide a completed inspection report, the dealer disclaims the warranty of merchantability, or the vehicle is sold as is.
- **Remedies and deadline** (subds. 9 and 10): a dealer that violates the section "is subject to the penalties and remedies, including a private right of action, as provided in section 8.31", and a violation of subd. 7 is also a violation of § 325F.69. A private civil action on a warranty claim "must be commenced within one year of the expiration of the express warranty."

### How the new and used rules differ (my summary)

| Question | New vehicle (§ 325F.665) | Used vehicle from a dealer (§ 325F.662) |
|---|---|---|
| Who owes the remedy | The manufacturer | The dealer |
| Refund available | After a reasonable number of repair attempts; presumed after four repairs or 30 business days out of service | At the dealer's election, if the dealer chooses to accept return instead of repairing or replacing a covered part |
| Use allowance | Up to ten cents a mile or ten percent of price, whichever is less | The same |
| Deadline to sue | Three years from delivery (six months after arbitration) | One year after the express warranty expires |
| Notice or arbitration first | Written notice before the presumption applies; arbitration before the refund claim if the manufacturer runs a program | Prompt notice within the warranty period |

## Disclosure of damage and title history

- **New vehicle damage** (§ 325F.664, subd. 2(a)): before the sale of a new vehicle a dealer "must disclose and describe to the buyer, in a clear and conspicuous written statement and orally in the course of the sales presentation, any damage to the vehicle of which the dealer had actual knowledge, if the dealer's cost of repairs exceeded four percent of the manufacturer's suggested retail price, or $500, whichever is greater."
- **Prior damage** (§ 325F.6641, subd. 1): "If a vehicle has sustained damage by collision or other occurrence which exceeds 80 percent of its actual cash value immediately prior to sustaining damage, the seller must disclose that fact to the buyer, if the seller has actual knowledge of the damage." Under subd. 2, a licensed dealer must give a written disclosure, and orally except for online sales, of prior damage, of any title brand it actually knows of, and of flood submersion above the bottom dashboard while parked on the dealer's lot. The buyer must sign the written disclosure.
- **Title brands** (§ 325F.6642): the registrar records brands such as "flood damaged", "salvage", "prior salvage" and "reconstructed" on the certificate of title, and "each brand designation ... must be made by the registrar of motor vehicles in a clear and conspicuous manner".
- **Reassignment** (§ 325F.666, subd. 2): a person who is not a party to a vehicle contract, and who has not first obtained written authorization from the secured creditor, lessor or lienholder, may not, if the person receives consideration, "get control of the motor vehicle and then sell, transfer, assign, or lease it to another person", or assist in such a transfer. Under subd. 3 an injured person may recover actual damages, costs and reasonable attorney fees.

## Warranty and fraud law that applies to any car sale

**Express warranty** (§ 336.2-313): "Any affirmation of fact or promise made by the seller to the buyer which relates to the goods and becomes part of the basis of the bargain creates an express warranty that the goods shall conform to the affirmation or promise." But "an affirmation merely of the value of the goods or a statement purporting to be merely the seller's opinion or commendation of the goods does not create a warranty."

**Implied warranty of merchantability** (§ 336.2-314): "a warranty that the goods shall be merchantable is implied in a contract for their sale if the seller is a merchant with respect to goods of that kind." Goods must, among other things, be "fit for the ordinary purposes for which such goods are used".

**Disclaiming warranties** (§ 336.2-316(3)(a)): "unless the circumstances indicate otherwise, all implied warranties are excluded by expressions like 'as is,' 'with all faults' or other language which in common understanding calls the buyer's attention to the exclusion of warranties and makes plain that there is no implied warranty". Section 325G.19, subd. 1, adds that "No express warranty arising out of a consumer sale of new goods shall disclaim implied warranties of merchantability". A dealer's used vehicle warranty under § 325F.662 is separate, and § 325F.662, subd. 8a, treats an "AS IS" sale as disqualifying a vehicle from being called certified.

**Revoking acceptance** (§ 336.2-608): "The buyer may revoke an acceptance of a lot or commercial unit whose nonconformity substantially impairs its value to the buyer if it was accepted (a) on the reasonable assumption that its nonconformity would be cured and it has not been seasonably cured; or (b) without discovery of such nonconformity if the acceptance was reasonably induced either by the difficulty of discovery before acceptance or by the seller's assurances." It "must occur within a reasonable time after the buyer discovers or should have discovered the ground for it and before any substantial change in condition of the goods which is not caused by their own defects. It is not effective until the buyer notifies the seller of it."

**Damages** (§§ 336.2-714 and 336.2-715): "The measure of damages for breach of warranty is the difference at the time and place of acceptance between the value of the goods accepted and the value they would have had if they had been as warranted, unless special circumstances show proximate damages of a different amount." In a proper case incidental and consequential damages may also be recovered.

**Consumer fraud** (§ 325F.69, subd. 1): "The act, use, or employment by any person of any fraud, unfair or unconscionable practice, false pretense, false promise, misrepresentation, misleading statement or deceptive practice, with the intent that others rely thereon in connection with the sale of any merchandise, whether or not any person has in fact been misled, deceived, or damaged thereby, is enjoinable as provided in section 325F.70."

**Private lawsuit for consumer fraud** (§ 8.31, subd. 3a): "any person injured by a violation of any of the laws referred to in subdivision 1 may bring a civil action and recover damages, together with costs and disbursements, including costs of investigation and reasonable attorney's fees, and receive other equitable relief as determined by the court."

## Leading cases

I searched for published Minnesota appellate decisions on the lemon law and found one, Pfeiffer. The search service limited how many queries I could make, so that is not proof that no others exist. The remaining cases concern warranty and dealer conduct in vehicle sales.

**Pfeiffer v. Ford Motor Co., 517 N.W.2d 76 (Minn. App. 1994).** Frederick and June Pfeiffer bought a Ford F-250 pickup in January 1990, believing it provided 200 horsepower for camping and towing. After Ford's informal dispute mechanism denied relief under the lemon law, they sold the truck and sued in conciliation court about 75 days later. The district court granted Ford summary judgment, finding the suit untimely. The Court of Appeals observed that "the Lemon Law was poorly drafted and is susceptible to two meanings" on the time limit, and concluded that the correct limit was six months. But it still affirmed the dismissal of the lemon law claim, because the Pfeiffers had sold the truck and so could not return it: "as with Minnesota's Lemon Law, there is a requirement for return of the vehicle prerequisite to remedy." It reversed on the Pfeiffers' Uniform Commercial Code claims, saying "The allegations, supporting affidavits and documentary evidence raise clear fact questions under the UCC", including whether they properly revoked acceptance. It also held they could not recover lemon law attorney fees because they "have not prevailed in their Lemon Law cause of action". The opinion applied the 1992 version of the statute, which had a subdivision numbered 3a, and the current § 325F.665, subd. 10, now provides a three-year limit and a six-month period after arbitration. Holding: a consumer who sells the vehicle before suing loses the lemon law refund claim, but can still pursue Uniform Commercial Code warranty claims.

**Jacobs v. Rosemount Dodge-Winnebago South, 310 N.W.2d 71 (Minn. 1981).** George and Laura Jacobs bought a new Midas motorhome for $27,269 and it had defects the dealer and manufacturer failed to cure despite several returns for repair. The jury awarded $16,621 and the trial court cut it to $3,309.77. The Minnesota Supreme Court reinstated the jury verdict. It held: "we hold that the trial court did not err in finding that the exclusive remedies of the warranty had failed in their essential purposes and that other U.C.C. remedies, such as damages and revocation, were available to the Jacobs." It said, "If the seller refuses to repair or replace within a reasonable time, the buyer is deprived of the exclusive remedy. Commendable efforts alone do not relieve a seller of his obligation to repair." It also held that "other remedies of Chapter 336, including consequential damages, are available to them" and that evidence on consequential damages for loss of use was properly submitted to the jury. This decision came before the lemon law and is an example of the warranty law that still applies alongside it.

**International Financial Services, Inc. v. Franz, 534 N.W.2d 261 (Minn. 1995).** This case concerned a photoplotter, not a car, but the Supreme Court applied the same warranty principles. It affirmed the determination that the repair or replacement remedy in the purchase agreement had failed of its essential purpose, and affirmed in part and reversed in part on damages. It agreed "with the trial court that the consequential damage exclusion effectively barred claims for such damages", but held the trial court "erred in denying Franz the opportunity to prove damages resulting from the construction of the 'clean room.'" It is included because it addresses when a limited warranty remedy fails and what damages remain.

**Mashlan v. E.M. Trucks, Inc., 443 N.W.2d 226 (Minn. App. 1989).** A jury found that a truck dealer breached express warranties and that the Mashlans properly revoked acceptance of a defective truck. But the Mashlans had signed a 48-month lease with a financing company, United General Leasing, not a purchase agreement. The Court of Appeals held that "In all respects the contract between appellants and United is an express lease", and affirmed judgment "that appellants were lessees not entitled to recover damages from the dealer." Holding: warranty and revocation remedies against a dealer were not available to a person who was legally a lessee of a finance company and not a buyer from the dealer. The structure of the transaction matters.

**Carousel Automobiles, Inc. v. Gherity, 527 N.W.2d 813 (Minn. 1995).** Dealer Daniels signed an Odometer Statement and Assignment by Seller form as the transferor of a Mercedes he never owned, so that a buyer could purchase it through a statutory dealer-resale provision. The Minnesota Supreme Court framed the issue as "whether Daniels, in signing as transferor on an Odometer Statement and Assignment by Seller form, thereby warranted title to the motor vehicle. We conclude he did and affirm." It reasoned that "Daniels' fraudulent act of signing as transferor was essential to this transaction". Holding: a dealer who signs as transferor warrants title, even when the dealer never owned the car.

**Scott v. Forest Lake Chrysler-Plymouth-Dodge, 598 N.W.2d 713 (Minn. App. 1999).** Raymond Scott bought a Dodge Caravan under a retail installment contract, and the dealer also had him sign a conditional delivery agreement. When financing approval failed, a second contract was made at a higher interest rate and total price. The Court of Appeals held: "We hold that use of the conditional delivery agreement violated Minn.Stat. § 168.71(a)(1)." It also held that the dealer "violated Minn.Stat. § 168.71(a)(1) by failing to provide Scott with copies of the retail installment contracts that were signed by Forest Lake Chrysler". It reversed and remanded those claims but affirmed summary judgment for the dealer on Scott's consumer fraud claim. Holding: a dealer cannot use a side agreement that defeats the installment contract's disclosure of the cost of credit, and must give the buyer a copy of the contract the dealer has signed.

**Holiday Recreational Industries, Inc. v. Manheim Services Corp., 599 N.W.2d 179 (Minn. App. 1999).** A dealer bought a 1992 Saturn at auction for $4,665, made $1,105.36 in repairs, and never received title. The vehicle turned out to have a salvage title. The Court of Appeals affirmed that the auctioneer violated the title branding law: "Because appellant failed to disclose that the vehicle had branded title, we affirm." It concluded that the auctioneer, as an auctioneer, "was a licensed motor vehicle dealer under the title branding act". It affirmed the award of treble damages, saying the district court found "deliberate attempts to mislead" and "conscious disregard" of the buyer's rights, and affirmed attorney fees, noting the statute cited in the opinion, § 325F.6643(b), says an injured party "shall recover * * * reasonable attorney fees." The section numbers in that opinion are those in force in 1999, and I did not check whether they have since been renumbered. Holding: failing to disclose a branded title can lead to treble damages and mandatory attorney fees.

**Sorchaga v. Ride Auto, LLC, 909 N.W.2d 550 (Minn. 2018).** Esmeralda Sorchaga bought a pickup from a dealer that had purchased it from a salvage yard for $6,770 knowing it needed engine repairs. The purchase agreement disclaimed all warranties and stated the truck was sold "AS IS, NO WARRANTY". The Minnesota Supreme Court asked "whether a seller's fraudulent statements about the condition and fitness of a vehicle being sold prevent the seller from enforcing disclaimers in purchase documents stating that the buyer purchased the vehicle 'as is.'" It held: "we hold that Ride Auto's fraudulent statements about the fitness of the truck for the purpose for which a truck is purchased are a circumstance that make the 'as is' disclaimers of implied warranties in the purchase documents ineffective under Minn. Stat. § 336.2-316(3)(a)." The Court explained that "simply because the UCC permits parties to exclude or modify warranties does not mean that Ride Auto can 'disclaim its obligation to deliver the product which formed the basis of the parties' bargain.'" It also held the district court did not err in awarding recovery on both fraud and breach of warranty claims, since "so long as the plaintiff is not allowed 'double recovery,' a district court may conclude that the evidence supports separate claims for both common-law fraud and breach of contract", and "Sorchaga did not receive a double recovery." The Court added that "not all misstatements will constitute fraud." Holding: an "as is" clause does not protect a dealer who lied about the vehicle's condition.

## How this fits together (my summary)

- A buyer of a new car with a repeated, unfixed defect has a claim against the manufacturer for a refund or replacement, with the refund reduced by a small per-mile use allowance. The four-repair and 30-day presumptions need written notice, and a manufacturer's arbitration program must generally be used first. The buyer must be able to return the vehicle (Pfeiffer).
- A buyer of a used car from a dealer gets a written warranty of at least a minimum length based on mileage, and the dealer can choose to repair, replace or refund. A dealer that gives no warranty is treated as having given one.
- A buyer can also rely on general warranty, revocation of acceptance, consumer fraud and disclosure statutes. "As is" language does not protect a seller who made fraudulent statements (Sorchaga), and a limited repair remedy that fails opens the door to other remedies (Jacobs).
- The form of the deal matters: a lessee from a finance company is not a buyer from the dealer (Mashlan), and a dealer who signs as transferor warrants title (Carousel).
- Lawsuit deadlines differ: three years from delivery for the new vehicle lemon law claim, one year after the warranty expires for the used vehicle warranty claim.

## What this document does not cover

- Federal warranty law, except as mentioned in the cases above, and federal used-car Buyers Guide rules beyond the reference in § 325F.662.
- Motorcycles, boats and other vehicles not within the statutory definitions, and business vehicles used for personal purposes less than 40 percent of the time.
- Financing and retail installment sales rules beyond the Scott case, and repossession.
- The procedure of arbitration hearings and conciliation court.
- Court decisions not listed above. The list is a selection, and I found only one published Minnesota appellate decision applying the lemon law itself.
```

### Car accidents (`car-accidents.md`)

```markdown
# Minnesota car accident law: duties, fault, no-fault insurance and leading decisions

This document is general legal information about what Minnesota law requires of drivers after a collision, how fault is decided in a civil claim, how the no-fault insurance system works, and the leading court decisions that apply them. It is not legal advice, and it does not cover every situation.

## Sources and currency

- Minn. Stat. § 169.09 (collisions: duty to stop, give information and report), § 169.96 (effect of traffic law violations in civil cases), §§ 169.685 and 169.686 (seat belts), §§ 604.01 and 604.02 (comparative fault and joint liability), § 541.05 (six-year limitation), and the no-fault act: §§ 65B.44 (basic economic loss benefits), 65B.46 (right to benefits), 65B.47 (priority of security), 65B.49 (uninsured and underinsured coverage), 65B.51 (tort threshold and deduction of benefits) and 65B.61 (benefits primary).
- Minn. Stat. §§ 609.2112 to 609.2114 (criminal vehicular homicide and operation), which are covered in more detail in the reckless driving document.
- Text taken from the 2025 Minnesota Statutes, as published by the Office of the Revisor of Statutes at https://www.revisor.mn.gov/statutes/ and read on 2026-09-20. Laws passed in the 2026 legislative session may not be reflected.
- Court decisions: Minnesota Supreme Court and Court of Appeals opinions, read in the Harvard Caselaw Access Project (https://case.law/). Every passage placed in quotation marks in the case sections below was checked against the opinion text. The summaries of holdings are my own reading and are short. The no-fault act has been amended many times since the older decisions, including in 1985, so older opinions may describe rules that no longer apply. Each case section says when that matters.
- Where a sentence below is my reading of how sections fit together, and not a quotation, it says so.

## What a driver must do after a collision (§ 169.09)

- **Stop and investigate** (subds. 1, 2 and 4): "The driver of any motor vehicle involved in a collision shall immediately stop the vehicle at the scene of the collision, or as close to the scene as possible, and reasonably investigate what was struck." The stop "must be made without unnecessarily obstructing traffic."
- **Remain at the scene** (subd. 1): if the driver "knows or has reason to know the collision resulted in injury to or death of another, the driver in every event shall remain at the scene of the collision until the driver has fulfilled the requirements of this section as to the giving of information." Subd. 2 says the same where the collision involves damage to a vehicle driven or attended by another.
- **Give information and help** (subd. 3(a)): the driver "shall give the driver's name, date of birth, mailing address or email address, and the registration plate number of the vehicle being driven", must exhibit a license on request to a peace officer, and "shall render reasonable assistance to any individual injured in the collision."
- **Insurance details** (subd. 3(b)): if not given at the scene, "within 72 hours after the accident" the driver must give, on request, "the name and address of the insurer providing vehicle liability insurance coverage, and the local insurance agent for the insurer."
- **Unattended vehicle** (subd. 4): the driver must locate and notify the driver or owner, report the information to a peace officer, or leave "in a conspicuous place in or secured to the vehicle struck, a written notice giving the name and address of the driver and of the registered owner".
- **Notice of injury** (subd. 6): after complying with the section, the driver of a vehicle in a collision resulting in bodily injury or death "shall ... by the quickest means of communication, give notice of the collision to the local police department if the collision occurs within a municipality, to a State Patrol officer if the collision occurs on a trunk highway, or to the office of the sheriff of the county."
- **Which accidents are reported** (subd. 8(b)): accidents on public rights-of-way must be reported if they result in a fatality; bodily injury to a person who immediately receives medical treatment; a vehicle so damaged it must be towed; or damage to fixtures, infrastructure or other property alongside or on a highway.
- **Agent of the owner** (subd. 5a): when a vehicle is operated by someone other than the owner, with the owner's consent, "the operator thereof shall in case of accident, be deemed the agent of the owner of such motor vehicle in the operation thereof."
- **Accident reports are not evidence** (subd. 13(b)): "Accident reports and data contained in the reports are not discoverable under any provision of law or rule of court. A report must not be used as evidence in any trial, civil or criminal, or any action for damages or criminal proceedings arising out of an accident." Subd. 13(c) says this does not prevent a person from testifying "as to facts within the individual's knowledge."

### Penalties for leaving the scene (§ 169.09, subd. 14)

- If the driver violates subd. 1 or 6 and did not cause the collision, and it results in the death of another, the driver is guilty of a felony and may be sentenced to "not more than three years, or to payment of a fine of not more than $5,000, or both".
- If it results in great bodily harm: a felony with "not more than two years, or ... a fine of not more than $4,000, or both".
- If it results in substantial bodily harm: "not more than 364 days, or ... a fine of not more than $3,000, or both".
- If the collision results in bodily harm to another and the driver violates subd. 1 or 6, the driver "may be sentenced to imprisonment for not more than 364 days, or to payment of a fine of not more than $3,000, or both" (subd. 14(b)).
- A violation of subd. 3, 5, 8, 11 or 12 is a misdemeanor. A driver who violates subd. 2 after damage to an attended vehicle, or subd. 4 after damage to an unattended vehicle, is guilty of a misdemeanor (subd. 14(c) to (e)).
- A driver who causes the collision and leaves the scene can be charged under the criminal vehicular statutes: § 609.2112, subd. 1(a)(7), covers "where the driver who causes the collision leaves the scene of the collision in violation of section 169.09, subdivision 1 or 6", with a maximum of ten years or a $20,000 fine, or both. See the reckless driving document.

## Criminal vehicular crimes after a crash

When a crash kills or injures someone, a driver can also be charged under §§ 609.2112 to 609.2114 if the driving was grossly negligent, or negligent while impaired, or the driver was over the alcohol limit or left the scene. The maximum sentence is up to ten years for a death, five years for great bodily harm, three years for substantial bodily harm and 364 days for bodily harm. These are covered in the reckless driving document, which also explains gross negligence.

## Fault in a civil claim

### Violating a traffic law is evidence, not automatic negligence (§ 169.96)

Section 169.96(b): "In all civil actions, a violation of any of the provisions of this chapter, by either or any of the parties to such action or actions shall not be negligence per se but shall be prima facie evidence of negligence only." My reading: running a red light or speeding does not by itself decide a civil case, but it is evidence of negligence that the jury can weigh, and the other side can show an excuse.

### Comparative fault (§ 604.01)

Subd. 1: "Contributory fault does not bar recovery in an action by any person or the person's legal representative to recover damages for fault resulting in death, in injury to person or property, or in economic loss, if the contributory fault was not greater than the fault of the person against whom recovery is sought, but any damages allowed must be diminished in proportion to the amount of fault attributable to the person recovering."

My reading: an injured person can recover if the person's own fault is equal to or less than the fault of the person being sued, and the recovery is reduced by the injured person's percentage. If the injured person is more at fault than the defendant, the person recovers nothing from that defendant. Subd. 1a defines "fault" to include "acts or omissions that are in any measure negligent or reckless toward the person or property of the actor or others", and adds that "The doctrine of last clear chance is abolished."

### Who pays when several people share fault (§ 604.02)

Subd. 1: "When two or more persons are severally liable, contributions to awards shall be in proportion to the percentage of fault attributable to each, except that the following persons are jointly and severally liable for the whole award": a person "whose fault is greater than 50 percent", persons acting in a common scheme, a person who commits an intentional tort, and certain environmental liabilities. My reading: a driver who is more than 50 percent at fault can be made to pay the whole award, and others pay only their share.

### Time limit (§ 541.05)

Subd. 1 gives six years for several kinds of actions, including "any other injury to the person or rights of another, not arising on contract, and not hereinafter enumerated", for "taking, detaining, or injuring personal property", and for "a liability created by statute". My reading: a claim for personal injury or vehicle damage from ordinary negligence generally falls within this six-year period, but other statutes set different periods for specific claims, such as death claims and claims against governments, and I did not research them.

### Seat belts (§§ 169.685 and 169.686)

Subd. 1(a) of § 169.686 requires a properly adjusted and fastened seat belt to be worn by the driver and passengers of a passenger vehicle. A person 15 or older who violates it is "subject to a fine of $25", and the Department of Public Safety "must not record a violation of this subdivision on a person's driving record" (subd. 1(b)).

In a civil injury case, § 169.685, subd. 4(a): "proof of the use or failure to use seat belts or a child passenger restraint system ... is not admissible in evidence in any litigation involving personal injuries or property damage resulting from the use or operation of any motor vehicle." Subd. 4(b) preserves claims about a defectively designed, manufactured, installed or operating seat belt.

## The no-fault system

### Basic economic loss benefits (§ 65B.44)

- **Right to benefits** (§ 65B.46, subd. 1): "If the accident causing injury occurs in this state, every person suffering loss from injury arising out of maintenance or use of a motor vehicle or as a result of being struck as a pedestrian by a motorcycle has a right to basic economic loss benefits."
- **Minimum amounts** (§ 65B.44, subd. 1(a)): "a minimum of $40,000 for loss arising out of the injury of any one person, consisting of": "$20,000 for medical expense loss" and "a total of $20,000 for income loss, replacement services loss, funeral expense loss, survivor's economic loss, and survivor's replacement services loss".
- **Medical expenses** (subd. 2): reimburse "all reasonable expenses for necessary" medical, surgical, x-ray, optical, dental, chiropractic and rehabilitative services, prescription drugs, ambulance and other transportation to receive covered care, and hospital, extended care and nursing services.
- **Income loss** (subd. 3(a)): "compensation for 85 percent of the injured person's loss of present and future gross income from inability to work proximately caused by the nonfatal injury subject to a maximum of $500 per week."
- **Funeral and burial** (subd. 4): "reasonable expenses not in excess of $5,000".
- **Replacement services** (subd. 5): reimburse the reasonable expenses of "usual and necessary substitute services" the injured person would have performed for the household.
- **Primary** (§ 65B.61, subd. 1): "Basic economic loss benefits shall be primary with respect to benefits, except for those paid or payable under a workers' compensation law, which any person receives or is entitled to receive from any other source as a result of injury arising out of the maintenance or use of a motor vehicle."

### Whose insurance pays (§ 65B.47, subd. 4)

For cases other than business use, the priorities are:

- (a) for injury to an insured, "the security under which the injured person is an insured";
- (b) for injury to the driver or other occupant of an involved motor vehicle who is not an insured, "the security covering that vehicle"; and
- (c) for a person not otherwise covered who is not the driver or other occupant of an involved motor vehicle (for example a pedestrian), "the security covering any involved motor vehicle".

Under subd. 1, if the vehicle is being used in the business of transporting persons or property, the security is that covering the vehicle or, if none, the security under which the injured person is an insured.

### Suing the at-fault driver: the tort threshold and the offset (§ 65B.51)

Subd. 1: the court "shall deduct from any recovery the value of basic or optional economic loss benefits paid or payable". Subd. 3 limits recovery for pain and other noneconomic harm: "no person shall recover damages for noneconomic detriment unless" either:

(a) medical expenses, including "reasonable medical expense benefits paid, payable or payable but for any applicable deductible" and certain other listed amounts, exceed $4,000, excluding diagnostic x-rays and rehabilitation; or

(b) the injury results in "permanent disfigurement", "permanent injury", "death", or "disability for 60 days or more".

"Disability" means "the inability to engage in substantially all of the injured person's usual and customary daily activities." Subd. 2 allows a negligence action for economic loss that is not covered by first-party benefits, for example above the daily or weekly limits or because of an exclusion. Subd. 4 says the section does not limit the liability of a person in the business of manufacturing, distributing, retailing, repairing or servicing motor vehicles for a defect.

### Uninsured and underinsured motorist coverage (§ 65B.49, subd. 3a)

Auto policies must include "separate uninsured and underinsured motorist coverages", and "Each coverage, at a minimum, must provide limits of $25,000 because of injury to or the death of one person in any accident and $50,000 because of injury to or the death of two or more persons in any accident." Under subd. 3a(4), "No recovery shall be permitted under the uninsured and underinsured motorist coverages of this section for basic economic loss benefits paid or payable". Under subd. 4a, the underinsured motorist insurer's maximum liability "is the amount of damages sustained but not recovered from the insurance policy of the driver or owner of any underinsured at fault vehicle", and "in no event shall the underinsured motorist carrier have to pay more than the amount of its underinsured motorist limits."

## Leading cases on fault and the civil claim

**Pouliot v. Fitzsimmons, 582 N.W.2d 221 (Minn. 1998).** Sharon Fitzsimmons lost control of her vehicle in inclement weather on County Road 42 in Prior Lake and collided with Janice Pouliot's stopped vehicle on the opposite side of the road. The jury found Fitzsimmons was not negligent and the trial court denied a judgment notwithstanding the verdict, but the court of appeals reversed, calling the evidence of negligence "so overwhelming that reasonable minds could not differ." The Minnesota Supreme Court reversed the court of appeals and reinstated the trial court's order, saying the court of appeals "inappropriately substituted its judgment for that of both the jury and the trial court". It held "that the jury could have reasonably inferred from the evidence that the deteriorating weather and road conditions due to freezing rain excused or justified Fitzsimmons' violation of section 169.18, subd." (subdivisions 1 and 2 of § 169.18, the rules on keeping to the right and passing to the right of oncoming traffic). Holding: a traffic law violation is not conclusive negligence, and a jury may find it excused by conditions such as freezing rain, consistent with § 169.96.

**Daly v. McFarland, 812 N.W.2d 113 (Minn. 2012).** Two snowmobilers collided. The jury found both negligent, found that Daly's negligence was not a direct cause of the accident, and yet allocated 30 percent of the fault to Daly. The Minnesota Supreme Court held that "the doctrine of primary assumption of risk does not apply to preclude Daly's claims that McFarland owed a duty of reasonable care in the operation of his snowmobile." It also found that the district court abused its discretion in how it reconciled the jury's directly contradictory answers: "We agree with McFarland that the district court abused its discretion in reconciling the directly contradictory jury verdict." Because a new trial "unfairly prejudices Daly, because the jury found that McFarland was, at a minimum, 70% responsible for the accident", the court ordered a remittitur, so that Daly could choose to accept 70 percent of the damages or a new trial. It is a snowmobile case, but it shows how comparative fault percentages are applied to a damages award.

**Imlay v. City of Lake Crystal, 453 N.W.2d 326 (Minn. 1990).** The plaintiffs were injured in a collision with an uninsured, intoxicated motorcyclist who had been served by the city's liquor store. The jury found the city 20 percent at fault and the motorcyclist 80 percent, and awarded over $2.2 million. The Minnesota Supreme Court held that "section 604.02, subdivision 1, does not violate equal protection guarantees" and affirmed in part and reversed in part. The version of § 604.02 involved in that case limited the joint liability of municipalities, and the statute has been amended since, so the current text above controls.

**Cressy v. Grassmann, 536 N.W.2d 39 (Minn. App. 1995).** Pamela Cressy and her son were injured when a bus struck her car from behind. The bus company's defense was that Cressy and her son were not wearing seat belts. The Court of Appeals upheld the law that bars that evidence, § 169.685, subd. 4: "Thus, we hold that the legislature did not, with the enactment of the mandatory seat belt and comparative fault statutes, implicitly repeal section 169.685, subdivision 4." It reasoned that "appellants' right to present a defense is not at risk. Although unable to reduce awards to the extent of damages that are attributable to seat-belt nonuse, appellants may still present evidence of respondents' comparative fault — if any — in causing the accident." Holding: not wearing a seat belt cannot be used to reduce a damages award in a civil injury case.

## Leading cases on no-fault insurance

**Haagenson v. National Farmers Union Property & Casualty Co., 277 N.W.2d 648 (Minn. 1979).** Gerald Haagenson was seriously injured under unusual circumstances and claimed no-fault benefits under the policies on both his pickup truck and his automobile. A jury found the injuries covered under the pickup policy, and the trial judge stacked the coverage of both vehicles for a total of $60,000. The Minnesota Supreme Court affirmed that award. The jury had also awarded $50,000 for emotional distress and $300,000 as punitive damages for the insurer's nonpayment. The Court reversed those awards, holding that such damages "are not recoverable for bad-faith breach of contract", but remanded "for assessment of the 10-percent statutory penalty for delay in payment of no-fault benefits". Holding: an insurer's delay in paying no-fault benefits is met by the statutory penalty and not by punitive damages. The stacking result was later changed by the 1985 anti-stacking amendment, described in Meister below.

**Holman v. All Nation Insurance Co., 288 N.W.2d 244 (Minn. 1980).** After a serious one-vehicle accident, Lawrence Holman sued his insurer for optional coverages that he said had not been offered as required by § 65B.49, subd. 6. The district court found that underinsured motorist benefits had not been offered. The Supreme Court held: "We hold that the mandatorily-offered coverages, which are implied by law in the Holman policy, may be stacked, to the amount of Holman's damages." It also held that "the Lick rule is inapplicable for accidents occurring after the effective date of the No Fault Act", so that "Lawrence Holman is entitled to recover underinsured motorist benefits in addition to bodily injury liability benefits to the extent of his damages." Holding: when an insurer fails to offer mandatory optional coverage, it is implied by law.

**Tlougan v. Auto-Owners Insurance Co., 310 N.W.2d 116 (Minn. 1981).** Carrie Tlougan, a five-year-old, was burned while playing with a book of matches left on the dashboard of a truck. The trial court found the injuries covered by the no-fault policy. The Supreme Court reversed: "Since we find the injuries did not arise out of the use or maintenance of a motor vehicle, we reverse." It explained that "coverage is not established since there is an insufficient causal connection between use of the vehicle for transportation purposes and the injury." Holding: no-fault benefits cover injuries that arise out of use of the vehicle for transportation, and not every injury that happens in or near a vehicle.

**Nemanic v. Gopher Heating & Sheet Metal, Inc., 337 N.W.2d 667 (Minn. 1983).** Lance Nemanic received a $65,000 jury verdict for injuries in a collision. He claimed his agoraphobia was triggered by the accident, and the trial court directed a verdict for him on the tort threshold of permanency and causation because the defense offered no adverse medical witness. The Supreme Court reversed, saying: "we hold that the trial court erred in not submitting the issue of permanence to the jury." It said there was evidence in the record "that plaintiff was recovering from his agoraphobia and that the condition was not permanent". Holding: even when the defense presents no expert, the jury decides whether the plaintiff meets the § 65B.51 tort threshold.

**Meister v. Western National Mutual Insurance, 479 N.W.2d 372 (Minn. 1992).** Michael Meister suffered severe head injuries when he was thrown from the back of his employer's pickup truck. The employer's insurer paid the basic economic loss benefits, and the question was whether Meister's own insurer, Western National, owed the additional optional benefits his father had bought, given the 1985 anti-stacking amendment. The Supreme Court affirmed the court of appeals. It said "this case does not pose a stacking issue", because the additional coverage "covers the persons under the policy; it does not follow the vehicle." It held that Meister could recover that additional coverage from his own insurer, "absent the business loss exclusion", and held the exclusion inapplicable because the legislature "mandated the availability of additional benefits without restriction". Holding: optional additional no-fault coverage a family buys for a person is not blocked by the anti-stacking amendment or by a business-use exclusion.

**Nelson v. American Family Insurance Group, 651 N.W.2d 499 (Minn. 2002).** Sharon Nelson received $20,000 in no-fault income loss benefits after a 1990 Minnesota accident. After a second accident she sued the tortfeasor in South Dakota, and the jury awarded $37,000 for past income loss, paid by American Family as the tortfeasor's insurer; after her one-third attorney fee she netted $24,666.67. She then sued American Family in Minnesota for further no-fault benefits. The district court and court of appeals held that any further recovery would be a double recovery. The Supreme Court reversed, saying that American Family's position "would impose on Nelson the cost of recovering in her tort action amounts that essentially represent the no-fault benefits covered by her American Family policy." It concluded: "To avoid these improper results, we conclude that Nelson is entitled to receive $6,666.67 from American Family", which "represents American Family's proportionate share of the attorney fees charged in the South Dakota action." Holding: the no-fault insurer must pay its proportionate share of the attorney fees when the injured person's tort recovery duplicates no-fault benefits.

## How this fits together (my summary)

- After any collision a driver must stop, investigate, give name and other information, and help injured people. Leaving after an injury crash can be a felony, and a driver who caused the crash and left can face criminal vehicular charges.
- A traffic law violation is evidence of negligence in a civil case and not automatic negligence, and a jury can find it excused (Pouliot, § 169.96).
- Fault is shared by percentage. An injured person can recover unless the person is more at fault than the defendant, and the recovery is reduced by the person's share (§ 604.01, Daly).
- Seat belt evidence cannot be used in a civil injury case to reduce damages (§ 169.685, subd. 4; Cressy).
- No-fault benefits pay medical and income loss regardless of fault, up to $20,000 medical and $20,000 for other losses as a minimum, with income loss at 85 percent up to $500 per week. To sue the at-fault driver for pain and suffering, the injured person must pass the tort threshold: more than $4,000 in medical expenses, or permanent injury, disfigurement, death, or 60 days of disability (§ 65B.51, Nemanic).
- The injury must arise from the use of the vehicle for transportation for no-fault benefits to apply (Tlougan).

## What this document does not cover

- Wrongful death claims, claims against governments and other special time limits and notice rules.
- Property damage claims and insurance claims handling rules beyond what is quoted above, and rules about total losses and rental cars.
- Optional coverages beyond the mandatory uninsured and underinsured coverage, and how stacking works today beyond the cases above.
- Workers' compensation and motorcycle, commercial and rideshare insurance rules.
- Criminal defenses to hit-and-run and criminal vehicular charges, beyond the cross references above.
- Court decisions not listed above. The list is a selection of leading decisions, not a complete one.
```


## References

- [LangChain: multi-agent patterns](https://docs.langchain.com/oss/python/langchain/multi-agent), [subagents](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents), [skills](https://docs.langchain.com/oss/python/langchain/multi-agent/skills) and [router](https://docs.langchain.com/oss/python/langchain/multi-agent/router)
- [LangChain: human-in-the-loop](https://docs.langchain.com/oss/python/langchain/human-in-the-loop), [interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) and [built-in middleware](https://docs.langchain.com/oss/python/langchain/middleware/built-in)
- [Minnesota Statutes 2025](https://www.revisor.mn.gov/statutes/cite/169), Office of the Revisor of Statutes
- [Caselaw Access Project](https://case.law/) and [Legal Information Institute](https://www.law.cornell.edu/supremecourt/text/), for the court opinions
- [Agent2Agent Protocol, part 1](/posts/orchestration2/) and [part 2](/posts/orchestration3/), on calling agents you do not control
