---
type: post
slug: metaunitysetupJune2026
title: "Meta Unity Setup"
date: "2026-06-30"
builds_on: []
topics: [unity-setup, meta-quest-pro, xr-interaction-sdk, project-configuration]
tools: [Unity 6.3 LTS, Meta XR Interaction SDK, Project Setup Tool, Meta Quest Pro, OpenXR]
status: current
checked: "2026-11-05"
source_hash: "3a4d9a498ef3"
generated_by: gemma4:12b
---

**Summary.** I walk through the process of configuring Unity 6.3 LTS for Meta Quest Pro development. I demonstrate how to use the Meta XR Interaction SDK and the Project Setup Tool to resolve configuration issues and deploy a functional scene.

## What I did
- I configured Unity 6.3 LTS for Meta Quest Pro development.
- I installed the Meta XR Interaction SDK and used the Project Setup Tool to fix configuration errors.
- I utilized Building Blocks to add a Camera Rig and a Cube to the scene.
- I built and deployed a Hello World APK to my Quest Pro headset.

## Claims
- I used the Project Setup Tool to resolve multiple recommended settings for the Standalone platform.
  > "*I expanded the Recommended Items section showing 4 fixes: Enable Anisotropic Filtering, Disable hand pinch detection through OVRInput, Enable Legacy Graphics Jobs, and Use Stereo Rendering Instancing."
- I reduced the number of required fixes to one after applying the recommended settings.
  > "*I applied the recommended fixes and the count dropped to 1 remaining fix (OpenXR Plugin) with 65 Verified Items."
- I identified three required fixes when switching to the Android platform.
  > "*I switched to the Android platform in Project Setup Tool and saw 3 Required fixes and 2 Manually Fixable Items."
- I selected the OpenXR radio button in the project settings.
  > "I clicked the OpenXR radio button.*"
- I observed three enabled interaction profiles in the OpenXR settings.
  > "*I viewed the OpenXR settings showing Render Mode: Single Pass Instanced / Multi-view, the three enabled Interaction Profiles (Oculus Touch, Meta Quest Touch Pro, Meta Quest Touch Plus), and the OpenXR Feature Groups (Meta XR and All Features, both with warnings).*"
- I successfully rendered a blue cube in the headset.
  > "*I saw the scene running on the Meta Quest Pro headset: a blue cube floating in mid-air above the ground plane, with the Quest controller visible in the lower right.*"

## Outcome
I successfully deployed a Hello World APK to my Quest Pro headset featuring a visible cube and controller.

## Caveats
The post does not detail the specific fixes for the remaining OpenXR Plugin error mentioned in the setup process.
