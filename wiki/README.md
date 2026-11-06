# Blog wiki

A derived, checkable layer over the posts in `content/`. The blog agent reads it to reason across posts (series order, what builds on what, what I concluded), and falls back to the post text for exact numbers and code. Posts stay the authority: a wiki page is never cited as a source.

## Layout

```
wiki/
  README.md          this file
  index.md           one line per page
  posts/<slug>.md    one page per visible post
scripts/wiki-audit.mjs   checks every quote against the post
```

Hidden posts (`hidden: true` or `visible: false`) get no page.

## Page format

```markdown
---
type: post
slug: attiny1                 # same as the file name and the post's slug
title: "ATtiny85 (Part 1)"    # the post's title, with "(Part N)" for a series
date: "2026-10-06"            # the post's date
series: ATtiny85              # optional
part: 1                       # optional
builds_on: [claudecode15]     # slugs of posts this one continues or depends on
topics: [attiny85, avrdude]   # concepts the post teaches, lowercase and hyphenated
tools: [Claude Code, Tinkercad]
status: current               # current | partly-outdated | superseded
checked: "2026-11-06"         # when the claims were last audited
---

**Summary.** Two or three sentences, in my words.

## What I did
Short bullets, in order.

## Claims
- A claim a reader might ask about, stated plainly.
  > "a verbatim span from the post"

## Outcome
What I concluded or built.

## Caveats
What the post does not show, and anything that has changed since it was written.
```

## Rules

1. Every line under **Claims** starts with `- ` and is followed by a quote line `> "..."`. The quote must be a word-for-word span of the post body. Whitespace, curly quotes and `*`, `_` and backticks are ignored when comparing.
2. Use `status` to say when a post has gone out of date, and say how in **Caveats**.
3. Numbers and code are quoted, never paraphrased.
4. `builds_on` lists real post slugs only.
5. Run `node scripts/wiki-audit.mjs` after editing any page. It exits 1 on failures.
