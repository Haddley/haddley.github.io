---
title: "LangChain (RAG)"
description: "Using LangChain to create a medical report application"
date: "2023-07-21"
categories: ["AI","Python","Angular","Mobile","TypeScript"]
tags: ""
slug: "langchain"
image: "/assets/images/chatgpt-logo.svg"
---



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


## app0.py

```text
# pip install streamlit
# python -m streamlit run app0.py              

import streamlit

prompt = streamlit.text_input('Input your name')

if prompt:
    response = "Hello " + prompt
    streamlit.write(response)
```

## app1.py

```text
# pip install langchain openai streamlit
# python -m streamlit run app.py              

# import os
from langchain.llms import OpenAI
import streamlit

# os.environ['OPENAI_API_KEY']='<insert key here>'

llm = OpenAI(temperature=0.9)

prompt = streamlit.text_input('Input your prompt')

if prompt:
    response = llm(prompt)
    streamlit.write(response)
```

## 1

```text
from langchain.document_loaders import PyPDFLoader

loader = PyPDFLoader('hp4.pdf')
pages = loader.load_and_split()


print (pages[0].page_content)
```

## 2  3

```text
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Define chunk size, overlap and separators
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1024,
    chunk_overlap  = 40,
    length_function = len,
    separators=["\n \n", " ", ""]
)

# Split the pages into paragraphs (texts) as defined above
texts = text_splitter.split_documents(pages)

len(texts)

texts[1].page_content
```

## 4

```text
from langchain.llms import OpenAI

from langchain.embeddings import OpenAIEmbeddings

from langchain.vectorstores import Chroma

from langchain.agents.agent_toolkits import (
    create_vectorstore_agent,
    VectorStoreToolkit,
    VectorStoreInfo
)


llm = OpenAI(temperature=0.9,verbose=True)
embeddings=OpenAIEmbeddings()

save_directory = "Chroma"

store = Chroma.from_documents(texts, embeddings, collection_name='hp4', persist_directory=save_directory)
store.persist()

store.get()
```

## 5

```text
search = store.similarity_search_with_score('Does the patient smoke?')

search
```

## 6

```text
db = Chroma(persist_directory=save_directory,collection_name='hp4',embedding_function=embeddings)

print(db._collection.count())

db.get()
```

## 7

```text
vectorstore_info = VectorStoreInfo(
    name="hp4",
    description="vectore store generate from hp4.pdf",
    vectorstore=store
)

toolkit = VectorStoreToolkit(vectorstore_info=vectorstore_info)

agent_executor = create_vectorstore_agent(
    llm=llm,
    toolkit=toolkit,
    verbose=True
)

response = agent_executor.run("Does the patient smoke?")

response
```

## app2.py

```text
import streamlit as st

from langchain.llms import OpenAI

from langchain.embeddings import OpenAIEmbeddings

from langchain.vectorstores import Chroma

from langchain.agents.agent_toolkits import (
    create_vectorstore_agent,
    VectorStoreToolkit,
    VectorStoreInfo
)


llm = OpenAI(temperature=0.9,verbose=True)

embeddings=OpenAIEmbeddings()

save_directory = "Chroma"

# load embeddings from "Chroma" directory
db = Chroma(persist_directory=save_directory,collection_name='hp4',embedding_function=embeddings)

vectorstore_info = VectorStoreInfo(
    name="hp4",
    description="embeddings generated from the pdf document",
    vectorstore=db
)

toolkit = VectorStoreToolkit(vectorstore_info=vectorstore_info)

agent_executor = create_vectorstore_agent(
    llm=llm,
    toolkit=toolkit,
    verbose=True
)

prompt = st.text_input('Input your prompt')

if prompt:
    #response = llm(prompt)
    response = agent_executor.run(prompt)
    st.write(response)

    with st.expander('Document Similarity Search'):
        search = db.similarity_search_with_score(prompt)
        st.write(search)
```
## References

- [LangChain Quickstart](https://python.langchain.com/docs/get_started/quickstart)
- [I built a GPT Investment Banker using this 312 PAGE document](https://www.youtube.com/watch?v=u8vQyTzNGVY)