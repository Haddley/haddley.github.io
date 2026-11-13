---
type: post
slug: nuget
title: "NuGet C#"
date: "2021-02-27"
builds_on: []
topics: [nuget-packages, c-sharp-development, dotnet-cli, automated-testing]
tools: [NuGet, .NET, GitHub Actions, MSTest, Git]
status: current
checked: "2026-11-06"
source_hash: "7ee14ac3cd4d"
generated_by: gemma4:12b
---

**Summary.** I explain how to create, publish, and consume a NuGet package using C#. I demonstrate the full workflow from local development to automated testing and final distribution.

## What I did
- I created a class library and a test project.
- I linked the projects and added a .gitignore file.
- I configured the project metadata and automated the tests.
- I packaged and published the library to nuget.org.
- I consumed the package in a local project.

## Claims
- NuGet is the standard package manager for the .NET ecosystem.
  > "NuGet is the package manager for .NET."
- I included specific metadata tags like PackageId and Version in the project file.
  > "I added PackageLicenseExpression, PackageId and Version tags to the .csproj file."
- I used the dotnet pack command to generate the final package file.
  > "I used `dotnet pack` to create the .nupkg file."
- I verified the functionality of the code by running tests locally.
  > "I used `dotnet test` to run the unit tests locally."
- I automated the testing process using a GitHub Action.
  > "I added a GitHub Action to run tests automatically."
- I installed the finished package into a project to use it.
  > "$ dotnet add package HaddleyOffice365.dotnet-factorial --version 1.0.0**"

## Outcome
I built a published NuGet package and demonstrated how to consume it. I established a workflow for automated testing and distribution.

## Caveats
The post does not explain the internal mechanics of tail recursion or compiler optimizations.
