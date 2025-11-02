+++
title = "Vibe Coding Changed How I Think About Development"
date = 2025-03-12T09:30:00+01:00
draft = true
tags = ["vibe-coding", "AI", "workflow", "development"]
description = "Andrej Karpathy introduced 'vibe coding' and it shifted my entire perspective on what it means to write software in 2025."
+++

## The Moment Everything Clicked

I was scrolling through Twitter in late February when I saw Andrej Karpathy's tweet about "vibe coding." At first, I rolled my eyes. Another AI buzzword, I thought. But then I actually read what he meant, and something clicked.

**Vibe coding isn't about writing code. It's about steering AI.**

That one sentence changed how I approach development. Instead of thinking "I need to implement this function," I started thinking "I need to guide the AI toward this solution."

## What Even Is Vibe Coding?

Here's how Simon Willison puts it: *"Vibe coding is building software with an LLM without reviewing the code it writes."*

Sounds reckless, right? But here's the thing—it's not about blindly accepting everything the AI generates. It's about **trusting the flow** instead of micromanaging every line.

Think of it like conducting an orchestra versus playing every instrument yourself. You're still in control, but your role has fundamentally shifted.

## My Old Workflow vs. Vibe Coding

**Before (Traditional Coding):**
1. Think about the problem
2. Design the solution
3. Write every line of code myself
4. Debug meticulously
5. Refactor

**Now (Vibe Coding):**
1. Describe what I want
2. Watch the AI generate a solution
3. Test if it works
4. Adjust my prompt if needed
5. Move on

The speed difference is **staggering**. I'm shipping features in hours that would have taken days.

## The Mental Shift Nobody Talks About

The hardest part wasn't learning new tools. It was **letting go**.

I spent years learning to write clean, efficient code. Now I'm learning to **describe** clean, efficient code and let something else write it. That's a completely different skill.

It's like going from:
- "I need to implement a binary search tree with O(log n) lookup"

To:
- "Create a fast lookup structure for user data, optimized for reads"

The second approach feels less technical. But it's actually **more powerful** because it focuses on the problem, not the implementation details.

<GIO_PLACEHOLDER>
Add a simple diagram showing the mental shift:
- Old way: Developer → Code → Solution
- New way: Developer → Intent → AI → Code → Solution

Keep it clean and visual. Show the developer's role changing from "writer" to "director."
</GIO_PLACEHOLDER>

## When Vibe Coding Breaks Down

Let me be honest: this doesn't work for everything.

**Where it shines:**
- CRUD operations
- UI components
- Data transformations
- Boilerplate code
- API integrations

**Where it struggles:**
- Complex algorithms
- Performance-critical code
- Novel architectures
- Code that needs deep system understanding

You still need to know **how** to code. But now you also need to know **when** to code versus when to describe.

## My New Development Flow

Here's what a typical session looks like now:

1. **Morning coffee + Claude**: Describe the day's features in natural language
2. **Review generated code**: Quick scan for obvious issues
3. **Run tests**: Did it actually work?
4. **Iterate on prompts**: Refine my descriptions based on results
5. **Ship it**: Seriously, that's it

I went from spending 80% of my time writing code and 20% thinking, to spending 80% of my time thinking and 20% reviewing code.

## The Productivity Paradox

Here's what surprised me: I'm **more** productive, but I feel like I'm doing **less work**.

My brain used to be occupied with:
- Syntax
- Edge cases
- Implementation details
- Debugging typos

Now it's occupied with:
- Problem framing
- Solution validation
- System design
- User experience

I'm working at a higher level of abstraction. And honestly? It feels weird. But also amazing.

## Should You Try Vibe Coding?

If you're a mobile developer (iOS, Android, React Native), **absolutely**.

Most mobile dev work is:
- UI layouts (perfect for vibe coding)
- Navigation flows (perfect for vibe coding)
- Data fetching (perfect for vibe coding)
- State management (surprisingly good for vibe coding)

Start small:
- Next time you need a new screen, describe it instead of coding it
- Let the AI handle your API client boilerplate
- Generate your model classes from API schemas

Then gradually expand to more complex features.

## The Future Is Already Here

Look, I know this sounds like hype. Six months ago, I would have been skeptical too.

But I just shipped a feature that would have taken me three days in about four hours. The code works. The tests pass. The users are happy.

Whether you call it "vibe coding" or "AI-assisted development" or "the new normal"—this is happening. The question isn't whether to adapt, but how fast you can.

---

**What's your take?** Are you vibing with your code yet, or still writing every line yourself? Let me know on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo).
