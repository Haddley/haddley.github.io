---
title: "Voice Kit 3"
description: "Adding Commands"
date: "2025-10-18"
categories: ["Python","AI"]
tags: []
slug: "voicekit3"
image: "/assets/images/raspberry-pi-logo.svg"
---

## Adding commands

## assistant_library_with_local_commands_demo_2.py

```python

#!/usr/bin/env python3
# Copyright 2017 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Run a recognizer using the Google Assistant Library.

The Google Assistant Library has direct access to the audio API, so this Python
code doesn't need to record audio. Hot word detection "OK, Google" is supported.

It is available for Raspberry Pi 2/3 only; Pi Zero is not supported.
"""

import logging
import platform
import subprocess
import sys
import requests
import random
import re

from google.assistant.library.event import EventType

from aiy.assistant import auth_helpers
from aiy.assistant.library import Assistant
from aiy.board import Board, Led
from aiy.voice import tts

def power_off_pi():
    tts.say('Good bye!')
    subprocess.call('sudo shutdown now', shell=True)


def reboot_pi():
    tts.say('See you in a bit!')
    subprocess.call('sudo reboot', shell=True)


def say_ip():
    ip_address = subprocess.check_output("hostname -I | cut -d' ' -f1", shell=True)
    tts.say('My IP address is %s' % ip_address.decode('utf-8'))


def get_temp():
    try:
        cpu_temp_output = subprocess.check_output("vcgencmd measure_temp", shell=True).decode('utf-8')
        # Extract just the temperature number (removes "temp=" and "'C\n")
        temp_value = cpu_temp_output.replace("temp=", "").replace("'C\n", "")
        return f'My CPU temperature is {temp_value} degrees Celsius'
    except subprocess.CalledProcessError:
        return "Sorry, I couldn't read the CPU temperature"
    
def get_uptime():
    output = subprocess.check_output("uptime -p", shell=True, universal_newlines=True)
    # The output is like "up 2 hours, 30 minutes"
    # Remove the "up" and return
    uptime_str = output.strip().replace("up ", "")
    return f"The system has been up for {uptime_str}"


def get_public_ip():
    services = [
        'https://api.ipify.org',
        'https://icanhazip.com',
        'https://ident.me',
        'https://checkip.amazonaws.com'
    ]
    
    for service in services:
        try:
            import requests
            response = requests.get(service, timeout=5)
            if response.status_code == 200:
                public_ip = response.text.strip()
                return f'My public IP address is {public_ip}'
        except Exception as e:
            logging.warning(f"Failed to get IP from {service}: {e}")
            continue
    
    return "Sorry, I couldn't retrieve the public IP address from any service"
    
    
def get_usb_devices():
    output = subprocess.check_output("lsusb", shell=True, universal_newlines=True)
    # Count the lines
    devices = output.strip().splitlines()
    count = len(devices)
    return f"There are {count} USB devices connected"


def get_system_load():
    output = subprocess.check_output("uptime", shell=True, universal_newlines=True)
    # The output has load averages at the end
    # Example: " 18:28:42 up 1:23, 1 user, load average: 0.00, 0.00, 0.00"
    parts = output.split()
    load_avgs = parts[-3], parts[-2], parts[-1]
    return f"The load averages are {load_avgs[0]}, {load_avgs[1]}, and {load_avgs[2]} for the past 1, 5, and 15 minutes"
   
    
    
def process_event(assistant, led, event):
    logging.info(event)
    if event.type == EventType.ON_START_FINISHED:
        led.state = Led.BEACON_DARK  # Ready.
        print('Say "OK, Google" then speak, or press Ctrl+C to quit...')
    elif event.type == EventType.ON_CONVERSATION_TURN_STARTED:
        led.state = Led.ON  # Listening.
    elif event.type == EventType.ON_RECOGNIZING_SPEECH_FINISHED and event.args:
        print('You said:', event.args['text'])
        text = event.args['text'].lower()
        if text == 'power off':
            assistant.stop_conversation()
            power_off_pi()
        elif text == 'reboot':
            assistant.stop_conversation()
            reboot_pi()
        elif text == 'ip address':
            assistant.stop_conversation()
            say_ip()
        elif text == 'cpu temperature':  # Added this condition
            assistant.stop_conversation()
            tts.say(get_temp())
        elif text == 'uptime':  # Added this condition
            assistant.stop_conversation()
            tts.say(get_uptime())
        elif text == 'public ip address':  # Added this condition
            assistant.stop_conversation()
            tts.say(get_public_ip())
        elif text == 'usb devices':  # Added this condition
            assistant.stop_conversation()
            tts.say(get_usb_devices())
        elif text == 'system load':  # Added this condition
            assistant.stop_conversation()
            tts.say(get_system_load())       

            
    elif event.type == EventType.ON_END_OF_UTTERANCE:
        led.state = Led.PULSE_QUICK  # Thinking.
    elif (event.type == EventType.ON_CONVERSATION_TURN_FINISHED
          or event.type == EventType.ON_CONVERSATION_TURN_TIMEOUT
          or event.type == EventType.ON_NO_RESPONSE):
        led.state = Led.BEACON_DARK  # Ready.
    elif event.type == EventType.ON_ASSISTANT_ERROR and event.args and event.args['is_fatal']:
        sys.exit(1)


def main():
    logging.basicConfig(level=logging.INFO)

    credentials = auth_helpers.get_assistant_credentials()
    with Board() as board, Assistant(credentials) as assistant:
        for event in assistant.start():
            process_event(assistant, board.led, event)


if __name__ == '__main__':
    main()

```

## References

- [Hacking the Google AIY Voice Kit Part 2 - Voice Control](https://www.youtube.com/watch?v=GI8zU_HO8CA)