---
type: post
slug: internetofthings1
title: "Internet of Things (Part 1)"
date: "2021-03-03"
part: 1
builds_on: []
topics: ["internet-of-things", "mqtt-protocol", "esp8266-microcontroller", "docker-containers"]
tools: ["ESP8266", "DHT11", "Arduino IDE", "PubSubClient", "Eclipse Mosquitto", "MQTT Explorer"]
status: current
checked: "2026-11-27"
source_hash: "82024d5a8112"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to connect an ESP8266 chip to a DHT11 sensor to create an Internet of Things device. I show how to use the MQTT protocol to facilitate communication between devices and mobile applications.

## What I did
- I connected an ESP8266 to a DHT11 sensor.
- I configured the IoT software using an MQTT broker.
- I uploaded C++ code to the ESP8266 using the Arduino IDE.
- I set up a test MQTT broker using a Docker container.
- I connected a desktop application to the broker to view messages.

## Claims
- The ESP8266 connects to an MQTT broker using the PubSubClient library.
  > "The PubSubClient library allows the ESP8266 to connect to an MQTT broker."
- The PubSubClient library is licensed under the MIT License.
  > "knolleary/pubsubclient is licensed under the MIT License."
- The eclipse-mosquitto Docker image provides a way to establish a test broker.
  > "The 'eclipse-mosquitto' Docker container image can be used to establish a test MQTT broker."
- Mobile and desktop applications can display messages published to the broker.
  > "Desktop and mobile applications are able to connect to an MQTT broker showing messages that are being published."
- The Arduino IDE allows me to upload C++ code to the ESP8266.
  > "The Arduino Integrated Development Environment (IDE) can be used to create and upload C++ code to an ESP8266."

## Outcome
I built a system where an ESP8266 sends sensor data to an MQTT broker. This setup allows mobile and desktop applications to receive and display the data.

## Caveats
The post does not show the specific network configuration for the local Wi-Fi connection.
