---
title: "DeepSeek R1"
description: "A comprehensive guide covering deepseek r1"
date: "2025-09-20"
category: "Development"
image: "/assets/images/254932576-0d0b44e2-8f4a-4e99-9b52-a5c1c741c8f7-844x844.png"
tags: ["ai","testing"]
---

# DeepSeek R1

## Apple MacBook Install

![](/assets/images/ollamadeepsekr1applemacbookinstall/254932576-0d0b44e2-8f4a-4e99-9b52-a5c1c741c8f7-844x844.png)
*ollama is licensed under theMIT License*


## Apple MacBook Install

**Installation & Configuration**
I successfully installed the DeepSeek-R1 model.

**Initial Performance Testing**
The 7 billion parameter variant generated output in approximately 25 seconds on my M2 MacBook Air with 16 GB of unified memory.
The 14 billion parameter variant generated output in approximately 40 seconds on my M4 MacBook Air with 32 GB of unified memory.
The 32 billion parameter variant generated output in approximately 1 minute and 50 seconds on my M4 MacBook Air with 32 GB of unified memory.
The 70 billion parameter variant generated output in approximately 1 minute 28 seconds on my M1 Max Mac Studio with 64 GB of unified memory.

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at2012.49.15e280afpm-2136x772.png)
*https://ollama.com/download*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at2012.51.16e280afpm-1108x688.png)
*I clicked Open*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at2012.51.23e280afpm-1060x604.png)
*I clicked Move to Applications*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at201.00.00e280afpm-2136x1162.png)
*search for R1 model*

**1.5B Model:**
Embedded AI (IoT devices), high-volume/low-latency tasks (e.g., spam filtering, simple Q&A), or prototyping.

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at2012.59.00e280afpm-1144x342.png)
*ollama run deepseek-r1:1.5b*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at201.01.50e280afpm-1140x746.png)
*write 100 words on DeekSeek LLM*

**7B Model:**
General-purpose chatbots, content moderation, mid-tier automation (e.g., customer support, basic data analysis).

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at201.04.25e280afpm-1138x294.png)
*ollama run deepseek-r1:7b*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at201.06.38e280afpm-1132x736.png)
*write 100 words on DeekSeek LLM*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at201.31.24e280afpm-1110x746.png)
*ollama run deepseek-r1:7b --verbose*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-05-2320at201.29.57e280afpm-1748x1544.png)
*M2 processor 16 GB of unified memory*

**14B Model:**
Enterprise-grade applications (e.g., advanced chatbots, research tools, code assistants).
Scenarios requiring deep domain expertise or high accuracy (e.g., legal document analysis, financial forecasting).

![](/assets/images/ollamadeepsekr1applemacbookinstall/501048925-1408883290959735-9110886994771392643-n-1140x746.png)
*ollama run deepseek-r1:14b --verbose*

![](/assets/images/ollamadeepsekr1applemacbookinstall/494814422-1859512331511522-7881506198410234900-n-1932x1528.png)
*M4 processor 32 GB of unified memory*

**32B Model:**
Ideal for applications prioritizing accuracy over speed, such as advanced research, data analysis, or generating long-form content.

![](/assets/images/ollamadeepsekr1applemacbookinstall/494362500-1880696412691727-7219409545231194829-n-1138x738.png)
*ollama run deepseek-r1:32b --verbose*

![](/assets/images/ollamadeepsekr1applemacbookinstall/494822610-2106330209879656-3127600083050725665-n-1938x1534.png)
*M4 processor 32 GB of unified memory*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-06-2820at2011.34.0420am-587x373.png)
*ollama run deepseek-r1:70b --verbose*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-06-2820at2012.33.1520pm-586x371.png)
*total duration 1 minute 28 seconds*

![](/assets/images/ollamadeepsekr1applemacbookinstall/screenshot202025-06-2820at2012.32.5520pm-895x767.png)
*M1 Max processor 64 GB of unified memory*

**70B Model:**
Designed for advanced reasoning, multilingual understanding, and long-context processing
