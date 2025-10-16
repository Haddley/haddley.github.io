---
title: "Voice Kit 2"
description: "Google Assistant API"
date: "2025-10-16"
categories: ["Python","AI"]
tags: []
slug: "voicekit"
image: "/assets/images/raspberry-pi-logo.svg"
---

## Setup Context

### Note on Browser Compatibility

During setup, I encountered issues with the unsupported Chromium version in the Raspberry Pi image. This was resolved by installing Firefox, which properly handled the OAuth authentication flow required by the Google Assistant API.

```text
#!/usr/bin/env python3sudo apt install firefox-esr
```

![](/assets/images/voicekit2/Screenshot%202025-10-16%20at%2012.14.19 PM.png)
*Google Cloud Console*

![](/assets/images/voicekit2/Screenshot%202025-10-16%20at%2012.27.12 PM.png)
*Credentials*

![](/assets/images/voicekit2/Screenshot%202025-10-16%20at%2012.34.06 PM.png)
*APIs & Services*

![](/assets/images/voicekit2/Screenshot%202025-10-16%20at%2012.34.37 PM.png)
*Assistant Library Demo*


[Voice Kit Demo Video](/assets/images/voicekit2/2FAE2E52-F355-4157-8F3E-6DC1A2EFC690.mp4)


## Google Assistant with AIY Voice Kit - Implementation Notes

After successfully connecting the AIY voice device to the Google Assistant API, here's how the activation code works:



### Code Overview

This Python script creates a voice-activated Google Assistant using hotword detection ("OK Google"). The implementation leverages the Google Assistant Library for direct audio API access, eliminating the need for manual audio recording.

## Key Components

### Authentication & Setup

Credentials Handling: auth_helpers.get_assistant_credentials() manages the OAuth flow that was completed via Firefox
Board Initialization: The AIY Voice Kit hardware is initialized with proper LED controls

### Event Processing Workflow

The process_event() function handles the Assistant's state transitions:

Ready State (ON_START_FINISHED): LED shows BEACON_DARK indicating the Assistant is active and awaiting the hotword
Listening Phase (ON_CONVERSATION_TURN_STARTED): Solid LED ON during voice input capture
Processing State (ON_END_OF_UTTERANCE): Pulsing LED indicates the Assistant is processing the query
Completion States: LED returns to BEACON_DARK when the interaction concludes
Operational Flow

### Initialization

Authenticates with Google services using the previously configured credentials
Hotword Detection: Continuously monitors for "OK Google" trigger phrase
Visual Feedback: LED provides clear status indicators throughout the interaction cycle
Error Handling: Gracefully handles fatal errors by exiting the application
Technical Requirements

### Hardware 

Raspberry Pi 2/3 with AIY Voice Kit (excludes Pi Zero)
Authentication: Successful Google Assistant API configuration (completed via Firefox)

### Connectivity

Stable internet connection for Google Assistant services
The implementation now provides seamless voice interaction capability, building on the successful API integration achieved through the Firefox workaround for authentication.

## assistant_library_demo.py

```text
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

"""Activates the Google Assistant with hotword detection, using the Google Assistant Library.

The Google Assistant Library has direct access to the audio API, so this Python
code doesn't need to record audio.

.. note:

    This example depends on hotword detection (such as "Okay Google") to activate the Google
    Assistant, which is supported only with Raspberry Pi 2/3. If you're using a Pi Zero, this
    code won't work. Instead, you must use the button or another type of trigger, as shown
    in assistant_library_with_button_demo.py.
"""

import logging
import platform
import sys

from google.assistant.library.event import EventType

from aiy.assistant import auth_helpers
from aiy.assistant.library import Assistant
from aiy.board import Board, Led

def process_event(led, event):
    logging.info(event)

    if event.type == EventType.ON_START_FINISHED:
        led.state = Led.BEACON_DARK  # Ready.
        logging.info('Say "OK, Google" then speak, or press Ctrl+C to quit...')

    elif event.type == EventType.ON_CONVERSATION_TURN_STARTED:
        led.state = Led.ON  # Listening.

    elif event.type == EventType.ON_END_OF_UTTERANCE:
        led.state = Led.PULSE_QUICK  # Thinking.

    elif (event.type == EventType.ON_CONVERSATION_TURN_FINISHED
          or event.type == EventType.ON_CONVERSATION_TURN_TIMEOUT
          or event.type == EventType.ON_NO_RESPONSE):
        led.state = Led.BEACON_DARK

    elif event.type == EventType.ON_ASSISTANT_ERROR and event.args and event.args['is_fatal']:
        sys.exit(1)


def main():
    logging.basicConfig(level=logging.INFO)

    credentials = auth_helpers.get_assistant_credentials()
    with Board() as board, Assistant(credentials) as assistant:
        for event in assistant.start():
            process_event(board.led, event)


if __name__ == '__main__':
    main()


```


## References

- [Hacking the Google AIY Voice Kit - Part 1](https://www.youtube.com/watch?v=jQK0VDWIzus)
- [Hacking the Google AIY Voice Kit Part 2 - Voice Control](https://www.youtube.com/watch?v=GI8zU_HO8CA)