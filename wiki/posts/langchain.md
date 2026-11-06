---
type: post
slug: langchain
title: "LangChain (RAG)"
date: "2023-07-21"
builds_on: [sentencesimilarity]
topics: [retrieval-augmented-generation, vector-embeddings, medical-data-processing, llm-frameworks]
tools: [LangChain, Streamlit, OpenAI, Chroma, Jupyter Notebook]
status: current
checked: "2026-11-05"
source_hash: "c4064d00783a"
generated_by: gemma4:12b
---

**Summary.** I built a medical report application using the LangChain framework and OpenAI's API. I implemented a retrieval-augmented generation system to process medical documents and answer specific questions about patient data.

## What I did
- I built a web interface using Streamlit.
- I pre-processed a medical report and stored the results to reduce costs.
- I created a vector store using Chroma and OpenAI embeddings.
- I performed context injection to find the most similar paragraphs for the query.

## Claims
- I used LangChain to create a medical report application.
  > "I used LangChain to create a medical report application."
- I used Chroma to create a vector store and saved it locally.
  > "I used Chroma to create an embeddings vector store and saved the store locally."
- I pre-processed the file to improve performance and reduce costs.
  > "To improve performance and reduce costs I pre-processed the pdf file and stored the result."
- I converted the query into an embedding to compare it with the vector store.
  > "*I converted the query 'Does the patient smoke?' to an embedding and compared the result with the embeddings in the vector store.*"
- I used Streamlit to create the user interface.
  > "I used streamlit to create the application's user interface."

## Outcome
I built a medical report application that can retrieve specific information from a medical PDF.

## Caveats
The post does not detail the specific logic used for the paragraph splitting process.
