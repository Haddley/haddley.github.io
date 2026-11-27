---
type: post
slug: internetofthings4
title: "Internet of Things (Part 4)"
date: "2026-11-27"
part: 4
builds_on: ["fabriclakehouse3", "internetofthings1", "internetofthings2"]
topics: ["iot-architecture", "data-pipeline-comparison", "time-series-databases", "data-ingestion-latency"]
tools: ["Microsoft Fabric", "Mosquitto", "Node-RED", "InfluxDB", "Grafana", "Postgres"]
status: current
checked: "2026-11-27"
source_hash: "ef8ffa564e1f"
generated_by: gemma4:12b
---

**Summary.** I rebuilt the pipeline from my Fabric Part 3 post using an open-source stack of Mosquitto, Node-RED, InfluxDB, and Grafana. I compared the two systems across metrics like setup effort, query speed, and data delivery to see where they align and where they differ.

## What I did
- I rebuilt the bike-share data pipeline using an open-source stack.
- I simulated 120 real stations sending data every 10 seconds.
- I measured query times and data delivery for both systems.
- I compared the infrastructure requirements and operational differences.

## Claims
- The open-source stack and Fabric share a nearly identical architectural shape.
  > "The mapping from the Part 3 steps to this build is close to one for one."
- The open-source system stored data within 45 milliseconds of the sender finishing.
  > "With Mosquitto, nothing was lost and each burst was stored within 45 milliseconds of being sent."
- Query speeds were comparable in both systems at a scale of 10,000 rows.
  > "At about 10,000 rows, queries took a few milliseconds in both places, so speed does not separate them here."
- Fabric hides the complexity of managing storage and creating secondary copies.
  > "Fabric hid two things I had to build myself: the copy into another engine, and the storage."
- The open-source setup required more manual configuration and coding than the Fabric setup.
  > "This took writing 410 lines of files and fixing port clashes and a sleeping laptop."
- The first run of the open-source system took 76 seconds to pull images.
  > "The first start pulled the images, which took 76 seconds."

## Outcome
I concluded that while both systems share the same logical flow, Fabric simplifies the management of storage and secondary data copies.

## Caveats
The comparison does not account for differences in cost, reliability, or scale since both systems were tested on a single machine for a short duration.
