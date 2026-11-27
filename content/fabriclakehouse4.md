---
title: "Microsoft Fabric"
part: 4
description: "I followed Microsoft's tutorial for a Fabric data agent over AdventureWorks, then asked it all of Microsoft's own questions twice: with the tutorial's setup and with its example queries and corrected instructions. I checked the answers against my own SQL, published the agent and called it over MCP."
date: "2026-11-28"
categories: ["Azure", "AI"]
tags: "fabric-data-agent, lakehouse, adventureworks, natural-language-query, capacity"
hidden: false
slug: "fabriclakehouse4"
image: "/assets/images/fabriclakehouse4/posts-meta.svg"
---

# A Fabric Data Agent over the AdventureWorks Lakehouse

In [Part 1](/posts/fabriclakehouse/) I built a Lakehouse, in [Part 2](/posts/fabriclakehouse2/) I linked Dataverse to Fabric, and in [Part 3](/posts/fabriclakehouse3/) I streamed events into an Eventhouse. In this part I follow Microsoft's [end-to-end tutorial for a Fabric data agent](https://learn.microsoft.com/fabric/data-science/data-agent-end-to-end-tutorial). A data agent lets someone ask a question in plain English and get an answer from tables in a Lakehouse.

I tried to do this on my free trial first, and it did not work. This post covers what I had to do to get a paid capacity, what I built, what went wrong, and how I checked the answers.

:::pencil How this post was made
I built the agent twice. My first build had only two of Microsoft's questions, and I rewrote this post after I saw that. Everything here comes from the second, clean build, except the trial's refusal and my attempts to get an F2, which come from the first. The second build asked all of Microsoft's questions, published the agent and called it over MCP. I made two mistakes in it, which I left in.
:::

## The trial could not create a data agent

The New item list on my trial workspace offered a Data agent. When I named one and clicked Create, I got an error.

![](assets/images/fabriclakehouse4/trial-cannot-create-data-agent.png)
*The trial refused: "An admin needs to change the SKU type for your organization's Fabric capacity"*

Microsoft's tutorial says a data agent needs a paid F2 or higher capacity, or a Power BI Premium P1 or higher. That matches the error.

## Getting an F2 took longer than using it

An F2 is the smallest paid Fabric capacity. Azure bills it by the second while it runs, and I can delete it afterwards. Creating one for my Azure subscription took several attempts.

| Where I tried | What happened |
|---|---|
| West Europe | Refused: the region is not accepting new customers |
| North Europe | Refused: regional quota of 0 |
| East US | Refused: regional quota of 0 |
| My other two Azure subscriptions | Both disabled, and in a different tenant |
| A quota request for 2 capacity units in East US | Not approved: the portal told me to contact support |
| Sweden Central | Created in about 40 seconds |

The Quotas page in the Azure portal explained it. For Microsoft Fabric, many regions showed a limit of 16 capacity units for my subscription, and a few, including East US and North Europe, showed 0. I used Sweden Central, which had 16. I did not choose it for any reason of quality. I chose it because it was an EU region that already had quota. I did not check whether it offers every Fabric AI feature, but the data agent worked there.

## Creating the F2 in the portal

This is the second build. I had no Fabric capacities, so the Microsoft Fabric page in the Azure portal was empty.

![](assets/images/fabriclakehouse4/portal-1-no-capacities.jpg)
*No Microsoft Fabric capacities to display*

I clicked Create. The form defaults to East US.

![](assets/images/fabriclakehouse4/portal-2-create-form.jpg)
*The empty Create Fabric capacity form*

![](assets/images/fabriclakehouse4/portal-3-region-list.jpg)
*The region list. I chose Sweden Central*

The form then showed an F64, the default size, with Capacity Overage Protection switched on and a threshold of 384 capacity-unit hours.

![](assets/images/fabriclakehouse4/portal-4-size-default-f64.jpg)
*The default: F64, 64 capacity units, with overage protection on*

:::watch-it The portal defaults to an F64
An F64 costs about $8,876 a month at the list price that the portal shows, and the form had overage protection on. If I had clicked straight through, I would have created the wrong thing. I changed the size and I switched overage protection off.
:::

![](assets/images/fabriclakehouse4/portal-5-size-list.jpg)
*The size list, with its estimated monthly cost for each size*

![](assets/images/fabriclakehouse4/portal-6-f2-selected.jpg)
*F2, 2 capacity units. Overage protection was still on*

![](assets/images/fabriclakehouse4/portal-7-overage-off.jpg)
*Overage protection off. The administrator field already held my account*

![](assets/images/fabriclakehouse4/portal-8-resource-group.jpg)
*A new resource group, `rg-fabric-data-agent-2`, and the capacity name `fabdataagent2`*

![](assets/images/fabriclakehouse4/portal-9-review.jpg)
*Review and create: F2, Sweden Central, an estimate of $277.40 a month, overage off*

![](assets/images/fabriclakehouse4/portal-10-deployment.jpg)
*The deployment started at 5:40:15 AM in the portal's local time, which is 18:40 UTC*

## What the F2 cost

| | First build | Second build |
|---|---|---|
| Capacity created | 12:39:43 UTC | 18:40:13 UTC |
| Capacity deleted | 13:14:41 UTC | about 19:32 UTC |
| Time it ran | about 35 minutes | about 52 minutes |
| List price in Sweden Central | $0.19 per capacity unit per hour | the same |
| An F2 has | 2 capacity units, so about $0.38 an hour | the same |
| Compute for the run | about $0.22 | about $0.33 |

These figures are my calculations from Microsoft's public price list, not figures from my bill. Copilot and AI usage has its own meter in Azure's price list, and I have not read my Azure cost report yet, so the real figure may be higher.

## Create a workspace on the capacity

I created a new workspace, `Data Agent Tutorial`, and chose the Fabric workspace type. The capacity box offered the new F2.

![](assets/images/fabriclakehouse4/ws-1-new-workspace.jpg)
*The Create a workspace pane*

![](assets/images/fabriclakehouse4/ws-2-capacity-f2.jpg)
*The F2 listed as the capacity*

![](assets/images/fabriclakehouse4/ws-3-created.jpg)
*The empty workspace*

## Load the AdventureWorks sample

The tutorial loads the AdventureWorks sample with a notebook. I created a notebook and added a new Lakehouse called `AdventureWorksLH`.

![](assets/images/fabriclakehouse4/nb-1-new-item.jpg)
*New item, then Notebook*

![](assets/images/fabriclakehouse4/nb-2-new-notebook.jpg)
*I named the notebook LoadAdventureWorks*

![](assets/images/fabriclakehouse4/nb-3-empty.jpg)
*The empty notebook, with no data sources*

![](assets/images/fabriclakehouse4/nb-4-add-data-items.jpg)
*I chose Add data items, then New lakehouse*

![](assets/images/fabriclakehouse4/nb-5-new-lakehouse.jpg)
*I named the lakehouse AdventureWorksLH*

I pasted the tutorial's code into the cell. It downloads 28 tables from a Microsoft web address and saves each one as a Lakehouse table.

![](assets/images/fabriclakehouse4/nb-6-code-pasted.jpg)
*The tutorial's loading code in the first cell, with the lakehouse attached*

This is the code I pasted:

```python
import pandas as pd
from tqdm.auto import tqdm
base = "https://synapseaisolutionsa.z13.web.core.windows.net/data/AdventureWorks"

# load list of tables
df_tables = pd.read_csv(f"{base}/adventureworks.csv", names=["table"])

for table in (pbar := tqdm(df_tables['table'].values)):
    pbar.set_description(f"Uploading {table} to lakehouse")

    # download
    df = pd.read_parquet(f"{base}/{table}.parquet")

    # save as lakehouse table
    spark.createDataFrame(df).write.mode('overwrite').saveAsTable(table)
```

I clicked Run all.

![](assets/images/fabriclakehouse4/nb-7-running.jpg)
*The notebook running, uploading one table after another*

![](assets/images/fabriclakehouse4/nb-8-done.jpg)
*28 of 28 uploaded. The command ran for 5 minutes 24 seconds*

![](assets/images/fabriclakehouse4/nb-9-session-stopped.jpg)
*I stopped the Spark session, as the tutorial's own warning says to, because a running session keeps using capacity*

## Create the data agent, too early

I did not wait for the load before I created the agent. That was a mistake.

![](assets/images/fabriclakehouse4/ag-1-create-dialog.jpg)
*I named the agent AdventureWorksAgent*

![](assets/images/fabriclakehouse4/ag-2-build.jpg)
*The page offers an ontology, a data source or AI search*

I chose Add a data source and picked `AdventureWorksLH` from the OneLake catalog.

:::watch-it The catalog showed two lakehouses with the same name
The catalog lists items from all of my workspaces, not just this one. One `AdventureWorksLH` was from my trial workspace in [Part 6](/posts/fabriclakehouse6/) and one was the new one. They look the same in the list. I chose the new one, and I would not have noticed the other if the agent had worked.
:::

![](assets/images/fabriclakehouse4/ag-3-catalog-two-lakehouses.jpg)
*Two lakehouses called AdventureWorksLH*

![](assets/images/fabriclakehouse4/ag-4-source-added-too-early.jpg)
*The source was added, while the notebook was still loading tables*

When the load finished, the agent page did not recover. It sat on "Loading your data agent" and showed errors.

![](assets/images/fabriclakehouse4/ag-5-error-not-published.jpg)
*"The data agent has not been published", though a new agent is not published and the page normally loads anyway*

![](assets/images/fabriclakehouse4/ag-6-error-ontology.jpg)
*"Couldn't load ontology configuration"*

The agent page loaded in a fresh tab.

![](assets/images/fabriclakehouse4/ag-7-fresh-tab.jpg)
*A fresh tab loaded the agent, with the source but no tables*

But the source showed only a `dbo` schema with a warning, and no tables.

![](assets/images/fabriclakehouse4/ag-8-dbo-warning.jpg)
*A warning beside dbo*

![](assets/images/fabriclakehouse4/ag-9-dbo-tooltip.jpg)
*The tooltip: "This schema has been deleted or you don't have permission to view it"*

The schema had not been deleted, and I have full permission, so the message was wrong about the cause. My guess is that the agent had read the schema before the tables existed and kept a stale copy. I did not confirm that. I removed the data source and added it again, and the warning stayed.

![](assets/images/fabriclakehouse4/ag-10-remove-source.jpg)
*Removing the data source*

So I deleted the agent and created a new one, after the load had finished. This is the order that the tutorial uses, and I should have followed it.

![](assets/images/fabriclakehouse4/ag-11-recreated.jpg)
*The new agent with the source added*

![](assets/images/fabriclakehouse4/ag-12-tree-loaded.jpg)
*This time the schema tree loaded, with all the tables*

## Select the tables and add instructions

The tutorial selects ten tables. I ticked them in the explorer: `dimcustomer`, `dimdate`, `dimgeography`, `dimproduct`, `dimproductcategory`, `dimpromotion`, `dimreseller`, `dimsalesterritory`, `factinternetsales` and `factresellersales`.

![](assets/images/fabriclakehouse4/ag-13-ticking-dims.jpg)
*Ticking the dimension tables*

![](assets/images/fabriclakehouse4/ag-14-ticking-facts.jpg)
*Ticking the fact tables*

![](assets/images/fabriclakehouse4/ag-15-ten-selected.jpg)
*The ten tutorial tables ticked*

I then pasted the tutorial's instructions into the Agent instructions pane. They say the data source contains information from three tables and name `dimcustomer`, `dimdate` and `dimgeography`.

![](assets/images/fabriclakehouse4/a-instructions.jpg)
*The tutorial's instructions*

This is the text I pasted:

```text
The AdventureWorksLH data source contains information from three tables:

- dimcustomer, for detailed customer demographics and contact information
- dimdate, for date-related data - for example, calendar and fiscal information
- dimgeography, for geographical details including city names and country region codes.

Use this data source for queries and analyses that involve customer details, time-based events, and geographical locations.
```

## The questions: all of Microsoft's, in order

I wanted to test the agent on Microsoft's own questions, not my own. Microsoft's documentation gives seven. I added an eighth of my own that names a table and has a checkable answer.

| # | Question | Where it comes from |
|---|---|---|
| 1 | Calculate the average percentage increase in sales amount for repeat purchases for every zipcode. Repeat purchase is a purchase subsequent to the first purchase (the average should always be computed relative to the first purchase) | The tutorial |
| 2 | Show the monthly total and year-to-date total sales. Order by year and month. | The tutorial |
| 3 | What were our total sales in California in 2023? | [Create a Fabric data agent](https://learn.microsoft.com/fabric/data-science/how-to-create-data-agent) |
| 4 | What are the top 5 products with the highest list prices, and what are their categories? | Create a Fabric data agent |
| 5 | What are the most expensive items that have never been sold? | Create a Fabric data agent |
| 6 | Why is our factory productivity lower in Q2 2024? | Create a Fabric data agent, as a question the agent cannot answer |
| 7 | What is the root cause of our sales spike? | Create a Fabric data agent, as a question the agent cannot answer |
| 8 | What is the total sales amount in factinternetsales by sales territory country? | Mine |

I ran them in two rounds. In **Round A** the agent had the tutorial's setup exactly: the three-table instructions and no example queries. In **Round B** I added the tutorial's two example queries, ticked the missing table and corrected the instructions. I cleared the chat before every question, because Microsoft's concept page says earlier chat history can influence later answers.

For each answer I opened the response, then Steps completed, then the step's chevron, then Show input. That shows the SQL the agent generated.

## Round A: the tutorial's setup

### Question 8: my table-naming question

```PROMPT
What is the total sales amount in factinternetsales by sales territory country?
```

![](assets/images/fabriclakehouse4/a-p8-answer.jpg)
*Six countries, answered in 14 seconds*

![](assets/images/fabriclakehouse4/a-p8-sql.jpg)
*The SQL it generated, with the output beneath it*

I checked the numbers with my own SQL over the SQL endpoint, using `sqlcmd`:

```sql
SELECT t.SalesTerritoryCountry, SUM(f.SalesAmount) AS total
FROM dbo.factinternetsales f
JOIN dbo.dimsalesterritory t ON f.SalesTerritoryKey = t.SalesTerritoryKey
GROUP BY t.SalesTerritoryCountry
ORDER BY total DESC
```

| Country | Agent | My SQL |
|---|---|---|
| United States | 9,389,789.94 | 9,389,789.94 |
| Australia | 9,061,000.72 | 9,061,000.72 |
| United Kingdom | 3,391,712.24 | 3,391,712.24 |
| Germany | 2,894,312.36 | 2,894,312.36 |
| France | 2,644,017.74 | 2,644,017.74 |
| Canada | 1,977,844.89 | 1,977,844.89 |

All six matched to the cent. The agent's own SQL joined `factinternetsales` to `dimsalesterritory`, the same join as mine.

### Question 2: monthly and year-to-date totals

```PROMPT
Show the monthly total and year-to-date total sales. Order by year and month.
```

![](assets/images/fabriclakehouse4/a-p2-answer.jpg)
*It listed 38 months, from December 2010 to January 2014, in 16 seconds*

![](assets/images/fabriclakehouse4/a-p2-sql.jpg)
*Its SQL summed `factinternetsales` only*

The agent used only internet sales. My SQL for the tutorial's own example gave the same figures, for example 43,421.04 for December 2010 and 16,351,550.34 as the 2013 year-to-date total. The question says "sales" and the lakehouse also has reseller sales, so the agent made a choice. It did not tell me it had made one.

### Question 4: top five products

```PROMPT
What are the top 5 products with the highest list prices, and what are their categories?
```

![](assets/images/fabriclakehouse4/a-p4-refusal-1.jpg)
*A refusal after 13 seconds*

![](assets/images/fabriclakehouse4/a-p4-refusal-2.jpg)
*The step reported "Unable to generate code" because the question looked irrelevant to the data schema*

The agent had `dimproduct` ticked, but my instructions named only three tables, and it behaved as though those were all it had.

### Question 3: sales in California in 2023

```PROMPT
What were our total sales in California in 2023?
```

![](assets/images/fabriclakehouse4/a-p3-answer.jpg)
*It said there were no sales tables, after 17 seconds*

That was wrong. Both sales fact tables were ticked. Only the instructions made the agent say there were none.

### Question 5: the most expensive items never sold

```PROMPT
What are the most expensive items that have never been sold?
```

![](assets/images/fabriclakehouse4/a-p5-answer.jpg)
*Twenty products in 16 seconds, from the HL Road Frame at 1,431.50 down to 540.75*

![](assets/images/fabriclakehouse4/a-p5-sql.jpg)
*It used `NOT EXISTS` against both `factinternetsales` and `factresellersales`*

This answered correctly even though the instructions never mentioned `dimproduct` or either fact table. The agent found them in the ticked schema. I checked the first ten rows against my own SQL and they matched. I did not check rows 11 to 20.

### Questions 6 and 7: the two it should not be able to answer

```PROMPT
Why is our factory productivity lower in Q2 2024?
```

![](assets/images/fabriclakehouse4/a-p6-answer.jpg)
*A refusal that asked me for production data, after 10 seconds*

That is the right behaviour. The data has no factory records and ends in 2014.

```PROMPT
What is the root cause of our sales spike?
```

![](assets/images/fabriclakehouse4/a-p7-answer.jpg)
*It named a root cause after 46 seconds*

This is the one I did not expect. The data has no information about causes and I never said which spike I meant. The agent still stated that "a structural increase in online demand driven by a surge in new and returning internet customers" was the root cause, starting in early 2013. It then said that finding the business root cause would need marketing and product information. It gave a confident answer first and a caveat second.

### Question 1: the tutorial's repeat-purchase question

```PROMPT
Calculate the average percentage increase in sales amount for repeat purchases for every zipcode. Repeat purchase is a purchase subsequent to the first purchase (the average should always be computed relative to the first purchase)
```

![](assets/images/fabriclakehouse4/a-p1-answer.jpg)
*After 27 seconds it gave a list of zip codes, then a limitation*

![](assets/images/fabriclakehouse4/a-p1-sql.jpg)
*The SQL ranks each customer's orders by `OrderDate`, then by `SalesOrderNumber`*

The agent said the data it received "was truncated to the first 200 zipcodes". It told me, which I value, but it means the answer is incomplete. The agent's tool returns a limited number of rows. My own checks found 289 zip codes with at least one repeat purchase.

The agent also broke ties between orders on the same day by `SalesOrderNumber`. That matters, because 10,514 customers have their first purchase on a date shared by several order lines. The tutorial's own example SQL orders only by `OrderDate`, so on those ties the database may pick any line as the first purchase. The tutorial's example can give different numbers on different runs. The agent's choice is at least repeatable.

## Round B: the tutorial's example queries and corrected instructions

I made four changes together.

1. **Added the two example queries.** In the Setup tab I opened Example queries and added the tutorial's two question and SQL pairs, one for repeat purchases and one for monthly and year-to-date totals.
2. **Ticked `dimproductsubcategory`**, the table that links products to categories.
3. **Rewrote the instructions** to describe all ten tables and the join from product to subcategory to category.
4. **Cleared the chat** before each question, as in Round A.

![](assets/images/fabriclakehouse4/b-examples-list.jpg)
*The two example queries in the Setup tab*

![](assets/images/fabriclakehouse4/b-instructions.jpg)
*The corrected instructions*

The corrected instructions:

```text
The AdventureWorksLH data source contains information from these tables:

- dimcustomer, for detailed customer demographics and contact information
- dimdate, for date-related data - for example, calendar and fiscal information
- dimgeography, for geographical details including city names and country region codes
- dimproduct, dimproductsubcategory and dimproductcategory, for products, their list prices and their categories (join dimproduct to dimproductsubcategory on ProductSubcategoryKey, then to dimproductcategory on ProductCategoryKey)
- dimpromotion, for promotions
- dimreseller, for resellers
- dimsalesterritory, for sales territories and countries
- factinternetsales and factresellersales, for internet and reseller sales amounts

Use this data source for queries and analyses that involve customers, products, prices, promotions, resellers, sales territories, time-based events, geographical locations and sales.
```

:::watch-it The example editor is fussy
The SQL box in the example editor is a code editor. On a Mac, Control+A moved the cursor to the start of the line instead of selecting everything. The grey hint text is real text, so my first attempts left it in front of my SQL and the editor reported "Invalid column name 'Enter'". Command+A and Delete cleared it. The red error stayed on screen until I clicked away.
:::

### What changed

| # | Round A | Round B |
|---|---|---|
| 1 | Answered in 27 s, truncated to 200 zip codes | Answered in 18 s with **0% for every zip code** |
| 2 | 38 months in 16 s, internet only | The same figures in 16 s, with the SQL word for word the example's SQL |
| 3 | Refused: "no sales tables" | Queried and reported no sales in 2023, because the data ends in 2014 |
| 4 | Refused | Five Road-150 Red bikes at 3,578.27, category Bikes, in 10 s |
| 5 | Twenty products in 16 s | Twenty products in 13 s |
| 6 | Refused, asked for production data | Refused, then gave a generic outline in 14 s |
| 7 | Named a root cause in 46 s | Named a different root cause in 68 s |
| 8 | Correct in 14 s | Correct in 9 s |

![](assets/images/fabriclakehouse4/b-p3-answer.jpg)
*Question 3 in Round B: it queried the data and found no 2023 sales*

![](assets/images/fabriclakehouse4/b-p4-answer.jpg)
*Question 4 in Round B: the five products, after the table and the instructions were fixed*

Questions 3 and 4 are fixed by the corrected instructions. Question 4 is the product question that refused three times in my earlier build.

### The example made question 2 copy the SQL exactly

![](assets/images/fabriclakehouse4/b-p2-answer.jpg)
*Question 2 in Round B*

![](assets/images/fabriclakehouse4/b-p2-sql.jpg)
*The step lists "Example queries", and the SQL is the example's SQL*

The generated SQL was the example's SQL, including its column names `Year`, `Month`, `MonthlySales` and `CumulativeTotal`. The step even said it would use "both internet and reseller sales if present", but the SQL still used only `factinternetsales`. The example decided the answer.

### The example made question 1 worse

![](assets/images/fabriclakehouse4/b-p1-answer.jpg)
*Question 1 in Round B: "the average percentage increase ... is 0%"*

![](assets/images/fabriclakehouse4/b-p1-rephrase.jpg)
*The agent rewrote my question as "for each customer and each product"*

![](assets/images/fabriclakehouse4/b-p1-sql.jpg)
*It changed the example's SQL to partition by customer and product*

This is a real defect. The agent turned my question into one about each customer and each product, then changed the example's SQL to partition by `CustomerKey` and `ProductKey` and to join on `ProductKey`. In AdventureWorks, a customer buys each product at most once, so there are no repeat purchases of the same product. Every zip code came out at 0%. The answer then went on to explain how that might happen. It was fluent, confident and wrong.

The example did not cause the rewrite on its own. The agent also saw the product tables I had just added. In Round A it did not touch the product tables for this question. I did not test which change mattered, and I did not fix it in this post.

:::watch-it The same agent gave two answers to one question
Round A gave plausible numbers for question 1 and Round B gave 0%. Between those rounds I changed four things. Nothing about the question changed. A data agent's answer depends on the whole setup, and a change that fixes one question can break another.
:::

### Questions 5 to 8 in Round B

![](assets/images/fabriclakehouse4/b-p5-answer.jpg)
*Question 5, in 13 seconds*

![](assets/images/fabriclakehouse4/b-p8-answer.jpg)
*Question 8: the same six figures, in 9 seconds*

![](assets/images/fabriclakehouse4/b-p6-answer.jpg)
*Question 6 refused, and then outlined how someone might analyse factory productivity*

![](assets/images/fabriclakehouse4/b-p7-answer.jpg)
*Question 7 named a different root cause, in 68 seconds*

For question 7, Round B said the spike was "primarily due to a large, mostly non-discounted surge in Bike sales in North American territories in May 2011", and then listed possible campaigns and channel changes that the data cannot show. Round A said a surge in online demand in early 2013. The data holds more than one candidate for a spike, and the agent picked a different one each time, and wrote a cause for it.

## Publishing the agent and calling it over MCP

The tutorial ends by publishing the agent and calling it from a notebook. I did both.

![](assets/images/fabriclakehouse4/publish-dialog.jpg)
*The publish dialog asks for a description. I left Also publish to Microsoft Copilot off*

![](assets/images/fabriclakehouse4/publish-success.jpg)
*Published*

Under Settings, the Model Context Protocol tab shows the endpoint and the tool name. The URL has this shape:

```text
https://api.fabric.microsoft.com/v1/mcp/workspaces/{WorkspaceId}/dataagents/{DataAgentId}/agent
```

![](assets/images/fabriclakehouse4/mcp-settings.jpg)
*The Model Context Protocol tab, with the server URL and the tool name `DataAgent_AdventureWorksAgent`*

The tool takes one argument, `userQuestion`. I called it from a Fabric notebook with a bearer token from `notebookutils`:

```python
import requests, time
url = "https://api.fabric.microsoft.com/v1/mcp/workspaces/<workspace id>/dataagents/<agent id>/agent"
h = {"Authorization": "Bearer " + notebookutils.credentials.getToken("pbi"),
     "Content-Type": "application/json",
     "Accept": "application/json, text/event-stream"}
t = time.time()
r = requests.post(url, headers=h, json={"jsonrpc": "2.0", "id": 1, "method": "tools/call",
    "params": {"name": "DataAgent_AdventureWorksAgent",
               "arguments": {"userQuestion": "What is the total sales amount in factinternetsales by sales territory country?"}}})
print(round(time.time() - t, 1), "seconds")
print(r.json()["result"]["content"][0]["text"])
```

![](assets/images/fabriclakehouse4/notebook-mcp-call.jpg)
*The notebook call returned the six countries in 11.2 seconds*

I then called the same endpoint twice per question from my Mac with the Azure CLI token, which is how the other tools in this series will call it. These are the published agent's times, with the corrected instructions and the two examples.

| Question | Run 1 | Run 2 |
|---|---|---|
| 1 repeat purchases | 20.9 s | 22.3 s |
| 2 monthly and year-to-date | 16.1 s | 22.7 s |
| 3 California 2023 | 14.4 s | 15.3 s |
| 4 top five products | 11.7 s | 10.8 s |
| 5 never sold | 16.9 s | 14.5 s |
| 6 factory productivity | 15.2 s | 72.2 s |
| 7 sales spike | 76.0 s | 34.4 s |
| 8 countries | 10.4 s | 12.1 s |

The answers changed between runs, not only the times.

- **Question 2:** Run 1 used internet sales only and matched my key. Run 2 combined internet and reseller sales and gave different figures, for example 532,749.60 for December 2010.
- **Question 7:** Run 1 named May 2011 and the reseller channel as the cause. Run 2 said it could not reliably identify one.
- **Question 1:** Run 1 said it had returned only the first 200 zip codes. I did not check run 2's numbers.

Questions 3, 4, 5 and 8 gave the same answers both times.

## Tear down

I deleted the workspace, which held the notebook, the Lakehouse and the agent, and then the Azure resource group that held the F2. I checked that no Fabric capacities were left. The agent is gone, which is why I could not go back and test one thing at a time.

## What I did not do

- **Isolate the cause of the Round B changes.** I changed four things at once. I do not know which of them broke question 1 or fixed questions 3 and 4.
- **Reconcile question 1.** The tutorial's example SQL is ambiguous on ties, and I did not work out which tie-break each run used.
- **Test other models.** The tutorial's agent has a fixed model. I could not choose one.
- **Compare with anything else.** [Part 5](/posts/fabriclakehouse5/) calls this agent from Copilot Studio. [Part 6](/posts/fabriclakehouse6/) asks the same eight questions of DeepSeek Harness over the same tables.

:::bullet-points What I learned
- Microsoft's questions are a fair test, and the tutorial's instructions are not enough for them: with three tables named, the agent refused questions 3 and 4.
- Adding the tutorial's example queries made question 2 copy the example's SQL exactly, and made question 1 return 0% for every zip code.
- The agent answered the two questions it could not answer, 6 and 7, in different ways. Question 6 was refused and question 7 was given a cause.
- Where an answer was checkable (question 8, and the top of question 5) it matched my SQL exactly.
- The agent reports row-limit problems when it hits them, as it did for 200 zip codes. It does not report choices such as using only internet sales.
- The same published agent gave different answers to the same question on two runs.
:::

## References

- [Part 5: Copilot Studio and the Fabric data agent](/posts/fabriclakehouse5/)
- [Part 6: DeepSeek Harness over the AdventureWorks Lakehouse](/posts/fabriclakehouse6/)
- [Fabric data agent example with the AdventureWorks dataset (Microsoft Learn)](https://learn.microsoft.com/fabric/data-science/data-agent-end-to-end-tutorial)
- [Fabric data agent concepts (Microsoft Learn)](https://learn.microsoft.com/fabric/data-science/concept-data-agent)
- [Create a Fabric data agent (Microsoft Learn)](https://learn.microsoft.com/fabric/data-science/how-to-create-data-agent)
- [Data agent as a Model Context Protocol server (Microsoft Learn)](https://learn.microsoft.com/fabric/data-science/data-agent-mcp-server)
- [Azure Retail Prices API, used for the capacity-unit price](https://learn.microsoft.com/rest/api/cost-management/retail-prices/azure-retail-prices)
