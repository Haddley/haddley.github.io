---
type: post
slug: sklearn18
title: "Scikit-Learn (Part 18)"
date: "2026-10-13"
part: 18
builds_on: [sklearn17, sklearn3, sklearn12, machinelearning1, sklearn1]
topics: [reinforcement-learning, policy-gradients, deep-q-networks, reward-discounting, epsilon-greedy-exploration]
tools: [Scikit-Learn, Gymnasium, Keras, TensorFlow]
status: current
checked: "2026-11-06"
source_hash: "2e476f06022f"
generated_by: gemma4:12b
---

**Summary.** I explore reinforcement learning using the CartPole environment where an agent learns to balance a pole through trial and error. I compare policy gradients and various deep Q-networks to show how agents can learn optimal actions without labeled examples.

## What I did
- I implemented a simple rule-based policy for the CartPole task.
- I trained a policy-gradient agent to learn from rewards.
- I trained several deep Q-network variants including the dueling double DQN.
- I evaluated the stability of these models and saved the best weights to handle training fluctuations.

## Claims
- The policy-gradient agent was more stable and faster to learn than the more advanced DQN variants.
  > "The policy-gradient agent learned fastest and most steadily, which is not what I expected: the DQN variants are meant to be the more advanced methods."
- The dueling double DQN was the only complex variant that remained stable at the end of the training.
  > "They are very unstable, and only the dueling double DQN, the last and most elaborate, was still near the top at the end."
- The simple rule-based policy performed poorly compared to the target score.
  > "That is nowhere near the 200 steps the notebook treats as success."
- I saved the best weights because the training for some models was unstable and the final weights could be worse.
  > "Keeping a copy of the best weights, and restoring it at the end, is worth doing, because the final weights may be much worse than the best ones."
- The training for the fixed-target agent failed after it reached the maximum score.
  > "The fixed-targets agent reached the top score of 200 steps for a long run, from about episode 360 to 480, and then slid to about 10 steps per game by episode 600, where it was no better than random."
- The replay buffer prevents the network from forgetting earlier lessons by providing a variety of past steps.
  > "The DQN trains on random batches from it, instead of on the most recent steps, because steps in a row are too alike, and training on them makes the network forget what it learned earlier."

## Outcome
I built a series of agents that learned to balance a pole, concluding that while policy gradients are steady, advanced DQN methods require specific techniques like replay buffers and target networks to remain stable.

## Caveats
The animations of the cart moving are not shown in the screenshots because they did not display during the capture process.
