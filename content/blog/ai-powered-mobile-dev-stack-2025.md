+++
title = "My AI-Powered Mobile Development Stack in 2025"
date = 2025-09-10T10:30:00+01:00
draft = true
tags = ["workflow", "mobile-dev", "AI-stack", "productivity"]
description = "Here's my complete AI-assisted mobile development workflow: Cursor + Claude + Cline + local LLMs. Plus the productivity metrics that justify it."
+++

## The Complete Picture

People keep asking: "What AI tools are you actually using?"

Fair question. The landscape is overwhelming.

Here's my complete stack, how the pieces fit together, and the numbers that prove it's worth it.

## The Core: Cursor IDE

**What it is:** AI-native code editor (built on VSCode)

**Why I use it:**
- Claude Sonnet 4.5 integration
- GPT-5 as backup
- Composer mode for multi-file changes
- Just works with React Native/Swift

**Monthly cost:** £16 (Pro tier)

**Daily usage:** Whenever I'm coding (evenings, weekends, lunch breaks)

This is my main workspace. Everything else builds around it.

## The Smart Assistant: Claude Sonnet 4.5

**What it is:** Anthropic's flagship model

**Why I use it:**
- Most reliable for code generation
- Best at refactoring
- Excellent TypeScript understanding
- Fast responses

**Monthly cost:** ~£24 in API calls

**Use cases:**
- Component generation
- Refactoring existing code
- Code reviews
- Bug fixes

**Typical session:** 50-100 interactions/day

## The Architect: GPT-5

**What it is:** OpenAI's latest reasoning model

**Why I use it:**
- Best for complex decisions
- Explains tradeoffs clearly
- Good at novel problems
- Massive context window

**Monthly cost:** ~£20 in API calls

**Use cases:**
- Architecture planning
- Complex state management
- Learning new patterns
- Design discussions

**Typical session:** 10-20 interactions/day

I use GPT-5 less frequently, but for higher-stakes decisions.

## The Free Agent: Cline

**What it is:** Open-source agentic AI for VSCode

**Why I use it:**
- Free and open source
- Works with any model
- Human-in-the-loop safety
- Good for experimental tasks

**Monthly cost:** £0 (bring your own API keys)

**Use cases:**
- Exploration and prototyping
- When I'm curious but not sure
- Testing new approaches
- Learning

**Typical session:** 2-3 times/week

<GIO_PLACEHOLDER>
Create a comprehensive workflow diagram showing:
- Central hub: Cursor IDE
- Connected tools: Claude, GPT-5, Cline, local LLMs
- Arrows showing when each tool is used
- Include example tasks for each path

Make it visual and easy to understand at a glance.
</GIO_PLACEHOLDER>

## The Privacy Layer: Local LLMs (llama.cpp)

**What it is:** On-device LLaMA models

**Why I use it:**
- Zero API cost
- Complete privacy
- Offline capable
- Good for sensitive code

**Monthly cost:** £0

**Use cases:**
- Private client projects
- Offline coding (planes, trains)
- Experimentation
- Learning model behavior

**Performance:** Runs LLaMA 3.2 7B at ~15 tok/sec on my MacBook Pro

Not as smart as cloud models, but good enough for many tasks.

## The Task Distribution

Here's how I actually split work across tools:

**Monday morning (Planning):**
- GPT-5 for architecture decisions
- Claude for breaking down features
- Cursor as the workspace

**Implementation (Most of the week):**
- 80% Claude through Cursor
- 15% GPT-5 for complex stuff
- 5% Cline for exploration

**Code review:**
- Claude Sonnet 4.5 exclusively
- More careful, fewer false positives

**Documentation:**
- Claude (better at clear writing)
- GPT-5 for complex explanations

**Private projects:**
- Local llama.cpp models
- No cloud, complete privacy

## The Cost Breakdown

**Monthly spending:**
- Cursor Pro: £16
- Claude API: ~£24
- GPT-5 API: ~£20
- Cline: £0
- Local LLMs: £0

**Total: £60/month**

**Value generated:**
- 2x feature velocity
- Fewer bugs
- Better code quality
- Less mental fatigue

**Equivalent cost:**
~3 hours of developer time saved per week
At £80/hour, that's £960/month value

**ROI: 16x**

Even if my math is generous, the ROI is clearly positive.

## The Productivity Numbers

**Before AI tools (Q4 2024):**
- 2-3 features/week
- Every spare hour coding
- High mental load
- Frequent context switching

**With AI stack (Q3 2025):**
- 4-6 features/week
- Same time investment (but more efficient!)
- Lower mental load
- Better focus

**Key metric:** Features per hour went from 0.06 to 0.13

That's **2.16x more productive**.

## What Changed

**Time allocation shift:**

**Before:**
- 60% writing code
- 20% debugging
- 15% thinking
- 5% documentation

**After:**
- 30% reviewing AI code
- 20% debugging
- 35% thinking/architecture
- 15% documentation

I'm spending more time on high-value activities.

## The Workflow in Action

**Feature request:** "Add user profile editing"

**Step 1:** Architecture (GPT-5, 5 minutes)
```
"Design a profile editing flow with validation,
image upload, and optimistic updates"
```

**Step 2:** Implementation (Claude via Cursor, 20 minutes)
```
"Generate ProfileEditScreen with form validation
and image picker integration"
```

**Step 3:** Refinement (Claude, 10 minutes)
- Fix edge cases
- Add error handling
- Improve UX

**Step 4:** Review (Claude, 5 minutes)
```
"Review this code for issues"
```

**Total: 40 minutes** for a feature that used to take 3-4 hours.

## The Context Window Strategy

Different tools for different context needs:

**Small context (single file):**
- Cursor autocomplete
- Fast, immediate

**Medium context (feature):**
- Claude via Cursor Composer
- Multi-file awareness

**Large context (full app):**
- GPT-5 with full codebase
- Architecture-level understanding

**Sensitive context (private):**
- Local LLMs
- Never leaves device

## The Model Switching Logic

I switch models based on task complexity:

**Simple (90% of tasks):**
→ Claude Sonnet 4.5

**Complex reasoning:**
→ GPT-5

**Exploration:**
→ Cline with various models

**Private:**
→ Local LLaMA

## The Tools I Don't Use

**GitHub Copilot:**
Good, but Cursor's Claude integration is better for my workflow.

**Tabnine:**
Fine for autocomplete, but I need more than that.

**Windsurf:**
Interesting, but Cursor does everything I need.

**Amazon Q:**
Not relevant for mobile dev.

I'm not anti these tools. They just don't fit my specific needs.

## The Future Additions

**Coming soon to my stack:**

**Specialized subagents:**
Kent Beck for refactoring, Stephen King for docs (see my August post)

**Local multimodal models:**
For image/design understanding without cloud

**MCP integration:**
Tool-use extensions for Cline

**Fine-tuned models:**
Custom models trained on my coding patterns

## The Honest Downsides

**1. Context switching cost:**
Managing multiple tools has overhead

**2. API dependency:**
When OpenAI/Anthropic have outages, I'm stuck

**3. Learning curve:**
Took 2 months to optimize this workflow

**4. Cost monitoring:**
Need to watch API spending carefully

**5. Over-reliance risk:**
My vanilla coding skills might atrophy?

## The Recommendations

**If you're starting out:**
1. Get Cursor Pro (£16/month)
2. Use built-in Claude
3. Stop there for a month
4. Add more only if needed

**If you're experienced:**
1. Start with my stack
2. Experiment with model selection
3. Track your productivity
4. Adjust based on data

**If you're on a budget:**
1. Use Cline (free)
2. Bring cheap API keys (Grok, etc.)
3. Use local models when possible

## The Mental Shift

The hardest part wasn't the tools. It was changing how I think about coding.

**Old mindset:**
"I need to write this feature"

**New mindset:**
"I need to guide AI to build this feature"

That's a fundamental shift in role.

## The Bottom Line

My AI-powered mobile dev stack:
- Costs £60/month
- Saves 15-20 hours/month
- 2x productivity increase
- Lower stress, higher quality

The numbers justify themselves.

But beyond numbers: coding is **fun** again. I'm not grinding through boilerplate. I'm solving interesting problems.

That's worth more than any ROI calculation.

---

**What's your AI stack?** I'd love to compare notes. Hit me up on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo).
