---
type: post
slug: fabriclakehouse3
title: "Microsoft Fabric (Part 3)"
date: "2026-11-27"
part: 3
builds_on: ["fabriclakehouse", "fabriclakehouse2", "internetofthings1", "internetofthings2", "internetofthings4"]
topics: ["real-time-analytics", "kusto-query-language", "event-streaming", "data-latency"]
tools: ["Microsoft Fabric", "Eventhouse", "Eventstream", "Kusto Query Language", "SQL analytics endpoint", "Power BI"]
status: current
checked: "2026-11-27"
source_hash: "01617ce28c90"
generated_by: gemma4:12b
---

**Summary.** I explored the use of an Eventhouse to process a continuous stream of bike-share events. I compared the performance of KQL queries against the SQL analytics endpoint to measure the latency of data moving into OneLake.

## What I did
- I streamed a sample bike-share feed into an Eventhouse.
- I queried the data using Kusto Query Language (KQL) as it arrived.
- I enabled OneLake availability to expose the data to the SQL analytics endpoint.
- I timed the delay between the Eventhouse and the SQL endpoint.
- I built a live dashboard to visualize the incoming data.

## Claims
- An Eventhouse is designed for high-frequency data like logs and sensor readings.
  > "An Eventhouse is a Fabric item for events that carry a time stamp, such as logs, telemetry and sensor readings."
- I used a sample feed that Fabric generates automatically.
  > "This is a sample feed that Fabric generates itself, so I wrote none of it."
- The Eventhouse was significantly ahead of the SQL analytics endpoint during my tests.
  > "The Eventhouse was about 1,800 rows ahead of the lake after two minutes."
- I reduced the default batch wait time for the OneLake copy to five minutes.
  > "The default delay is long, so at 13:36:48 I set the minimum of 5 minutes on the table with a KQL command."
- The dashboard automatically refreshes its tiles when new data is ingested.
  > "It refreshes the tiles when new data is ingested, and a message warned me that it may use capacity."
- I was able to query rows within seconds of arrival, which the Lakehouse could not do.
  > "I queried rows within seconds of their arrival, which I could not do with the Lakehouse in Part 1."

## Outcome
I built a live dashboard that displays bike-share data in real-time. I confirmed that the Eventhouse allows for near-instant querying while the SQL endpoint follows behind as a batch process.

## Caveats
The post does not show the internal mechanics of the KQL data connection configuration beyond the basic setup steps.
