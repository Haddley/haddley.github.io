---
title: "Business Central (Part 27) PromptDialog"
description: "A comprehensive guide covering business central (part 27) promptdialog"
date: "2025-09-20"
category: "Development"
image: "/assets/images/posts-meta.svg"
tags: ["cloud","ai","business central","dynamics"]
---

# Business Central (Part 27) PromptDialog

## Prompt Dialog Introduction (Part 1)

![](/assets/images/promptdialog/dynamics365-color.svg)
*By Microsoft, Public Domain*


## Prompt Dialog (Part 1)

The PromptDialog page serves as the core UI component for a Business Central Copilot, enabling users to evaluate and refine AI-generated outputs within a structured, guided workflow. This page type orchestrates an intuitive, end-to-end experience where:

User Input: Users provide initial prompts or instructions.
AI Output Generation: The system processes the input and displays results.
Review & Iteration: Users assess the output, make edits (if needed), and regenerate responses until satisfied.
Final Action: The user chooses to either save the refined output or discard the session.

![](/assets/images/promptdialog/screenshot202025-05-2320at206.45.36e280afpm-2136x1380.png)
*I navigated to Business Central https://businesscentral.dynamics.com*

![](/assets/images/promptdialog/screenshot202025-05-2320at206.47.10e280afpm-2136x1254.png)
*I created a Sandbox Environment*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.19.02e280afpm-2136x678.png)
*The Sandbox Environment state updated to Active*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.20.05e280afpm-2136x879.png)
*I switched to the CRONUS company in the Sandbox Environment*

![](/assets/images/promptdialog/screenshot202025-05-2320at206.29.07e280afpm-2136x634.png)
*In Visual Studio Code I selected the View | Command Palette menu item and entered Al:Go!*

![](/assets/images/promptdialog/screenshot202025-05-2320at206.30.06e280afpm-2136x148.png)
*I entered the Project/Extension name LLM*

![](/assets/images/promptdialog/screenshot202025-05-2320at206.30.17e280afpm-2136x147.png)
*I selected the latest Business Central version*

![](/assets/images/promptdialog/screenshot202025-05-2320at206.32.24e280afpm-2136x325.png)
*I selected the Microsoft cloud sandbox option*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.21.47e280afpm-2136x97.png)
*I used the View | Command Palette menu item and entered Al:Download symbols*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.22.04e280afpm-2136x1241.png)
*I clicked the Copy & Open button*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.23.22e280afpm-2136x1103.png)
*I clicked Continue*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.24.24e280afpm-2136x728.png)
*I clicked the Start Debugging menu item*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.25.24e280afpm-2136x744.png)
*The Debugger stopped on the Message statement. I clicked Continue*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.25.43e280afpm-2136x962.png)
*The Message was displayed on the Business Central page*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.30.21e280afpm-2136x592.png)
*I selected the New AL File Wizard right click menu item*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.30.49e280afpm-2136x360.png)
*I selected Page*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.34.20e280afpm-2136x876.png)
*I accepted the Object Id 50100 and entered the page name LLM*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.34.33e280afpm-2136x804.png)
*A page was generated*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.48.21e280afpm-2136x905.png)
*I updated the generated page with Prompt Dialog specific AL code*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.51.54e280afpm-2136x641.png)
*I updated the startupObjectId. I clicked Run | Start Debugging*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.52.43e280afpm-2136x1261.png)
*The Prompt Dialog page was displayed. I selected the Capital City item from the Prompt guide*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.53.19e280afpm-2136x1257.png)
*I updated the text to What is the Capital of France? and clicked the Generate button*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.54.07e280afpm-2136x663.png)
*The RunGeneration procedure was executed. This code updated the Output variable/field based on the Prompt*

![](/assets/images/promptdialog/screenshot202025-05-2320at207.54.40e280afpm-2136x956.png)
*The generated response was displayed*
