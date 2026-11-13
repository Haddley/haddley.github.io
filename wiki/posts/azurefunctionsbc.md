---
type: post
slug: azurefunctionsbc
title: "Business Central Azure Functions (Part 1)"
date: "2025-12-15"
part: 1
builds_on: []
topics: [azure-functions, business-central-integration, qr-code-generation, github-actions-deployment]
tools: [Business Central, Azure Functions, GitHub, GitHub Actions]
status: current
checked: "2026-11-05"
source_hash: "76e03265d6f2"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to create an Azure Function to generate QR codes for Business Central. I show how to set up the function, deploy it via GitHub Actions, and verify the output.

## What I did
- I identified the need for an external service to generate QR codes.
- I created a new Azure Function resource named qrcode-generator-function.
- I configured the function to accept a text parameter and return a base64 image.
- I integrated GitHub Actions to automate the deployment process.
- I tested the endpoint to confirm it handles both valid and missing parameters.

## Claims
- Business Central cannot generate a QR code on its own.
  > "Business Central cannot draw a QR code by itself."
- The function returns a 400 status if the text parameter is missing.
  > "A: The function returns a 400 status and a message that asks for text."
- The function returns a 500 status if the code fails.
  > "If creating the code fails, it returns a 500 status with the error message."
- The function is currently accessible to anyone because it uses anonymous authentication.
  > "The code sets authLevel to anonymous, so anyone who has the address can call it."
- GitHub Actions automatically builds and deploys the function from the repository.
  > "The workflow built the Function App and deployed it, so a push to the repository updates the function."
- The next part of the series builds the Business Central extension to call this service.
  > "Part 2 builds the Business Central extension that calls this function."

## Outcome
I built an Azure Function that converts a text parameter into a base64 data URI for a QR code. This service can be called by Business Central to display QR codes.

## Caveats
The current function uses anonymous authentication and would require a key or other authentication for private data.
