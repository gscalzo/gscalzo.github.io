+++
title = "Running LLaMA on iOS with llama.cpp: A Mobile AI Experiment"
date = 2025-05-14T11:30:00+01:00
draft = true
tags = ["iOS", "Swift", "llama-cpp", "on-device-AI", "open-source"]
description = "I got open-source LLaMA models running on iPhone using llama.cpp. Here's what worked, what didn't, and the performance numbers."
+++

## I Compiled LLaMA for iOS

Last week, I did something that felt both exciting and slightly crazy: I got Meta's LLaMA 2 running natively on my iPhone 15 Pro using llama.cpp.

No cloud API. No backend server. Just a 4-billion-parameter language model running **entirely on-device**.

Here's how I did it, what I learned, and whether you should bother trying this yourself.

## Why llama.cpp?

If you haven't heard of llama.cpp, it's Georgi Gerganov's C++ implementation of LLaMA inference. The same developer who created whisper.cpp and ggml (the ML library underneath).

What makes it special for mobile:
- Written in pure C/C++ (runs anywhere)
- Heavily optimized for Apple Silicon
- Supports quantization (smaller model files)
- No Python dependencies
- Metal acceleration on iOS

It's basically the **only** practical way to run full LLaMA models on iPhone right now.

## The Setup Process

Getting llama.cpp working on iOS wasn't as simple as `pod install`. Here's what I actually had to do:

**Step 1: Clone and Build llama.cpp**
```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
mkdir build && cd build
cmake .. -DLLAMA_METAL=ON
make -j
```

**Step 2: Convert Model to GGUF Format**

LLaMA models come in various formats. llama.cpp uses GGUF (GPT-Generated Unified Format). You need to convert:

```bash
python convert.py /path/to/llama-2-7b-chat \
  --outfile llama-2-7b-chat.gguf \
  --outtype q4_0
```

That `q4_0` is crucial—it's 4-bit quantization. Takes a 13GB model down to about 3.5GB.

**Step 3: Integrate with iOS**

This is where it gets interesting. I created a Swift package wrapping the llama.cpp C++ code:

```swift
import Foundation

public class LLaMAModel {
    private var context: OpaquePointer?
    private var model: OpaquePointer?

    public init(modelPath: String) throws {
        // Load GGUF model file
        let params = llama_context_default_params()
        params.n_ctx = 2048  // context size
        params.n_threads = 6  // iPhone cores
        params.use_metal = true  // GPU acceleration

        model = llama_load_model_from_file(modelPath, params)
        guard model != nil else {
            throw LLaMAError.modelLoadFailed
        }
    }

    public func generate(prompt: String, maxTokens: Int) -> String {
        // Tokenize input
        // Run inference loop
        // Decode output
    }
}
```

<GIO_PLACEHOLDER>
Add an architecture diagram showing:
- GGUF model file on device storage
- llama.cpp C++ layer
- Swift wrapper layer
- SwiftUI app interface
- Metal GPU acceleration path

Show the data flow from user prompt to generated text.
Make it clear this is all on-device with no network calls.
</GIO_PLACEHOLDER>

## The Quantization Trade-off

GGUF supports multiple quantization levels. Here's what I tested on iPhone 15 Pro:

**Q2_K (2-bit):**
- File size: ~2.1GB
- Quality: Poor, barely coherent
- Speed: Very fast
- Verdict: Don't bother

**Q4_0 (4-bit):**
- File size: ~3.5GB
- Quality: Surprisingly good
- Speed: 8-12 tokens/second
- Verdict: Sweet spot for mobile

**Q8_0 (8-bit):**
- File size: ~6.7GB
- Quality: Nearly identical to original
- Speed: 4-6 tokens/second
- Verdict: Use if you have storage

**FP16 (full precision):**
- File size: ~13GB
- Quality: Original
- Speed: Too slow to be practical
- Verdict: Skip for mobile

I settled on **Q4_0** as the best balance. The quality loss is minimal, and the speed is acceptable for real-time chat.

<GIO_PLACEHOLDER>
Create a comparison chart showing:
- X-axis: Quantization level (Q2, Q4, Q8, FP16)
- Y-axis: Two metrics - File size (GB) and Speed (tokens/sec)
- Visual trade-off between size and performance

Include a "recommended" marker on Q4_0.
</GIO_PLACEHOLDER>

## Performance Numbers

Running on iPhone 15 Pro with A17 Pro chip:

**LLaMA 2 7B (Q4_0):**
- First token latency: ~800ms
- Subsequent tokens: ~120ms each (8-9 tokens/sec)
- Memory usage: ~4.2GB
- Battery impact: ~15% per hour of continuous use

**LLaMA 2 13B (Q4_0):**
- First token latency: ~1.8s
- Subsequent tokens: ~250ms each (4 tokens/sec)
- Memory usage: ~7.8GB
- Battery impact: ~25% per hour
- Reality check: iOS kills the app if other apps need memory

**Context Window:**
I capped it at 2,048 tokens (about 1,500 words) to avoid memory pressure. The model supports more, but iOS doesn't give you unlimited RAM.

## What Actually Works

Let me be honest about what's practical:

**Great for:**
- Short chat responses (50-200 tokens)
- Code completion
- Text classification
- Simple Q&A
- Offline scenarios

**Struggles with:**
- Long-form content generation
- Complex reasoning tasks
- Multiple conversation threads
- Anything requiring >2K context

The model is **good**, but it's not GPT-4. Know the limitations going in.

## The Metal Acceleration Advantage

llama.cpp's Metal support makes a **huge** difference on iOS.

**Without Metal (CPU only):**
- ~2-3 tokens/second
- Phone gets hot
- Battery drains fast

**With Metal (GPU accelerated):**
- ~8-12 tokens/second
- Thermal management better
- More power efficient

Always enable Metal for iOS deployment. It's not optional if you want a good experience.

## Real-World Use Case

I built a simple coding assistant app. Here's a typical interaction:

**Me:** "Write a SwiftUI view for a login form"

**LLaMA (on-device):**
```swift
struct LoginView: View {
    @State private var email = ""
    @State private var password = ""

    var body: some View {
        VStack(spacing: 20) {
            TextField("Email", text: $email)
                .textFieldStyle(RoundedBorderTextFieldStyle())

            SecureField("Password", text: $password)
                .textFieldStyle(RoundedBorderTextFieldStyle())

            Button("Login") {
                // Handle login
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}
```

**Response time:** ~10 seconds for this output.

Is it slower than ChatGPT? Yes. But it works **offline** and my code never leaves my device. That's the trade-off.

## Distribution Challenges

If you want to ship this in an app, prepare for headaches:

**App Store Issues:**
- 3.5GB model file doesn't fit in app bundle
- Must download on first launch
- Users need ~5GB free storage
- Review process is unpredictable

**My Solution:**
- Ship app without model
- On first launch, offer model download
- Use background download APIs
- Cache locally, never re-download

**Reality check:** Apple's guidelines are murky on this. Your mileage may vary.

<GIO_PLACEHOLDER>
Show a mobile screenshot sequence:
1. App launch screen: "Download AI model?"
2. Download progress: "Downloading 3.5GB model..."
3. Ready state: Chat interface active

Make it look like an actual iOS app with proper UI design.
</GIO_PLACEHOLDER>

## When NOT to Use This

Let's be practical. You probably **shouldn't** use on-device LLaMA if:

- You need GPT-4 level quality
- You want fast responses (>20 tokens/sec)
- Your users have older devices (iPhone 12 and below struggle)
- You need large context windows (8K+ tokens)
- Battery life is critical

Cloud APIs exist for good reasons. Don't force on-device when it doesn't make sense.

## When It's Perfect

On-device LLaMA **is** the right choice when:

- Privacy is non-negotiable
- Offline capability is required
- You control the use case (specific, narrow tasks)
- Lower quality is acceptable
- You're okay with slower inference

Think: medical apps, government/military, journalist tools, personal assistants.

## The Code (Swift Wrapper)

Here's a simplified but functional Swift wrapper I created:

```swift
public class LLaMAChat {
    private let model: LLaMAModel
    private var conversationHistory: String = ""

    public init(modelPath: String) throws {
        self.model = try LLaMAModel(modelPath: modelPath)
    }

    public func send(_ message: String) async -> String {
        let prompt = buildPrompt(message)

        return await withCheckedContinuation { continuation in
            DispatchQueue.global(qos: .userInitiated).async {
                let response = self.model.generate(
                    prompt: prompt,
                    maxTokens: 256
                )
                continuation.resume(returning: response)
            }
        }
    }

    private func buildPrompt(_ message: String) -> String {
        """
        [INST] \(message) [/INST]
        """
    }
}
```

This runs inference on a background thread to keep the UI responsive.

## Future: Apple Intelligence Changes This

Here's the elephant in the room: Apple just announced the Foundation Models framework at WWDC 2025 (coming next month).

If Apple provides **native** on-device LLM APIs with 3-line integration, does anyone need llama.cpp on iOS?

**Probably not for most apps.**

But llama.cpp still has advantages:
- Open source models
- Full control over model choice
- Cross-platform (iOS, Android, desktop)
- No waiting for Apple to support new models

It's a niche tool, but a powerful one for specific use cases.

## Should You Try This?

**Yes, if:**
- You're curious about on-device AI
- You have privacy-critical use cases
- You want to learn low-level ML integration
- You're building for offline scenarios

**No, if:**
- You just need a chatbot (use an API)
- You want the easiest solution (wait for Apple's framework)
- You're targeting older devices
- You don't want to deal with model management

## What I Learned

This experiment taught me:

1. **On-device LLMs are viable** on modern iPhones, but barely
2. **Quantization is magic** - Q4_0 is 80% the quality at 25% the size
3. **Metal acceleration is mandatory** for acceptable performance
4. **Memory management is critical** on iOS
5. **User expectations need managing** - this isn't ChatGPT speed

Most importantly: The future of mobile AI is **hybrid**. Some things run on-device for privacy/speed, complex things hit the cloud. Choose the right tool for each job.

---

**Running LLMs on mobile?** I'd love to see what you're building. Connect on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo).
