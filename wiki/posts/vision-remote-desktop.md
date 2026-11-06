---
type: post
slug: vision-remote-desktop
title: "A Desktop That Rolls With My Head"
date: "2026-08-02"
builds_on: [bielschowsky]
topics: [webxr, remote-desktop, optics-software, augmented-reality]
tools: [Quest, MacBook, Node.js, WebRTC, visionOS, Safari]
status: current
checked: "2026-11-06"
source_hash: "0571848c8554"
generated_by: gemma4:12b
---

**Summary.** I built a remote desktop viewer that applies my specific prism prescription in software to accommodate a nerve palsy. The system uses a Quest headset in AR mode to display a corrected screen while allowing me to see my physical keyboard and room.

## What I did
- I developed a Node server to capture and stream a Mac screen via WebRTC.
- I implemented a WebXR page that renders the screen with specific rotation and prism offsets.
- I integrated a dynamic rotation system that tracks head roll to maintain comfort.
- I optimized the video stream to ensure text remains legible on high-resolution displays.
- I built a fallback system for visionOS to handle different environment blend modes.

## Claims
- The system uses a Quest in AR mode so I can see my physical hands and keyboard.
  > "The combination I actually work in is a MacBook and a Quest, and the reason it works is that the Quest runs it in **AR**."
- The software handles the rotational component of my prescription that glass cannot provide.
  > "What it does not carry is the *rotational* part — a prism bends light up, down or sideways, and no optic rolls a retinal image about the line of sight."
- The system uses a specific rotation of -4 degrees as a starting point for comfort.
  > "So the −4° is the best available starting point, not a result."
- I use a specific contrast reduction technique to manage how the eyes compete for detail.
  > "The newest control is a contrast reduction: it crushes one eye's image toward mid grey — what a Bangerter foil does to a spectacle lens — while leaving that eye its full field and full brightness."
- The system defaults to a right-only correction because it won on measurement.
  > "Right-only is the default because it won on measurement, not preference."
- The system automatically falls back to an opaque VR mode on visionOS.
  > "So the renderer asks for `immersive-ar`, does not get it, and falls back to `immersive-vr`, which is opaque."

## Outcome
I built a remote desktop viewer that provides a corrected visual field for my eyes while maintaining a connection to my physical workspace.

## Caveats
The post does not yet demonstrate whether the system provides sustained comfort over long periods.
