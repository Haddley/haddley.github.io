---
title: "LLM Benchmarking"
part: 7
description: "On 18 accounting questions with one decisive fact removed, a hosted model that was allowed to ask a follow-up asked in 14 and got all 14 right. In the 4 it answered without asking, it was wrong every time. Asked the complete questions, it did not ask at all. A notes base can also be kept up to date in place."
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

## What I would do with this

- **Let the assistant ask.** Allowing a `QUESTION:` reply cost nothing on the complete questions and rescued most of the incomplete ones.
- **Do not trust an answer that arrives without a question when the question looks thin.** In this test, every answer that skipped the question was wrong. A rule such as "list the facts you assumed" would at least expose the guess.
- **Test it on your own incomplete questions.** My 18 are few, and I wrote them to be decisive.

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
