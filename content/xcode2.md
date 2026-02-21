---
title: "XCode C++ (Part 2)"
description: "OpenGL GLFW"
date: "2023-03-08"
categories: ["macOS"]
tags: ""
slug: "xcode2"
image: "/assets/images/xcode2/xcode-14-icon-300x314.png"
---


## Building an OpenGL application using C++ and XCode

I compiled a minimal OpenGL on my M1 MacBook Air.

I used GLFW (a cross platform library for OpenGL).


## Overview

Here GLFW is used to create an application window with a given width and height and the title "Hello World".

In a loop the SwapBuffers function is called until the window is closed.

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.01.51-pm-1478x1044.png)
*New Command Line Tool project*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.02.10-pm-1466x1040.png)
*Named Hello OpenGL*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.02.41-pm-1536x541.png)
*General Settings*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.02.53-pm-1536x639.png)
*Default hello world code*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.03.16-pm-1536x542.png)
*GLFW web site*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.03.31-pm-1536x795.png)
*Hello OpenGL example*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.04.04-pm-1536x895.png)
*Missing library/header files*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.04.44-pm-1144x180.png)
*brew install glfw*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.10.58-pm-1140x746.png)
*installed to folder /opt/homebrew/Cellar/glfw/3.3.8*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.11.40-pm-1536x533.png)
*Add reference to /opt/homebrew/Cellar/glfw/3.3.8/ header files*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.12.06-pm-1536x619.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.12.19-pm-1536x528.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include reference added*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.12.32-pm-1536x606.png)
*Add reference to libraries*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.12.53-pm-1536x774.png)
*OpenGL.framework*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.13.04-pm-1536x541.png)
*Add items*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.13.14-pm-1536x783.png)
*Add files*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.15.50-pm-1536x767.png)
*add a reference to dynamically loaded library /opt/homebrew/Cellar/glfw/3.3.8/lib/libglfw.3.3.dylib*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.15.59-pm-1536x562.png)
*Library references updated*

![](/assets/images/xcode2/screen-shot-2023-03-08-at-12.16.22-pm-1536x892.png)
*Hello OpenGL application running*


## main.cpp

```text
#include <GLFW/glfw3.h>

int main(void)
{
    GLFWwindow* window;

    /* Initialize the library */
    if (!glfwInit())
        return -1;

    /* Create a windowed mode window and its OpenGL context */
    window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);
    if (!window)
    {
        glfwTerminate();
        return -1;
    }

    /* Make the window's context current */
    glfwMakeContextCurrent(window);

    /* Loop until the user closes the window */
    while (!glfwWindowShouldClose(window))
    {
        /* Render here */
        glClear(GL_COLOR_BUFFER_BIT);

        /* Swap front and back buffers */
        glfwSwapBuffers(window);

        /* Poll for and process events */
        glfwPollEvents();
    }

    glfwTerminate();
    return 0;
}
```
## References

- [OpenGL GLFW Hello World: M1 Macbook Pro + Xcode](https://www.youtube.com/watch?v=MHlbNbWlrIM)
- [OpenGL GLFW Windows Visual Studio](https://www.youtube.com/watch?v=OR4fNpBjmq8)