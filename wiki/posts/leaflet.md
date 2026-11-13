---
type: post
slug: leaflet
title: "Leaflet"
date: "2022-02-21"
builds_on: []
topics: [geographic-information-systems, interactive-maps, tile-servers, javascript-libraries]
tools: [Leaflet, Visual Studio Code, Azure Storage, Safari]
status: current
checked: "2026-11-05"
source_hash: "0584e8264dbe"
generated_by: gemma4:12b
---

**Summary.** I explore the use of Leaflet, an open-source JavaScript library for creating mobile-friendly interactive maps. I demonstrate how to integrate Leaflet with tile servers and add custom controls to a map.

## What I did
- I followed a quick start tutorial to create an interactive map.
- I integrated Leaflet CSS and JavaScript into an HTML page.
- I configured the map to use tiles from arcgisonline.com.
- I deployed the map to Azure Storage to test it on multiple devices.
- I added custom elements and controls to the Leaflet map.

## Claims
- Leaflet provides the necessary features for most developers to create interactive maps.
  > "Leaflet has all the mapping features most developers need."
- I successfully viewed the map on both a laptop and an iPhone.
  > "*I viewed index.html from Azure on iPhone (Safari)*"
- Leaflet calculates the specific tile URLs based on latitude and longitude coordinates.
  > "To determine which tile is needed to display a given location leaflet needs to convert from a given latitude and longitude to a given tile url."
- Developers can create new controls by extending the L.Control class.
  > "New Leaflet controls can be created by extending L.Control."

## Outcome
I built an interactive map that displays correctly across different devices. I also demonstrated how to add custom controls and elements to the Leaflet interface.

## Caveats
The post does not detail the specific mathematical formulas used for tile coordinate conversion.
