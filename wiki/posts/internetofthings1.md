---
type: post
slug: internetofthings1
title: "Internet of Things (Part 1)"
date: "2021-03-03"
part: 1
builds_on: []
topics: [internet-of-things, mqtt-protocol, esp8266-microcontroller, arduino-ide]
tools: [ESP8266, DHT11, Arduino IDE, PubSubClient, eclipse-mosquitto, MQTT Explorer]
status: current
checked: "2026-11-05"
source_hash: "ea90a641cb4c"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to connect an ESP8266 chip to a DHT11 sensor to create an Internet of Things device. I show how to use the MQTT protocol to facilitate communication between devices and mobile applications.

## What I did
- I assembled an ESP8266 with a DHT11 sensor.
- I configured the IoT software using an MQTT broker.
- I uploaded C++ code to the ESP8266 using the Arduino IDE.
- I integrated the PubSubClient library to enable MQTT connectivity.
- I connected MQTT Explorer to the broker to verify the messages.

## Claims
- The ESP8266 connects to an MQTT broker using the PubSubClient library.
  > "The PubSubClient library allows the ESP8266 to connect to an MQTT broker."
- MQTT is a common messaging system for IoT devices.
  > "MQTT is a publish/subscribe messaging system commonly used by IoT devices."
- The eclipse-mosquitto Docker image can establish a test broker.
  > "The 'eclipse-mosquitto' Docker container image can be used to establish a test MQTT broker."
- Mobile and desktop applications can interact with the MQTT broker.
  > "Desktop and mobile applications are able to connect to an MQTT broker showing messages that are being published."

## Outcome
I built a system where an ESP8266 sends sensor data to an MQTT broker. This setup allows mobile and desktop applications to receive and publish messages.

## Caveats
The post does not detail the specific C++ code logic used to process the DHT11 sensor data.
