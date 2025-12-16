---
title: "Business Central Azure Functions (Part 2)"
description: "Creating the Business Central Extension"
date: "2025-12-16"
categories: ["Azure","Microsoft Dynamics","Business Central"]
image: "/assets/images/posts-meta.svg"
tags: ["azure","business central","azure functions"]
hidden: false
slug: "azurefunctionsbc2"
---

# Business Central Azure Functions

## Creating the Business Central Extension

![](/assets/images/azurefunctionsbc2/Screenshot 2025-12-16 at 2.25.38 PM.png)
*Azure Functions App used to generate Customer QR Code*

## project files

```text
ALProjectQRCodeGenerator/
├── .vscode/
├── .alpackages/
├── .git/
├── .snapshots/
├── app.json
├── Customer Card QR Extension.al
├── Customer QR Code FactBox.al
├── QR Code Helper.al
├── QR Code Media.al
└── Neil Haddley_ALProjectQRCodeGenerator_1.0.0.0.app
```


## Summary: ALProjectQRCodeGenerator

### **Overview**
A Business Central extension that automatically generates and displays QR codes for customer records using an Azure Function integration.

---

### **Architecture Flow**

```
Customer Card → FactBox → Helper → Azure Function → MediaSet Storage → Display
```

---

### **1. QR Code Media.al (Table 50100)**

**Purpose:** Persistent storage for QR code images

```al
table 50100 "QR Code Media"
{
    fields
    {
        "Customer No." (Code[20])      // Primary key, links to Customer
        "Media ID" (Media)             // Legacy binary storage field
        "QR Code Image" (MediaSet)     // Active field for UI display
        "Created DateTime" (DateTime)   // Auto-timestamp on insert
    }
    
    trigger OnInsert() 
    {
        "Created DateTime" := CurrentDateTime;  // Auto-populate timestamp
    }
}
```

---

### **2. QR Code Helper.al (Codeunit 50100)**

**Purpose:** Business logic for QR code generation and storage

#### **Main Procedure: GenerateQRCodeForCustomer()**
```
1. Validate customer exists
2. Build QR text content (customer number + name)
3. Construct API URL with encoded parameters
4. Detect response format (base64 vs binary)
5. Call Azure Function via HttpClient
6. Convert response to MediaSet
7. Store in database
8. Return MediaId GUID
```

#### **Key Methods:**

**GetCustomerQRText()** - Content Builder
- Retrieves company info
- Formats: `CUSTOMER:[No.]|NAME:[Name]`
- Commented option: Direct URL to BC customer card

**StoreQRCodeImageFromBase64()** - Base64 Handler
- Extracts base64 data from `data:image/png;base64,...` URI
- Uses `Base64 Convert` codeunit
- Converts to binary stream via `Temp Blob`
- Imports to MediaSet with `.png` filename

**StoreQRCodeImage()** - Binary Handler
- Direct stream import from HTTP response
- Used for APIs returning raw PNG bytes

**IsBase64Response()** - Format Detector
- Checks if URL contains `'azurewebsites'`
- Returns `true` for Azure Functions (base64)
- Returns `false` for public APIs (binary)

**EncodeUrl()** - URL Encoding
- Uses `Type Helper.UriEscapeDataString()`
- Properly encodes special characters for query parameters

---

### **3. Customer QR Code FactBox.al (Page 50100)**

**Purpose:** UI component displaying QR code in Customer Card

```al
page 50100 "Customer QR Code FactBox"
{
    PageType = CardPart;
    SourceTable = "QR Code Media";
    
    layout {
        field("QR Code Image")    // MediaSet displays as image
        label("Scan to view...")  // User guidance text
    }
    
    trigger OnOpenPage() {
        if Rec.IsEmpty() then
            GenerateQRCode();  // Auto-generate if missing
    }
}
```

**Logic:**
- Checks if QR code exists on page open
- Calls `GenerateQRCodeForCustomer()` if missing
- Refreshes page to display new image

---

### **4. Customer Card QR Extension.al (PageExtension 50100)**

**Purpose:** Integrates FactBox into standard Customer Card

```al
pageextension 50100 extends "Customer Card"
{
    layout {
        addfirst(factboxes) {
            part(QRCodeFactBox; "Customer QR Code FactBox") {
                SubPageLink = "Customer No." = FIELD("No.");
            }
        }
    }
}
```

**Integration:**
- Adds FactBox to top of factboxes area
- Links FactBox to current customer via SubPageLink
- No code modifications to base page

---

### **5. app.json**

**Configuration:**
- **Dependencies:** Base Application (27.0), System Application (27.0)
- **Object Range:** 50100-50149
- **Runtime:** 16.0 with NoImplicitWith
- **Publisher:** Neil Haddley

---

### **Technical Highlights**

✅ **Dual Format Support:** Handles both base64 and binary image responses  
✅ **Auto-Generation:** Creates QR codes on-demand when missing  
✅ **Clean Separation:** Helper handles logic, FactBox handles UI  
✅ **Modern BC Patterns:** Uses HttpClient (not deprecated Azure Functions codeunits)  
✅ **MediaSet Storage:** Proper image handling for BC UI rendering  
✅ **URL Encoding:** Safely handles special characters in customer data  

---

### **Data Flow Example**

```
User opens Customer "C001" 
  ↓
FactBox checks QR Code Media for "C001"
  ↓
Not found → Calls GenerateQRCodeForCustomer("C001")
  ↓
Helper builds: "CUSTOMER:C001|NAME:Contoso Ltd"
  ↓
Calls: https://azure-function.../api/QRCodeGenerator?text=CUSTOMER%3AC001...
  ↓
Receives: data:image/png;base64,iVBORw0KGgoAAAA...
  ↓
Converts base64 → binary stream → MediaSet
  ↓
Stores in QR Code Media table
  ↓
FactBox displays QR code image
  ↓
User scans with phone → Sees customer info
```






## app.json

```json
{
  "id": "d3c72ccb-3945-46b3-8e4e-b784aaf1bd69",
  "name": "ALProjectQRCodeGenerator",
  "publisher": "Neil Haddley",
  "version": "1.0.0.0",
  "brief": "",
  "description": "",
  "privacyStatement": "",
  "EULA": "",
  "help": "",
  "url": "",
  "logo": "",
  "dependencies": [
    {
      "id": "437dbf0e-84ff-417a-965d-ed2bb9650972",
      "name": "Base Application",
      "publisher": "Microsoft",
      "version": "27.0.0.0"
    },
    {
      "id": "63ca2fa4-4f03-4f2b-a480-172fef340d3f",
      "name": "System Application",
      "publisher": "Microsoft",
      "version": "27.0.0.0"
    }
  ],
  "screenshots": [],
  "platform": "1.0.0.0",
  "application": "27.0.0.0",
  "idRanges": [
    {
      "from": 50100,
      "to": 50149
    }
  ],
  "resourceExposurePolicy": {
    "allowDebugging": true,
    "allowDownloadingSource": true,
    "includeSourceInSymbolFile": true
  },
  "runtime": "16.0",
  "features": [
    "NoImplicitWith"
  ]
}
```

## Customer Card QR Extension.al

```
pageextension 50100 "Customer Card QR Extension" extends "Customer Card"
{
    layout
    {
        addfirst(factboxes)
        {
            part(QRCodeFactBox; "Customer QR Code FactBox")
            {
                ApplicationArea = All;
                SubPageLink = "Customer No." = FIELD("No.");
            }
        }
    }
}
```

## Customer QR Code FactBox.al

```
page 50100 "Customer QR Code FactBox"
{
    PageType = CardPart;
    SourceTable = "QR Code Media";
    Caption = 'Customer QR Code';

    layout
    {
        area(Content)
        {
            group(QRCodeGroup)
            {
                ShowCaption = false;
                field(QRCodeImage; Rec."QR Code Image")
                {
                    ApplicationArea = All;
                    ShowCaption = false;
                    Editable = false;
                    ToolTip = 'QR Code for customer';
                }
                label(Description)
                {
                    ApplicationArea = All;
                    Caption = 'Scan to view customer details';
                    Style = Subordinate;
                }
            }
        }
    }

    var
        QRCodeHelper: Codeunit "QR Code Helper";

    trigger OnAfterGetRecord()
    begin
        // Record already loaded
    end;

    trigger OnOpenPage()
    begin
        // Generate QR code if it doesn't exist
        if Rec.IsEmpty() then
            GenerateQRCode();
    end;

    local procedure GenerateQRCode()
    var
        Customer: Record Customer;
    begin
        if Customer.Get(Rec."Customer No.") then
            QRCodeHelper.GenerateQRCodeForCustomer(Customer."No.");

        // Refresh the page to show the new QR code
        if Rec.Get(Rec."Customer No.") then;
    end;
}
```

## QR Code Helper.al

```
codeunit 50100 "QR Code Helper"
{
    // This function generates a QR code for a customer and stores it
    procedure GenerateQRCodeForCustomer(CustomerNo: Code[20]): Guid
    var
        Customer: Record Customer;
        HttpClient: HttpClient;
        HttpResponse: HttpResponseMessage;
        ResponseText: Text;
        InStr: InStream;
        FunctionUrl: Text;
        QRCodeText: Text;
        ImageMediaId: Guid;
        UseBase64: Boolean;
    begin
        // 1. Get the customer record
        if not Customer.Get(CustomerNo) then
            exit;

        // 2. Build the text to encode in the QR code
        QRCodeText := GetCustomerQRText(Customer);

        // 3. Build the full URL with encoded query parameter
        FunctionUrl := GetFunctionUrl() + EncodeUrl(QRCodeText);
        UseBase64 := IsBase64Response(FunctionUrl);

        // 4. Call the API to generate QR code
        if not HttpClient.Get(FunctionUrl, HttpResponse) then
            Error('Failed to call QR code generation service');

        if not HttpResponse.IsSuccessStatusCode() then
            Error('Failed to generate QR code. Status: %1', HttpResponse.HttpStatusCode());

        // 5. Get the response content
        if UseBase64 then begin
            if not HttpResponse.Content.ReadAs(ResponseText) then
                Error('Failed to read response content');
            ImageMediaId := StoreQRCodeImageFromBase64(CustomerNo, ResponseText);
        end else begin
            if not HttpResponse.Content.ReadAs(InStr) then
                Error('Failed to read response content');
            ImageMediaId := StoreQRCodeImage(CustomerNo, InStr);
        end;

        exit(ImageMediaId);
    end;

    local procedure EncodeUrl(TextToEncode: Text): Text
    var
        TypeHelper: Codeunit "Type Helper";
    begin
        exit(TypeHelper.UriEscapeDataString(TextToEncode));
    end;

    local procedure GetCustomerQRText(Customer: Record Customer): Text
    var
        CompanyInfo: Record "Company Information";
        BaseUrl: Text;
    begin
        // Customize this based on what you want in the QR code
        if CompanyInfo.Get() then
            BaseUrl := CompanyInfo."Home Page"; // Or your Business Central base URL

        // Example 1: URL to the customer card in Business Central
        // exit(StrSubstNo('%1?page=21&bookmark=Customer.''No.''=%2', BaseUrl, Customer."No."));

        // Example 2: Simple customer information
        exit(StrSubstNo('CUSTOMER:%1|NAME:%2', Customer."No.", Customer.Name));
    end;

    local procedure StoreQRCodeImageFromBase64(CustomerNo: Code[20]; Base64DataUri: Text): Guid
    var
        QRCodeMedia: Record "QR Code Media";
        Base64Convert: Codeunit "Base64 Convert";
        TempBlob: Codeunit "Temp Blob";
        InStr: InStream;
        OutStr: OutStream;
        Base64Data: Text;
        PrefixPos: Integer;
    begin
        // Check if record already exists
        if QRCodeMedia.Get(CustomerNo) then
            QRCodeMedia.Delete();

        // Extract base64 data from data URI
        // Format: data:image/png;base64,iVBORw0KGgo...
        PrefixPos := StrPos(Base64DataUri, ',');
        if PrefixPos > 0 then
            Base64Data := CopyStr(Base64DataUri, PrefixPos + 1)
        else
            Base64Data := Base64DataUri;

        // Convert base64 to stream
        TempBlob.CreateOutStream(OutStr);
        Base64Convert.FromBase64(Base64Data, OutStr);
        TempBlob.CreateInStream(InStr);

        // Create a new record
        QRCodeMedia.Init();
        QRCodeMedia."Customer No." := CustomerNo;

        // Import into MediaSet field
        QRCodeMedia."QR Code Image".ImportStream(InStr, 'QRCode.png');
        QRCodeMedia.Insert(true);

        exit(QRCodeMedia."QR Code Image".MediaId());
    end;

    local procedure StoreQRCodeImage(CustomerNo: Code[20]; InStr: InStream): Guid
    var
        QRCodeMedia: Record "QR Code Media";
    begin
        // Check if record already exists
        if QRCodeMedia.Get(CustomerNo) then
            QRCodeMedia.Delete();

        // Create a new record in our custom media table
        QRCodeMedia.Init();
        QRCodeMedia."Customer No." := CustomerNo;
        QRCodeMedia."QR Code Image".ImportStream(InStr, 'QRCode.png');
        QRCodeMedia.Insert(true);

        exit(QRCodeMedia."QR Code Image".MediaId());
    end;

    local procedure GetFunctionUrl(): Text
    begin

        // Your Azure Function that returns base64 data URI
        exit('https://qrcode-generator-function-e5c2d8dwcabsbbfe.eastus-01.azurewebsites.net/api/QRCodeGenerator?text=');


        // Alternative: Using public QR API (returns binary PNG directly)
        //exit('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=');
    end;

    local procedure IsBase64Response(Url: Text): Boolean
    begin
        // Returns true if the configured API returns base64 data URI
        // Azure Functions typically return base64, public APIs return binary
        exit(StrPos(Url, 'azurewebsites') > 0);
    end;

    local procedure GetFunctionKey(): Text
    begin
        // IMPORTANT: Use Isolated Storage or Azure Key Vault integration in production
        exit('your-actual-function-key-here');
    end;
}
```

## QR Code Media.al

```
table 50100 "QR Code Media"
{
    DataClassification = ToBeClassified;

    fields
    {
        field(1; "Customer No."; Code[20])
        {
            TableRelation = Customer;
        }
        field(2; "Media ID"; Media)
        {
            // This field stores the actual image
            Caption = 'QR Code Image';
        }
        field(3; "QR Code Image"; MediaSet)
        {
            Caption = 'QR Code';
        }
        field(4; "Created DateTime"; DateTime)
        {
            Editable = false;
        }
    }

    keys
    {
        key(PK; "Customer No.")
        {
            Clustered = true;
        }
    }

    trigger OnInsert()
    begin
        "Created DateTime" := CurrentDateTime;
    end;
}
```

The error message "The request was blocked by the runtime to prevent accidental use of production services" indicates that outbound HTTP calls are blocked by default in your Business Central environment, typically a sandbox or a copied production environment. To resolve this, you need to manually enable the setting for your extension. 

![](/assets/images/azurefunctionsbc2/Screenshot 2025-12-16 at 2.04.25 PM.png)
*Allow HttpClient Requests*


## References

- [Use Azure Functions with Dynamics 365 Business Central](https://learn.microsoft.com/en-us/training/modules/use-azure-functions/)