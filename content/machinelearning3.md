---
title: "Machine Learning (Part 3)"
description: "Creating models"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/machinelearning3/hero.png"
tags: ["ai","ml","machine learning"]
---

## Creating models

![](/assets/images/machinelearning3/tensorflow-logo.svg)
*Tensorflow logo does not meet the threshold of originality needed for copyright protection, and is therefore in the public domain*


## Teachable Machine

[Teachable Machine](https://teachablemachine.withgoogle.com) is a web-based tool that makes creating ([supervised](machineLearning1.html)) machine learning ([classification](https://www.edureka.co/blog/classification-in-machine-learning/)) models fast, easy, and accessible to everyone. No prerequisite machine learning knowledge required.

I used Teachable Machines to create a [squishmallows](https://squishmallows.com/) recognizing application based on TensorFlow.js

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-7.11.56-pm-1836x977.png)
*New Image Project*

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-7.12.23-pm-1836x974.png)
*Add a third (classification) class*

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-7.16.41-pm-1836x975.png)
*rename the three classes (one class for each squishmallow)*

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-7.19.51-pm-1836x968.png)
*Use the Webcam button to create a set of images (for each squishmallow)*

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-7.21.15-pm-1836x971.png)
*Click the train model button*

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-7.22.34-pm-1836x974.png)
*Model training complete*

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-7.23.45-pm-1836x980.png)
*Use the preview window to test the model*

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-7.24.51-pm-1836x975.png)
*Download the model and sample web page*

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-7.59.46-pm-1836x881.png)
*Copy the sample web page to Visual Studio Code to test*

![](/assets/images/machinelearning3/screen-shot-2022-06-05-at-8.25.43-pm-1538x810.png)
*The application is 100% certain that the webcam is pointing at the Apple squishmallow.*


## squish.html

```text
<div>Teachable Machine Image Model</div>
<button type="button" onclick="init()">Start</button>
<div id="webcam-container"></div>
<div id="label-container"></div>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
<script type="text/javascript">
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    // const URL = "./my_model/";
    const URL = "";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {

        debugger

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
</script>
```

