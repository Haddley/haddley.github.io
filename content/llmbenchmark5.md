---
title: "LLM Benchmarking"
part: 5
description: "A model asked for its authority cites real sections but sometimes the wrong one. A model that reads the sources first gets 39 or 40 of 40 law and tax questions right, and a reviewer that may reject unconvincing answers flags the one it cannot verify."
date: "2026-11-21"
categories: ["AI", "Python"]
image: "/assets/images/llmbenchmark2/poster.svg"
tags: "benchmarking, evaluation, ai-agents, citations, deepseek, research"
hidden: true
slug: "llmbenchmark5"
---

[Part 2](/posts/llmbenchmark2/) said to ask a model to name the standard it used, and to check that against the source. This post tests the advice, and then tries something stronger: stop treating the model as an oracle that answers from memory, and make it a researcher that reads primary sources before it answers.

:::bullet-points The short answer
- **Asked for its authority, a strong model usually cites something real.** On 50 questions, `deepseek-flash` and `deepseek-v4-pro` named real standards almost every time. Their mistakes were quiet: a section next door to the right one, a superseded standard, and a citation where none was needed.
- **Reading the source first fixed what memory got wrong.** On 40 law and tax questions, a quick one-letter answer scored 28 and 29 right. After the models read the Internal Revenue Code, the UCC and federal regulations through tools, they scored **39 and 40**. It fixed 11 wrong guesses each and broke none, in about 4 to 5 tool calls per question.
- **A reviewer can flag answers it cannot verify.** A second model that rejects answers whose quotes do not support them accepted 38 of 40 answers, and all 38 were right. It sent back 4 or 5 correct answers for more research first, and the one wrong answer it saw was flagged as unresolved.
- **Telling the model "wrong, try again" added almost nothing.** Once the agent reads the sources, the answer key is not needed.
- **Do not make the reviewer strict.** Requiring the quotes to rule out every other option rejected more than half of the correct answers and cost 2 to 3 times as many tokens.
:::

## Do models cite real authority?

I asked the first 50 questions again, and asked for one more line: `AUTHORITY:`, the specific statute, section, regulation or standard the model relied on. `deepseek-flash` got all 50 right and `deepseek-v4-pro` got 47. Both gave an authority line for every question.

For the 10 law and tax questions I looked every citation up on Cornell's Legal Information Institute, which has the Internal Revenue Code and the UCC. All of them exist, and the titles fit the questions: UCC 2-205 (firm offers) for the contract question, IRC 704(c)(1)(A) for contributed property, IRC 121 for the sale of a home, UCC 3-419 for a cosigner. `deepseek-v4-pro` also cited IRC 111 for the franchise-tax refund question, which is the right section.

For the other 40 questions the standards are behind paywalls (AICPA and FASB), so I could not read them. I judged those from my own knowledge, so treat this as my opinion and not as a source check. Most were real, with plausible numbers: AU-C 530 for audit sampling, AU-C 560 for subsequent events, ASC 280-10-50-12 for segments, and SEC Rule 10A-3 for audit committees. The problems I found were quiet ones:

- **A nearby standard.** On a compilation question, `deepseek-flash` cited AR-C 90, which covers reviews. The compilation standard is AR-C 80, which `deepseek-v4-pro` cited. The answer was right and the citation was wrong.
- **A superseded standard.** On a lease question, `deepseek-flash` cited ASC 840, which ASC 842 replaced.
- **Padding.** On the NPV and bond-price questions, which need no authority, the models cited ASC 820, IFRS 13 and OMB Circular A-94, all loosely related at best.

None of this was invented. These are two strong models, and the weaker local models are the real test. I am still running those, and I will add them here when they finish. Meanwhile the quiet failures make the point: a citation is a pointer, and you still have to read what it points to.

## The model as a researcher

So I made the model read the source. The agent starts from the model's own one-letter answer, which I treat as an unverified first idea, and then works through tools:

- `get_irc(section)`, `get_ucc(section)` and `get_cfr(title, section)` read the text from Cornell LII.
- `ecfr_search(query)` searches the electronic Code of Federal Regulations.
- `fetch_url(url)` reads a page from a short list of primary-source sites: LII, eCFR, the IRS, the SEC, govinfo, uscode.house.gov and the Federal Register.

It has a budget of 8 tool calls. When it is ready it replies with JSON: the answer, a short explanation, and **quotes copied from the pages it read**. I could not give it general web search, since the search engines I tried either blocked scripts or returned spam. Auditing and accounting standards are behind paywalls, so I used only the 40 law and tax questions, where free primary sources exist.

```python
SYSTEM=("You are an accounting and tax researcher. You answer a multiple-choice question by reading primary sources, not by memory. "
 f"You have {TOOL_BUDGET} tool calls in total. Prefer statutes and regulations. Standards behind paywalls (AICPA, FASB) cannot be read. "
 "When you are ready, reply with JSON only, no other text: "
 '{"answer":"A|B|C|D","explanation":"two or three sentences","quotes":[{"source":"citation","quote":"an exact passage copied from a page you read"}],"confidence":"high|medium|low"}. '
 "Every quote must be copied exactly from tool output you received. If the sources do not settle the question, say so in the explanation and give your best answer with low confidence.")
```

### The three ways to stop

1. **Research.** Accept the first final answer.
2. **Gate.** A second model reviews the answer and sends it back for more research if it is not convincing, even when it is correct. It gets up to three rounds. A fresh model from the other DeepSeek family does the reviewing: `deepseek-v4-pro` reviews `deepseek-flash` and the other way round. Before the review, a plain check confirms that every quote appears word for word in the pages the agent read, which stops invented quotations.
3. **Oracle.** The answer key says "wrong" and the agent tries again. A real system has no key, so this is a ceiling, not a method.

This is the reviewer (the calibrated version):

```python
def gate(q,opts,ans,seen):
    quotes=[x for x in (ans.get('quotes') or []) if isinstance(x,dict) and x.get('quote')]
    good=[x for x in quotes if norm(x['quote']) and norm(x['quote']) in seen]
    if not good: return False,'none of your quotes appears in the pages you read. Quote the exact words of the source.',{}
    if arm=='gatestrict':
        crit="It is convincing only if the quoted sources, taken alone, establish the chosen option and rule out the other options."
    else:
        crit="It is convincing if the quoted sources support the chosen option and nothing in them contradicts it. It does not need to rule out every other option."
    prompt=(f"Question:\n{q}\n\nOptions:\n{opts}\n\nA researcher answered {ans.get('answer')} with this explanation: {ans.get('explanation')}\n\n"
      "Quotes from primary sources:\n"+"\n".join(f"- ({x.get('source')}) {x['quote']}" for x in good)+
      f"\n\nIs this convincing? {crit} "
      'Reply with JSON only: {"convincing": true|false, "reason": "one or two sentences", "missing": "what the researcher should look for next"}')
    j=None
    for attempt in range(3):
        try:
            r=api(verifier,[{"role":"user","content":prompt}],max_tokens=12000); j=parse(r['choices'][0]['message']['content'])
            if j is not None and 'convincing' in j: break
        except Exception: pass
        j=None
    if j is None: return True,'verifier error, accepted without review',{'error':True}
    return bool(j.get('convincing')),(str(j.get('reason',''))+' '+str(j.get('missing',''))).strip(),j
```

## What happened

| Arm | `deepseek-flash` | `deepseek-v4-pro` |
|---|---|---|
| One-letter guess, the start | 28 of 40 | 29 of 40 |
| Plain reasoning, no tools (for comparison) | 39 | 37 to 39 |
| **Research,** accept the first answer | **39** | **40** |
| **Gate,** calibrated reviewer | 39 | 40 |
| Gate, strict reviewer | 38 | 38 |
| Oracle, told "wrong" | 40 | 39 |

| Measure | `deepseek-flash` | `deepseek-v4-pro` |
|---|---|---|
| Wrong guesses fixed (research) | 11 | 11 |
| Right guesses broken (research) | 0 | 0 |
| Tool calls per question (research) | 4.7 | 4.0 |
| Tokens per question (research) | 16,400 | 20,200 |
| Gate: answers accepted, and right | 38 of 38 | 38 of 38 |
| Gate: correct answers sent back in round 1 | 4 | 5 |
| Gate: unresolved | 2 (1 right, 1 wrong) | 2 (both right) |
| Strict gate: correct answers sent back in round 1 | 23 | 26 |
| Strict gate: tokens per question | 37,600 | 69,300 |

**Reading the source did most of the work.** Both models fixed 11 of their wrong guesses and broke none. The final scores, 39 and 40 of 40, match plain reasoning with no tools, so on these questions research did not beat thinking. It did something else: every answer now comes with quotes from the statute, so I can check it without trusting the model.

**The oracle added almost nothing.** Telling the agent it was wrong changed one answer for `deepseek-flash` and none for `deepseek-v4-pro`, and `deepseek-v4-pro`'s oracle run returned no final answer on one question, so it scored one lower than its research run. In these tests, once the agent reads the sources, the key adds nothing.

**The calibrated gate works as a flag.** It accepted 38 of 40 answers, and all 38 were right. It sent 4 or 5 correct answers back for another round. They came back with the same answer after more research, and most were then accepted. That cost `deepseek-flash` about a quarter more tokens, and `deepseek-v4-pro` no more. The one wrong answer, `deepseek-flash` on an agency-law question about a principal who becomes incompetent, stayed unresolved, because the reviewer found that the quotes covered general agency principles and not incapacity. The agent had no source for it: agency is common law, and none of the sites I allowed has the rule. So the gate did the honest thing, it declined to be convinced.

**The strict gate does not work.** Requiring the quotes to rule out every other option sent back 23 and 26 of the correct answers, left 15 or 16 answers unresolved, used two to three times the tokens and broke one or two right answers when the agent changed them under pressure. A reviewer that is never satisfied is as useless as one that always is.

:::watch-it A small test
This is 40 questions, two models and one family of sources. The models already get these right when allowed to reason, so there was little room to improve. One wrong answer was flagged, and I cannot say how well the gate flags the others. The test is limited to law and tax, where free sources exist. Auditing and accounting standards are behind paywalls, and a research agent cannot read what it cannot reach.
:::

## What I would do with this

- **Do not trust an answer you cannot trace.** Make the model quote the source, check that the quote is in the pages it read, and show it to a person.
- **Start from the quick guess and research it.** The guess is cheap, and a few tool calls turned it into a verified answer. By my estimate from the token counts, each question cost a few cents.
- **Use a reviewer to decide what a person looks at.** The calibrated gate sorted answers into 38 that were safe and 2 to read. Keep it calibrated: "do the quotes support the answer?" works, and "do they rule out every alternative?" does not.
- **Keep a human for what the sources cannot settle.** The one wrong answer was a question with no accessible primary source. That is where a person is needed.
- **Give it a budget.** 8 tool calls were enough here. A research loop with no limit is a bill.

## The code

[agent.py](/assets/files/llmbenchmark2/agent.py) holds the whole agent, and [agent_report.py](/assets/files/llmbenchmark2/agent_report.py) produces the tables. `python3 agent.py deepseek-flash gate` runs one arm. The answers are in `agent_runs/`.

## References

- [Part 2](/posts/llmbenchmark2/): the ranking of the fifteen models
- [Part 3](/posts/llmbenchmark3/): the questions they miss
- [Part 4](/posts/llmbenchmark4/): how far I trust these numbers
- [Cornell Legal Information Institute](https://www.law.cornell.edu): the source for the Internal Revenue Code, the UCC and the Code of Federal Regulations
