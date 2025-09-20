---
title: "Machine Learning (Part 8)"
description: "A comprehensive guide covering machine learning (part 8)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/machinelearning8/hero.png"
tags: ["ai","ml","machine learning","git","github"]
---

# Machine Learning (Part 8)

## Baseball Signs

![](/assets/images/machinelearning8/tensorflow-logo.svg)
*Tensorflow logo does not meet the threshold of originality needed for copyright protection, and is therefore in the public domain*


## Stealing Baseball Signs

Can we predict when a baseball player is going to try to "steal"?

Mark Rober and [Jabril](https://www.youtube.com/channel/UCQALLeQPoZdZC4JNUboVEUg) created an application to predict when a Baseball player had been directed to "steal".


## How does the application work?

Jabril hosts a copy of his application on [his web site](https://jabrils.com/sp/) and the source code of the application is available on [GitHub](https://github.com/Jabrils/Uncle-Rober-Baseball-Predictor/blob/master/simple%20model%20website/index.html).

I reviewed the code to see how the application worked.


## Sequence

Mark and Jabril created a way to encode Baseball signals using letters. 

Each Baseball coach will use a unique set of signals to communicate with her players.

The coach in the example below signals to her players by touching her nose, touching her right ear, touching her right arm, touching her chin, touching her left ear, touching her left arm, touching her chest, touching her hat or touching her belt.

![](/assets/images/machinelearning8/screen-shot-2022-06-11-at-7.25.24-pm-1271x712.png)
*Baseball signal encoding*


## Encode

Internally the application works with sequences of letters. To make the application easier to operate a user can enter a description for each signal.

![](/assets/images/machinelearning8/screen-shot-2022-06-14-at-7.35.41-pm-1536x797.png)
*A description for each signal*


## Apply

When Apply is pressed the Encode() function is run.

![](/assets/images/machinelearning8/screen-shot-2022-06-14-at-7.37.52-pm-1536x826.png)
*The Apply button*


## Encode()

When the Encode() function executes the descriptions provided by the user are copied to the the web page's HTML.

![](/assets/images/machinelearning8/screen-shot-2022-06-14-at-7.42.56-pm-1536x796.png)
*When the Encode() function executes*


## CheckSeq()

The user watches the coach communicating with the players and records the signals. 

As a sequence is entered into the app the CheckSeq() function is used to make a live prediction.

![](/assets/images/machinelearning8/screen-shot-2022-06-14-at-8.57.22-pm-1536x825.png)
*The dict variable contains an entry for every possible two letter combination. A value of 1 is used to mark all combinations that are present in the *current* sequence.*


## Dataset

After the pitch is made the user watches to see if a player attempts to steal a base. 

If there is an attempt to steal a base the user clicks the "Steal" button.

If there is no attempt to steal a base the user clicks the "Not Steal" button.

Every time the Steal or No Steal button is pressed the app has new intelligence and the Label() function is called.

The Label() function adds the current sequence and label (steal 1 or no steal 0) to the page's HTML, adds the current sequence and label to a "dataset" variable and then calls the FindSteal() function.

![](/assets/images/machinelearning8/screen-shot-2022-06-11-at-7.22.42-pm-1272x715.png)
*The Label() function adds the current sequence and label (steal 1 or no steal 0) to the page's HTML*

![](/assets/images/machinelearning8/screen-shot-2022-06-14-at-8.16.13-pm-1536x784.png)
*The Label() function adds the current sequence and label to a "dataset" variable and then calls the FindSteal() function.*


## FindSteal()

The variable "top" in the FindSteal() function is used to score all possible two letter combinations as candidates (based on all of the labeled sequences in the dataset).

The web page is updated to show the most likely candidate.

![](/assets/images/machinelearning8/screen-shot-2022-06-15-at-8.45.57-am-1536x892.png)
*The variable "top"*

![](/assets/images/machinelearning8/screen-shot-2022-06-15-at-8.53.55-am-1126x330.png)
*updated prediction*


## Machine learning?

The application developed by Jabril and demonstrated by Mark is a nice [reinforcement learning](https://www.techtarget.com/searchenterpriseai/definition/reinforcement-learning) example (just as [Hexapawn](machineLearning1.html) is).
