+++
title = "Where Alan Turing Walked: Google DevFest at the National Museum of Computing"
date = 2025-11-16T00:00:00+00:00
draft = false
tags = ["DevFest", "GDG-Bletchley", "Bletchley-Park", "National-Museum-of-Computing", "AI", "events"]
description = "Reflections on Google DevFest hosted by GDG Bletchley inside the National Museum of Computing at Bletchley Park, an inspired venue where the history of computing meets today’s AI."
images = ["/images/blog/devfest-bletchley/colossus.jpeg"]
+++

<img src="/images/blog/devfest-bletchley/colossus.jpeg" alt="Colossus at The National Museum of Computing" class="img-hero" />

Google DevFest took place inside the National Museum of Computing at Bletchley Park. Walking past codebreaking rooms and wartime machines on the way to talks about AI made the history unusually hard to ignore. Alan Turing worked at Bletchley Park during the Second World War, and later proposed the test that still bears his name.

GDG Bletchley mixed hands-on sessions with talks and left enough room for hallway conversations among the museum's working restorations.

## Welcome and keynote

<img src="/images/blog/devfest-bletchley/keynote.jpeg" alt="Keynote stage at DevFest Bletchley" class="img-frame" />

The GDG Bletchley organizers opened the day with a light, friendly keynote, some playful interactions with Gemini, and, true to live demos, one thing that didn’t quite cooperate. Three speakers framed the day:

- [Rachael Deacon‑Smith](https://www.linkedin.com/in/rachael-ds/) (Developer Advocate, Google) introduced Google’s Agents Dev Kit (ADK) and its BigQuery integration. I’ve been planning to use BigQuery at NewDay for monitoring and alerting, so I immediately wanted to try ADK for querying that data.
- [Daniela Petruzalek](https://www.linkedin.com/in/petruzalek/) (Developer Relations Engineer, Google) showed how to use Go with GenAI via Genkit, including how flows and tools structure an LLM application in a way that’s testable and production‑friendly in Go.
- [Peter Friese](https://www.linkedin.com/in/peterfriese/) (Staff Developer Advocate, Firebase) closed the segment by asking “can machines think?”, bringing the conversation back to Alan Turing.

## Beyond Chatbots: BigQuery Data Agents with ADK

<img src="/images/blog/devfest-bletchley/rachael.jpeg" alt="Rachael Deacon‑Smith on stage" class="img-frame" />

[Rachael Deacon‑Smith](https://www.linkedin.com/in/rachael-ds/) walked through ADK concepts and patterns, with a preview of features shipping in the coming weeks. The parts I noted were:

- Agents as composable units: tools, memory, orchestration, and guardrails.
- BigQuery integration as a first‑class capability for data retrieval and enrichment.
- The path from a demo to production, including observability, evaluation and deployment targets.

She showed how continuous queries can stream fresh data to agents, and argued for human oversight of high-impact actions.

I left with a handful of scenarios to try immediately for data‑driven monitoring and alerting.

## Supercharging GitHub Copilot Context for accurate results with Agent mode and MCP

<img src="/images/blog/devfest-bletchley/sergio.jpeg" alt="Sergio Sisternes on stage" class="img-frame" />

[Sergio Sisternes](https://www.linkedin.com/in/sesispla/) ran a highly interactive session on making Copilot genuinely context‑aware. His focus was Copilot Agent Mode + MCP (Model Context Protocol) to standardize how agents pull external context. Highlights I noted:

- Using Copilot’s newer agent‑style interactions to steer multi‑step tasks.
- Injecting richer project context and domain knowledge so generations land closer to spec.
- How MCP (Model Context Protocol) and custom tools can expand Copilot beyond the editor.

I came away with several changes to try in my daily Copilot workflow.

## Multi‑Agent Magic: Build Your First AI Team with Google ADK

<img src="/images/blog/devfest-bletchley/sonali.jpeg" alt="Sonali Goel running the workshop" class="img-frame" />

[Sonali Goel](https://www.linkedin.com/in/sonali-goel-tech/) used ADK with the Gemini API (via `adk web`) to build an agent that plans tasks and coordinates other agents. The result was a working starter project rather than a slide-only demo. I plan to borrow parts of its structure for my own experiments:

- Multi‑agent study assistant structure with orchestration and tools
- Clear separation of flows and capabilities
- Ready‑to‑run setup to explore Gemini‑powered agents locally and in the cloud

Repo: https://github.com/goelsonali/study_assistant

## Lunch, Colossus and the Lorenz break

<img src="/images/blog/devfest-bletchley/daniel.jpeg" alt="Museum volunteer explaining Colossus and Tunny" class="img-frame" />

During lunch, a museum volunteer named Daniel demonstrated the rebuilt Colossus computer. He explained how the original helped decipher the German High Command’s Lorenz cipher, nicknamed “Tunny”, a teleprinter cipher more complex than Enigma.

Before Colossus, the team experimented with electromechanical “Heath Robinson” machines. Colossus replaced the fragile mechanics with thousands of vacuum tubes, electronic logic and paper-tape input, making the statistical attacks used to recover Lorenz keys much faster. Later that afternoon we went back to discussing modern AI, with the working reconstruction still nearby.

## Ethics of AI - What can we learn from Asimov's Three Laws of Robotics?

<img src="/images/blog/devfest-bletchley/patty.jpeg" alt="Patty O’Callaghan on stage" class="img-frame" />

I caught the second half of [Patty O’Callaghan](https://www.linkedin.com/in/patty-ocallaghan/)'s talk on responsible AI. She connected Asimov’s Three Laws to current AI ethics and regulation, then used an interactive poll to test the ideas against real-world scenarios.

## Eat smarter - Building an AI-powered meal planner with Firebase

<img src="/images/blog/devfest-bletchley/peter.jpeg" alt="Peter Friese presenting" class="img-frame" />

[Peter Friese](https://www.linkedin.com/in/peterfriese/) showed how to wire GenAI into an iOS app using Firebase and Genkit:

- Use Genkit flows to encapsulate prompts, tools, and safety in server‑side logic.
- Expose clean APIs from Firebase to the iOS client for predictable, testable integrations.
- Keep an eye on evaluation and guardrails so UX stays reliable as models change.

Covered: secure LLM calls from mobile, multimodal prompts, structured outputs, embeddings for semantic search, RAG over user data, and monitoring token usage.

I want to try some of these ideas in my own app, [Pocket Sommelier](https://www.pocketsommelier.app/).

## The AI in Your Pocket: Building Offline Gemini Apps with the Browser

<img src="/images/blog/devfest-bletchley/olorunfemi.jpeg" alt="Olorunfemi Davis on stage" class="img-frame" />

[Olorunfemi Davis](https://www.linkedin.com/in/olorunfemidavis/) ran Gemini Nano locally in Chrome for an offline-first app. He demonstrated the built-in Prompt, Translator, Language Detector, Summarizer, Writer/Rewriter and Proofreader APIs, then covered testing and debugging for on-device AI. Keeping work on the device can improve both privacy and latency.

## Raffle and wrap‑up

The day ended with a fun raffle (I won a Google hat and two Google Cloud sports T‑shirts!) and closing remarks from the GDG Bletchley team.

## My biggest takeaway

Agents Dev Kit. Between Rachael’s talk and Sonali’s workshop, ADK shot to the top of my exploration list. Combined with BigQuery, it feels like the missing piece for a few monitoring and alerting ideas I’ve been sketching.
