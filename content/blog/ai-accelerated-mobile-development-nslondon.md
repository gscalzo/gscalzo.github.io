+++
title = "AI-Accelerated Mobile Development: Lessons from My NSLondon Talk"
date = 2026-09-04T20:00:00+01:00
draft = false
tags = ["AI engineering", "agentic coding", "NSLondon", "Swift", "engineering leadership"]
description = "Giordano Scalzo's NSLondon talk: two app-building demos, a missing entitlement, and practical lessons on planning, testing and leading work with coding agents."
+++

The QR-code app worked. Text went in, a QR code came out. Then I tried to save it.

There was the bug. A missing macOS sandbox entitlement, waiting patiently behind the button I had not clicked yet.

That moment from my [NSLondon talk at Google London on 26 November 2025](https://www.meetup.com/nslondon/events/311356134/) is a useful summary of AI-assisted development. You can get to something convincing very quickly. You still have to find out whether it works.

The recording is below. It captures the tools and my workflow as they were in November 2025. This is a look back at the lessons from those demos, rather than a guide to the latest versions.

{{< youtube QqHiv3suI6E >}}

## From writing code to directing work

I opened with the progression from autocomplete to chat assistants, coding agents, and orchestrating several agents. As the tools take on more implementation, the developer spends more time explaining the goal, setting boundaries, and checking the result.

That feels familiar if you have led a team. You cannot personally type every line of code. You need people to understand the requirements, agree on what good looks like, and make their work reviewable.

An agent needs those things too. It will happily start implementing before you have finished deciding what you want. Enthusiasm has never been our industry's scarcest resource.

## An agent is a loop with tools

Before the demos, I spent a few minutes on what a coding agent actually does. A model receives instructions and context. It requests a tool call, such as reading a file or running a command. The application executes that call and sends the result back. The process repeats.

Understanding that loop makes the behaviour less mysterious. The agent can only act through the tools it has. Its decisions depend on the information available in its context.

For a small, inspectable example, I built [Nimbo, a coding agent in Swift](/blog/demystifying-ai-coding-agents-in-swift/). Listing files, reading them, and making edits is enough to start experimenting. It is an educational project, with plenty left to do before anything resembling a production agent.

## Demo one: a macOS QR-code generator

I wanted a small app with text input, QR-code generation, export, and a history of previous codes. I used Copilot for the demo because I wanted to bring what I learned back into the tooling we used at work.

The preparation mattered. I started with an Xcode project rather than asking the agent to assemble everything from an empty directory. Then I asked it to draft repository instructions: how to build, how to run tests, and what standards to follow.

That draft needed reviewing. Generated instructions are another piece of work to check, especially when the agent has been generous with the word count.

Next came a plan. I asked for clarification questions before implementation, including questions about the QR-code output and history. Getting those decisions out of my head gave the agent something more useful than “make me a nice app”.

The first implementation generated codes successfully. Saving exposed the missing entitlement. I fed back a screenshot and a suggestion about the sandbox, and the agent corrected it.

The lesson is mundane and important: exercise the actual user journey. A successful build and a plausible screen do not prove that exporting a file works.

## Give the agent useful context

The talk also covered keeping build output manageable. Full Xcode logs can consume a lot of context while providing little useful information about a particular failure.

I showed a workflow that condensed build results and kept errors and warnings available. The broader principle is to give the agent enough evidence to diagnose the problem without burying it in unrelated output. When a summary is insufficient, inspect the underlying logs.

Repository instructions help with the same problem. Record the build commands and project conventions where the next session can find them. Keep them accurate as the project changes.

## Demo two: splitting the bill with several agents

For the larger example, I used a bill-splitting app as a familiar exercise. Add participants, read a receipt, assign items, calculate each person's share, and save the event.

I had built versions of this idea before, which made it useful for exploring a new tool. In this experiment, I used Antigravity and divided the work into stages.

First came repository instructions. Then the app itself, using mocked receipt recognition. While that work progressed, another agent proposed icons and a splash screen. Once the mocked flow worked, I separated the real receipt integration from smaller layout changes.

Some tasks ran in parallel; others depended on earlier work. The useful part was deciding which was which. Mocking the receipt recognition let me test the rest of the app before connecting the external service.

In the talk, I compared roughly an hour on that prototype with longer efforts on earlier versions. That was a personal observation, not a controlled benchmark. I knew the problem better each time, the tools changed, and the implementations were different. It would be a poor basis for promising anyone a productivity multiplier.

A demo also leaves production work unfinished. For example, any prototype shortcut involving an API key in a client app needs replacing with an appropriate secure integration before release.

## What this means for engineering teams

The demos made me more interested in the skills around implementation: explaining requirements, choosing sensible boundaries, testing behaviour, and recognising when a result needs investigation.

Those are skills we need to help engineers develop. An agent can produce a lot of code before someone has had time to understand the decisions inside it. Giving that engineer more output does not automatically give them more judgement.

That question has become central to my current work on [Fix the Ladder](https://leanpub.com/fixtheladder), about growing junior engineers in the age of AI. I want teams to benefit from these tools while making time to learn how their software works.

For a later experiment with considerably more production friction, I wrote about [building and shipping Neurona](/blog/neurona-from-ai-prototype-to-real-app/). The weekend prototype was the beginning of that story.

Thanks to Peter Friese for hosting and to the NSLondon organisers. This community welcomed me when I first moved to London, and it was a pleasure to come back with a few experiments and a save button that needed attention.

[Watch the full NSLondon recording on YouTube](https://www.youtube.com/watch?v=QqHiv3suI6E).
