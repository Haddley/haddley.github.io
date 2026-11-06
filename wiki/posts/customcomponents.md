---
type: post
slug: customcomponents
title: "Power Apps Custom Components"
date: "2021-07-13"
builds_on: []
topics: [power-apps-components, reusable-ui, custom-properties, event-handling]
tools: [Power Apps, Power Apps Component Library]
status: current
checked: "2026-11-05"
source_hash: "899329498d6b"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to create reusable Power Apps components to streamline development. I show how to define custom properties and events to make components interactive and modular.

## What I did
- I created a new component library.
- I adjusted the dimensions of the components.
- I added custom properties to the EditHeader component.
- I configured custom events for the icons.
- I added custom properties to the BrowseHeader and DetailHeader components.

## Claims
- I started the process by navigating to the Power Apps portal.
  > "I navigated to https://make.powerapps.com/"
- I adjusted the height of the components to 88.
  > "*I set the height of all three components from 640 to 88*"
- I added a custom property to the EditHeader component.
  > "*I added a custom property to the EditHeader component*"
- I configured the cancel icon to trigger a custom event.
  > "*I selected the IconCancel control and edited the OnSelect property so that selecting the cancel icon raises the custom OnSelectCancel event*"
- I linked the label text to the Title property.
  > "*I selected the AppName control and edited the Text property so that the value of the Title property is copied to the label text*"
- I configured the tick icon to trigger the OnSelectAccept event.
  > "*I selected the IconAccept control and edited the OnSelect property so that selecting the tick icon raises the OnSelectAccept event*"
- I added four specific properties to the BrowseHeader.
  > "{Title, OnSelectRefresh, OnSelectNewItem, OnSelectSortUpDown}"
- I added four specific properties to the DetailHeader.
  > "{Title, OnSelectBack, OnSelectDelete, OnSelectEdit}"

## Outcome
I built a set of reusable components with custom properties and events. These components allow for consistent UI elements across different screens.

## Caveats
The post does not show the specific logic for the internal functions of the BrowseHeader properties.
