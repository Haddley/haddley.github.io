---
title: "A Teams App SharePoint Web Part for One Drive"
description: "The SharePoint Framework (SPFx) can be used to create SharePoint Web Parts and Teams Applications"
date: "2022-05-29"
categories: ["Microsoft 365","React","JavaScript","TypeScript"]
tags: []
slug: "ateamstabsharepointwebpartforonedrive"
image: "/assets/images/office-365-icon-500x500.png"
---

In this post I describe how I created a Teams application using the SharePoint Framework and the Microsoft Graph Toolkit

This post is based on PiaSys Tech Bites's [Using Microsoft Graph Toolkit with React](https://www.youtube.com/watch?v=5ZsD2uHVpz4) video, Microsoft 365 Community's [Building Microsoft Graph Toolkit apps with SharePoint](https://www.youtube.com/watch?v=PTWXRuPbSEw) video, and Microsoft's [Working with files in Microsoft Graph](https://docs.microsoft.com/en-us/graph/api/resources/onedrive?view=graph-rest-1.0) documentation.


## SharePoint Apps

SharePoint Framework (SPFx) applications are deployed to Microsoft 365 when they are uploaded to the [SharePoint online App catalog](sharepointwebpart2.html).

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.34.20-pm-1836x837.png)
*Navigate to the SharePoint admin center and click the "More features" link*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.37.19-pm-1836x839.png)
*Scroll down to the "Apps" section and click the "Open" link*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.37.27-pm-1836x832.png)
*If the "App Catalog" Site (Site Collection) does not exist it is created*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.37.47-pm-1836x842.png)
*A welcome message may be displayed*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-1.38.02-pm-1836x839.png)
*App Catalog's Manage apps page*


## yo @microsoft/sharepoint

I used "yo @microsoft/sharepoint" to create a haddley-file-list project.

I used "npm i @microsoft/mgt-spfx@2.5.1" to add Microsoft Graph Toolkit to the project.

I used "npm i @microsoft/mgt-react@2.5.1" to add Microsoft Graph Toolkit's React components to the project.

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.21.51-pm-1836x1000.png)
*yo @microsoft/sharepoint*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.24.19-pm-1836x1000.png)
*npm i @microsoft/mgt-spfx@2.5.1 @microsoft/mgt-react@2.5.1*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.25.08-pm-1836x1038.png)
*I updated serve.json to specify how the workbench would be loaded*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.27.28-pm-1836x1040.png)
*The workbench will be loaded in the context of the Mark8ProjectTeam Site*


## gulp

I used "gulp trust-dev-cert" to ensure that gulp would serve content using https

I used "gulp bundle && gulp serve" to preview the application in the workbench

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.28.17-pm-1836x1038.png)
*gulp serve to preview*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.29.18-pm-1836x805.png)
*Previewing the web part in the workbench*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-7.31.35-pm-1836x1035.png)
*I updated the SPFx Web Part code to add a global provider (constructed using the Web Part's context object)*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.38.53-am-1258x619.png)
*I added permission requests to package-solution.json*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.43.31-am-1255x617.png)
*I updated the Web Part's React code*


## Deployment

I used "gulp bundle --ship && gulp package-solution --ship" to create an .sppkg file (package).

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.48.51-am-1836x957.png)
*gulp bundle --ship && gulp package-solution --ship*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.04.55-am-1401x787.png)
*I navigated to the App catalog manage apps page*


## mgt-spfx-252.sppkg

At runtime (at least in Teams) the web part depends on a shared SharePoint app "mgt-spfx-XXX.sppkg".

https://github.com/microsoftgraph/microsoft-graph-toolkit/releases

I added this shared application to the App Catalog.

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.22.33-am-1183x745.png)
*I downloaded the mgt-spfx-2.5.2.sppkg file (package) from https://github.com/microsoftgraph/microsoft-graph-toolkit/releases. I uploaded the mgt-spfx-2.5.2.sppkg file (package) to the App catalog.*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.06.04-am-1399x783.png)
*I upload the project's haddley-file-list.sppkg file (package) to the App catalog*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-8.37.53-pm-1836x1103.png)
*I enabled the app and selected the enable this app and add to all sites option*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-8.38.08-pm-1836x1105.png)
*I navigated to the API access page*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-28-at-8.38.39-pm-1836x1104.png)
*I approved the permission requests*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.06.57-am-1395x785.png)
*As a test I added the web part to a SharePoint page*


## Adding to teams

The HaddleyListWebPart manifest suggests that the web part will work as a Teams App.

I did not need to update this file

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.13.43-am-1836x904.png)
*HaddleyListWebPart.manifest.json*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.07.16-am-449x303.png)
*I used the "Add to Teams" button in the App catalog to add the Web Part to Teams*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.09.26-am-1403x780.png)
*With no additional effort the web part was shown as a Published app in the Teams admin center*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.10.03-am-1401x787.png)
*The web part was also shown in the Teams desktop application*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.10.15-am-1397x781.png)
*I used the Add button to add the web part to Teams*

![](/assets/images/ateamstabsharepointwebpartforonedrive/screen-shot-2022-05-29-at-10.24.10-am-1400x786.png)
*Here is the code running in Teams*


## serve.json

```text
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json",
  "port": 4321,
  "https": true,
  "initialPage": "https://p8lf.sharepoint.com/sites/Mark8ProjectTeam/_layouts/workbench.aspx"
}
```

## HaddleyListWebPart.ts

```text
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'HaddleyListWebPartStrings';
import HaddleyList from './components/HaddleyList';
import { IHaddleyListProps } from './components/IHaddleyListProps';

import { Providers,SharePointProvider } from '@microsoft/mgt-spfx';

export interface IHaddleyListWebPartProps {
  description: string;
}

export default class HaddleyListWebPart extends BaseClientSideWebPart<IHaddleyListWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {

    if (!Providers.globalProvider){
      Providers.globalProvider =  new SharePointProvider(this.context);
    }

    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IHaddleyListProps> = React.createElement(
      HaddleyList,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
```

## package-solution.json

```text
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json",
  "solution": {
    "name": "haddley-file-list-client-side-solution",
    "id": "05e0e1db-dbd6-4913-a19e-a294d1c124ac",
    "version": "1.0.0.0",
    "includeClientSideAssets": true,
    "skipFeatureDeployment": true,
    "isDomainIsolated": false,
    "developer": {
      "name": "",
      "websiteUrl": "",
      "privacyUrl": "",
      "termsOfUseUrl": "",
      "mpnId": "Undefined-1.14.0"
    },
    "metadata": {
      "shortDescription": {
        "default": "haddley-file-list description"
      },
      "longDescription": {
        "default": "haddley-file-list description"
      },
      "screenshotPaths": [],
      "videoUrl": "",
      "categories": []
    },
    "features": [
      {
        "title": "haddley-file-list Feature",
        "description": "The feature that activates elements of the haddley-file-list solution.",
        "id": "a0601d92-f1c2-46d9-9dc7-39267ea39211",
        "version": "1.0.0.0"
      }
    ],
    "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "Mail.Read"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Files.Read"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Files.Read.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Sites.Read"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Sites.Read.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Sites.ReadWrite.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "User.Read"
      }
    ]
  },
  "paths": {
    "zippedPackage": "solution/haddley-file-list.sppkg"
  }
}
```

## HaddleyList.tsx

```text
import * as React from 'react';
import styles from './HaddleyList.module.scss';
import { IHaddleyListProps } from './IHaddleyListProps';
import { escape } from '@microsoft/sp-lodash-subset';
// import { Get, MgtTemplateProps, FileList } from '@microsoft/mgt-react';
import { Get, MgtTemplateProps, FileList } from '@microsoft/mgt-react/dist/es6/spfx';

export default class HaddleyList extends React.Component<IHaddleyListProps, {}> {
  public render(): React.ReactElement<IHaddleyListProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    //Template declaration for Get element
    const TemplateFiles = (props: MgtTemplateProps) => {
      console.log("props", props);
      console.log("props.dataContext", props.dataContext);
      let files = props.dataContext;
      if (!Array.isArray(files)) {
        files = [files];
      }
      return (<div>
        {files.map((file: any, index: number) => (<div key={index}>{file.name}</div>))}
      </div>);
    };

    const TemplateDocumentLibraries = (props: MgtTemplateProps) => {
      console.log("props", props);
      console.log("props.dataContext", props.dataContext);
      let libraries = props.dataContext;
      if (!Array.isArray(libraries)) {
        libraries = [libraries];
      }
      return (<div>
        {libraries.map((library: any, index: number) => (<div key={index}><strong>{library.name}</strong> {library.id}</div>))}
      </div>);
    };

    return (
      <section className={`${styles.haddleyList} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>

          <h1>Get /me/drive/root/children</h1>
          <Get resource="/me/drive/root/children">
            <TemplateFiles template="value" />
          </Get>

          <h1>My One Drive Root Folder</h1>
          <FileList enableFileUpload={true}></FileList>

          <h1>p8lf.sharepoint.com "Documents" Document Library Root Folder</h1>
          <FileList
            itemPath="/"
            siteId="p8lf.sharepoint.com"
            enableFileUpload={true}></FileList>

          <h1>p8lf.sharepoint.com "Documents" Document Library Root Folder</h1>
          <FileList
            itemPath="/"
            siteId="p8lf.sharepoint.com"
            enableFileUpload={true}></FileList>

          <h1>Get /sites/p8lf.sharepoint.com:/sites/Mark8ProjectTeam:/drives</h1>
          <Get resource="/sites/p8lf.sharepoint.com:/sites/Mark8ProjectTeam:/drives">
            <TemplateDocumentLibraries template="value" />
          </Get>

          <h1>p8lf.sharepoint.com "Confidental" Document Library Root Folder</h1>
          <FileList
            itemPath="/"
            driveId="b!rx9ik2KF4EGsjBMRetNJSrUFL8a5s69FmTUNWtyhqQhyOPxIxRDNT5VmV2cjHkdO"
            enableFileUpload={true}></FileList>

        </div>
      </section>
    );
  }
}
```

## Other useful code

```text
const siteId = (location.host + "," + context.pageContext.site.id + "," + context.pageContext.web.id).replace(/[\{\}]/g, "")

...

<h1>Get /sites/{siteId}/drive/root/children</h1>
<Get resource={`/sites/${siteId}/drive/root/children`}>
    <TemplateFiles template="value" />
</Get>

<FileList
    itemPath="/"
    siteId={siteId}
    enableFileUpload={true}>
</FileList>
```

## HaddleyListWebPart.manifest.json

```text
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json",
  "id": "2beda14b-5565-4acf-8d4a-dcbe8046bf01",
  "alias": "HaddleyListWebPart",
  "componentType": "WebPart",

  // The "*" signifies that the version should be taken from the package.json
  "version": "*",
  "manifestVersion": 2,

  // If true, the component can only be installed on sites where Custom Script is allowed.
  // Components that allow authors to embed arbitrary script code should set this to true.
  // https://support.office.com/en-us/article/Turn-scripting-capabilities-on-or-off-1f2c515f-5d7e-448a-9fd7-835da935584f
  "requiresCustomScript": false,
  "supportedHosts": ["SharePointWebPart", "TeamsPersonalApp", "TeamsTab", "SharePointFullPage"],
  "supportsThemeVariants": true,

  "preconfiguredEntries": [{
    "groupId": "5c03119e-3074-46fd-976b-c60198311f70", // Other
    "group": { "default": "Other" },
    "title": { "default": "HaddleyList" },
    "description": { "default": "HaddleyList description" },
    "officeFabricIconFontName": "Page",
    "properties": {
      "description": "HaddleyList"
    }
  }]
}
```