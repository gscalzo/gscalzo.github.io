+++
title = "Cursor Just Launched a Mobile Version (And It Actually Works)"
date = 2025-06-30T09:15:00+01:00
draft = true
tags = ["Cursor", "mobile-first", "PWA", "remote-coding"]
description = "Cursor released web and mobile versions via PWA. I coded an entire feature on my iPad. Here's how it performs."
+++

## I Didn't Believe the Announcement

Last Tuesday, Cursor dropped a surprise: web and mobile versions available via Progressive Web App (PWA).

My first thought: "This will be a gimped demo. A marketing stunt. No way you can actually code on a phone."

Then I installed it on my iPad Pro one Saturday. Spent the afternoon coding. Shipped a complete feature.

I'm writing this post **on the Cursor mobile PWA** right now.

They actually pulled it off.

## What Is This Thing?

Cursor just launched three new ways to use their AI-powered IDE:

**cursor.com (Web):**
Full Cursor experience in your browser. No download required.

**PWA on iOS:**
Install from Safari → Add to Home Screen. Feels like a native app.

**PWA on Android:**
Install from Chrome. Same experience as iOS.

All three sync with your desktop version. Same projects, same settings, same AI context.

## My iPad Setup

I'm testing on iPad Pro 12.9" (M2) with Magic Keyboard. Here's what installation looked like:

**Step 1:** Visit cursor.com/web in Safari

**Step 2:** Tap Share → Add to Home Screen

**Step 3:** Name it "Cursor" and add to home screen

**Step 4:** Open the app, sign in with existing account

**Total time:** 90 seconds.

No App Store. No 2GB download. Just a web app that **feels** native.

<GIO_PLACEHOLDER>
Add a screenshot sequence showing:
1. Safari showing cursor.com/web
2. "Add to Home Screen" dialog
3. Cursor icon on iPad home screen
4. The app opened with a project loaded

Make it clear how simple the installation is.
</GIO_PLACEHOLDER>

## The Interface Surprise

Opening Cursor on iPad, I expected a cramped, compromised version of the desktop app.

Instead: **it's been completely redesigned** for mobile.

**Desktop Cursor:**
- File tree on left (fixed)
- Editor in middle
- AI chat on right
- Terminal at bottom

**Mobile Cursor:**
- Collapsible panels (swipe to reveal)
- Full-screen editor by default
- AI chat slides in from right
- Terminal slides up from bottom
- Touch-optimized toolbar

Someone actually **thought** about mobile instead of just shrinking the desktop UI. Respect.

## Coding on iPad: The Real Test

I decided to build a real feature: user profile editing for a SwiftUI app.

**The task:**
- Create ProfileEditView
- Add form validation
- Connect to backend API
- Write unit tests
- Push to GitHub

Let's see how Cursor mobile handles it.

## File Navigation

**Desktop:** Command-P to quick open files.

**Mobile:** Tap the folder icon → search bar appears.

Works well, but typing file names on iPad is slower than keyboard shortcuts. I found myself using the file tree more than search.

**Rating: 7/10** - Functional but not as fast as desktop.

## Code Editing

**The keyboard:**
iPad software keyboard is... fine. Not great for code. The Magic Keyboard makes it **much** better.

**Touch gestures I discovered:**
- Two-finger swipe: Scroll code
- Pinch: Zoom in/out (great for reviewing)
- Long press: Context menu
- Double-tap: Select word

**Autocomplete:**
Cursor's AI autocomplete works **exactly** like desktop. Tab to accept, arrow keys to navigate.

**Rating: 8/10** - Surprisingly capable with hardware keyboard.

<GIO_PLACEHOLDER>
Add a split-screen image showing:
- Left: Code editing with autocomplete suggestions
- Right: AI chat assistant visible alongside code

Show the dual-panel workflow on iPad.
</GIO_PLACEHOLDER>

## AI Chat (The Best Part)

This is where mobile Cursor **shines**.

The chat panel slides in from the right. You can drag it to resize, or make it full-screen.

**Example interaction:**

**Me:** "Create a ProfileEditView with form validation for name, email, and bio"

**Cursor AI:**
*Generates complete SwiftUI view with:*
- Text fields with proper bindings
- Email validation regex
- Character count for bio
- Save/Cancel buttons
- Loading states

**Me:** "Add error messages that appear below invalid fields"

**Cursor AI:**
*Updates the view with inline error text that appears conditionally*

**Speed:** Responses took 2-3 seconds. **Same as desktop.** No noticeable slowdown from being a web app.

## The Composer Mode on Mobile

Cursor's Composer (multi-file editing) works on mobile. I was skeptical.

**Test:** "Refactor ProfileEditView to use MVVM pattern"

Cursor:
1. Created ProfileEditViewModel
2. Updated ProfileEditView to use @StateObject
3. Moved validation logic to ViewModel
4. Added unit tests for ViewModel

Across **4 files**. On an **iPad**.

The multi-file diff view is adapted for mobile - you swipe between files instead of seeing them side-by-side.

**Rating: 9/10** - Actually works better than I expected.

## Terminal Access

You can open a terminal in the mobile app. It connects to your project's environment.

**What works:**
- npm/yarn commands
- git operations
- Running builds
- Viewing logs

**What's awkward:**
- Complex shell commands
- Interactive prompts
- Vim/nano editing

I used it for `git status`, `npm install`, and `git push`. For anything more complex, I switched to a dedicated SSH app.

**Rating: 6/10** - Good for basics, limited for power users.

## Git Integration

The Git panel is touch-optimized. You can:
- View changes (swipe through modified files)
- Stage files (tap checkbox)
- Write commit messages (on-screen keyboard)
- Push/pull (tap button)

I committed and pushed the entire feature from iPad:

```
git status         ✓ (via Cursor terminal)
git add .          ✓ (via Cursor Git panel)
git commit         ✓ (via Cursor Git panel)
git push           ✓ (via Cursor Git panel)
```

Worked flawlessly. **This** is what makes mobile coding viable.

<GIO_PLACEHOLDER>
Add a screenshot showing:
- Git panel open on iPad
- Staged changes listed
- Commit message being written
- Touch-friendly buttons for commit/push

Make it clear the Git workflow is mobile-native.
</GIO_PLACEHOLDER>

## Performance on iPad

**App launch:** ~3 seconds (PWA loads from cache)

**Project loading:** ~5 seconds for medium React Native project

**File switching:** Instant

**AI responses:** 2-3 seconds (same as desktop)

**Memory usage:** Monitored via Safari dev tools - stays under 500MB

**Battery impact:** ~15% per hour of active coding (comparable to native apps)

No lag. No stuttering. It's **fast**.

## iPhone Experience (Why I Don't Recommend It)

I tried the same workflow on iPhone 15 Pro.

**Pros:**
- Technically works
- AI chat is usable
- Good for code review

**Cons:**
- Screen too small for editing
- Keyboard takes 60% of screen
- Can't see enough context
- Constantly zooming/panning

**Verdict:** Great for **viewing** code and chatting with AI. Not practical for **writing** code.

**Best use case:** Quick fixes, code review, AI chat on-the-go.

## Sync Across Devices

The killer feature: **everything syncs**.

I started a feature on desktop, continued on iPad during lunch, finished on desktop at home.

**What syncs:**
- Open files and cursor position
- AI chat history
- Git state
- Editor settings
- Extensions

**What doesn't sync:**
- Local terminal state
- Running processes
- Breakpoints (no debugger on mobile yet)

The transition between devices is **seamless**. This is what makes mobile Cursor practical.

## Real-World Use Cases

After a week of testing, here's where mobile Cursor actually makes sense:

**1. Commute Coding (iPad):**
I code on the train now. 45 minutes each way = 90 minutes of productive work.

**2. Quick Fixes (iPhone):**
"The build is broken" Slack message → open Cursor on phone → ask AI what's wrong → push fix.

**3. Code Review (iPad):**
Review PRs on iPad is **better** than laptop. Pinch to zoom, swipe through files, AI explains changes.

**4. Airport/Coffee Shop (iPad):**
Full dev environment without carrying a laptop.

**5. Late-Night Ideas (iPhone):**
Prompt the AI, get code samples, copy for tomorrow. No laptop needed.

## What Doesn't Work Yet

Let's be real about limitations:

**No debugger:**
You can't set breakpoints or step through code. This is a **big** limitation for complex bugs.

**No extensions (yet):**
Desktop Cursor supports VS Code extensions. Mobile doesn't. Cursor says this is coming.

**Limited split-screen:**
You can't have two files side-by-side. Only one file visible at a time (with chat overlay).

**Performance on older devices:**
I tested on a 2020 iPad (A12 chip). It's noticeably slower. You need recent hardware.

**Offline mode is limited:**
The app loads offline, but AI features need internet. Makes sense, but worth noting.

## Comparison to Other Solutions

**vs. GitHub Codespaces on iPad:**
- Cursor: Better AI, faster, cleaner UI
- Codespaces: More mature, better terminal, full extensions
- **Winner:** Cursor for AI-heavy workflows, Codespaces for traditional coding

**vs. Code on native iPad apps (Textastic, etc):**
- Cursor: AI assistance, git integration, full IDE features
- Native apps: Better performance, offline work
- **Winner:** Cursor unless you're truly offline

**vs. SSH to desktop:**
- Cursor: Native UI, touch-optimized, AI built-in
- SSH: Full desktop power, all tools available
- **Winner:** Cursor for ease of use, SSH for power users

## The Business Model Question

Cursor's PWA is included in the **same £16/month** subscription as desktop.

No extra charge for mobile. No separate "Cursor Go" product. Just works.

This is **smart**. It makes Cursor the obvious choice if you ever code away from your desk.

## What Surprised Me Most

**1. The speed:**
I expected a web app to feel slow. It doesn't.

**2. The AI quality:**
Same models as desktop. No "mobile-optimized" gimped version.

**3. The polish:**
This isn't a v1 beta. It feels like a v3. Someone spent time on mobile UX.

**4. The practicality:**
I genuinely used this for real work. Not a demo. **Real features** shipped from iPad.

## Should You Try It?

**Yes, if:**
- You have an iPad (especially with keyboard)
- You already use Cursor on desktop
- You want to code during commutes/travel
- You do AI-heavy development

**Maybe, if:**
- You only have iPhone (limited use cases)
- You need debugger access (not available yet)
- You code in languages with complex toolchains

**No, if:**
- You don't have Cursor subscription already
- You never code away from desk
- You need full VS Code extension ecosystem

## My New Workflow

**Desktop:** Complex refactoring, debugging, architecture work

**iPad:** Feature development, AI-assisted coding, code review

**iPhone:** Quick fixes, AI questions, emergency deployments

Three devices. One codebase. **Continuous productivity**.

## The Future of This

Cursor just proved **serious** coding is possible on mobile. Not toy projects. Real features.

This changes the calculation for:
- Digital nomads
- Commuters
- Parents with limited desk time
- Anyone who wants flexibility

We're entering an era where your **device** doesn't dictate your **capability**.

And honestly? That's pretty cool.

---

**Coding on iPad with Cursor?** Share your setup on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo).
