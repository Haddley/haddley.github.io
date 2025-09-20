---
title: "Internet of Things (Part 1)"
description: "A comprehensive guide covering internet of things (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/internetofthings1/hero.png"
tags: ["docker","ai","git","github"]
---

# Internet of Things (Part 1)

## ESP8266 is a low-cost Wi-Fi microchip, with a full TCP/IP stack and microcontroller capability.

![Electron](/assets/images/internetofthings1/iot-microchip.svg)
*iot microchip by Philipp Petzka is licensed under CC*


## Breadboard

Here an ESP8266 device is connected to a DHT11 temperature and humidity sensor.

With the Hardware assembled we can create and configure the Internet of Things (IoT) software.

An MQTT publish/subscribe broker will be at the center of the software configuration. We will upload code to the ESP8266 that will allow the ESP8266 device to communicate with other devices via the MQTT broker.

![esp8266](/assets/images/internetofthings1/esp8266-512x384.png)
*ESP8266 with DHT Sensor*


## Arduino IDE setup

The Arduino Integrated Development Environment (IDE) can be used to create and upload C++ code to an ESP8266.

To add support for ESP8266 boards to the Arduino IDE select the "Arduino|Preferences..." menu item and add this url to the "additional boards manager" text box:

http://arduino.esp8266.com/stable/package_esp8266com_index.json

![](/assets/images/internetofthings1/screen-shot-2021-03-06-at-9.23.14-pm-1592x1116.png)
*Arduino IDE Preferences*


## Support for the ESP8266 board

Use the "Tools|Board|Boards Manager..." menu item to install support for the ESP8266 boards.

![](/assets/images/internetofthings1/screen-shot-2021-03-06-at-9.28.06-pm-1108x122.png)
*Boards Manager...*

![](/assets/images/internetofthings1/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*Boards package*


## GitHub boards

The ESP8266 boards information is maintained in a GitHub repository

[https://github.com/esp8266/Arduino](https://github.com/esp8266/Arduino)

Once the boards package is installed the correct ESP8266 board can be selected.

![](/assets/images/internetofthings1/screen-shot-2021-03-06-at-9.36.46-pm-1512x318.png)
*Selecting "NodeMCU (ESP-12E Module)"*


## ESP8622 Libraries

Arduino libraries can downloaded to the Arduino IDE using the "Tools|Manage Libraries..." menu item.

The PubSubClient library allows the ESP8266 to connect to an MQTT broker.

![](/assets/images/internetofthings1/screen-shot-2021-03-06-at-9.55.43-pm-1596x902.png)
*PubSubClient Library*


## PubSubLibrary example

[knolleary/pubsubclient](https://github.com/knolleary/pubsubclient) is licensed under the MIT License.

Once the PubSubClient Library is installed the mqtt_esp8266 example sketch is added to the "File|Examples" Menu.

![](/assets/images/internetofthings1/screen-shot-2021-03-06-at-9.58.23-pm-906x374.png)
*An example ESP8266 sketch*


## The mqtt_esp8266 example sketch

The mqtt_esp8266 example sketch subscribes to an MQTT server's "inTopic" messages.

When an "inTopic" message is received by the ESP8266 the example code's "callback" function is executed. If the payload of the "inTopic" message is the string "1" the ESP8266's builtin LED is turned on.

Every two seconds the example sketch publishes a "hello world" message to "outTopic".


## MQTT

MQTT is a publish/subscribe messaging system commonly used by IoT devices.

The 'eclipse-mosquitto' Docker container image can be used to establish a test MQTT broker.

**$ docker run -it -p 1883:1883 -p 9001:9001 eclipse-mosquitto:1.4.8**

![eclipse-mosquitto](/assets/images/internetofthings1/screen-shot-2021-03-04-at-5.36.09-pm-1132x734.png)
*eclipse-mosquitto Docker image*


## MQTT Explorer

Desktop and mobile applications are able to connect to an MQTT broker showing messages that are being published. Desktop and mobile applications allow users to manually publish messages to an MQTT broker.

![](/assets/images/internetofthings1/screen-shot-2021-03-04-at-6.25.29-pm-1836x1286.png)
*MQTT Explorer connecting to the MQTT broker*

![](/assets/images/internetofthings1/screen-shot-2021-03-06-at-11.11.07-pm-622x362.png)
*ESP8266 is publishing "outTopic" messages to the MQTT broker*

![](/assets/images/internetofthings1/screen-shot-2021-03-06-at-11.21.28-pm-1616x930.png)
*MQTT explorer publishes an "inTopic" message with payload "1" to the MQTT broker and the ESP8266's LED turns on.*
