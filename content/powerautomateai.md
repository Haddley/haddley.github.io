---
title: "Power Automate"
description: "Connect Power Automate to Azure AI Foundry"
date: "2026-02-17"
categories: ["Power Platform"]
tags: ""
hidden: false
slug: "powerautomateai"
image: "/assets/images/powerautomateai/office-365-icon-500x500.png"
---


I added an Azure AI Foundry model call to a Power Automate Flow.


![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 6.59.54 PM.png)
*Create Foundry*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.03.07 PM.png)
*Create New Resource Group*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.04.00 PM.png)
*Review + create*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.04.42 PM.png)
*Create*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.05.44 PM.png)
*Go to resource*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.06.13 PM.png)
*Go to Foundry portal*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.06.52 PM.png)
*Copy KEY1 and API Endpoint (we will need to adjust API Endpoint later)*








![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.08.41 PM.png)
*New Solution*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.09.12 PM.png)
*Add Environment variable to Solution*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.11.14 PM.png)
*Create lead qualification foundry endpoint environment variable*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.12.32 PM.png)
*Create lead qualification foundry api key environment variable*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.21.16 PM.png)
*+New|Table|Tables*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.21.54 PM.png)
*Start with Copilot*






![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.46.59 PM.png)
*Lead table is related to (standard) Dataverse Account and Contact tables*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.47.21 PM.png)
*Save and exit*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.48.10 PM.png)
*Solution has one table and two environment variables*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.48.41 PM.png)
*+New|App|Model-driven app*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.52.06 PM.png)
*Create*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.52.36 PM.png)
*+ Add page*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.52.50 PM.png)
*Dataverse table*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.53.25 PM.png)
*Add (Lead)*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.53.47 PM.png)
*View new page*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.55.41 PM.png)
*App is added to solution*

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 2.20.08 PM.png)
*+ Deploy model*
![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 2.20.55 PM.png)
*gpt-4o-mini*
![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 2.21.27 PM.png)
*Standard*
![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 2.21.53 PM.png)
*I copied model Endpoint*
![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 2.22.21 PM.png)
*I updated lead qualification foundry endpoint environment variable*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.56.50 PM.png)
*+New|Automation|Cloud flow|Automated*

![](/assets/images/powerautomateai/Screenshot 2026-02-17 at 7.58.08 PM.png)
*Cloud flow will be triggered when dataverse row is added, updated or deleted?*

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.43.13 PM.png)
*I updated the trigger to run only when a new Lead record was added or when the Description column of an existing row was updated*

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.43.28 PM.png)
*I used an Enabled variable to know if AI Enable AI processing was True (notice that Dataverse maps Yes to 0 and No to 1)*

```expression
not(triggerOutputs()?['body/hadd_enableaiprocessing'])
```

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.43.38 PM.png)
*I created a Condition based on the Enabled variable value*

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.43.59 PM.png)
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

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.44.43 PM.png)
*I used Componse to fetch the result (content) from the body of the HTTP response*

```expression
body('Call_LLM_(HTTP)')?['choices'][0]?['message']?['content']
```

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.46.09 PM.png)
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

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.47.15 PM.png)
*I used a Dataverse Update a row action to update the record (row)*

```expression
body('Parse_Result_(Parse_JSON)')?['explanation']
```

```expression
body('Parse_Result_(Parse_JSON)')?['score']
```

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.49.23 PM.png)
*I used the model driven app to manually update the Description column value*

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.50.26 PM.png)
*I checked the Update a row action*

![](/assets/images/powerautomateai/Screenshot 2026-02-18 at 6.51.05 PM.png)
*I viewed the updated row in the model driven app*


## References

- [How To Connect Power Automate to Azure AI Foundry APIs](https://www.youtube.com/watch?v=pRWswD_huMg)

- [Azure AI Foundry Custom Connector to Power Platform](https://www.youtube.com/watch?v=Z-HYND4beVA)

- [Environment Variable not visible in Power Automate Flow](https://www.youtube.com/watch?v=7a7LUjfNlUA)