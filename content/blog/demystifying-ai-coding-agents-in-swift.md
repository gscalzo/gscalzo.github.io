+++
title = "Demystifying AI Coding Agents in Swift"
date = 2025-11-05T00:00:00+01:00
draft = false
tags = ["Swift", "AI", "LLM", "Coding Agents", "OpenAI"]
description = "Learn how to build your own AI coding agent in Swift. Discover the simple concepts behind tools like Claude Code and Cursor - it's just a loop, some tools, and a language model with opinions."
+++

<img src="/images/blog/nimbo/hero.png" alt="Hero Image" class="img-hero" />

## The Magic Trick That Isn't Magic

AI coding agents feel like magic. You type a request, and they search through files, write code, refactor functions, and somehow "know" what to do next. Pretty wild, right?

But here's the secret: **the concept is surprisingly simple**.

I've always believed the best way to truly understand something is to build it yourself. That's exactly what I did after reading Amp's excellent article ["How to Build an Agent"](https://ampcode.com/how-to-build-an-agent). I wanted to see if I could recreate the magic in Swift, and guess what? You absolutely can.

Today, we're going to build a real AI coding agent in Swift that can read files, list directories, and even edit code. No smoke, no mirrors. Just a loop, some tools, and a language model with opinions.

By the end of this post, you'll know exactly how tools like Claude Code, Cursor, or GitHub Copilot Workspace work under the hood. Spoiler: it's simpler than you think.

## What Is an AI Coding Agent, Really?

An AI coding agent boils down to three things:

1. **A language model** (like GPT-5, Claude, or Gemini)
2. **A set of tools** it can call (functions that do real work)
3. **A loop** that keeps the conversation going

<img src="/images/blog/nimbo/agent-loop.png" alt="Agent Loop Image" class="img-frame" />

Think of it like having a brilliant scientist who can't leave their office. You (the agent loop) keep asking them what to do next, they tell you, you go do it, report back, and they figure out the next step. Rinse and repeat until the job is done.

### The Context Window: Your Agent's Working Memory

Here's where things get interesting. Language models don't actually "remember" previous conversations in the way humans do. Every time you send a message, you're actually sending the *entire conversation history* along with it.

<img src="/images/blog/nimbo/context-window.png" alt="Context Window" class="img-frame" />

This "working memory" is called the **context window**. Modern models typically have context windows ranging from 128K to 200K tokens (roughly 100,000-150,000 words).

**Why does this matter?**

Because as your agent runs longer:
- Every file it reads gets added to the history.
- Every tool call and result takes up space.
- The model needs to process more and more text each turn.
- Eventually, you hit the limit.

When the context fills up, three things can happen:
1. **Performance degrades** because the model struggles to "pay attention" to everything.
2. **Costs skyrocket** because you're paying per token, remember?
3. **You hit a hard limit** when the API simply rejects your request.

This is why production agents use clever tricks like summarization, selective memory, and context pruning. But for our learning journey, we'll keep it simple.

## The Game Plan: Five Steps to Agent Enlightenment

We're going to build **Nimbo**, a Swift-based coding agent that can help you work with files. Here's our roadmap:

1. **The Foundation:** Set up a basic chat loop.
2. **Teaching Tools:** Define what our agent can do.
3. **Tool Execution:** Make those tools actually work.
4. **The Loop:** Connect everything together.
5. **The Finish Line:** Handle edge cases and errors.

All the code we're discussing lives in the [Nimbo repository](https://github.com/gscalzo/Nimbo). Feel free to clone it and follow along!

<img src="/images/blog/nimbo/agent-interaction.png" alt="Agent Interaction" class="img-frame" />

## Step 1: The Foundation (Building the Chat Loop)

Every agent needs a conversation loop. In our case, we're building a CLI tool that feels like chatting with a helpful assistant.

Here's the core structure from [main.swift](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/main.swift):

```swift
private func runLoop() async {
    print("\nChat with Nimbo (use 'ctrl-c' to quit)\n")

    let agent = Agent(
        apiKey: apiKey,
        system: "You are Nimbo, a concise CLI assistant."
    )

    while let line = input() {
        if line.isEmpty { continue }
        let answer = await agent.respond(line)
        print("\(display("Nimbo", in: .green)): \(answer)")
    }
}
```

Simple, right? We:
1. Create an agent with a system prompt.
2. Get user input in a loop.
3. Ask the agent to respond.
4. Print the response.

The real magic happens inside that `agent.respond()` call. Let's peek under the hood.

The [Agent class](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Agent.swift) maintains a conversation history:

```swift
final class Agent {
    private let client: OpenAIService
    private var history: [ChatCompletionParameters.Message]
    private let tools: [Tool]

    init(apiKey: String, system: String) {
        client = OpenAIServiceFactory.service(apiKey: apiKey)
        history = [.init(role: .system, content: .text(system))]
        tools = [ListFiles(), ReadFile(), EditFile()]
    }

    func respond(_ text: String) async -> String {
        history.append(.init(role: .user, content: .text(text)))
        // ... magic happens here ...
    }
}
```

Notice that `history` array? That's our context window filling up. Every message (yours, the model's, and tool results) gets appended to it.

### What We Have So Far

At this point, we have a basic chat loop but **no tools yet**. The agent can only have conversations. It can't actually do anything with files.

<img src="/images/blog/nimbo/nimbo-1.png" alt="Nimbo Basic" class="img-frame" />

## Step 2: Teaching Your Agent to Use Tools

Tools are just functions with fancy descriptions. The LLM doesn't actually execute code; it just tells us *which* tool to call and *with what arguments*.

In Swift, we define tools using a protocol ([Tool.swift](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Tools/Tool.swift)):

```swift
protocol Tool {
    var name: String { get }
    var chatTool: ChatCompletionParameters.Tool { get }
    var exec: (Data?) -> String { get }
}
```

Let's look at a concrete example: the [ReadFile tool](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Tools/ReadFile.swift):

```swift
struct ReadFile: Tool {
    var name = "read_file"

    var chatTool: ChatCompletionParameters.Tool = {
        let schema = JSONSchema(
            type: .object,
            properties: ["path": JSONSchema(type: .string)]
        )

        let function = ChatCompletionParameters.ChatFunction(
            name: "read_file",
            description: """
                Read the contents of a given relative file path.
                Use this when you want to see what's inside a file.
                """,
            parameters: schema
        )

        return .init(function: function)
    }()

    var exec: (Data?) -> String = { input in
        guard let path = input.asPath(defaultPath: nil) else {
            return "<error> Invalid JSON arguments"
        }
        return ReadFile.readFile(atPath: path)
    }
}
```

Three key parts:
1. **Name**: What the tool is called.
2. **Description**: Instructions for the LLM on when to use it.
3. **Execution**: The actual Swift function that does the work.

The LLM sees the description and decides, "Oh, the user wants to see a file. I should call `read_file` with path `foo.txt`!"

### What We Have So Far

Now we've defined our tools! The agent knows **what tools exist** and **when to use them**, but it still can't execute them. If you ask it to read a file, it will try to call the tool, but nothing will happen yet.

<img src="/images/blog/nimbo/nimbo-3.png" alt="Nimbo Basic" class="img-frame" />

## Step 3: The Tool Execution Dance

Here's where it gets fun. When the model responds, it might:
- Return a text answer (we're done!).
- Request to call one or more tools (keep going!).

Our agent needs to detect tool calls and execute them ([Agent.swift](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Agent.swift)):

```swift
func respond(_ text: String) async -> String {
    history.append(.init(role: .user, content: .text(text)))

    do {
        for _ in 0..<Agent.maxToolIterations {
            let response = try await requestCompletion()
            let assistantMessage = try firstAssistantMessage(from: response)
            appendAssistantMessage(assistantMessage)

            // Check if the model wants to use tools
            if let calls = assistantMessage.toolCalls, !calls.isEmpty {
                executeToolCalls(calls)
                continue  // Loop back and ask the model again
            }

            // No tools requested, we have our answer!
            return assistantMessage.content ?? ""
        }

        throw AgentError.toolIterationLimitReached
    } catch {
        return "<error> \(error.localizedDescription)"
    }
}
```

Notice that `maxToolIterations` constant? That's our safety net. Without it, an agent could theoretically loop forever.

The `executeToolCalls` method is straightforward:

```swift
private func executeToolCalls(_ calls: [ToolCall]) {
    for call in calls {
        let toolMessage = perform(call)
        history.append(toolMessage)  // Add result to history!
    }
}

private func perform(_ call: ToolCall) -> ChatCompletionParameters.Message {
    let toolName = call.function.name ?? "<nil>"
    let rawArgs = call.function.arguments

    print("tool: \(toolName)(\(rawArgs))")

    let result = {
        if let tool = tools.first(where: { $0.name == toolName }) {
            return tool.exec(rawArgs.data(using: .utf8))
        } else {
            return "<error> Unknown tool: \(toolName)"
        }
    }()

    return .init(role: .tool, content: .text(result), toolCallID: call.id)
}
```

We:
1. Find the matching tool by name.
2. Execute it with the provided arguments.
3. Package the result as a message.
4. Add it to the history.

The model sees this result on the next iteration and can decide what to do next.

### What We Have So Far

Now the agent can **execute a single tool**! It can call `read_file` or `list_files` and actually get a result. But it stops there. It can't chain multiple tools together yet.

<img src="/images/blog/nimbo/nimbo-4.png" alt="Nimbo Basic" class="img-frame" />

### The Other Tools: ListFiles and EditFile

Following the same pattern as `ReadFile`, Nimbo includes two more essential tools that round out its capabilities:

**[ListFiles](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Tools/ListFiles.swift)** - Navigate the directory structure:

```swift
struct ListFiles: Tool {
    var name = "list_files"

    var chatTool: ChatCompletionParameters.Tool = {
        let function = ChatCompletionParameters.ChatFunction(
            name: "list_files",
            description: """
                List files and directories at a given relative path.
                Use this when you need to inspect the project structure.
                Defaults to the current working directory when no path is supplied.
                """,
            parameters: schema
        )
        return .init(function: function)
    }()

    var exec: (Data?) -> String = { input in
        let path = input.asPath(defaultPath: ".")
        return ListFiles.listDirectory(atPath: path.asURL)
    }
}
```

The tool caps results at 200 entries to prevent overwhelming the context window. When a directory has more files, it shows a truncated list with a count of remaining items.

**[EditFile](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Tools/EditFile.swift)** - Make surgical changes to files:

```swift
struct EditFile: Tool {
    var name = "edit_file"

    var chatTool: ChatCompletionParameters.Tool = {
        let function = ChatCompletionParameters.ChatFunction(
            name: "edit_file",
            description: """
                Make edits to a text file by replacing an exact match of `old_str` with `new_str`.
                The replacement must be unique and `old_str` must differ from `new_str`.
                Creates the file when it does not exist and `old_str` is empty.
                """,
            parameters: schema  // Expects: path, old_str, new_str
        )
        return .init(function: function)
    }()

    var exec: (Data?) -> String = { data in
        let arguments = try? JSONDecoder().decode(Arguments.self, from: data)
        return EditFile.process(arguments)
    }
}
```

The `EditFile` tool is clever. It:
- **Creates new files** when `old_str` is empty.
- **Updates existing files** by replacing exact matches.
- **Validates uniqueness** - the `old_str` must match exactly once in the file.
- **Prevents accidents** - `old_str` and `new_str` must be different.

This design forces the agent to be precise. It can't make ambiguous edits or accidentally replace the wrong text. If the pattern matches multiple times, the tool returns an error asking the model to be more specific.

Together, these three tools (`ListFiles`, `ReadFile`, `EditFile`) give the agent everything it needs to explore and modify a codebase. The model decides which tools to use and in what order. All we did was describe what they do.

## Step 4: Keeping the Conversation Going

Remember our context window discussion? Every tool call adds to it:

```
User: "Can you check what's in the src folder?"
→ History grows by 1 message

Agent: (calls list_files tool)
→ History grows by 1 message (the tool call)

Tool result: [long list of files]
→ History grows by 1 message (the result)

Agent: "Sure! The src folder contains..."
→ History grows by 1 message (the response)
```

Four messages for one simple request! Now imagine:
- Reading a 500-line file.
- Editing multiple files.
- Running this back and forth 20 times.

Your context window fills up fast. That's why the [ReadFile tool](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Tools/ReadFile.swift) caps file contents to 100KB:

```swift
let capped = fileData.prefix(100_000)
if let text = String(data: capped, encoding: .utf8) {
    return text
}
```

It's a balance: give the model enough context to be useful, but not so much that we blow through our budget or hit the limit.

## Step 5: Putting It All Together

Let's trace through a real interaction to see how everything connects:

**User types:** `"Create a hello.txt file with the content 'Hello, Nimbo!'"`

1. **Input is added to history** - `history.append(userMessage)`
2. **Agent calls LLM** - Sends entire history with tool definitions.
3. **LLM responds** - "I'll use the `edit_file` tool."
4. **Agent executes tool** - Creates the file.
5. **Tool result added to history** - `"<success> File created"`
6. **Agent calls LLM again** - With the updated history.
7. **LLM responds** - "Done! I created hello.txt with your message."
8. **User sees response** - Mission accomplished!

Here's the beautiful part: **You never taught the model when to use which tool**. You just described what each tool does, and it figured out the right sequence on its own.

This emergent behavior is what makes agents feel magical. The model chains together tools, handles errors, and adjusts its strategy, all from natural language descriptions.

### What We Have Now: A Complete Agent!

At this point, we have a **fully functional agent**. It can:
- Chat with users.
- Understand when to use tools.
- Execute tools and get results.
- Chain multiple tool calls together.
- Loop until the task is complete.

<img src="/images/blog/nimbo/nimbo-5.png" alt="Nimbo Basic" class="img-frame" />

## Real-World Considerations

Our Nimbo agent is educational, but production agents need more polish.

### Safety First
```swift
private static let maxToolIterations = 8
```
We limit iterations to prevent infinite loops. Production systems use more sophisticated safety measures:
- Token budgets per conversation.
- Rate limiting on tool calls.
- Sandboxing for dangerous operations.

### Error Handling
Notice how our tools return `<error>` strings? The model can actually read these and adjust:

```swift
return "<error> Could not read file at path: \(path)"
```

The LLM sees this and might try a different path or ask the user for clarification.

### Context Management
Production agents employ tricks like:
- **Summarization** - Compress old messages.
- **Selective forgetting** - Drop less important context.
- **RAG (Retrieval Augmented Generation)** - Store context in a database, retrieving only what's needed.

## Let's See It In Action

Want to run Nimbo? Here's how:

```bash
git clone https://github.com/gscalzo/Nimbo.git
cd Nimbo
export OPENAI_API_KEY="your-key-here"
swift run
```

Now let's walk through a real example to see how the agent chains tools together.

### Example 1: The Curious Case of the Missing TODO

Let's ask our agent to help us find something in a messy project:

```
You: I think I left a TODO comment somewhere about refactoring the authentication.
     Can you help me find it?

tool: list_files({"path": "."})

Nimbo: I'll search through your Swift files. Let me check the Sources directory.

tool: list_files({"path": "Sources"})

tool: read_file({"path": "Sources/AuthManager.swift"})

Nimbo: Found it! In AuthManager.swift, line 42:

      // TODO: Refactor this to use async/await instead of completion handlers
      func login(email: String, password: String, completion: @escaping (Result<User, Error>) -> Void) {
          // ... old-style callback code ...
      }

      Looks like you wanted to modernize this to use Swift concurrency. Want me
      to create a new version using async/await?

You: Yes, please! Show me what that would look like.

tool: edit_file({"path": "AuthManager_v2.swift", "old_content": "", "new_content": "..."})

Nimbo: Done! I created AuthManager_v2.swift with the modernized version:

      func login(email: String, password: String) async throws -> User {
          // ... clean async/await code ...
      }

      Much cleaner! No more callback hell.
```

Notice what happened? The agent:
1. **Understood vague intent**: "TODO about authentication" is pretty fuzzy.
2. **Explored systematically**: Listed directories, then files.
3. **Actually read the code**: Found the specific TODO comment.
4. **Offered value**: Suggested creating the refactored version.
5. **Executed creatively**: Wrote modern Swift code unprompted.

The agent didn't just find text. It understood context and anticipated your next need.

### Example 2: Building a Silly Game

Now let's have some fun and ask it to create something from scratch:

```
You: Create a command-line game where I guess a random emoji.
     Make it playful!

tool: edit_file({"path": "EmojiGuesser.swift", "old_content": "", "new_content": "..."})

Nimbo: Created EmojiGuesser.swift! Here's your game:

      import Foundation

      let emojiSet = ["🎸", "🦖", "🌮", "🚀", "🎨", "🎪", "🦄", "🌈"]

      func playEmojiGame() {
          let secret = emojiSet.randomElement()!
          print("🎮 I'm thinking of an emoji from this set: \(emojiSet.joined())")
          print("Can you guess which one? Type it!")

          while let guess = readLine() {
              if guess == secret {
                  print("🎉 YES! You found it! You're an emoji whisperer!")
                  break
              } else if emojiSet.contains(guess) {
                  print("❌ Nope! Try again, detective!")
              } else {
                  print("🤔 That's not even in the set! Pick from: \(emojiSet.joined())")
              }
          }
      }

      playEmojiGame()

      Try running it with: swift EmojiGuesser.swift

You: This is fun, but can you add a hint system after 3 wrong guesses?

tool: read_file({"path": "EmojiGuesser.swift"})

tool: edit_file({"path": "EmojiGuesser.swift", "old_content": "...", "new_content": "..."})

Nimbo: Updated! Now after 3 wrong guesses, it'll give you a hint like:
      "🕵️ Hint: It rhymes with... just kidding, emojis don't rhyme!
       But it starts with 🎯 category: Fun!"

      The game tracks attempts and offers encouragement. Much better!
```

Even more impressive! The agent:
1. **Got creative**: Added personality to the game without being asked.
2. **Made good choices**: Picked fun emojis, wrote playful strings.
3. **Understood iteration**: Read the existing file before modifying.
4. **Applied the edit correctly**: Replaced the old game logic with the enhanced version.
5. **Explained the improvement**: Told you what changed.

### What This Shows

These examples demonstrate the three key superpowers of AI agents:

1. **Tool Chaining**: The agent decides which tools to use and in what order.
2. **Context Awareness**: It remembers what it did (because it's all in the history!).
3. **Creative Reasoning**: It doesn't just execute commands; it thinks about what would make the result better.

The real magic? **You didn't program any of this logic**. You just:
- Described what each tool does.
- Gave the agent access to them.
- Let the language model figure out the rest.

<img src="/images/blog/nimbo/nimbo-6.png" alt="Nimbo Basic" class="img-frame" />
<img src="/images/blog/nimbo/nimbo-7.png" alt="Nimbo Basic" class="img-frame" />

## The Power of Simplicity

Here's what we learned:

1. **Agents are loops**: Just keep asking the model "what next?"
2. **Tools are descriptions**: The LLM chooses, you execute.
3. **Context is precious**: Every message costs tokens and attention.
4. **Emergent behavior is real**: Complex actions arise from simple rules.

The entire Nimbo agent is less than 300 lines of Swift. Yet it can:
- Navigate file systems.
- Read and modify files.
- Chain multiple operations.
- Handle errors gracefully.

That's the power of building on top of a language model. You're not coding every possibility; you're creating a space where the model can think and act.

## What's Next?

Now that you understand the fundamentals, you can:

- **Add more tools**: Web search, API calls, database queries.
- **Improve context management**: Implement summarization or RAG.
- **Build domain-specific agents**: Focus on your particular use case.
- **Create agent networks**: Have multiple agents collaborate.

The code is all on [GitHub](https://github.com/gscalzo/Nimbo). Fork it, break it, improve it.

And next time you use Claude Code or Cursor, you'll know exactly what's happening under the hood: a loop, some tools, and a very smart intern making decisions.

---

**Want to dive deeper?** Check out:
- [The full Nimbo source code](https://github.com/gscalzo/Nimbo)
- [Anthropic's guide to tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
- [OpenAI's function calling docs](https://platform.openai.com/docs/guides/function-calling)

**Questions? Thoughts?** Hit me up on [Twitter](https://twitter.com/giordanoscalzo) or [LinkedIn](https://linkedin.com/in/giordanoscalzo). I'd love to see what you build!
