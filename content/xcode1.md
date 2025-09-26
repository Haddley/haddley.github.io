---
title: "XCode C++ (Part 1)"
description: "Hello, World!"
date: "2025-09-20"
category: "Development"
image: "/assets/images/xcode1/hero.png"
tags: ["ai"]
---

## Hello, World!

![](/assets/images/xcode1/xcode-14-icon-300x314.png)
*This is the logo owned by Apple Inc. for Xcode. Taken from the picture's app bundle. Fair use*


## Building a terminal application using C++ and XCode

How I built hello world on my M1 MacBook Air

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.40.19-am-1536x891.png)
*new Command Line Tool project*

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.40.45-am-1456x1034.png)
*Product Name is helloWorldLanguage is C++*

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.41.39-am-1536x855.png)
*Select Source Code location*

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.42.12-am-1536x889.png)
*General project settings*

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.42.35-am-1536x663.png)
*Build and Run*

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.43.19-am-1536x887.png)
*Program ended*

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.43.37-am-1536x641.png)
*Show Build Folder in Finder*

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.43.51-am-1536x723.png)
*Build Folder*

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.43.59-am-1536x295.png)
*Debug Build*

![](/assets/images/xcode1/screen-shot-2023-03-08-at-10.44.18-am-1536x729.png)
*Unix Executable File*


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

