---
type: post
slug: modeldriven3
title: "Model Driven Apps (Part 3)"
date: "2023-10-08"
part: 3
builds_on: [componentframework]
topics: [model-driven-apps, javascript-integration, business-process-flows, web-resources]
tools: [Power Apps, Dynamics 365, JavaScript, Power Apps Component Framework]
status: current
checked: "2026-11-05"
source_hash: "36b2d0e6b0e0"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to use JavaScript to extend the functionality of a model driven app. I specifically show how to automate business process flow stages and manipulate form fields.

## What I did
- I used JavaScript to extend a model driven app.
- I configured the app to call functions on form events and button clicks.
- I used specific methods to move through business process flow stages.
- I added a Clone button to the command bar to copy records.
- I uploaded and published the code as a Web resource.

## Claims
- I used JavaScript to extend a model driven app.
  > "I used JavaScript to extend a model driven app."
- I used specific methods to move through business process flow stages from the browser console.
  > "I used `Xrm.Page.data.process.moveNext()` and `Xrm.Page.data.process.movePrevious()` to update a Business Process Flow stage from the browser console."
- I used specific methods to read and update field values.
  > "I used `Xrm.Page.getAttribute('nh_businessneed').getValue()` and `.setValue('Hello')` to read and update a field value."
- I added a Clone button to the command bar to copy records.
  > "I added a Clone button to a model driven app's form command bar and used JavaScript to implement the record copying functionality"
- The execution context is not passed to a JavaScript handler function in the Modern Command Designer.
  > "Notice that in the Modern Command Designer the execution context is not passed to a JavaScript handler function as a parameter."

## Outcome
I built a system where JavaScript handles form logic, updates business process stages, and enables record cloning.

## Caveats
The post does not show how to handle complex logic within the Power Apps Component Framework.
