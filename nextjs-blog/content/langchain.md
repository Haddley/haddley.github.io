---
title: "LangChain (RAG)"
description: "A comprehensive guide covering langchain (rag)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/chatgpt-logo.svg"
tags: ["python","ai","ml","machine learning"]
---

# LangChain (RAG)

## LangChain (RAG)

![](/assets/images/langchain/chatgpt-logo.svg)
*This image of simple geometry is ineligible for copyright and therefore in the public domain, because it consists entirely of information that is common property and contains no original authorship.*


## LangChain

LangChain is a framework built around Large Language Models. 

I used LangChain to create a medical report application.


## streamlit

Streamlit is an open-source Python library used to create web applications for data science and machine learning projects.

I used streamlit to create the application's user interface.

![](/assets/images/langchain/langchain-capture-0004-1473x711.png)
*hello world streamlit app*


## OpenAI's API

I updated my hello world application to call OpenAI's API.

I had to request a secret API key.

![](/assets/images/langchain/screen-shot-2023-07-20-at-10.13.26-am-1836x1013.png)
*secret key*

![](/assets/images/langchain/langchain-capture-0005-1476x710.png)
*Using LangChain to call OpenAI's API.*


## Document pages

I used LangChain to return the text found on each page of a sample medical report.

[https://www.med.unc.edu/medclerk/wp-content/uploads/sites/877/2018/10/hp4.pdf](https://www.med.unc.edu/medclerk/wp-content/uploads/sites/877/2018/10/hp4.pdf)

![](/assets/images/langchain/screen-shot-2023-07-22-at-6.54.13-am-1836x1001.png)
*hp4.pdf medical report*


## Jupyter Notebook

To improve performance and reduce costs I pre-processed the pdf file and stored the result.

I created a Jupyter Notebook to keep track of the steps I followed.

![](/assets/images/langchain/screen-shot-2023-07-21-at-5.13.17-pm-1142x740.png)
*Running jupyter-notebook locally*

![](/assets/images/langchain/screen-shot-2023-07-21-at-7.54.08-pm-1536x982.png)
*I loaded pages from the medical report.*

![](/assets/images/langchain/screen-shot-2023-07-21-at-7.57.22-pm-1536x997.png)
*I broke the pages into paragraphs (texts).*


## Chroma

I used Chroma to create an [embeddings](sentencesimilarity.html) vector store and saved the store locally.

![](/assets/images/langchain/screen-shot-2023-07-21-at-7.59.26-pm-1536x1033.png)
*I used OpenAI's API to generate the embeddings*

![](/assets/images/langchain/screen-shot-2023-07-21-at-8.03.05-pm-1536x842.png)
*I converted the query 'Does the patient smoke?' to an embedding and compared the result with the embeddings in the vector store.*

![](/assets/images/langchain/screen-shot-2023-07-21-at-8.05.23-pm-1536x784.png)
*I ensured that the embeddings vector store could be loaded from the local folder.*

![](/assets/images/langchain/screen-shot-2023-07-21-at-8.16.41-pm-1536x867.png)
*I located the most similar paragraphs and sent those (see Context Injection) and the query to OpenAI's servers.*

![](/assets/images/langchain/screen-shot-2023-07-21-at-8.19.11-pm-1536x982.png)
*The streamlit code*

![](/assets/images/langchain/screen-shot-2023-07-21-at-8.21.56-pm-1536x866.png)
*The finished application*
