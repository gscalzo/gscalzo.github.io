+++
title = "Demystifying AI Coding Agents in Swift"
date = 2025-11-05T00:00:00+00:00
draft = false
tags = ["Swift", "AI", "LLM", "Coding Agents", "OpenAI"]
description = "A small AI coding agent in Swift, built from a model, a tool interface and a loop."
+++

<img src="/images/blog/nimbo/hero.png" alt="Hero Image" class="img-hero" />

## The small loop behind an agent

AI coding agents can look opaque. You type a request and they search files, write code, refactor functions and decide what to do next.

The basic mechanism is much smaller than the behaviour it produces.

I tend to understand things by building them, so after reading Amp's article ["How to Build an Agent"](https://ampcode.com/how-to-build-an-agent), I tried the same idea in Swift.

The result is Nimbo, a small coding agent that can list directories, read files and edit code. Its core is a loop, a few tools and a language model with opinions.

It is not a replica of Claude Code, Cursor or GitHub Copilot Workspace, but it exposes the mechanism those products build on.

## What an AI coding agent needs

An AI coding agent boils down to three things:

1. **A language model** (like GPT-5, Claude, or Gemini)
2. **A set of tools** it can call (functions that do real work)
3. **A loop** that keeps the conversation going

<img src="/images/blog/nimbo/agent-loop.png" alt="Agent Loop Image" class="img-frame" />

The model cannot touch the filesystem itself. The agent loop asks what to do next, performs the requested tool call, reports the result and asks again. That continues until the model returns an answer instead of another tool call.

### The context window

Language models do not remember a conversation in the way people do. On each request, the application sends the conversation history again.

<img src="/images/blog/nimbo/context-window.png" alt="Context Window" class="img-frame" />

That working memory is the **context window**. Modern models commonly support between 128K and 200K tokens, roughly 100,000 to 150,000 words.

As the agent runs:

- Every file it reads gets added to the history.
- Every tool call and result takes up space.
- The model needs to process more and more text each turn.
- Eventually, you hit the limit.

When the context fills up:

1. **Performance degrades** because the model struggles to "pay attention" to everything.
2. **Costs increase** because each request processes more tokens.
3. **You hit a hard limit** when the API simply rejects your request.

Production agents manage this with summarisation, selective memory and context pruning. Nimbo keeps the full history because its purpose is to make the loop easy to see.

## What we are building

We will build **Nimbo** in five steps:

1. Set up a basic chat loop.
2. Define the tools.
3. Execute tool calls.
4. Feed each result back to the model.
5. Handle limits and errors.

All the code is in the [Nimbo repository](https://github.com/gscalzo/Nimbo).

<img src="/images/blog/nimbo/agent-interaction.png" alt="Agent Interaction" class="img-frame" />

## Step 1: Build the chat loop

Nimbo starts as a command-line chat client.

The core structure is in [main.swift](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/main.swift):

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

This code does four things:
1. Create an agent with a system prompt.
2. Get user input in a loop.
3. Ask the agent to respond.
4. Print the response.

The agent work happens inside `agent.respond()`.

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

The `history` array holds the context sent to the model. It contains user messages, model responses and, later, tool results.

At this point, Nimbo can hold a conversation but cannot touch files.

<img src="/images/blog/nimbo/nimbo-1.png" alt="Nimbo Basic" class="img-frame" />

## Step 2: Define the tools

A tool pairs a function with a description the model can read. The model does not execute the function. It returns the tool name and arguments, and the application decides whether to run it.

In Swift, we define tools using a protocol ([Tool.swift](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Tools/Tool.swift)):

```swift
protocol Tool {
    var name: String { get }
    var chatTool: ChatCompletionParameters.Tool { get }
    var exec: (Data?) -> String { get }
}
```

Here is the [ReadFile tool](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Tools/ReadFile.swift):

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

Each tool has three parts:
1. **Name**: What the tool is called.
2. **Description**: Instructions for the LLM on when to use it.
3. **Execution**: The actual Swift function that does the work.

Given that description, the model can return a call such as `read_file` with the path `foo.txt`. We have described the tools, but Nimbo still needs code to execute the calls.

<img src="/images/blog/nimbo/nimbo-3.png" alt="Nimbo Basic" class="img-frame" />

## Step 3: Execute tool calls

The model can return a text answer or request one or more tools. A text answer ends the loop. A tool request keeps it running.

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

`maxToolIterations` prevents the agent from looping forever.

The `executeToolCalls` method runs each requested tool:

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

For each call, Nimbo:
1. Find the matching tool by name.
2. Execute it with the provided arguments.
3. Package the result as a message.
4. Add it to the history.

The model sees this result on the next iteration and can decide what to do next.

Nimbo can now execute `read_file` or `list_files` and capture the result. The next step is to return that result to the model so it can choose another tool.

<img src="/images/blog/nimbo/nimbo-4.png" alt="Nimbo Basic" class="img-frame" />

### ListFiles and EditFile

Nimbo includes two more tools built with the same protocol:

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

`EditFile`:
- **Creates new files** when `old_str` is empty.
- **Updates existing files** by replacing exact matches.
- **Validates uniqueness**: `old_str` must match exactly once in the file.
- **Rejects no-op edits**: `old_str` and `new_str` must be different.

This design forces the agent to be precise. It can't make ambiguous edits or accidentally replace the wrong text. If the pattern matches multiple times, the tool returns an error asking the model to be more specific.

Together, `ListFiles`, `ReadFile` and `EditFile` let the agent explore and modify a codebase. The model chooses the order from their descriptions.

## Step 4: Feed results back

Every tool call adds to the history:

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

One request has already added four messages. Reading a 500-line file, editing several files and repeating the loop twenty times consumes the context quickly.
That is why the [ReadFile tool](https://github.com/gscalzo/Nimbo/blob/main/Sources/NimboCLI/Tools/ReadFile.swift) caps file contents at 100KB:

```swift
let capped = fileData.prefix(100_000)
if let text = String(data: capped, encoding: .utf8) {
    return text
}
```

The cap leaves the model enough context to work without allowing one file to consume the whole window.

## Step 5: Put the loop together

Here is one complete interaction:

**User types:** `"Create a hello.txt file with the content 'Hello, Nimbo!'"`

1. **Input is added to history** - `history.append(userMessage)`
2. **Agent calls LLM** - Sends entire history with tool definitions.
3. **LLM responds** - "I'll use the `edit_file` tool."
4. **Agent executes tool** - Creates the file.
5. **Tool result added to history** - `"<success> File created"`
6. **Agent calls LLM again** - With the updated history.
7. **LLM responds** - "Done! I created hello.txt with your message."
8. **User sees response** - The loop ends.

We did not encode rules for when to use each tool. Their descriptions gave the model enough information to choose a sequence.

That is the behaviour people experience as an agent: the model chains tools, reads errors and adjusts its next request.

At this point Nimbo can:

- Chat with users.
- Understand when to use tools.
- Execute tools and get results.
- Chain multiple tool calls together.
- Loop until the task is complete.

<img src="/images/blog/nimbo/nimbo-5.png" alt="Nimbo Basic" class="img-frame" />

## Limits of the example

Nimbo is educational. A production agent needs stricter limits and better context management.

### Limit the loop
```swift
private static let maxToolIterations = 8
```
Nimbo limits iterations to prevent an infinite loop. Production systems also use measures such as:
- Token budgets per conversation.
- Rate limiting on tool calls.
- Sandboxing for dangerous operations.

### Return errors to the model

The tools return `<error>` strings in the same channel as successful results:

```swift
return "<error> Could not read file at path: \(path)"
```

The model can then try another path or ask the user for clarification.

### Manage context

Production agents may use:
- **Summarization** - Compress old messages.
- **Selective forgetting** - Drop less important context.
- **RAG (retrieval-augmented generation)** - Store context outside the conversation and retrieve only what is needed.

## Run Nimbo

Clone the repository, set an API key and run it:

```bash
git clone https://github.com/gscalzo/Nimbo.git
cd Nimbo
export OPENAI_API_KEY="your-key-here"
swift run
```

The following examples show how the tool chain behaves.

### Example 1: Find a missing TODO

First, ask Nimbo to find a note in an unfamiliar project:

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

The agent:
1. **Understood vague intent**: "TODO about authentication" is pretty fuzzy.
2. **Explored systematically**: Listed directories, then files.
3. **Actually read the code**: Found the specific TODO comment.
4. **Suggested a follow-up**: Offered to create the refactored version.
5. **Made the requested edit**: Wrote the async version after the user agreed.

The loop did more than search for text. It used the surrounding code to propose a follow-up, then waited for approval before editing.

### Example 2: Build a small game

The same three tools can also create and revise a file:

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

This time the agent:
1. **Got creative**: Added personality to the game without being asked.
2. **Made good choices**: Picked fun emojis, wrote playful strings.
3. **Understood iteration**: Read the existing file before modifying.
4. **Applied the edit**: Replaced the old game logic with the new version.
5. **Reported the change**: Told the user what it had added.

### What the examples show

The examples exercise three capabilities:

1. **Tool Chaining**: The agent decides which tools to use and in what order.
2. **Context awareness**: It can use earlier tool results because they remain in the history.
3. **Model-generated choices**: It can propose a next step that was not hard-coded into the loop.

The application code does not contain the sequence. It only:
- Described what each tool does.
- Gave the agent access to them.
- Lets the language model choose the next call.

<img src="/images/blog/nimbo/nimbo-6.png" alt="Nimbo Basic" class="img-frame" />
<img src="/images/blog/nimbo/nimbo-7.png" alt="Nimbo Basic" class="img-frame" />

## The whole mechanism

Nimbo reduces an agent to four ideas:

1. **Agents are loops**: Ask the model for the next action until it returns a final answer.
2. **Tools are descriptions**: The LLM chooses, you execute.
3. **Context is precious**: Every message costs tokens and attention.
4. **Sequences are model-generated**: The loop does not hard-code every possible task.

The entire Nimbo agent is less than 300 lines of Swift. Yet it can:
- Navigate file systems.
- Read and modify files.
- Chain multiple operations.
- Handle errors gracefully.

The model handles the open-ended choice of what to do next. The Swift code controls what it is allowed to do and when the loop must stop.

## Next steps

From here, you can:

- **Add more tools**: Web search, API calls, database queries.
- **Improve context management**: Implement summarization or RAG.
- **Build domain-specific agents**: Focus on your particular use case.
- **Create agent networks**: Have multiple agents collaborate.

The code is on [GitHub](https://github.com/gscalzo/Nimbo). Fork it, break it and improve it.

The commercial coding agents are much larger systems, but underneath them is the same pattern: a loop, a set of tools and a model choosing the next action.

---

Further reading:
- [The full Nimbo source code](https://github.com/gscalzo/Nimbo)
- [Anthropic's guide to tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
- [OpenAI's function calling docs](https://platform.openai.com/docs/guides/function-calling)
