---
title: "WebVR"
description: "Create Virtual Reality Experiences."
date: "2021-03-02"
categories: []
tags: []
slug: "webvr"
image: "/assets/images/webvr-logo-square-512x512.png"
---

## Create Virtual Reality Experiences.

![](/assets/images/webvr/webvr-logo-square-512x512.png)


## Moon Rider

[WebVR](https://webvr.info) has been replaced by the [WebXR](https://github.com/immersive-web) Device API, that supports both Virtual Reality (VR) and Augmented Reality (AR).

So why write a post about WebVR?

[Moon Rider](https://moonrider.xyz). That's why.

Moon Rider is a free VR rhythm game built on WebVR that runs in a web browser.

Moon Rider is an impressive example of what can be done with WebVR.

[https://moonrider.xyz](https://moonrider.xyz)

The Moon Rider code is available for download from GitHub

[https://github.com/supermedium/moonrider](https://github.com/supermedium/moonrider)

![](/assets/images/webvr/image0-4-1334x750.png)
*Moon Rider in Oculus Quest 2 Browser*


## A static WebVR scene

WebVR developers use **entities** to create **scenes**. Entities are created using **assets**.

A static scene can be created using a few web page tags.


## A scene

```javascript
<body>

    <a-scene>

        <a-assets>
            <a-asset-item id="engine" src="./assets/files/engine.glb">
            </a-asset-item>
        </a-assets>

        <a-entity position="0 0 -3">
            <a-gltf-model src="#engine" rotation="90 0 0" scale="18 18 18"></a-gltf-model>
        </a-entity>

        <a-entity light="type: point; intensity: 60; distance: 50; decay: 2" position="0 0 10"></a-entity>

    </a-scene>

</body>

</html>
```