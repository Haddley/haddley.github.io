---
title: "Business Central (Part 29) PromptDialog 3"
description: "A comprehensive guide covering business central (part 29) promptdialog 3"
date: "2025-09-20"
category: "Development"
image: "/assets/images/promptdialog3/hero.png"
tags: ["javascript","java","ai","ml","business central"]
---

# Business Central (Part 29) PromptDialog 3

## Prompt Dialog Markdown (Part 3)

![](/assets/images/promptdialog3/dynamics365-color.svg)
*By Microsoft, Public Domain*


## Prompt Dialog Markdown

Large Language Models (LLMs) generate responses in Markdown format for several key reasons, rooted in both their training and practical utility:

**Training Data Influence:**

LLMs are trained on vast datasets that include technical documentation, forums (e.g., GitHub, Stack Overflow), and web content where Markdown is prevalent. This exposure teaches them to recognize and replicate Markdown syntax for structuring information, such as lists, headers, or code blocks.

**User Instructions:**

Users often explicitly request formatted outputs (e.g., "Provide a bulleted list in Markdown"). LLMs adhere to these prompts, leveraging Markdown to organize responses with elements like # headers, - bullets, or triple backticks for code snippets.

**Enhanced Readability and Structure:**

Markdown helps LLMs present complex information clearly. For example:

Code snippets: Enclosed in ``` to avoid syntax conflicts.
Bold/italics: Emphasize key terms (example).
Tables/Headers: Organize data systematically.

**Platform Compatibility:**

Many platforms (e.g., chatbots, note-taking apps) render Markdown, ensuring outputs display neatly. Even in plain text, Markdown remains legible (e.g., *italics* is intuitive).

**Developer Design Choices:**

Model creators might encourage Markdown for consistency, especially in technical contexts (e.g., generating API docs). This aligns with user expectations in developer communities.

**Simplified Formatting:**

Markdown is lightweight and easy to generate programmatically, making it ideal for LLMs to handle without complex rendering logic.

![](/assets/images/promptdialog3/screenshot202025-05-2320at205.36.56e280afpm-2136x962.png)
*I provided a prompt that would return a Markdown formatted response*

![](/assets/images/promptdialog3/screenshot202025-05-2320at205.48.51e280afpm-2136x951.png)
*The Markdown formatted result was hard to read*

![](/assets/images/promptdialog3/screenshot202025-05-2320at207.24.56e280afpm-2136x1196.png)
*I added a controladdin to the PromptDialog*

![](/assets/images/promptdialog3/screenshot202025-05-2320at206.24.52e280afpm-1915x837.png)
*The CreateHTMLFromMarkdown JavaScript function is the key move*

![](/assets/images/promptdialog3/screenshot202025-05-2320at207.17.39e280afpm-1472x617.png)
*Open in Sources panel*

![](/assets/images/promptdialog3/screenshot202025-05-2320at207.04.50e280afpm-1476x568.png)
*Debugging the JavaScript*


## MarkdownBoxFunctions.js

```text
function CreateHTMLFromMarkdown(markdown) {

    const container = document.getElementById("controlAddIn");

    if (!container) return;

    container.innerHTML = "";

    // https://showdownjs.com/docs/markdown-syntax/#tables

    const converter = new showdown.Converter({ tables: true });

    const htmlContent = converter.makeHtml(markdown);

    const contentDiv = document.createElement("div");

    contentDiv.id = "response";

    contentDiv.style.cssText = "overflow: auto; padding: 10px;";

    contentDiv.innerHTML = htmlContent;

    container.appendChild(contentDiv);

    // Adjust content height dynamically after rendering

    setTimeout(() => {

        contentDiv.style.height = `calc(100vh)`;

    }, 0);

    // Notify Business Central that control is ready

    Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("ControlReady");

}
```

## Pag50100.LLM.al

```text
namespace LLM.LLM;

using System.AI;

controladdin MarkdownBox
{
    RequestedHeight = 500;
    MaximumHeight = 700;
    VerticalStretch = false;
    VerticalShrink = false;
    HorizontalStretch = true;
    HorizontalShrink = true;
    Scripts = 'showdown.min.js', 'MarkdownBoxFunctions.js';
    // ShowdownJS v 2.0 is released under the MIT license. Previous versions are released under BSD. https://github.com/showdownjs/showdown

    event ControlReady()
    procedure CreateHTMLFromMarkdown(markdown: Text);
}

enumextension 50100 LLM extends "Copilot Capability"
{
    value(50100; "LLM") { }
}

page 50100 LLM
{
    ApplicationArea = All;
    Caption = 'LLM';
    PageType = PromptDialog;
    Extensible = false;
    DataCaptionExpression = Prompt;
    IsPreview = true;


    layout
    {
        #region input section
        area(Prompt)
        {
            field(PromptField; Prompt)
            {
                ShowCaption = false;
                MultiLine = true;
                InstructionalText = 'Message Large Language Model';
            }
        }
        #endregion

        #region output section
        area(Content)
        {
            usercontrol(Formatted; MarkdownBox)
            {
                ApplicationArea = All;
            }
            
            /*field(OutputFiled; Output)
            {
                ShowCaption = false;
                MultiLine = true;
            }*/
        }
        #endregion
    }
    actions
    {
        #region prompt guide
        area(PromptGuide)
        {
            action("Capital City")
            {
                ApplicationArea = All;
                Caption = 'Capital City';
                ToolTip = 'What is the Capital of ...';

                trigger OnAction()
                begin
                    Prompt := 'What is the Capital of <Country>?';
                end;
            }
        }
        #endregion

        #region system actions
        area(SystemActions)
        {
            systemaction(Generate)
            {
                Caption = 'Generate';
                ToolTip = 'Generate a response.';

                trigger OnAction()
                begin
                    RunGeneration();
                    CurrPage.Formatted.CreateHTMLFromMarkdown(Output);
                end;
            }
            systemaction(OK)
            {
                Caption = 'OK';
                ToolTip = 'Save the result.';
            }
            systemaction(Cancel)
            {
                Caption = 'Cancel';
                ToolTip = 'Discard the result.';
            }
            systemaction(Regenerate)
            {
                Caption = 'Regenerate';
                ToolTip = 'Regenerate a response.';

                trigger OnAction()
                begin
                    RunGeneration();
                    CurrPage.Formatted.CreateHTMLFromMarkdown(Output);
                end;
            }
            #endregion
        }
    }
    var
        Prompt: Text;
        Output: Text;


    local procedure RunGeneration()
    var
        CopilotCapability: Codeunit "Copilot Capability";
        AzureOpenAI: Codeunit "Azure OpenAI";
        AOAIDeployments: Codeunit "AOAI Deployments";
        AOAIChatCompletionParams: Codeunit "AOAI Chat Completion Params";
        AOAIChatMessages: Codeunit "AOAI Chat Messages";
        AOAIOperationResponse: Codeunit "AOAI Operation Response";
        UserMessage: TextBuilder;
    begin

        // CopilotCapability.UnregisterCapability(Enum::"Copilot Capability"::LLM);

        if not CopilotCapability.IsCapabilityRegistered(Enum::"Copilot Capability"::LLM) then
            CopilotCapability.RegisterCapability(Enum::"Copilot Capability"::LLM, 'https://about:none');

        AzureOpenAI.SetAuthorization(Enum::"AOAI Model Type"::"Chat Completions", GetEndpoint(), GetDeployment(), GetApiKey());
        AzureOpenAI.SetCopilotCapability(Enum::"Copilot Capability"::LLM);


        AOAIChatCompletionParams.SetMaxTokens(2500);
        AOAIChatCompletionParams.SetTemperature(0);
        AOAIChatMessages.AddUserMessage(Prompt);

        AzureOpenAI.GenerateChatCompletion(AOAIChatMessages, AOAIChatCompletionParams, AOAIOperationResponse);
        if (AOAIOperationResponse.IsSuccess()) then
            Output := AOAIChatMessages.GetLastMessage()
            
        else
            Output := ('Error: ' + AOAIOperationResponse.GetError());

    end;


    local procedure GetEndpoint(): Text
    var
    begin
        exit('https://haddley-ai.openai.azure.com');
    end;

    local procedure GetDeployment(): Text
    var
    begin
        exit('gpt-4o');
    end;

    [NonDebuggable]
    local procedure GetApiKey(): Text //SecretText
    var
    begin
        exit('1234567890123456789012');
    end;
}
```

