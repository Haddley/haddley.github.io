---
type: concept
slug: raspberry-pi
title: "Raspberry Pi"
description: "I use the Raspberry Pi for a wide range of projects including retro gaming, voice-controlled assistants, and IoT management."
posts: [picade, voicekit4, voicekit3, voicekit2, voicekit, gingerbreadhouse, sh1106, pi1, 3dprinting2, internetofthings2]
status: current
checked: "2026-11-06"
source_hash: "84f26d8db919"
generated_by: gemma4:12b
---

**Summary.** I use the Raspberry Pi for a wide range of projects including retro gaming, voice-controlled assistants, and IoT management. These posts demonstrate how I integrate various hardware components, Python scripts, and network protocols to create functional devices.

## The idea
- I use the Raspberry Pi to build retro gaming consoles and custom hardware mounts.
- I integrate the Raspberry Pi with voice assistants and custom Python functions.
- I utilize the Raspberry Pi to control OLED displays and run video scripts.
- I use the Raspberry Pi as a hub for IoT devices using Node-RED and MQTT.
- I use tools like Raspberry Pi Imager and raspi-config to prepare and configure the hardware.

## Claims
- I built a compact retro gaming machine using the Pimoroni Picade kit and a Raspberry Pi.
  > "The Pimoroni Picade is a desktop mini arcade cabinet kit designed for the Raspberry Pi." — picade
- I used the Raspberry Pi Imager to write the OS image and configure remote access.
  > "I used the Raspberry Pi Imager tool to write a standard operating system image onto a microSD card." — pi1
- I integrated the Google Assistant API with the AIY Voice Kit on a Raspberry Pi.
  > "This was resolved by installing Firefox, which properly handled the OAuth authentication flow required by the Google Assistant API." — voicekit2
- I used Python to output text and graphics to an OLED display.
  > "I used Python to output text and simple graphics to an OLED display connected to a Raspberry Pi." — sh1106
- I used Node-RED to send and receive messages from an MQTT broker.
  > "Node-RED can be used to publish messages to an MQTT broker." — internetofthings2
- I used the raspi-config tool to modify interface options.
  > "*I ran sudo raspi-config and selected the Interface Options menu option*" — gingerbreadhouse
- I configured a systemd service to launch the voice assistant automatically on startup.
  > "I created the service file by typing:" — voicekit4
- I used the scp command to copy additional ROMs across the network.
  > "To copy further ROMs across the network I used `scp`:" — picade

## What I concluded
The Raspberry Pi serves as a versatile platform for both hardware experimentation and software integration. My projects show that it can function as a gaming console, a voice-controlled hub, or a controller for IoT systems.
