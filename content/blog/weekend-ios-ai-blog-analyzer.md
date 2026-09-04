+++
title = "Weekend Hack: Letting Ollama Sift 1,000 iOS Blogs for AI Gems"
date = 2025-12-07T12:00:00+00:00
draft = false
tags = ["AI", "iOS", "automation", "ollama", "copilot"]
description = "A quick script that scans Dave Verwer's iOS blog directory with a local LLM to surface AI posts from the last few months."
+++

<img src="/images/blog/blogs-ai-fetcher/hero.png" alt="Hero Image" class="img-hero" />

Over the last year I’ve had the itch to build again. AI has made it easier to ship small things and use each one to push a longer plan forward: move from mobile expert, through mobile and AI, towards understanding **AI as a product**, not only the models.

## The long game

I want to learn how people are actually using AI in mobile development. This weekend’s question was simple: who is writing about it in the iOS world?

Dave Verwer’s [iOS Dev Directory](https://iosdevdirectory.com) contains roughly 1,000 blogs, alongside his [iOS Dev Weekly](https://iosdevweekly.com) newsletter and [iOS Dev Jobs](https://iosdevjobs.com). That is too much to skim by hand and a good excuse for a weekend automation project.

## The tiny tool

I built a small CLI tool that pulls Dave’s blog list, fetches recent posts, and uses a local Ollama model to classify whether each post is actually about AI in a way that matters for iOS developers.

- Repo: [gscalzo/iOS.Blogs.Analyzer](https://github.com/gscalzo/iOS.Blogs.Analyzer)
- Params: `--months 3` (lookback window), `--max-blogs 200` (how many blogs), `--parallel 8` (threads), plus a `--model` flag to choose the Ollama model.
- Model: local `ollama` classifies each post as “AI-related?” It is fast enough, private and good enough for this job.
- Output: a trimmed list I can drop straight into my Obsidian vault.

<img src="/images/blog/blogs-ai-fetcher/terminal.png" alt="Terminal Image" class="img-frame" />

## How it works under the hood

The architecture is deliberately boring: a small CLI that takes the parameters, pulls a list of sites from Dave’s directory export, and then runs a simple pipeline.

- Fetch: for each site (up to `--max-blogs`), download the RSS/Atom feed.
- Filter: keep only posts from the last `--months` months.
- Classify: send the title and a short excerpt to a local Ollama model with a tiny prompt: “Is this actually about AI, in a way that matters for an iOS developer?”
- Concurrency: process feeds in parallel (bounded by `--parallel`) so I’m not accidentally DDoS‑ing Dave’s list.
- Persist: write out a JSON/Markdown file with URLs, titles, and tags that Obsidian can pick up.

Most of the pieces came together through Copilot and Codex‑CLI suggestions: I described the pipeline, they sketched out the HTTP calls, concurrency, and file handling, and I iterated until the structure matched what I had in mind.

## Why it felt magical

Saturday evening I was at the kitchen table, half keeping an eye on the oven timer, half watching logs scroll by. Copilot and Codex‑CLI handled most of the boring wiring; I mostly nudged, corrected, and decided what the tool should actually do. A year ago this would have been a “maybe next month” project. Now it comfortably fits between checking the roast and arguing about where the lights should go on the tree.

<img src="/images/blog/blogs-ai-fetcher/obsidian.png" alt="Obsidian Image" class="img-frame" />

## What’s next

- Swap models to compare local vs hosted.
- Add a “spice level” score: AI‑adjacent, AI‑heavy, AI‑marketing.
- Generate short summaries for each AI‑related post so I can scan themes quickly before deciding what deserves a deep read.

For now, I have a small map of AI conversations in the iOS community. The tool is also one more project on my route from mobile development towards AI product work.
