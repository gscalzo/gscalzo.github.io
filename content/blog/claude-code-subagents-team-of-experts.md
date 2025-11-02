+++
title = "Claude Code Subagents: Like Having a Team of Expert Devs"
date = 2025-08-01T10:00:00+01:00
draft = true
tags = ["Claude-Code", "subagents", "workflow", "specialization"]
description = "Claude Code subagents let me configure specialized AI assistants for different tasks. Meet my Kent Beck refactoring agent and Stephen King documentation agent."
+++

## The Team I Didn't Know I Could Build

I've been using Claude Code for months, mostly treating it like a really smart autocomplete. Then I discovered **subagents**.

Now I have a Kent Beck working on my refactoring and a Stephen King writing my documentation. They're AI personas, but they work like having specialized team members.

And honestly? It's transformed how I write code.

## What Are Subagents?

Instead of one general-purpose AI assistant, Claude Code lets you create **specialized agents** with distinct expertise and personalities.

Think of it like this:
- You wouldn't ask your QA engineer to write marketing copy
- You wouldn't ask your technical writer to optimize algorithms
- Different tasks need different mindsets

Subagents let you configure AI assistants that way.

## My "Kent Beck" Agent

I named my refactoring agent after Kent Beck because, well, who better?

**Configuration (.claude/prompts/kent-beck.md):**
```markdown
You are Kent Beck, legendary software engineer and creator of Extreme Programming.

Your expertise:
- Clean, simple code
- Test-driven development
- Refactoring patterns
- Code smells identification

Your personality:
- Direct but kind
- Focus on simplicity over cleverness
- "Make it work, make it right, make it fast"

When reviewing code:
1. Identify code smells immediately
2. Suggest small, safe refactorings
3. Explain WHY the refactoring improves things
4. Keep changes incremental
```

<GIO_PLACEHOLDER>
Add a screenshot showing:
- The .claude/prompts directory structure
- Example kent-beck.md configuration file
- How to invoke the Kent Beck agent in Claude Code

Make it clear and tutorial-style so readers can replicate it.
</GIO_PLACEHOLDER>

## What Kent Beck Does for Me

Yesterday, I had this gnarly function:

```swift
func processUserData(_ data: [String: Any]) -> Result<User, Error> {
    guard let id = data["id"] as? Int else { return .failure(.invalidID) }
    guard let name = data["name"] as? String else { return .failure(.invalidName) }
    guard let email = data["email"] as? String else { return .failure(.invalidEmail) }
    // ... 15 more lines of nested guards ...
}
```

I asked Kent Beck to review it.

**His response:**
> "I see the guard-statement pyramid of doom. This function knows too much about data structure. Let's extract the validation logic and use a builder pattern."

He then generated:

```swift
struct UserBuilder {
    let validator = UserValidator()
    
    func build(from data: [String: Any]) -> Result<User, ValidationError> {
        validator.validate(data)
            .flatMap { createUser(from: $0) }
    }
}
```

Much cleaner. And he explained **why** it's better: separation of concerns, testability, readability.

## My "Stephen King" Agent

Documentation is where code goes to die. Unless you have Stephen King writing it.

**Configuration (.claude/prompts/stephen-king.md):**
```markdown
You are Stephen King, master storyteller.

Your expertise:
- Compelling narratives
- Clear, engaging prose
- Making complex things accessible
- Hooking readers immediately

Your personality:
- Conversational and direct
- No jargon without explanation
- Stories over abstract concepts
- Brutal honesty about what's unclear

When writing docs:
1. Start with why someone cares
2. Tell a story about how it works
3. Use concrete examples
4. End with clear next steps
```

## What Stephen King Does for Me

I needed to document an authentication flow. My first attempt:

> "The AuthManager implements token-based authentication using JWT with refresh token rotation and secure storage via Keychain..."

Yawn. Even I didn't want to read it.

I asked Stephen King to rewrite it:

> "Your users want to log in once and stay logged in. Here's how we make that happen without compromising security.
>
> When someone signs in, we give them two keys: an access token (expires in 15 minutes) and a refresh token (lasts 30 days). Think of it like a hotel room key and a master key to get new room keys..."

See the difference? The Stephen King version tells a story. People actually read it.

<GIO_PLACEHOLDER>
Add a before/after comparison showing:
- Technical documentation (before Stephen King)
- Story-driven documentation (after Stephen King)

Highlight the readability difference visually.
</GIO_PLACEHOLDER>

## How They Work Together

Here's my workflow now:

**1. Writing New Code:**
Use default Claude agent (general purpose)

**2. Code Review Time:**
Switch to Kent Beck:
```
@kent-beck review this authentication flow
```

**3. Documentation Time:**
Switch to Stephen King:
```
@stephen-king document this API for external developers
```

**4. Different Tasks, Different Experts:**
I'm building more agents:
- "Martin Fowler" for architecture decisions
- "DHH" for Rails-style productivity opinions
- "Sandi Metz" for object-oriented design

Each one specializes. Each one thinks differently.

## The Collaboration Effect

Here's what's interesting: the agents complement each other.

**Example:**
1. I write messy code to get feature working
2. Kent Beck refactors it to be clean
3. Stephen King documents the cleaned version

The result is better than if one general agent did everything.

## Setting This Up Yourself

**Step 1: Create the .claude directory**
```bash
mkdir -p .claude/prompts
```

**Step 2: Write your agent configs**
Create files like `kent-beck.md`, `stephen-king.md` with personality/expertise descriptions.

**Step 3: Invoke them**
Use `@agent-name` to switch contexts in Claude Code.

**Step 4: Iterate**
Refine the prompts based on what works. These are living documents.

<GIO_PLACEHOLDER>
Create a visual guide showing:
- Directory structure (.claude/prompts/)
- Example config file format
- How to invoke agents
- Tips for creating effective agent personas

Make it a "getting started" infographic.
</GIO_PLACEHOLDER>

## Why This Works

Different coding tasks need different thinking styles:
- **Refactoring** needs critical analysis and pattern recognition
- **Documentation** needs storytelling and empathy
- **Architecture** needs systems thinking
- **Testing** needs adversarial thinking

One AI assistant trying to do all of that will be mediocre at each. Specialized agents can excel.

## The Limitations

**They're not sentient:**
These are still prompts, not actual Kent Beck or Stephen King. But the framing helps.

**Context switching has overhead:**
Invoking different agents takes a moment. For tiny tasks, the default agent is faster.

**You need to know which expert to ask:**
This works best when you understand the problem domain well enough to pick the right specialist.

## My Current Team

After a month of experimentation, here's my roster:

1. **Kent Beck** - Refactoring and code quality
2. **Stephen King** - Documentation and communication
3. **Martin Fowler** - Architecture and patterns
4. **Sandi Metz** - Object-oriented design
5. **Default Claude** - General coding tasks

I'm building a "Linus Torvalds" for performance optimization next. Should be... direct.

## The Productivity Impact

**Before subagents:**
- Generic AI suggestions
- Inconsistent code review quality
- Documentation was an afterthought

**After subagents:**
- Expert-level specialized feedback
- Consistent refactoring patterns
- Documentation I'm actually proud of

It's like having senior devs on demand for specific problems.

## Try This

Pick one specialized agent to start with. Don't build five on day one.

**My recommendation:**
Start with a refactoring specialist (Kent Beck style). Code review is where specialized expertise pays off immediately.

Then add a documentation agent when you're comfortable with the workflow.

## The Future

I'm experimenting with:
- **Pair programming agents** that challenge my assumptions
- **Domain-specific agents** for iOS vs backend vs frontend
- **Code reviewer agents** with different focus areas (security, performance, accessibility)

The possibilities are pretty wild.

## Share Your Agents

I'd love to see what specialized agents other developers are creating. What experts would you add to your team?

---

**Building your own subagent team?** Share your configs! Find me on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo).
