---
title: "Leaflet"
description: "An open-source JavaScript libraryfor mobile-friendly interactive maps"
date: "2022-02-21"
categories: ["Maps"]
tags: "gis"
slug: "leaflet"
image: "/assets/images/leaflet/leaflet-upic-200x200.png"
---



Leaflet is an open-source Geographic Information System (GIS) JavaScript library for mobile-friendly interactive maps. 

Leaflet has all the mapping features most developers need.


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


## index.html

```text
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

## index.html

```text
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>

</head>

<body>
    <div id="map" style="height: 100vh"></div>

    <script>
        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg').addTo(map);
    </script>
</body>

</html>
```

## map.html

```text
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script>
        function lon2tile(lon, zoom) { return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom))); }
        function lat2tile(lat, zoom) { return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))); }
    </script>
</head>

<body>
    <img id="tile">

    <script>
        const latlng = [51.505, -0.09]
        const zoom = 13

        const z = zoom
        y = lat2tile(latlng[0], zoom)
        x = lon2tile(latlng[1], zoom)

        const url = `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}.jpg`
        document.getElementById("tile").src = url
    </script>
</body>

</html>
```

## map.html

```text
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script>
        function lon2tile(lon, zoom) { return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom))); }
        function lat2tile(lat, zoom) { return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))); }
    </script>
</head>

<body>
    <div id="map" style="position: relative;">

        <script>

            // [HOW FAR NORTH, HOW FAR WEST]
            const latlngnorthwest = [51.51, -0.08]
            const latlngsoutheast = [51.503, -0.047]

            const zoom = 13

            const north_edge = latlngnorthwest[0]
            const west_edge = latlngnorthwest[1]
            const south_edge = latlngsoutheast[0]
            const east_edge = latlngsoutheast[1]

            const top_tile = lat2tile(north_edge, zoom);
            const left_tile = lon2tile(west_edge, zoom);
            const bottom_tile = lat2tile(south_edge, zoom);
            const right_tile = lon2tile(east_edge, zoom);

            console.log({ top_tile, left_tile, bottom_tile, right_tile })

            const width = Math.abs(left_tile - right_tile) + 1;
            const height = Math.abs(top_tile - bottom_tile) + 1;

            const total_tiles = width * height; // -> eg. 377

            console.log({ width, height, total_tiles })

            const tileSize = 256

            document.getElementById("map").style.width = tileSize * width + "px";
            document.getElementById("map").style.height = tileSize * height + "px";

            let innerHTML = ""

            for (let top = 0; top < height; top++) {
                for (let left = 0; left < width; left++) {
                    toptobottom = top_tile + top
                    lefttoright = left_tile + left

                    innerHTML += `<img style="position:absolute;top:${top * tileSize}px;left:${left * tileSize}px;height:${tileSize}px;width:${tileSize}px" src=https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${toptobottom}/${lefttoright}.jpg>`
                }
            }
            document.getElementById("map").innerHTML = innerHTML

        </script>
</body>

</html>
```

## index.html

```text
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>

</head>

<body>
    <div id="map" style="height: 100vh"></div>

    <script>
        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg').addTo(map);

        var polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(map);

    </script>
</body>

</html>
```

## index.html

```text
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>

</head>

<body>
    <div id="map" style="height: 100vh"></div>

    <script>

        L.LocationSelect = L.Control.extend({
            options: {
                position: 'topright',
                locations: []
            },
            onAdd: function (map) {
                this.div = L.DomUtil.create('div', 'leaflet-siteselect-container');
                this.select = L.DomUtil.create('select', 'leaflet-siteselect', this.div);
                var content = '';

                var locationKeys = Object.keys(this.options.locations)
                for (let key in locationKeys) {
                    content += '<option>' + locationKeys[key] + '</option>';
                }

                this.select.innerHTML = content;
                this.select.onmousedown = L.DomEvent.stopPropagation;
                return this.div;
            },

            on: function (type, handler) {
                if (type == 'change') {
                    this.onChange = handler;
                    L.DomEvent.addListener(this.select, 'change', this._onChange, this);
                } else if (type == 'click') { //don't need this here probably, but for convenience?
                    this.onClick = handler;
                    L.DomEvent.addListener(this.select, 'click', this.onClick, this);
                } else {
                    console.log('LocationSelect - cannot handle ' + type + ' events.')
                }
            },

            _onChange: function (e) {
                var selectedLocation = this.select.options[this.select.selectedIndex].value;
                e.details = this.options.locations[selectedLocation];
                this.onChange(e);
            }
        })

        L.locationSelect = function (id, options) {
            return new L.LocationSelect(id, options);
        }

    </script>

    <script>

        const locations = {
            "London": { latlng: [51.5283063, -0.3824737], zoom: 9 },
            "Auckland": { latlng: [-36.8594804, 174.4252343], zoom: 9 },
            "Sydney": { latlng: [-33.8473567, 150.6517868], zoom: 9 },
            "New York": { latlng: [40.6976701, -74.2598693], zoom: 9 }
        }

        const startcity = "London"
        var map = L.map('map').setView(locations[startcity].latlng, locations[startcity].zoom);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        var select = L.locationSelect({ position: 'topright', locations }).addTo(map);

        select.on('change', function (e) {
            if (e.details === undefined) {
                return;
            }
            this._map.flyTo(e.details.latlng, e.details.zoom)
        });

    </script>
</body>

</html>
```

## References

- [Central Coast](https://haddley.github.io/leaflet/houseHunting.html)