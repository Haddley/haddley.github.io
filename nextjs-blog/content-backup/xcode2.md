---
title: "XCode C++ (Part 2)"
description: "A comprehensive guide covering xcode c++ (part 2)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/xcode2.png"
tags: ["ai"]
---

# XCode C++ (Part 2)

XCode C++ (Part 2) OpenGL GLFW This is the logo owned by Apple Inc. for Xcode. Taken from the picture's app bundle. Fair use Building an OpenGL application using C++ and XCode I compiled a minimal OpenGL on my M1 MacBook Air. I used GLFW (a cross platform library for OpenGL). Overview Here GLFW is used to create an application window with a given width and height and the title "Hello World". In a loop the SwapBuffers function is called until the window is closed. main.cpp New Command Line Tool project Named Hello OpenGL General Settings Default hello world code GLFW web site Hello OpenGL example Missing library/header files brew install glfw installed to folder /opt/homebrew/Cellar/glfw/3.3.8 Add reference to /opt/homebrew/Cellar/glfw/3.3.8/ header files /opt/homebrew/Cellar/glfw/3.3.8/include /opt/homebrew/Cellar/glfw/3.3.8/include reference added Add reference to libraries OpenGL.framework Add items Add files add a reference to dynamically loaded library /opt/homebrew/Cellar/glfw/3.3.8/lib/libglfw.3.3.dylib Library references updated Hello OpenGL application running References OpenGL GLFW Hello World: M1 Macbook Pro + Xcode OpenGL GLFW Windows Visual Studio
