# AI Graph Studio user guide

## 1. What it does

Design AI architectures, document steps, estimate tokens and costs, identify potential problems and simulate paths. Everything runs in your browser, without AI APIs, keys or an account. Models, tools, prompts and Code-node content never execute. An exported graph is not an executable agent.

The guiding principle is to use the minimum computational intelligence needed to complete the task correctly. This is contextual advice: compare quality, cost, time and risk before reducing resources.

## 2. Prompt → Agent → Loop → Graph

- **Prompt:** instructions, examples, context and expected format. It makes no model call by itself; connect it to an LLM or agent.
- **LLM:** a model-based operation with configurable model and tokens.
- **Agent:** chooses actions and tools toward a goal. Draw internal calls explicitly or account for them in Expected base executions.
- **Loop:** bounded repetition with an exit condition.
- **Graph:** nodes and edges expressing dependencies, decisions and the final result.

When all steps are known in advance, a fixed workflow may be easier to test and maintain than an autonomous agent.

## 3. Meet the interface

The research example opens on the canvas. Project controls, Save, exports, language and theme are at the top. The 18-node palette is on the left, graph in the center and properties on the right. On mobile, Nodes expands the palette and properties appear below the canvas.

Modes are Editor, Analyze, Simulate, Templates and Learn. Learn explains each node's purpose, use, when to avoid it, example, good practice and common mistake. You can reopen onboarding there.

## 4. First project: research a topic and write a report

1. Select New project and name it `Topic research`.
2. Add Start, Input, four LLM nodes, Evaluator and Output.
3. Name the LLMs Planner, Research, Reasoning and Writer.
4. In Input describe the goal, audience, language, length and acceptance criteria: a report with sources, conclusions and limitations.
5. Describe what each task receives and delivers. Do not use credentials or real personal data for practice.

For a ready-made improved version, open AI Research & Report from Templates.

## 5. Connect nodes without dragging

In the right panel choose Source, Target and an optional Label, then Connect. Alternatively, click a node's blue output port and then the target node. Escape cancels a pending connection.

```text
Start → Input → Planner → Research → Reasoning → Writer → Evaluator → Output
```

Click an edge to edit its label or delete it. Use PASS/FAIL for evaluators, and TRUE/FALSE, YES/NO or custom labels for routers. Self-edges are not allowed: represent cycles with at least two nodes.

## 6. Move and organize

Drag nodes to move them, or the background to pan. The wheel pans; Ctrl/⌘ + wheel zooms. Buttons +/−, Fit to screen and Arrange nodes provide alternatives. Automatic arrangement uses condensed graph depth.

Shift + click selects multiple nodes. Move, duplicate or delete them together. Connections internal to a duplicated selection are copied too. Arrow keys move by 10 pixels, or 50 with Shift. You can also edit X and Y in properties.

| Shortcut | Action |
| --- | --- |
| Ctrl/⌘ + S | Save locally |
| Ctrl/⌘ + Z | Undo |
| Ctrl/⌘ + Shift + Z or Ctrl/⌘ + Y | Redo |
| Ctrl/⌘ + D | Duplicate selected nodes |
| Ctrl/⌘ + A outside a field | Select all nodes |
| Delete / Backspace outside a field | Delete selection or edge |
| Escape | Cancel connection and clear selection |

Up to 60 undo states are kept in memory. They do not survive reopening a project.

## 7. Configure models, tokens and latency

Select Planner, choose a provider, enter a model name and choose Fast / cheap. Model names are free text. Enter input and output tokens per execution. For example, 1,500 input and 450 output tokens are assumptions, not measurements.

Expected base executions multiplies consumption. For three internal agent calls, either use this field or draw separate calls; do not count both. Latency in milliseconds and latency class are manual planning information, not a stopwatch or SLA.

Prompt, Tool, Code, Memory and control nodes do not consume model tokens by default. Evaluator, Guardrail and RAG have a Uses a model checkbox. Enable it where appropriate; select Embedding for an embedding call. Code-node content never executes.

## 8. Parallelize research

Replace Research with:

```text
Parallel split → Research A / Research B / Research C → Merge
```

Give each branch an independent question or source. Connect all three to Merge and then Reasoning. Parallelism may reduce waiting time, but does not automatically reduce tokens. Avoid it when tasks depend on each other's results or share uncoordinated mutable state.

## 9. Reserve powerful models for reasoning

For Reasoning, choose Frontier reasoning, a high reasoning level and the model to estimate. Keep planning, writing and correction on cheaper models if they meet quality requirements.

Use Deterministic code for table formatting, sorting and schema validation. The analyzer can suggest this based on names, descriptions or the Potentially deterministic task checkbox. Review the suggestion: it does not understand the task's actual semantics.

## 10. Verify and fix with a bounded loop

Add Loop and an LLM named Fix:

```text
Evaluator → PASS → Output
Evaluator → FAIL → Loop → Fix → Evaluator
```

In Loop, document repeat condition `FAIL`, exit `PASS`, expected visits 2 and maximum 3. The maximum bounds visits to each node inside the cyclic component, including the initial evaluator visit. It does not mean three additional corrections.

Set the Evaluator's Failures before PASS to 1. Simulation fixes once and then passes. If failures exceed the cycle limit, it stops explicitly; reaching a limit never creates an artificial PASS.

Always draw the return edge. A standalone Loop cannot identify tasks to repeat. Multiple controllers inside one cyclic component use the product of limits as a conservative approximation and raise a warning. This is not exact semantics for arbitrary nested loops.

## 11. Read the analysis

Analyze shows efficiency, reliability, complexity, dependencies, depth, calls, tokens, costs and findings:

- Critical: a structural or control issue affecting a bounded execution.
- Warning: needs review.
- Optimization: a possible contextual improvement.
- Good practice: an explicit pattern worth verifying.

Each finding explains what, why and the recommendation. A high score certifies neither quality nor safety. Dependencies are node proportions, not time proportions. Depth condenses each cycle into one component. Model calls include estimated executions of nodes using models.

The estimator sums all branches, including router alternatives and disconnected nodes. This is a conservative design scenario, not a probabilistic expected value. Simulation counts only the selected path, so the totals can differ.

## 12. Budget and costs

Press Escape to clear selection and see project settings. Set expected and maximum token budgets. Zero means no budget. Below 80% is within budget; 80–100% is close; above 100% is over budget.

In Price catalog enter provider, model and input/output prices per million tokens. Use one currency for all rows, with provider/model names matching the nodes. Node-specific prices can override the catalog.

Example prices are zero. **Zero means unconfigured pricing, not a free service.** No prices are fetched online. Taxes, external tools, infrastructure, caching, discounts and human labor are excluded.

Cost = (input tokens × input price + output tokens × output price) / 1,000,000. Unbounded cycles can have unknown worst cases. The global limit stops simulation, but does not artificially make an unbounded loop's architectural budget finite.

## 13. Simulate

Select a router and enter the exact chosen branch label. Empty selects the first branch. Configure evaluator failures before PASS. Written conditions document design; they are not executable expressions.

Next step advances one visit. Run simulation displays the complete trace. The miniature highlights the current node. Parallel branches share a round; Merge waits for activated branches that can reach it. Ambiguous dependencies may cause an explicit stop.

A multi-output Loop/Retry uses REPEAT/FAIL/TRUE/YES to repeat and EXIT/PASS/FALSE/NO to exit. With one output it follows that edge while respecting the cycle bound. Human Approval and Guardrail with multiple outputs follow the configured label; no real approval or security check takes place.

The summary includes visits, calls, rounds, tokens and cost. Worst case refers to the whole architecture. Simulation has a 10,000-step safety cap even with a zero global limit.

## 14. Save and share

Save stores the project in this browser. Local projects supports open, duplicate and delete. Duplicate in the top bar creates an independent project ID. JSON import also creates a new copy, never silently overwriting an existing project.

| Export | Purpose |
| --- | --- |
| JSON | Complete editable backup, including catalog and budgets. |
| SVG | Scalable vector diagram. |
| PNG | Image for email, slides and social sharing; capped at 8,192 pixels per side and 16 megapixels, reducing large graphs. |
| Mermaid | Text diagram, not executable agent code. |
| Markdown | Architecture, nodes, models, edges, estimates and findings in the selected language. |
| Printable HTML / PDF | Download HTML, open it, then Print → Save as PDF. |

Long names are visually shortened in images; JSON and documentation retain full text. Printable HTML presents documentation as safe structured text, without executing HTML entered in nodes.

Export JSON regularly. Local projects are not encrypted by the application or synchronized across devices. V1 limits: 500 nodes, 2,000 edges and 5 MB per project. No simultaneous collaboration or executable LangGraph/n8n exporters are included.
