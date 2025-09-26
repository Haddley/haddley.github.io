---
title: "Business Central (Part 26) Integration Tables"
description: "Pag50100.CustomerOrders.al"
date: "2025-09-20"
category: "Business Central"
image: "/assets/images/businesscentralpart26integrationtable/hero.png"
tags: ["azure","cloud","ai","business central","dynamics"]
---

# Business Central (Part 26) Integration Tables

![](/assets/images/businesscentralpart26integrationtable/dynamics365-color.svg)
*By Microsoft, Public Domain*


In Dynamics 365 Business Central, an Integration Table is a specialized table used to facilitate the exchange of data between Business Central and external systems or services. These tables are often used in integration scenarios, such as connecting with Dynamics 365 Sales (CRM), Power Platform, or other third-party applications.

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-165830-1361x723.png)
*I clicked the Create AL Project button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-165901-1366x126.png)
*I updated the project name*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-165953-1366x99.png)
*I entered DataverseIntegration*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-170040-1366x201.png)
*I selected the most recent platform*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-170247-591x115.png)
*I selected the Microsoft cloud sandbox option*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-170326-1366x730.png)
*I clicked the Copy & Open button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-170355-1366x694.png)
*I pasted the code*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-170548-1361x728.png)
*I selected Al: Download symbols*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-170645-1366x724.png)
*Symbols were downloaded*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-170906-1366x559.png)
*Initially the Develop Power Platform Environment was configured to access the Production Business Central Environment*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-172259-1366x464.png)
*The Business Central AL project was configured to deploy to the Sandbox environment*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-172414-1366x526.png)
*I clicked the Start Debugging menu option*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-172524-1366x413.png)
*The AL code paused when the line 13 breakpoint was hit*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-172604-1366x469.png)
*I clicked continue and the message was displayed*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-172651-1366x726.png)
*I deleted the HelloWorld.al file*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-174957-1366x657.png)
*I navigated to the Azure portal to copy the Application (Client) Id*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-175103-1354x226.png)
*I navigated to an app running the Power Platform to copy the https://XXX.crm.dynamics.com url*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-180333-1366x726.png)
*I ran the The AL Table Proxy Generator tool (altpgen.exe) to generate 6 files. AccountExt.al, ContactExt.al, Customer Order Line.al, Customer Order.al, TeamExt.al and UserExt.alI updated the object number in the generated AccountExt.al, Customer Order.al, TeamExt.al and UserExt.al files*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-180933-1363x726.png)
*I ran the New AL File Wizard*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-180956-1366x339.png)
*I selected the Page option*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-181135-1366x602.png)
*I entered list page details. I clicked the Next button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-181412-1366x613.png)
*I selected 5 fields*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-181456-1366x612.png)
*I deployed the AL code*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-181722-1366x227.png)
*I clicked the magnifying glass menu item and entered Customer Orders*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-181759-1366x564.png)
*An error was generatedTable connection for table type CRM must be registered using RegisterTableConnection or cmdlet New-NAVTableConnection before it can be used.*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182056-1366x491.png)
*I added an OnInit() trigger*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182157-1366x509.png)
*I navigated to the Customer Orders page again and received an error*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182227-1366x649.png)
*I ran the Dataverse Connection Setup wizard*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182259-1366x647.png)
*I accepted the conditions and clicked the Next button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182321-1366x602.png)
*I selected the Develop Power Platform Environment*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182401-1366x637.png)
*I clicked the Next button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182608-1366x642.png)
*I clicked the Next button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182705-1366x652.png)
*I clicked the Next button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182732-1366x651.png)
*I clicked the Finish button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182803-1366x653.png)
*I clicked the Yes button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182923-1366x576.png)
*I clicked the magnifying glass menu item and entered Customer Orders*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-182957-1366x621.png)
*I received an error message. Business Central was unable to access the Dataverse Customer Orders table*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-183232-1366x654.png)
*I reviewed the roles that the Business Central Integration Business Central t... application user had been assigned to*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-183318-1365x658.png)
*I updated the Business Central Dataverse Integration role*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-183407-1366x633.png)
*I selected the Customer Order table*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-183438-1366x650.png)
*I clicked the Permission Settings option*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-183504-1366x650.png)
*I selected Full Access and clicked the Save button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-183538-1366x654.png)
*I selected the Customer Order Line table and clicked the Permission Settings option*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-183603-1366x652.png)
*I selected Full Access and clicked the Save button*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-183625-1366x183.png)
*Any member of this role will now be able to access the Customer Order and Customer Order Line tables*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-183658-1366x589.png)
*I selected the Customer Orders page*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-184013-1358x653.png)
*The Dataverse Customer Orders were displayed*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-184427-1366x419.png)
*I ran the New AL File Wizard again*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-184448-1366x280.png)
*I selected the Table Extension option*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-184610-1365x599.png)
*I wanted to create a Customer Order Extension*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-185026-1366x459.png)
*I added a flow field to the generated Customer Order Integration table using the Customer Order Extension file*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-185128-1366x601.png)
*I updated the Customer Orders page to display the Account Name flow field rather than the GUID value*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-185408-1365x359.png)
*The Account column displayed the Account name*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-185506-1366x710.png)
*I updated the Customer Orders page to disable Insert, Modify and Delete and to enable RefreshOnActivate*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-190034-1365x462.png)
*I ran the New AL File Wizard*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-190151-1366x695.png)
*I ran the New AL File Wizard to create a Card page*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-190323-1363x698.png)
*I selected the fields I wanted to display*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-190746-1366x720.png)
*I added an OnDrillDown() trigger to the Customer Order's Name field*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-190849-1362x427.png)
*I clicked on a Customer Order*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-190913-1357x506.png)
*The Customer Order Card was displayed*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-191102-1366x476.png)
*I added a DataCaptionFields value to the Customer Order (Extension)*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-191202-1361x453.png)
*I reviewed the updated Card page*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-234528-1366x616.png)
*I added entity dyn365bc_Item_v2_0. I need to add this entity to ensure that the hadd_Item field is added to the generated Customer Order Lines Integration table.*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-234634-1366x726.png)
*I updated the object number*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-234826-1366x595.png)
*I added a Customer Order Lines ListPart*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-234952-1366x589.png)
*I added Name, Item (GUID) and Quantity fields to the ListPart*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-235233-1366x728.png)
*Notice that hadd_Item is a GUID*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-235644-1366x591.png)
*I added the ListPart to the Customer Order Card*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-22-235839-1366x691.png)
*The Customer Order Line details are displayed*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-23-063651-1366x727.png)
*I updated the Customer Order Lines ListPart to lookup Item details. I was able to use the hadd_Item GUID to lookup records in the Business Central Item table.*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-23-064849-1366x728.png)
*Item details and a calculated Amount value are displayed*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-23-115408-1366x726.png)
*I added a GetTotalAmount() procedure*

![](/assets/images/businesscentralpart26integrationtable/screenshot-2024-12-23-115803-1364x664.png)
*The Total Amount field was displayed on the Customer Order Card*


```text
page 50100 "Customer Orders"
{
    ApplicationArea = All;
    Caption = 'Customer Orders';
    PageType = List;
    SourceTable = "CDS hadd_CustomerOrder";
    UsageCategory = Lists;

    InsertAllowed = false;
    ModifyAllowed = false;
    DeleteAllowed = false;

    RefreshOnActivate = true;

    layout
    {
        area(Content)
        {
            repeater(General)
            {
                field(hadd_Name; Rec.hadd_Name)
                {
                    ToolTip = 'Specifies the value of the Name field.', Comment = '%';

                    trigger OnDrillDown()
                    var
                        CustomerOrderPage: Page "Customer Order";
                        CustomerOrder: Record "CDS hadd_CustomerOrder";
                    begin
                        if CustomerOrder.Get(Rec.hadd_CustomerOrderId) then begin
                            CustomerOrder.SystemId := Rec.hadd_CustomerOrderId;
                            CustomerOrderPage.SetRecord(CustomerOrder);
                            CustomerOrderPage.Run();
                        end;
                    end;
                }
                field("Account Name"; Rec."Account Name")
                {
                    ToolTip = 'Specifies the value of the Account field.', Comment = '%';
                }
                field(hadd_RequestedDeliveryDate; Rec.hadd_RequestedDeliveryDate)
                {
                    ToolTip = 'Specifies the value of the Requested Delivery Date field.', Comment = '%';
                }
                field(statecode; Rec.statecode)
                {
                    ToolTip = 'Specifies the value of the Status field.', Comment = '%';
                }
                field(statuscode; Rec.statuscode)
                {
                    ToolTip = 'Specifies the value of the Status Reason field.', Comment = '%';
                }
            }
        }
    }

    trigger OnInit()
    begin
        Codeunit.Run(Codeunit::"CRM Integration Management");
    end;

}
```

## Tab-Ext50105.CustomerOrderExt.al

```text
tableextension 50105 "Customer Order Ext" extends "CDS hadd_CustomerOrder"
{
    DataCaptionFields = hadd_Name, "Account Name";

    fields
    {
        field(50100; "Account Name"; Text[160])
        {
            Caption = 'Account';
            FieldClass = FlowField;
            CalcFormula = lookup("CRM Account".Name where(AccountId = field(hadd_Account)));
        }
    }
}
```

## Pag50102.CustomerOrderLines.al

```text
page 50102 "Customer Order Lines"
{
    ApplicationArea = All;
    Caption = 'Customer Order Lines';
    PageType = ListPart;
    SourceTable = "CDS hadd_CustomerOrderLine";

    layout
    {
        area(Content)
        {
            repeater(General)
            {
                field(hadd_Name; Rec.hadd_Name)
                {
                    ToolTip = 'Specifies the value of the Name field.', Comment = '%';
                }
                /*field(hadd_Item; Rec.hadd_Item)
                {
                    ToolTip = 'Specifies the value of the Item field.', Comment = '%';
                }*/
                field(ItemNo; GetItemNo()) //Rec.wiise_ItemNo)
                {
                    Caption = 'No.';
                }
                field(ItemDescription; GetItemDescription())
                {
                    Caption = 'Description';
                }
                field(ItemCategoryCode; GetItemCategoryCode()) //Rec.wiise_ItemCategoryCode)
                {
                    Caption = 'Category';
                }
                field("Unit Price"; GetUnitPrice())
                {
                    Caption = 'Unit Price';
                }
                field(hadd_Quantity; Rec.hadd_Quantity)
                {
                    ToolTip = 'Specifies the value of the Quantity field.', Comment = '%';
                }
                field("Unit of Measure"; GetUnitOfMeasure())
                {
                    Caption = 'Unit of Measure';
                }

                field("Amount"; GetAmount())
                {

                }
            }
        }
    }

    local procedure GetItemDescription(): Text[100]
    var
        Item: Record Item;
    begin
        if Item.GetBySystemId(Rec.hadd_Item) then
            exit(Item.Description)
        else
            exit('')
    end;

    local procedure GetItemNo(): Text[20]
    var
        Item: Record Item;
    begin
        if Item.GetBySystemId(Rec.hadd_Item) then
            exit(Item."No.")
        else
            exit('')
    end;

    local procedure GetItemCategoryCode(): Code[20]
    var
        Item: Record Item;
    begin
        if Item.GetBySystemId(Rec.hadd_Item) then
            exit(Item."Item Category Code")
        else
            exit('')
    end;

    local procedure GetUnitPrice(): Decimal
    var
        Item: Record Item;
    begin
        if Item.GetBySystemId(Rec.hadd_Item) then
            exit(Item."Unit Price")
        else
            Error('Price not found');
    end;

    local procedure GetUnitOfMeasure(): Text[50]
    var
        Item: Record Item;
        Unit: Record "Unit of Measure";
    begin
        if Item.GetBySystemId(Rec.hadd_Item) then begin
            if Unit.GetBySystemId(Item."Unit of Measure Id") then
                exit(Unit.Description)
            else
                exit('')
        end;
        exit('');
    end;

    local procedure GetAmount(): Decimal
    var
        Item: Record Item;
    begin
        if Item.GetBySystemId(Rec.hadd_Item) then
            exit(Item."Unit Price" * Rec.hadd_Quantity)
        else
            Error('Price not found');
    end;

}
```

## Pag50101.CustomerOrder.al

```text
page 50101 "Customer Order"
{
    ApplicationArea = All;
    Caption = 'Customer Order';
    PageType = Card;
    SourceTable = "CDS hadd_CustomerOrder";

    layout
    {
        area(Content)
        {
            group(General)
            {
                Caption = 'General';

                field(hadd_Name; Rec.hadd_Name)
                {
                    ToolTip = 'Specifies the value of the Name field.', Comment = '%';
                }
                field("Account Name"; Rec."Account Name")
                {
                    ToolTip = 'Specifies the value of the Account field.', Comment = '%';
                }
                field(hadd_RequestedDeliveryDate; Rec.hadd_RequestedDeliveryDate)
                {
                    ToolTip = 'Specifies the value of the Requested Delivery Date field.', Comment = '%';
                }
                field(statecode; Rec.statecode)
                {
                    ToolTip = 'Specifies the value of the Status field.', Comment = '%';
                }
                field(statuscode; Rec.statuscode)
                {
                    ToolTip = 'Specifies the value of the Status Reason field.', Comment = '%';
                }

                field("Total Amount"; GetTotalAmount())
                {

                }
            }

            part("Customer Order Lines"; "Customer Order Lines")
            {
                SubPageLink = "hadd_Order" = FIELD("hadd_CustomerOrderId");
            }

        }
    }


    local procedure GetTotalAmount(): Decimal
    var
        Item: Record Item;
        OrderLine: Record "CDS hadd_CustomerOrderLine";
        TotalAmount: Decimal;
    begin
        TotalAmount := 0;

        OrderLine.SetRange(OrderLine.hadd_Order, Rec."hadd_CustomerOrderId");

        if OrderLine.FindSet() then
            repeat
                if Item.GetBySystemId(OrderLine.hadd_Item) then
                    TotalAmount += Item."Unit Price" * OrderLine.hadd_Quantity;
            until OrderLine.Next() = 0;

        exit(TotalAmount);
    end;


    trigger OnInit()
    begin
        Codeunit.Run(Codeunit::"CRM Integration Management");
    end;

}
```