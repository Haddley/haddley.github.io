---
title: "Langflow (Part 1)"
description: "A comprehensive guide covering langflow (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/langflow1.png"
tags: ["python","ai"]
---

# Langflow (Part 1)

Langflow (Part 1) OpenAI text to speech This file is licensed under the MIT license. OpenAI text to speech Langflow is a tool designed to simplify the development of applications using large language models (LLMs). OpenAI's text-to-speech (TTS) technology is designed to convert written text into natural-sounding speech. I used brew to install python version 3.10 I used the Visual Studio Code Python Extension to create a Python Environment I selected Venv I selected Python 3.10 I installed langflow I used python -m langflow run to start langflow I opened a browser and navigated to http://127.0.0.1:7860 I selected the Blank Flow template I clicked in the Untitled document box and selected the Import menu item I selected the Doc to Podcast (Langflow).json flow I selected the Settings menu item I selected the Global Variables menu item I added an openai_api_key variable The variable was listed I added the openai_api_key value to the LLM step added the openai_api_key value to the text-to-speech step I clicked on the File step to select a podcast source document I selected a Power Pages (Part 1).pdf source document I clicked the play button on the last step and ran into an issue I terminated langflow and used pip to install pydub. I restarted langflow. I clicked play on the last flow step While I was waiting I clicked the Inspect Output menu item in the Extract Block From Markdown step I reviewed the podcast script Once the flow finished running I reviewed the result (see below) References Podcast Doc2Podcast
