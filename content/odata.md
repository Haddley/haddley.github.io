---
title: "OData"
description: "Querying an OData service with $select, $filter, $orderby, $expand and $count, and how OData compares with GraphQL"
date: "2026-10-23"
categories: ["Business Central"]
tags: "odata, rest-api, api-design, query-language, graphql"
hidden: false
slug: "odata"
image: "/assets/images/odata/posts-meta.svg"
---

OData (Open Data Protocol) is an ISO/IEC approved, OASIS standard for building and consuming REST APIs. Microsoft created it, and it is built into products that I use, such as Business Central, Excel's Power Query and Power BI. I used it in my [Business Central](/posts/businesscentralpart25integratingwithdataverseusingdataflows/) post without looking closely at it. In this post I look closely, using a public demo service, and then compare it with [GraphQL](/posts/graphql/).

:::brain-power Before you read on
A client wants only the names of the first three women in a list of people, ordered by last name. With a plain REST API, what would the server have to offer for that to work? What would you want to be able to write in the URL instead?
:::

## The demo service

OData publishes a demo service called TripPin, which holds people, their trips, airlines and airports. Its address is https://services.odata.org/TripPinRESTierService/. It redirects each visitor to a URL that contains a session id, so I can try it without touching anyone else's data.

I sent every request below with curl. I put the URL in single quotes so that the shell leaves the dollar signs alone, and I used the -L option so that curl follows the redirect to the session URL. Without -L, curl prints a short "Object moved" page and nothing else. I removed the @odata.context line from each response to keep it short.

## Read the model first

An OData service describes its own data model at the $metadata address.

```bash
curl -sL 'https://services.odata.org/TripPinRESTierService/$metadata'
```

The answer is an XML document. It starts like this, and it goes on to list every type and property:

```xml
<EntityType Name="Person">
  <Key><PropertyRef Name="UserName" /></Key>
  <Property Name="UserName" Type="Edm.String" Nullable="false" />
```

The document also lists the entity sets, which are the collections that I can query. In TripPin they are People, Airlines and Airports.

:::no-dumb-questions
**Q: Is OData just REST?**

A: It is REST with agreed conventions on top. Resources have URLs, I use ordinary HTTP methods, and the answers are JSON. What OData adds is a standard way to describe the model, and standard query options such as $filter, so a client does not need to learn a new URL style for each service.

**Q: What does Edm mean in Edm.String?**

A: It stands for Entity Data Model, the set of types that OData uses to describe data, such as Edm.String and Edm.Int32. The $metadata document is written in those types.

**Q: Why does a generic client work with so many services?**

A: Because the service describes itself. A tool such as Excel or Power BI reads the $metadata document, learns what the collections and properties are, and then builds its queries from that.
:::

## Ask for only what I need

The $select option picks the properties, and $top limits how many rows come back.

```bash
curl -sL -H 'Accept: application/json' \
  'https://services.odata.org/TripPinRESTierService/People?$top=2&$select=UserName,FirstName'
```

```json
{
  "value": [
    { "UserName": "angelhuffman", "FirstName": "Angel" },
    { "UserName": "clydeguess", "FirstName": "Clyde" }
  ]
}
```

## Filter and sort

The $filter option keeps the rows that match, and $orderby sorts them. The operators are words, such as eq for equals.

```bash
curl -sL -H 'Accept: application/json' \
  'https://services.odata.org/TripPinRESTierService/People?$filter=FirstName%20eq%20%27Scott%27&$select=UserName,FirstName,LastName'
```

```json
{
  "value": [
    { "UserName": "scottketchum", "FirstName": "Scott", "LastName": "Ketchum" }
  ]
}
```

:::pencil Write the URL
Go back to the question at the top of this post. Write the query options that return the first names and last names of the first three women, ordered by last name. The property that holds the gender is called Gender.

:::answer
`People?$filter=Gender eq 'Female'&$orderby=LastName&$select=FirstName,LastName&$top=3`

When I sent it, the service returned Georgina Barlow, Ursula Bright and Angel Huffman. In the URL that I sent, each space is written as %20 and each single quote as %27.
:::
:::

## Follow a relationship

A person has trips. The $expand option brings the related items back inside the same response, and a $select inside it limits their properties too.

```bash
curl -sL -H 'Accept: application/json' \
  "https://services.odata.org/TripPinRESTierService/People('russellwhyte')?\$select=FirstName,LastName&\$expand=Trips(\$select=Name,Budget)"
```

```json
{
  "FirstName": "Russell",
  "LastName": "Whyte",
  "Trips": [
    { "Name": "Trip in US", "Budget": 3000 },
    { "Name": "Trip in Beijing", "Budget": 2000 },
    { "Name": "Honeymoon", "Budget": 2650 }
  ]
}
```

That is one request for a person and their trips, with only the properties that I asked for, so OData also avoids making several calls to collect related data.

## Count the rows

There are two ways to count. Adding /$count to the collection returns just the number, and adding $count=true to a query returns the number alongside the rows.

```bash
curl -sL 'https://services.odata.org/TripPinRESTierService/People/$count'
```

The answer was 20. With $count=true and $top=1, the service returned one person and an @odata.count of 20.

:::under-the-hood How a URL becomes a database query
The server reads the query options and applies them to its own data. In an ASP.NET Core service, the OData library applies $filter, $orderby and the other options to an IQueryable, and a provider such as Entity Framework Core turns that into SQL. The service author does not write a method for each filter. The same idea works with other data sources and other languages, because the protocol does not assume a relational database.
:::

## When the request is wrong

The service checks every query against the model. When I filtered on a property that does not exist, it replied with a 400 status and an error message.

```json
{
  "error": {
    "code": "",
    "message": "Could not find a property named 'nope' on type 'Trippin.Person'."
  }
}
```

:::watch-it Encode the spaces, and quote the dollar signs
My first attempts at $filter returned nothing, because I had left spaces in the URL. Write each space as %20 and each single quote as %27, or let a client library encode the URL for you. In a shell, put the URL in single quotes, because an unquoted $filter is read as a variable.

Also remember that a service may cap how many rows it returns in one response. In that case the answer includes a link to the next page, so check for one before you assume that you have received everything.
:::

## OData and GraphQL side by side

Both let a client ask for less than a whole record, and both can return related data in one call. They differ in where the power sits.

:::fireside-chat OData and GraphQL argue about where the power sits
**OData:** Point me at a data model, and a client can filter, sort and page any part of it. I did not need new server code for any of those.

**GraphQL:** I only answer what my schema allows, and a resolver stands behind every field. Nobody gets a question that I did not plan for.

**OData:** That sounds like a lot of code to write.

**GraphQL:** It is. But I can put one schema in front of a database, a REST service and a third-party API, and a front-end developer can shape each answer to the screen.

**OData:** I stay close to the data. A tool such as Excel can read my $metadata and build its own queries, and nobody has to write a client for me.

**GraphQL:** My clients can read my schema too. And when a client wants to filter by something new, I need a new argument, which is a cost that you do not pay.

**OData:** You pay for it a different way. When a client can ask for anything the model exposes, someone has to decide what to hide.

**GraphQL:** Fair. At least we both stop a client from fetching a whole record when it needs two fields.

**OData:** And we both bring related items back in one call.
:::

| | OData | GraphQL |
|---|---|---|
| How the client asks | Query options in the URL of a GET request | A query document sent to one endpoint, usually in a POST (GET is also allowed) |
| Filtering | $filter on any property that the model exposes, with no extra server code | Only the arguments that the server defines |
| Related data | $expand | Nested fields |
| Describing the data | The $metadata document | The schema, which a client can also read by introspection |
| Server work | A library applies the query options to the data | A resolver for each field |
| Changes over time | Change tracking is in the OData guidance, but I know of no push channel in the core protocol | Subscriptions |

In my [GraphQL post](/posts/graphql/), the server can find a book or an author by id, because I wrote an argument for that. Filtering by name would need another argument and more resolver code. In OData, the same filter is already available on every property. The price is that a client can ask for anything that the model exposes, so the service has to decide what to expose and what to limit.

## OData in Business Central

Business Central publishes its pages and queries as OData web services, and my [Business Central post](/posts/businesscentralpart25integratingwithdataverseusingdataflows/) used the OData V4 URL in a dataflow. Microsoft's documentation says that the Business Central implementation does not cover every feature in the OData specification, so check its page of known limitations before you rely on a particular query option.

:::test-drive Try it yourself
1. Run the $top and $select request above, and then add a $filter of your own.
2. Open the $metadata address in a browser and find the Trip type.
3. Expand Friends on a person instead of Trips, and see what comes back.
4. Ask for a property that does not exist, and read the error.
:::

:::bullet-points Recap
- OData is an OASIS standard for REST APIs, with a self-describing model at $metadata and standard query options.
- $select picks properties, $filter keeps rows, $orderby sorts, $top limits, $expand brings related items, and $count counts.
- The service checks every query against its model and answers a mistake with a 400 and a message.
- Encode spaces as %20, and quote dollar signs in a shell.
- GraphQL puts the control in the schema and the resolvers, and OData offers generic querying for free, so each suits different jobs.
:::

## References

- [OData.org](https://www.odata.org/)
- [OData overview, Microsoft Learn](https://learn.microsoft.com/en-us/odata/overview)
- [OData Version 4.01 Part 1: Protocol, OASIS](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html)
- [OData Web Services, Business Central, Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/webservices/odata-web-services)
- [TripPin demo service](https://services.odata.org/TripPinRESTierService/)
