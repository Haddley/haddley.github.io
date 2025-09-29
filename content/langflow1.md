---
title: "Langflow (Part 1)"
description: "References"
date: "2024-10-30"
categories: ["Python","AI"]
tags: []
slug: "langflow1"
image: "/assets/images/85702467-200x200.png"
---

![](/assets/images/langflow1/85702467-200x200.png)
*This file is licensed under the MIT license.*


Langflow is a tool designed to simplify the development of applications using large language models (LLMs).

OpenAI's text-to-speech (TTS) technology is designed to convert written text into natural-sounding speech.

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.00.32pm-1836x1475.png)
*I used brew to install python version 3.10*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.02.16pm-1836x399.png)
*I used the Visual Studio Code Python Extension to create a Python Environment*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.02.27pm-1836x446.png)
*I selected Venv*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.05.23pm-1836x475.png)
*I selected Python 3.10*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.06.26pm-1836x657.png)
*I installed langflow*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.10.24pm-1836x567.png)
*I used python -m langflow run to start langflow*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.10.44pm-1836x1053.png)
*I opened a browser and navigated to http://127.0.0.1:7860*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.10.55pm-1836x1062.png)
*I selected the Blank Flow template*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.11.17pm-1836x1062.png)
*I clicked in the Untitled document box and selected the Import menu item*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.11.36pm-1836x1059.png)
*I selected the Doc to Podcast (Langflow).json flow*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.16.40pm-1836x425.png)
*I selected the Settings menu item*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.16.51pm-1836x664.png)
*I selected the Global Variables menu item*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.18.50pm-1836x1011.png)
*I added an openai_api_key variable*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.19.02pm-1836x1020.png)
*The variable was listed*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.19.31pm-1836x1019.png)
*I added the openai_api_key value to the LLM step*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.20.05pm-1836x1019.png)
*added the openai_api_key value to the text-to-speech step*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.23.58pm-1836x1017.png)
*I clicked on the File step to select a podcast source document*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.25.40pm-1836x1024.png)
*I selected a Power Pages (Part 1).pdf source document*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.26.47pm-1836x1032.png)
*I clicked the play button on the last step and ran into an issue*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.28.17pm-1836x574.png)
*I terminated langflow and used pip to install pydub. I restarted langflow.*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.28.49pm-1836x1013.png)
*I clicked play on the last flow step*

![](/assets/images/langflow1/screenshot-2024-10-30-at-6.15.08pm-1164x784.png)
*While I was waiting I clicked the Inspect Output menu item in the Extract Block From Markdown step*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.31.05pm-1836x1015.png)
*I reviewed the podcast script*

![](/assets/images/langflow1/screenshot-2024-10-30-at-5.53.41pm-1836x1212.png)
*Once the flow finished running I reviewed the result (see below)*


## References

- [Podcast](https://haddley.github.io/podcast/audio_customer_portal.mp3)
- [Doc2Podcast](https://github.com/misbahsy/Doc2Podcast)