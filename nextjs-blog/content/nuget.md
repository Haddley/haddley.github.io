---
title: "NuGet C#"
description: "A comprehensive guide covering nuget c#"
date: "2025-09-20"
category: "Development"
image: "/assets/images/logo-og-600x600.png"
tags: ["dotnet","c#","ai","git","github"]
---

# NuGet C#

## Create, publish and consume a NuGet package using C#.

![](/assets/images/nuget/logo-og-600x600.png)
*NuGet project logo by NuGet project team is licensed under CC*


## Recursion

*When a function is called, the computer must "remember" the place it was called from... so that it can return to that location with the result once the call is complete. Typically, this information is saved on the call stack... For tail calls, there is no need to remember the caller...*

[https://en.wikipedia.org/wiki/Tail_call](https://en.wikipedia.org/wiki/Tail_call)

Some interpreters (and compilers) eliminate the stack frame creation and destruction work when they recognize tail recursion.


## C#

Adding a "**HaddleyOffice365.dotnet-factorial**" package to NuGet.org.

NuGet is the package manager for .NET.

Start by creating a **dotnet-factorial** repository in the https://github.com/**HaddleyOffice365** profile.

![](/assets/images/nuget/screen-shot-2021-03-01-at-5.09.52-pm-788x908.png)
*New repository will be named dotnet-factorial*

![](/assets/images/nuget/screen-shot-2021-02-28-at-1.10.13-pm-1048x348.png)
*Publish to GitHub*

![](/assets/images/nuget/screen-shot-2021-02-28-at-1.11.02-pm-1026x236.png)
*Open in Visual Studio Code*


## Create a .NET solution and the .NET projects

Create a dotnet solution

**$ dotnet new sln**

Create a class library project and add the new class library project to the solution

**$ dotnet new classlib -o dotnet-factorial
$ dotnet sln add ./dotnet-factorial/dotnet-factorial.csproj**

Create a test project and add the new test project to the solution

**$ dotnet new mstest -o unittests
$ dotnet sln add ./unittests/unittests.csproj**

At a reference from the unit tests project to the factorial project.

**$ dotnet add  ./unittests/unittests.csproj reference ./dotnet-factorial/dotnet-factorial.csproj **

Add a .gitignore file to the unit tests project directory and to the factorial project directory.

**$ cd dotnet-factorial
$ dotnet new gitignore
$ cd ../unittests
$ dotnet new gitignore
$ cd ..**

![](/assets/images/nuget/screen-shot-2021-03-01-at-5.22.23-pm-1836x1105.png)
*new solution, new classlib project and new mstest project*


## Rename UnitTest1, copy and rename Class1

Rename the generated UnitTest1 class to "UnitTests"

Copy Class1 class and rename to "recursivefunctions.cs"
Rename the generated Class1 class to "iterativefunctions"

Update the file contents:


## dotnet test

use "dotnet test" to run the unit test locally on the development machine.

**$ dotnet test**

![](/assets/images/nuget/screen-shot-2021-03-01-at-5.51.08-pm-1836x1108.png)
*dotnet test*


## Commit to main

Commit updates to the repository.

![](/assets/images/nuget/screen-shot-2021-03-01-at-5.53.33-pm-1836x1251.png)
*Commit to main branch*

![](/assets/images/nuget/screen-shot-2021-02-28-at-2.26.08-pm-1072x276.png)
*Push origin*


## GitHub actions

A GitHub action will ensure that testing is performed automatically.

![](/assets/images/nuget/screen-shot-2021-03-01-at-5.56.28-pm-1140x764.png)
*Add the ".NET By GitHub Actions" workflow*

![](/assets/images/nuget/screen-shot-2021-03-01-at-5.57.11-pm-1836x871.png)
*GitHub action running*

![](/assets/images/nuget/screen-shot-2021-03-01-at-5.58.00-pm-1708x360.png)
*GitHub action finished*

![](/assets/images/nuget/screen-shot-2021-03-01-at-5.58.27-pm-1836x956.png)
*GitHub action details*


## PackageLicenseExpression, PackageId and Version

Add PackageLicenseExpression, PackageId and Version tags to the Functions.csproj file

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.10.42-pm-1836x709.png)
*dotnet-factorial.csproj*


## dotnet pack

use "dotnet pack" to create .nupkg file

**$ dotnet pack**

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.13.36-pm-1836x703.png)
*dotnet pack*


## Listing the NuGet package

Upload the nupkg file to nuget.org.

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.20.15-pm-1836x971.png)
*+ Add new*

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.20.27-pm-1836x973.png)
*Browse...*

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.21.03-pm-1836x1055.png)
*Choose for Upload*

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.21.19-pm-1836x1055.png)
*Verify*

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.22.19-pm-1836x1049.png)
*Submit*

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.22.51-pm-1836x944.png)
*Successful upload. Status Validating*

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.31.45-pm-1836x962.png)
*Status Listed*


## Consuming the NuGet Package

**$ dotnet new console
$ dotnet new gitignore
$ dotnet add package HaddleyOffice365.dotnet-factorial --version 1.0.0**

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.50.49-pm-1836x1229.png)
*dotnet add package HaddleyOffice365.dotnet-factorial --version 1.0.0*


## dotnet run

**$ dotnet run**

![](/assets/images/nuget/screen-shot-2021-03-01-at-6.54.50-pm-1836x1229.png)
*dotnet run*
