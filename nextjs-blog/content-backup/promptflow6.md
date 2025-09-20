---
title: "Prompt Flow (Part 6)"
description: "A comprehensive guide covering prompt flow (part 6)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/promptflow6.png"
tags: ["python","ai","git","github"]
---

# Prompt Flow (Part 6)

Prompt flow (Part 6) With Semantic Kernel and Planner This file is licensed under the MIT license. Quick start I used Prompt flow, Semantic Kernel and Planner to create an AI application. I used the Visual Studio Code Prompt flow Extension to create a Chat flow I accepted the default name I ran the flow and asked "what is 2134.567 * 653.23?" It provided an answer that was close but incorrect (the correct result is 1,394,363.20141) The correct result I replaced the large language model chat node with a Python node. The answer to every question I ask is "hello "+the question I asked (not very useful) python_node_v8t9.py I added Semantic Kernel to the Python code I added the Joke function from the FunPlugin. Now the answer to every question I ask is a Joke (not always useful) python_node_v8t9.py (updated) I added the MathPlugin and a Planner Now I can ask fun questions or math questions and the bot can decide which Plugin to call References A deeper dive on PromptFlow and Semantic Kernel private github
