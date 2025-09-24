---
title: "WebXR"
description: "A comprehensive guide covering webxr"
date: "2025-09-20"
category: "Development"
image: "/assets/images/webxr/hero.png"
tags: ["ml","git","github"]
---

## Create Augmented Reality Experiences.

![spec-logo by Brandon Jones is licensed under W3C Software and Document License](/assets/images/webxr/34385910-400x400.png)
*spec-logo by Brandon Jones is licensed under W3C Software and Document License*


## Augmented Reality

[WebXR](https://github.com/immersive-web) supports both Virtual Reality (VR) and Augmented Reality (AR).

WebXR has replaced the [WebVR](WebVR.html) standard.


## Scene with markers

This scene includes two Augmented Reality markers.

A sphere is added to the camera output when the Hiro marker is recognised.

A dinosaur is added to the camera output when the '6' barcode marker is recognised.

For convenience the barcode marker can be added to a web page QR Code.

![](/assets/images/webxr/278535875-3143515849195152-3177239650686303329-n-750x1334.jpg)
*QR Code*

![](/assets/images/webxr/278604232-1195762084291932-2000984922213087796-n-750x1334.jpg)
*Barcode marker*

![](/assets/images/webxr/hiro-marker-arjs-472x475.png)
*Augmented Reality Marker*

![](/assets/images/webxr/marker6-226x226.png)
*Barcode Marker*

![](/assets/images/webxr/qr-code-3-1148x1148.png)
*Barcode Marker embedded in a QR Code*


## Scene

```html
<!DOCTYPE html>
<html>
<script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
<script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>

<body style="margin : 0px; overflow: hidden;">
    <a-scene embedded arjs="detectionMode: mono_and_matrix; matrixCodeType: 3x3;">

        <a-marker preset="hiro">
            <a-sphere position='0 0.5 0' material="opacity: 0.5" radius="1"></a-sphere>
        </a-marker>

        <a-marker type="barcode" value="6">
            <a-entity position="0 0 0" scale="0.05 0.05 0.05"
                gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf">
            </a-entity>
        </a-marker>
        <a-entity camera></a-entity>
    </a-scene>
</body>

</html>
```

