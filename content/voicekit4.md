---
title: "Voice Kit 4"
description: "Automatically Boot your Raspberry Pi 3 into Google Voice Assistant"
date: "2025-12-14"
categories: ["Python","AI","Angular","IOT","TypeScript"]
tags: ""
slug: "voicekit4"
image: "/assets/images/raspberry-pi-logo.svg"
---

# Voice Kit 4

## Automatically Boot your Raspberry Pi 3 into Google Voice Assistant

I opened a Terminal on the Raspberry Pi Desktop.

I created the service file by typing:

```bash
sudo nano /etc/systemd/system/assist.service
```

I copied this text to the assist.service file.

```bash
[Unit]
Description=Assist @ reboot

[Service]
Environment=XDG_RUNTIME_DIR=/run/user/1000
#ExecStart=/home/pi/AIY-projects-python/src/examples/voice/main.py
ExecStart=/home/pi/AIY-projects-python/src/examples/voice/assistant_library_with_local_commands_demo.py
Restart=always
User=pi
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=assist

[Install]
WantedBy=multi-user.target
```

Control-X to exit, and Y to save. Press Enter to complete the save.

I enabled the service (for next boot) by typing in the terminal:

```bash
sudo systemctl enable assist.service
```

I started the service manually by typing:

```bash
sudo systemctl start assist.service
```

I checked the status of the service by typing:

```bash
sudo systemctl status assist.service
```

![](/assets/images/voicekit4/Screenshot 2025-12-15 125800.png)
*sudo systemctl status assist.service*



I rebooted my Raspberry Pi

## References

- [Automatically Boot your Raspberry Pi 3 into Google Voice Assistant](https://github.com/carolinedunn/Google-Home-RPi-AutoBoot)
- [How to Auto Boot Google Home with AIY Voice Kit](https://www.youtube.com/watch?v=dFL4ePKWfic)