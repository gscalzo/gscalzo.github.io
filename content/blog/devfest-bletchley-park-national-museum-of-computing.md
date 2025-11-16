+++
title = "Where Alan Turing Walked: Google DevFest at the National Museum of Computing"
date = 2025-11-16T00:00:00+00:00
draft = false
tags = ["DevFest", "GDG-Bletchley", "Bletchley-Park", "National-Museum-of-Computing", "AI", "events"]
description = "Reflections on Google DevFest hosted by GDG Bletchley inside the National Museum of Computing at Bletchley Park, an inspired venue where the history of computing meets today’s AI."
images = ["/images/blog/devfest-bletchley/colossus.jpeg"]
+++

![Colossus at The National Museum of Computing](/images/blog/devfest-bletchley/colossus.jpeg)

Walking into the National Museum of Computing at Bletchley Park for Google DevFest felt like stepping through a living timeline, past codebreaking rooms and wartime machines, straight into today’s conversations about AI. It’s hard to imagine a better venue: the place where Alan Turing worked during WWII, the mind behind the Turing Test, makes an AI conference feel perfectly at home.

Huge kudos to GDG Bletchley for organizing a day that balanced hands‑on sessions with thoughtful talks. The energy in the museum, surrounded by working restorations and the stories of the people who built our field, made every hallway chat and demo feel a little more significant.

## Welcome & Keynote

![Keynote stage at DevFest Bletchley](/images/blog/devfest-bletchley/keynote.jpeg)

The GDG Bletchley organizers opened the day with a light, friendly keynote, some playful interactions with Gemini, and, true to live demos, one thing that didn’t quite cooperate. Three speakers framed the day:

- [Rachael Deacon‑Smith](https://www.linkedin.com/in/rachael-ds/) (Developer Advocate, Google) introduced Google’s Agents Dev Kit (ADK) and how it integrates with BigQuery. This immediately resonated for me: I’ve been planning to use BigQuery at NewDay for monitoring/alerting, and ADK looks like a strong add‑on for agentic querying and data‑aware workflows.
- [Daniela Petruzalek](https://www.linkedin.com/in/petruzalek/) (Developer Relations Engineer, Google) showed how to use Go with GenAI via Genkit, including how flows and tools structure an LLM application in a way that’s testable and production‑friendly in Go.
- [Peter Friese](https://www.linkedin.com/in/peterfriese/) (Staff Developer Advocate, Firebase) closed the segment with a thoughtful thread on “can machines think?”, looping the conversation back to Alan Turing and the origins of our field.

## Beyond Chatbots: BigQuery Data Agents with ADK

![Rachael Deacon‑Smith on stage](/images/blog/devfest-bletchley/rachael.jpeg)

[Rachael Deacon‑Smith](https://www.linkedin.com/in/rachael-ds/) walked through ADK concepts and patterns, with a preview of features shipping in the coming weeks. The framing that clicked for me:

- Agents as composable units: tools, memory, orchestration, and guardrails.
- BigQuery integration as a first‑class capability for data retrieval and enrichment.
- Sensible path from demo to production (observability, evaluation, and deployment targets).

She emphasized using continuous queries to stream fresh data to agents, and keeping humans‑in‑the‑loop for oversight on high‑impact actions, pushing well beyond “just a chatbot.”

I left with a handful of scenarios to try immediately for data‑driven monitoring and alerting.

## Supercharging GitHub Copilot Context for accurate results with Agent mode and MCP

![Sergio Sisternes on stage](/images/blog/devfest-bletchley/sergio.jpeg)

[Sergio Sisternes](https://www.linkedin.com/in/sesispla/) ran a highly interactive session on making Copilot genuinely context‑aware. His focus was Copilot Agent Mode + MCP (Model Context Protocol) to standardize how agents pull external context. Highlights I noted:

- Using Copilot’s newer agent‑style interactions to steer multi‑step tasks.
- Injecting richer project context and domain knowledge so generations land closer to spec.
- How MCP (Model Context Protocol) and custom tools can expand Copilot beyond the editor.

Lots to apply to my daily Copilot workflow.

## Multi‑Agent Magic: Build Your First AI Team with Google ADK

![Sonali Goel running the workshop](/images/blog/devfest-bletchley/sonali.jpeg)

This hands‑on session by [Sonali Goel](https://www.linkedin.com/in/sonali-goel-tech/) delivered exactly what you want from a first build with ADK: a working multi‑agent starter you can extend. Using ADK with Gemini API (via `adk web`), Sonali showed an agent that plans tasks and coordinates other agents to complete them. Her repo is a great reference and I plan to adopt parts of it in my experiments:

- Multi‑agent study assistant structure with orchestration and tools
- Clear separation of flows and capabilities
- Ready‑to‑run setup to explore Gemini‑powered agents locally and in the cloud

Repo: https://github.com/goelsonali/study_assistant

## Lunch, Colossus and the Lorenz break

![Museum volunteer explaining Colossus and Tunny](/images/blog/devfest-bletchley/daniel.jpeg)

During lunch, a museum volunteer, Daniel, gave a fantastic demo that brought Bletchley Park’s codebreaking history to life. We saw the rebuilt Colossus computer running and heard how it was used to help decipher the German High Command’s Lorenz cipher (nicknamed “Tunny”), a far more complex teleprinter cipher than Enigma. Before Colossus, the team experimented with electromechanical “Heath Robinson” machines; Colossus, packed with thousands of vacuum tubes, replaced the fragile mechanics with high‑speed electronic logic and paper‑tape input, dramatically accelerating the statistical attacks needed to recover Lorenz keys. Standing in front of a working Colossus while discussing modern AI was a surreal full‑circle moment.

## Ethics of AI - What can we learn from Asimov's Three Laws of Robotics?

![Patty O’Callaghan on stage](/images/blog/devfest-bletchley/patty.jpeg)

I caught the second half of [Patty O’Callaghan](https://www.linkedin.com/in/patty-ocallaghan/)'s talk on responsible AI. It connected Asimov’s Three Laws to today’s AI ethics and regulation, and included an interactive poll with real‑world scenarios. A timely reminder that capability advances should be paired with safety, transparency, and accountability.

## Eat smarter - Building an AI-powered meal planner with Firebase

![Peter Friese presenting](/images/blog/devfest-bletchley/peter.jpeg)

[Peter Friese](https://www.linkedin.com/in/peterfriese/) delivered a technical, fast‑paced session on wiring GenAI into an iOS app using Firebase and Genkit. The takeaways:

- Use Genkit flows to encapsulate prompts, tools, and safety in server‑side logic.
- Expose clean APIs from Firebase to the iOS client for predictable, testable integrations.
- Keep an eye on evaluation and guardrails so UX stays reliable as models change.

Covered: secure LLM calls from mobile, multimodal prompts, structured outputs, embeddings for semantic search, RAG over user data, and monitoring token usage.

This gave me concrete ideas for my own app, Pocket Sommelier (https://www.pocketsommelier.app/).

## The AI in Your Pocket: Building Offline Gemini Apps with the Browser

![Olorunfemi Davis on stage](/images/blog/devfest-bletchley/olorunfemi.jpeg)

An eye‑opening look from [Olorunfemi Davis](https://www.linkedin.com/in/olorunfemidavis/) at running models locally in Chrome, bringing Gemini Nano to the browser for offline‑first apps. He demonstrated the built‑in Prompt, Translator, Language Detector, Summarizer, Writer/Rewriter, and Proofreader APIs and discussed testing and debugging patterns for on‑device AI. The privacy and latency wins make this an attractive default for many use cases.

## Raffle and wrap‑up

The day ended with a fun raffle (I won a Google hat and two Google Cloud sports T‑shirts!) and closing remarks from the GDG Bletchley team.

## My biggest takeaway

Agents Dev Kit. Between Rachael’s talk and Sonali’s workshop, ADK shot to the top of my exploration list. Combined with BigQuery, it feels like the missing piece for a few monitoring and alerting ideas I’ve been sketching.
