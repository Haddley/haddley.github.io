---
title: "Leaflet"
description: "A comprehensive guide covering leaflet"
date: "2025-09-20"
category: "Development"
image: "/assets/images/leaflet/hero.png"
tags: ["javascript","azure","java","ai","ml"]
---

# Leaflet

## An open-source JavaScript libraryfor mobile-friendly interactive maps

![Phaser](/assets/images/leaflet/leaflet-logo-600x159.png)
*This file is licensed under the 2-Clause BSD License.*


## What is Leaflet?

Leaflet is an open-source JavaScript library for mobile-friendly interactive maps. 

Leaflet claims to have all the mapping features most developers need.


## Quick start

The Leaflet web site provides a quick start tutorial.

To follow the tutorial I created an index.html page using Visual Studio Code.

![](/assets/images/leaflet/screen-shot-2022-02-21-at-9.01.31-am-1836x610.png)
*emmet*

![](/assets/images/leaflet/screen-shot-2022-02-21-at-9.01.47-am-1836x604.png)
*template html page*


## Leaflet code

I added the leaflet css styles and javascript to create an interactive map.

The letter L is used to access Leaflet.

Here I replace the div element with id 'map' with the Leaflet map. 

**var map = L.map('map').setView([51.505, -0.09], 13);**

Here I add the arcgisonline.com tiles:

**        L.tileLayer('//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg').addTo(map);**

![](/assets/images/leaflet/screen-shot-2022-02-21-at-10.00.34-am-1836x1102.png)
*index.html from localhost*

![](/assets/images/leaflet/screen-shot-2022-02-21-at-10.07.37-am-1836x847.png)
*Deploying index.html page to Azure Storage*

![](/assets/images/leaflet/screen-shot-2022-02-21-at-10.08.45-am-1548x254.png)
*Creating a new Storage Account*

![](/assets/images/leaflet/screen-shot-2022-02-21-at-10.09.01-am-1516x232.png)
*Providing a unique name*

![](/assets/images/leaflet/screen-shot-2022-02-21-at-10.09.10-am-952x128.png)
*Storage account is created*

![](/assets/images/leaflet/screen-shot-2022-02-21-at-10.09.50-am-954x384.png)
*Browse to web site button*

![](/assets/images/leaflet/screen-shot-2022-02-21-at-10.11.31-am-1836x1106.png)
*index.html from azure to laptop*

![](/assets/images/leaflet/273975021-368817684761513-1776904781628079268-n-750x1334.jpg)
*index.html from azure to iPhone (safari)*


## Tile layer

Leaflet has to determine which tiles are needed to render the map.

The tiles are downloaded from a tile server (arcgisonline.com in this case).

![](/assets/images/leaflet/screen-shot-2022-02-21-at-10.34.22-am-1836x947.png)
*network requests*

![](/assets/images/leaflet/screen-shot-2022-02-21-at-10.35.49-am-1836x947.png)
*A single tile from arcgisonline.com*


## Calculating a tile url

To determine which tile is needed to display a given location leaflet needs to convert from a given latitude and longitude to a given tile url.

The calculations are described here:

[https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers)

Example code:

![](/assets/images/leaflet/screen-shot-2022-02-21-at-11.45.50-am-1836x981.png)
*display a given location*


## To display a given area

To determine which tiles need to be downloaded to display a given area at a given zoom level leaflet needs to convert from a pair of latitude and longitude co-ordinates to a set of tile urls.

Example code:

**var zoom        = 9;
var top_tile    = lat2tile(north_edge, zoom); // eg.lat2tile(34.422, 9);
var left_tile   = lon2tile(west_edge, zoom);
var bottom_tile = lat2tile(south_edge, zoom);
var right_tile  = lon2tile(east_edge, zoom);
var width       = Math.abs(left_tile - right_tile) + 1;
var height      = Math.abs(top_tile - bottom_tile) + 1;

// total tiles
var total_tiles = width * height; // -> eg. 377**

![](/assets/images/leaflet/screen-shot-2022-02-21-at-12.50.32-pm-1836x1228.png)
*display a given area*


## Leaflet can be used to add shapes and markers to a map

I added a triangle to a Leaflet map this code:

**var polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(map);**

![](/assets/images/leaflet/screen-shot-2022-02-21-at-12.54.28-pm-1836x1235.png)
*adding a triangle to a Leaflet map*


## Leaflet controls can be added to a map

A number of controls are included with Leaflet.

I used this code to add a scale control to a map:

**L.control.scale().addTo(map);**

![](/assets/images/leaflet/screen-shot-2022-02-21-at-12.58.04-pm-384x132.png)
*scale control*


## Creating new controls

New Leaflet controls can be created by extending L.Control.

I created a "LocationSelect" control that allows users to "fly" between locations (based on [this](https://gis.stackexchange.com/questions/327271/adding-feature-property-values-to-filter-drop-down-option-in-leaflet-instead-of/327336?noredirect=1) post)

Click [here](https://haddley.github.io/leaflet/index.html) to navigate to a [demo page](https://haddley.github.io/leaflet/index.html).

![](/assets/images/leaflet/screen-shot-2022-02-21-at-2.02.15-pm-1836x894.png)
*travel by map*
