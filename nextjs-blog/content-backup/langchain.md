---
title: "LangChain (RAG)"
description: "A comprehensive guide covering langchain (rag)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/langchain.png"
tags: ["python","ai","ml","machine learning"]
---

# LangChain (RAG)

Natural Language Processing (Part 4) LangChain (RAG) This image of simple geometry is ineligible for copyright and therefore in the public domain, because it consists entirely of information that is common property and contains no original authorship. LangChain LangChain is a framework built around Large Language Models. I used LangChain to create a medical report application. streamlit Streamlit is an open-source Python library used to create web applications for data science and machine learning projects. I used streamlit to create the application's user interface. app0.py hello world streamlit app OpenAI's API I updated my hello world application to call OpenAI's API. I had to request a secret API key. secret key app1.py Using LangChain to call OpenAI's API. Document pages I used LangChain to return the text found on each page of a sample medical report. https://www.med.unc.edu/medclerk/wp-content/uploads/sites/877/2018/10/hp4.pdf hp4.pdf medical report Jupyter Notebook To improve performance and reduce costs I pre-processed the pdf file and stored the result. I created a Jupyter Notebook to keep track of the steps I followed. Running jupyter-notebook locally I loaded pages from the medical report. [1] I broke the pages into paragraphs (texts). [2] & [3] Chroma I used Chroma to create an embeddings vector store and saved the store locally. I used OpenAI's API to generate the embeddings [4] I converted the query 'Does the patient smoke?' to an embedding and compared the result with the embeddings in the vector store. [5] I ensured that the embeddings vector store could be loaded from the local folder. [6] I located the most similar paragraphs and sent those (see Context Injection ) and the query to OpenAI's servers. [7] The streamlit code app2.py The finished application References LangChain Quickstart I built a GPT Investment Banker using this 312 PAGE document
