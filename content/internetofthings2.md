---
title: "Internet of Things (Part 2)"
description: "Node-RED can publish messages to a MQTT broker and subscribe to MQTT topics."
date: "2025-09-20"
category: "Development"
image: "/assets/images/internetofthings2/hero.png"
tags: ["docker"]
---

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


## mqtt_esp8266_topic_structure.ino

```text
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* THING_NAME = "thing1";

const char* ssid = "<WIFI NAME>";
const char* password = "<WIFI PASSWORD>"
const char* mqtt_server = "<MQTT BROKER ADDRESS>";
const int CONNECTED_FAN = 4; // GOIP D2

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void setup_wifi() {

  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

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

  String strTopic(topic);
  if (strTopic.endsWith("/builtinled")) {
    if ((char)payload[0] == '1') {
      digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    } else {
      digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
    }
  }
  if (strTopic.endsWith("/fan")) {
    if ((char)payload[0] == '1') {
      digitalWrite(CONNECTED_FAN, LOW);   // Turn the FAN off
    } else {
      digitalWrite(CONNECTED_FAN, HIGH);  // Turn the FAN on
    }
  }


}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

    // Create a "thing name"/client ID
    String strThingName(THING_NAME);
    String fullpathThingName = "cmd/hvac/building3/floor2/confroom2/"+strThingName+"/+";

    // Attempt to connect
    if (client.connect(THING_NAME)) {
      Serial.println("connected");
      // resubscribe
      client.subscribe(fullpathThingName.c_str());
      client.subscribe("cmd/hvac/building3/floor2/confroom2/+");
      client.subscribe("cmd/hvac/building3/floor2/+");
      client.subscribe("cmd/hvac/building3/+");
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
  pinMode(CONNECTED_FAN, OUTPUT);   // Initialize CONNECTED_FAN  - GOIP D2 - as an output
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

}
```

## mqtt_esp8266_topic_structure_telemetry.ino

```text
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

const char* THING_NAME = "thing1";

// Create a "thing name"/client ID
static String strThingName(THING_NAME);

const char* ssid = "<WIFI NAME>";
const char* password = "<WIFI PASSWORD>"
const char* mqtt_server = "<MQTT BROKER ADDRESS>";
const int CONNECTED_FAN = 4; // GOIP D2

#define DHTTYPE DHT11   // DHT 11
// DHT Sensor
const int DHTPin = 5; // GPIO D1
// Initialize DHT sensor.
DHT dht(DHTPin, DHTTYPE);

// Temporary variables
static char celsiusTemp[7];
static char fahrenheitTemp[7];
static char humidityTemp[7];

#define  FLT_MIN   1.17549435E-38F

static float h_old = FLT_MIN;
static float t_old = FLT_MIN;

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];

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

  String strTopic(topic);
  if (strTopic.endsWith("/builtinled")) {
    if ((char)payload[0] == '1') {
      digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    } else {
      digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
    }
  }
  if (strTopic.endsWith("/fan")) {
    if ((char)payload[0] == '1') {
      digitalWrite(CONNECTED_FAN, LOW);   // Turn the FAN off
    } else {
      digitalWrite(CONNECTED_FAN, HIGH);  // Turn the FAN on
    }
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

    String fullpathThingName = "cmd/hvac/building3/floor2/confroom2/" + strThingName + "/+";

    // Attempt to connect
    if (client.connect(THING_NAME)) {
      Serial.println("connected");
      // resubscribe
      client.subscribe(fullpathThingName.c_str());
      client.subscribe("cmd/hvac/building3/floor2/confroom2/+");
      client.subscribe("cmd/hvac/building3/floor2/+");
      client.subscribe("cmd/hvac/building3/+");
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
  pinMode(CONNECTED_FAN, OUTPUT);
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
  if (now - lastMsg > 5000) {

    // SENSOR READ START

    // Sensor readings may also be up to 5 seconds 'old' (its a very slow sensor)
    float h = dht.readHumidity();
    // Read temperature as Celsius (the default)
    float t = dht.readTemperature();
    // Read temperature as Fahrenheit (isFahrenheit = true)
    float f = dht.readTemperature(true);
    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t) || isnan(f)) {
      Serial.println("Failed to read from DHT sensor!");
      strcpy(celsiusTemp, "Failed");
      strcpy(fahrenheitTemp, "Failed");
      strcpy(humidityTemp, "Failed");
    }
    else {
      // Computes temperature values in Celsius + Fahrenheit and Humidity
      float hic = dht.computeHeatIndex(t, h, false);
      dtostrf(hic, 6, 2, celsiusTemp);
      float hif = dht.computeHeatIndex(f, h);
      dtostrf(hif, 6, 2, fahrenheitTemp);
      dtostrf(h, 6, 2, humidityTemp);
      // You can delete the following Serial.print's, it's just for debugging purposes
      Serial.print("Humidity: ");
      Serial.print(h);
      Serial.print(" %\t Temperature: ");
      Serial.print(t);
      Serial.print(" *C ");
      Serial.print(f);
      Serial.print(" *F\t Heat index: ");
      Serial.print(hic);
      Serial.print(" *C ");
      Serial.print(hif);
      Serial.println(" *F");

      if (h != h_old) {
        String fullpathThingNameHumidity = "dt/hvac/building3/floor2/confroom2/" +
                                           strThingName + "/humidity";
        client.publish(fullpathThingNameHumidity.c_str(), humidityTemp);
        h_old = h;
      }
      if (t != t_old) {
        String fullpathThingNameTemperature = "dt/hvac/building3/floor2/confroom2/"
                                              + strThingName + "/temperature";
        client.publish(fullpathThingNameTemperature.c_str(), celsiusTemp);
        t_old=t;
      }
    }

    // SENSOR READ END

    lastMsg = now;
  
  }
}
```

## References

- [Designing MQTT Topics for AWS IoT Core](https://docs.aws.amazon.com/whitepapers/latest/designing-mqtt-topics-aws-iot-core/designing-mqtt-topics-aws-iot-core.html) - AWS whitepaper on MQTT topic design patterns and best practices for IoT Core implementation.

