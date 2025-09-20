---
title: "Three.js"
description: "A comprehensive guide covering three.js"
date: "2025-09-20"
category: "Development"
image: "/assets/images/threejs/hero.png"
tags: ["javascript","java","ai"]
---

# Three.js

## A JavaScript-based WebGL engine

![](/assets/images/threejs/three.js-icon.svg)
*This file is licensed under the Creative Commons Attribution-Share Alike 4.0 International license.*


## Three.js

Three. js is a JavaScript-based WebGL engine that can run GPU-powered games and other graphics-powered apps straight from the browser.


## Overview

In the code below I create a three.js scene. The scene contains

![](/assets/images/threejs/screen-shot-2023-03-05-at-7.42.09-pm-1536x414.png)
*import library modules and sets up scene*

![](/assets/images/threejs/screen-shot-2023-03-05-at-7.42.29-pm-1536x126.png)
*sets up camera*

![](/assets/images/threejs/screen-shot-2023-03-05-at-7.42.49-pm-1536x611.png)
*sets up floating cubes and spheres*

![](/assets/images/threejs/screen-shot-2023-03-05-at-7.43.18-pm-1536x422.png)
*sets up renderer*

![](/assets/images/threejs/screen-shot-2023-03-05-at-7.43.30-pm-1536x597.png)
*sets up animation*


## index-three-analyph

```text
// imports

        import * as THREE from 'three';
        import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';

        // scene background (skybox)

        const path = 'https://threejs.org/examples/textures/cube/Park2/';
        const format = '.jpg';
        const urls = [
            path + 'posx' + format, path + 'negx' + format,
            path + 'posy' + format, path + 'negy' + format,
            path + 'posz' + format, path + 'negz' + format
        ];

        const textureCube = new THREE.CubeTextureLoader().load(urls);

        // scene

        const scene = new THREE.Scene();
        scene.background = textureCube;

        // camera

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);
        camera.position.z = 3;
        camera.focalLength = 3;

        // floating things

        const floaters = [];

        const geometryBox = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const geometrySphere = new THREE.SphereGeometry(0.1, 32, 16);
        const materialFloaters = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube });

        for (let i = 0; i < 250; i++) {

            const cube = new THREE.Mesh(geometryBox, materialFloaters);

            cube.position.x = Math.random() * 10 - 5;
            cube.position.y = Math.random() * 10 - 5;
            cube.position.z = Math.random() * 10 - 5;

            cube.scale.x = cube.scale.y = cube.scale.z = Math.random() * 3 + 1;

            scene.add(cube);

            floaters.push(cube);

        }

        for (let i = 0; i < 250; i++) {

            const sphere = new THREE.Mesh(geometrySphere, materialFloaters);

            sphere.position.x = Math.random() * 10 - 5;
            sphere.position.y = Math.random() * 10 - 5;
            sphere.position.z = Math.random() * 10 - 5;

            sphere.scale.x = sphere.scale.y = sphere.scale.z = Math.random() * 3 + 1;

            scene.add(sphere);

            floaters.push(sphere);

        }

        // renderer

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;

        const effect = new AnaglyphEffect(renderer);
        effect.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize);

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            effect.setSize(window.innerWidth, window.innerHeight);

        }

        function animate() {

            requestAnimationFrame(animate);

            render();

        }

        // render scene

        function render() {

            const timer = 0.0001 * Date.now();

            camera.lookAt(scene.position);

            for (let i = 0, il = floaters.length; i < il; i++) {

                const floater = floaters[i];

                floater.position.x = 5 * Math.cos(timer + i);
                floater.position.y = 5 * Math.sin(timer + i * 1.1);

            }

            effect.render(scene, camera);

        }

        animate()
```

