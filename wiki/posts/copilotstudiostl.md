---
type: post
slug: copilotstudiostl
title: "I Asked a Microsoft Copilot Harness Agent to Turn a Gingerbread Man into an STL File"
date: "2026-11-26"
builds_on: ["claudecode17", "deepseekharness", "3dprinting3"]
topics: ["copilot-studio", "3d-printing", "pay-as-you-go-billing", "image-to-stl"]
tools: ["Microsoft Copilot Studio", "Microsoft Copilot harness", "Bambu Studio", "Bambu Lab P1S", "Azure", "Power Platform"]
status: current
checked: "2026-11-26"
source_hash: "42a4648a5133"
generated_by: gemma4:12b
---

**Summary.** I built a custom agent in Copilot Studio to convert photos of a gingerbread man into 3D printable STL files. The process required setting up a pay-as-you-go billing plan to bypass credit limits and successfully produced two different textured models.

## What I did
- I created an agent in Copilot Studio with a single line of instructions.
- I configured a pay-as-you-go billing plan in the Power Platform admin center.
- I generated two STL files from two photos of a gingerbread man.
- I sliced and printed the textured STL file using a Bambu Lab P1S.

## Claims
- The agent produced two different STL files from the same input.
  > "It made **two** STL models and a preview image."
- The agent guessed the thickness of the object because it was not visible in the photos.
  > "It guessed the thickness at 8 mm, because neither photo showed the cookie from the side."
- The agent used a ruler in the photos to determine the scale of the object.
  > "It measured the length and width from the ruler in the photos."
- The first attempt failed because the environment lacked sufficient credits.
  > "The message said that the environment was out of credits, and gave the error code `EnforcementUsageCredits`."
- The textured file added a pitted surface depth of 0.8 mm.
  > "The other, the textured one, added the pitted, crumbly surface from my photo, up to 0.8 mm deep."
- The print job required approximately 34 minutes and 33 seconds of print time.
  > "The slicer reported 2.85 m of filament, 8.64 g and a total time of 34 minutes and 33 seconds, for a cost of 0.14."

## Outcome
I built a functional agent that converts 2D images into 3D printable files. I also confirmed that the Microsoft Copilot harness is a viable path for this task when configured with proper billing.

## Caveats
The published demo website does not allow for file uploads, so the generation process must be performed within the Copilot Studio preview chat.
