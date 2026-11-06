---
type: post
slug: powerappsapplication
title: "A Power Apps Application"
date: "2021-07-14"
builds_on: []
topics: [power-apps, api-integration, gallery-controls, navigation-logic]
tools: [Power Apps, Power Apps API]
status: current
checked: "2026-11-06"
source_hash: "e80aa7dcfa43"
generated_by: gemma4:12b
---

**Summary.** I built a Power Apps application to manage a collection of books. I integrated custom components and custom API calls to handle data retrieval, updates, and deletions.

## What I did
- I created and named four distinct screens for the application.
- I integrated custom header components into each screen.
- I configured navigation logic for all custom OnSelect events.
- I connected a gallery to a collection and configured the display logic.
- I implemented API calls to perform CRUD operations on the data.

## Claims
- I used a specific collection to populate the gallery.
  > "*I updated the gallery's data source to colBooks*"
- I used a conditional statement to sort the gallery items.
  > "BrowseScreen | Gallery1 | Items = Sort(colBooks,title,If(varSortDescending,Descending,Ascending))"
- I used a specific API call to delete a book by its ID.
  > "OnSelectDelete = haddley_power_app_api.BookByIdDELETE(Gallery1.Selected.id);Navigate(BrowseScreen)"
- I used a specific API call to update a book's title.
  > "OnSelectAccept = haddley_power_app_api.BookByIdPUT(Gallery1.Selected.id,{title:TextInput3.Text});Navigate(BrowseScreen)"
- I used a specific API call to create a new book entry.
  > "OnSelectAccept = haddley_power_app_api.BookPOST({id:TextInput4.Text,title:TextInput3_1.Text});Navigate(BrowseScreen)"

## Outcome
I built a functional Power Apps application that allows users to browse, add, edit, and delete books.

## Caveats
The post does not show the specific configuration of the custom header components.
