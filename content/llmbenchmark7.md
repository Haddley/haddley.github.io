---
title: "LLM Benchmarking"
part: 7
description: "On 18 accounting questions with one decisive fact removed, a hosted model that was allowed to ask a follow-up asked in 14 and got all 14 right, but Qwen3.8 27B never asked until I told it firmly to, and Qwen2.5 14B asked but could not use the answers. A notes base can also be kept up to date in place."
date: "2026-11-24"
categories: ["AI", "Python"]
image: "/assets/images/llmbenchmark7/poster.svg"
tags: "benchmarking, evaluation, clarifying-questions, ai-agents, deepseek"
hidden: true
slug: "llmbenchmark7"
---
Every question in this series so far arrived complete. A real client does not do that. They leave out the date, the amount or the status, and an assistant that guesses sounds just as sure as one that knows. This post tests the other option: letting the model ask.

:::brain-power Before you read the answer
Take a question with one key number missing. Would you expect a model to ask for it, or to guess? And if I give it the complete question, would it still ask? Make a guess for each, then read on.
:::

:::bullet-points The short answer
- **When I removed one decisive fact and allowed follow-up questions, `deepseek-flash` asked in 14 of 18 questions and was right in all 14 once it had the answer.**
- **In the 4 where it did not ask, it was wrong every time.**
- **On the complete versions of the same 18 questions it asked nothing and got all 18 right.** It did not pester me when nothing was missing.
- **The local models hardly ever asked.** Qwen3.8 27B asked in none of the 18 and got 4 right. Qwen2.5 14B asked in 5 and got 7 right.
- **A firmer instruction fixed Qwen3.8 27B.** Told "if even one number is not stated, ask", it asked in 7 questions, was right in all 7 and scored 9 of 18, and it still asked nothing on the complete questions. Qwen2.5 14B asked in 6 but was right after only 1, and it began asking on 2 of the complete questions.
- **The sample is small and I built the questions myself,** so read this as a test of the idea, not a measure of how often it works.
:::

## How I tested

**Making incomplete questions.** I took exam questions from the same professional accounting set and had `deepseek-flash` rewrite each one with a single decisive fact removed, such as a rate, a date or a status. It also wrote down the fact it had removed, as the person asking would say it. I tried 240 questions and 170 gave a usable rewrite. A second call, shown only the incomplete question, said whether it could still be answered with certainty, and 110 of the 170 said it could not.

That check was too lenient, so I added a stricter one. I made `deepseek-flash` guess at all 110 with no follow-ups allowed, and kept the 24 where the guess was wrong, because for those the missing fact really changed the answer. I then read the 24 myself and dropped six that were vague, for example a question that only dropped the words "integrity of management". That left **18 questions**.

:::watch-it A trap in my own design
Because I kept only questions that the model had guessed wrong, its score when forced to guess (3 of 18) is a result of how I chose the questions. It is not a measurement. The numbers that mean something are the ones that compare asking with not asking on the same questions.
:::

**Three conditions.** In each, the model sees the question and the four options.

| Condition | What the model may do |
|---|---|
| Guess | Must answer, making its best assumption |
| Ask, complete question | May write `QUESTION: ...` instead of answering, on the original question |
| Ask, incomplete question | The same, on the question with the fact removed |

When the model asks, a simulated user replies. That user is another `deepseek-flash` call. It sees the full original question and the removed fact, and answers only what it is asked, in a sentence or two, without naming the options. The model may ask twice, then must answer.

## The results

| Condition (18 questions) | Asked | Right |
|---|---|---|
| Guess, fact removed | none allowed | 3 |
| Ask, fact removed | 14 | 14 of the 14 that asked; 0 of the 4 that did not |
| Ask, complete question | 0 | 18 |

Overall that is 14 of 18 right when asking was allowed on the incomplete questions.

I ran the same three conditions on two local models:

| Model | Asked | Right | Right on the complete questions |
|---|---|---|---|
| `deepseek-flash` | 14 | 14 | 18 |
| Qwen3.8 27B | 0 | 4 | 18 |
| Qwen2.5 14B | 5 | 7 | 14 |

(Asked and Right are on the 18 incomplete questions. When forced to guess, the three models got 3, 3 and 2 right.)

Qwen3.8 27B never wrote a `QUESTION:` line. In one case (the perpetuity question, with no discount rate) it wrote in its reasoning that it would need "the annual discount rate" and then answered anyway. Qwen2.5 14B asked in 5 questions and was right after 4 of them. In the 13 where it did not ask, it was right in 3.

On the complete questions, neither local model asked anything with that plain instruction, so none of the three over-asks. The three guess-only scores come from how I chose the questions, so I do not compare them across models.

I read all 14 follow-up questions myself. Each one asked for the missing fact. Here are some, word for word:

| Missing fact | What the model asked |
|---|---|
| The stock split was 5 for 1 | "What was the stock split ratio (e.g., 2-for-1, 5-for-1)?" |
| Cash sales last year were $25 million | "What was the amount of cash sales last year?" |
| The purchase price of the machine was $475,000 | "What is the purchase price (invoice cost) of the machine?" |
| The discount rate is 9% | "What is the annual discount (or interest) rate?" |

:::no-dumb-questions
**Q: The simulated user also flagged whether each question asked about the missing fact. Why do you not report that?**

A: The flag marked only 2 of the 14 as on target, and my own reading says all 14 were. The flag was wrong, so I read the questions instead.

**Q: What did the four that did not ask have in common?**

A: They were questions where the model could assume a standard case: whom a CPA is liable to, a typical overhead rate, an ownership test, a purchase date. Each time it picked an assumption and got the answer wrong. This is the dangerous case, because the reply sounds the same as a right one.

**Q: Is the simulated user too kind?**

A: Possibly. It is the same model family as the one asking, it sees the missing fact, and it always has a short, clean answer. A real client might say "I am not sure". I have not tested that.
:::

### A firmer instruction

Because the local models rarely asked, I changed the instruction. Instead of "if a fact you need is missing, reply with QUESTION", the firm version says: "Before you answer, check every number, date, rate and status you need. If even one of them is not stated in the question, you must not assume it: reply with exactly one line in the form QUESTION: ... and nothing else." I ran it on the same questions for both local models, and again on the complete questions to check for over-asking.

| Model, firm instruction | Asked | Right | Right after asking |
|---|---|---|---|
| Qwen3.8 27B | 7 | 9 | 7 of 7 |
| Qwen2.5 14B | 6 | 6 | 1 of 6 |

On the complete questions, Qwen3.8 27B asked in none and got 18 right. Qwen2.5 14B asked in 2 and got 12 right.

Qwen3.8 27B went from asking in none to asking in 7, and every question it asked was answered correctly afterwards. It asked nothing on the complete questions. It still answered the other 11 without asking.

Qwen2.5 14B asked in 6, and five of its six questions named the missing fact. It was still right after only one of them, so it could not use the answer. It also asked on 2 of the complete questions, one of them for a cost of equity that the question did not need, and its score on the complete questions fell from 14 to 12. For that model the firm instruction made things slightly worse.

I tried one wording and did not tune it. The result says the instruction can matter a lot for one model and very little for another.

## What I would do with this

- **Let the assistant ask, and check that it does.** Allowing a `QUESTION:` reply cost nothing on the complete questions and rescued most of the incomplete ones for `deepseek-flash`. The local models mostly answered anyway, so I would measure the ask rate before relying on it. A firm instruction ("if even one number is missing, ask") raised it for Qwen3.8 27B and did not help Qwen2.5 14B, so test it on your own model.
- **Do not trust an answer that arrives without a question when the question looks thin.** In this test, every answer that skipped the question was wrong. A rule such as "list the facts you assumed" would at least expose the guess.
- **Test it on your own incomplete questions.** My 18 are few, and I wrote them to be decisive.

## How this fits what others found

I read the abstracts and search summaries of these papers, not the full texts, so treat the details as provisional.

- **Models answer instead of asking.** [Ambig-SWE](https://arxiv.org/html/2502.13069v2) tested agents on underspecified software tasks. The models defaulted to not asking unless encouraged, and even then found it hard to tell vague tasks from clear ones. Where they did ask, results improved a lot. That matches my local models, and `deepseek-flash`.
- **Knowing is not the same as asking.** ["Knowing but Not Showing"](https://arxiv.org/abs/2605.25284) reports that models can recognise ambiguity when asked to judge it and still answer directly. Qwen3.8 27B did exactly that on the perpetuity question. The same paper reports that adding retrieved context makes models less likely to ask. I did not test asking together with notes, so I cannot say whether that holds here.
- **Simple problems may be the easy case.** [QuestBench](https://arxiv.org/pdf/2503.22674) found that models are better at spotting missing information in simple algebra than in harder logic and planning tasks. Most of my 18 questions are a missing number, so my results may flatter the models.
- **Vendors market asking, and I found little independent evidence.** One legal-AI vendor review I read, [AI Vortex on Harvey](https://www.aivortex.io/legal/ai-tools/does-harvey-ai-hallucinate/), does not mention clarifying questions at all. It says Harvey "has published no independent benchmark" and that its own figures come from a [Stanford study of other legal tools](https://arxiv.org/html/2405.20362v1) that did not test Harvey. A search of Harvey's own site turned up a prompt-improvement button, workflow steps that collect user input, and a statement that it is exploring pausing to ask the lawyer. I did not read those pages. A [Sacra interview](https://sacra.com/research/director-innovation-law-legora-harvey-adoption) quotes one law-firm director saying purpose-built drafting tools ask the right follow-up questions more reliably than general platforms. That is one opinion, not a measurement.
- **A legal-consultation benchmark found the same weak spot, with harder clients.** [DLawBench](https://arxiv.org/html/2606.13931v1) is a preprint that I read in full. It has 461 cases and 26 models, in which a lawyer model asks a simulated client questions for 10 turns and then writes a memo. The best model scored 0.562, and how well a model drew out the facts predicted how well it resolved the case (r = 0.94). The paper gives the simulated client four styles: Cooperative, Dependent, Withdrawn and Adversarial. The facts stay the same, and models do worse with the Dependent and Withdrawn clients. My simulated user was always cooperative, so my numbers are probably too kind. The paper also names a failure it calls gap filling, where a model over-specifies missing facts to keep its memo complete. That is what Qwen3.8 27B did on the perpetuity question. The paper tested no modern small local models: its only small open models were OLMo 3 32B and an 8B legal model, and both scored worst. So it says nothing about whether small models have improved.
- **I found no test on accounting or tax questions.** DLawBench covers legal consultation, not accounting. That is the result of a few searches, not proof, and I would be glad to be corrected.

## Keeping the notes up to date

A notes base is only useful while it is current, and tax rules and standards change. I treat that as a maintenance job done in place, not a rebuild.

Each note keeps its rule, up to two quotes, the pages the quotes came from, when it was built and when it was last checked. Three steps keep it current:

1. **Check.** Fetch every cited page again and look for each stored quote in the new text.
2. **Mark.** A note whose quote is still there is fresh. One whose quote is gone is changed. One whose page cannot be reached is marked unreachable and is not touched.
3. **Refresh.** Re-research only the changed notes and overwrite them under the same id. The old text goes into the note's history until a person looks at it.

I ran the check on the 141 notes I built for [Part 6](/posts/llmbenchmark6/). It fetched 89 pages: 70 notes were fresh, none had changed and 18 were unreachable. The other 53 had no stored quote, so there was nothing to check. None changed, which is expected because the pages are only a few weeks old.

To test the refresh itself, I altered the stored quote in two notes to pretend that the source had changed. The check flagged exactly those two. The refresh then re-researched them, replaced both under the same ids and kept the old text in their history. The other 139 notes were identical afterwards. That was a simulated change, so it shows the mechanism works and does not show how often real sources change.

Two limits remain. A note whose page cannot be fetched is never marked stale, which is the weak spot for paywalled standards. And a changed quote only says that the page changed, not whether the answer did.

## References

- [LLM Benchmarking, Part 5](/posts/llmbenchmark5/): reading sources before answering, and what a reviewer can and cannot verify
- The code and every answer file are in [llmbenchmark2](/assets/files/llmbenchmark2/README.md): `clarify_build2.py`, `clarify_run.py` and `wiki_store.py`
