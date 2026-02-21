---
title: "Prompt Flow (Part 6)"
description: "Quick start"
date: "2024-09-01"
categories: ["AI"]
tags: ""
slug: "promptflow6"
image: "/assets/images/promptflow6/logo.svg"
---


I used Prompt flow, Semantic Kernel and Planner to create an AI application.

![](/assets/images/promptflow6/screenshot-2024-09-01-at-2.49.44pm-2044x680.png)
*I used the Visual Studio Code Prompt flow Extension to create a Chat flow*

![](/assets/images/promptflow6/screenshot-2024-09-01-at-2.49.57pm-1694x420.png)
*I accepted the default name*

![](/assets/images/promptflow6/screenshot-2024-09-01-at-3.12.23pm-1876x354.png)
*I ran the flow and asked "what is 2134.567 * 653.23?"It provided an answer that was close but incorrect (the correct result is 1,394,363.20141)*

![](/assets/images/promptflow6/screenshot-2024-09-01-at-3.13.39pm-468x254.png)
*The correct result*

![](/assets/images/promptflow6/screenshot-2024-09-01-at-3.18.34pm-2136x883.png)
*I replaced the large language model chat node with a Python node.The answer to every question I ask is "hello "+the question I asked (not very useful)*

![](/assets/images/promptflow6/screenshot-2024-09-01-at-3.43.26pm-2136x1400.png)
*I added Semantic Kernel to the Python codeI added the Joke function from the FunPlugin.*

![](/assets/images/promptflow6/screenshot-2024-09-01-at-3.47.40pm-1828x182.png)
*Now the answer to every question I ask is a Joke (not always useful)*

![](/assets/images/promptflow6/screenshot-2024-09-01-at-5.23.01pm-1792x710.png)
*I added the MathPlugin and a PlannerNow I can ask fun questions or math questions and the bot can decide which Plugin to call*


## python_node_v8t9.py

```text
from promptflow import tool
from semantic_kernel import Kernel
from semantic_kernel.connectors.ai.open_ai import OpenAIChatCompletion

@tool
async def my_python_tool(input1: str) -> str:

    kernel = Kernel()
    kernel.remove_all_services()
    service_id = "default"
    kernel.add_service(
        OpenAIChatCompletion(
            service_id=service_id,
        ),
    )
    plugin = kernel.add_plugin(parent_directory="./prompt_template_samples/", plugin_name="FunPlugin")

    from semantic_kernel.functions import KernelArguments

    joke_function = plugin["Joke"]

    # time travel to dinosaur age
    
    joke = await kernel.invoke(
        joke_function,
        KernelArguments(input=input1, style="super silly"),
    )
    print(joke)

    return str(joke)
```

## python_node_v8t9.py updated

```text
# from promptflow import tool
from promptflow.core import tool
from semantic_kernel import Kernel
from semantic_kernel.connectors.ai.open_ai import OpenAIChatCompletion

@tool
async def my_python_tool(input1: str) -> str:

    kernel = Kernel()
    kernel.remove_all_services()
    service_id = "default"
    kernel.add_service(
        OpenAIChatCompletion(
            service_id=service_id,
        ),
    )

    fun_plugin = kernel.add_plugin(parent_directory="./prompt_template_samples/", plugin_name="FunPlugin")
    math_plugin = kernel.add_plugin(parent_directory="./plugins", plugin_name="MathPlugin")

    from semantic_kernel.planners.function_calling_stepwise_planner import (
        FunctionCallingStepwisePlanner,
        FunctionCallingStepwisePlannerOptions,
    )

    planner = FunctionCallingStepwisePlanner(service_id="default")

    # goal = "Figure out how much I have if first, my investment of 2130.23 dollars increased by 23%, and then I spend $5 on a coffee"  # noqa: E501
    # goal = "what is 2134.567 * 653.23?" 
    # goal = "tell me a limeric about cats"
    goal = input1

    # Execute the plan
    result = await planner.invoke(kernel=kernel, question=goal)

    print(f"The goal: {goal}")
    print(f"Plan result: {result.final_answer}")

    return result.final_answer
```