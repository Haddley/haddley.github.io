---
title: "Rewards Extension"
description: "Rewards Extension"
date: "2023-08-30"
categories: ["Business Central"]
tags: ""
slug: "rewardsextension"
image: "/assets/images/rewardsextension/dynamics365-color.svg"
---



The Microsoft Dynamics 365 Business Central Extension described here allows users to create a list of "Rewards" and to associate rewards with Business Central Customers.

![](/assets/images/rewardsextension/20230830image1-1021x770.png)
*I added the idRange needed for the Rewards extension*


## Rewards table

I created a Rewards.al file. In the Rewards.al file I added code to created a Business Central "Reward" table, a Business Central "Reward Card" page and a Business Central "Reward List" page.

![](/assets/images/rewardsextension/20230830image2-1443x1068.png)
*I navigated to http://bcserver/BC/?tenant=default&page=50102 to view the Reward table using the Reward List page*

![](/assets/images/rewardsextension/20230830image3-1288x520.png)
*I added a Reward item*

![](/assets/images/rewardsextension/20230830image4-1287x523.png)
*The reward item has been stored in the Reward Table*

![](/assets/images/rewardsextension/20230830image10-1415x1024.png)
*I added the Minimum Purchase field to the Reward List page*

![](/assets/images/rewardsextension/20230830image11-1416x1023.png)
*I added the Minimum Purchase field to the Reward Card page*

![](/assets/images/rewardsextension/20230830image15-1390x1038.png)
*I added a Customer Ext (table extension) and a Customer Card Ext (card extension) to associate a Reward value with an Business Central Customer*


## Documentation

I used [Meta's codellama language model](LMStudio.html) to create the AL code documentation.

![](/assets/images/rewardsextension/screenshot-2023-08-30-at-1.28.36-pm-1466x1340.png)
*LM Studio code llama instruct 7B*


## code llama instruct 7B

**Please explain this Business Central AL code**

This code creates a new table called "Reward" with four fields: "Reward ID", "Description", "Discount Percentage", and "Minimum Purchase". The "Reward ID" field is the primary key of the table. The "Description" field can contain a string with up to 250 characters, the "Discount Percentage" field is a Decimal numeric value that represents the discount that will be applied for this reward, and the "Minimum Purchase" field is also a Decimal numeric value that represents the minimum purchase amount required to qualify for this reward.

The code also creates two pages: "Reward Card" and "Reward List". The "Reward Card" page is of type "Card" and will render as a card, while the "Reward List" page is of type "List" and will render as a list. The source table for both pages is the "Reward" table.

The "Reward Card" page has a layout that includes a group called "Reward" with four fields: "Reward ID", "Description", "Discount Percentage", and "Minimum Purchase". The "Reward ID" field is a text box that displays the value of the "Reward ID" field from the "Reward" table, while the other three fields are also text boxes that display the corresponding values.

The "Reward List" page has a layout that includes a repeater called "Rewards". The repeater contains four fields: "Reward ID", "Description", "Minimum Purchase", and "Discount Percentage". Each record in the "Reward" table will be displayed as a separate row in the list.

The code also includes a table extension called "Customer Ext" that extends the "Customer" table with an additional field called "Reward ID". The "Reward ID" field is set to have a table relation to the "Reward ID" field in the "Reward" table, and it is also set to validate the table relationship.

Finally, the code includes a page extension called "Customer Card Ext" that extends the "Customer Card" page with an additional text box called "Reward ID". The "Reward ID" text box displays the value of the "Reward ID" field from the "Customer" table and allows users to select a reward from a lookup window. The "Rewards" action is also added to the Navigation group, which will run the "Reward List" page when activated.


## Rewards.al

```text
table 50100 Reward
{
    DataClassification = ToBeClassified;


    fields
    {
        // The "Reward ID" field represents the unique identifier
        // of the reward and can contain up to 30 Code characters.
        field(1; "Reward ID"; Code[30])
        {
            DataClassification = ToBeClassified;
        }


        // The "Description" field can contain a string
        // with up to 250 characters.
        field(2; Description; Text[250])
        {
            // This property specified that
            // this field cannot be left empty.
            NotBlank = true;
        }


        // The "Discount Percentage" field is a Decimal numeric value
        // that represents the discount that will
        // be applied for this reward.
        field(3; "Discount Percentage"; Decimal)
        {
            // The "MinValue" property sets the minimum value for the "Discount Percentage"
            // field.
            MinValue = 0;


            // The "MaxValue" property sets the maximum value for the "Discount Percentage"
            // field.
            MaxValue = 100;


            // The "DecimalPlaces" property is set to 2 to display discount values with  
            // exactly 2 decimals.
            DecimalPlaces = 2;
        }
    }


    keys
    {
        // The field "Reward ID" is used as the primary key of this table.
        key(PK; "Reward ID")
        {
            // Create a clustered index from this key.
            Clustered = true;
        }
    }
}


page 50101 "Reward Card"
{
    // The page will be of type "Card" and will render as a card.
    PageType = Card;


    // The page will be part of the "Tasks" group of search results.
    UsageCategory = Tasks;


    // The source table shows data from the "Reward" table.
    SourceTable = Reward;


    // The layout describes the visual parts on the page.
    layout
    {
        area(content)
        {
            group(Reward)
            {
                field("Reward Id"; Rec."Reward ID")
                {
                    // ApplicationArea sets the application area that
                    // applies to the page field and action controls.
                    // Setting the property to All means that the control
                    // will always appear in the user interface.
                    ApplicationArea = All;
                }


                field(Description; Rec.Description)
                {
                    ApplicationArea = All;
                }


                field("Discount Percentage"; Rec."Discount Percentage")
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}


page 50102 "Reward List"
{
    // Specify that this page will be a list page.
    PageType = List;


    // The page will be part of the "Lists" group of search results.
    UsageCategory = Lists;


    // The data of this page is taken from the "Reward" table.
    SourceTable = Reward;


    // The "CardPageId" is set to the Reward Card previously created.
    // This will allow users to open records from the list in the "Reward Card" page.
    CardPageId = "Reward Card";


    layout
    {
        area(content)
        {
            repeater(Rewards)
            {
                field("Reward ID"; Rec."Reward ID")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the level of reward that the customer has at this point.';
                }


                field(Description; Rec.Description)
                {
                    ApplicationArea = All;
                }


                field("Discount Percentage"; Rec."Discount Percentage")
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}
```

## Rewards.al updated

```text
table 50100 Reward
{
    DataClassification = ToBeClassified;


    fields
    {
        // The "Reward ID" field represents the unique identifier
        // of the reward and can contain up to 30 Code characters.
        field(1; "Reward ID"; Code[30])
        {
            DataClassification = ToBeClassified;
        }


        // The "Description" field can contain a string
        // with up to 250 characters.
        field(2; Description; Text[250])
        {
            // This property specified that
            // this field cannot be left empty.
            NotBlank = true;
        }


        // The "Discount Percentage" field is a Decimal numeric value
        // that represents the discount that will
        // be applied for this reward.
        field(3; "Discount Percentage"; Decimal)
        {
            // The "MinValue" property sets the minimum value for the "Discount Percentage"
            // field.
            MinValue = 0;


            // The "MaxValue" property sets the maximum value for the "Discount Percentage"
            // field.
            MaxValue = 100;


            // The "DecimalPlaces" property is set to 2 to display discount values with  
            // exactly 2 decimals.
            DecimalPlaces = 2;
        }


        field(4; "Minimum Purchase"; Decimal)
        {
            MinValue = 0;
            DecimalPlaces = 2;
        }


    }


    keys
    {
        // The field "Reward ID" is used as the primary key of this table.
        key(PK; "Reward ID")
        {
            // Create a clustered index from this key.
            Clustered = true;
        }
    }
}


page 50101 "Reward Card"
{
    // The page will be of type "Card" and will render as a card.
    PageType = Card;


    // The page will be part of the "Tasks" group of search results.
    UsageCategory = Tasks;


    // The source table shows data from the "Reward" table.
    SourceTable = Reward;


    // The layout describes the visual parts on the page.
    layout
    {
        area(content)
        {
            group(Reward)
            {
                field("Reward Id"; Rec."Reward ID")
                {
                    // ApplicationArea sets the application area that
                    // applies to the page field and action controls.
                    // Setting the property to All means that the control
                    // will always appear in the user interface.
                    ApplicationArea = All;
                }


                field(Description; Rec.Description)
                {
                    ApplicationArea = All;
                }


                field("Minimum Purchase"; Rec."Minimum Purchase")
                {
                    ApplicationArea = All;
                }


                field("Discount Percentage"; Rec."Discount Percentage")
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}


page 50102 "Reward List"
{
    // Specify that this page will be a list page.
    PageType = List;


    // The page will be part of the "Lists" group of search results.
    UsageCategory = Lists;


    // The data of this page is taken from the "Reward" table.
    SourceTable = Reward;


    // The "CardPageId" is set to the Reward Card previously created.
    // This will allow users to open records from the list in the "Reward Card" page.
    CardPageId = "Reward Card";


    layout
    {
        area(content)
        {
            repeater(Rewards)
            {
                field("Reward ID"; Rec."Reward ID")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the level of reward that the customer has at this point.';
                }


                field(Description; Rec.Description)
                {
                    ApplicationArea = All;
                }


                field("Minimum Purchase"; Rec."Minimum Purchase")
                {
                    ApplicationArea = All;
                }


                field("Discount Percentage"; Rec."Discount Percentage")
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}


tableextension 50103 "Customer Ext" extends Customer
{
    fields
    {
        field(50100; "Reward ID"; Code[30])
        {
            // Set links to the "Reward ID" from the Reward table.
            TableRelation = Reward."Reward ID";


            // Set whether to validate a table relationship.
            ValidateTableRelation = true;


            // "OnValidate" trigger executes when data is entered in a field.
            trigger OnValidate();
            begin


                // If the "Reward ID" changed and the new record is blocked, an error is thrown.
                if (Rec."Reward ID" <> xRec."Reward ID") and
                    (Rec.Blocked <> Blocked::" ") then begin
                    Error('Cannot update the rewards status of a blocked customer.')
                end;
            end;
        }
    }
}


pageextension 50104 "Customer Card Ext" extends "Customer Card"
{
    layout
    {
        // The "addlast" construct adds the field control as the last control in the General
        // group.
        addlast(General)
        {
            field("Reward ID"; Rec."Reward ID")
            {
                ApplicationArea = All;


                // Lookup property is used to provide a lookup window for
                // a text box. It is set to true, because a lookup for
                // the field is needed.
                Lookup = true;
            }
        }
    }


    actions
    {
        // The "addfirst" construct will add the action as the first action
        // in the Navigation group.
        addfirst(Navigation)
        {
            action("Rewards")
            {
                ApplicationArea = All;


                // "RunObject" sets the "Reward List" page as the object
                // that will run when the action is activated.
                RunObject = page "Reward List";
            }
        }
    }
}
```