---
title: "XCode C++ (Part 3)"
description: "A comprehensive guide covering xcode c++ (part 3)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/xcode3/hero.png"
tags: ["ai"]
---

# XCode C++ (Part 3)

## OpenGL GLEW

![](/assets/images/xcode3/xcode-14-icon-300x314.png)
*This is the logo owned by Apple Inc. for Xcode. Taken from the picture's app bundle. Fair use*


## Building an OpenGL application using C++ and XCode

I compiled an OpenGL Triangle app on my M1 MacBook Air.

The OpenGL Extension Wrangler Library (GLEW) is a cross-platform loading library. 

GLEW provides a way to determine (at runtime) which OpenGL implementations are available.

The "4.1 Metal - 76.3" OpenGL implementation is available on my M1 MacBook Air.

![](/assets/images/xcode3/screen-shot-2023-03-08-at-1.53.36-pm-1536x1206.png)
*Running application*


## Overview

The GLFW library is used to create an application window with a given width and height and the title "LearnOpenGL".

The GLEW library state is initialized.

A GLEW library call is used to define a viewport.

In this example vertex shader and fragment shader code (written in the C-like language GLSL) is copied, compiled and executed on the computer's graphics processing unit (GPU). 

In a loop the shaders are used to draw and redraw a triangle defined by a set of positions/vertices. Each position includes an x value between -1 (far left) and 1 (far right), a y value between -1 (bottom) and 1 (top) and a z value (always 0 in this example).

![](/assets/images/xcode3/screen-shot-2023-03-08-at-1.35.42-pm-1134x730.png)
*brew install glew*

![](/assets/images/xcode3/screen-shot-2023-03-08-at-1.39.47-pm-1536x456.png)
*Add include folder to header search*

![](/assets/images/xcode3/screen-shot-2023-03-08-at-1.42.29-pm-1536x459.png)
*Add library*

![](/assets/images/xcode3/screen-shot-2023-03-08-at-1.42.40-pm-1536x595.png)
*updated library references*

![](/assets/images/xcode3/screen-shot-2023-03-08-at-2.03.06-pm-1536x850.png)
*build and run application*
