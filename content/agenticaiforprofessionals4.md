---
title: "Agentic AI for Professionals"
part: 4
description: "Building a Brief Builder feature into nsw-legal-research-assistant, inspired by Thomson Reuters CoCounsel Legal's newly announced Brief Builder — intake, candid argument proposals, live NSW Caselaw search, citation-following from one judgment into a second, and a real downloaded .docx with a native Table of Contents"
date: "2026-08-26"
categories: ["AI"]
image: "/assets/images/agenticaiforprofessionals4/01-brief-builder-home.png"
tags: "brief-builder, citation-following, docx-export, legal-tech, playwright, nsw-caselaw"
hidden: false
slug: "agenticaiforprofessionals4"
---

[Part 1](/posts/agenticaiforprofessionals1/) covered the research and the plan; [Part 2](/posts/agenticaiforprofessionals2/) covered the RAG core; [Part 3](/posts/agenticaiforprofessionals3/) ran the app live against Thomson Reuters' own "Search a Database" and "Review Documents" demo. This post is a new feature entirely: **Brief Builder**, inspired by the newly announced Brief Builder feature in Thomson Reuters CoCounsel Legal — take a pleading in, propose candid arguments, develop each one against real authority, and produce a properly formatted motion, including a real `.docx` download.

The walkthrough below follows one real research thread end to end inside `nsw-legal-research-assistant`: search NSW Caselaw for one case, read that case's own judgment text closely enough to spot a second case it cites, follow that citation, fetch the second case too, and watch an argument that had honestly come back with no supporting authority turn into one backed by three real, correctly cited judgments.

## The case

Dominic Reyes bought a new Caldwell Trailmaster GX SUV for $58,240. It went back to the dealer thirteen times in sixteen months for the same two recurring faults — an instrument cluster fault and a front suspension noise — neither of which the dealer ever permanently fixed. The plaintiff's motion seeks summary judgment under UCPR r 13.1 on the theory that the defendants' own, undisputed service records already establish a major failure under the Australian Consumer Law as a matter of law. The case is fictional — a real decision's fact pattern with every identifying detail changed — built the same way as the fixture pair used in [Part 3](/posts/agenticaiforprofessionals3/).

![](assets/images/agenticaiforprofessionals4/01-brief-builder-home.png)
*Reyes v Caldwell Motors already open at the Draft stage, the finished state of the walkthrough below*

## Beat 1 — Intake: upload, case theory, and a generated summary

Uploading the statement of claim directly produces a rename-suggestion box, then a real generated Intake Summary. The caption, key facts, and attorney notes are all pulled from the uploaded pleading, including a verbatim quote:

> The vehicle exhibited two persistent, recurring defects: an intermittent instrument cluster fault and a persistent knocking noise from the front suspension. **Quote**: "From on or about April 2024 to August 2025, the Vehicle exhibited two persistent, recurring defects that the Second Defendant repeatedly attempted and failed to permanently resolve:"

![](assets/images/agenticaiforprofessionals4/04-intake-summary.png)
*Full generated Intake Summary — caption, key facts with a verbatim source quote, attorney notes*

``` CASE THEORY
We act for the plaintiff, Dominic Reyes. He bought a new Caldwell Trailmaster GX SUV for $58,240 and it has been back to the dealer 13 times in 16 months for the same two recurring faults -- an instrument cluster fault and a front suspension noise -- neither of which the dealer has ever permanently fixed, despite repeatedly claiming each repair resolved it. The defendants' own service records prove this history; they are not disputed. The defendants' defence is that the faults are minor and cosmetic, but their own records describe the same functional faults being reworked over and over, not a cosmetic complaint. Our theory is that this is a textbook major failure under the Australian Consumer Law -- a pattern of recurring, unresolved defects, not one catastrophic failure -- and that because the repair history is common ground, there is no genuine factual dispute left to try. 

Strategic objective: get judgment for the full refund plus consequential loss without the cost and delay of a hearing.
```

The quote field is verified as an exact substring of the source chunk before it is ever shown. A close-but-wrong quote gets dropped rather than displayed — the same non-negotiable citation-grounding rule from [Part 2](/posts/agenticaiforprofessionals2/) applied to a pleading instead of a case database.

## Beat 2 — Argue: candid, ranked arguments

From the case theory, the app proposes five arguments and ranks them, with three selected:

1. The plaintiff's claim is a clear example of a major failure under the Australian Consumer Law — *selected*
2. The defendants' own records demonstrate a failure to provide a repair service — *selected*
3. A major failure under the ACL can be constituted by a single defect or by several defects taken together — *selected*
4. The defendants' defence is inconsistent with their own records
5. There is no genuine dispute as to the repair history

![](assets/images/agenticaiforprofessionals4/05-argue-proposals.png)
*Argue tab: three of five arguments selected*

Argument 3's heading is not generic phrasing — it states the exact legal test one specific authority sets out, because that is what it ends up resting on entirely once Beat 4 below finds that authority.

![](assets/images/agenticaiforprofessionals4/06-argue-argument1-expanded.png)
*Argument 1 expanded*

## Beat 3 — Develop: search NSW Caselaw, fetch a real case

The Develop tab starts honestly empty for a fresh brief, then searches NSW Caselaw directly — no login, no browser automation for this source, a live lookup against the official government portal. Searching "McNally Central Coast Automotive Gosford Nissan" returns a real top hit:

> McNally v Central Coast Automotive Pty Ltd t/as Gosford Nissan [2025] NSWCATCD 111

![](assets/images/agenticaiforprofessionals4/08-search-mcnally.png)
*NSW Caselaw search results for McNally, real top hit*

Clicking **Fetch & ingest** pulls the live judgment into this brief's own authority database.

## Beat 4 — Follow the citation: from McNally to Safi

This is the beat worth watching closely. Opening McNally's own judgment text, paragraph 42 names and quotes a second case directly:

> In *Safi v Heartland Motors Pty Ltd t/as Heartland Chrysler* [2016] NSWCATAP 80 ("Safi") the Appeal Panel of NCAT set out a helpful summary of the approach and principles to be applied in the construction of section 260.

...and, quoting Safi directly at paragraph 101:

> A major failure may be constituted by one defect or a series of specific or individual defects which, when taken as a whole, constitute a major failure.

![](assets/images/agenticaiforprofessionals4/09-mcnally-cites-safi.png)
*McNally's own judgment text, paragraph 42, naming and quoting Safi*

That is a citation worth following. Reyes has two separate recurring defects — instrument cluster, suspension — so a case squarely holding that several defects taken together can constitute a major failure is directly useful, more useful for this specific point than anything the initial search turned up by name. Searching NSW Caselaw again for Safi returns it as the real top hit, with Crooks and McNally itself visible further down the same results:

![](assets/images/agenticaiforprofessionals4/10-search-safi.png)
*NSW Caselaw search results for Safi*

**Fetch & ingest** adds Safi to the brief's authority database too — found only because someone actually read what McNally cited, not because it turned up in the first search.

## Beat 5 — From "no supporting authority" to three real citations

Before Safi was fetched, argument 3 had nothing to stand on. After, clicking **Redevelop** produces real, grounded output:

> The plaintiff's claim that the supply of the motor vehicle constitutes a major failure under the ACL is supported by the definition of a major failure in section 260 of the ACL... In the case of [2025] NSWCATCD 111, the court considered the issue of whether a single defect or a series of defects can constitute a major failure under the ACL. The court held that a major failure under the ACL can be constituted by a single defect or by several defects taken together, as stated in [22]...

Fifteen authority citations resolve across all three real cases found this way — McNally ([2025] NSWCATCD 111), Safi ([2016] NSWCATAP 80), and Crooks v Hyundai Motor Company Australia Pty Ltd ([2023] NSWCATCD 29), which turned up in the same Safi search and is itself cited inside McNally's own text too.

![](assets/images/agenticaiforprofessionals4/11-develop-argument3-grounded.png)
*Argument 3's full grounded reasoning and fifteen real Authorities citations*

The important part is not that this argument became better-dressed weak evidence. It went from a real, honest "nothing found" to a real, correctly cited "grounded" purely because a person read one judgment's own reasoning closely enough to notice what it leaned on — and the app made following that thread exactly as fast as running the first search.

For contrast, argument 2 stays honestly ungrounded on this same authority pool. The app does not force a citation where none of the research actually fits:

> No supporting authority found in your authority database for this argument.
>
> Unverified suggestions worth searching for manually (not citations — go find and upload if relevant): *Australian Competition and Consumer Commission v Baxter Healthcare Pty Ltd [2007] NSWCA 354*, *Consumer, Trader and Tenancy Tribunal Act 2001 (NSW) s 42*, ...

![](assets/images/agenticaiforprofessionals4/12-develop-argument2-ungrounded.png)
*Argument 2 honestly ungrounded, with labelled unverified suggestions*

Both outcomes are the same honest bridge doing its job. One just happened to have a findable answer, once someone followed the thread.

## Beat 6 — Draft: the final motion, and a real download

The generated draft includes the caption, a Table of Contents, all three developed arguments' reasoning in full, and a Table of Authorities built from the same three real citations:

```
## Table of Authorities

- [2016] NSWCATAP 80
- [2023] NSWCATCD 29
- [2025] NSWCATCD 111
```

![](assets/images/agenticaiforprofessionals4/13-draft-final.png)
*Draft tab: full rendered motion, Table of Authorities*

Every one of those three citations is a case this walkthrough found live — one by name search, two more by actually reading what the first one cited.

![](assets/images/agenticaiforprofessionals4/14-docx-download.png)
*Draft tab immediately after clicking "Download as .docx"*

Clicking **Download as .docx** produces a valid Office Open XML file — confirmed by unzipping it, `word/document.xml` present and well-formed, containing the same real text as the Markdown preview, including the correct Table of Authorities. Opening the [downloaded file](/assets/images/agenticaiforprofessionals4/Reyes-v-Caldwell-Motors.docx) in Word shows a native, working Table of Contents rather than a flat text imitation of one, the same three arguments and Table of Authorities as the Markdown preview, and page numbers.

![](assets/images/agenticaiforprofessionals4/15-docx-opened.png)
*The downloaded .docx opened in Microsoft Word — native Table of Contents, real formatting*

## The complete arc

Search NSW Caselaw, fetch a real case, read what it cites, follow that citation, fetch the second case too, redevelop, and watch an honestly "nothing found" argument turn into one backed by three correctly cited real judgments — then download a real `.docx` and open it as a real, properly formatted document. Every step above is real output from the live app, not staged copy. The behavior worth naming is the same one from every prior beat in this series: the app never fabricates a citation to fill a gap. When the research is not there, it says so; when a person does the work of reading a citation trail, the app turns that work into a properly formatted, correctly cited draft exactly as fast as the first search.
