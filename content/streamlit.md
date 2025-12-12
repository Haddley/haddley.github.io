---
title: "Streamlit"
description: "Streamlit"
date: "2025-09-20"
categories: ["AI","Angular","IOT","Mobile","Python","TypeScript"]
image: "/assets/images/streamlit/hero.png"
tags: ["python","ai","ml","machine learning"]
hidden: "true"
slug: "streamlit"
---



**ChatGPT: What is Streamlit?**

Streamlit is an open-source Python library that allows developers to create web applications for data science and machine learning projects with minimal effort. It was designed to simplify the process of turning data scripts into interactive web applications without the need for extensive web development knowledge.

With Streamlit, you can create interactive web applications directly from Python scripts using familiar Python programming paradigms. The library is particularly popular in the data science and machine learning communities due to its ease of use and fast prototyping capabilities.

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/streamlit/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*


## sentence_similarity.html

```text
<!DOCTYPE html>
<html>

<head>
    <title>Sentence Similarity Demo</title>
</head>

<body>
    <h1>Sentence Similarity Demo</h1>
    <textarea id="input-text-1" rows="4" cols="50" placeholder="Enter text to compare"></textarea>
    <textarea id="input-text-2" rows="4" cols="50" placeholder="Enter text to compare"></textarea>

    <button id="compare">Compare</button>
    <p id="score"></p>

    <script type="module">
        import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.4.1';

        const generateEmbeddings = await pipeline(
            'feature-extraction', 'xenova/all-MiniLM-L6-v2'
        )

        async function dotProduct(vec1, vec2) {
            let result = 0;
            for (let i = 0; i < vec1.length; i++) {
                result += vec1[i] * vec2[i];
            }
            return result;
        }

        async function compare() {

            const inputText1 = document.getElementById('input-text-1').value.trim();
            const inputText2 = document.getElementById('input-text-2').value.trim();

            if (inputText1 === '' || inputText2 === '') {
                alert('Please enter text to compare.');
                return;
            }

            const options = { pooling: 'mean', normalize: true };
            const output1 = await generateEmbeddings(inputText1, options);
            const output2 = await generateEmbeddings(inputText2, options);

            const embeddings1 = output1.data;
            console.log("embeddings1", embeddings1);

            const embeddings2 = output2.data;
            console.log("embeddings2", embeddings2);

            const similarity = await dotProduct(output1.data, output2.data);

            document.getElementById('score').textContent = `Score: ${similarity}`;

        }

        document.getElementById("compare").onclick = compare;

    </script>

</body>

</html>
```
## References

- [Sentence Similarity](https://huggingface.co/tasks/sentence-similarity)
- [$0 Embeddings (OpenAI vs. free &amp; open source)](https://www.youtube.com/watch?v=QdDoFfkVkcw)

