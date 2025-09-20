---
title: "Internet of Things (Part 2)"
description: "A comprehensive guide covering internet of things (part 2)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/iot-microchip.svg"
tags: ["docker"]
---

# Internet of Things (Part 2)

## Node-RED can publish messages to a MQTT broker and subscribe to MQTT topics.

![](/assets/images/internetofthings2/iot-microchip.svg)
*iot microchip by Philipp Petzka is licensed under CC*


## Node-RED

Node-RED can be used to publish messages to an MQTT broker.

Node-RED is able to subscribe to MQTT broker messages.

**$ docker run -it -p 1880:1880 nodered/node-red**

![](/assets/images/internetofthings2/screen-shot-2021-03-04-at-7.46.57-pm-1136x736.png)
*node-red Docker image*

![](/assets/images/internetofthings2/screen-shot-2021-03-06-at-11.35.48-pm-1836x1045.png)
*Connecting Node-RED to the MQTT broker*

![](/assets/images/internetofthings2/screen-shot-2021-03-06-at-11.41.33-pm-1836x1051.png)
*"mqtt in" node subscribes to "outTopic" messages*

![](/assets/images/internetofthings2/screen-shot-2021-03-06-at-11.42.05-pm-1836x1053.png)
*"debug" node displays the incoming "outTopic" messages on debug panel*

![](/assets/images/internetofthings2/screen-shot-2021-03-06-at-11.45.34-pm-1836x1040.png)
*"mqtt out" node publishes "1" or "0" to the "inTopic" and ESP8266 LED turns on or off.*


## MQTT topics and payloads

In the example above "inTopic" is a command topic and "outTopic" is a topic for telemetry.


## Command Topics

In the example above the ESP8266 microprocessor subscribes to "inTopic" messages and when it sees a message with the payload "1" the builtin LED is turned on. 

In fact dozens or hundreds of IoT devices could subscribe to "inTopic" messages turning on or off together. 

But, what if a developer would like a single ESP8266 device's builtin LED to turn on? What if a developer would like to turn on a fan connected to a single ESP8266 device? What if a developer would like to turn off the fans connected to all ESP8266 devices on given floor of a given building?

Well every device that connects to an MQTT broker has a unique "thing name" (and a unique MQTT client id) but how would the publisher of a control message specify that they wanted to turn off the fan connected to the ESP8266 with a given "thing name"?


## Topic structure

If a device with thing name "thing1" is in conference room 2 on floor 2 of building 3 a developer can arrange for that thing's builtin LED to turn off whenever a message with payload "0" is published with this topic:

**cmd/hvac/building3/floor2/confroom2/thing1/builtinled**

A developer can arrange for a fan controlled by thing1 to be turned on whenever a message with payload "1" is published with this topic:

**cmd/hvac/building3/floor2/confroom2/thing1/fan**

A developer can arrange for fans controlled by all things on floor 2 to be turned off when a message with payload "0" is published with this topic:

**cmd/hvac/building3/floor2/fan**

Sample ESP8266 code is shown below.

![](/assets/images/internetofthings2/screen-shot-2021-03-07-at-11.21.47-am-1836x1106.png)
*publishing to "cmd/hvac/building3/floor2/confroom2/thing1/builtinled"*

![](/assets/images/internetofthings2/screen-shot-2021-03-07-at-11.35.42-am-1836x1108.png)
*subscribing to "cmd/hvac/#'*


## Response

If the publisher of a Command Topic message wants to receive responses they might provide a JSON payload that includes a "session-id" and a "res-topic". The session-id would be passed to the ESP8266 device so that it can differentiate between commands that are repeated or re-sent over time. The res-topic would be used as the response message's topic (it is better not to hardcode the response message's topic).

Instead of passing the string "1" the Command Topic message's payload would be:

{
"session-id":"session-123456789012",
"res-topic":"cmd/hvac/building3/floor2/res",
"value":"1"
}


## Topic for telemetry

Telemetry is read-only data that is transmitted by a device and aggregated elsewhere.

A temperature sensor reading might be published by the ESP8266 using this topic 

**dt/hvac/building3/floor2/confroom2/thing1/temperature**

the temperature units might be published using this topic

**dt/hvac/building3/floor2/confroom2/thing1/temperature/units**

A humidity sensor reading might be published by the ESP8266 using this topic

**dt/hvac/building3/floor2/confroom2/thing1/humidity**

How often an ESP8266 should publish a value depend on the application. The device could publish an update every few minutes, every few seconds or every time the value changes.


## Data subscriptions

While telemetry messages are being published to the MQTT server client applications can subscribe to individual topics or to multiple topics using wildcards.

The # wildcard matches multiple topic name levels. 

The + wildcard matches a single topic name level.

![](/assets/images/internetofthings2/screen-shot-2021-03-07-at-3.27.31-pm-1836x938.png)
*Humidity sensor readings from 2nd floor of building 3.*
