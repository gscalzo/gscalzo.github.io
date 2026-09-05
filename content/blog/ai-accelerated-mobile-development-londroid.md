+++
title = "AI-Accelerated Mobile Development at Londroid"
date = 2025-06-05T19:00:00+01:00
draft = false
tags = ["londroid", "mobile-dev", "AI-workflows"]
description = "Highlights from my May 2025 Londroid talk on AI-assisted Android development and the guardrails that keep it resilient."
+++

{{< youtube ZjuPGTcUrnc >}}

## The talk

At [Londroid at NewDay on 29 May 2025](https://www.meetup.com/android/events/307541693/), I spoke to Android developers about using AI in solo and small-team workflows. I opened with a question: _what if a one-person team could deliver like a studio?_ The rest of the talk looked at what changes when AI becomes part of the build chain instead of an IDE novelty.

## Four modes of AI assistance

I split AI assistance into four modes that teams can adopt one at a time:

- **Autosuggest**: IDE completions that shave seconds, but compound across a day.
- **Pair programmer**: chat-style copilots that refactor, document, and explain as you code.
- **Task router**: agents that juggle backlog items, draft pull requests, and surface blockers.
- **Autonomous delivery**: full-ticket execution where AI proposes code, tests, and rollout notes, leaving humans to review and merge.

There is no need to jump straight to autonomous agents. Each mode becomes more useful once prompts, review checklists, and acceptance criteria stop being improvised.

## Model Context Protocol

I introduced Model Context Protocol (MCP) as the "USB-C for AI integrations." It gives models a common way to discover tools and context. Instead of wiring every AI tool separately to every service, a team can maintain and audit one MCP integration.

## The live demo sprint

In 20 minutes, we:

- Revived an aging Android XML template and migrated the UI to Jetpack Compose.
- Added camera-powered receipt capture with on-device fallback, leaning on Jetpack libraries where they shine.
- Prompted GPT to parse receipt data into structured expenses, piping the output back into Compose in real time.

The workflow ran through the AI toolchain, including the points where a person had to review the result or correct a response.

## Guardrails that keep velocity sustainable

Speed only helps if the result still holds up. I use four guardrails:

- Set non-negotiable architecture boundaries (modules, navigation, DI graph) that agents cannot mutate.
- Require automated linting and formatters before accepting AI-generated diffs.
- Review every change with a "three questions" checklist: _What changed? Why now? How do we revert?_
- Track metrics on response drift and hallucinated APIs so we can tune prompts or swap providers.

Android teams still have to ship across phones, wearables, cars, and other form factors. Used carefully, AI shortens the route from an idea to an implementation. It can make an evening build session useful for a solo developer and help a team run work in parallel without asking engineers to absorb every extra task.

## Watch the session

The full recording includes every prompt, tool, and trade-off I covered on stage.

[Watch the talk on YouTube](https://youtu.be/ZjuPGTcUrnc).
