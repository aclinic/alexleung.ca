---
title: "From Writing Code to Orchestrating Agents"
date: "2026-02-03"
excerpt: "I stopped asking AI for answers and started giving it a mission: A 2-year evolution in software engineering."
coverImage: "/assets/blog/from-coder-to-orchestrator/cover.webp"
---

I haven’t hand-written a `for` loop for my day job in months.

In early 2024, my AI usage was typical of many in the industry: I treated chat interfaces like a conversational StackOverflow for snippets and error explanation. Today, in February 2026, my usage has evolved. I no longer write code; I orchestrate a team of software engineering agents.

This post outlines the evolution of my workflow, moving from simple assistance to a fully agentic "Plan, Implement, Verify" loop, and explains the tools and mindset shifts required to make it work.

![Timeline diagram comparing software development workflow in 2024 versus 2026](/assets/blog/from-coder-to-orchestrator/swe-workflow-evolution.webp)

## Phase 1: Skepticism and Mechanical Tasks (Late 2024)

By late 2024, I started experimenting with autonomous coding using **Cline** (an open-source VS Code extension that allows LLMs to edit files directly). However, I remained skeptical of the outputs.

My skepticism stemmed from the industry trend known as **"Vibe Coding"** - the dangerous habit of accepting code just because it runs and looks correct superficially, even though it often introduces subtle bugs and technical debt.

To mitigate this, I often restricted my AI usage to mechanical tasks: boilerplate generation, writing tests for existing code, and routine refactoring. My usage was limited not just by trust, but by friction; anything more complex than a routine task resulted in frustrating amounts of back-and-forth to produce acceptable code.

## Phase 2: The Planning Struggle (Early to Mid 2025)

In 2025, I migrated to **Claude Code** (Anthropic’s agentic CLI tool). Throughout the year, I noticed a distinct improvement in the model's capabilities. I could finally rely on it to create entire files or classes more reliably.

During this period, I got out of the habit of asking for immediate code and shifted to a **Plan/Implement pattern**. However, this phase introduced new failure modes:

- **Over-Engineering:** In the planning stage, the agent often proposed unnecessarily complex architectures (e.g., suggesting a microservice when a simple module would do). I spent significant time debating the plan just to simplify it.
- **Premature Completion:** Once implementation started, the models were confident but brittle. The agent would frequently claim a task was finished while ignoring edge cases, forcing me to micromanage the verification process.

## Phase 3: The Breakthrough (Late 2025 – Present)

I had a breakthrough in my workflow's effectiveness in late 2025 due to a convergence of three factors: the release of **Opus 4.5**, the standardization of context via `CLAUDE.md`, and the adoption of the "Ralph Loop."

### 1. The Engine: Opus 4.5

While previous models were good at syntax, Opus 4.5 brought a step-change improvement in reasoning. It could hold complex architectural constraints in context without "forgetting" the prompt instructions halfway through a task.

### 2. The Onboarding: CLAUDE.md

I realized that agents fail for the same reason new human hires fail: lack of context. I started treating my repository documentation as an "Employee Handbook" for agents, contained in a `CLAUDE.md` file.

I no longer view this file as just configuration; it is team onboarding. Some examples of how one might use it:

- **Architectural Patterns:** "Prefer Layered Architecture (Controller → Service → Repository) over Feature Slices."
- **Testing Standards:** "Use Jest with `describe`/`it` blocks."
- **Stylistic Preferences:** "Prefer composition over inheritance."

Every new agent instance "joins the team" fully briefed on our engineering standards, eliminating the need for me to repeat coding conventions.

### 3. The Pattern: The Ralph Loop

Even though Opus 4.5 had improved reasoning capabilities, it still sometimes suffered from the "Premature Completion" issue from Phase 2. To solve this, I adopted the **Ralph Loop**.

![Ralph Loop flow chart showing Plan -> Implement -> Verify -> Reflect](/assets/blog/from-coder-to-orchestrator/ralph-loop.webp)

The Ralph Loop replaces linear execution with iterative refinement. Instead of just operating in an open loop, the agent repeats the following steps until the goal is met:

1.  **Plan** a set of changes based on requirements.
2.  **Execute** the plan by implementing the changes.
3.  **Self-Verify** the implementation via building / linting / testing.
4.  **Reflect** on the output. If the goal is not complete or the tests fail, it loops back to step 1 or 2.

## My Current Workflow (Feb 2026)

My current process treats the human as the main thread. As the main thread, I strive to never get blocked by the agents. I typically run two or three local Claude instances in parallel and utilize GitHub Actions for asynchronous reviews.

To illustrate this further, let's walk through an example of how I would approach building an **OAuth2 Authentication Feature**:

**1. The One-Pager**
I work with a planning agent to draft a one-pager describing the goal. Usually these are high-level feature briefs that outline the overall requirements and constraints. Effectively, the planner acts as a technical product manager, producing crisp, clear requirements.

> _Goal: Add Google OAuth to the login flow. Must use our existing `AuthService`. Store tokens in Redis, not SQL. ..._

This step is critical for alignment. By forcing the agent to document the "why" and "how" before a single line of code is written, I prevent over-engineering and ensure the solution fits our existing architecture.

**2. Detailed Planning**
I work with a separate planning agent to produce a detailed plan, reviewing and refining the plan iteratively until I'm satisfied with it. Then, I have it decompose tasks into smaller, manageable chunks, checkpointed by commits.

> - Checkpoint A: Install dependencies and configure Google Cloud creds.
> - Checkpoint B: Update `AuthService` interface.
> - Checkpoint C: Create API routes and callback handlers.

**3. Implementation (The Ralph Loop)**
The kick off the Ralph Loop, whose job is to implement the plan autonomously. It writes the code for each checkpoint, running tests, fixing bugs it finds, and committing code. It continues until the plan is completed.

**4. Review**
The output is a chain of draft PRs. I focus on reviewing the design choices and high-level logic.

> Did we actually secure the token endpoint? Is the error handling robust? ...

If the high-level design is sound, I usually trust that the implementation details are correct and I don't dive into the weeds.

## Trade-offs & Costs

It would be disingenuous to claim this workflow is a silver bullet. Moving to an agentic model introduces a new set of overheads:

- **API Costs:** Running multiple agents in a "Ralph Loop" is expensive. A relatively simple feature implementation can cost $50 in API credits due to the recursive self-correction. Productivity gains come at a premium.
- **Brownfield Friction:** Agents struggle with "tribal knowledge" and undocumented technical debt. Working in existing codebases is significantly harder and requires heavier context engineering (in some cases, manually feeding the agent architectural history and edge-case constraints) before it can propose changes judiciously.
- **Skill Rot:** I feel slower at writing raw syntax than I was a year ago. I'm generally okay with this since I can spend more time on the bigger picture.

## Key Takeaways

This transition has evolved my perspective on the profession.

**1. The Engineer as Manager**
A developer who leverages multiple software agents is essentially an Engineering Manager. Success depends on the quality of your onboarding (docs), the clarity of your planning (specs), and the rigor of your review processes.

**2. From Implementation to Intent**
While an experienced engineer's value was never _truly_ about typing speed, it is often tethered to the _manual labor_ of implementation. Today, that tether is loosening. Most experienced engineers' primary output is no longer the code itself, but the **architectural intent and constraints** that govern it.

![Software engineering effort evolution from 2024 to 2026](/assets/blog/from-coder-to-orchestrator/swe-effort-evolution.webp)

**3. English is the New Syntax**
We have reached a point where English is the highest-level programming language available. In this stack, the AI functions as the transpiler, converting intent and architecture into executable code. The challenge is no longer learning a new framework, but learning to describe requirements with enough precision to leave little room for errors through hallucination.

**4. Observations on the "Intuition Gap"**
With many other developers adopting a similar workflow, I've been thinking about the implications for the next generation of engineers. If one never spends their "junior years" in the weeds of implementation, how does one develop the taste and judgment to review the AI's output?

I've noticed a few emerging risks with this shift:

- **The Loss of "Learning by Friction":** Much of my own architectural intuition was forged through hours of frustrating debugging. By removing that friction, we may inadvertently remove the very process that builds a deep mental model of how systems fail.
- **The High Bar for Verification:** The entry-level milestone is shifting. It is becoming less about "I can write a React component" and more about "I can audit a complex PR crafted by an agent." Mastery in the latter usually stems from years of doing the former; it’s not yet clear how beginners will bridge that gap effectively.
- **The Seniority Paradox:** We risk a future where "Seniority" is essentially a legacy trait, defined by pre-AI experience. There is a real challenge in ensuring that those starting today build the foundational logic necessary to troubleshoot a system when an agent reaches the limits of its reasoning.
