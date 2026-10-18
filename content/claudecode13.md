---
title: "Claude Code"
part: 13
description: "Building a Claude Code skill that generates Dataverse solution XML for Power Platform"
date: "2026-06-03"
categories: ["AI","Power Platform"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "claude-code, ai-agent, anthropic, agentic-coding, powerplatform, dataverse"
hidden: false
slug: "claudecode13"
---

I built a Claude Code skill called `dv-generate` that generates Dataverse solutions for Power Platform. It's published on GitHub. The skill installs with a single curl command.

```bash
curl -fsSL https://raw.githubusercontent.com/Haddley/dv-generate/main/install.sh | bash
```

![](assets/images/claudecode13/Screenshot-2026-06-04-at-12.43.38-PM.png)
*I ran `/skills` in Claude Code and saw there were no skills installed yet*

![](assets/images/claudecode13/Screenshot-2026-06-04-at-12.44.32-PM.png)
*I ran the install script and watched it clone the dv-generate plugin and register it*

![](assets/images/claudecode13/Screenshot-2026-06-04-at-12.44.50-PM.png)
*After restarting Claude Code, `/skills` now showed the `dv-generate` skill listed and active*

With the skill installed, I opened Claude Code in an empty folder and checked that the skill was available.

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.31.29-PM.png)
*I opened Claude Code in an empty folder called `dv-generate-test` and ran `/skills`. `dv-generate` is listed as a user skill*

Then I gave Claude a prompt to generate a Todo model-driven app.

```PROMPT
Create a Dataverse solution for a simple Todo model-driven app with a Todo table. The table should include the following fields:

Title (required text field)
Description (multiline text)
Due Date (date field)
Priority (choice field with options: Low, Medium, High)
Completed (yes/no boolean field)
Generate the solution as a .zip file that I can import directly into my development environment.
```

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.32.13-PM.png)
*I typed the Todo prompt. It asks for a `.zip` I can import into my development environment, not a managed solution*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.32.35-PM.png)
*Claude loaded the skill and asked which publisher prefix to use before writing any XML. I chose `neil`*

Claude wrote `solution.xml`, `customizations.xml` and `pack.sh`, and built `TodoSolution.zip`. I used two Developer environments for the rest of this post: one for development, and one standing in for test or production.

## Import into development

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.37.18-PM.png)
*In make.powerapps.com on my development environment, I chose Import solution and picked `TodoSolution.zip` (6 KB)*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.37.36-PM.png)
*The file was selected and I clicked Next*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.37.53-PM.png)
*The import details show an **Unmanaged** solution from publisher Neil, version 1.0.0.0*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.40.12-PM.png)
*The solution imported successfully and is listed with Managed set to No*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.40.56-PM.png)
*The solution overview confirms the package type is Unmanaged*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.41.57-PM.png)
*The Todo App model-driven app appeared in Apps*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.42.29-PM.png)
*The app opened on an empty All Todos view*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.42.58-PM.png)
*I created a Todo record, "Go shopping"*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.43.11-PM.png)
*The record saved and appeared in the list*

## Release to the second environment

Importing into development gives me an unmanaged solution I can keep changing. To deploy it, I export it as managed from development.

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.43.43-PM.png)
*To move the solution on, I selected it in the development environment and chose Export solution*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.43.57-PM.png)
*The export panel starts by asking to publish all changes*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.44.19-PM.png)
*Published*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.44.36-PM.png)
*It lists the managed solutions the target environment must already have: App Framework Infra Extensions and App Module Assets. This comes from the `MissingDependencies` block in `solution.xml`*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.44.51-PM.png)
*I exported as **Managed (recommended)**. The portal proposed version 1.0.0.1, one higher than the 1.0.0.0 I had imported*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.45.39-PM.png)
*The export finished and offered the zip to download*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.46.04-PM.png)
*I switched to my second environment, `dev-no-721df8ab`, which stands in for test or production*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.47.02-PM.png)
*In that environment I chose Import solution and picked the downloaded `TodoSolution_1_0_0_1_managed.zip` (8 KB)*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.47.14-PM.png)
*The managed zip was selected*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.48.09-PM.png)
*The import details say **Managed**, version 1.0.0.1*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.50.09-PM.png)
*The solution imported and shows Managed set to Yes*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.50.21-PM.png)
*The Todo App is available in the second environment*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.50.49-PM.png)
*It opens on an empty list, because data does not travel with the solution*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.51.22-PM.png)
*I created a record directly in the managed environment*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.51.37-PM.png)
*It saved*

Note that the portal raises the version at export time. Dev was at 1.0.0.0 and the managed package is 1.0.0.1, so the next change has to be numbered higher than that.

## An update: two new columns

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.52.11-PM.png)
*Back in Claude Code, the end of its first summary shows the table, the main form and the two views, and says the solution is unmanaged only, with the advice to import into dev and export as managed from there. Below it I typed my first update request. I asked for version 1.0.0.2 because the portal export had already moved dev to 1.0.0.1*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.52.42-PM.png)
*Claude edited the XML in place and kept the existing columns, GUIDs and schema names. It warns that importing over dev overwrites anything I changed in the form or views, and that its own generator script is out of date*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.53.26-PM.png)
*I imported the new zip into the development environment*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.53.52-PM.png)
*It is the same `TodoSolution.zip`, rebuilt a minute earlier*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.54.03-PM.png)
*The file was selected*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.54.19-PM.png)
*The import details show the installed version (1.0.0.1) and the version in the update (1.0.0.2)*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.55.11-PM.png)
*The import succeeded*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.55.25-PM.png)
*The development environment lists version 1.0.0.2, still unmanaged*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.56.00-PM.png)
*The solution contains the Todo table, the app and its site map*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.56.32-PM.png)
*The app is still there*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.56.43-PM.png)
*The existing record is untouched*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.57.41-PM.png)
*The form has Notes and Done Date fields. I created a second record*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.57.51-PM.png)
*Both records are listed*

Then I released it the same way: export as managed from development, and import into the second environment.

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.58.26-PM.png)
*To release the update I exported again from dev*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.58.37-PM.png)
*Publish all changes first*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.58.59-PM.png)
*Published*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.59.28-PM.png)
*The same managed-solution dependencies as before*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-1.59.43-PM.png)
*The portal proposed 1.0.0.3. I kept Managed*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.00.39-PM.png)
*Exported*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.00.59-PM.png)
*In the second environment I chose Import solution again*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.01.09-PM.png)
*No file chosen yet*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.01.26-PM.png)
*I picked `TodoSolution_1_0_0_3_managed.zip`*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.02.16-PM.png)
*The details show the installed 1.0.0.1 and the update 1.0.0.3, both Managed*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.04.09-PM.png)
*The second environment lists version 1.0.0.3, Managed Yes*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.04.19-PM.png)
*The app is there*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.04.33-PM.png)
*The record I created earlier in this environment survived the upgrade*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.05.25-PM.png)
*The managed app's form shows Notes and Done Date*

![](assets/images/claudecode13/Screenshot-2026-10-18-at-2.05.36-PM.png)
*Both records are listed*

## How the Skill Works

A Claude Code skill is a Markdown file placed in `~/.claude/skills/<skill-name>/`. When the skill is active, its content is injected into Claude's context whenever a matching task is detected — in this case, whenever someone asks Claude to create a Dataverse solution.

The skill is mostly knowledge: templates, rules, and gotchas that Claude needs to generate valid Dataverse XML. (It also ships two small Python scripts, described below, for comparing the XML with what is in your development environment.) The frontmatter `description` field tells Claude when to invoke it; the body tells Claude exactly how to do the work.

The full `SKILL.md` lives in the [dv-generate repository](https://github.com/Haddley/dv-generate/blob/main/skills/dv-generate/SKILL.md). The bulk of it is XML templates and a list of import errors I ran into while building it — things like the correct element order inside `<entity>`, the right casing for option set labels, and why boolean fields render read-only if you omit `disabled="false"` on the form control.

## From first release to production

The skill generates unmanaged solutions only. I tried generating managed ones, and hand-written managed solutions failed when I re-imported them: the staged upgrade (`ImportAsHolding`) tried to delete system columns and left half-installed `_Upgrade` solutions behind. Microsoft also only supports hand-editing the customizations file of an unmanaged export. So the platform writes the managed package, not Claude:

1. Generate the solution (unmanaged).
2. Import it into a development environment (`pac solution import --path MySolution.zip`, or Import solution in make.powerapps.com) and test it.
3. In the development environment, export it as managed (Solutions, Export, Managed, or `pac solution export --managed`).
4. Import that managed zip into your sandbox, then production. Import the same zip each time rather than rebuilding it.

## Changing a solution after the first release

For an unmanaged solution in dev, a change is a regeneration: edit the saved XML in place, raise the `<Version>`, import it over the existing solution (it overwrites), and test. Keep every GUID the same: a changed GUID on re-import creates a duplicate view instead of updating the original. Then export as managed and import into the sandbox as an upgrade (`pac solution import --path X.zip --stage-and-upgrade`).

I ran 16 change scenarios against two development environments, one unmanaged source and one managed target, to find out what regenerating can and can't do.

**It works for:** adding a column, a choice option, a table, an environment variable or a connection reference, and changing a column label or an environment variable default.

**Removing things is out of scope.** The skill adds and changes components; it does not remove them, and it does not change a column's type. When you ask it to, it says so and leaves the component in the XML. That is deliberate, because removal behaved differently every time I tried it:

- Leaving a column, view, form or choice option out of the XML changes nothing. It stays in dev, and so it stays in the managed export.
- Dataverse will not delete a column while a form or view uses it. In my Todo run the delete failed with "Object dependencies exist", and the blockers were the Information form and the Quick Find Todos view.
- A managed upgrade that drops a table deletes the table and all of its rows in the target, and it fails while an app still references the table.
- A plain update, instead of an upgrade, removes nothing.
- Changing a column's type is rejected on import.

If you need to remove something, do it in the maker portal in dev, then bring the result back into the saved XML.

### Bring manual changes back from dev

Someone may have changed things in dev by hand, and regenerating from a stale copy of the XML could overwrite those edits. `pull.py` exports the unmanaged solution from dev and reports what differs from your saved XML, in both directions:

```bash
python3 ~/.claude/skills/dv-generate/scripts/pull.py --env https://<your-dev-org>.crm.dynamics.com/ --solution MySolution --dir MySolutionDir
```

It compares tables, custom columns, choice options, views, forms, environment variables, connection references and apps, and changes nothing unless you pass `--apply`. With `--apply` it replaces your saved XML with dev's export, which is the platform's XML rather than the skill's templates, so review it with `git diff`. A column you deleted in dev shows up as "in the saved XML, not in dev", which is how a removal gets back into your files.

### What I haven't tested

Choice-option removal: two of the four imports I tried hung until my 15-minute timeout, and the option stayed in dev anyway. The scenarios, fixtures and recorded results are in the repository's `tests/` folder.

## References

- [Dataverse Plugin Is Now on the Claude Marketplace](https://devblogs.microsoft.com/powerplatform/dataverse-plugin-claude-marketplace/)
- [Claude Code (Part 16): Microsoft's official Dataverse plugin](/posts/claudecode16/)
