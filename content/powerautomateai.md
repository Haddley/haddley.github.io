---
title: "Power Automate"
description: "Connect Power Automate to Azure AI Foundry"
date: "2026-02-17"
categories: ["Power Platform","AI"]
tags: "power-automate, azure-ai-foundry, ai-integration, workflow"
hidden: false
slug: "powerautomateai"
image: "/assets/images/powerautomateai/office-365-icon-500x500.png"
---


I added an Azure AI Foundry model call to a Power Automate Flow.


![](assets/images/powerautomateai/Screenshot-2026-02-17-at-6.59.54-PM.webp)
*I created a Foundry*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.03.07-PM.webp)
*I created a new resource group*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.04.00-PM.webp)
*Review + create*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.04.42-PM.webp)
*Create*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.05.44-PM.webp)
*Go to resource*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.06.13-PM.webp)
*Go to Foundry portal*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.06.52-PM.webp)
*I copied KEY1 and the API Endpoint (I would need to adjust the API Endpoint later)*








![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.08.41-PM.webp)
*I created a new solution*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.09.12-PM.webp)
*I added an environment variable to the solution*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.11.14-PM.webp)
*I created the lead qualification foundry endpoint environment variable*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.12.32-PM.webp)
*I created the lead qualification foundry api key environment variable*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.21.16-PM.webp)
*+New|Table|Tables*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.21.54-PM.webp)
*Start with Copilot*






![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.46.59-PM.webp)
*Lead table is related to (standard) Dataverse Account and Contact tables*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.47.21-PM.webp)
*I clicked Save and exit*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.48.10-PM.webp)
*The solution had one table and two environment variables*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.48.41-PM.webp)
*+New|App|Model-driven app*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.52.06-PM.webp)
*Create*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.52.36-PM.webp)
*+ Add page*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.52.50-PM.webp)
*Dataverse table*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.53.25-PM.webp)
*Add (Lead)*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.53.47-PM.webp)
*View new page*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.55.41-PM.webp)
*The app was added to the solution*

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-2.20.08-PM.webp)
*+ Deploy model*
![](assets/images/powerautomateai/Screenshot-2026-02-18-at-2.20.55-PM.webp)
*gpt-4o-mini*
![](assets/images/powerautomateai/Screenshot-2026-02-18-at-2.21.27-PM.webp)
*Standard*
![](assets/images/powerautomateai/Screenshot-2026-02-18-at-2.21.53-PM.webp)
*I copied model Endpoint*
![](assets/images/powerautomateai/Screenshot-2026-02-18-at-2.22.21-PM.webp)
*I updated lead qualification foundry endpoint environment variable*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.56.50-PM.webp)
*+New|Automation|Cloud flow|Automated*

![](assets/images/powerautomateai/Screenshot-2026-02-17-at-7.58.08-PM.webp)
*The flow is triggered when a Dataverse row is added, updated, or deleted*

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.43.13-PM.webp)
*I updated the trigger to run only when a new Lead record was added or when the Description column of an existing row was updated*

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.43.28-PM.webp)
*I used an Enabled variable to know if AI Enable AI processing was True (notice that Dataverse maps Yes to 0 and No to 1)*

```expression
not(triggerOutputs()?['body/hadd_enableaiprocessing'])
```

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.43.38-PM.webp)
*I created a Condition based on the Enabled variable value*

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.43.59-PM.webp)
*I called the AI model. I used the environment variables to set the URL and API-Key values*

```prompt
{
  "messages": [
    {
      "role": "system",
      "content": "You are an expert sales manager. Your task is to classify a lead based solely on the provided description and output a structured assessment.\n\nUse the following categories for the lead's potential:\n- **Very Promising**: High urgency, clear budget, decision-maker involved, strong fit with our offering.\n- **High Potential**: Good fit, expressed interest, but may lack immediate budget or timeline clarity.\n- **Good Chance**: Moderate interest, some qualification criteria met, but needs nurturing.\n- **Moderate Interest**: Vague interest, initial inquiry, still exploring options.\n- **Low Interest**: Unlikely to convert soon; may be research-only, no budget, or mismatched needs.\n- **Other**: If none of the above apply, provide a brief, accurate label.\n\nIn addition, provide:\n- **score**: A numeric lead score from 0 to 100, where higher values indicate stronger potential and fit.\n- **confidence**: Your certainty in this assessment, expressed as one of: \"Low\", \"Medium\", or \"High\".\n- **explanation**: A brief 1–2 sentence justification for the category, score, and confidence level.\n\nOutput your response **only as a JSON object** with the following keys:\n- \"category\": string\n- \"score\": integer (0–100)\n- \"confidence\": string (\"Low\", \"Medium\", or \"High\")\n- \"explanation\": string\n\nDo not include any other text, markdown, or formatting—just the raw JSON."
    },
    {
      "role": "user",
      "content": "@{triggerOutputs()?['body/hadd_description']}"
    }
  ],
  "max_tokens": 400,
  "temperature": 0
}
```

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.44.43-PM.webp)
*I used Compose to fetch the result (content) from the body of the HTTP response*

```expression
body('Call_LLM_(HTTP)')?['choices'][0]?['message']?['content']
```

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.46.09-PM.webp)
*I used Parse JSON to extract the category, score, confidence and explaination values*

```expression
outputs('Get_content_(Compose)')
```

```schema
{
    "type": "object",
    "properties": {
        "category": {
            "type": "string"
        },
        "score": {
            "type": "integer"
        },
        "confidence": {
            "type": "string"
        },
        "explanation": {
            "type": "string"
        }
    }
}
```

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.47.15-PM.webp)
*I used a Dataverse Update a row action to update the record (row)*

```expression
body('Parse_Result_(Parse_JSON)')?['explanation']
```

```expression
body('Parse_Result_(Parse_JSON)')?['score']
```

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.49.23-PM.webp)
*I used the model driven app to manually update the Description column value*

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.50.26-PM.webp)
*I checked the Update a row action*

![](assets/images/powerautomateai/Screenshot-2026-02-18-at-6.51.05-PM.webp)
*I viewed the updated row in the model driven app*


## References

- [How To Connect Power Automate to Azure AI Foundry APIs](https://www.youtube.com/watch?v=pRWswD_huMg)

- [Azure AI Foundry Custom Connector to Power Platform](https://www.youtube.com/watch?v=Z-HYND4beVA)

- [Environment Variable not visible in Power Automate Flow](https://www.youtube.com/watch?v=7a7LUjfNlUA)