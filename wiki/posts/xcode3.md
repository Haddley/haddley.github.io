---
type: post
slug: xcode3
title: "XCode C++ (Part 3)"
date: "2023-03-08"
part: 3
builds_on: []
topics: [opengl-graphics, cpp-programming, shader-programming, xcode-development]
tools: [Xcode, C++, OpenGL, GLEW, GLSL]
status: current
checked: "2026-11-06"
source_hash: "33e29bdd30e4"
generated_by: gemma4:12b
---

**Summary.** I describe the process of building an OpenGL application using C++ and Xcode. I demonstrate how to initialize the environment, compile shaders, and render a triangle on an M1 MacBook Air.

## What I did
- I compiled an OpenGL Triangle app on an M1 MacBook Air.
- I used the GLEW library to manage OpenGL implementations.
- I initialized the viewport and compiled GLSL shaders.
- I executed the shaders on the GPU to draw a triangle.

## Claims
- I successfully compiled the application on M1 hardware.
  > "I compiled an OpenGL Triangle app on my M1 MacBook Air."
- I used GLEW to determine available OpenGL implementations at runtime.
  > "I used the OpenGL Extension Wrangler Library (GLEW), a cross-platform loading library that determines at runtime which OpenGL implementations are available."
- I initialized the viewport and the GLEW library.
  > "I initialized GLEW and defined a viewport."
- I executed vertex and fragment shaders on the GPU.
  > "I compiled vertex and fragment shaders (written in GLSL) and executed them on the GPU."

## Outcome
I built a functional OpenGL application that renders a triangle using C++ and GLSL shaders.

## Caveats
The post does not detail the specific internal logic of the OpenGL Extension Wrangler Library.
