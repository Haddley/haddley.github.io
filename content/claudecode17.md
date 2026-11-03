---
title: "Claude Code"
part: 17
description: "Asking Claude Code to find an Arduino Uno and a 2.6/2.8 inch TFT LCD shield, install the toolchain, fix an Apple Silicon compiler error, upload a test sketch that identified the ILI9341 display controller, and turn the screen into a Claude Code status light"
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

## Beat 6: Making the screen a Claude Code status light

With the shield working, I wanted it to do something useful. I asked Claude Code to turn it into a physical status light for my Claude Code sessions.

```PROMPT
build the claude code status light
```

Claude wrote three files in `~/Documents/tft-lcd-shield/claude_status/`:

- `claude_status.ino`, a sketch that reads one line per update over USB serial (`STATE|tool|count`) and paints the whole screen in the colour of that state. It redraws only the parts that changed, so the screen does not flicker.
- `claude_status_hook.py`, a Claude Code hook script. Claude Code runs it for each event and passes the event as JSON on standard input. The script turns the event into a state line and passes it on. I changed how it passes the line on after my first test (see below).
- `claude_status_daemon.py`, a small background process that opens the Uno's serial port once and keeps it open. It writes to the port every line that the hook script sends it through a local socket.

| Claude Code event | Screen |
|---|---|
| `UserPromptSubmit` | Amber **THINKING**, tool count back to 0 |
| `PreToolUse` | Blue **WORKING**, with the tool name and the running tool count |
| `PostToolUse` | Back to amber **THINKING** |
| `Notification` | Red **NEEDS YOU** (Claude is waiting for permission or input) |
| `Stop` | Green **DONE**, with the elapsed time frozen |

The sketch compiled to 53% of program storage and 27% of RAM. That left about 1,476 bytes free, so I kept the screen to text and flat colour blocks and drew no bitmaps.

:::watch-it Opening the serial port resets an Uno
My first version of the hook script opened the serial port, wrote one line and closed it again. I uploaded the sketch, sent the five states by hand, and the screen only ever said READY. Opening the serial port on an Uno pulses its reset line, so the board restarted on every event, lost the message and came back up on its start screen. Telling the port not to hang up when it closes (`stty -hupcl`) did not stop it.
:::

The fix was to stop reopening the port. The daemon opens it once and waits 2.5 seconds for the board to finish restarting. After that, the hook only sends a message to the daemon, and the board is never reset again. If the daemon is not running, the hook starts it, so there is nothing to launch by hand.

I sent THINKING, then WORKING with the tool name Bash, then DONE. The screen ended on **DONE** with a green background, so the daemon fixed the reset.

The script exits quietly when the board is unplugged, so a missing Uno never blocks Claude Code.

To connect it to Claude Code, I added an entry for each of the five events to the `hooks` section of this project's `.claude/settings.local.json`. Hooks run on every event and change how Claude Code behaves, so I chose the local file rather than my user settings. The light now works only in sessions that start in this repository, and Git ignores the file, so it is never committed.

![](assets/mp4/claudecode17/status-light.mp4)
*I filmed the shield while Claude Code worked: amber THINKING, the last tool (Bash), the tool count and the running timer*

Three limits: several sessions at once share the one screen, the daemon holds the port so I have to stop it (`pkill -f claude_status_daemon.py`) before I upload a new sketch, and the Arduino IDE cannot use the port while the daemon is running.

The full source of the three files is below, exactly as it ran for the photo and the video.

:::under-the-hood claude_status_hook.py
```python
#!/usr/bin/env python3
"""Claude Code hook: read the hook JSON on stdin and send STATE|tool|count to the Uno."""
import json, os, socket, subprocess, sys, time

PORT = os.environ.get("CLAUDE_STATUS_PORT", "/dev/cu.usbmodem101")
COUNT = "/tmp/claude_status_count"

try:
    event = json.load(sys.stdin)
except Exception:
    event = {}
name = event.get("hook_event_name", "")
tool = event.get("tool_name", "")

def read_count():
    try:
        return int(open(COUNT).read())
    except Exception:
        return 0

if name == "UserPromptSubmit":
    state, tool, count = "THINK", "", 0
elif name == "PreToolUse":
    state, count = "WORK", read_count() + 1
elif name == "PostToolUse":
    state, count = "THINK", read_count()
elif name == "Notification":
    state, tool, count = "ASK", "waiting for you", read_count()
elif name == "Stop":
    state, tool, count = "DONE", "", read_count()
else:
    state, tool, count = "READY", "", 0

if name in ("UserPromptSubmit", "PreToolUse"):
    open(COUNT, "w").write(str(count))
if state == "READY":
    open(COUNT, "w").write("0")

if not os.path.exists(PORT):
    sys.exit(0)  # board unplugged: do nothing, never block Claude Code

SOCK = "/tmp/claude_status.sock"
DAEMON = os.path.join(os.path.dirname(os.path.abspath(__file__)), "claude_status_daemon.py")
msg = f"{state}|{tool[:15]}|{count}\n".encode()

def send():
    c = socket.socket(socket.AF_UNIX, socket.SOCK_DGRAM)
    c.setblocking(False)
    c.sendto(msg, SOCK)

try:
    send()
except OSError:
    # No daemon yet: start it detached (it holds the port open), then retry briefly.
    subprocess.Popen([sys.executable, DAEMON], start_new_session=True,
                     stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(20):
        time.sleep(0.1)
        try:
            send()
            break
        except OSError:
            pass
```
:::

:::under-the-hood claude_status_daemon.py
```python
#!/usr/bin/env python3
"""Holds the Uno's serial port open so hooks never reopen it (opening resets an Uno).
Listens for datagrams on a Unix socket and writes each one to the port."""
import os, socket, sys, termios, time

PORT = os.environ.get("CLAUDE_STATUS_PORT", "/dev/cu.usbmodem101")
SOCK = "/tmp/claude_status.sock"

if os.path.exists(SOCK):
    os.unlink(SOCK)
s = socket.socket(socket.AF_UNIX, socket.SOCK_DGRAM)
s.bind(SOCK)  # bound first, so messages sent while the board boots are queued

fd = os.open(PORT, os.O_RDWR | os.O_NOCTTY)
a = termios.tcgetattr(fd)
a[0] = 0; a[1] = 0; a[3] = 0                      # raw: no input/output processing
a[2] = (a[2] & ~(termios.CSIZE | termios.PARENB | termios.HUPCL)) | termios.CS8 | termios.CLOCAL | termios.CREAD
a[4] = a[5] = termios.B115200
termios.tcsetattr(fd, termios.TCSANOW, a)
time.sleep(2.5)                                    # the open reset the board once; let it boot

while True:
    data = s.recv(256)
    try:
        os.write(fd, data)
        termios.tcdrain(fd)
    except OSError:
        sys.exit(0)                                # board unplugged
```
:::

:::under-the-hood claude_status.ino
```cpp
// Claude Code status light for an Uno + 2.8" ILI9341 TFT shield (MCUFRIEND_kbv).
// Input over USB serial, 115200 baud, one line per update:  STATE|tool|count
// STATE is READY, THINK, WORK, ASK or DONE.
#include <MCUFRIEND_kbv.h>
#include <Adafruit_GFX.h>

MCUFRIEND_kbv tft;

#define BLACK 0x0000
#define WHITE 0xFFFF

struct Look { const char *name; uint16_t colour; };
const Look LOOKS[] = {
  {"READY",    0x4A69},  // grey
  {"THINKING", 0xFE00},  // amber
  {"WORKING",  0x041F},  // blue
  {"NEEDS YOU",0xF800},  // red
  {"DONE",     0x07E0},  // green
};

char line[40];
byte len = 0;
byte state = 0, shown = 255;
char tool[16] = "";
char shownTool[16] = "x";
int count = 0, shownCount = -1;
unsigned long started = 0, frozen = 0;
bool running = false;
long shownSecs = -1;

byte lookup(const char *s) {
  if (!strcmp(s, "THINK")) return 1;
  if (!strcmp(s, "WORK")) return 2;
  if (!strcmp(s, "ASK")) return 3;
  if (!strcmp(s, "DONE")) return 4;
  return 0;
}

void parse() {
  char *a = strtok(line, "|");
  char *b = strtok(NULL, "|");
  char *c = strtok(NULL, "|");
  if (!a) return;
  state = lookup(a);
  strncpy(tool, b ? b : "", sizeof(tool) - 1);
  tool[sizeof(tool) - 1] = 0;
  count = c ? atoi(c) : 0;
  if (state == 1 && count == 0) { started = millis(); }
  running = (state == 1 || state == 2 || state == 3);
  if (!running && state != 0) frozen = millis() - started;
}

void drawAll() {
  tft.fillScreen(LOOKS[state].colour);
  tft.setTextColor(state == 1 ? BLACK : WHITE);
  tft.setTextSize(5);
  int w = strlen(LOOKS[state].name) * 30;
  tft.setCursor((320 - w) / 2, 40);
  tft.print(LOOKS[state].name);
  shown = state;
  shownTool[0] = 'x'; shownTool[1] = 0; shownCount = -1; shownSecs = -1;
}

void drawDetails() {
  uint16_t fg = state == 1 ? BLACK : WHITE;
  if (strcmp(tool, shownTool) || shownCount != count) {
    tft.fillRect(0, 110, 320, 60, LOOKS[state].colour);
    tft.setTextColor(fg);
    tft.setTextSize(3);
    tft.setCursor(10, 115);
    tft.print(tool);
    tft.setTextSize(2);
    tft.setCursor(10, 150);
    tft.print(count);
    tft.print(F(" tools used"));
    strcpy(shownTool, tool);
    shownCount = count;
  }
  long secs = (running ? millis() - started : frozen) / 1000;
  if (secs != shownSecs) {
    tft.fillRect(0, 190, 320, 40, LOOKS[state].colour);
    tft.setTextColor(fg);
    tft.setTextSize(3);
    tft.setCursor(10, 195);
    tft.print(secs / 60); tft.print(F("m "));
    tft.print(secs % 60); tft.print(F("s"));
    shownSecs = secs;
  }
}

void setup() {
  Serial.begin(115200);
  tft.begin(tft.readID());
  tft.setRotation(1);
  drawAll();
  Serial.println(F("ready"));
}

void loop() {
  while (Serial.available()) {
    char ch = Serial.read();
    if (ch == '\n') { line[len] = 0; len = 0; parse(); }
    else if (ch != '\r' && len < sizeof(line) - 1) line[len++] = ch;
  }
  if (state != shown) drawAll();
  drawDetails();
}
```
:::

Next I want to try the resistive touch layer and the microSD slot.
