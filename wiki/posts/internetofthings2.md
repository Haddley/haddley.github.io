---
type: post
slug: internetofthings2
title: "Internet of Things (Part 2)"
date: "2021-03-06"
part: 2
builds_on: []
topics: ["mqtt-protocols", "iot-architecture", "node-red-integration", "wildcard-filtering"]
tools: ["Node-RED", "MQTT", "ESP8266", "AWS IoT Core"]
status: current
checked: "2026-11-27"
source_hash: "23ad82dab2f3"
generated_by: gemma4:12b
---

**Summary.** I explain how Node-RED interacts with MQTT brokers to manage IoT devices. I demonstrate how specific topic structures allow for granular control and data collection from multiple sensors.

## What I did
- I showed how Node-RED publishes and subscribes to MQTT messages.
- I designed a hierarchical topic structure for specific device controls.
- I included sample ESP8266 code for device communication.
- I explained the difference between command topics and read-only telemetry.
- I demonstrated the use of wildcards for broad data collection.

## Claims
- Node-RED can send messages to an MQTT broker.
  > "Node-RED can be used to publish messages to an MQTT broker."
- Node-RED can receive messages from an MQTT broker.
  > "Node-RED is able to subscribe to MQTT broker messages."
- A session ID helps the device distinguish between repeated commands.
  > "The session-id would be passed to the ESP8266 device so that it can differentiate between commands that are repeated or re-sent over time."
- Telemetry data is read-only information sent from a device.
  > "Telemetry is read-only data that is transmitted by a device and aggregated elsewhere."
- The hash wildcard matches multiple levels of a topic name.
  > "The # wildcard matches multiple topic name levels."
- The plus wildcard matches a single level of a topic name.
  > "The + wildcard matches a single topic name level."

## Outcome
I built a system where Node-RED manages IoT devices through structured MQTT topics. I concluded that specific naming conventions and wildcards are essential for scaling IoT networks.

## Caveats
The post does not show the specific hardware wiring for the sensors and actuators.
