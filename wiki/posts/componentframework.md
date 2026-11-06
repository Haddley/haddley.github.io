---
type: post
slug: componentframework
title: "Component Framework"
date: "2022-08-14"
builds_on: [customcomponents]
topics: [power-apps-component-framework, model-driven-apps, canvas-apps, custom-controls]
tools: [Power Apps, Visual Studio, Power Platform Tools, npm, webpack, React]
status: current
checked: "2026-11-05"
source_hash: "e242ac11f459"
generated_by: gemma4:12b
---

**Summary.** I explain how to use the Power Apps component framework to build custom code components. I demonstrate the process of creating, importing, and adding these components to both model-driven and canvas apps.

## What I did
- I enabled the Power Apps component framework.
- I installed the Power Platform Tools Visual Studio Extension.
- I initialized a new component using the command line.
- I authenticated and pushed the component to the environment.
- I integrated the component into the application forms.

## Claims
- The framework allows developers to add custom code to both types of Power Apps.
  > "Developers can use Power Apps component framework to create, import, and add code components to model-driven and canvas apps."
- Some specific APIs are not available for use.
  > "Certain APIs are not available."
- I used a React template to initialize the component.
  > "*I ran pac pcf init --namespace haddley --name virtualcontrol --template field --framework react*"
- I added the component to support multiple device types.
  > "*I added a code component for Web, Mobile and Tablet displays*"

## Outcome
I built a custom code component and integrated it into the Information form. I verified the functionality of the code control on the Account form.

## Caveats
The post notes that certain APIs are not available.
