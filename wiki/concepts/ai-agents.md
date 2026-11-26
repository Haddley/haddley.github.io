---
type: concept
slug: ai-agents
title: "AI agents"
description: "I explore the practical implementation of AI agents, ranging from multi-agent systems in Copilot Studio to complex hybrid architectures using the DeepSeek Harness."
posts: [copilotagentsreality, copilotstudiostl, copilotstudioteam, deepseekharnesshybrid, attiny1, specdriven3, specdriven4, specdriven1, specdriven2, deepseekharnessollama]
status: current
checked: "2026-11-26"
source_hash: "676383afcab6"
generated_by: gemma4:12b
---

**Summary.** I explore the practical implementation of AI agents, ranging from multi-agent systems in Copilot Studio to complex hybrid architectures using the DeepSeek Harness. My posts highlight that successful agent deployment requires rigorous data preparation, clear task scoping, and robust verification processes to move beyond simple demonstrations.

## The idea
- Agents often fail in real-world use because of poor data preparation and vague scope management.
- Multi-agent systems improve reliability by breaking complex tasks into smaller, manageable pieces with specific roles.
- Hybrid architectures can use local models for small, well-defined tasks to manage costs and reliability.
- Spec-driven tools provide different levels of rigor and proactive clarification when building agent-driven systems.
- A successful agent requires a human to verify the output because the agent cannot explain everything.

## Claims
- A demo hides the extensive work required behind the agent.
  > "A demo hides the work that sits behind the agent." — copilotagentsreality
- A team of agents makes instructions easier to manage and test.
  > "Every part is small enough to read, test and change on its own." — copilotstudioteam
- The hybrid model works if the tasks are small and clearly defined.
  > "The short answer: it works, provided the pieces are small and written down exactly." — deepseekharnesshybrid
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- BMAD is the only tool that asks for clarification instead of making silent decisions.
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)." — specdriven3
- Spec-Kit's constitution produced binding rules even when I provided no input.
  > "With no principle input from me, it read the repo itself — README, `package.json`, file structure — and wrote five actual, binding principles: a Separation of Concerns rule (logic/DOM split), Test-First for calculation logic, No Build Step, Simplicity/YAGNI, and one I did not expect:" — specdriven2
- Both agents passed every conversation after I switched to findings and openQuestions, but I could not isolate which change mattered.
  > "After I switched to `findings`, which is empty when a value is missing, both passed." — copilotstudioteam
- A person must still check the output because it does not explain everything.
  > "It does not explain everything, so a person still has to check the output." — copilotagentsreality

## Where the posts differ
- Different tools handle ambiguity differently, with some making silent decisions while others proactively ask for clarification.
  > "OpenSpec did not ask a single clarifying question." — specdriven1
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)." — specdriven3

## What I concluded
Reliable AI agents depend on small, well-defined tasks and high-quality data rather than just the model's capabilities. Implementing these systems successfully requires choosing the right tools and architectures to manage complexity and ensure consistent results.
