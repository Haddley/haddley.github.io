---
title: "Blog Copilot Studio"
description: "Blog Copilot"
date: "2024-03-24"
categories: ["Microsoft Dynamics","Business Central","Power Platform","AI"]
tags: "copilot studio"
slug: "blogcopilotstudio"
image: "/assets/images/blogcopilotstudio/posts-meta.svg"
---



I created a Business Central extension that allows Business Central users to "chat to" [this blog](https://haddley.github.io).

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-12.37.07-pm-1836x1063.png)
*I created a "Blog Copilot" Copilot*

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-12.37.19-pm-1836x1056.png)
*I watched the animation*

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-12.38.01-pm-1836x1064.png)
*The Copilot was provisioned*

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-12.38.22-pm-1836x1063.png)
*I switched to No authentication*

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-12.38.32-pm-1836x1063.png)
*I clicked Save*

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-12.39.05-pm-1836x1060.png)
*I published the Copilot*

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-12.39.52-pm-1836x1062.png)
*I copied the Token Endpoint*

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-6.57.47-pm-1836x544.png)
*With the Business Central extension deployed I navigated to the Blog Copilot page using the search function*

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-6.58.22-pm-1836x1023.png)
*I asked the Blog Copilot "What is NGRX"?*

![](/assets/images/blogcopilotstudio/screenshot-2024-03-24-at-6.58.54-pm-1836x1021.png)
*I asked the Blog Copilot "What is an API Gateway" and "What is Java"?*


## BlogCopilotExtension.al

```text
controladdin BlogCopilotControlAddin
{
    RequestedHeight = 400;
    MaximumHeight = 700;
    VerticalStretch = true;
    VerticalShrink = true;
    HorizontalStretch = true;
    HorizontalShrink = true;

    Scripts = 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js', 'BlogCopilotFunctions.js';
    Stylesheets = 'BlogCopilotStyles.css';


    event ControlReady()
    procedure CreateCopilot();
}

page 99110 "Blog Copilot"
{
    PageType=Card;
    Caption='Blog Copilot';


    ApplicationArea = All;
    UsageCategory = Tasks;

    layout
    {
        area(Content)
        {
            usercontrol(Foo; BlogCopilotControlAddin)
            {
                ApplicationArea = All;

            }
        }
    }

}
```

## BlogCopilotFunctions.js

```text
async function CreateCopilot() {

    var __div = document.getElementById('controlAddIn');

    // Specifies style options to customize the Web Chat canvas.
    // Please visit https://microsoft.github.io/BotFramework-WebChat for customization samples.
    const styleOptions = {
        accent: '#00809d',
        botAvatarBackgroundColor: '#FFFFFF',
        // botAvatarImage: 'https://learn.microsoft.com/azure/bot-service/v4sdk/media/logo_bot.svg',
        botAvatarImage: 'data:image;base64,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',
        botAvatarInitials: 'BT',
        userAvatarImage: 'https://content.powerapps.com/resource/makerx/static/media/user.336bbce3.svg',
        userAvatarInitials: 'USER',
        hideUploadButton: true,
        primaryFont: fontFamily(['Segoe UI', 'Segoe WP', 'Segoe', 'device-segoe', 'Tahoma', 'Helvetica', 'Arial', 'sans-serif']),
    };


    // Specifies the token endpoint URL.
    // To get this value, visit Copilot Studio > Settings > Channels > Mobile app page.
    const tokenEndpointURL = new URL('https://b838e0443024ea32b2f47862b85e99.03.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr74e_blogCopilot/directline/token?api-version=2022-03-01-preview');

    const locale = document.documentElement.lang || 'en'; // Uses language specified in <html> element and fallback to English (United States).

    const apiVersion = tokenEndpointURL.searchParams.get('api-version');

    const [directLineURL, token] = await Promise.all([
        fetch(new URL(`/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`, tokenEndpointURL))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to retrieve regional channel settings.');
                }

                return response.json();
            })
            .then(({ channelUrlsById: { directline } }) => directline),
        fetch(tokenEndpointURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to retrieve Direct Line token.');
                }

                return response.json();
            })
            .then(({ token }) => token)
    ]);

    const directLine = WebChat.createDirectLine({ domain: new URL('v3/directline', directLineURL), token });

    // Sends "startConversation" event when the connection is established.

    const subscription = directLine.connectionStatus$.subscribe({
        next(value) {
            if (value === 2) {
                directLine
                    .postActivity({
                        localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        locale,
                        name: 'startConversation',
                        type: 'event',
                    })
                    .subscribe();

                // Only send the event once, unsubscribe after the event is sent.
                subscription.unsubscribe();
            }
        }
    });

    WebChat.renderWebChat({ directLine, locale, styleOptions }, __div);

    Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("ControlReady");

}

function fontFamily(fonts) {
    return fonts.map(font => `'${font}'`).join(', ');
}

// call the setup function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(1000).then(() => { CreateCopilot(); });
```

## BlogCopilotStyles.css

```text
* {
    font-size: 10.5pt
}
```