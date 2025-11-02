+++
title = "Cursor + Expo: Ridiculously Fast Mobile Development"
date = 2025-09-24T13:15:00+01:00
draft = true
tags = ["Cursor", "Expo", "React-Native", "workflow"]
description = "I built a complete React Native app with Cursor and Expo over a weekend. Here's how the workflow is insanely fast when tools play nice together."
+++

## The Setup That Just Works

Last week I needed to prototype a fitness tracking app. One of those ideas that hits you at 2am: "What if users could track workouts with just their voice?"

Saturday morning, I fired up Cursor, initialized an Expo project, and started vibe coding.

By Sunday evening, I had a working app with voice commands, workout history, and cloud sync.

This isn't normal.

## Why Cursor + Expo Is Different

**Expo gives you:**
- Zero native config headaches
- Instant app updates via EAS
- One command deployment
- Built-in everything (camera, location, auth)

**Cursor gives you:**
- Claude Sonnet 4.5 integration
- Multi-file awareness
- Composer mode for big changes
- Just knows React Native patterns

Put them together? **It's ridiculously fast.**

<GIO_PLACEHOLDER>
Add a workflow diagram showing:
- Voice idea → Cursor prompt
- Generated React Native code
- Expo instant preview
- Deploy to EAS Update
Make it visual with time indicators showing how fast each step is.
</GIO_PLACEHOLDER>

## The .cursorrules That Changed Everything

I created a `.cursorrules` file specifically for Expo projects:

```markdown
# Expo + React Native Rules

## Always use:
- Expo SDK modules (not raw React Native)
- TypeScript strict mode
- Expo Router for navigation
- Expo modules for native features

## Code style:
- Functional components only
- Custom hooks for logic
- Inline styles using StyleSheet.create
- Use Expo's built-in UI components

## Never suggest:
- react-native link commands
- Bare React Native modules
- Custom native code
- Pod installs
```

Now Cursor **always** generates Expo-compatible code. No more "this requires native linking" surprises.

## Building the Voice Workout App

**Me:** "Create a voice-activated workout tracker with these features: voice commands to log exercises, history view, and cloud sync."

**Cursor:** Generated in Composer mode:
- 5 screens with Expo Router
- Voice recognition using expo-speech-recognition
- AsyncStorage for local persistence
- Supabase integration for cloud sync
- TypeScript types for everything

**Time: 12 minutes**

The code just... worked. First try.

## The Instant Preview Loop

Here's where Expo shines:

**Traditional React Native:**
1. Write code
2. Wait for Metro bundler
3. Rebuild native code (sometimes)
4. Test on simulator
5. Debug
6. Repeat

**Time per iteration: 3-5 minutes**

**Expo + Cursor:**
1. Describe feature to Cursor
2. Code appears
3. Expo Go updates instantly
4. Test on real device
5. Iterate

**Time per iteration: 30 seconds**

That 10x speed difference is **game-changing**.

## The Features I Shipped That Weekend

**Saturday Morning: Core Functionality**
- Voice command parsing
- Workout logging
- Basic UI

**Saturday Afternoon: Polish**
- History with charts
- Cloud sync
- Error handling
- Loading states

**Sunday Morning: Deployment**
- EAS Build for iOS/Android
- OTA updates configured
- TestFlight distribution
- Production-ready

All of this without touching Xcode or Android Studio.

## When It Breaks Down

**Expo limitations:**
- Can't use arbitrary native modules
- Larger app size than bare RN
- Some advanced native features need dev builds

**Solution:** Expo dev builds let you add custom native code when needed. But honestly? I rarely need it.

## The Cost Reality

**Monthly spending:**
- Cursor Pro: £16
- EAS Build (Production): £23
- Claude API: ~£12 (for complex tasks)

**Total: £51/month**

**What I get:**
- Instant mobile app development
- Cross-platform builds
- OTA updates
- No DevOps headaches

Worth every penny.

## The Real Workflow

Here's a typical feature development session:

**Feature: Add photo capture to workout logs**

```
Me: "Add camera support to workout screen. 
Users should be able to snap a photo of their workout."

Cursor: [Generates]
- expo-camera integration
- Permission handling
- Photo storage with expo-file-system
- UI for camera view
- Gallery preview

Time: 3 minutes
```

Test on phone via Expo Go. Works. Ship via EAS Update. Done.

**Total time: 8 minutes** for a complete feature.

## Why This Combo Works

**Cursor understands context:**
When I say "Add auth," it knows I mean Expo auth session, not Firebase, not Auth0.

**Expo removes friction:**
No gradle files. No pbxproj files. No build headaches. Just JavaScript and TypeScript.

**Together:**
I can vibe code entire apps without ever leaving the flow state.

## The Mental Model Shift

**Old way:**
- Think about implementation
- Configure native dependencies
- Write code carefully
- Test on simulators
- Deal with build issues
- Eventually ship

**New way:**
- Describe what I want
- Cursor generates it
- Test instantly on real device
- Iterate based on feel
- Ship with one command

I'm **steering** development instead of **grinding** through it.

## Should You Try This?

**Do it if:**
- You're building consumer apps
- You want rapid iteration
- You're comfortable with React Native
- You value speed over native optimization

**Skip it if:**
- You need maximum performance
- You require specific native modules
- You enjoy configuring build systems (no judgment)

## The Honest Tradeoffs

**Pros:**
- 10x faster iteration
- Zero native config
- Deploy anywhere instantly
- Focus on features, not tooling

**Cons:**
- Larger bundle size
- Expo SDK constraints
- Less control over native layer
- Monthly costs for EAS

For me, the tradeoffs are worth it. I'm shipping apps, not managing build pipelines.

## The Bottom Line

I built a working voice workout tracker over one weekend. With Cursor generating code and Expo handling the native complexity, I stayed in flow state whenever I sat down to code.

That's never happened before.

The combination of AI-assisted coding + zero-config native development is **ridiculous**. In a good way.

If you're doing React Native, try Cursor + Expo. You might never go back.

---

**Running this combo?** What's your fastest prototype story? Hit me up on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo).
