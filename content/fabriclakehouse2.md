---
title: "Microsoft Fabric"
part: 2
description: "I turned my sales CSV into a Dataverse table, linked it to a Fabric Lakehouse with Link to Fabric, and got the same answers as Part 1. Dataverse keeps a synced Delta copy of the table. I then timed edits and new rows: most reached the lake within 30 seconds, one edit took 18 minutes, and the SQL endpoint lagged behind the lake."
date: "2026-11-27"
categories: ["Azure", "Power Platform"]
tags: "microsoft-fabric, dataverse, link-to-fabric, onelake, sql-analytics-endpoint"
slug: "fabriclakehouse2"
image: "/assets/images/fabriclakehouse2/poster.svg"
hidden: false
---

# Linking Dataverse to Microsoft Fabric: What Gets Copied, and How Long a Change Takes to Arrive

In [Part 1](/posts/fabriclakehouse/) I uploaded a CSV into a Fabric Lakehouse. That copy is mine to refresh by hand.

This time I put the same 200 sales orders into a Dataverse table and linked that table to Fabric with **Link to Fabric**, so that I build no pipeline. I asked three questions:
- Do I get the same answers as Part 1?
- Is the data copied?
- When I change the data in Dataverse, how long does Fabric take to notice?

## The table I started with

I opened Power Apps and looked at the tables in my developer environment.

![](assets/images/fabriclakehouse2/dv-tables-after-save.jpg)
*The Tables list in Power Apps*

The environment had no custom tables, and the standard `Account` table had no rows. So I made one from the same `sales.csv` as Part 1.

## Create a Dataverse table from the CSV

I clicked **Create with Excel or .CSV file**.

![](assets/images/fabriclakehouse2/dv-import-dialog.jpg)
*The Import an Excel or .CSV file dialog*

I selected `sales.csv`.

![](assets/images/fabriclakehouse2/dv-loading-file.jpg)
*The file loading*

![](assets/images/fabriclakehouse2/dv-file-loaded.jpg)
*sales.csv, 10.8 KB, ready to import*

I clicked **Import**. The importer used AI to name the table **Sales Order** and set up a column for each field in the file.

![](assets/images/fabriclakehouse2/dv-sales-order-designer.jpg)
*The designer showed the new Sales Order table, marked "Imported with AI"*

![](assets/images/fabriclakehouse2/dv-columns-list.jpg)
*The columns the importer found*

I clicked **Save and exit** and confirmed.

![](assets/images/fabriclakehouse2/dv-done-working.jpg)
*The Done working dialog*

The table appeared under **Custom** as `cr1da_salesorder`.

![](assets/images/fabriclakehouse2/dv-custom-sales-order.jpg)
*The new custom table*

I opened it. The rows had loaded, and the primary column is Product, which is why the same product name repeats.

![](assets/images/fabriclakehouse2/dv-sales-order-table.jpg)
*The Sales Order table with its rows*

## Check that Track changes is on

**Track changes** is a Dataverse table setting. When it is on, Dataverse can answer the question "what has changed since I last asked?". A tool that copies a table elsewhere can then pick up only the changes, and does not have to reload every row. Microsoft's documentation for Link to Fabric says the link adds the tables that have this setting on, so I checked mine.

I opened the table properties, then **Advanced options**, and scrolled down to the **For this table** box. The **Track changes** checkbox was already ticked, and I could not untick it. Microsoft's documentation says that once Track changes is on, it cannot be switched off.

![](assets/images/fabriclakehouse2/dv-track-changes.jpg)
*The Edit table panel, scrolled to the For this table box*

The checkbox is easy to miss, because it is greyed out. Here is the same box close up.

![](assets/images/fabriclakehouse2/dv-track-changes-zoom.png)
*Track changes is the second checkbox on the left: ticked, greyed out and locked*

## Link the table to Fabric

On the Tables page I opened **Analyze**. It offers **Analyze in Power BI** and **Analyze in Fabric**.

![](assets/images/fabriclakehouse2/dv-analyze-menu.jpg)
*The Analyze menu*

I chose **Analyze in Fabric**. A four-step wizard opened.

![](assets/images/fabriclakehouse2/dv-fabric-link-step1.jpg)
*Step 1 of 4: Getting started*

In step 2 I chose my `Sales Lakehouse Tutorial` workspace from Part 1.

![](assets/images/fabriclakehouse2/dv-fabric-link-workspace.jpg)
*The workspace dropdown*

The same step asks for a connection to Dataverse. I left the defaults, which use my organisational account, and clicked **Save Connection**.

![](assets/images/fabriclakehouse2/dv-fabric-link-connection.jpg)
*The connection settings*

![](assets/images/fabriclakehouse2/dv-fabric-link-ready.jpg)
*The connection was established*

:::watch-it The wizard selects every table
Step 3 opened with all 273 tables ticked, and the page said it would link all tables and that this "may incur additional storage charges".

![](assets/images/fabriclakehouse2/dv-fabric-link-all-tables.jpg)
*273 of 273 tables selected*

I did not need them. I cleared the selection, searched for `Sales Order`, and ticked only that table.

![](assets/images/fabriclakehouse2/dv-fabric-link-search.jpg)
*I cleared the selection and searched*

![](assets/images/fabriclakehouse2/dv-fabric-link-one-table.jpg)
*One of 273 selected*
:::

Step 4 listed what the wizard would do: create a Lakehouse, create shortcuts to OneLake, initialise the tables, and launch Fabric.

![](assets/images/fabriclakehouse2/dv-fabric-link-review.jpg)
*Review and create*

I clicked **Finish**.

![](assets/images/fabriclakehouse2/dv-fabric-link-running.jpg)
*The link was being created*

A banner said the link was created.

![](assets/images/fabriclakehouse2/dv-fabric-link-created.jpg)
*Fabric link created successfully*

The **Link data** page lists the link, with a "Low latency sync" label next to it.

![](assets/images/fabriclakehouse2/dv-link-data-page.jpg)
*The Link data page*

## What appeared in Fabric

I selected **Open in Fabric**. A second Lakehouse had appeared in my workspace, with a long generated name starting `dataverse_`. Its **Tables** folder held `cr1da_salesorder`.

![](assets/images/fabriclakehouse2/fabric-dataverse-lakehouse-loading.jpg)
*The new Lakehouse, loading*

The data preview showed 200 rows and 58 columns. Most of the columns are Dataverse system columns, such as `Id`, `SinkCreatedOn` and `statecode`.

![](assets/images/fabriclakehouse2/fabric-dataverse-table-preview.jpg)
*The linked table: 200 rows, 58 columns*

Next to the table was a folder called **Unidentified**, holding five metadata folders: GlobalOptionsetMetadata, OptionsetMetadata, StateMetadata, StatusMetadata and TargetMetadata.

![](assets/images/fabriclakehouse2/fabric-dataverse-metadata-folders.jpg)
*Five metadata folders under Unidentified*

## Query it with SQL

I opened the SQL analytics endpoint, as in Part 1.

![](assets/images/fabriclakehouse2/fabric-dv-sql-endpoint.jpg)
*The SQL analytics endpoint of the Dataverse Lakehouse*

My first query used a column name I had guessed, and it failed.

![](assets/images/fabriclakehouse2/fabric-dv-invalid-column.jpg)
*Invalid column name 'cr1da_product'*

The AI importer had renamed my columns, so I asked the endpoint for the real names.

![](assets/images/fabriclakehouse2/fabric-dv-column-names.jpg)
*The names the importer chose*

| My CSV column | Dataverse column |
|---|---|
| Product | `cr1da_productname` |
| Quantity | `cr1da_quantityordered` |
| Total | `cr1da_totalprice` |
| UnitPrice | `cr1da_unitprice` |
| Category | `cr1da_productcategory` |
| Region | `cr1da_salesregion` |

Category and Region came through as numbers, because the importer turned them into choice columns and Fabric shows the stored code. I ran the Part 1 query on the linked table, grouping by the code.

```sql
SELECT cr1da_productcategory AS CategoryCode, COUNT(*) AS Orders, SUM(cr1da_totalprice) AS Revenue
FROM dbo.cr1da_salesorder
GROUP BY cr1da_productcategory
ORDER BY Revenue DESC;
```

![](assets/images/fabriclakehouse2/fabric-dv-revenue-by-code.jpg)
*The same orders and revenue as Part 1, with a code in place of the category name*

| Code | Orders | Revenue | Category (matched by order count) |
|---|---|---|---|
| 2 | 26 | 69,223 | Bikes |
| 3 | 48 | 6,660 | Safety |
| 1 | 93 | 5,852 | Accessories |
| 0 | 33 | 2,064 | Clothing |

The orders and revenue match Part 1 exactly. I worked out which code is which category by matching the order counts, which are different for each category.

## Change a row in Dataverse

Before I changed anything, I counted the rows and the rows containing the word `edited`.

```sql
SELECT COUNT(*) AS TotalRows,
       SUM(CASE WHEN cr1da_productname LIKE '%edited%' THEN 1 ELSE 0 END) AS EditedRows
FROM dbo.cr1da_salesorder;
```

![](assets/images/fabriclakehouse2/fabric-dv-before-edit.jpg)
*Before: 200 rows, 0 edited*

In Power Apps I opened the table's data grid.

![](assets/images/fabriclakehouse2/dv-sales-order-data-tab.jpg)
*The table's data*

![](assets/images/fabriclakehouse2/dv-editable-grid.jpg)
*The editable grid*

I changed the first product name to "Bike Helmet (edited)".

![](assets/images/fabriclakehouse2/dv-edit-typed.jpg)
*I typed (edited) after the name*

I pressed Enter, and the page said "Data saved". This was at 08:39:12.

![](assets/images/fabriclakehouse2/dv-edit-saved.jpg)
*Data saved*

## Waiting for the change

I re-ran the query in Fabric straight away.

![](assets/images/fabriclakehouse2/fabric-dv-after-edit-not-yet.jpg)
*About 25 seconds later: still 0 edited rows*

I checked again after three minutes, and then after more than 14.

![](assets/images/fabriclakehouse2/fabric-dv-after-edit-3min.jpg)
*After 3 minutes: still 0*

![](assets/images/fabriclakehouse2/fabric-dv-after-edit-14min.jpg)
*After 14 minutes: still 0*

I also looked at the Lakehouse data preview, but the product name column was off-screen, so that check proved nothing. I opened the Link data page again to look for a sync status. It had none, only the "Low latency sync" label.

![](assets/images/fabriclakehouse2/fabric-dv-lakehouse-preview-14min.jpg)
*The Lakehouse preview at about 08:54, showing only the first rows*

A little later the edit was there.

![](assets/images/fabriclakehouse2/fabric-dv-edit-arrived.jpg)
*EditedRows is 1. LastSync is 2026-11-26 21:57:33 (UTC)*

The sync times are in UTC, and my local time is 11 hours ahead, so that is 08:57:33. My last "still 0" check was at 08:53:40, so the change arrived between those two times.

## Add a row in Dataverse

I wanted a second measurement, with a new row instead of an edit. I opened the table's **New row** menu and chose **New row using form**.

![](assets/images/fabriclakehouse2/dv-new-row-menu.jpg)
*The New row menu*

![](assets/images/fabriclakehouse2/dv-adding-row-dialog.jpg)
*Power Apps asked me to click Done when I had finished adding the row*

The form opened in a new tab.

![](assets/images/fabriclakehouse2/dv-new-row-form-empty.jpg)
*The empty form*

I filled in a clearly labelled test row, with no region or category, and clicked **Save & Close** at 09:16:36.

![](assets/images/fabriclakehouse2/dv-new-row-form-filled.jpg)
*Live test row: order 999, quantity 1, price 10*

A minute later Fabric still showed 200 rows.

![](assets/images/fabriclakehouse2/fabric-dv-new-row-1min.jpg)
*One minute later: 200 rows, NewRows 0*

![](assets/images/fabriclakehouse2/fabric-dv-new-row-16min.jpg)
*At 09:33, about 16 minutes later: still 200 rows, and LastSync had not moved*

At 09:34 I opened the Link data page again, then the Lakehouse's own data preview.

![](assets/images/fabriclakehouse2/dv-link-data-page-again.jpg)
*The Link data page again*

The preview said **Showing 201 rows**, and the first row was my test row, with NULL for the category and region.

![](assets/images/fabriclakehouse2/fabric-dv-lakehouse-201-rows.jpg)
*The Lakehouse preview: 201 rows, and the first one is the test row*

About a minute and a half later the SQL endpoint agreed.

![](assets/images/fabriclakehouse2/fabric-dv-new-row-arrived.jpg)
*The SQL endpoint: 201 rows, NewRows 1, EditedRows 1*

## Two delays in the first run

Each row records when it reached the lake, in `SinkCreatedOn`. I asked for both changed rows.

![](assets/images/fabriclakehouse2/fabric-dv-sink-times.jpg)
*SinkCreatedOn for the two rows I changed (UTC)*

| Change | Saved in Dataverse | Reached the lake | Visible in the SQL endpoint |
|---|---|---|---|
| Edit | 08:39:12 | 08:57:33 (about 18 minutes) | by about 09:07 |
| New row | 09:16:36 | 09:16:58 (about 22 seconds) | between 09:33 and 09:35 (about 16 to 18 minutes) |

So I measured two different delays:
- **Dataverse to the lake** took 22 seconds for a new row and about 18 minutes for an edit. I have only one example of each, so I cannot say whether that is a pattern.
- **The lake to the SQL endpoint** added another 16 to 18 minutes for the new row. The Lakehouse's data preview showed the row first.

:::watch-it A stale SQL query may not mean stale data
If a query on the SQL analytics endpoint looks out of date, open the table's data preview in the Lakehouse first. In my run, the preview showed the new row before the SQL endpoint did.

I opened the Lakehouse view at about 09:34, and the SQL endpoint showed the new row by 09:35. That could mean opening it triggered a refresh, but I did not prove it. The row may simply have appeared then anyway.
:::

## Ten more changes

One edit and one new row are too few to say anything. So I made five more edits and five more inserts, and noted the time of each. For the edits, I added text to the product name of five rows in the editable grid. For the inserts, I used the grid's quick **New row** twice and the form three times.

Two things went wrong. The grid's quick **New row** saves after the first keystroke, so those two rows got one-letter names, "L" and "I". Then a click and my typing landed on an existing row and overwrote its name with "J". I counted that as a sixth edit.

I waited 20 minutes and asked for the lake timestamps of the changed rows.

![](assets/images/fabriclakehouse2/fabric-dv-second-run-sink-times.jpg)
*SinkCreatedOn for the changed rows (UTC, 11 hours behind my local time)*

| Change | Saved in Dataverse | Reached the lake | Lag |
|---|---|---|---|
| Edit 1 | 10:55:13 | 10:55:42 | about 29 seconds |
| Insert 1 ("L") | about 10:55:38 | 10:55:42 | about 4 seconds |
| Edit 2 | 10:56:20 | 10:56:47 | about 27 seconds |
| Edit 3 | 10:56:46 | 10:56:47 | about 1 second |
| Edit 5 | 10:57:08 | 10:57:33 | about 25 seconds |
| Insert 2 ("I") | about 10:57:36 | 10:57:43 | about 7 seconds |
| Overwrite to "J" | about 10:58:01 | 10:58:31 | about 30 seconds |

Edit 4 is missing from the table because I overwrote that row to "J" before it was read. Inserts 3 to 5, made with the form between 10:59 and 11:01, were not in the SQL endpoint after 20 minutes. They were in the Lakehouse: its preview showed 206 rows.

![](assets/images/fabriclakehouse2/fabric-dv-lakehouse-206-rows.jpg)
*The Lakehouse preview: 206 rows*

What I take from the second run:
- **Most changes reached the lake within about 30 seconds.** A new row took 4 to 7 seconds, and an edit took 25 to 30.
- **The sync works in batches.** Edit 2 and edit 3 were saved a second apart and arrived with the same timestamp.
- **My first edit was the slow one.** It took 18 minutes, and I made it six minutes after I created the link. I do not know why it was slow.
- **The SQL endpoint is the long delay.** It was still missing inserts 3 to 5 after 20 minutes.

## Is the data copied?

Yes. Link to Fabric does not read Dataverse live. Dataverse keeps a synced Delta copy of the table, and the Lakehouse reaches that copy through a shortcut. Three things show it:
- Every row carries `SinkCreatedOn` and `SinkModifiedOn`, the time Dataverse wrote it to the lake. An edited row got a new sink time, so changed rows are rewritten.
- Microsoft's documentation says Link to Fabric creates an optimized replica in Delta Parquet format using Dataverse storage, and that linked tables use Dataverse storage. The wizard also warned of extra storage charges.
- A deleted row stayed in the lake table. After I deleted my first test row, the Lakehouse showed 206 rows: the 200 original rows, five inserts, and the deleted row with NULL in most of its columns. I think a delete leaves a marker row in the lake. I have not confirmed that.

So "zero-copy" is true only in a narrow sense. I built no pipeline, and Fabric did not make a second copy in my own OneLake. The copy lives in Dataverse storage.

## Choice labels

By 09:34 the five folders that had been listed as Unidentified were listed as tables in the Lakehouse. I think they hold the labels for the choice columns, such as the category names behind the codes. I did not query them.

![](assets/images/fabriclakehouse2/fabric-dv-lakehouse-201-rows.jpg)
*OptionsetMetadata and the other metadata folders are now listed as tables*

:::bullet-points What I learned
- **Link to Fabric avoids a pipeline, not a copy.** Dataverse keeps a synced Delta copy of the table, and it uses Dataverse storage.
- **Changes usually arrived within about 30 seconds, but not always.** My first edit took 18 minutes.
- **The SQL endpoint can lag well behind the Lakehouse.** If a query looks stale, check the Lakehouse preview.
- **The wizard selects all tables.** Clear the selection and pick only the tables you need, because linked tables use Dataverse storage.
- **The AI importer renames columns and creates choice columns.** In Fabric, a choice column shows as a number.
- **Time your own change.** The sync stamps in `SinkCreatedOn` and `SinkModifiedOn` tell you when a row reached the lake, which shows which of the two delays you are seeing.
:::

## References

- [Link your Dataverse environment to Microsoft Fabric (Microsoft Learn)](https://learn.microsoft.com/power-apps/maker/data-platform/azure-synapse-link-view-in-fabric)
- [Create a Dataverse shortcut (Microsoft Learn)](https://learn.microsoft.com/fabric/onelake/create-dataverse-shortcut)
- [Enable change tracking to control data synchronization (Microsoft Learn)](https://learn.microsoft.com/power-platform/admin/enable-change-tracking-control-data-synchronization)
- [OneLake patterns and foundational capabilities (Microsoft Learn)](https://learn.microsoft.com/fabric/onelake/architecture-patterns)
