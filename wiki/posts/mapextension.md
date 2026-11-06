---
type: post
slug: mapextension
title: "Map Extension"
date: "2023-09-01"
builds_on: []
topics: [business-central-extensions, leaflet-maps, control-add-ins, al-programming]
tools: [Microsoft Dynamics 365 Business Central, Leaflet.js, ChatGPT, AL]
status: current
checked: "2026-11-05"
source_hash: "f530c09541ac"
generated_by: gemma4:12b
---

**Summary.** I built a Microsoft Dynamics 365 Business Central extension that integrates a Leaflet map to visualize customer locations. The post explains the AL code used to create the control add-in and the page extensions required to display the map on customer cards and lists.

## What I did
- I created a control add-in to integrate Leaflet maps into Business Central.
- I developed a fact box part to display the map on customer pages.
- I wrote page extensions to apply the map to both the Customer Card and Customer List.
- I used ChatGPT to help explain the AL code and verified it against the source.
- I uploaded and deployed the extension to a cloud environment.

## Claims
- The extension allows users to see customer locations on a map.
  > "I built a Microsoft Dynamics 365 Business Central Extension that allows users to view Customer locations in a map."
- The code defines a control add-in to integrate external web content.
  > "Control add-ins are used to integrate external controls or web content into Business Central pages."
- The map updates automatically when a user selects a different customer.
  > "The JavaScript then draws the map for that customer, which is why the map moves when I select a different customer."
- The map appears on both the Customer Card and the Customer List because of two specific page extensions.
  > "A: There are two page extensions, one for each page, and each adds the same fact box part."
- I verified the AI generated explanation against the actual code before using it.
  > "It is a useful way to read unfamiliar code, but an AI explanation can be wrong, so I compared each part with the code in the post before I relied on it."
- The extension is available as a downloadable file for deployment.
  > "Map Extension"

## Outcome
I built a functional map extension that provides a visual way for users to see where customers are located. The system successfully renders a dynamic map that updates based on the selected customer record.

## Caveats
The post does not detail the specific internal logic of the custom LeafletMapsFunctions.js file.
