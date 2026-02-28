---
title: "Meta Unity"
description: "Unity project for Meta Quest 3 Headset"
date: "2026-02-28"
categories: ["Mobile"]
tags: "virtual-reality, meta, unity, quest"
slug: "metaunity"
image: "/assets/images/metaunity/641532049_1193231526215322_7894490494628209553_n.jpg"
---


## Hello World

I set up Unity for Meta Quest virtual reality (VR) development. I learned how to:
- Set up a Unity 3D project that runs on Meta Quest VR headsets
- Add VR interactions to a Unity scene
- Preview my app on a Meta Quest 3

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.12.10-PM.png)
*I installed Unity Hub*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.13.16-PM.png)
*On the Add module screen, I selected the Android Build Support items in the Platforms section.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.16.15-PM.png)
*I installed Unity Assets*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.18.18-PM.png)
*I selected Projects in the left navigation bar, and clicked New project.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.18.55-PM.png)
*I selected the Universal 3D template*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.21.48-PM.png)
*I opened the project and selected Edit > Project Settings*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.22.21-PM.png)
*I selected the XR Plug-in Management menu item on the left of the Project Settings window.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.23.56-PM.png)
*I clicked Fix All*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.25.35-PM.png)
*I checked the OpenXR provider in the standalone group tab.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.25.46-PM.png)
*I checked the OpenXR provider in the Meta group tab.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.27.20-PM.png)
*In the Unity editor menu, I selected File > Build Profiles.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.28.42-PM.png)
*In the Unity Editor menu, I selected Window > Package Management > Package Manager.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.29.24-PM.png)
*I selected the Meta XR Core SDK and clicked Install.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.30.30-PM.png)
*When prompted to enable the Meta XR feature set, I selected Enable.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.30.50-PM.png)
*I confirmed that the Meta XR Core SDK was installed*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.31.53-PM.png)
*I installed the Meta XR Core SDK*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.33.52-PM.png)
*I installed the Meta XR Interaction SDK*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.37.35-PM.png)
*I installed the Meta XR Simulator*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.38.25-PM.png)
*From the top of the Unity Editor, I expanded the Meta XR Tools drop-down list, and then I selected Project Setup Tool.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.41.28-PM.png)
*I navigated to Project Settings > XR Plug-in Management > Project Validation.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.43.33-PM.png)
*I navigated to Project Settings > XR Plug-in Management > OpenXR and selected the Android tab.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.44.41-PM.png)
*In the Hierarchy pane, I deleted the Main Camera from my project’s SampleScene.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.45.13-PM.png)
*I selected Meta XR Tools > Building Blocks from the drop-down toolbar menu in the editor.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.48.04-PM.png)
*In the Building Blocks window, I found the Camera Rig Building Block, and selected the icon on the bottom right of the block to add it to the project.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.48.37-PM.png)
*I added the Camera Rig object*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.49.27-PM.png)
*In the Building Blocks window, I found the Grab Interaction Building Block, and I selected the icon on the bottom right of the block to add it to the project.*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.49.57-PM.png)
*I selected the Cube*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.50.45-PM.png)
*I updated the position of the cube*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.52.07-PM.png)
*I clicked the 'Build And Run' menu item*

![](assets/images/metaunity/Screenshot-2026-02-28-at-7.52.37-PM.png)
*I saved the file as `Hello World App.apk`*

![](assets/images/metaunity/638996873_1572551410687559_1632293592123777508_n.jpg)
*I connected my Quest 3 headset to my laptop*

![](assets/images/metaunity/642042904_1896241314585706_6220471991661231394_n.jpg)
*I used the Cast feature of the Meta mobile app to capture an image of myself grasping and moving the cube*


## Add more Cubes using Claude Code
![](assets/images/metaunity/Screenshot-2026-03-01-at-7.31.52-AM.png)
*I opened the project using Visual Studio Code and used /init to create a CLAUDE.md file*

```PROMPT
Describe the scene
```

![](assets/images/metaunity/Screenshot-2026-03-01-at-7.34.59-AM.png)
*I reviewed Claude Code's description of the scene*

```PROMPT
How can we add an extra 5 cubes to the scene?
```

![](assets/images/metaunity/Screenshot-2026-03-01-at-7.37.27-AM.png)
*I selected the 'Copies of the existing grabbable cube' option*

![](assets/images/metaunity/Screenshot-2026-03-01-at-7.40.02-AM.png)
*I clicked Yes to apply the planned update*

![](assets/images/metaunity/Screenshot-2026-03-01-at-7.41.49-AM.png)
*I clicked Yes to allow the bash command to run*

![](assets/images/metaunity/Screenshot-2026-03-01-at-7.42.34-AM.png)
*I confirmed the update was applied*

![](assets/images/metaunity/Screenshot-2026-03-01-at-7.53.13-AM.png)
*I selected the Build and Run command in Unity*

![](assets/images/metaunity/641521698_1448675780092497_3489181757260598694_n.jpg)
*I used the Quest 3 headset to grab and move the 6 cubes*

## Switch to Passthrough with Claude Code

```PROMPT
review this page https://developers.meta.com/horizon/documentation/unity/unity-passthrough-tutorial/ then update the scene to use "passthrough"
```

![](assets/images/metaunity/Screenshot-2026-03-01-at-9.22.58-AM.png)
*I clicked Yes to allow Claude Code to fetch the Meta passthrough tutorial*

![](assets/images/metaunity/Screenshot-2026-03-01-at-9.26.37-AM.png)
*I clicked Yes to apply the first SampleScene.unity edit*

![](assets/images/metaunity/Screenshot-2026-03-01-at-9.26.54-AM.png)
*I clicked Yes to apply a second SampleScene.unity edit*

![](assets/images/metaunity/Screenshot-2026-03-01-at-9.27.17-AM.png)
*Claude Code planned the 4 changes needed to enable passthrough*

![](assets/images/metaunity/Screenshot-2026-03-01-at-9.27.48-AM.png)
*I clicked Yes to allow Claude Code to insert the OVRPassthroughLayer object into the scene*

![](assets/images/metaunity/Screenshot-2026-03-01-at-9.28.11-AM.png)
*I clicked Yes to allow Claude Code to edit the AndroidManifest.xml*

![](assets/images/metaunity/Screenshot-2026-03-01-at-9.29.05-AM.png)
*Claude Code completed all 4 passthrough changes and showed a summary*

![](assets/images/metaunity/641532049_1193231526215322_7894490494628209553_n.jpg)
*The passthrough view showed the real world with blue cubes floating in my space*


## References

- [Unity Hello World for Meta Quest VR headsets](https://developers.meta.com/horizon/documentation/unity/unity-tutorial-hello-vr/?fbclid=IwY2xjawQPgEhleHRuA2FlbQIxMABicmlkETExWHlXUjlTTHZoU0NCSHc1c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHt6YQvbj1aGkotvkxp3-7LsJVtp8ms9JqOgqA9vEr7GZwqCfYiIbKrZ0jCWn_aem_FvRM0_3JX8Pakzaj7ORUAA)

- [Passthrough basic tutorial](https://developers.meta.com/horizon/documentation/unity/unity-passthrough-tutorial/)