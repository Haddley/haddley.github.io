---
type: post
slug: picade
title: "Picade Console"
date: "2026-05-31"
builds_on: []
topics: [retro-gaming, raspberry-pi, hardware-assembly, linux-administration]
tools: [Pimoroni Picade, Raspberry Pi, RetroPie, Raspberry Pi OS Lite, scp]
status: current
checked: "2026-11-06"
source_hash: "4565a0dcd473"
generated_by: gemma4:12b
---

**Summary.** I built a compact retro gaming machine using the Pimoroni Picade kit and a Raspberry Pi. I documented the hardware assembly process and the software configuration using RetroPie.

## What I did
- I assembled the hardware using the Pimoroni guide.
- I corrected a joystick wiring mistake.
- I installed Raspberry Pi OS Lite instead of the recommended image.
- I installed RetroPie and added ROMs via the network.

## Claims
- The Picade is a desktop mini arcade cabinet kit for the Raspberry Pi.
  > "The Pimoroni Picade is a desktop mini arcade cabinet kit designed for the Raspberry Pi."
- I made a mistake by inserting the joystick connector the wrong way.
  > "The build was straightforward but I made one mistake: I inserted the joystick connector the wrong way around."
- Flipping the connector fixed the issue where the joystick only moved upward.
  > "After some research I found this is a well-known issue — flipping the connector fixed it immediately."
- I chose to install Raspberry Pi OS Lite to create a cleaner base for troubleshooting.
  > "I found it much easier to skip the recommended OS image and instead install Raspberry Pi OS Lite (64-bit) — a port of Debian Bookworm — directly, adding Wi-Fi details and enabling SSH during the Raspberry Pi Imager setup, then installing RetroPie as a separate step afterwards."
- I used the scp command to copy additional ROMs across the network.
  > "To copy further ROMs across the network I used `scp`:"

## Outcome
I built a functional retro gaming machine with a joystick and an 8-inch display. I successfully configured the system to run games like the Tanglewood demo.

## Caveats
The post does not show the specific internal wiring layout of the Raspberry Pi and button connectors.
