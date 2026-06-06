---
title: "Claude Cowork (Part 1)"
description: "Using the page-line-summary skill in Claude Cowork to generate a deposition summary from a transcript PDF"
date: "2026-06-04"
categories: ["AI"]
image: "/assets/images/claudecode/Claude_AI_symbol.svg"
tags: "claude-code, ai-agent, anthropic, page-line-summary, legal, litigation"
hidden: false
slug: "claudecowork1"
---

Claude Cowork is the desktop app version of Claude — it works with projects (local folders), skills, and scheduled tasks, without needing the terminal. 

I ran the same `page-line-summary` skill from [Claude Code (Part 14)](/posts/claudecode14/) inside the Claude Cowork app. I uploaded the page-line-summary skill as a zip file through the Claude Cowork UI. 

I didn't need a curl command to install the skill. I attached the deposition transcript with `@`, answered the two context questions, and got back the page line summary.

![](assets/images/claudecowork1/Screenshot-2026-06-05-at-6.19.30-AM.png)
*I right-clicked SKILL.md in the page-line-summary folder and selected Compress to create the zip file*

![](assets/images/claudecowork1/Screenshot-2026-06-05-at-6.19.39-AM.png)
*Finder created SKILL.md.zip in the folder, ready to upload to Cowork*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-6.47.47-PM.png)
*I selected the Homs v. Salvador project (folder) from the Work in a project dropdown*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-6.48.29-PM.png)
*I clicked Allow when Cowork asked for permission to access the project (local folder)*


![](assets/images/claudecowork1/Screenshot-2026-06-04-at-6.49.44-PM.png)
*I clicked the + button to see the options for adding a skill, including Upload a skill*


![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.26.01-PM.png)
*The Upload skill dialog accepts a .md file or .zip containing a SKILL.md. I selected the zip file*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.26.28-PM.png)
*After I uploaded the zip, Cowork confirmed the skill with an "Uploaded page-line-summary" badge*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.26.57-PM.png)
*I opened the skill detail view — it showed the trigger and description*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.27.18-PM.png)
*I typed '/' to select a skill. The skill picker showed page-line-summary with its description as a tooltip. I could have typed /page-line-summary*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.27.34-PM.png)
*I typed '@' to attach a file and the project's transcript appeared in the picker*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.27.45-PM.png)
*I attached the PDF deposition transcript directly to the skill invocation before submitting*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.30.35-PM.png)
*The skill asked which side I represent — I selected Defense*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.31.02-PM.png)
*I entered my case theory in the free-text field: preexisting condition*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.31.44-PM.png)
*The skill started reading the transcript and immediately flagged the key knee limitation admission on p.14*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.32.50-PM.png)
*Reading pages 45–60, the skill flagged the 65% permanent partial disability rating — two years before the accident*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.39.51-PM.png)
*The skill assembled the summary and wrote the output file — 92 pages processed, 30 table entries*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.42.49-PM.png)
*The skill reported its single most significant finding and linked the output document in Google Drive*

![](assets/images/claudecowork1/Screenshot-2026-06-04-at-7.44.11-PM.png)
*The formatted summary opened with the full case caption and page-line table*

## Skill

````MARKDOWN
---
name: page-line-summary
description: Generate a Page-Line Summary from a deposition transcript (PDF, TXT, or DOCX). Produces a formatted Markdown file with case caption, two-column page:line reference table, and litigation-focused analysis. Asks for the attorney's side and case theory before summarizing.
---

# Skill: Page-Line Deposition Summary

Generate a gold-standard Page-Line Summary from a deposition transcript for litigation use.

---

## Trigger & Arguments

Invoked as `/page-line-summary [file-path]`.

If the user provides a file path as an argument, use it. Otherwise, ask for one before proceeding.

---

## Step 1 — Gather Context

Before reading the transcript, collect the following. Ask all in a single message if not already provided:

1. **File path** — if not already given as an argument
2. **Which side do you represent?** — Plaintiff, Defense, or Neutral/Objective
3. **One-line case theory** — e.g., *"Defendant failed to warn of known product defects, causing plaintiff's injuries"* (skip if Neutral)

---

## Step 2 — Read the Transcript

Determine the file type from the extension:

**PDF (`.pdf`)**
Use the Read tool. For files over 10 pages, read in 20-page chunks (`pages: "1-20"`, `"21-40"`, etc.) until the full transcript is processed. Accumulate all content before summarizing.

**Plain text (`.txt`)**
Use the Read tool directly.

**Word document (`.docx`)**
Run this Bash command to extract plain text on macOS:
```bash
textutil -convert txt -stdout "[file-path]"
```
If `textutil` is unavailable, try:
```bash
pandoc "[file-path]" -t plain
```

---

## Step 3 — Parse & Identify Structure

After reading, identify:

- **Page/line markers** — most transcripts use a page number at the top and line numbers 1–25 down the left margin. Look for patterns like `Page 25`, standalone integers at line starts, or `25:14` inline references.
- **Caption block** — typically the first 3–5 pages: case name, case number, court, date, deponent name, attorneys present.
- **Examination sections** — `DIRECT EXAMINATION BY`, `CROSS EXAMINATION BY`, `REDIRECT EXAMINATION`, `RECROSS`, etc.

If the transcript lacks explicit page/line numbers, use the best available reference (e.g., document page numbers only) and note this in the summary header.

---

## Step 4 — Extract Caption Information

From the opening pages, extract:

- Case Name (e.g., *Smith v. Acme Corp.*)
- Case Number
- Court / Jurisdiction
- Deponent Full Name and Title / Role
- Date of Deposition
- Location
- Examining Attorney(s) — name, firm, and side
- Defending Attorney(s) — name, firm, and side

If any field is absent from the transcript, mark it `[Not stated in transcript]`.

### Redacted transcripts — reconstruct names from the word index

Many transcripts have party names blacked out in the body (common in published sample transcripts) while the **court reporter's word index** at the end remains unredacted. The index lists every word alphabetically with its page:line citations. Use it to recover names:

1. **Read the index pages** (typically the last 5–10 pages of the PDF).
2. **Identify known structural anchors** — fixed page:line positions where names must appear:
   - Caption plaintiff line (e.g., p.1:4–5 in most Maryland transcripts)
   - Caption defendant line (e.g., p.1:7–8)
   - Court reporter certification (last substantive page — names are rarely redacted here)
   - Counsel's introduction of themselves or their client (e.g., p.4:13–14)
3. **Cross-reference** — any index entry whose page:line citations match an anchor position is a party or attorney name.
4. **Validate gender/role** — confirm the reconstructed name is consistent with how the transcript refers to the person (she/he, plaintiff/defendant).
5. **Note the source** — add `*(name reconstructed from court reporter word index, p. XX — verify against unredacted caption)*` beside any name recovered this way.

---

## Step 5 — Generate the Page-Line Table

### Compression target

Aim for **1 page of summary per 5–10 pages of transcript**. For a 100-page transcript, produce roughly 10–20 substantive table rows — not 100. Be selective and high-yield.

### Priority order for inclusion

1. **Admissions** — any concession harmful to the witness's own side
2. **Key liability facts** — what happened, when, who was responsible
3. **Inconsistencies** — conflicts with prior testimony, pleadings, documents, or other witnesses
4. **Damages** — physical, financial, emotional harm; causation and extent
5. **Credibility factors** — bias, motive, relationship to parties, prior bad acts
6. **Expert opinions** (expert witnesses only) — qualifications, methodology, opinions, limitations conceded
7. **Exhibit references** — exhibits introduced; witness's admission, denial, or reaction
8. **Case-theory facts** — anything that directly supports or damages the stated case theory

### What to omit

- Routine swearing-in and stipulations
- Extended background and biography (unless the witness is an expert or credentials are disputed)
- Repetitive questions covering the same ground as a prior entry
- Pure procedural objections with no substantive outcome

### Table format

```markdown
| Page:Line | Summary |
|-----------|---------|
| 1:1–3:25  | Caption, appearances, oath administered. |
| 5:14–18   | Witness confirms employment as plant manager at Acme Corp., 2018–2023. |
| 12:4–13:2 | **[ADMISSION]** Witness received the March 3, 2021 safety inspection report and did not forward it to engineering. |
```

### Inline tags — use sparingly, only when clearly earned

| Tag | When to use |
|-----|-------------|
| `**[ADMISSION]**` | Damaging concession by the witness |
| `**[INCONSISTENCY]**` | Conflicts with prior statement, pleading, or document |
| `**[DAMAGES]**` | Relates to harm, causation, or quantification |
| `**[KEY FACT]**` | Central liability or chronology fact |
| `**[EXHIBIT]**` | Exhibit introduced or referenced |
| `**[EXPERT OPINION]**` | Expert witness opinion or methodology |

Do not tag routine testimony. Over-tagging dilutes the signal for the reviewing attorney.

---

## Step 6 — Assemble the Output Document

Build the full Markdown document in this order:

```markdown
# Deposition Summary — [Deponent Last Name]

**Case:** [Case Name]
**Case No.:** [Case Number]
**Court:** [Court / Jurisdiction]
**Deponent:** [Full Name], [Title / Role]
**Date of Deposition:** [Date]
**Location:** [Location]

**Plaintiff's Counsel:** [Name, Firm]
**Defense Counsel:** [Name, Firm]

**Represented Side:** [Plaintiff / Defense / Neutral]
**Case Theory:** [User's stated theory, or "Neutral — no theory provided"]

**Summarized by:** Claude (AI-assisted — attorney review required)
**Summary Date:** [Today's date: YYYY-MM-DD]

---

## Examination Index

| Section | Examining Attorney | Pages |
|---------|--------------------|-------|
| Direct  | [Name, Side]       | X–Y   |
| Cross   | [Name, Side]       | X–Y   |

---

## Page-Line Summary

| Page:Line | Summary |
|-----------|---------|
| ...       | ...     |

---

## Key Takeaways

3–5 bullet points identifying the most strategically significant facts from the standpoint of the represented side (or neutral observations if no side was given). Lead with the single most important finding.

---

*AI-generated preliminary summary. Independent attorney review required for accuracy, completeness, and privilege. Do not rely on this summary without verification against the original transcript.*
```

---

## Step 7 — Save the File

1. Determine output path: save in the same directory as the input transcript.
2. File name: `[DeponentLastName]_depo_summary_[YYYY-MM-DD].md` using today's date.
3. Use the Write tool to create the file.

Report to the user:
- Full output file path
- Total transcript pages processed
- Number of table entries in the summary
- One sentence identifying the single most significant finding

---

## Edge Cases

**No page/line numbers in transcript**
Add this note beneath the summary header: *"Transcript lacks explicit page/line numbering. References below are approximate page numbers based on document pagination."* Use `p.12` style references instead of `12:4`.

**Very short transcript (under 20 pages)**
Summarize more thoroughly — the 1:5–10 ratio is a ceiling, not a floor. Capture all substantively meaningful exchanges.

**Very long transcript (200+ pages)**
Read in chunks using the Read tool's `pages` parameter. Keep a running list of key entries as you go. Do not stop early — process the full transcript before writing the summary.

**Multiple deponents in one file**
Ask the user whether to summarize all deponents or a specific one. If all, create a separate `## [Deponent Name]` section with its own table and takeaways.

**Confidential or sealed transcript**
The transcript stays local — no data is sent to external services beyond Claude's inference. If the transcript bears a confidentiality designation, note it in the summary footer: *"Transcript marked [CONFIDENTIAL / ATTORNEYS' EYES ONLY]. Handle accordingly."*
````

## References

- [Legal AI Is Growing Up. Chatbots Were Just the Awkward Phase.](https://www.youtube.com/watch?v=QeIqRnOhs9E&t=1768s)


