---
type: concept
slug: ai-agents
title: "AI agents"
description: "I explore the practical implementation of AI agents, ranging from multi-agent systems in Copilot Studio to hybrid architectures using local and cloud models."
posts: [copilotagentsreality, copilotstudiostl, copilotstudioteam, deepseekharnesshybrid, attiny1, specdriven3, specdriven4, specdriven1, specdriven2, deepseekharnessollama]
status: current
checked: "2026-11-27"
source_hash: "7759e22f4526"
generated_by: gemma4:12b
---

**Summary.** I explore the practical implementation of AI agents, ranging from multi-agent systems in Copilot Studio to hybrid architectures using local and cloud models. My posts highlight that successful agent deployment depends on precise scope management, high-quality data preparation, and robust, spec-driven development workflows.

## The idea
- Multi-agent systems improve manageability by assigning narrow, specific roles to each agent.
- Hybrid architectures can use local models for small, well-defined tasks to manage costs and reliability.
- Spec-driven tools provide different levels of rigor and proactive clarification when handling complex requirements.
- Real-world agent performance often fails due to poor data preparation and lack of clear constraints.
- A human must still verify agent output as it does not provide a complete explanation of its logic.

## Claims
- A team of agents makes instructions easier to manage because each agent has a narrow job.
  > "Every part is small enough to read, test and change on its own." — copilotstudioteam
- The hybrid model works if the tasks are small and clearly defined.
  > "The short answer: it works, provided the pieces are small and written down exactly." — deepseekharnesshybrid
- BMAD is the only tool that asks for clarification instead of making silent decisions.
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)." — specdriven3
- The local model required more detail because a specification for a cloud model is too loose for a 30-billion-parameter model.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama
- A person must still check the output because it does not explain everything.
  > "It does not explain everything, so a person still has to check the output." — copilotagentsreality
- Spec-Kit's constitution-driven workflow caught a math error in its own specification.
  > "Convergence caught a real integer-truncation bug, and the plan step caught a math error in its own spec." — specdriven2
- More knowledge sources do not automatically result in a better agent.
  > "More knowledge sources are not automatically better." — copilotagentsreality

## Where the posts differ
- Different tools handle ambiguity differently, with some making silent decisions while others proactively seek clarification.
  > "OpenSpec did not ask a single clarifying question." — specdriven1
  > "**It is the only tool that actually asked.** Every ambiguity I tracked across this series — bitwise/word-size scope, negative-number representation, sample-vs-population standard deviation — BMAD stopped and asked me directly, as real choices, rather than silently deciding (OpenSpec) or silently deciding with written rationale (Spec-Kit)." — specdriven3
- Local models require significantly more detailed documentation than cloud models to achieve successful builds.
  > "A specification good enough for a frontier cloud model can be far too loose for a 30-billion-parameter local model." — deepseekharnessollama

## What I concluded
Successful AI agents require a shift from simple prompts to rigorous, spec-driven development and clear task decomposition. Reliability is achieved when developers focus on high-quality data, narrow agent scopes, and robust verification processes.
