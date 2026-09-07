# AI Graph Studio

**AI Graph Studio** is a free, open-source, browser-based visual architecture tool for designing, documenting, analyzing, simulating, and optimizing **agentic AI workflows and graphs**.

It is designed for the shift from simple prompt-based interactions toward structured AI systems composed of agents, tools, routers, evaluators, loops, guardrails, memory, human approvals, deterministic operations, and model-routing decisions.

AI Graph Studio is not tied to a specific AI provider or orchestration framework. It is intended to help people think about **AI systems architecture itself**.

---

## Why AI Graph Studio?

A single prompt is often no longer enough to describe how a modern AI system works.

Real-world AI applications increasingly involve structures such as:

```text
Input
  ↓
Planner
  ↓
Parallel Research
  ├── Research A
  ├── Research B
  └── Research C
  ↓
Merge
  ↓
Reasoning
  ↓
Writer
  ↓
Evaluator
  ├── PASS → Output
  └── FAIL → Fix → Evaluator
```

The difficult part is not only drawing this flow.

The difficult part is answering questions such as:

- Does this task really require an LLM?
- Am I using a frontier model where a cheaper model would be enough?
- Could several branches run in parallel?
- Does this loop have a safe termination condition?
- Is an evaluator missing before the final output?
- Is human approval required before a sensitive action?
- How many model calls could this architecture generate?
- What is the expected token consumption?
- What is the worst-case token consumption?
- Where are the main architectural risks?
- Is the workflow more complex than it needs to be?

AI Graph Studio was created to make these questions visible.

---

## From Prompt Engineering to AI Systems Engineering

The project is based on a simple idea:

> **Use the minimum amount of computational intelligence required to complete the task correctly.**

A good AI architecture does not mean placing an LLM in every node.

Many operations are better implemented with:

- deterministic code;
- rules;
- schemas;
- validators;
- arithmetic;
- traditional APIs;
- databases;
- retrieval systems;
- human approvals.

AI Graph Studio helps model the complete system instead of focusing only on the prompt.

A useful conceptual progression is:

```text
Prompt → Agent → Loop → Graph → AI System
```

The prompt remains important, but it becomes one component inside a broader architecture.

---

## Main Features

### Visual Graph Editor

Build agentic AI architectures directly on an interactive canvas.

The editor supports:

- creating nodes;
- moving and arranging nodes;
- directional connections;
- connection labels;
- zoom and pan;
- fit-to-screen;
- multi-selection;
- duplicate and delete;
- undo and redo;
- keyboard actions;
- editable node properties.

---

## Node Types

AI Graph Studio includes 18 architectural node types:

1. Start
2. Input
3. Prompt
4. LLM
5. Agent
6. Router / Decision
7. Tool / API
8. Code / Deterministic Operation
9. RAG / Knowledge
10. Memory / State
11. Parallel Split
12. Merge
13. Evaluator
14. Guardrail
15. Human Approval
16. Loop
17. Retry
18. Output

These nodes are architectural descriptions. The application does **not** execute arbitrary code or real AI models.

---

## Architecture Analyzer

AI Graph Studio includes a local heuristic analyzer that inspects the graph and highlights possible architectural issues.

It can evaluate aspects such as:

- efficiency;
- reliability;
- complexity;
- LLM dependency;
- human dependency;
- frontier-model dependency;
- number of nodes;
- number of agents;
- number of LLM calls;
- loops;
- evaluators;
- guardrails;
- graph depth;
- parallel branches;
- expected executions;
- estimated token consumption;
- worst-case token consumption.

The analyzer can also surface recommendations such as:

- replacing an unnecessary LLM with deterministic code;
- using a cheaper/faster model;
- adding a maximum loop iteration count;
- adding an evaluator before output;
- adding retry behavior around external tools;
- reducing oversized context;
- reducing excessive frontier-model usage;
- identifying disconnected nodes;
- identifying missing Start or Output nodes;
- detecting potentially accidental cycles;
- identifying possible parallelization opportunities.

### Important

Analyzer scores are **heuristics**, not scientific measurements.

They are intended to help users review an architecture, identify risks, and ask better engineering questions. They do not prove that one architecture is objectively better than another.

---

## Token Budgeting

AI Graph Studio can estimate token usage at node and workflow level.

You can configure:

- estimated input tokens;
- estimated output tokens;
- expected executions;
- loop iterations;
- token budgets;
- model class.

The application can estimate:

- total expected tokens;
- worst-case tokens;
- loop-related consumption;
- frontier-model token usage;
- standard-model token usage;
- fast-model token usage.

These values are estimates based on the architecture and the values configured by the user.

No external AI service is contacted.

---

## Cost Estimation

A local editable model catalog allows you to define:

- provider;
- model;
- input cost per 1M tokens;
- output cost per 1M tokens.

AI Graph Studio can then estimate:

- expected workflow cost;
- worst-case workflow cost;
- cost by node;
- cost by model/provider.

Model prices are intentionally not hard-coded as permanent facts because AI pricing changes frequently.

---

## Simulation Mode

The simulator can walk through a workflow structurally without executing any real model.

For example:

```text
✓ Start
✓ Planner
✓ Research A
✓ Research B
✓ Research C
✓ Writer
✗ Evaluator
✓ Fix
✓ Evaluator
✓ Output
```

Simulation helps estimate:

- executed nodes;
- LLM calls;
- tool calls;
- loops;
- graph depth;
- estimated tokens;
- estimated cost.

This makes it possible to reason about an architecture before building the real production system.

---

## Learning Mode

AI Graph Studio is also designed as a learning tool.

The application explains concepts such as:

- prompts;
- agents;
- loops;
- graphs;
- routers;
- evaluators;
- guardrails;
- RAG;
- memory;
- human-in-the-loop;
- parallelization;
- context engineering;
- token efficiency.

Each node can include guidance about:

- what it represents;
- when to use it;
- when not to use it;
- good practices;
- common mistakes.

The objective is to help users move from drawing diagrams to understanding **why an architecture is designed in a particular way**.

---

## Built-in Templates

The project includes reusable workflow templates, including:

- Simple Prompt
- Single Agent
- Agent + Tools
- Plan → Execute → Verify
- Research Workflow
- RAG Workflow
- Human-in-the-loop
- Parallel Research
- Evaluator-Optimizer
- Multi-Agent Workflow
- Router Architecture
- Tool-using Agent
- Deterministic + AI Hybrid Workflow
- AI Research & Report

Templates can be loaded into the canvas and modified.

---

## Local-First and Privacy-Oriented

AI Graph Studio is designed to run entirely inside the browser.

The current version requires:

- no account;
- no backend;
- no database server;
- no API key;
- no AI API;
- no cloud synchronization;
- no analytics service;
- no advertising tracker.

Projects are stored locally in the browser using IndexedDB.

Your workflow content is not sent to an AI provider or application backend by AI Graph Studio.

For long-term backup and portability, projects can also be exported as JSON.

> **Your workflows stay in your browser unless you explicitly export or share them.**

---

## Exports

AI Graph Studio supports multiple export formats:

- JSON
- SVG
- PNG
- Mermaid
- Markdown documentation
- Printable HTML
- PDF through browser printing

The generated Markdown documentation can include:

- workflow summary;
- nodes;
- connections;
- model usage;
- token estimates;
- cost estimates;
- analyzer findings;
- architecture information.

---

## Multilingual

The user interface is available in:

- **Catalan** — default
- **Spanish**
- **English**

The internationalization architecture is designed so additional languages can be added in the future.

---

## Vendor-Neutral by Design

AI Graph Studio is not an execution environment for one specific ecosystem.

Architectures can represent systems using, for example:

- OpenAI
- Anthropic
- Google
- AWS Bedrock
- Microsoft Azure
- OpenRouter
- local models
- custom providers

The same design can conceptually be implemented later with technologies such as:

- OpenAI Agents SDK
- LangGraph
- n8n
- custom orchestration engines
- traditional software architectures

The internal exporter architecture is designed to make future implementation-oriented exporters possible.

---

## What AI Graph Studio Is — and Is Not

### It is

- an AI architecture design tool;
- an agentic workflow graph editor;
- an architecture analysis tool;
- a token and cost estimation tool;
- a structural simulator;
- a documentation generator;
- a learning environment.

### It is not

- an AI model;
- an AI agent runtime;
- a production workflow execution engine;
- an alternative to an orchestration framework;
- an AI API client;
- a scientific benchmarking system.

The purpose of the project is to help design the system **before and alongside its implementation**.

---

## Technical Architecture

AI Graph Studio is deliberately lightweight.

The application is built as a static browser application using:

- HTML
- CSS
- JavaScript
- IndexedDB

There is no required runtime backend.

The deployment files are also the source used by the application, so the project can be hosted on a conventional static/shared web host.

No Node.js, Docker, Python, database server, or build process is required to run the published application.

For implementation details, see:

```text
ARCHITECTURE.md
```

For the security model, see:

```text
SECURITY.md
```

---

## Run Locally

Because the application uses browser modules, it should be served over HTTP/HTTPS rather than opened directly with `file://`.

Any simple static server can be used during development.

For example, if Python is available:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

No dependency installation is required for the application itself.

---

## Static Hosting

AI Graph Studio can be deployed to almost any static or shared web hosting platform.

Upload the project files so that:

```text
index.html
assets/
docs/
examples/
```

are located directly inside the public web directory.

No server-side application is required.

---

## Project Storage

Projects are stored locally in the browser.

Supported project operations include:

- New
- Save
- Open
- Duplicate
- Rename
- Delete
- Recent projects
- Import JSON
- Export JSON

### Backups

Browser-local data is not a substitute for backups.

If a workflow is important, export it as JSON and keep a copy outside the browser.

---

## Known Limitations

The current version is intentionally focused on architecture design rather than execution.

Important limitations include:

- AI models are not executed;
- tools and APIs are not called;
- token usage is estimated rather than measured;
- cost estimates depend on user-configured pricing;
- analyzer scores are heuristic;
- complex nested cyclic graphs may require approximations;
- local projects are not synchronized between devices;
- local project data is not encrypted by the application;
- browser storage can be cleared by the user/browser;
- workflow execution semantics may differ from the framework eventually used to implement the graph.

Current project limits include:

- up to 500 nodes;
- up to 2,000 edges;
- up to 5 MiB per project;
- bounded PNG export dimensions.

See the project documentation and test report for additional details.

---

## Security

Security has been considered as part of the architecture.

The application does not intentionally execute arbitrary user-provided JavaScript.

The **Code / Deterministic Operation** node describes an architectural operation; it is not a JavaScript execution console.

Project import, textual rendering, SVG/HTML export, and browser storage are treated as security boundaries.

Please review:

```text
SECURITY.md
```

If you discover a security issue, please avoid publishing exploit details in a public GitHub Issue. Use the repository's private security reporting mechanism when available.

---

## Repository Structure

A typical project structure is:

```text
aigraphstudio/
├── index.html
├── assets/
│   ├── css/
│   └── js/
├── docs/
├── examples/
├── tests/
├── ARCHITECTURE.md
├── CHANGELOG.md
├── LICENSE
├── README.md
├── SECURITY.md
└── THIRD_PARTY_LICENSES.md
```

---

## Testing

The repository includes optional development tests.

Core checks can be run with:

```bash
node tests/core.test.mjs
```

Browser integration tests are available in:

```text
tests/browser.html
```

The test folder is not required for a production deployment.

See the included test documentation for the exact test scope and known browser coverage.

---

## Contributing

Contributions are welcome.

The long-term objective is for AI Graph Studio to become a useful open tool for people designing agentic AI systems.

Useful contributions may include:

- bug fixes;
- new architecture heuristics;
- new node types;
- accessibility improvements;
- additional workflow templates;
- additional languages;
- better graph analysis;
- better simulation;
- documentation improvements;
- additional exporters;
- interoperability with AI orchestration frameworks;
- test coverage;
- UX improvements.

Before proposing a major change, opening a GitHub Issue to discuss the idea is recommended.

When contributing analyzer rules, please document:

1. what architectural pattern the rule detects;
2. why the pattern may be important;
3. when the rule may produce false positives;
4. what recommendation is shown to the user.

This helps keep the analyzer transparent and useful rather than turning heuristic recommendations into unexplained scores.

---

## Community Direction

AI Graph Studio is intended to be more than a diagram editor.

The broader goal is to build an open visual language and practical environment for reasoning about AI systems that may combine:

```text
Models
+
Agents
+
Tools
+
Memory
+
RAG
+
Routers
+
Loops
+
Evaluators
+
Guardrails
+
Deterministic Software
+
Humans
```

Possible future directions include:

- richer graph validation;
- reusable subgraphs;
- architecture version comparison;
- model-routing analysis;
- context-flow visualization;
- harness configuration;
- execution policies;
- additional security analysis;
- OpenAI Agents SDK export;
- LangGraph export;
- n8n export;
- pseudocode generation;
- portable architecture specifications.

The project should remain useful even for people who do not use a specific model provider or agent framework.

---

## Design Philosophy

AI Graph Studio encourages several engineering principles:

### 1. Use AI where cognition is needed

Do not automatically use an LLM for operations that deterministic software can perform more reliably.

### 2. Use the appropriate model for each task

A frontier reasoning model is valuable when difficult reasoning is required. It does not need to handle every step in a workflow.

### 3. Bound loops and retries

Every repeated process should have clear exit conditions and reasonable limits.

### 4. Make verification explicit

Important AI outputs should have an appropriate validation, evaluation, or approval mechanism.

### 5. Minimize unnecessary context

Large context windows are capabilities, not requirements.

### 6. Design for failure

Tools can fail. Models can produce unexpected outputs. Networks can be unavailable. Robust workflows should model these possibilities.

### 7. Make architecture understandable

A complex AI system should be explainable as a system, not only as a collection of prompts.

---

## License

AI Graph Studio is released under the **MIT License**.

See:

```text
LICENSE
```

for the full license text.

Third-party licensing information, when applicable, is documented in:

```text
THIRD_PARTY_LICENSES.md
```

---

## Feedback and Collaboration

If you use AI Graph Studio, feedback is welcome.

You can contribute by:

- opening issues;
- reporting bugs;
- proposing features;
- improving documentation;
- contributing code;
- suggesting new graph patterns;
- discussing architecture heuristics;
- sharing reusable workflow templates.

The project is intended to evolve with the community and with the rapidly changing practice of agentic AI engineering.

---

## Status

AI Graph Studio is an actively evolving open-source project.

The current release focuses on **visual architecture design, heuristic analysis, simulation, learning, and documentation** while remaining fully local-first and independent of external AI APIs.

