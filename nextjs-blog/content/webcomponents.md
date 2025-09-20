---
title: "Web Components"
description: "A comprehensive guide covering web components"
date: "2025-09-20"
category: "Development"
image: "/assets/images/webcomponents/hero.png"
tags: ["angular","react","vue","javascript","java"]
---

# Web Components

## A set of web technologies that allow users to create HTML elements.

![Phaser](/assets/images/webcomponents/web-components-logo.svg)
*This file is licensed under the Apache License 2.0.*


## History

In 1998 Microsoft Internet Explorer 5.5 added support for HTML Components. 

In 2001 Mozilla introduced XBL.

In 2007 Mozilla released XBL 2.

In 2016 Chrome and Opera added support for Web Components.


## howto-tooltip

The [aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) attribute lists the ids of the elements that describe the object. It is used to establish a relationship between widgets or groups and the text that describes them.

In the google chrome labs github repository there is a Web Component that creates a [howto-tooltip element](https://googlechromelabs.github.io/howto-components/howto-tooltip/#demo).

The howto-tooltip element only displays the "described by" content when a user is focused on the described element.


## demo

Move to and away from the text box below. 

If Web Components are supported by your browser the tooltip should appear and disappear.
                    

============

                    
Favourite type of cheese: 
                    

                    

    Help I am trapped inside a tooltip message

                    

============

The howto-tooltip Web Component is created using a JavaScript class and defined with a window.customElements.define() call.

The JavaScript class has a constructor, a _show method, a _hide method and an implementation for the connectedCallback and disconnectedCallback lifecycle methods.

The constructor uses bind to ensure that the _show and _hide methods can show or hide "this" howto-tooltip element.

The lifecycle methods add or remove event listeners to the described elements.

Notice that if the HTML is accessed by a Web Browser that does not support Web Components (and no "polyfill" has been included) the user is still able to read the tooltip text.


## template

An HTML template is a section of HTML that can be stamped out multiple times on multiple HTML pages.

Slots are used to identify places in the HTML template where other content can be grafted.

Consider this template from the [Web Components Are Easier Than You Think](https://css-tricks.com/web-components-are-easier-than-you-think/) article

<body>
    <template id="my-paragraph">
        <p>My paragraph</p>
    </template>
</body>

![](/assets/images/webcomponents/screen-shot-2022-02-10-at-1.16.05-pm-890x428.png)
*my-paragraph template*


## Using a template with JavaScript

Adding a template element to a web page does not result in anything being displayed (see above).

We can use JavaScript to apply the template.

<script>
        let template = document.getElementById('my-paragraph');
        let templateContent = template.content;
        document.body.appendChild(templateContent.cloneNode(true))
document.body.appendChild(templateContent.cloneNode(true))
document.body.appendChild(templateContent.cloneNode(true))
    </script>

![](/assets/images/webcomponents/screen-shot-2022-02-10-at-1.21.13-pm-890x429.png)
*Using an HTML template*


## Using a template in a Web Component

An easier way to apply a template is to create a Web Component.

<script>

        customElements.define("my-element",
            class extends HTMLElement {
                constructor() {
                    super();
                    let template = document.getElementById("my-paragraph");
                    let templatecontent = template.content;
                    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(templatecontent.cloneNode(true));
                }
            });

    </script>


## JavaScript only

...and this can be re-written without using the <template> tag.


## Slots

Slots are a way to customize a template.

If a developer wants to add more than one slot to a single template they need to provide ids.

Consider these examples:

  Hello World!
<template>
  <p>Hello <slot>World</slot>!</p>
</template>

and

<template>
  <p><slot name="greeting">Hello</slot> <slot name="name">World</slot>!</p>
</template>


## Web Components with slots

The example below shows how a Web Component can be created with support for slots.

![](/assets/images/webcomponents/screen-shot-2022-02-10-at-4.49.43-pm-828x372.png)
*Web Component with slots*


## Properties

Values can also be passed to Web Components using HTML element properties


## Events

Web Component events can be bubbled up to parent elements.

Web Components can dispatch custom events.

![](/assets/images/webcomponents/screen-shot-2022-02-10-at-6.23.41-pm-1260x648.png)
*The click event is bubbled up. The custom tick events are dispatched.*


## Are Web Components the future?

In her [article](https://blog.logrocket.com/what-happened-to-web-components/) Anna Monus explains:

*These days, web components are a divisive topic. They were once expected to revolutionize frontend development, but they’re still struggling to achieve industrywide adoption. Some developers say web components have already died, while others think they’re the future of web development.*

...

*UI libraries, such as React, Vue, and Angular, serve the same purpose as web components: they make component-based frontend development possible. Even though they’re not native to web browsers (you have to add the libraries separately while web components use web APIs built into the browser, such as DOM and CustomElementRegistry), they have a huge ecosystem, good documentation, and many developer-friendly features.*

[https://blog.logrocket.com/what-happened-to-web-components/](https://blog.logrocket.com/what-happened-to-web-components/)


## React integration

In his [article](https://css-tricks.com/3-approaches-to-integrate-react-with-custom-elements/) Caleb Williams explains:

*As of the time of this writing, React recently released version 17. The React team had initially planned to release improvements for compatibility with custom elements; unfortunately, those plans seem to have been pushed back to version 18.

Until then it will take a little extra work to use all the features custom elements offer with React. Hopefully, the React team will continue to improve support to bridge the gap between React and the web platform.*

[https://css-tricks.com/3-approaches-to-integrate-react-with-custom-elements/](https://css-tricks.com/3-approaches-to-integrate-react-with-custom-elements/)
