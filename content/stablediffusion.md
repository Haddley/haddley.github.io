---
title: "Stable Diffusion"
description: "Stable Diffusion"
date: "2023-08-01"
categories: ["AI"]
tags: ""
slug: "stablediffusion"
image: "/assets/images/jupyter.svg"
---



Stable Diffusion is a deep learning, text-to-image model released in 2022 based on diffusion techniques. It is primarily used to generate detailed images conditioned on text descriptions.

https://huggingface.co/CompVis/stable-diffusion

https://github.com/huggingface/diffusers


## "stableenv" environment

I created an isolated Anaconda environment "stableenv" for my [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) development.

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.19.43-pm-1176x166.png)
*I created the stableenv environment (adding jupyterlab, ipykernel and ipywidgets)conda create --name stableenv jupyterlab ipykernel ipywidgets*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.22.20-pm-1172x96.png)
*I activated the stableenv environmentconda activate stableenv*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.22.29-pm-1164x360.png)
*I added jupyter labs support to the environmentipython kernel install --user --name=stableenv*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.23.05-pm-1172x738.png)
*I started the jupyter lab servicejupyter lab*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.25.53-pm-1320x780.png)
*I switched to the stableenv environment (kernel)*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.26.15-pm-991x307.png)
*I installed the stable diffusion pipeline dependencies (I could have used pip)!conda install -c conda-forge -y accelerate diffusers transformers*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.27.42-pm-1321x562.png)
*I created a pipe instance using the DiffusionPipeline.from_pretrained(id) method call.*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.30.16-pm-1317x829.png)
*The DiffusionPipeline.from_pretrained(id) method call returned a warning*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.31.07-pm-912x708.png)
*I generated an image using the pipeline*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.35.07-pm-890x669.png)
*In this configuration Stable Diffusion did not take advantage of the laptop's GPU.*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.35.39-pm-888x669.png)
*In this configuration Stable Diffusion took 4 minutes and 19 seconds to generate an image.*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.36.12-pm-872x665.png)
*I updated the pipeline instance to use the laptop's GPU*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.37.27-pm-889x666.png)
*In this configuration Stable Diffusion used the laptop's GPU.*

![](/assets/images/stablediffusion/screenshot-2023-08-01-at-6.37.50-pm-852x662.png)
*In this configuration Stable Diffusion took 1 minute and 7 seconds to generate an image.*