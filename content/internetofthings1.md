---
title: "Internet of Things (Part 1)"
description: "ESP8266 is a low-cost Wi-Fi microchip, with a full TCP/IP stack and microcontroller capability."
date: "2021-03-03"
categories: ["DevOps"]
tags: []
slug: "internetofthings1"
image: "/assets/images/iot-microchip.svg"
---

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


## mqtt_esp8266.ino

```text
/*
 Basic ESP8266 MQTT example
 This sketch demonstrates the capabilities of the pubsub library in combination
 with the ESP8266 board/library.
 It connects to an MQTT server then:
  - publishes "hello world" to the topic "outTopic" every two seconds
  - subscribes to the topic "inTopic", printing out any messages
    it receives. NB - it assumes the received payloads are strings not binary
  - If the first character of the topic "inTopic" is an 1, switch ON the ESP Led,
    else switch it off
 It will reconnect to the server if the connection is lost using a blocking
 reconnect function. See the 'mqtt_reconnect_nonblocking' example for how to
 achieve the same result without blocking the main loop.
 To install the ESP8266 board, (using Arduino 1.6.4+):
  - Add the following 3rd party board manager under "File -> Preferences -> Additional Boards Manager URLs":
       http://arduino.esp8266.com/stable/package_esp8266com_index.json
  - Open the "Tools -> Board -> Board Manager" and click install for the ESP8266"
  - Select your ESP8266 in "Tools -> Board"
*/

/**/

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.

const char* ssid = "........";
const char* password = "........";
const char* mqtt_server = "broker.mqtt-dashboard.com";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    snprintf (msg, MSG_BUFFER_SIZE, "hello world #%ld", value);
    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("outTopic", msg);
  }
}
```