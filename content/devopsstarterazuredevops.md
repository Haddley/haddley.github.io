---
title: "DevOps Starter Azure DevOps"
description: "Everything you need for developing, deploying, and monitoring your application."
date: "2021-04-26"
categories: ["DevOps","Azure","JavaScript"]
tags: []
slug: "devopsstarterazuredevops"
image: "/assets/images/svgexport-22.svg"
---



DevOps Starter makes it easy to get started on Azure using either GitHub actions or Azure DevOps

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.13.17-pm-810x140.png)
*Click "here" to switch between GitHub actions and Azure DevOps*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.14.02-pm-1836x1035.png)
*Select Azure DevOps and Node*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.14.37-pm-1836x1035.png)
*Select Express*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.14.54-pm-1836x1033.png)
*Select Web App for Containers or Windows Web App*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.16.07-pm-1836x1030.png)
*Web App on Windows can be used with Pricing tier "F1 Free"*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.27.04-pm-1836x1032.png)
*Azure resources have been deployed*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.27.50-pm-1836x988.png)
*Continuous integration and Continuous delivery pipeline has completed*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.29.05-pm-1836x993.png)
*Click Clone to edit code*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.31.23-pm-1200x386.png)
*Open Visual Studio Code*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.41.06-pm-1836x1081.png)
*Make update... add an extra description line.*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.42.19-pm-1836x1084.png)
*Push changes to Azure git*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.42.44-pm-1836x989.png)
*New commit was successful*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.45.48-pm-1836x985.png)
*Pipeline is running*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.48.20-pm-1836x989.png)
*Pipeline has completed*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.49.29-pm-1836x986.png)
*Updated code has been deployed to production*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-5.58.49-pm-1836x1419.png)
*View or edit pipeline*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-6.23.50-pm-1836x1002.png)
*Node.js tool installer View YAML*

![](/assets/images/devopsstarterazuredevops/screen-shot-2021-04-26-at-6.28.57-pm-1836x1007.png)
*Agent job 1 View YAML*


## Agent job 1

```yaml
pool:
  name: Azure Pipelines
steps:
- task: NodeTool@0
  displayName: 'Use Node version'
  inputs:
    versionSpec: 8.4

- task: Npm@0
  displayName: 'Install application dependencies'
  inputs:
    cwd: Application
    arguments: '--force'

- task: Npm@0
  displayName: 'Install test dependencies'
  inputs:
    cwd: Tests
    arguments: '--force'

- task: gulp@0
  displayName: 'Run unit tests'
  inputs:
    gulpFile: Tests/gulpfile.js
    targets: unittest
    gulpjs: 'Tests/node_modules/gulp/bin/gulp.js'
    publishJUnitResults: true

- task: ArchiveFiles@2
  displayName: 'Archive application'
  inputs:
    rootFolderOrFile: '$(System.DefaultWorkingDirectory)/Application'
    includeRootFolder: false
    archiveFile: '$(Build.ArtifactStagingDirectory)/Application$(Build.BuildId).zip'

- task: ArchiveFiles@2
  displayName: 'Archive tests'
  inputs:
    rootFolderOrFile: '$(System.DefaultWorkingDirectory)/Tests'
    includeRootFolder: false
    archiveFile: '$(Build.ArtifactStagingDirectory)/Tests$(Build.BuildId).zip'

- task: CopyFiles@2
  displayName: 'Copy ARM templates'
  inputs:
    SourceFolder: armTemplates
    TargetFolder: '$(build.artifactstagingdirectory)'

- task: PublishBuildArtifacts@1
  displayName: 'Publish Artifact: drop'
```
## References

- [DevOps Starter](https://docs.microsoft.com/en-us/azure/devops-project/overview)