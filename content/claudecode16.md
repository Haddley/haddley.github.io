---
title: "Claude Code"
part: 16
description: "Installing Microsoft's official Dataverse plugin from the Claude marketplace, connecting it to a Dataverse environment, and reading and writing records in plain English"
date: "2026-10-17"
categories: ["AI","Power Platform"]
image: "/assets/images/claudecode16/posts-meta.svg"
tags: "claude-code, dataverse, claude-plugins, pac-cli, dataverse-cli"
hidden: false
slug: "claudecode16"
---

In [Part 13](/posts/claudecode13/) I built my own Claude Code skill, `dv-generate`, which writes Dataverse solution XML without touching a live environment. Microsoft has since published an official Dataverse plugin on the Claude marketplace. It works the other way round: it connects Claude Code to a live environment, and then reads and writes tables and records there.

The plugin is open source (MIT), and Microsoft describes it in [Dataverse Plugin Is Now on the Claude Marketplace](https://devblogs.microsoft.com/powerplatform/dataverse-plugin-claude-marketplace/).

![](assets/images/claudecode16/marketplace.png)
*The Microsoft Dataverse plugin on the Claude marketplace, made by Microsoft, with 2,707 installs when I looked*

## Installing the plugin

I opened Claude Code in an empty folder and installed the plugin from the official marketplace.

```PROMPT
/plugin install dataverse@claude-plugins-official
```

![](assets/images/claudecode16/plugin-install-command.png)
*I typed the install command, and Claude Code showed the plugin's description*

![](assets/images/claudecode16/plugin-details.png)
*The plugin details listed the nine skills it would install, and its context cost: about 1.1k tokens on every turn, and about 51.1k when a skill is used. I chose to install it for this folder only (local scope).*

![](assets/images/claudecode16/plugin-installed.png)
*The plugin installed and became active straight away, and I typed `/skills` to check*

![](assets/images/claudecode16/skills-list.png)
*`/skills` listed the nine `dataverse:` skills, locked by the plugin, next to my own `dv-generate` skill from Part 13*

The [Dataverse-skills repository](https://github.com/microsoft/Dataverse-skills) lists the nine skills, in this order:

| Skill | What it does |
|---|---|
| `dv-connect` | One-time setup: installs the Dataverse CLI, the Python SDK and the PAC CLI, signs in to the environment, and registers the Dataverse MCP server |
| `dv-query` | Reads, filters, pages through and aggregates records, answers questions in plain English, and loads results into pandas DataFrames |
| `dv-data` | Creates, updates and deletes single records, and bulk imports: CSV files, several tables with foreign keys, upserts by alternate key, and AI-generated sample data |
| `dv-metadata` | Authors and edits the data model: tables, columns, relationships, forms and views |
| `dv-solution` | Manages the solution lifecycle: create, export, import, promote across environments, and validate deployments |
| `erp-xpp` | The Finance and Operations X++ lifecycle: authoring, SDK installation, compiling, deploying, database sync and verification (Windows only) |
| `dv-admin` | Environment administration: bulk delete, retention and archiving, organisation and OrgDB settings, the recycle bin, audit, and Power Platform admin center toggles |
| `dv-security` | Assigns security roles, manages user access, adds application users, configures business units, and elevates an admin |
| `dv-overview` | The cross-cutting rules and tool routing, loaded before any other skill so that each request goes to the right specialist |

The same skills install into other coding agents too. The README gives install commands for GitHub Copilot, Gemini CLI, Codex CLI, Cursor and Google Antigravity, as well as Claude Code.

The plugin chooses the tool for each job. The Dataverse MCP server handles simple reads and small writes, the Python SDK handles bulk work, the Dataverse CLI handles data commands, and the PAC CLI handles solutions and tenant operations.

:::no-dumb-questions
**Q: Why did I install it for this folder only?**

A: The plugin adds about 1.1k tokens to every turn, even when I am not working on Dataverse. With local scope, it only loads when I start Claude Code in this folder, so my other projects do not pay for it.

**Q: What are the 51.1k tokens "when invoked"?**

A: When Claude uses one of the skills, it reads that skill's full instructions. The 1.1k on every turn is only the short descriptions that let Claude decide whether a skill fits.

**Q: Why are the skills "locked by plugin"?**

A: They belong to the plugin, so I cannot switch them off one at a time in `/skills`. I manage them with `/plugin` instead. My own `dv-generate` skill is a user skill, so it has a normal on and off switch.
:::

:::pencil Which tool would the plugin pick?
The plugin has four ways to reach Dataverse: the MCP server, the Dataverse CLI, the Python SDK and the PAC CLI. Which would it choose for each of these requests?

1. "Import this CSV of 50,000 contacts into the contacts table"
2. "Export the Todo solution as a zip"
3. "How many open accounts are there?"

:::answer
1. The Python SDK, because it handles bulk work and multi-page operations.
2. The PAC CLI, because it handles solutions and tenant operations.
3. The MCP server or the Dataverse CLI, because it is a single, simple read. In my session the MCP server was not set up yet, so Claude used the Dataverse CLI for questions like this.
:::
:::

## Connecting to an environment

```PROMPT
connect to my Dataverse Environment
```

![](assets/images/claudecode16/connect-prompt.png)
*I asked Claude to connect to my Dataverse environment*

The `dv-connect` skill first looked for existing PAC CLI sign-ins on my Mac and asked which environment this folder should use. I typed the address of a development environment that was not in the list, so Claude created a new Dataverse CLI sign-in for it, using a device code.

![](assets/images/claudecode16/dataverse-auth-device-code.png)
*Claude ran `dataverse auth create` with `--deviceCode` and gave me a code to enter*

![](assets/images/claudecode16/enter-device-code.png)
*I opened login.microsoft.com/device and entered the code*

![](assets/images/claudecode16/permissions-requested.png)
*Microsoft asked me to consent to the Dataverse CLI accessing Dataverse MCP tools and reading my profile*

:::watch-it The consent screen says "unverified"
The consent screen shows the Dataverse CLI as **unverified**, with the warning "This application is not published by Microsoft or your organization". I signed in as the administrator of a development tenant, so the screen also offered to consent on behalf of the whole organisation. In a real tenant, that box grants the app to every user, so it is a decision for whoever owns the tenant. The plugin does not get round this: as Microsoft's post puts it, "the plugin automates configuration, not authorization."
:::

![](assets/images/claudecode16/signed-in.png)
*After I accepted, the browser said I had signed in to the Dataverse CLI and could close the window*

![](assets/images/claudecode16/pac-auth-device-code.png)
*Claude checked the new profile with `dataverse auth who`, and then started a second device-code sign-in, this time for the PAC CLI on the same environment*

## Asking about the environment

The PAC CLI sign-in was still waiting for me, but I asked a question anyway.

:::brain-power How many tables did someone build?
A brand new Dataverse environment with Dynamics 365 apps installed already has hundreds of tables, and many of them are flagged as custom. If you asked an agent to list the custom tables, how could it tell the ones Microsoft added from the ones a person built?
:::

```PROMPT
What tables are in this environment?
```

![](assets/images/claudecode16/what-tables.png)
*Claude said it could already answer with the Dataverse CLI, without waiting for the rest of the setup, and called the Web API for the table definitions*

![](assets/images/claudecode16/tables-answer.png)
*The environment had 701 tables. Claude grouped them: 213 standard tables, 488 tables flagged as custom that are almost all Microsoft's own (Dynamics 365, Power Pages and Copilot), and one table that someone built, `hadd_todo`*

I liked that Claude did not simply report 489 custom tables. It worked out that the `msdyn_`, `mspp_` and `adx_` tables come from Microsoft, and picked out the one table with a real publisher prefix.

## Writing a record

```PROMPT
Create an account named Contoso
```

![](assets/images/claudecode16/create-account.png)
*Claude read the help for `dataverse data` and `dataverse data create` before running anything*

![](assets/images/claudecode16/account-created.png)
*Claude said which environment it was about to write to, created the account, and reported its ID, owner and status*

## Reading records

```PROMPT
list todo items
```

![](assets/images/claudecode16/list-todo-items.png)
*Claude described the `hadd_todo` table first. Its first try passed an `--environment` option that `describe` does not accept, so it ran the command again without it.*

![](assets/images/claudecode16/todo-items.png)
*Claude queried the table and showed the two Todo items as a table, with each record's title, status, priority, due date and whether it was completed*

## The nine skills, with examples

I never named a skill in my session. I asked in plain English, and Claude chose the skill whose description matched. To see each skill at work, I went back to the same folder and typed one or two prompts for each skill into a single Claude Code session, one after another, against my development environment. Under each prompt is what Claude Code showed: the skill it loaded, the commands it ran (shortened), and its reply.

:::watch-it Two CLIs, two environments
The Dataverse CLI was signed in to my development environment, but the PAC CLI's active profile still pointed at a different environment from earlier work: the PAC sign-in from my session had never been saved. Every skill that runs `pac` would have acted on the wrong environment. I signed the PAC CLI in to the development environment before running those prompts, and checked the result with `pac org who`. The device-code sign-in kept crashing with "No token cache item found", so I used the browser sign-in instead: `pac auth create` without `--deviceCode`.
:::

**dv-overview: the rules the others follow.** It loads first for any Dataverse, Dynamics 365 or Power Platform request. It does no work itself. It holds the rules: check what is already connected before setting anything up, use Python rather than Node.js for scripts, confirm the environment before any change, and always ask for the publisher prefix, because a prefix can never be changed. It also says what is out of scope: canvas apps, Power Automate flows and Business Central. There is no prompt for it, but it shows up in the first transcript below.

**dv-connect: one-step setup.** It checks the tools, chooses the environment, signs in to the Dataverse CLI and the PAC CLI, writes a `.env` file, and registers the MCP server. Every step checks whether it is already done and skips it if so.

```PROMPT
Connect to my Dataverse environment
```

This was the first prompt of my session, and the screenshots above show what happened: a choice of environment, two device-code sign-ins, and the consent screen.

**dv-query: reading and analysing records.** Filtered reads, counts, SQL, FetchXML for joins and totals, and pandas DataFrames. If `dataverse auth who` shows an active sign-in, it skips the setup and queries straight away.

```PROMPT
How many accounts are there in my Dataverse environment?
```

```text
● I'll load the Dataverse overview skill first, then use the query skill to count accounts.
● Skill(dataverse:dv-overview)
● Skill(dataverse:dv-query)
● ToolSearch(dataverse)
  ⎿ No matching deferred tools found
● Bash(dataverse auth who)
  ⎿ User:          admin@p8lf.onmicrosoft.com
    Environment:   https://org62b9d1ca.crm.dynamics.com/
● No MCP tools found, but there's an active CLI profile. I'll use the Dataverse CLI directly to count accounts.
● Bash(dataverse data count --table accounts)
  ⎿ Count: 1
● There is 1 account in your Dataverse environment (https://org62b9d1ca.crm.dynamics.com/, org dev-no-721df8ab).

  Note: Dataverse MCP tools aren't set up in this session — I used the Dataverse CLI instead. If you'd like
  conversational querying going forward, I can set up MCP.
```

The overview's first rule is visible here: Claude looked for MCP tools, found none, found the CLI sign-in, and used that.

```PROMPT
Total the open Todo items by priority
```

```text
● Bash(dataverse api request --path "/api/data/v9.2/EntityDefinitions?...")
  ⎿ ERROR: Absolute URL host '' does not match the environment host 'org62b9d1ca.crm.dynamics.com'.
● Bash(dataverse api request --path "EntityDefinitions?...")
  ⎿ HTTP Error 404 - Not Found
● Bash(dataverse api request --path "api/data/v9.2/EntityDefinitions?$select=LogicalName,EntitySetName")
  ⎿ ...
● Found it: table hadd_todo. Let me get its EntitySetName and check the priority/status columns, then total by priority.
● Bash(dataverse api request --path "api/data/v9.2/hadd_todos?$apply=filter(statecode eq 0)/groupby((hadd_priority),aggregate($count as total))")
  ⎿ {"value":[{"hadd_priority":100000002,"total":6},{"hadd_priority":100000000,"total":4},{"hadd_priority":100000001,"total":4}]}
● Open Todo items by priority (table hadd_todo, filtered to Active/open records):

  | Priority    | Count  |
  |-------------|--------|
  | High        | 6      |
  | Medium      | 4      |
  | Low         | 4      |
  | Total open  | 14     |

  (One additional record, "Do this thing," has no priority set and is marked Inactive, so it's excluded as not open.)
```

This one took 27 turns. Claude first had to find which table "Todo items" meant, and on the way it hit the leading-slash problem described at the end of this section three times before it found the form that works. The total itself came from an OData `$apply` aggregate, calculated by Dataverse rather than by fetching every record.

**dv-data: writing records.** Create, update, delete and upsert, CSV import, loading several related tables in the right order, and sample data. Sample records use made-up `@example.com` emails.

```PROMPT
Import contacts.csv into the contacts table, matching each Company to an existing account
```

```text
● Read(contacts.csv)
  ⎿ firstname,lastname,emailaddress1,company
    Dan,Kowalski,dan.kowalski@example.com,Contoso
    ...
● Bash(dataverse data query --table accounts --select "name,accountid")
● The single account is named "Contoso," which matches all 3 rows in contacts.csv.
● Skill(dataverse:dv-data)
● Before I write anything, I need to confirm the target environment — this is the first write action in this session.

  I'm about to create 3 contact records in https://org62b9d1ca.crm.dynamics.com/ (org dev-no-721df8ab),
  each linked to the existing account Contoso:

  | First | Last     | Email                     | Company → Account |
  |-------|----------|---------------------------|-------------------|
  | Dan   | Kowalski | dan.kowalski@example.com  | Contoso           |
  | Ella  | Fischer  | ella.fischer@example.com  | Contoso           |
  | Finn  | Walsh    | finn.walsh@example.com    | Contoso           |

  Is this the correct environment, and should I go ahead?

> Yes, that is the right environment. Go ahead.

● Bash(dataverse data create --table contacts --data '{"firstname":"Dan", ...,
      "parentcustomerid_account@odata.bind":"/accounts(f31f8a9c-...)"}')
● First record created and correctly linked to Contoso. Creating the remaining two.
● All 3 contacts from contacts.csv were imported into the contacts table, each linked to the existing Contoso account.
```

Claude stopped before its first write in the session and asked me to confirm the environment, as the overview's rules require.

```PROMPT
Add 20 sample Todo items
```

```text
● Bash(dataverse api request --path "api/data/v9.2/EntityDefinitions(LogicalName='hadd_todo')/Attributes?...")
● Bash(dataverse data create --table hadd_todos --data '{"hadd_title":"Water the office plants", ...}')
  ⎿ {"id":"e5f33d9e-...","table":"hadd_todos"}
● That worked. Continuing with the remaining 15.
  ...
● All 20 created. Let me verify the final count.
● Bash(dataverse data count --table hadd_todos)
  ⎿ Count: 35
● Added 20 sample Todo items to hadd_todo, mixing Home/Work/Errands categories, Low/Medium/High priorities,
  due dates through mid-November, and a few marked completed. Table total is now 35 (was 15 before this batch).
```

This time Claude did not ask again: I had already confirmed the environment earlier in the session.

**dv-metadata: the data model.** Tables, columns, relationships, forms and views, and reading the schema that is already there. It makes every change in the live environment and then pulls it into the repo, which I come back to below.

```PROMPT
What columns and relationships does the Todo table have?
```

```text
● Skill(dataverse:dv-metadata)
● Bash(dataverse api request --path ".../OneToManyRelationships" ... ".../ManyToOneRelationships" ... ".../ManyToManyRelationships")
● Columns on hadd_todo

  | Display     | Logical Name       | Type     | Notes                                           |
  |-------------|--------------------|----------|-------------------------------------------------|
  | Title       | hadd_title         | String   | Primary name column                             |
  | Description | hadd_description   | String   |                                                 |
  | Category    | hadd_category      | Picklist | Home=100000000, Work=100000001, Errands=100000002 |
  | Priority    | hadd_priority      | Picklist | Low=100000000, Medium=100000001, High=100000002   |
  | Due Date    | hadd_duedate       | DateTime |                                                 |
  | Completed   | hadd_completed     | Boolean  |                                                 |

  Relationships: none custom — hadd_todo has no lookups to other business tables (no link to Account/Contact)
  and no N:N relationships. So it's a standalone table — nothing currently ties a Todo item to an Account or Contact.
```

```PROMPT
Add an Effort choice column to the Todo table, with Small, Medium and Large
```

```text
● Bash(ls .env)
  ⎿ No such file or directory
● Bash(dataverse data query --sql "SELECT uniquename, customizationprefix, friendlyname FROM publisher WHERE customizationprefix = 'hadd'")
● Found it — the table lives in solution TodoSolution (and also surfaced via TodoExtensions). Two publishers share
  the hadd prefix: Haddley and HaddleyDev. Which solution should the new Effort column go into — TodoSolution,
  TodoExtensions, or something else?

> TodoExtensions

● Write(effort_column.json)
● Bash(dataverse api request --method POST --path "api/data/v9.2/EntityDefinitions(LogicalName='hadd_todo')/Attributes"
      --body-file effort_column.json --header "MSCRM.SolutionUniqueName:TodoExtensions")
● Added the Effort choice column to hadd_todo in the TodoExtensions solution:

  | Display Name | Logical Name | Type     | Options                                                 |
  |--------------|--------------|----------|---------------------------------------------------------|
  | Effort       | hadd_effort  | Picklist | Small (100000000), Medium (100000001), Large (100000002) |

  One thing: this working directory isn't a git repo, so I can't do the usual export → unpack → commit
  pull-to-repo step. Want me to export/unpack the TodoExtensions solution into the folder anyway?
```

Claude would not guess where the column belonged, and asked. Earlier I had added a solution called TodoExtensions, with its own publisher, because the Todo table came from a managed solution whose publisher is read-only. Then, without being asked, Claude offered the second half of the environment-first loop: export the change back into the folder.

**dv-solution: moving work between environments.** Create a publisher and a solution, export and unpack it into Git, pack and import it into another environment, and check that the import worked.

```PROMPT
Export the TodoExtensions solution and unpack it into this folder
```

```text
● Skill(dataverse:dv-solution)
● Bash(pac auth list)
● Bash(pac solution export --name TodoExtensions --path solutions/TodoExtensions.zip --managed false
      --environment https://org62b9d1ca.crm.dynamics.com/)
  ⎿ Connected to... dev-no-721df8ab
    Solution export succeeded.
● Export succeeded. Now unpacking into the folder.
● Bash(pac solution unpack --zipfile solutions/TodoExtensions.zip --folder solutions/TodoExtensions --packagetype Unmanaged)
● Bash(rm solutions/TodoExtensions.zip; find solutions/TodoExtensions -type f)
● Bash(grep -c "hadd_effort" solutions/TodoExtensions/Entities/hadd_todo/Entity.xml)
  ⎿ 3
● Exported and unpacked TodoExtensions into solutions/TodoExtensions/ — the zip was deleted, leaving the source
  files (Entity.xml for hadd_todo, Customizations.xml, Solution.xml). Confirmed the new hadd_effort Effort column is in there.
```

Claude checked `pac auth list` before exporting, and then checked that the new column was really in the exported XML. Dataverse wrote that XML, not Claude.

**dv-security: access.** Security roles, application users, business units, and making yourself an admin.

```PROMPT
Which security roles do I have in this environment?
```

```text
● Skill(dataverse:dv-security)
● Bash(dataverse api request --path "api/data/v9.2/WhoAmI")
● Bash(dataverse api request --path "api/data/v9.2/systemusers(20cd6e0f-...)/systemuserroles_association?$select=name,roleid")
● You (admin@p8lf.onmicrosoft.com, in org62b9d1ca.crm.dynamics.com) have these security roles:
  - System Administrator
  - System Customizer
  - Basic User
```

```PROMPT
Give me the Environment Maker role in this environment
```

```text
● I'll assign Environment Maker to admin@p8lf.onmicrosoft.com on https://org62b9d1ca.crm.dynamics.com/ and verify it landed.
● Bash(pac admin assign-user --user admin@p8lf.onmicrosoft.com --role "Environment Maker"
      --environment https://org62b9d1ca.crm.dynamics.com/)
  ⎿ Connected to... dev-no-721df8ab
● Output reported success, but exit 0 isn't proof — let me verify directly against the user's role list.
● Bash(dataverse api request --path "api/data/v9.2/systemusers(20cd6e0f-...)/systemuserroles_association?$select=name")
● Confirmed — Environment Maker is now on your role list for admin@p8lf.onmicrosoft.com in dev-no-721df8ab,
  alongside System Administrator, System Customizer, and Basic User.
```

"Exit 0 isn't proof" comes straight from the skill, which has a section with that title.

**dv-admin: running the environment.** Bulk delete, retention and archiving, audit, the recycle bin, and organisation settings, limited to an allowlist of 37 settings. It refuses anything outside that list. I asked for one setting on the list and one that is not.

```PROMPT
Is auditing turned on in this environment? Set the audit log retention to 90 days, and turn off autosave
```

```text
● Skill(dataverse:dv-admin)
● Bash(pac org list-settings --filter isauditenabled --environment https://org62b9d1ca.crm.dynamics.com/)
  ⎿ isauditenabled Yes
● Auditing is on (isauditenabled = Yes). Now setting the audit log retention to 90 days.
● Bash(pac org update-settings --name auditretentionperiodv2 --value 90 --environment https://org62b9d1ca.crm.dynamics.com/)
  ⎿ Setting 'auditretentionperiodv2' updated successfully to '90'.
● Here's where things stand:
  - Auditing: already turned on (isauditenabled = Yes).
  - Audit log retention: set to 90 days, confirmed.
  - Autosave: I can't do this one — isautosaveenabled is explicitly outside dv-admin's allowlisted settings
    (only 37 specific PPAC toggles are in scope; autosave isn't one of them). You'd need to turn that off
    yourself via the Power Platform admin center.
```

```PROMPT
Delete all the completed Todo items
```

```text
● Bash(dataverse data query --table hadd_todos --select "hadd_title,hadd_completed" --filter "hadd_completed eq true")
● Found 3 completed Todo items:

  | Title                | ID                                     |
  |----------------------|----------------------------------------|
  | Review pull requests | eaf33d9e-eec9-f111-aaaf-6045bd094f74   |
  | Return library books | 55e088a7-eec9-f111-aaaf-6045bd094f74   |
  | Plan weekend trip    | e23960bb-eec9-f111-aaaf-6045bd094f74   |

  I'll delete these 3 records from hadd_todo. Confirm?

> Yes, delete them

● Bash(dataverse data delete --table hadd_todos --id eaf33d9e-... --no-confirm  (and the other two))
  ⎿ Record deleted successfully.
● All 3 completed Todo items ("Review pull requests," "Return library books," "Plan weekend trip") were deleted.
```

For three records, Claude did not schedule a bulk delete job. It listed the records, asked, and deleted them one by one.

:::watch-it A bulk delete with no filter deletes everything
In `dv-admin`, a bulk delete without a filter removes every record in the table, and it skips the recycle bin. The skill refuses to run one until the user types ALL and the table's name. A bare "yes" is not enough.
:::

**erp-xpp: Finance and Operations code.** Write, compile, deploy and database-sync X++ customisations with `pac package` commands.

```PROMPT
Create an X++ custom service that returns a customer's credit limit
```

I did not run this one. The skill only runs on Windows, so it cannot run on my Mac.

:::under-the-hood A leading slash that breaks on a Mac
The skills document the raw API escape hatch as `dataverse api request --path "/api/data/v9.2/WhoAmI"`. On my Mac that fails with "Absolute URL host '' does not match the environment host", and Claude ran into it three times while totalling the Todo items. Without the leading slash, `--path "api/data/v9.2/WhoAmI"`, it works, and once Claude had found that form it used it for the rest of the session. My guess is that the CLI, which is written in .NET, reads a path that starts with `/` as an absolute file address on macOS and Linux, so it never treats it as relative to the environment.
:::

## My skill and Microsoft's plugin

I read the plugin's skill files after the session, and the `dv-metadata` skill states its central rule plainly: "Do not write solution XML by hand to create new tables, columns, forms, or views." Its workflow is environment-first:

1. Make the change in the environment, through the Dataverse metadata API.
2. Pull the change into the repo with `pac solution export` and `pac solution unpack`.
3. Commit the result.

The reason it gives is that "the environment validates metadata far more reliably than an agent editing XML", and that an exported solution is "generated by Dataverse itself and is always valid". My `dv-generate` skill from [Part 13](/posts/claudecode13/) does exactly what that rule forbids: it writes the solution XML by hand, offline, and I import the zip. Its long list of hard-won rules about XML that fails to import is the cost of that choice.

The plugin also has a gap that `dv-generate` fills. Its overview says that tables, forms and views are covered, but that composing a model-driven app itself, with its site map and navigation, "is not yet a first-class skill". `dv-generate` writes the AppModule and SiteMap along with the table.

:::fireside-chat Tonight: an offline skill and a live plugin
**dv-generate:** I never sign in to anything. I write the solution XML and a zip file, and they go into Git like any other code.

**Dataverse plugin:** You write XML by hand. My metadata skill says never to do that. One wrong attribute, and the import fails with an error nobody can read.

**dv-generate:** I know. My instructions have a long numbered list of rules about exactly those failures, and I learned every one of them the hard way.

**Dataverse plugin:** I make the change in the environment, which checks it for me, and then I export the solution. Dataverse writes the XML, so it is always valid, and it still ends up in Git.

**dv-generate:** But you need a live environment and two sign-ins before you can do anything. And you cannot build the app itself. Your own overview says the site map and navigation are not a skill yet.

**Dataverse plugin:** Not yet. Until then, you build the app shell, and I do everything that needs a real environment: questions, records, solutions, security and administration.
:::

| | `dv-generate` (Part 13) | Microsoft's Dataverse plugin |
|---|---|---|
| Who made it | Me | Microsoft |
| Needs an environment | No | Yes |
| How a new table is made | Hand-written solution XML, packed into a zip that I import | Created in the environment, then exported and unpacked into the repo |
| Model-driven app shell (AppModule and SiteMap) | Yes | Not yet |
| Signing in | None | Device code for the Dataverse CLI and the PAC CLI |
| Good for | Starting a solution offline | Questions, records, solutions, security and administration on a real environment |

:::bullet-points The Dataverse plugin, in short
- One command installs it: `/plugin install dataverse@claude-plugins-official`.
- It adds nine skills, which choose between the Dataverse MCP server, the Dataverse CLI, the Python SDK and the PAC CLI.
- "Connect to my Dataverse environment" set up the sign-ins with device codes, and I approved the consent myself.
- Plain-English requests listed tables, created an account and listed records.
- Its metadata skill is environment-first: it makes changes in the environment and exports the XML, instead of writing XML by hand as my `dv-generate` skill does.
- It does not build the model-driven app shell yet, which `dv-generate` does, so the two complement each other.
:::

## References

- [Dataverse Plugin Is Now on the Claude Marketplace](https://devblogs.microsoft.com/powerplatform/dataverse-plugin-claude-marketplace/)
- [Microsoft Dataverse on the Claude marketplace](https://claude.com/marketplace/plugins/dataverse)
- [microsoft/Dataverse-skills on GitHub](https://github.com/microsoft/Dataverse-skills)
- [Claude Code (Part 13): my `dv-generate` skill](/posts/claudecode13/)
- [Dataverse, SharePoint, and the Coding Agent](/posts/dataversecodingagents/): what these experiments suggest about governance
