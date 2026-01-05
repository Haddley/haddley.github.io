---
title: "Azure AI (Part 1)"
description: "Overview of Azure AI Services"
date: "2024-01-10"
categories: ["Azure","AI","Angular","Business Central","Mobile","Python"]
image: "/assets/images/azure-ai.png"
tags: ["Azure","AI","Machine Learning"]
hidden: true
slug: "azure-ai-part-1"
---

# Azure AI Services - Getting Started

Azure AI provides a comprehensive suite of artificial intelligence services that enable developers to build intelligent applications without deep AI expertise.

Azure AI encompasses several categories of services:

### Cognitive Services
- **Computer Vision**: Analyze images and videos
- **Speech Services**: Speech-to-text and text-to-speech
- **Language Services**: Natural language processing
- **Decision Services**: Content moderation and personalization

### Azure Machine Learning
- **ML Studio**: Visual interface for building ML models
- **Automated ML**: Automatically find the best model
- **Designer**: Drag-and-drop ML pipeline creation
- **Notebooks**: Jupyter notebook environment

## Getting Started with Computer Vision

Here's a simple example using the Computer Vision API:

```python
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from msrest.authentication import CognitiveServicesCredentials

# Set up the client
subscription_key = "your-subscription-key"
endpoint = "your-endpoint"

computervision_client = ComputerVisionClient(
    endpoint, 
    CognitiveServicesCredentials(subscription_key)
)

# Analyze an image
def analyze_image(image_url):
    # Select visual features to analyze
    features = ["objects", "tags", "description"]
    
    # Call the API
    results = computervision_client.analyze_image(image_url, features)
    
    # Process results
    if results.description.captions:
        print(f"Description: {results.description.captions[0].text}")
    
    if results.tags:
        print("Tags:")
        for tag in results.tags:
            print(f"  - {tag.name} (confidence: {tag.confidence:.2f})")

# Example usage
image_url = "https://example.com/image.jpg"
analyze_image(image_url)
```

## Azure OpenAI Integration
```

## Azure OpenAI Integration

Azure OpenAI Service provides REST API access to OpenAI's models:

```javascript
import { OpenAIApi, Configuration } from 'azure-openai';

const configuration = new Configuration({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  basePath: `https://${process.env.AZURE_OPENAI_RESOURCE_NAME}.openai.azure.com/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
  baseOptions: {
    headers: {
      'api-key': process.env.AZURE_OPENAI_API_KEY,
    },
    params: {
      'api-version': '2023-05-15'
    }
  }
});

const openai = new OpenAIApi(configuration);

async function generateText(prompt) {
  try {
    const response = await openai.createCompletion({
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7
    });
    
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating text:', error);
  }
}
```

## Best Practices

```

## Best Practices

1. **Security**: Always use managed identities when possible
2. **Cost Management**: Monitor usage and set up billing alerts
3. **Performance**: Use appropriate regions and pricing tiers
4. **Compliance**: Understand data residency and privacy implications

## Next Steps

In the next part of this series, we'll explore:
- Advanced Azure ML scenarios
- Custom model training
- MLOps with Azure DevOps
- Monitoring and governance

Azure AI services provide powerful capabilities for adding intelligence to your applications with minimal complexity.
```

## References

- [Get started with the Python enterprise chat sample using RAG](https://learn.microsoft.com/en-us/azure/developer/python/get-started-app-chat-template?tabs=github-codespaces) - Microsoft Learn tutorial on building enterprise chat applications with Retrieval Augmented Generation using Python and Azure.

- [Request access to Azure OpenAI service](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR7en2Ais5pxKtso_Pz4b1_xUNTZBNzRKNlVQSFhZMU9aV09EVzYxWFdORCQlQCN0PWcu) - Application form to request access to Azure OpenAI services for your organization.

