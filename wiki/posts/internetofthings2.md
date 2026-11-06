---
type: post
slug: internetofthings2
title: "Internet of Things (Part 2)"
date: "2021-03-06"
part: 2
builds_on: []
topics: [mqtt-protocols, iot-architecture, node-red-integration, topic-wildcards]
tools: [Node-RED, MQTT, ESP8266, AWS IoT Core]
status: current
checked: "2026-11-05"
source_hash: "1e7b5e3d2952"
generated_by: gemma4:12b
---

**Summary.** I explain how Node-RED interacts with MQTT brokers to manage IoT devices. I demonstrate how specific topic structures allow for granular control and telemetry collection from multiple devices.

## What I did
- I demonstrated Node-RED publishing and subscribing to MQTT messages.
- I designed a hierarchical topic structure for device commands.
- I implemented a system for telemetry data collection.
- I explained the use of wildcards for broad data subscription.
- I referenced industry best practices for MQTT topic design.

## Claims
- Node-RED can send messages to an MQTT broker.
  > "Node-RED can be used to publish messages to an MQTT broker."
- Node-RED can receive messages from an MQTT broker.
  > "Node-RED is able to subscribe to MQTT broker messages."
- The session-id helps the device distinguish between repeated commands.
  > "The session-id would be passed to the ESP8266 device so that it can differentiate between commands that are repeated or re-sent over time."
- The res-topic should not be hardcoded.
  > "The res-topic would be used as the response message's topic (it is better not to hardcode the response message's topic)."
- Telemetry data is read-only information from a device.
  > "Telemetry is read-only data that is transmitted by a device and aggregated elsewhere."
- The hash wildcard matches multiple levels of a topic name.
  > "The # wildcard matches multiple topic name levels."
- The plus wildcard matches a single level of a topic name.
  > "The + wildcard matches a single topic name level."

## Outcome
I built a framework for managing IoT devices using structured MQTT topics. I concluded that specific naming conventions and wildcards are essential for scaling device management.

## Caveats
The post does not specify the exact frequency at which an ESP8266 should publish values as it depends on the specific application.
