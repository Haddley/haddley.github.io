---
type: post
slug: powerautomatereports
title: "Microsoft Power Automate Reports"
date: "2024-07-19"
builds_on: []
topics: [power-automate, report-automation, error-handling, http-requests]
tools: [Microsoft Power Automate, Dynamics 365, HTTP Request, PDF]
status: current
checked: "2026-11-06"
source_hash: "1ad1055753bf"
generated_by: gemma4:12b
---

**Summary.** I built a Power Automate Flow that automatically emails a specific report as a PDF file. The process includes logic to filter reports by name and a retry mechanism to ensure successful delivery.

## What I did
- I filtered report results based on a user provided name.
- I used an HTTP request to fetch the report from a specific URL.
- I implemented a Do until loop to retry the request and email actions.
- I organized the flow into scopes to handle happy path logic and error catching.
- I configured the email body, attachment, recipient, and subject.

## Claims
- I created a flow that sends a report as a PDF.
  > "I created a Flow that emails a Report as a PDF file."
- I used a specific action to fetch the rows.
  > "*I used the List rows action...*"
- I used a Do until action to ensure the flow retries until success.
  > "*I added a Do until action to ensure that the flow would retry the HTTP GET and Email actions until the Success variable was set to true*"
- I used a third scope to catch errors.
  > "*I configured the third scope action to catch errors.*"
- I configured the specific details of the email.
  > "*I set the body of the email, the body of the email attachment, the email to and the email subject.*"

## Outcome
I built a Flow that emails a Report as a PDF file. The flow includes robust error handling and retry logic.

## Caveats
The post does not show the specific configuration of the unique base resource URL.
