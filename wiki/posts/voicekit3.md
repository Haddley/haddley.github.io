---
type: post
slug: voicekit3
title: "Voice Kit (Part 3)"
date: "2025-10-18"
part: 3
builds_on: []
topics: [voice-commands, raspberry-pi, python-programming, system-automation]
tools: [Raspberry Pi, Python, vcgencmd, lsusb, api.ipify.org]
status: current
checked: "2026-11-06"
source_hash: "965234879b81"
generated_by: gemma4:12b
---

**Summary.** I explain how to expand the capabilities of a voice assistant by adding custom commands. I demonstrate how to connect specific functions to voice triggers to perform system tasks.

## What I did
- I built a voice assistant for Raspberry Pi.
- I created functions to perform specific system tasks.
- I connected these functions to voice commands.
- I integrated text-to-speech for the responses.

## Claims
- The program uses a central function to decide how to handle events.
  > "The process_event function is like the brain that decides what to do:"
- I added new functionality by creating functions and linking them to voice inputs.
  > "I added special commands by creating functions and connecting them to voice commands:"
- The get_temp function uses a system command to read the temperature.
  > "get_temp() - Runs a system command vcgencmd measure_temp to read temperature"
- The get_public_ip function contacts a website to find the IP address.
  > "get_public_ip() - Contacts websites like api.ipify.org to find your public IP"
- The get_usb_devices function lists and counts the connected hardware.
  > "get_usb_devices() - Runs lsusb to list USB devices and counts them"
- The tts.say method allows the computer to speak the results.
  > "tts.say() - This makes the computer speak the response"

## Outcome
I built a voice assistant that can perform various system checks and report them aloud.

## Caveats
The post does not detail the specific hardware configuration of the Raspberry Pi.
