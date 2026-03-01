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

## Fixing my Vision with Claude Code

```PROMPT
I have been prescribed glasses that help me to see properly (without leaning my head towards my left shoulder) Add a feature that allows me to adjust the feed to my left and right eyes so that I am less tempted to lean my head. Show a spirit level that lets me see how horizontal my head/eye position is Here is the prescription Right Eye (OD): 5.50 Prism Diopters Base Down + 1.0 Prism Diopter Base Out.
Left Eye (OS): 5.50 Prism Diopters Base Up + 1.0 Prism Diopter Base Out.
```

![](assets/images/metaunity/Screenshot-2026-03-01-at-10.13.46-AM.png)
*I reviewed Claude Code's plan for PrismVisionCorrection + SpiritLevel and selected Yes, and auto-accept*

![](assets/images/metaunity/Screenshot-2026-03-01-at-10.14.42-AM.png)
*I reviewed the prism math and spirit level implementation details*

![](assets/images/metaunity/Screenshot-2026-03-01-at-10.15.20-AM.png)
*I reviewed the implementation steps and verification checklist*

![](assets/images/metaunity/Screenshot-2026-03-01-at-10.16.59-AM.png)
*Claude Code completed the changes and summarised what was created*

![](assets/images/metaunity/Screenshot-2026-03-01-at-10.18.53-AM.png)
*I attached the Prism Vision Correction script to the Camera Rig in the Unity Editor*

![](assets/images/metaunity/642894093_1609198393659252_1924717491324295358_n.jpg)
*The spirit level at the bottom of the view showed my head tilt in real time*

## Key move

![](assets/images/metaunity/Screenshot-2026-03-02-at-6.53.20-AM.png)
*I opened PrismVisionCorrection.cs in VS Code*

```PROMPT
explain PrismVisionCorrection.cs
```

![](assets/images/metaunity/Screenshot-2026-03-02-at-7.00.32-AM.png)
*Claude Code explained how the prism correction and spirit level work*

```csharp
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;
using UnityEngine.XR;

/// <summary>
/// Applies a per-eye digital prism correction to the VR display, matching an optical
/// prism prescription, and shows a spirit-level HUD to help the user keep their head level.
///
/// HOW TO USE
/// ----------
/// 1. Let Unity import this script (it will assign a GUID and show it in the Project window).
/// 2. Select [BuildingBlock] Camera Rig in the Hierarchy.
/// 3. Click Add Component → PrismVisionCorrection.
/// 4. The Inspector fields are pre-filled with the prescription below; adjust if needed.
///
/// PRESCRIPTION PRE-LOADED
/// -----------------------
///   Right Eye (OD): 5.50 PD Base Down  + 1.00 PD Base Out
///   Left  Eye (OS): 5.50 PD Base Up    + 1.00 PD Base Out
///
/// HOW THE PRISM CORRECTION WORKS
/// --------------------------------
/// 1 prism diopter (PD) ≈ 0.01 radians of angular image deflection.
/// We shift each eye's projection-matrix frustum by tan(PD × 0.01 rad):
///   • Decreasing p[1,2] shifts the frustum DOWN  → rendered image moves UP.
///   • Increasing p[1,2] shifts the frustum UP    → rendered image moves DOWN.
///   • Decreasing p[0,2] shifts the frustum LEFT  → rendered image moves RIGHT.
///   • Increasing p[0,2] shifts the frustum RIGHT → rendered image moves LEFT.
/// The hook fires via RenderPipelineManager.beginCameraRendering (URP-compatible).
/// </summary>
[RequireComponent(typeof(OVRCameraRig))]
public class PrismVisionCorrection : MonoBehaviour
{
    // ── Prescription ──────────────────────────────────────────────────────────

    [Header("Right Eye (OD)")]
    [Tooltip("Base Down: positive value shifts this eye's image UP. Prism diopters.")]
    public float rightVerticalPD   = 5.5f;
    [Tooltip("Base Out: positive value shifts this eye's image toward the right temple. Prism diopters.")]
    public float rightHorizontalPD = 1.0f;

    [Header("Left Eye (OS)")]
    [Tooltip("Base Up: positive value shifts this eye's image DOWN. Prism diopters.")]
    public float leftVerticalPD   = 5.5f;
    [Tooltip("Base Out: positive value shifts this eye's image toward the left temple. Prism diopters.")]
    public float leftHorizontalPD = 1.0f;

    // ── Spirit Level ──────────────────────────────────────────────────────────

    [Header("Spirit Level")]
    [Tooltip("Show the head-tilt spirit level HUD.")]
    public bool showSpiritLevel = true;
    [Tooltip("Head roll angle (degrees) at which the bubble reaches the tube end.")]
    public float maxTiltDegrees = 15f;

    // ── Internals ─────────────────────────────────────────────────────────────

    // 1 prism diopter ≈ 0.01 radians of angular deflection.
    const float PdToRad = 0.01f;

    OVRCameraRig _rig;
    Camera       _leftCam;
    Camera       _rightCam;

    // Spirit level UI
    RectTransform _bubble;
    Image         _bubbleImg;
    Text          _rollLabel;
    float         _bubbleHalfTravel; // canvas units the bubble can move each side

    // ── Lifecycle ─────────────────────────────────────────────────────────────

    void Awake()
    {
        _rig = GetComponent<OVRCameraRig>();
        // Per-eye cameras are disabled by default. Enabling them gives us separate
        // Camera objects per eye so we can set independent projection matrices.
        _rig.usePerEyeCameras = true;
    }

    void Start()
    {
        _leftCam  = _rig.leftEyeCamera;
        _rightCam = _rig.rightEyeCamera;

        if (showSpiritLevel)
            BuildSpiritLevel(_rig.centerEyeAnchor);
    }

    void OnEnable()
    {
        RenderPipelineManager.beginCameraRendering += OnBeginCameraRendering;
    }

    void OnDisable()
    {
        RenderPipelineManager.beginCameraRendering -= OnBeginCameraRendering;
    }

    // ── Prism correction ─────────────────────────────────────────────────────

    // Called by URP just before each camera renders — after OVR has set the
    // projection matrix — so our offsets override whatever OVR wrote.
    void OnBeginCameraRendering(ScriptableRenderContext _, Camera cam)
    {
        if (cam == _rightCam)
        {
            Matrix4x4 p = cam.projectionMatrix;
            // Base Down  → image UP   → frustum shifts DOWN  → p[1,2] decreases
            p[1, 2] -= Mathf.Tan(rightVerticalPD   * PdToRad);
            // Base Out   → image RIGHT → frustum shifts LEFT  → p[0,2] decreases
            p[0, 2] -= Mathf.Tan(rightHorizontalPD * PdToRad);
            cam.projectionMatrix = p;
        }
        else if (cam == _leftCam)
        {
            Matrix4x4 p = cam.projectionMatrix;
            // Base Up    → image DOWN  → frustum shifts UP    → p[1,2] increases
            p[1, 2] += Mathf.Tan(leftVerticalPD   * PdToRad);
            // Base Out   → image LEFT  → frustum shifts RIGHT → p[0,2] increases
            p[0, 2] += Mathf.Tan(leftHorizontalPD * PdToRad);
            cam.projectionMatrix = p;
        }
    }

    // ── Spirit Level update ───────────────────────────────────────────────────

    void Update()
    {
        if (_bubble == null) return;

        float roll = GetHeadRollDegrees();

        // Bubble moves like a real spirit level: toward the raised/higher side.
        float t = Mathf.Clamp(roll / maxTiltDegrees, -1f, 1f);
        _bubble.anchoredPosition = new Vector2(-t * _bubbleHalfTravel, 0f);

        // Colour: green (level) → amber → red (tilted)
        float severity = Mathf.Abs(t);
        Color green  = new Color(0.10f, 0.85f, 0.25f, 0.90f);
        Color amber  = new Color(1.00f, 0.65f, 0.00f, 0.90f);
        Color red    = new Color(0.90f, 0.15f, 0.15f, 0.90f);
        _bubbleImg.color = severity < 0.4f
            ? Color.Lerp(green, amber, severity / 0.4f)
            : Color.Lerp(amber, red,   (severity - 0.4f) / 0.6f);

        if (_rollLabel != null)
            _rollLabel.text = string.Format("Head tilt  {0:+0.0;-0.0;0.0}\u00b0   (0\u00b0 = level)", roll);
    }

    // ── Spirit Level construction ─────────────────────────────────────────────

    void BuildSpiritLevel(Transform eyeAnchor)
    {
        // Root: world-space Canvas parented to the centre eye — tracks the head.
        var root = new GameObject("SpiritLevel");
        root.transform.SetParent(eyeAnchor, false);
        root.transform.localPosition = new Vector3(0f, -0.20f, 0.65f);
        root.transform.localScale    = Vector3.one * 0.0008f;

        var canvas = root.AddComponent<Canvas>();
        canvas.renderMode  = RenderMode.WorldSpace;
        canvas.sortingOrder = 10;
        var rootRT = root.GetComponent<RectTransform>();
        rootRT.sizeDelta = new Vector2(540f, 110f);

        // Tube (dark background track)
        const float TubeW = 500f, TubeH = 44f;
        var tube = MakePanel(root.transform, "Tube", TubeW, TubeH, Vector2.zero,
                             new Color(0.10f, 0.10f, 0.12f, 0.88f));

        // Centre target tick (green vertical line)
        MakePanel(tube.transform, "CentreTick", 3f, TubeH + 14f, Vector2.zero,
                  new Color(0f, 1f, 0f, 0.95f));

        // Bubble
        const float BubbleW = 48f;
        var bubbleGO      = MakePanel(tube.transform, "Bubble", BubbleW, TubeH - 8f, Vector2.zero,
                                      new Color(0.2f, 0.8f, 1f, 0.90f));
        _bubble           = bubbleGO.GetComponent<RectTransform>();
        _bubbleImg        = bubbleGO.GetComponent<Image>();
        _bubbleHalfTravel = (TubeW - BubbleW) * 0.5f;

        // Degree readout beneath the tube
        var labelGO = new GameObject("RollLabel");
        labelGO.transform.SetParent(root.transform, false);
        var labelRT = labelGO.AddComponent<RectTransform>();
        labelRT.sizeDelta        = new Vector2(540f, 42f);
        labelRT.anchoredPosition = new Vector2(0f, -52f);
        _rollLabel           = labelGO.AddComponent<Text>();
        _rollLabel.font      = BuiltinFont();
        _rollLabel.fontSize  = 26;
        _rollLabel.alignment = TextAnchor.MiddleCenter;
        _rollLabel.color     = new Color(0.92f, 0.92f, 0.92f, 0.92f);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    /// <summary>
    /// Returns head roll in degrees. Positive = head tilted right (right ear lower).
    /// </summary>
    static float GetHeadRollDegrees()
    {
        var devices = new List<InputDevice>();
        InputDevices.GetDevicesAtXRNode(XRNode.Head, devices);
        if (devices.Count > 0 &&
            devices[0].TryGetFeatureValue(CommonUsages.deviceRotation, out Quaternion rot))
        {
            float z = rot.eulerAngles.z;
            if (z > 180f) z -= 360f;
            // Unity positive-Z rotation = head tilts left.
            // Negate so positive return value = tilted right.
            return -z;
        }
        return 0f;
    }

    static GameObject MakePanel(Transform parent, string name,
                                 float w, float h, Vector2 pos, Color color)
    {
        var go = new GameObject(name);
        go.transform.SetParent(parent, false);
        var rt = go.AddComponent<RectTransform>();
        rt.sizeDelta        = new Vector2(w, h);
        rt.anchoredPosition = pos;
        go.AddComponent<Image>().color = color;
        return go;
    }

    static Font BuiltinFont()
    {
        Font f = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
        if (f == null) f = Resources.GetBuiltinResource<Font>("Arial.ttf");
        return f;
    }
}

```

## References

- [Unity Hello World for Meta Quest VR headsets](https://developers.meta.com/horizon/documentation/unity/unity-tutorial-hello-vr/?fbclid=IwY2xjawQPgEhleHRuA2FlbQIxMABicmlkETExWHlXUjlTTHZoU0NCSHc1c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHt6YQvbj1aGkotvkxp3-7LsJVtp8ms9JqOgqA9vEr7GZwqCfYiIbKrZ0jCWn_aem_FvRM0_3JX8Pakzaj7ORUAA)

- [Passthrough basic tutorial](https://developers.meta.com/horizon/documentation/unity/unity-passthrough-tutorial/)

- [Prisms](https://www.ncbi.nlm.nih.gov/books/NBK580488/)