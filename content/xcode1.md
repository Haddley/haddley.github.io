---
title: "XCode C++ (Part 1)"
description: "Hello, World!"
date: "2023-03-08"
categories: ["macOS"]
tags: "xcode, c-plus-plus, macos, hello-world"
slug: "xcode1"
image: "/assets/images/xcode1/xcode-14-icon-300x314.png"
---



How I built hello world on my M1 MacBook Air

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.40.19-am-1536x891.png)
*I created a new Command Line Tool project*

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.40.45-am-1456x1034.png)
*I set the Product Name to helloWorld and the Language to C++*

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.41.39-am-1536x855.png)
*I selected the Source Code location*

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.42.12-am-1536x889.png)
*I reviewed the General project settings*

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.42.35-am-1536x663.png)
*I built and ran the project*

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.43.19-am-1536x887.png)
*The program ended*

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.43.37-am-1536x641.png)
*I showed the Build Folder in Finder*

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.43.51-am-1536x723.png)
*I reviewed the Build Folder*

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.43.59-am-1536x295.png)
*I examined the Debug Build folder*

![](assets/images/xcode1/screen-shot-2023-03-08-at-10.44.18-am-1536x729.png)
*I reviewed the Unix Executable File*


## main.cpp

```text
//
//  main.cpp
//  helloWorld
//
//  Created by Neil Haddley on 3/8/23.
//

#include <iostream>

int main(int argc, const char * argv[]) {
    // insert code here...
    std::cout << "Hello, World!\n";
    return 0;
}
```