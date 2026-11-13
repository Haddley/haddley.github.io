---
type: post
slug: xcode2
title: "XCode C++ (Part 2)"
date: "2023-03-08"
part: 2
builds_on: []
topics: [opengl-graphics, glfw-library, macos-development, cpp-programming]
tools: [Xcode, OpenGL, GLFW, macOS]
status: current
checked: "2026-11-06"
source_hash: "f09a28418425"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to set up a basic OpenGL environment using the GLFW library. I specifically detail the configuration steps required to resolve missing headers and libraries on an M1 MacBook.

## What I did
- I compiled a minimal OpenGL project on an M1 MacBook Air.
- I integrated the GLFW cross-platform library.
- I configured the project to locate the correct header files.
- I linked the dynamically loaded library for the project.
- I implemented a loop that calls SwapBuffers until the window closes.

## Claims
- I used the GLFW library to provide cross-platform OpenGL functionality.
  > "I used GLFW (a cross platform library for OpenGL)."
- I encountered missing library and header files during the initial setup.
  > "*I saw missing library/header files*"
- I linked the specific dynamic library file to the project.
  > "*I added a reference to the dynamically loaded library /opt/homebrew/Cellar/glfw/3.3.8/lib/libglfw.3.3.dylib*"
- I used a loop to call the SwapBuffers function until the window closes.
  > "In a loop, the SwapBuffers function is called until the window is closed."

## Outcome
I successfully built a minimal OpenGL application on an M1 MacBook Air. I established a working workflow for linking external libraries in an Xcode project.

## Caveats
The post does not provide specific instructions for compiling the project on Windows systems.
