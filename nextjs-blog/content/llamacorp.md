---
title: "LlamaCpp"
description: "A comprehensive guide covering llamacpp"
date: "2025-09-20"
category: "Development"
image: "/assets/images/jupyter.svg"
tags: ["python","ai","ml"]
---

# LlamaCpp

## Large Language Models (Running)

![](/assets/images/llamacorp/jupyter.svg)
*Cameron Oelsen, BSD, via Wikimedia Commons*


## Llama.cpp

The llama.cpp project provides Large Language Models.

The llama-cpp-python module allowed me to access the llama.cpp model from Python.

![](/assets/images/llamacorp/screenshot-2023-08-04-at-7.50.41-am-1746x1230.png)
*What is the Capital of England? First response.streamlit run app1a.py*

![](/assets/images/llamacorp/screenshot-2023-08-04-at-8.17.37-am-1734x1226.png)
*What is the Capital of England? Second response.*


## Requirements

$ conda create --name llama jupyterlab ipykernel ipywidgets
$ conda activate llama
$ pip install -r requirements.txt


## LangChain

I updated my [LangChain to create a medical report application](langchain.html) to work with Llama.cpp

![](/assets/images/llamacorp/screenshot-2023-08-08-at-1.42.34-pm-1836x923.png)
*streamlit run app2a.py*


## Pirate Jack

I updated a Llama2 Chat code sample to create a "Pirate Jack" application.

![](/assets/images/llamacorp/screenshot-2023-08-08-at-1.31.43-pm-1836x1395.png)
*If I have 17 Doubloons and spend 6 on a Pistol how many would I have have left? (using M2 apple silicon GPU)streamlit run app3a.py*

![](/assets/images/llamacorp/screenshot-2023-08-08-at-1.33.17-pm-1836x669.png)
*How much does a Cutlass cost? (from "memory"... it be costin' 3 Doubloons, savvy?)*

![](/assets/images/llamacorp/screenshot-2023-08-08-at-1.34.40-pm-1289x518.png)
*Chat application's memory*
