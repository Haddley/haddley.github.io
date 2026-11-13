---
type: post
slug: webcomponents
title: "Web Components"
date: "2022-02-10"
builds_on: []
topics: [web-components, custom-elements, html-templates, web-accessibility]
tools: [Chrome, Opera, JavaScript, HTML]
status: current
checked: "2026-11-06"
source_hash: "a293640df2cd"
generated_by: gemma4:12b
---

**Summary.** I explore the history and practical implementation of Web Components as a way to create custom HTML elements. I demonstrate how to use templates, slots, and custom events to build functional components like tooltips.

## What I did
- I reviewed the historical evolution of web components from early technologies like XBL.
- I demonstrated how to use the aria-describedby attribute to link elements.
- I built a howto-tooltip Web Component using a JavaScript class.
- I showed how to use templates and slots to structure content.
- I implemented custom events and properties to make components interactive.

## Claims
- Chrome and Opera added support for Web Components in 2016.
  > "In 2016 Chrome and Opera added support for Web Components."
- The howto-tooltip Web Component uses a JavaScript class and a specific definition call.
  > "The howto-tooltip Web Component is created using a JavaScript class and defined with a window.customElements.define() call."
- Lifecycle methods manage the addition or removal of event listeners.
  > "The lifecycle methods add or remove event listeners to the described elements."
- Web Components provide an easier way to apply templates than standard JavaScript methods.
  > "An easier way to apply the template is to create a Web Component."
- I used HTML element properties to pass values to Web Components.
  > "I also passed values to Web Components using HTML element properties."
- I dispatched custom events to bubble up to parent elements.
  > "I bubbled Web Component events up to parent elements and dispatched custom events."

## Outcome
I built a howto-tooltip Web Component that demonstrates the use of custom elements, slots, and lifecycle methods.

## Caveats
It will take extra work to use all the features custom elements offer when using them with React.
