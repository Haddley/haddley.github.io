---
title: "Sentence Similarity"
description: "Sentence Similarity"
date: "2023-07-19"
categories: ["AI","Angular","Business Central","TypeScript"]
tags: ""
slug: "sentencesimilarity"
image: "/assets/images/chatgpt-logo.svg"
---




**ChatGPT What is Sentence Similarity?**

Sentence similarity refers to the measure of how similar or related two sentences are in terms of their meaning or semantic content. It is a natural language processing (NLP) concept used to quantify the likeness between sentences based on their semantic, syntactic, or contextual aspects. Sentence similarity is essential in various NLP tasks, such as information retrieval, paraphrase detection, text summarization, question answering, and machine translation.

![](/assets/images/sentencesimilarity/screen-shot-2023-07-19-at-7.41.32-pm-1490x894.png)
*Similar*

![](/assets/images/sentencesimilarity/screen-shot-2023-07-19-at-7.42.03-pm-1482x894.png)
*Not similar*

![](/assets/images/sentencesimilarity/screen-shot-2023-07-19-at-7.42.29-pm-1488x894.png)
*Not similar*


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

- [$0 Embeddings (OpenAI vs. free &amp; open source)](https://www.youtube.com/watch?v=QdDoFfkVkcw)