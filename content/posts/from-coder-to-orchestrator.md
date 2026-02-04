---
title: "From Writing Code to Orchestrating Agents"
date: "2026-02-03"
excerpt: "A two-year journey from treating AI as conversational StackOverflow to orchestrating a team of software engineering agents."
coverImage: "/assets/blog/from-coder-to-orchestrator/cover.webp"
---

I haven’t hand-written a `for` loop for my day job in months.

In early 2024, my AI usage was typical of the industry: I treated chat interfaces like a conversational StackOverflow for snippets and error explanation. Today, in February 2026, my usage has evolved. I no longer write code; I orchestrate a team of software engineering agents.

This post outlines the evolution of my workflow, moving from simple assistance to a fully agentic "Plan, Implement, Verify" loop, and explains the tools and mindset shifts required to make it work.

![Timeline diagram comparing software development workflow in 2024 versus 2026](/assets/blog/from-coder-to-orchestrator/swe-effort-evolution.webp)

## Phase 1: Skepticism and Mechanical Tasks (Late 2024)

By late 2024, I started experimenting with autonomous coding using **Cline** (an open-source VS Code extension that allows LLMs to edit files directly). However, I remained deeply skeptical of the output.

I was wary of the industry trend known as **"Vibe Coding"** - the dangerous habit of accepting code just because it runs and looks correct superficially, even though it often introduces subtle bugs and technical debt.

To mitigate this, I restricted AI usage to mechanical tasks: boilerplate generation, writing tests for existing code, and routine refactoring. My usage was limited not just by trust, but by friction; anything more complex than a routine task resulted in frustrating amounts of back-and-forth to produce acceptable code.

## Phase 2: The Planning Struggle (Early to Mid 2025)

In 2025, I migrated to **Claude Code** (Anthropic’s agentic CLI tool). As the year progressed, I noticed a distinct improvement in the model's capabilities. I could finally rely on it to create entire files or classes more reliably.

During this period, I got out of the habit of asking for immediate code and shifted to a **Plan/Implement pattern**. However, this phase introduced new failure modes:

- **Over-Engineering:** In the planning stage, the agent often proposed unnecessarily complex architectures (e.g., suggesting a microservice when a simple module would do). I spent significant time debating the plan just to simplify it.
- **Premature Completion:** Once implementation started, the models were confident but brittle. The agent would frequently claim a task was finished while ignoring edge cases, forcing me to micromanage the verification process.

## Phase 3: The Breakthrough (Late 2025 – Present)

The real shift occurred in December 2025 due to a convergence of three factors: the release of **Opus 4.5**, the standardization of context via `CLAUDE.md`, and the adoption of the "Ralph Loop."

### 1. The Engine: Opus 4.5

While previous models were good at syntax, Opus 4.5 brought a step-change in reasoning. It could hold complex architectural constraints in context without "forgetting" the prompt instructions halfway through a file edit.

### 2. The Onboarding: CLAUDE.md

I realized that agents fail for the same reason new human hires fail: lack of context. I began treating my repository documentation as an "Employee Handbook" for agents, contained in a `CLAUDE.md` file.

I no longer view this file as configuration; it is team onboarding. Some examples of how one might use it:

- **Architectural Patterns:** "Prefer Layered Architecture (Controller → Service → Repository) over Feature Slices."
- **Testing Standards:** "Use Jest with `describe`/`it` blocks."
- **Stylistic Preferences:** "Prefer composition over inheritance."

Every new agent instance "joins the team" fully briefed on our engineering standards, eliminating the need for me to repeat coding conventions.

### 3. The Pattern: The Ralph Loop

Even though Opus 4.5 had improved reasoning capabilities, it still sometimes suffered from the "Premature Completion" issue from Phase 2. To solve this, I adopted the **Ralph Loop**.

![Ralph Loop flow chart showing Plan -> Execute -> Verify -> Reflect](/assets/blog/from-coder-to-orchestrator/ralph-loop.webp)

The Ralph Loop replaces linear execution with recursive iteration. Instead of just operating in an open loop, the agent repeats the following steps until the goal is met:

1.  **Plan** based on requirements.
2.  **Execute** the changes.
3.  **Self-Verify** by running the linter and tests _itself_.
4.  **Reflect** on the output. If the goal is not complete or the tests fail, it loops back to step 1 or 2.

## My Current Workflow (Feb 2026)

My current process treats the human as the main thread, ensuring I am never blocked by generation times. I typically run two or three local Claude instances and utilize GitHub Actions for asynchronous reviews.

Here is a concrete example of how I built a recent **OAuth2 Authentication Feature**:

**1. The One-Pager (Human Intent)**
I write a short text file describing the goal.

> _Goal: Add Google OAuth to the login flow. Must use our existing `AuthService`. Store tokens in Redis, not SQL._

This prevents the agent from over-engineering a custom auth solution.

**2. Planning & Checkpoints**
The agent reads the One-Pager and `CLAUDE.md`. It produces a plan with distinct **Commit Checkpoints**:

- _Checkpoint A:_ Install dependencies and configure Google Cloud creds.
- _Checkpoint B:_ Update `AuthService` interface.
- _Checkpoint C:_ Create API routes and callback handlers.

**3. Execution (The Loop)**
I approve the plan. The agent enters the Ralph Loop. It writes the code for Checkpoint A, runs the tests, fixes a missing environment variable bug it found, and commits the code. It proceeds to B and C automatically.

**4. Review (The Manager)**
The output is a chain of draft PRs. I focus on reviewing the design choices and high-level logic. _Did we actually secure the token endpoint? Is the error handling robust?_. I can trust that most implementation details are correct.

## The Reality Check: Trade-offs & Costs

It would be disingenuous to claim this workflow is flawless. There are real costs to this approach:

- **API Costs:** Running multiple agents in a "Ralph Loop" is expensive. A relatively simple feature implementation can cost $50 in API credits due to the recursive self-correction.
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

**4. On "Vibe Coding" and the Future of Software Engineering**

Vibe coding was never truly effective; it was a distraction from the discipline of the craft. Software engineering, even in an agentic world, still requires the same thoughtful planning and rigorous execution it always has. We’ve simply moved the lever.

Stop fighting the syntax. Start mastering the intent. We are no longer just writing code; we are designing the systems that write it for us.
