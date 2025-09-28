
---
title: "Custom Virtual Tables"
description: "Customer Content Virtual Tables"
date: "2025-09-20"
category: "Development"
image: "/assets/images/customtvirtualtables/hero.png"
tags: ["ai","business central","power platform"]
hidden: true
---

# Custom Virtual Tables

## Customer Content Virtual Tables

![](/assets/images/customtvirtualtables/office-365-icon-500x500.png)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


## Customer Content Virtual Tables

I created two related Business Central tables and connected to them as Power Platform Dataverse Virtual Tables.

![](/assets/images/customtvirtualtables/screenshot-2024-05-07-at-6.07.14pm-1836x923.png)
*The Car Brand table can be edited using the Car Brand List page*

![](/assets/images/customtvirtualtables/screenshot-2024-05-07-at-6.07.45pm-1836x921.png)
*The Car Model table can be edited using the Car Model List page*

![](/assets/images/customtvirtualtables/screenshot-2024-05-07-at-6.09.07pm-1836x1059.png)
*The Car Brand and Car Model tables are shown in the Available Tables list*

![](/assets/images/customtvirtualtables/screenshot-2024-05-07-at-6.09.51pm-1836x1063.png)
*The contents of the Car Brands table can be viewed using a Model Driven App View*

![](/assets/images/customtvirtualtables/screenshot-2024-05-07-at-6.10.02pm-1836x1064.png)
*The contents of the Car Models table can be viewed using a Model Driven App View*

![](/assets/images/customtvirtualtables/screenshot-2024-05-07-at-6.10.15pm-1836x1062.png)
*A Car Model record can be updated using a Model Driven App Form*


## Car.al

```text
table 50200 "Car Brand"
{
    DataClassification = CustomerContent;
    Caption = 'Car Brand';

    fields
    {
        field(1; Name; Text[100])
        {
            Caption = 'Name';
        }
        field(2; Description; Text[100])
        {
            Caption = 'Description';
        }
        field(3; "Country"; Text[100])
        {
            Caption = 'Country';
        }
    }

    keys
    {
        key(PK; Name)
        {
            Clustered = true;
        }
    }
}
table 50201 "Car Model"
{
    DataClassification = CustomerContent;
    Caption = 'Car Model';

    fields
    {
        field(1; Name; Text[100])
        {
            Caption = 'Name';
        }
        field(2; Description; Text[100])
        {
            Caption = 'Description';
        }
        field(3; "Brand Id"; Guid)
        {
            TableRelation = "Car Brand".SystemId;
            // https://yzhums.com/22220/
            ValidateTableRelation = false;
            Caption = 'Brand Id';
        }
        field(4; Power; Integer)
        {
            Caption = 'Power (cc)';
        }
        field(5; "Fuel Type"; Enum "Fuel Type")
        {
            Caption = 'Fuel Type';
        }
    }

    keys
    {
        key(PK; Name, "Brand Id")
        {
            Clustered = true;
        }
    }
}
enum 50200 "Fuel Type"
{
    Extensible = true;
    value(0; Petrol)
    {
        Caption = 'Petrol';
    }
    value(1; Diesel)
    {
        Caption = 'Diesel';
    }
    value(2; Electric)
    {
        Caption = 'Electric';
    }
}
page 50200 "API Car Brand"
{
    PageType = API;

    APIVersion = 'v1.0';
    APIPublisher = 'bctech';
    APIGroup = 'demo';

    EntityCaption = 'Car Brand';
    EntitySetCaption = 'Car Brands';
    EntityName = 'carBrand';
    EntitySetName = 'carBrands';

    ODataKeyFields = SystemId;
    SourceTable = "Car Brand";

    Extensible = false;
    DelayedInsert = true;

    layout
    {
        area(content)
        {
            repeater(Group)
            {
                field(id; Rec.SystemId)
                {
                    Caption = 'Id';
                    Editable = false;
                }

                field(name; Rec.Name)
                {
                    Caption = 'Name';
                }
                field(description; Rec.Description)
                {
                    Caption = 'Description';
                }
                field(country; Rec.Country)
                {
                    Caption = 'Country';
                }
            }

            part(carModels; "API Car Model")
            {
                Caption = 'Car Models';
                Multiplicity = ZeroOrOne;
                EntityName = 'carModel';
                EntitySetName = 'carModels';
                SubPageLink = "Brand Id" = Field(SystemId);
            }
        }
    }
}
page 50201 "API Car Model"
{
    PageType = API;

    APIVersion = 'v1.0';
    APIPublisher = 'bctech';
    APIGroup = 'demo';

    EntityCaption = 'Car Model';
    EntitySetCaption = 'Car Models';
    EntityName = 'carModel';
    EntitySetName = 'carModels';

    ODataKeyFields = SystemId;
    SourceTable = "Car Model";

    Extensible = false;
    DelayedInsert = true;

    layout
    {
        area(content)
        {
            repeater(Group)
            {
                field(id; Rec.SystemId)
                {
                    Caption = 'Id';
                    Editable = false;
                }
                field(name; Rec.Name)
                {
                    Caption = 'Name';
                }
                field(description; Rec.Description)
                {
                    Caption = 'Description';
                }
                field(brandId; Rec."Brand Id")
                {
                    Caption = 'Brand Id';
                }
                field(power; Rec.Power)
                {
                    Caption = 'Power';
                }
                field(fuelType; Rec."Fuel Type")
                {
                    Caption = 'Fuel Type';
                }
            }
        }
    }
}
permissionset 50200 "Car Brand"
{
    permissions =
        tabledata "Car Brand" = RIMD,
        page "API Car Brand" = X;

}
permissionset 50201 "Car Model"
{
    permissions =
        tabledata "Car Model" = RIMD,
        page "API Car Model" = X;

}


page 50210 "Car Brand List"
{
    PageType = List;
    SourceTable = "Car Brand";
    ApplicationArea = All;
    UsageCategory = Lists;

    layout
    {
        area(content)
        {
            repeater(Group)
            {
                field(id; Rec.SystemId)
                {
                    Caption = 'Id';
                    Editable = false;
                }

                field(name; Rec.Name)
                {
                    Caption = 'Name';
                }
                field(description; Rec.Description)
                {
                    Caption = 'Description';
                }
                field(country; Rec.Country)
                {
                    Caption = 'Country';
                }
            }




        }
    }
}
page 50211 "Car Model List"
{
    PageType = List;
    SourceTable = "Car Model";
    ApplicationArea = All;
    UsageCategory = Lists;

    layout
    {
        area(content)
        {
            repeater(Group)
            {
                field(id; Rec.SystemId)
                {
                    Caption = 'Id';
                    Editable = false;
                }
                field(name; Rec.Name)
                {
                    Caption = 'Name';
                }
                field(description; Rec.Description)
                {
                    Caption = 'Description';
                }
                field(brandId; Rec."Brand Id")
                {
                    Caption = 'Brand Id';
                }
                field(power; Rec.Power)
                {
                    Caption = 'Power';
                }
                field(fuelType; Rec."Fuel Type")
                {
                    Caption = 'Fuel Type';
                }
            }
        }
    }
}
```

