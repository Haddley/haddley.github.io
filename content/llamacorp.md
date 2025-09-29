---
title: "LlamaCpp"
description: "Accessing the llama.cpp model from Python"
date: "2023-08-03"
categories: ["AI","Python"]
tags: []
slug: "llamacorp"
image: "/assets/images/jupyter.svg"
---



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


## requirements.txt

```text
streamlit
langchain
openai
tiktoken
streamlit
llama-cpp-python
pypdf
torch
InstructorEmbedding
sentence_transformers
chromadb
```

## app1a.py

```text
# from langchain.llms import OpenAI
from langchain.llms import  LlamaCpp
import streamlit

# llm = OpenAI(temperature=0.9)
llm = LlamaCpp(
    model_path="llama-2-7b-chat.ggmlv3.q4_0.bin",
    verbose=True,
)

prompt = streamlit.text_input('Input your prompt')

if prompt:
    response = llm(prompt)
    streamlit.write(response)
```

## hp4.ipynb

```text
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma

loader = PyPDFLoader('hp4.pdf')
pages = loader.load_and_split()

# Define chunk size, overlap and separators

text_splitter = RecursiveCharacterTextSplitter(
    # Set a really small chunk size, just to show.
    chunk_size = 1024,
    chunk_overlap  = 40,
    length_function = len,
    separators=["\n \n", " ", ""]
)

# split the pages into paragraphs as defined above

paragraphs = text_splitter.split_documents(pages)

---

# save OpenAIEmbeddings to "Chroma" directory

from langchain.embeddings import OpenAIEmbeddings

embeddings=OpenAIEmbeddings()

save_directory = "Chroma"

store = Chroma.from_documents(paragraphs, embeddings, collection_name='hp4', persist_directory=save_directory)
store.persist()

# search for similar paragraphs
search = store.similarity_search_with_score('Does the patient smoke?')

print(search)

---

# save HuggingFaceInstructEmbeddings to "Chroma2" directory

from langchain.embeddings import HuggingFaceInstructEmbeddings

embeddings2 = HuggingFaceInstructEmbeddings()

save_directory2 = "Chroma2"

store2 = Chroma.from_documents(paragraphs, embeddings2, collection_name='hp4', persist_directory=save_directory2)
store2.persist()

# search for similar paragraphs
search2 = store2.similarity_search_with_score('Does the patient smoke?')

print(search2)
```

## app2a.py

```text
import streamlit as st

# from langchain.llms import OpenAI
from langchain.llms import  LlamaCpp

#from langchain.embeddings import OpenAIEmbeddings
from langchain.embeddings import HuggingFaceInstructEmbeddings


from langchain.vectorstores import Chroma

from langchain.agents.agent_toolkits import (
    create_vectorstore_agent,
    VectorStoreToolkit,
    VectorStoreInfo
)

from langchain.vectorstores import Chroma

from langchain.agents.agent_toolkits import (
    create_vectorstore_agent,
    VectorStoreToolkit,
    VectorStoreInfo
)

#embeddings=OpenAIEmbeddings()
embeddings = HuggingFaceInstructEmbeddings()

# llm = OpenAI(temperature=0.9,verbose=True)

# https://python.langchain.com/docs/integrations/llms/llamacpp
# https://github.com/langchain-ai/langchain/issues/8004
# https://github.com/abetlen/llama-cpp-python/blob/main/docs/install/macos.md

llm = LlamaCpp(
    model_path="llama-2-7b-chat.ggmlv3.q4_0.bin",
    verbose=True,
    temperature=1,
    max_tokens=2048,  # 256
    n_gpu_layers=1,
    n_batch=512,
    f16_kv=True,  # MUST set to True, otherwise you will run into problem after a couple of calls
    n_ctx=10240 # Context Length
)

load_directory = "Chroma2"

# load embeddings from "Chroma" directory
db = Chroma(persist_directory=load_directory,collection_name='hp4',embedding_function=embeddings)

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
    response = agent_executor.run(prompt)
    st.write(response)

    with st.expander('Document Similarity Search'):
        search = db.similarity_search_with_score(prompt)
        st.write(search)
```

## app3a.py

```text
#!pip install streamlit
#!pip install llama-cpp-python
#!pip install watchdog

from dotenv import load_dotenv, find_dotenv
from langchain.callbacks import get_openai_callback
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage, AIMessage
from langchain.llms import LlamaCpp
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
import streamlit as st

from typing import Union
from typing import List


def init_page() -> None:
    st.set_page_config(page_title="Pirate Jack")
    st.header("Pirate Jack")
    st.sidebar.title("Options")


def init_messages() -> None:
    clear_button = st.sidebar.button("Clear Conversation", key="clear")
    if clear_button or "messages" not in st.session_state:
        st.session_state.messages = [
            SystemMessage(
                # content="You are a helpful AI assistant. Reply your answer in mardkown format.")
                content="You are now Pirate Jack. Always talk like a pirate. Let's think step by step."
            )
        ]
        st.session_state.costs = []


def select_llm() -> Union[ChatOpenAI, LlamaCpp]:
    model_name = st.sidebar.radio(
        "Choose LLM:",
        (
            "llama-2-7b-chat.ggmlv3.q2_K",
            "codeup-llama-2-13b-chat-hf.ggmlv3.q2_K",
            "stablebeluga-13b.ggmlv3.q4_K_S",
            "gpt-3.5-turbo-0613",
            "gpt-4",
        ),
    )

    temperature = st.sidebar.slider(
        "Temperature:", min_value=0.0, max_value=1.0, value=0.0, step=0.01
    )
    if model_name.startswith("gpt-"):
        return ChatOpenAI(temperature=temperature, model_name=model_name)
    elif (
        model_name.startswith("llama-2-")
        or model_name.startswith("codeup-llama-2-")
        or model_name.startswith("stablebeluga-")
    ):
        callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])

        if model_name.startswith("llama-2-"):
            return LlamaCpp(
                model_path=f"./{model_name}.bin",
                callback_manager=callback_manager,
                verbose=True,  # False,  # True
                temperature=temperature,
                max_tokens=2048,  # 256
                n_ctx=1024,  # Context Length
                n_gpu_layers = 1,  # Metal set to 1 is enough.
                n_batch = 4,  # Should be between 1 and n_ctx, consider the amount of RAM of your Apple Silicon Chip.
                f16_kv=True,  # MUST set to True, otherwise you will run into problem after a couple of calls
            )
        else:
            return LlamaCpp(
                model_path=f"./{model_name}.bin",
                callback_manager=callback_manager,
                verbose=True,  # False,  # True
                temperature=temperature,
                max_tokens=2048,  # 256
            )



def get_answer(llm, messages) -> tuple[str, float]:
    if isinstance(llm, ChatOpenAI):
        with get_openai_callback() as cb:
            answer = llm(messages)
        return answer.content, cb.total_cost
    if isinstance(llm, LlamaCpp):
        answer = llm(llama_v2_prompt(convert_langchainschema_to_dict(messages)))
        return (answer, 0.0)


def find_role(message: Union[SystemMessage, HumanMessage, AIMessage]) -> str:
    """
    Identify role name from langchain.schema object.
    """
    if isinstance(message, SystemMessage):
        return "system"
    if isinstance(message, HumanMessage):
        return "user"
    if isinstance(message, AIMessage):
        return "assistant"
    raise TypeError("Unknown message type.")


def convert_langchainschema_to_dict(
    messages: List[Union[SystemMessage, HumanMessage, AIMessage]]
) -> List[dict]:
    """
    Convert the chain of chat messages in list of langchain.schema format to
    list of dictionary format.
    """
    return [
        {"role": find_role(message), "content": message.content} for message in messages
    ]


def llama_v2_prompt(messages: List[dict]) -> str:
    """
    Convert the messages in list of dictionary format to Llama2 compliant format.
    """
    B_INST, E_INST = "[INST]", "[/INST]"
    B_SYS, E_SYS = "<<SYS>>\n", "\n<</SYS>>\n\n"
    BOS, EOS = "<s>", "</s>"
    DEFAULT_SYSTEM_PROMPT = f"""You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information."""

    if messages[0]["role"] != "system":
        messages = [
            {
                "role": "system",
                "content": DEFAULT_SYSTEM_PROMPT,
            }
        ] + messages
    messages = [
        {
            "role": messages[1]["role"],
            "content": B_SYS + messages[0]["content"] + E_SYS + messages[1]["content"],
        }
    ] + messages[2:]

    messages_list = [
        f"{BOS}{B_INST} {(prompt['content']).strip()} {E_INST} {(answer['content']).strip()} {EOS}"
        for prompt, answer in zip(messages[::2], messages[1::2])
    ]
    messages_list.append(
        f"{BOS}{B_INST} {(messages[-1]['content']).strip()} {E_INST} {EOS}"
    )

    result = "".join(messages_list)
    print(result)

    return result


def main() -> None:
    _ = load_dotenv(find_dotenv())

    init_page()
    llm = select_llm()
    init_messages()

    # Supervise user input
    if user_input := st.chat_input("Input your question!"):
        st.session_state.messages.append(HumanMessage(content=user_input))
        with st.spinner("Pirate Jack be thinking ..."):
            result = get_answer(llm, st.session_state.messages)
            if result == None:
                st.session_state.messages.append(
                    AIMessage(content="Sorry, I don't know the answer.")
                )
            else:
                answer, cost = result
                st.session_state.messages.append(AIMessage(content=answer))
                st.session_state.costs.append(cost)

    # Display chat history
    messages = st.session_state.get("messages", [])
    for message in messages:
        if isinstance(message, AIMessage):
            with st.chat_message("assistant"):
                st.markdown(message.content)
        elif isinstance(message, HumanMessage):
            with st.chat_message("user"):
                st.markdown(message.content)

    costs = st.session_state.get("costs", [])
    st.sidebar.markdown("## Costs")
    st.sidebar.markdown(f"**Total cost: ${sum(costs):.5f}**")
    for cost in costs:
        st.sidebar.markdown(f"- ${cost:.5f}")


# streamlit run app.py
if __name__ == "__main__":
    main()
```