---
type: post
slug: odata
title: "OData"
date: "2026-10-23"
builds_on: [businesscentralpart25integratingwithdataverseusingdataflows, graphql]
topics: [odata-protocol, rest-api-design, graphql-comparison, query-parameters]
tools: [OData, GraphQL, curl, Business Central, Power BI, Entity Framework Core]
status: current
checked: "2026-11-06"
source_hash: "bae0b5638839"
generated_by: gemma4:12b
---

**Summary.** I explore the OData standard for building and consuming REST APIs by examining its metadata and query options. I compare OData with GraphQL to show how each handles data selection, filtering, and relationship expansion.

## What I did
- I analyzed the OData protocol and its metadata structure.
- I tested the TripPin demo service using curl.
- I executed various query options including $select, $filter, and $expand.
- I compared the architectural differences between OData and GraphQL.

## Claims
- OData provides a standard way to describe models so clients do not have to learn new URL styles for every service.
  > "What OData adds is a standard way to describe the model, and standard query options such as $filter, so a client does not need to learn a new URL style for each service."
- The $expand option allows me to fetch related items in a single request.
  > "That is one request for a person and their trips, with only the properties that I asked for, so OData also avoids making several calls to collect related data."
- The OData library automatically translates query options into SQL for the database.
  > "In an ASP.NET Core service, the OData library applies $filter, $orderby and the other options to an IQueryable, and a provider such as Entity Framework Core turns that into SQL."
- I received a 400 error when I attempted to filter on a property that did not exist.
  > "When I filtered on a property that does not exist, it replied with a 400 status and an error message."
- I initially received no results because I left spaces in the URL.
  > "My first attempts at $filter returned nothing, because I had left spaces in the URL."
- OData offers generic querying for free while GraphQL puts control in the schema and resolvers.
  > "GraphQL puts the control in the schema and the resolvers, and OData offers generic querying for free, so each suits different jobs."

## Outcome
I concluded that OData is ideal for providing broad, standard access to data models, while GraphQL is better suited for specific, pre-planned data requirements.

## Caveats
The Business Central implementation of OData does not cover every feature in the full specification.
