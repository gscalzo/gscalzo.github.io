+++
title = "GitHub Copilot 1.98 Made Me Rethink My IDE Setup"
date = 2025-03-25T14:20:00+01:00
draft = true
tags = ["GitHub-Copilot", "AI-assistants", "productivity", "IDE"]
description = "GitHub Copilot 1.98's Agent Mode changes multi-file operations completely. Here's what happened when I actually gave it a real project."
+++

## I Upgraded Out of Habit

GitHub Copilot released version 1.98 for VS Code in early March. I hit "update" without thinking much about it—just another incremental improvement, right?

Wrong.

The new **Agent Mode** completely changed how I structure my development workflow. And I almost missed it.

## What's Actually New

The changelog mentioned "enhanced autonomous capabilities" and "multi-file operations." Cool, I thought. More autocomplete.

But Agent Mode isn't autocomplete. It's more like having a junior developer who can:
- Understand your entire codebase context
- Make changes across multiple files simultaneously
- Remember what you're trying to accomplish
- Actually complete the task, not just suggest the next line

That last part is the game-changer.

## The First Real Test

I had a feature to implement: add dark mode support to an iOS app. Normally this means:
1. Create a theme manager
2. Update all view controllers
3. Add color definitions
4. Wire up the settings toggle
5. Persist user preference
6. Test everything

About a weekend's work, maybe more.

I described it to Copilot Agent Mode instead:

```
"Add dark mode support. Create a theme manager with light/dark variants,
update all view controllers to use dynamic colors, add a settings toggle,
and persist the user's choice."
```

Then I watched.

<GIO_PLACEHOLDER>
Add a screenshot or screen recording showing:
- The Agent Mode interface
- Multiple files being modified simultaneously
- The progress indicator as it works through the task

Make it look clean and professional. This should show the "magic moment" when developers realize what's possible.
</GIO_PLACEHOLDER>

## What Happened Next

Copilot Agent Mode:

1. **Created** `ThemeManager.swift` with light/dark color schemes
2. **Modified** 12 view controllers to use theme colors
3. **Updated** `AppDelegate.swift` to initialize the theme
4. **Added** a settings toggle in `SettingsViewController.swift`
5. **Implemented** UserDefaults persistence
6. **Generated** unit tests for the theme manager

All in about **8 minutes**.

I'm not exaggerating. Eight minutes. For a feature that would have taken me most of a day.

## But Did It Actually Work?

Here's the important part: **No.**

Well, not immediately. The theme manager was solid, but:
- One view controller still had hardcoded colors
- The settings toggle didn't trigger theme updates immediately
- The persistence logic had a small bug with initial state

But here's what's interesting: those weren't catastrophic failures. They were small fixes that took minutes to identify and correct.

**Total time including fixes: 45 minutes.**

From a day to 45 minutes. That's not incremental improvement—that's a fundamental shift in what's possible.

## The Multi-File Superpower

The killer feature isn't the code generation itself. It's the **coordination**.

Traditional autocomplete helps you write one file faster. Agent Mode helps you architect a solution across your entire project.

Example: When I asked it to "add analytics tracking to all user actions," it:
- Created an analytics service
- Found all button actions across the app
- Added tracking calls in each one
- Updated the initialization flow
- Even suggested privacy-friendly event names

It understood the **system**, not just individual files.

## How My Workflow Changed

**Before Copilot 1.98:**
- Write code one file at a time
- Manually ensure consistency across files
- Context-switch constantly
- Spend mental energy on boilerplate

**After Copilot 1.98:**
- Describe the feature
- Review the generated changes across all files
- Fix edge cases
- Focus mental energy on architecture and user experience

I'm spending less time typing and more time thinking. Which is exactly where a senior developer should be.

## The Model Access Game-Changer

Here's something nobody is talking about enough: the Pro+ tier (£31/month) gives you access to **GPT-5**.

I upgraded mostly for the increased request limits. But GPT-5's code understanding is noticeably better than GPT-4. It:
- Makes fewer logical errors
- Better understands mobile-specific patterns
- Generates more idiomatic Swift/Kotlin code
- Suggests better architecture

Is it worth £31/month? If you're shipping production code, **absolutely**. You'll save that in time within the first week.

## Multi-Model Support

By 2025, Copilot supports:
- GPT-4o, GPT-4.1, o3, o3-mini, o4-mini (OpenAI)
- Claude 3.5 Sonnet, Claude 3.7 Sonnet (Anthropic)
- Gemini 2.0 Flash, Gemini 2.5 Pro (Google)

You can switch models mid-session depending on the task. I use:
- **GPT-5** for complex architecture decisions
- **Claude 3.7 Sonnet** for refactoring existing code
- **Gemini 2.5 Pro** for data transformation logic

Different models for different strengths. It's like having specialized team members.

<GIO_PLACEHOLDER>
Add a comparison table or infographic showing:
- Different models
- Their strengths (architecture, refactoring, data work, etc.)
- When to use each one
- Your personal preferences for mobile dev

Keep it visual and easy to scan.
</GIO_PLACEHOLDER>

## When It Doesn't Work

Let me be honest about the limitations:

**Struggles with:**
- Very large codebases (>100k lines)
- Highly coupled legacy code
- Domain-specific business logic
- Performance-critical optimizations

**Excels at:**
- Green-field projects
- Well-structured codebases
- Standard patterns
- Repetitive tasks

If your codebase is a mess, Agent Mode will generate messy code to match. Garbage in, garbage out still applies.

## My New IDE Setup

Here's my current configuration:

1. **Copilot Pro+** for the GPT-5 access
2. **Agent Mode as default** for any multi-file task
3. **Claude 3.7** for refactoring sessions
4. **Regular autocomplete** still enabled for small edits

I'm using Agent Mode for probably 60% of my coding now. The other 40% is either too complex or too simple to justify the overhead.

## The Productivity Spike Is Real

Last month (pre-1.98): **3 features shipped**
This month (with 1.98): **7 features shipped**

Same number of working hours. Same quality bar. More than double the output.

Part of that is learning to work **with** the AI instead of fighting it. Part of it is the tool genuinely being that much better.

## Should You Upgrade?

If you're still on regular Copilot (no Pro), **maybe**. The free tier is fine for autocomplete.

If you're on Copilot Pro, **upgrade to Pro+** if you can justify the extra cost. GPT-5 access alone is worth it for production work.

If you're using a different AI assistant... honestly, try Copilot 1.98's Agent Mode. I've tested most of them, and this implementation feels the most polished for actual development work.

## The Future of Coding

Six months ago, AI coding assistants were glorified autocomplete.

Now? They're legitimate pair programming partners that can handle entire feature implementations.

What happens in another six months? I genuinely don't know. But I'm excited to find out.

---

**Running Copilot 1.98?** What's your experience been with Agent Mode? Let me know on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo).
