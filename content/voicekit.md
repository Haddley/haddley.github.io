---
title: "Voice Kit"
description: "Raspberry Pi Voice Kit"
date: "2025-10-11"
categories: ["Python","AI"]
tags: []
slug: "voicekit"
image: "/assets/images/raspberry-pi-logo.svg"
---


I built a  natural language recognizer connected it to the Google Assistant

![](/assets/images/voicekit/C059C37E-B731-4377-8891-9C68A72568CB.png)
*Raspberry Pi Hat*

![](/assets/images/voicekit/FF078E6D-EA98-4E1E-976B-B036E33DA9F2.png)
*Cardboard assembled*

![](/assets/images/voicekit/Screenshot%202025-10-11%20at%204.12.07 PM.png)
*[Download image](https://github.com/google/aiyprojects-raspbian/releases)*

![](/assets/images/voicekit/Screenshot%202025-10-11%20at%204.10.12 PM.png)
*Image flashed to MicroSD Card*

![](/assets/images/voicekit/Screenshot%202025-10-11%20at%205.09.53 PM.png)
*I enabled xrdp and connected to pi remotely*



Notice that I had to run "apt-get --allow-releaseinfo-change update" to update the Buster image.

![](/assets/images/voicekit/Screenshot%202025-10-11%20at%205.21.15 PM.png)
*I ran the Check audio script*

![](/assets/images/voicekit/Screenshot%202025-10-11%20at%207.49.52 PM.png)
*I ran the voice_recorder script*

## voice_recorder.py

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

import argparse
import time
import threading

from aiy.board import Board
from aiy.voice.audio import AudioFormat, play_wav, record_file, Recorder

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--filename', '-f', default='recording.wav')
    args = parser.parse_args()

    with Board() as board:
        print('Press button to start recording.')
        board.button.wait_for_press()

        done = threading.Event()
        board.button.when_pressed = done.set

        def wait():
            start = time.monotonic()
            while not done.is_set():
                duration = time.monotonic() - start
                print('Recording: %.02f seconds [Press button to stop]' % duration)
                time.sleep(0.5)

        record_file(AudioFormat.CD, filename=args.filename, wait=wait, filetype='wav')
        print('Press button to play recorded sound.')
        board.button.wait_for_press()

        print('Playing...')
        play_wav(args.filename)
        print('Done.')

if __name__ == '__main__':
    main()


```


## References

- [AIY](https://aiyprojects.withgoogle.com/voice-v1/)
- [xrdp](https://haddley.github.io/posts/pi1/)