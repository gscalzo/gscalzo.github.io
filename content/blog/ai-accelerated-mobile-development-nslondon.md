+++
title = "What I still had to do when AI built the app"
date = 2026-09-04T20:00:00+01:00
draft = false
tags = ["AI engineering", "agentic coding", "NSLondon", "Swift", "engineering leadership"]
description = "Two experiments from my NSLondon talk: what I still had to explain, coordinate, and check when coding agents built the apps."
+++

“Yeah, yeah, it works. Now save it. Oops.”

That was me trying the QR-code app in my NSLondon demo. It generated codes from text and links, so I was pleased with it. Then I tried to save one and found a bug.

I could copy the stack trace, or even better, take a screenshot because I'm lazy. I gave the agent the screenshot and suggested checking the sandbox. It found a missing entitlement, corrected it, and saving worked too.

The fix was quick once I'd found the problem. Finding it still depended on me trying the app, even though the agent had already implemented it and run tests. That became a useful example of what my job looked like in the two experiments I showed at [NSLondon in November 2025](https://www.youtube.com/watch?v=QqHiv3suI6E): explaining what I wanted, helping when something went wrong, and deciding whether the result worked.

## Give it a job it can understand

The QR-code app started because I wanted nicer codes for my talks. Most of the online generators I found wanted me to pay or had a watermark. Then I remembered: I'm a vibe coder. Or even better, an AI-accelerated developer. I could make a small app for this, and use the experiment to learn something I could take back to work.

That's why I chose Copilot, the tool we could use at NewDay. I wanted a text field, QR-code generation, export, and a history. Before asking it to implement those features, I created the project in Xcode. I'd made the mistake of starting from an empty directory several times before. The agent can assemble a project, but it spends time and context doing something Xcode can already do for you.

With the project ready, I asked it to write the repository instructions, including how to build and run the tests. I wanted tests run before and after changes because I'd already seen agents fix something and then announce that other tests were broken, but unrelated to their change. Excuse me? I can't even do a performance review.

I reviewed the instructions, then asked for a plan and clarification questions. The agent wanted to know about QR-code size, quality, and history. Answering those questions made me decide what I actually wanted before it started writing code. It felt much like explaining a task to someone new in my team: give them the requirements and agree on how we'll check the work.

That preparation got me a working first version, including UI tests. It also got me the broken Save button from the opening. I was happy with how much the agent had done, but I still needed to use the app to find out what we'd missed.

## Now try it with several agents

For the second experiment, I wanted something with more parts: an app for friends splitting a restaurant bill. It needed to read a receipt, let people assign its items, and calculate what each person owed. That gave me separate pieces of work I could hand to different agents.

I knew the problem well. A bill splitter was the first app I'd been paid to fix or implement, fifteen years earlier. I found it in an old email; I think it was for the iPhone 4. These days I use it as a sort of kata to try new tools. I'd built versions for Londroid and an internal workshop, so when Antigravity came out I had another excuse to build it. I spent my weekend with it. My wife was super happy.

I used five agents, starting with one to write the repository instructions. After that, an agent built the app with mocked receipt recognition while another proposed icons and a splash screen. The mock mattered because it let me try adding participants and assigning items before connecting the real receipt service.

Once that flow worked, I could start the OpenAI integration and the layout tweaks as separate jobs. Some work could happen at the same time, while other work needed something finished first. Deciding that order was my responsibility, just as explaining the QR-code requirements had been.

This prototype took around an hour, with minor layout problems and tweaks. Earlier versions had taken me around a day, so I was kind of impressed. Of course it's anecdotal. The versions and tools were different, and I'd been practising this particular problem for fifteen years.

## The part I still have to learn

Both experiments made me want to use agents more. They also made the work around coding much more obvious to me. With the QR-code app, I had to settle the requirements and investigate a failure. With the bill splitter, I also had to divide the work so the agents could make progress without waiting unnecessarily on each other.

That's familiar work if you've led a team. As a team grows, you can't personally write or follow every line of code. You rely on clear tasks, tests, and ways of checking that the pieces work together. I'm finding I need those same habits when I work with agents, even on a small app of my own.

So when I try the next tool, I'll use the bill splitter again. I'll look at how much explaining and checking it needs, as well as how quickly it produces code. Getting an app built in an hour is exciting. Understanding what I've got at the end is what lets me do something useful with it.
