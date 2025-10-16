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

```bash
pi@raspberrypi:~ $ sudo apt install firefox-esr
```

![](/assets/images/voicekit2/Screenshot%202025-10-16%20at%2012.14.19 PM.png)
*Google Cloud Console*

![](/assets/images/voicekit2/Screenshot%202025-10-16%20at%2012.27.12 PM.png)
*Credentials*

![](/assets/images/voicekit2/Screenshot%202025-10-16%20at%2012.34.06 PM.png)
*APIs & Services*

![](/assets/images/voicekit2/Screenshot%202025-10-16%20at%204.03.01 PM.png)
*assistant.json*

```json
{
    "installed": {
        "client_id": "<SPECIFIC TO YOU>.apps.googleusercontent.com",
        "project_id": "<SPECIFIC TO YOU>",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "<SPECIFIC TO YOU>",
        "redirect_uris": [
            "http://localhost"
        ]
    }
}
```

![](/assets/images/voicekit2/Screenshot%202025-10-16%20at%2012.34.37 PM.png)
*Assistant Library Demo*


[Voice Kit Demo Video](/assets/images/voicekit2/2FAE2E52-F355-4157-8F3E-6DC1A2EFC690.mp4)


# Google Assistant with AIY Voice Kit

## Project Overview
Python implementation of a voice-activated Google Assistant using hotword detection ("OK Google") with the AIY Voice Kit hardware.

## Setup Notes
**Authentication Challenge**: The initial setup encountered browser compatibility issues with the unsupported Chromium version in the Raspberry Pi image. Successfully resolved by installing Firefox to handle the OAuth authentication flow for Google Assistant API integration.

## Code Implementation

### Core Dependencies
```python
import logging
import platform
import sys
from google.assistant.library.event import EventType
from aiy.assistant import auth_helpers
from aiy.assistant.library import Assistant
from aiy.board import Board, Led
```

### Event Processing Logic
The `process_event()` function manages the Assistant's state machine with visual LED feedback:

#### State Transitions
- **Ready State** (`ON_START_FINISHED`)
  - LED: `BEACON_DARK`
  - Status: Assistant initialized and awaiting hotword

- **Active Listening** (`ON_CONVERSATION_TURN_STARTED`)
  - LED: `ON` (solid)
  - Status: Processing user voice input

- **Processing Query** (`ON_END_OF_UTTERANCE`)
  - LED: `PULSE_QUICK`
  - Status: Assistant analyzing and responding to query

- **Completion States**
  - `ON_CONVERSATION_TURN_FINISHED`
  - `ON_CONVERSATION_TURN_TIMEOUT`
  - `ON_NO_RESPONSE`
  - LED: Returns to `BEACON_DARK`

- **Error Handling** (`ON_ASSISTANT_ERROR`)
  - Condition: Fatal errors trigger application exit


```python
def main():
    # Initialize logging system
    logging.basicConfig(level=logging.INFO)
    
    # Authenticate with Google Assistant API
    credentials = auth_helpers.get_assistant_credentials()
    
    # Initialize hardware and Assistant
    with Board() as board, Assistant(credentials) as assistant:
        # Event processing loop
        for event in assistant.start():
            process_event(board.led, event)
```

### Hardware Requirements

Supported Devices: Raspberry Pi 2/3
Excluded Devices: Raspberry Pi Zero (requires alternative trigger methods)
Required Components: AIY Voice Kit with microphone and speaker array

### Operational Characteristics

Activation Method: Hotword detection ("OK Google")
Audio Handling: Direct access via Google Assistant Library
Visual Feedback: Multi-state LED indicators
Network Dependency: Requires persistent internet connection

### Authentication Notes

The successful implementation relies on proper OAuth configuration with Google Assistant API, achieved through Firefox installation to bypass Chromium compatibility limitations in the standard Raspberry Pi image.

## assistant_library_demo.py



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