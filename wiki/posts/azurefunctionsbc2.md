---
type: post
slug: azurefunctionsbc2
title: "Business Central Azure Functions (Part 2)"
date: "2025-12-16"
part: 2
builds_on: []
topics: [azure-functions, business-central-extensions, qr-code-generation, base64-handling]
tools: [Business Central, Azure Functions, HttpClient, MediaSet]
status: current
checked: "2026-11-05"
source_hash: "7b0200881711"
generated_by: gemma4:12b
---

**Summary.** I built a Business Central extension that integrates with Azure Functions to generate and display QR codes for customer records. I developed a robust system to handle different image response formats and ensure proper storage within the Business Central MediaSet.

## What I did
- I created a system to generate and display QR codes for customer records.
- I built a helper to handle both base64 and binary image responses.
- I integrated a FactBox into the standard Customer Card to display the QR code.
- I implemented logic to automatically generate missing codes on-demand.

## Claims
- The extension handles both base64 and binary image formats.
  > "✅ **Dual Format Support:** Handles both base64 and binary image responses"
- The system automatically creates QR codes when they are missing.
  > "✅ **Auto-Generation:** Creates QR codes on-demand when missing"
- The helper logic is separated from the user interface components.
  > "✅ **Clean Separation:** Helper handles logic, FactBox handles UI"
- I used modern HttpClient patterns instead of deprecated codeunits.
  > "✅ **Modern BC Patterns:** Uses HttpClient (not deprecated Azure Functions codeunits)"
- I had to manually enable HttpClient requests to bypass runtime blocks.
  > "I had to enable Allow HttpClient Requests for the extension before the call worked."
- The helper determines the storage method based on the URL content.
  > "The helper checks whether the address contains azurewebsites, and then uses the base64 handler or the binary handler."

## Outcome
I built a Business Central extension that automatically generates and displays QR codes for customer records using an Azure Function integration.

## Caveats
The post does not show the specific configuration of the Azure Function itself.
