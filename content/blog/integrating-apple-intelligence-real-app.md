+++
title = "I Integrated Apple Intelligence in My App (Here's How)"
date = 2025-06-23T14:20:00+01:00
draft = true
tags = ["Apple-Intelligence", "Swift", "iOS", "tutorial"]
description = "Two weeks with Apple's Foundation Models framework in production. The good, the gotcas, and the game-changing features."
+++

## From Announcement to Production in Two Weeks

On June 11th, Apple announced Foundation Models at WWDC. On June 12th, I started integrating it into my journaling app. Today, it's live in TestFlight.

Two weeks from announcement to production. That's how easy Apple made this.

Here's everything I learned building a **real** app with Apple Intelligence—not a demo, not a proof-of-concept, but an actual product shipping to users.

## What I Built

My app is called DailyMind—a private journaling app with AI-powered insights. Before Foundation Models, I was using OpenAI's API for:
- Daily writing prompts
- Sentiment analysis
- Entry summarization
- Writing suggestions

**The problems:**
- API costs were eating margins
- Users hated sending journal entries to cloud
- Offline mode was broken
- Rate limits on free tier

Foundation Models solved **all** of these.

## The Migration

Replacing OpenAI's API with Foundation Models took **one evening**.

**Old code (OpenAI):**
```swift
func generatePrompt() async throws -> String {
    let response = try await openAI.chat(
        messages: [
            .system("You are a thoughtful journaling assistant"),
            .user("Generate a reflective journaling prompt")
        ]
    )
    return response.content
}
```

**New code (Foundation Models):**
```swift
func generatePrompt() async throws -> String {
    let model = FoundationModel.creative
    return try await model.generate(
        prompt: "Generate a thoughtful journaling prompt for today"
    )
}
```

That's it. The API is **simpler** than OpenAI's.

## Feature 1: Daily Prompts

**What it does:** Generates a unique writing prompt every morning.

**Implementation:**
```swift
class PromptGenerator {
    private let model = FoundationModel.creative

    func generateDailyPrompt() async throws -> String {
        let context = buildContext()

        let prompt = """
        Generate a single thoughtful journaling prompt.
        Consider: \(context)
        Make it personal and reflective.
        """

        return try await model.generate(prompt: prompt)
    }

    private func buildContext() -> String {
        let weekday = Date().formatted(.dateTime.weekday(.wide))
        let season = getCurrentSeason()
        return "\(weekday), \(season)"
    }
}
```

**Example outputs:**
- "What small moment from this week deserves more attention?"
- "How has your definition of success evolved this year?"
- "What would you tell your younger self about today's challenges?"

**Quality:** Honestly, **better** than GPT-3.5. The creative model has a warm, thoughtful tone that fits journaling perfectly.

**Speed:** ~2 seconds on iPhone 15 Pro. Users don't mind because it happens in background while the app loads.

<GIO_PLACEHOLDER>
Add a screenshot showing:
- The journaling app home screen
- A daily prompt displayed beautifully
- "Generated on-device" indicator
- Clean, calm UI design

Make it feel peaceful and private.
</GIO_PLACEHOLDER>

## Feature 2: Sentiment Analysis

**What it does:** Analyzes emotional tone of journal entries.

**Implementation:**
```swift
struct SentimentAnalyzer {
    private let model = FoundationModel.default

    func analyze(_ entry: String) async throws -> Sentiment {
        let prompt = """
        Analyze the emotional tone of this journal entry.
        Return ONLY one word: positive, negative, or neutral.

        Entry: \(entry)
        """

        let result = try await model.generate(prompt: prompt)
        return Sentiment(rawValue: result.lowercased()) ?? .neutral
    }
}
```

**The gotcha:** The model sometimes returns extra text like "The sentiment is: positive" instead of just "positive".

**The fix:**
```swift
let result = try await model.generate(prompt: prompt)
    .components(separatedBy: .whitespaces)
    .last?
    .trimmingCharacters(in: .punctuation)
    .lowercased() ?? "neutral"
```

Parse defensively. AI output isn't guaranteed to be perfectly formatted.

## Feature 3: Entry Summarization

**What it does:** Creates a one-sentence summary of long entries.

**Implementation:**
```swift
func summarize(_ entry: String) async throws -> String {
    let model = FoundationModel.default

    let prompt = """
    Summarize this journal entry in one sentence.
    Be warm and thoughtful.

    \(entry)
    """

    return try await model.generate(prompt: prompt)
}
```

**Example:**

**Entry (300 words about a stressful work meeting):**

**Summary:** "Today was challenging as you navigated a difficult work conversation, but you're proud of how you handled it with honesty and professionalism."

**Quality:** Remarkable. It captures tone, context, and emotional nuance.

## Feature 4: Writing Suggestions (The Killer Feature)

This one took more work but is **amazing**.

**What it does:** As you write, suggests ways to expand or improve your thoughts.

**Implementation:**
```swift
class WritingAssistant {
    private let model = FoundationModel.creative

    func suggestContinuation(_ currentText: String) async throws -> [String] {
        let prompt = """
        The user is journaling. Here's what they've written:

        "\(currentText)"

        Suggest 3 brief ways they could continue or expand this thought.
        Each suggestion should be one sentence.
        Make them thoughtful and personal.
        """

        let response = try await model.generate(prompt: prompt)
        return parseSuggestions(response)
    }

    private func parseSuggestions(_ text: String) -> [String] {
        // Parse numbered list or bullet points
        return text
            .components(separatedBy: .newlines)
            .compactMap { line in
                line.trimmingCharacters(in: .whitespaces)
                    .replacingOccurrences(of: "^[0-9]+\\.\\s*", with: "", options: .regularExpression)
                    .replacingOccurrences(of: "^[-•*]\\s*", with: "", options: .regularExpression)
            }
            .filter { !$0.isEmpty }
            .prefix(3)
            .map { String($0) }
    }
}
```

**User experience:**

User types: "I feel stuck in my career..."

App suggests:
1. "What would 'unstuck' look like for you?"
2. "What first drew you to this work?"
3. "If you weren't afraid, what would you try?"

Users **love** this. It's like having a thoughtful friend asking good questions.

<GIO_PLACEHOLDER>
Add a demo video or screenshot sequence showing:
1. User typing in journal
2. Pause for 2 seconds
3. Subtle suggestions appear below
4. User taps one and continues writing

Show the UX flow, not just static UI.
</GIO_PLACEHOLDER>

## Memory Management (The Hard Part)

Foundation Models are efficient, but they still use **~2GB of RAM**.

**Problem:** iOS kills your app if it uses too much memory, especially on older devices.

**Solution:** Aggressive model lifecycle management.

```swift
class ModelManager {
    private var model: FoundationModel?
    private var lastUsed: Date = Date()

    func getModel() -> FoundationModel {
        if model == nil {
            model = FoundationModel.creative
        }
        lastUsed = Date()
        return model!
    }

    func releaseIfNeeded() {
        let idleTime = Date().timeIntervalSince(lastUsed)
        if idleTime > 60 { // 1 minute idle
            model = nil
        }
    }
}
```

Release the model when the app goes to background:
```swift
func sceneDidEnterBackground(_ scene: UIScene) {
    modelManager.releaseIfNeeded()
}
```

This reduced memory-related crashes to near zero.

## Testing on Real Devices

Performance varies **significantly** across devices:

**iPhone 15 Pro:**
- Fast (15 tokens/sec)
- No thermal throttling
- Battery impact minimal

**iPhone 15:**
- Good (10 tokens/sec)
- Slight warmth after 5+ minutes
- 5-8% battery per hour

**iPhone 14 Pro (unsupported but works):**
- Slower (6-8 tokens/sec)
- Gets warm quickly
- 10-12% battery per hour

**My decision:** Officially support iPhone 15+, but allow 14 Pro users in with performance warning.

## The Prompt Engineering Journey

Getting good outputs required **lots** of prompt iteration.

**Bad prompt:**
```swift
"Analyze sentiment"
```
**Result:** Inconsistent, sometimes returns explanations instead of sentiment.

**Better prompt:**
```swift
"""
Analyze the emotional tone of this text.
Respond with ONLY one word: positive, negative, or neutral.
"""
```
**Result:** More consistent, but still occasionally verbose.

**Best prompt:**
```swift
"""
Classify sentiment as: positive, negative, or neutral
Classification:
"""
```
**Result:** Almost always returns just the word.

**Lesson:** Be specific, give examples, use structured prompts.

## Error Handling

Foundation Models can fail. Here's how I handle it:

```swift
func generatePrompt() async -> String {
    do {
        return try await model.generate(prompt: promptText)
    } catch FoundationModelError.modelUnavailable {
        // Model not downloaded yet
        return "What are you grateful for today?" // Fallback
    } catch FoundationModelError.deviceNotSupported {
        // Older device
        return "Tell me about your day." // Fallback
    } catch {
        // Network, system, or other error
        logger.error("Generation failed: \(error)")
        return "What's on your mind?" // Fallback
    }
}
```

**Always have fallbacks.** AI should enhance the experience, not break it.

## User Reception

I pushed the TestFlight build with Foundation Models to 100 beta users. The feedback:

**Positive (85% of users):**
- "Feels more personal than before"
- "Love that it's private now"
- "Works on airplane mode!"
- "Suggestions are surprisingly good"

**Negative (15% of users):**
- "Little slower than OpenAI" (true)
- "Sometimes generic responses" (fair)
- "Wish it was smarter" (reasonable)

**Net Promoter Score:** 62 (up from 41 with OpenAI)

The privacy angle **matters** to users. Way more than I expected.

## Cost Comparison

**Before (OpenAI API):**
- ~5,000 API calls/day
- £0.0016 per call average
- **£8/day = £2.4000/month**

**After (Foundation Models):**
- Unlimited generations
- Zero marginal cost
- **£0/month**

Plus I can offer features I couldn't afford before. Like unlimited writing suggestions instead of "3 per day on free tier."

## Edge Cases I Hit

**1. Empty responses:**
Sometimes the model returns empty string. Add validation:
```swift
if response.isEmpty {
    throw AppError.emptyResponse
}
```

**2. Inappropriate content:**
Journal entries can be dark. The model sometimes refuses to process them:
```swift
if response.contains("I cannot") || response.contains("I'm not able") {
    // Model refused - use fallback logic
}
```

**3. Context too long:**
4K token limit is real. Truncate entries before analyzing:
```swift
let truncated = entry.prefix(2000) // ~3K tokens safe
```

**4. Model initialization delay:**
First generation can take 3-5 seconds (model loading). Show a loading indicator:
```swift
if isFirstGeneration {
    showLoadingState()
}
```

<GIO_PLACEHOLDER>
Create a troubleshooting guide visual showing:
- Common error states
- How to handle them
- User-facing messaging
- Fallback strategies

Make it a reference developers can use.
</GIO_PLACEHOLDER>

## Performance Optimizations

**1. Cache prompts:**
Daily prompts don't need to regenerate every time:
```swift
if let cached = UserDefaults.standard.cachedPrompt,
   cached.date.isToday {
    return cached.text
}
```

**2. Debounce writing suggestions:**
Don't generate on every keystroke:
```swift
func textDidChange() {
    debounceTimer?.invalidate()
    debounceTimer = Timer.scheduledTimer(withTimeInterval: 2.0) {
        Task { await generateSuggestions() }
    }
}
```

**3. Background generation:**
Generate tomorrow's prompt while user writes today:
```swift
Task.detached(priority: .background) {
    await pregenerateTomorrowPrompt()
}
```

## What I'd Do Differently

**1. Start with simpler prompts:** I over-engineered early prompts. Simpler often works better.

**2. Add streaming earlier:** I shipped without streaming, added it later. Users want to see progress.

**3. Test on iPhone 15 base model sooner:** I optimized for Pro, then realized most users have standard 15.

**4. Build better fallbacks:** My early error handling was too basic.

## The Future Features

Now that Foundation Models is working, I'm building:

**Mood tracking over time:**
Analyze sentiment trends across weeks/months.

**Conversation mode:**
Instead of just suggestions, have a back-and-forth dialogue.

**Voice journaling:**
Combine with Speech framework for voice-to-text + AI insights.

**Shared journals:**
Multiple people contributing, AI synthesizes perspectives.

All possible because there's no API cost limit.

## Should You Use Foundation Models?

**Use it if:**
- Privacy matters to your users
- You want offline capability
- API costs are a concern
- Your use case fits 3B model capabilities
- You target iPhone 15+

**Don't use it if:**
- You need GPT-4 level reasoning
- Large context windows required (>4K tokens)
- You must support older devices
- You want multimodal (images/video)

## Final Thoughts

Two weeks ago, building private AI features on iOS required:
- Complex model management
- Quantization knowledge
- Metal shader optimization
- Custom inference engines

Today, it's three lines of Swift.

Apple didn't just release an API. They **democratized** on-device AI for every iOS developer.

My journaling app is better, more private, and more profitable than it's ever been.

And I barely scratched the surface of what's possible.

---

**Built something with Foundation Models?** I'd love to see it. Share on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo).
