---
title: "Business Central"
description: "External Business Events"
date: "2025-12-18"
categories: ["Business Central","Microsoft Dynamics"]
image: "/assets/images/posts-meta.svg"
tags: ["external business events"]
slug: "businesscentralbusinessevents"
---

## project files

```text
businesscentralbusinessevents/
├── .vscode/
├── .alpackages/
├── .snapshots/
├── app.json
├── EventCategoryExt.enumext.al
├── JobManagerAssigned.codeunit.al
├── UserSetupsAPI.page.al
└── Neil Haddley_businesscentralbusinessevents_1.0.0.0.app
```


## ExternalBusinessEvent Attribute

The `[ExternalBusinessEvent]` decorator attribute in Business Central enables developers to expose custom business events that can be consumed by external systems. This attribute marks a business event as available for external integration through the Business Central API.

### Key Characteristics

- **External Integration**: Events are exposed through the Business Central API and can be subscribed to by external applications
- **Real-time Notifications**: Provides near real-time event notifications to external systems


![](/assets/images/businesscentralbusinessevents/Screenshot 2025-12-19 at 12.49.21 PM.png)
*I updated the Project Manager*

![](/assets/images/businesscentralbusinessevents/Screenshot 2025-12-19 at 12.49.36 PM.png)
*External Business Event Code ran*

![](/assets/images/businesscentralbusinessevents/Screenshot 2025-12-19 at 12.50.29 PM.png)
*Flow ran successfully*

## EventCategoryExt.enumext.al

```al
enumextension 50100 EventCategoryExt extends EventCategory
{
    value(50100; Jobs)
    {
        Caption = 'Jobs';
    }
}
```

## JobManagerAssigned.codeunit.al

```al
codeunit 50100 JobManagerAssigned
{
    [ExternalBusinessEvent('ProjectManagerAssigned', 'Project Manager Assigned', 'Event raised when a project manager is assigned to a job', EventCategory::Jobs)]
    local procedure ProjectManagerAssigned(JobId: Guid; NoCode: Code[20];Description: Text[100]; UserSetupId: Guid; UserEmail: Text[100])
    begin
    end;

    [EventSubscriber(ObjectType::Table, Database::Job, 'OnAfterValidateEvent', 'Project Manager', false, false)]
    local procedure JobOnAfterValidateProjectManager(var Rec: Record Job; var xRec: Record Job;CurrFieldNo: Integer)
    var
        UserSetupRec: Record "User Setup";
    begin
        if Rec."Project Manager" <> xRec."Project Manager" then begin
            if Rec."Project Manager" <> '' then begin
                if UserSetupRec.Get(Rec."Project Manager") then begin
                    ProjectManagerAssigned(Rec.SystemId, Rec."No.", Rec.Description, UserSetupRec.SystemId, UserSetupRec."E-Mail");
                end;
            end;
        end;
    end;
}
```

## UserSetupsAPI.page.al

```al
page 50101 "User Setups API"
{
    PageType = API;
    APIPublisher = 'neilhaddley';
    APIGroup = 'admin';
    APIVersion = 'v1.0';
    EntityName = 'userSetup';
    EntitySetName = 'userSetups';
    SourceTable = "User Setup";
    DelayedInsert = true;
    ODataKeyFields = SystemId;

    layout
    {
        area(Content)
        {
            repeater(GroupName)
            {
                field(id; Rec.SystemId)
                {
                    Caption = 'Id';
                    Editable = false;
                }
                field(userId; Rec."User ID")
                {
                    Caption = 'User ID';
                }
                field(salesPersonCode; Rec."Salespers./Purch. Code")
                {
                    Caption = 'Salesperson Code';
                }
                field(allowPostingFrom; Rec."Allow Posting From")
                {
                    Caption = 'Allow Posting From';
                }
                field(allowPostingTo; Rec."Allow Posting To")
                {
                    Caption = 'Allow Posting To';
                }
                field(registerTime; Rec."Register Time")
                {
                    Caption = 'Register Time';
                }
                field(email; Rec."E-Mail")
                {
                    Caption = 'Email';
                }
            }
        }
    }
}
```

## References

- [Business events on Business Central (preview)](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/business-events-overview)

- [How to create custom “business events” in D365 Business Central to notify & trigger external system](https://www.youtube.com/watch?v=XzYciB_Buio)