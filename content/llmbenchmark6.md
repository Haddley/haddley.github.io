---
title: "LLM Benchmarking"
part: 6
description: "A cheap hosted model read the sources for half of the 282 accounting questions and wrote a note for each. I gave the other half to three models with the three most similar notes attached. The strong models did not improve, and the weaker Qwen2.5 14B got 7 to 13 fewer right, even with irrelevant notes."
date: "2026-11-24"
categories: ["AI", "Python"]
image: "/assets/images/llmbenchmark6/poster.svg"
tags: "benchmarking, evaluation, knowledge-base, retrieval, deepseek, qwen"
hidden: true
slug: "llmbenchmark6"
---
Professionals do not answer from memory alone. They keep notes and precedents, and they look things up. [Part 5](/posts/llmbenchmark5/) had a model read primary sources before it answered. This post tries the shortcut: do the reading once, keep the notes, and let a local model use them.

:::brain-power Before you read the answer
Suppose a cheap hosted model writes a note for each of 141 questions, and I then give a local model the three most similar notes when it answers 141 different questions. Would you expect it to score higher? Would you expect the weakest model to gain the most? Make a guess for each, then read on.
:::

:::bullet-points The short answer
- **The notes did not help.** `deepseek-flash` moved from 139 right to 138, and Qwen3.8 27B from 133 to between 131 and 134.
- **The weaker model got worse.** Qwen2.5 14B scored 117 alone and between 104 and 110 with notes.
- **Notes for the wrong question hurt about as much as the right ones.** The control scored 108.
- **The notes themselves were mostly sound.** The builder got 140 of 141 right, and 47 of the 48 notes the reviewer accepted were right.
- **My conclusion is narrow.** A crude retrieval of three notes does not help models that already score 83% to 99%. It does not show that notes cannot help.
:::

## How I tested

**Splitting the questions.** I split the 282 questions at random into two halves of 141, with a fixed seed. I used one half to build notes and the other half only to test.

**Building the notes.** `deepseek-flash` ran the research agent from Part 5 on the 141 build questions. It had no answer key. For each question it read sources and wrote a note: the general rule that settles that kind of question, in a sentence or two, plus up to two exact quotes. A second model reviewed each answer and accepted or left it unresolved.

| | Count |
|---|---|
| Notes written | 141 |
| Accepted by the reviewer ("verified") | 48 |
| Unresolved | 93 |
| Builder right (of 141) | 140 |
| Right among the 48 accepted | 47 |

The one accepted note that was wrong was on bond premium amortisation. Its quote was real, and the answer was still wrong. A verified quote is not a right answer.

**Retrieving notes.** For each test question I scored every note by word overlap with the question and its options (TF-IDF) and attached the top three. I wrote the retrieval myself, and it does no more than that.

**Four arms.** Each arm answered the 141 test questions with brief reasoning, as in Part 2.

| Arm | What the model sees |
|---|---|
| None | The question only |
| Wiki | Top three of the 48 verified notes |
| Wikiall | Top three of all 141 notes, verified or not |
| Control | The notes retrieved for the next question, which are for a different topic |

The notes came with the line "Background notes, found by searching a notes base. They may not apply to this question; use them only if they do."

**Checking for leaks.** Six test questions were very similar (above 0.5 similarity) to a build question. I report the totals both ways.

## The results

Right of 141 test questions:

| Model | None | Wiki | Wikiall | Control |
|---|---|---|---|---|
| `deepseek-flash` (hosted) | 139 | 138 | 138 | not run |
| Qwen3.8 27B | 133 | 131 | 134 | 131 |
| Qwen2.5 14B | 117 | 104 | 110 | 108 |

For the two stronger models, every difference is within three questions, and I cannot separate them from noise. Taking out the six near-duplicate questions changes nothing: for Qwen2.5 14B the figures become 111 alone against 99, 105 and 102.

### What changed question by question

| Model and arm | Wrong to right | Right to wrong |
|---|---|---|
| Qwen3.8 27B, wiki | 2 | 4 |
| Qwen3.8 27B, wikiall | 2 | 1 |
| Qwen2.5 14B, wiki | 7 | 20 |
| Qwen2.5 14B, wikiall | 8 | 15 |
| Qwen2.5 14B, control | 7 | 16 |

The control arm is the most useful row. Notes for an unrelated question fixed as many answers as the real notes (7) and broke 16 where the real ones broke 15 to 20. Any added text moves the answers, and for this model the move is mostly downward.

Of the 24 questions that Qwen2.5 14B got wrong alone, the notes fixed 7 to 8, whichever arm I used. That is no better than the control.

:::no-dumb-questions
**Q: In Part 3 a rule note lifted models from at most 1 of 10 right to 7 to 9. Why not here?**

A: In Part 3 I wrote each note for the question it went with, knowing the key, and I called that a flaw. Here a machine retrieved the notes, never saw the key, and picked them by word overlap. The same idea gives a very different result when the note is not matched to the question.

**Q: Do unverified notes do more harm than verified ones?**

A: Not that I can see. For Qwen2.5 14B, all notes scored 110 and verified notes only scored 104. The gap is small and I would not read much into it.

**Q: Could better retrieval fix it?**

A: Possibly. I tried one method with three notes. Fewer notes, a stricter match, or a model that reads the notes and picks the useful one could all behave differently, and I have not tested them.
:::

:::watch-it My explanation is a guess
I think the weaker model is distracted by text that is not quite about its question, and the control arm is consistent with that. I did not test it. For example, I did not read the 20 broken answers one by one.
:::

## What I would do with this

- **Do not add a notes base to a model that already scores in the 90s.** There was nothing to fix, and the notes cost a little.
- **Test before you add one to a weaker model.** My result for Qwen2.5 14B was a loss, and I would not have guessed it.
- **Use the notes where they are strongest: as a record of sources.** They showed what a verified answer rests on. They did not make the model more accurate.
- **Match a note to the question before you trust it.** The Part 3 lift came from notes that fitted the question.

## References

- [LLM Benchmarking, Part 5](/posts/llmbenchmark5/): reading sources before answering
- [LLM Benchmarking, Part 3](/posts/llmbenchmark3/): the rules-in-prompt experiment
- The code and every answer file are in [llmbenchmark2](/assets/files/llmbenchmark2/README.md): `split.json`, `agent3.py`, `wiki_lib.py`, `run_wiki.py`, and `agent_runs3/` and `wiki_runs/`
