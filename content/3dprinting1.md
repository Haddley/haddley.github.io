---
title: "3D Printing"
part: 1
description: "Printing a name plate on an ELEGOO Mars 3 Pro resin printer: designing it in Tinkercad, slicing it in CHITUBOX, then washing, drying and curing the part"
date: "2023-07-15"
categories: ["3D printing"]
tags: "resin-printing, elegoo-mars, tinkercad, chitubox, uv-curing"
hidden: false
slug: "3dprinting1"
image: "/assets/images/3dprinting1/posts-meta.svg"
---

My first resin print was a simple name plate: raised letters on a flat block. I designed it in Tinkercad, sliced it in CHITUBOX, and printed it on an ELEGOO Mars 3 Pro.

:::brain-power Before you read on
A resin printer does not squeeze out plastic like a glue gun. It shines ultraviolet light up through a screen, through the bottom of a tank of liquid resin, and hardens a whole layer at once. If that is how it works, why might the part come out of the printer upside down, hanging from the build plate?
:::

## Tinkercad

I created a 3D .STL file using Tinkercad.

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.16.58-pm-1028x613.png)
*I created a 3D design in Tinkercad*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.17.43-pm-1029x680.png)
*I added text*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.18.32-pm-1029x650.png)
*I updated the font. Notice that the Height was set to 10.*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.19.42-pm-1025x643.png)
*I added a block with a height of 5.*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.25.06-pm-860x643.png)
*I exported the design as .STL file*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.45.04-pm-1209x687.png)
*I downloaded CHITUBOX and added support for the "ELEGOO MARS 3 PRO"*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.45.17-pm-1208x686.png)
*I reviewed the settings for the Mars 3 Pro*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.45.34-pm-1209x686.png)
*I imported the .STL file*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.46.01-pm-1207x686.png)
*I rotated the design.*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.46.13-pm-1209x689.png)
*I clicked "Slice"*

![](assets/images/3dprinting1/screen-shot-2023-07-15-at-2.46.30-pm-1208x684.png)
*I saved the result as a .CTB file*

:::no-dumb-questions
**Q: What is a .CTB file?**

A: It is the sliced file the printer reads. CHITUBOX turns the 3D model into a stack of thin layers, each an image of what the screen should light up, and saves them for the Mars 3 Pro to print one by one.

**Q: Why does the part hang upside down from the build plate?**

A: The light comes from below. Each new layer hardens against the bottom of the tank, and the build plate lifts the part a little after every layer, so the part grows downward from the plate.
:::

![](assets/images/3dprinting1/img-3153-480x640.jpg)
*I checked that the build plate was level.*

![](assets/images/3dprinting1/img-3145-480x640.jpg)
*I added resin to the tank*

![](assets/images/3dprinting1/img-3170-480x640.jpg)
*I started the print*

![](assets/images/3dprinting1/img-3172-480x640.jpg)
*The print completed in 40 minutes*

![](assets/images/3dprinting1/img-3175-480x640.jpg)
*I removed the build plate from the printer*

![](assets/images/3dprinting1/img-3180-480x640.jpg)
*I washed the part (still attached to the build plate)*

![](assets/images/3dprinting1/img-3181-3-240x320.jpg)
*I dried the part (still sticky)*

![](assets/images/3dprinting1/img-3184-240x320.jpg)
*I cured the part (with UV light)*

:::watch-it Liquid resin needs care
The part was still sticky after washing and drying, and uncured resin can irritate skin. Wear gloves when you handle the resin, the build plate and the part, work somewhere well ventilated, and do not treat the part as finished until it has been cured under UV light.
:::

![](assets/images/3dprinting1/img-3200-2-480x640.jpg)
*The final result*

:::bullet-points In short
- I designed a name plate in Tinkercad, as raised text on a block, and exported it as an .STL file.
- CHITUBOX sliced it into layers for the ELEGOO Mars 3 Pro and saved a .CTB file.
- The resin printer hardened each layer with UV light, and the part grew downward from the build plate.
- The print took 40 minutes.
- Afterwards the part needed washing, drying and curing under UV light before it was finished.
:::
