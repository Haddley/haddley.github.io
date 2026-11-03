---
title: "Claude Code"
part: 17
description: "Asking Claude Code to find an Arduino Uno and a 2.6/2.8 inch TFT LCD shield, install the toolchain, fix an Apple Silicon compiler error, and upload a test sketch that identified the ILI9341 display controller"
date: "2026-11-03"
categories: ["AI","IOT"]
image: "/assets/images/claudecode17/posts-meta.svg"
tags: "claude-code, arduino, tft-lcd-shield, ili9341, arduino-cli"
hidden: false
slug: "claudecode17"
---

In [Part 15](/posts/claudecode15/) I asked Claude Code to find an Arduino TinkerKit LCD Module. This time I plugged in an Arduino Uno with a 2.6"/2.8" TFT LCD shield on top, and I asked the same first question. I wanted to know whether the screen worked, and I wanted to find out without opening the Arduino IDE.

## Beat 1: Can you see it?

```PROMPT
I have an arduino and connected tft lcd shield attached to my laptop. can you see it?
```

Claude listed the serial devices and the USB registry on my Mac. It found `/dev/cu.usbmodem101`, with the vendor name Arduino and a product ID of 0x0043, which is an Arduino Uno R3.

It also told me what it could not see. The shield has no USB connection of its own, so the only way to prove that it works is to upload a sketch and watch the screen.

## Beat 2: Reading the back of the shield

Claude asked which shield I had, so I attached a photo of the back.

```PROMPT
photo attached
```

![](assets/images/claudecode17/shield-back.jpg)
*I photographed the back of the shield: the silkscreen reads 2.6"/2.8" TFT LCD Shield*

Claude read the labels. The pins `LCD_D0` to `LCD_D7` and `LCD_RST`, `LCD_CS`, `LCD_RS`, `LCD_WR` and `LCD_RD` mean that the display uses an 8-bit parallel bus. The two chips are level shifters, there is a 3.3 V regulator, and the microSD slot is wired to the SPI pins.

Claude could not tell which controller chip the screen uses from the photo. These shields usually have an ILI9341 or an ILI9325, and sometimes an ST7789 or an R61509. It proposed the MCUFRIEND_kbv library, which reads the controller ID at run time, and asked for permission to change my machine's setup.

```PROMPT
yes please
```

## Beat 3: Installing the tools

`arduino-cli` was already installed. Claude installed the `arduino:avr` core and the MCUFRIEND_kbv and Adafruit GFX libraries, and then confirmed that the board showed up as `arduino:avr:uno`.

![](assets/images/claudecode17/session-install.png)
*Claude installed the toolchain and wrote the test sketch in a new `tft_test` folder*

The sketch reads the controller ID, prints it to the serial port, fills the screen with red, green and blue, and then draws text and a yellow border.

## Beat 4: bad CPU type in executable

The first compile failed.

```
fork/exec .../avr-gcc/.../bin/avr-g++: bad CPU type in executable
```

The Arduino AVR compiler is an Intel program, and my Mac has an Apple Silicon chip. Claude checked that Rosetta 2 was not installed, and it stopped to ask me before it ran a system-level install.

:::watch-it Ask before the system changes
Claude Code stopped here because installing Rosetta changes the whole machine and not just this project. I was glad that it asked. The other option was a native ARM `avr-gcc` from Homebrew, which means swapping out the Arduino toolchain.
:::

```PROMPT
yes
```

![](assets/images/claudecode17/session-rosetta.png)
*I answered yes in the composer, and Claude ran `softwareupdate --install-rosetta --agree-to-license`*

## Beat 5: The result

After Rosetta was installed, Claude compiled the sketch (49% of program storage), uploaded it, and read the serial port:

```
Controller ID: 0x9341
Size: 320x240
```

The shield has an **ILI9341** controller, and the screen is 320 by 240 pixels in landscape. The display flashed red, green and blue, and then showed the text and the border. It worked.

## What I learned

:::bullet-points
- The computer cannot see the shield. Only the Arduino appears on USB, so a test sketch is the real test.
- MCUFRIEND_kbv finds the controller chip for me, so I did not need to know it in advance.
- On Apple Silicon, I need Rosetta 2 before I can compile for AVR boards.
- Claude Code asked before it changed my system, and I stayed in control of the machine.
:::

Next I want to try the resistive touch layer and the microSD slot.
