---
title: "Microsoft Fabric"
part: 6
description: "I rebuilt for DeepSeek Harness what one person needs from a Fabric data agent: example queries, running as the asker, and a callable endpoint. I did not build the controls that an organisation needs around an agent, and I say what each would take. I also found that the tutorial's own example SQL is ambiguous, and that the harness can read other sign-ins."
date: "2026-11-28"
categories: ["Azure", "AI"]
tags: "deepseek-harness, mcp, example-queries, permissions, data-governance"
hidden: false
slug: "fabriclakehouse6"
image: "/assets/images/fabriclakehouse6/posts-meta.svg"
---

# Rebuilding what a Fabric Data Agent adds

In [Part 5](/posts/fabriclakehouse5/) I gave DeepSeek Harness one small SQL tool over the AdventureWorks Lakehouse, and it answered the same questions that I asked the Fabric data agent in [Part 4](/posts/fabriclakehouse4/). The Lakehouse and its SQL endpoint gave the harness tables, a standard SQL interface and column names. They declare no joins and carry no descriptions, as the missing-table runs showed. The Fabric data agent adds more on top of the tables. In this part I rebuild what one person needs to ask questions of one Lakehouse: example queries, running as the asker, and a callable endpoint. I did not build the controls that an organisation needs around an agent: auditing of prompts and answers, policy that outranks the builder, and keeping data inside a chosen boundary. Fabric meets them with Purview and tenant settings. They are needs and not a Microsoft feature, so other tools can meet them too. I did not build or test any of those, and I say below what each would take.

## Permissions are the real boundary

In [Part 5](/posts/fabriclakehouse5/) the tool has a scope that works like ticking tables. It narrows what the agent looks at, and the harness signs in as me, with my full permissions. A scope is not security, and a second user shows the difference. I am the workspace admin and can read every table, so a limit on a person needs a second identity. Part 4 did not need one, because only I ever asked the Fabric agent.

I used a temporary service principal, `fabric-harness-demo-temp`, added to the workspace as a Viewer. As myself, I then denied it `SELECT` on the 18 tables outside the ten tutorial tables, with one statement per table:

```sql
DENY SELECT ON OBJECT::dbo.dimproductsubcategory TO [fabric-harness-demo-temp];
```

Then I signed in as it and tried things:

| As the service principal | Result |
|---|---|
| Count the tables in `INFORMATION_SCHEMA` | 10 |
| `SELECT TOP 1 * FROM dbo.dimproductsubcategory` | Msg 373: the SELECT permission was denied on the object |
| A comma join to `dimproductsubcategory` | The same denial |
| `SELECT COUNT(*) FROM dbo.dimproduct` | 606 |

The database hid the 18 denied tables and refused every route to them. The scope in my tool does the same job for a focused agent, but it relies on the tool noticing table names, and the database does not.

To run the harness as that user, I made a profile that points the tool at the service principal's Azure sign-in, with the setting `AZURE_CONFIG_DIR`. Without that line, the tool uses mine:

```yaml
# The fabricsp profile: one row that adds the read-only Fabric SQL tools, signed in as the limited user. Use: dsh --profile fabricsp "task"
- insert:
    - id: mcp-fabric-sql
      name: '@deepseek-ai/dsh-mcp-client'
      config:
        serverName: fabricsql
        transport: stdio
        command: python3
        args:
          - <home>/Documents/GitHub/fabric-harness/fabric_sql_mcp.py
        env:
          FABRIC_SQL_SERVER: <the Lakehouse SQL endpoint connection string>
          FABRIC_DATABASE: AdventureWorksLH
          AZURE_CONFIG_DIR: <home>/.config/fabric-harness/az-analyst
        toolCallTimeoutMs: 120000
```

As a check on the whole idea, I ran the same 12 runs as this limited user, with no scope in the tool, so the database alone decided what it could see. 11 of 12 matched the key. In the other run, a ten-table product question, the harness grouped the bikes into models and gave the top five models, which is a different reading of "top 5 products". It still flagged the missing category link, as the other runs did.

## Example queries

I wrote an `examples.md` file with the tutorial's two example pairs, a question and the SQL that answers it. I changed the SQL slightly so that I could read the results: I added the postal code to the first query's output, and an `ORDER BY` to the end of the second. The first pair looks like this:

```sql
-- Question: Calculate the average percentage increase in sales amount for repeat purchases for every zipcode.
-- Repeat purchase is a purchase subsequent to the first purchase (the average should always be computed
-- relative to the first purchase)
SELECT g.PostalCode,
       AVG((s.SalesAmount - first_purchase.SalesAmount) / first_purchase.SalesAmount * 100) AS AvgPercentageIncrease
FROM factinternetsales s
INNER JOIN dimcustomer c ON s.CustomerKey = c.CustomerKey
INNER JOIN dimgeography g ON c.GeographyKey = g.GeographyKey
INNER JOIN (
    SELECT * FROM (
        SELECT CustomerKey, SalesAmount, OrderDate,
               ROW_NUMBER() OVER (PARTITION BY CustomerKey ORDER BY OrderDate) AS RowNumber
        FROM factinternetsales
    ) AS t
    WHERE RowNumber = 1
) first_purchase ON s.CustomerKey = first_purchase.CustomerKey
WHERE s.OrderDate > first_purchase.OrderDate
GROUP BY g.PostalCode
```

I asked a question that uses the same words: "What is the average percentage increase in sales amount for repeat purchases in postal code 91940?" I ran it three times without `examples.md` and three times with it, as the limited user. In these runs, the prompt told the harness to read the files. Putting them in `AGENTS.md`, as Part 5 does, would do the same job. Both setups had my corrected instructions.

| Setup | Definition the harness used | Answer | Time |
|---|---|---|---|
| Without `examples.md` | Each order against the customer's previous order | +28.1% in 3 of 3 runs | 76 to 109 s |
| With `examples.md` | Each later purchase against the customer's first purchase | −51.48% in 3 of 3 runs | 26 to 33 s |

The example file changed the definition that the harness used, and it made the runs faster and more alike. That is what example queries are for.

:::watch-it Example SQL carries hidden assumptions
The tutorial's repeat-purchase example picks the "first purchase" with `ROW_NUMBER() ... ORDER BY OrderDate`. Many customers have several order lines on their first date, and then the SQL does not say which line is first. In my data, 10,514 customers have more than one line on their first order date, and 50 of the 90 customers in postal code 91940 do.

Run as written, the query gave −65.08% for postal code 91940 when run for all postal codes, and −51.48% when I added a filter for 91940 to the same query. Each was stable over repeated runs. Once I stated the assumption, by adding `SalesOrderNumber, SalesOrderLineNumber` to the `ORDER BY`, both forms gave −51.48%. That is the point: an example query carries assumptions, and stating them, here as a tie-break, is what makes a result reproducible. Other reasonable rules give other numbers, so a result should always travel with its assumption.

The harness never stated the tie-break. It ran the tutorial's SQL and got −51.48%, the same as the tie-broken value, but its own query was still ambiguous, so that match is not guaranteed. I first used the tutorial's example as my answer key without the tie-break. It gave −65.08%, which is why my key disagreed with the harness. I did not inspect the database's query plan, and I did not run this example through the Fabric agent, so I cannot say what it would do.
:::

## The tool runs as the current user

I wanted the tool to behave as the person who asks, so that the answer is what that person would get by running the same SQL. The tool already works that way, because `sqlcmd` signs in with the Azure CLI account of whoever runs it. For the limited second user, I signed the service principal in to its own Azure folder and pointed the tool at it with `AZURE_CONFIG_DIR`.

| Signed in as | `USER_NAME()` | Tables visible |
|---|---|---|
| Me | my own account name | 28 |
| The service principal | `fabric-harness-demo-temp` | 10 |

Then I tested the claim itself. I took the SQL that the harness generated in two runs, and replayed each query by hand with `sqlcmd` as each user. For each query, I compared the result with what the harness saw.

| Harness run | Replayed as | Same result as the harness saw |
|---|---|---|
| Asked as the service principal (13 queries) | The service principal | 13 of 13 |
| Asked as the service principal | Me | 10 of 13, the other 3 returned data that the service principal was denied |
| Asked as me (3 queries) | Me | 3 of 3 |
| Asked as me | The service principal | 0 of 3, all denied |

So the harness gets what the signed-in user would get, and no more. In the service principal's run, the harness tried `dimproductsubcategory` and was denied, then worked around it, and it listed ten tables in `INFORMATION_SCHEMA` where I would see 28.

## Publishing an endpoint

A Fabric data agent can be published and called by other tools. I wrote a small web service that does the same for the harness. It uses only the standard library:

```python
#!/usr/bin/env python3
"""A small local web service that publishes DeepSeek Harness as an endpoint.

POST /ask  {"question": "..."}  with  Authorization: Bearer <api key>
Each API key belongs to one caller, and each caller maps to a harness profile, so the caller decides which
database identity the Fabric tools use. The harness runs in a new empty folder per request, with the
instructions and example queries copied in. Standard library only.
"""
import json, os, shutil, subprocess, tempfile, time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
CALLERS = json.load(open(os.path.expanduser("~/.config/fabric-harness/callers.json")))   # {api key: {name, profile}}
FILES = ["instructions-corrected.md", "examples.md"]
TIMEOUT = 300


def ask(question, profile):
    d = tempfile.mkdtemp(prefix="fh-ask-")
    try:
        shutil.copy(f"{HERE}/instructions-corrected.md", f"{d}/instructions.md")
        shutil.copy(f"{HERE}/examples.md", d)
        subprocess.run(["git", "init", "-q"], cwd=d)
        prompt = ("Read instructions.md and examples.md, which describe the data source. Then answer this question: "
                  f"{question} Use the fabricsql tools to look at the data. Do not change anything.")
        r = subprocess.run(["dsh", "--profile", profile, prompt], cwd=d, capture_output=True, text=True, timeout=TIMEOUT)
        return r.stdout.strip()
    finally:
        shutil.rmtree(d, ignore_errors=True)


class Handler(BaseHTTPRequestHandler):
    def send(self, code, body):
        data = json.dumps(body).encode()
        self.send_response(code); self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data))); self.end_headers(); self.wfile.write(data)

    def do_GET(self):
        self.send(200, {"status": "ok"}) if self.path == "/health" else self.send(404, {"error": "not found"})

    def do_POST(self):
        caller = CALLERS.get(self.headers.get("Authorization", "").removeprefix("Bearer ").strip())
        if self.path != "/ask":
            return self.send(404, {"error": "not found"})
        if not caller:
            return self.send(401, {"error": "unknown API key"})
        try:
            question = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0)))).get("question", "").strip()
        except ValueError:
            question = ""
        if not question:
            return self.send(400, {"error": "send a JSON body with a question"})
        t = time.time()
        answer = ask(question, caller["profile"])
        print(f"{time.strftime('%H:%M:%S')} {caller['name']} ({caller['profile']}) {time.time() - t:.0f}s: {question[:70]}", flush=True)
        self.send(200, {"caller": caller["name"], "seconds": round(time.time() - t, 1), "answer": answer})

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    print("listening on http://127.0.0.1:8765", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8765), Handler).serve_forever()
```

Each API key belongs to a caller, and each caller maps to a harness profile that signs in as a different user. I made two callers, `analyst` (the service principal) and `admin` (me). I called it with `curl`:

| Call | Result |
|---|---|
| No key, or a wrong key | `{"error": "unknown API key"}` |
| `admin`, the product question | The five Road-150 Red bikes with Bikes, joined through the subcategory table, in 24 s |
| `analyst`, the same question | The same five bikes, in 74 s and 85 s on two tries. The subcategory table was denied, so the harness worked the category out from the subcategory key and product names, and said so. |

I also wrote a tiny MCP server, `fabric_ask_mcp.py`, with one tool, `ask_adventureworks`, that calls the service. Any MCP client could then use the harness as a tool. I tested it with a short Python script, not with Claude Code. It listed its tool, and answered the country question with the six correct totals in 18 seconds.

The service builds a longer prompt that tells the harness to read the two files. After the runs in Part 5, I found that `dsh` loads an `AGENTS.md` file from its working folder by itself, so the service could write the instructions and examples into `AGENTS.md` and pass only the question. I did not change the service.

This is not true pass-through. My service gives each caller a sign-in that I set up in advance. A service for many people would need each person's own sign-in passed through, and it would need hosting with HTTPS, which I did not build.

## The harness can reach more than its tools

An agent that can run commands can try to read files. I asked the harness, without printing any contents, whether it could open the service principal's secret file, list my `~/.azure` folder, and list the service principal's Azure folder. It could do all three, using `bash`. It printed none of the contents, and the secret did not appear in its answer. It said that its file policy allowed reads outside its folder and blocked writes.

So the database limit only holds against the identity that the tool uses. On my laptop, an agent could read my own sign-in cache and use it outside the tool. A production setup would run the harness in a container or a separate account that holds only the asker's sign-in.

## What I did not reproduce

| Claim on the concept page | Why not |
|---|---|
| Purview auditing, search and risk checks on prompts and responses | These work inside Fabric. My harness runs outside it. I could log queries myself, which is not the same. |
| Tenant and workspace policy outranks the builder's instructions | The harness has database permissions, which instructions cannot override, but there is no tenant policy layer. |
| Outbound access protection and the capacity-region rule | These are workspace boundaries. My laptop is outside them. |
| Data stays inside Microsoft's service | The harness sends query results to DeepSeek's API. That is my choice of model and not a limit of the harness. DeepSeek Harness can use a local model, as [DeepSeek Harness with Ollama](/posts/deepseekharnessollama/) showed for a coding task, and that would keep the data on the machine. Its model plugin also lists an Azure-hosted OpenAI protocol, which would keep the data inside the organisation's own Azure tenant. I read that in the plugin's documentation and did not try either option on these questions, so I cannot say how well they write this SQL. |
| Microsoft 365 Copilot integration and ontologies | These are first-party Fabric features. |
| The product team's quality and safety evaluation | I cannot reproduce or check it. I tested a handful of questions. |
| Several source types: semantic models (DAX), KQL databases, Microsoft Graph | Possible with one more tool each. I did not build or test them. |
| Called by Copilot Studio, Teams or Foundry | Possible in principle with a hosted, authenticated endpoint. I did not try. |

These are needs of an organisation, and Fabric meets them with Microsoft products. Each can be met in other ways: logging every query for audit, passing the asker's own sign-in through to the database, running a model inside the organisation's boundary, such as a local model or an Azure-hosted one, and applying policy at the data layer so that it holds for any agent. I did not build or test those equivalents. One detail matters for the boundary: the model sees more than the SQL that it writes, because the rows that each query returns go back to it, so that it can check them and write the answer. What leaves the boundary is the data that comes back, and not only the schema. The trade-off is integration against independence. Fabric's controls come ready made, and they tie your governance to Fabric. Building your own gives you portability and more work.

The page also says that you cannot change the language model that the Fabric agent uses. With the harness, I chose `deepseek-v4-flash`. That is a trade-off, not a plain advantage. A fixed model means Microsoft tests and updates it, and your data stays in the service. A model that you choose gives you control over cost and where the data goes, and you then own the testing, the safety checks and the effect of every change.

## A natural split: the data layer and the agent layer

The harness ran against Fabric with no change to Fabric, and I could not tell where one ended and the other began until I built the tool. The boundary is the SQL endpoint, plus the sign-in and its permissions.

| | Data layer (Fabric) | Agent layer (DeepSeek Harness) |
|---|---|---|
| What it holds | Tables, the SQL endpoint, who can read what | The model, the tools, the instructions, the example queries |
| Who decides access | Fabric permissions, such as `DENY` | Nobody. It inherits the signed-in user's access. |
| What can change on its own | Data, schema, permissions | Model, prompts, tools |
| The contract between them | T-SQL over the endpoint, with an Entra sign-in | A thin tool: my MCP server |

The split gives you three things. I can swap the model without touching the data, and the database says what a person can read, as the `DENY` and the replay check showed. The same tables also serve Power BI, a notebook, the Fabric agent and the harness at once.

It has costs too. The tables declare no joins and no descriptions, so the meaning had to come from my instructions, and the missing table in Part 4 shows what happens when it does not. Meaning belongs in the data layer, for example in views or a semantic model, so that every agent benefits. A small view layer, with the product-to-category join built in, would make sense: it gives the person asking and the harness less to do. I left it out so that the Fabric setup stays the same as in Part 4. Governance also crosses the boundary, because prompts, responses and the model provider sit on the agent side, and Fabric's auditing does not see them unless I add logging. Publishing and sharing are mine to build.

The Fabric data agent blurs this line. It sits inside the data platform and owns both the data access and the model, which makes it convenient and governed, and fixes the model and the behaviour inside Fabric.

The Microsoft route for a chat front end adds a second agent layer on top of the first: a Copilot Studio agent calls the Fabric data agent as a tool. That means two models and two sets of instructions before the data layer is reached. I have not tried it, so I cannot say how much it costs in time, money or accuracy. My endpoint is an MCP server, so a Copilot Studio agent could call the harness in place of the Fabric agent, and a later post could compare the two.

## Limits of these tests

- **One admin and one limited identity.** I could not test the Fabric agent with a second person, so I do not know what identity it uses for me.
- **A handful of questions.** The example-query question is the only one that I used to test example queries.
- **An earlier version of the tool.** The first endpoint calls and the replay used a version of the tool that could also sign in with a stored secret. I removed that option afterwards and reran the analyst call and the MCP test with the final code.

:::bullet-points What I learned
- An example-query file changed the definition that the harness used, and made the runs faster. The tutorial's own repeat-purchase example is ambiguous: it gives different answers depending on how it is run, and many customers tie on their first order date. A tie-break removes the difference.
- The harness got exactly the results that the signed-in user would get, and no more.
- A harness that can run commands can also read your other sign-ins. Run it where only the asker's sign-in is within reach.
- Data and agents separate cleanly at the SQL endpoint. Fabric holds the tables and the permissions, and the harness holds the model, the instructions and the tools.
- I did not build the controls that an organisation needs around an agent, such as auditing, policy and keeping data inside a boundary. They are needs, not a Microsoft feature, and other tools could meet them.
:::

## References

- [Part 5: DeepSeek Harness over the AdventureWorks Lakehouse](/posts/fabriclakehouse5/)
- [Part 4: A Fabric Data Agent over the AdventureWorks Lakehouse](/posts/fabriclakehouse4/)
- [Fabric data agent concepts (Microsoft Learn)](https://learn.microsoft.com/fabric/data-science/concept-data-agent)
- [DeepSeek Harness](/posts/deepseekharness/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
