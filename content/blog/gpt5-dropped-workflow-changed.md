+++
title = "GPT-5 Dropped and My Workflow Changed Overnight"
date = 2025-08-07T14:30:00+01:00
draft = true
tags = ["GPT-5", "OpenAI", "coding", "models"]
description = "GPT-5 launched in August with 1M token context and improved coding. I switched from Claude for a week. Here's what I discovered."
+++

## The Launch Everyone Was Waiting For

August 2025. OpenAI finally dropped GPT-5.

I was in the middle of a feature when the announcement hit. Naturally, I stopped everything to try it.

One week later, my workflow looks completely different.

## What's Actually New

The headline numbers are impressive:
- **1,000,000 token context window** (yes, same as LLaMA 4)
- **Advanced reasoning** for complex logic
- **Improved math and coding** abilities
- **Agentic features** built-in

But numbers don't tell the story. Using it does.

## My First Test: The Gnarly Refactor

I had a React Native navigation system that needed restructuring. Multiple screens, nested navigators, type-safe routing. The kind of refactor that usually takes a full weekend.

I fed GPT-5 the entire codebase context—about 45,000 tokens of TypeScript.

**What it did:**
1. Understood the entire navigation hierarchy
2. Identified type safety gaps
3. Proposed a cleaner structure
4. Generated the migration code
5. **Explained the reasoning for each decision**

That last part is key. GPT-5 doesn't just generate code. It explains **why** the generated code is better.

## The Reasoning Difference

Here's what stood out immediately: **GPT-5 thinks through problems**.

**Claude Sonnet 4 approach:**
> "Here's a refactored version using TypeScript generics for type safety..."

**GPT-5 approach:**
> "Let me analyze the current structure. I see three issues: tight coupling between screens, lack of type safety in navigation params, and no clear separation between authenticated and public routes. Let me address each..."

It's like the difference between a junior dev who knows the patterns and a senior dev who understands the tradeoffs.

## Where It Actually Matters

**Complex State Management:**
GPT-5 excels when you have intricate state logic. I asked it to help with a multi-step form with conditional fields and validation.

It didn't just generate the code. It walked through:
- Why certain fields should be in global state vs local
- When to validate (onChange vs onBlur vs onSubmit)
- How to handle async validation
- Error message strategy

This level of reasoning is **new**.

**Architecture Decisions:**
"Should I use Context or Redux for this feature?"

GPT-5 actually analyzed my codebase, understood my existing patterns, and gave pros/cons specific to my situation. Not generic advice—contextual guidance.

## The 1M Token Context Window

Having the entire codebase in context changes everything.

**Before (with smaller context):**
"This function does X, and over in this other file it does Y..."
*AI loses track of the connection*

**With GPT-5:**
"Looking at how AuthContext interacts with your navigation flow across all 8 screens, here's a more cohesive approach..."

It actually **sees** the system, not just individual files.

<GIO_PLACEHOLDER>
Add a visual comparison showing:
- Small context: AI sees fragments, suggests incomplete solutions
- 1M token context: AI sees the whole system, suggests holistic improvements

Use connected nodes/graphs to show the difference in understanding.
</GIO_PLACEHOLDER>

## Claude vs GPT-5: The Honest Comparison

I spent a week alternating between Claude Sonnet 4 and GPT-5. Here's what I found:

**Claude Sonnet 4 is better for:**
- Refactoring existing code (more careful, fewer breaking changes)
- Following established patterns
- When you want reliable, consistent output
- Quick iterations

**GPT-5 is better for:**
- Complex reasoning tasks
- Architecture decisions
- When you need explanation of tradeoffs
- Novel problem-solving

**Both are excellent for:**
- Standard CRUD operations
- Component generation
- API integration
- TypeScript types

## The Cost Reality

GPT-5 isn't cheap:
- **£4 per million input tokens**
- **£12 per million output tokens**

Compare to Claude Sonnet 4:
- ~£2.40/£12 per million tokens

For large context windows, this adds up. That 45K token refactor session? About £0.24 worth of tokens.

Not breaking the bank, but if you're using it heavily, budget accordingly.

## When I Switched Back to Claude

Day 3, I needed to refactor a complex component. GPT-5 gave me a complete rewrite with improved architecture.

**Problem:** It broke 6 tests because it changed behavior slightly.

Claude Sonnet 4 on the same task? More conservative. Better for refactoring.

**Lesson learned:** Use GPT-5 for greenfield and architecture. Use Claude for refactoring and maintaining existing code.

## The Agentic Features

GPT-5 has built-in "agent mode" that can:
- Plan multi-step tasks
- Execute them sequentially
- Adjust based on intermediate results

Example: "Add dark mode support to this app"

**Traditional approach:**
Multiple back-and-forth exchanges

**GPT-5 agent mode:**
1. Analyzes current theme implementation
2. Plans the changes needed
3. Executes them step by step
4. Tests and adjusts
5. Reports completion

It's like Cursor's Composer mode, but at the model level.

## My New Workflow

After a week, here's how I'm using both:

**Morning planning (GPT-5):**
- Architecture decisions
- Complex problem decomposition
- "How should I approach this feature?"

**Implementation (Mix):**
- Greenfield features: GPT-5
- Refactoring: Claude
- Quick tasks: Whatever's faster

**Code review (Claude):**
- More careful, catches subtle issues

## The Multimodal Surprise

GPT-5 handles images, audio, and video. For mobile dev, this is wild.

**Use case:** I took a screenshot of a design mockup.

"Build this screen in React Native"

It generated:
- Component structure
- Styling that matched the design
- Responsive breakpoints
- Accessibility labels

Not perfect, but **80% there**. That's never been possible before.

## What This Means for Mobile Dev

The trajectory is clear: AI coding assistants are moving from "autocomplete" to "pair programmer" to "junior developer."

GPT-5 feels like having a smart junior dev who:
- Understands the full codebase
- Can reason through complex problems
- Needs guidance on style/patterns
- Makes occasional mistakes

That's... actually incredibly useful.

## Should You Upgrade?

**If you have API access:**
Try it. The reasoning capabilities alone are worth exploring.

**If you're paying per token:**
Use it strategically for complex tasks. Keep Claude for routine work.

**If you're on a budget:**
Claude Sonnet 4 is still excellent. GPT-5 isn't a must-have for everyone.

## The Real Impact

Last week with Claude: 3 features shipped
This week with GPT-5: 3 features shipped + 2 architectural improvements I'd been putting off

The output quantity stayed the same. The output **quality** increased.

That's the real win.

## Looking Forward

GPT-5 is impressive today. But we're barely scratching the surface.

Multimodal capabilities, agentic features, massive context windows—these enable entirely new workflows we haven't imagined yet.

Six months from now, this post will probably feel quaint.

And that's exciting.

---

**Using GPT-5 for mobile dev?** What's your experience been? Let me know on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo).
