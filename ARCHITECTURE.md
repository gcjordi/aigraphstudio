# Architecture — AI Graph Studio 1.0.0

## Deployment and modules

Buildless static ES modules, browser APIs and authored CSS. `index.html` is the entry point. Source equals deployment: no transpilation, package installation or server is required on IONOS. All paths are relative, allowing domain roots and subdirectories. HTTP/HTTPS is required for module loading. No runtime dependencies or CDNs.

| Module | Responsibility |
| --- | --- |
| `model.js` | Central CONFIG (name/version/limits), project factories, validation, graph structures and pricing lookup |
| `nodes.js` | 18 types, localized names and six educational fields per type |
| `i18n.js` | CA/ES/EN UI dictionary, provider and model-class labels |
| `templates.js` | 14 graph factories, localized titles, layout |
| `canvas.js` | SVG rendering, directional edges, pointer pan/drag, zoom, bounds |
| `app.js` | UI composition, editing commands, history, panels, onboarding, keyboard bindings |
| `storage.js` | IndexedDB CRUD and small preference storage |
| `rules.js` | Localized WHAT / WHY / RECOMMENDATION rule descriptions |
| `analyzer.js` | Structural rules, heuristics and conservative resource estimates |
| `simulator.js` | Bounded structural traversal with selected branches |
| `exporters.js` | Extensible exporter registry: JSON, SVG, PNG, Mermaid, Markdown, HTML |
| `dom.js` | DOM creation using text nodes and safe escaping for exports |

The app name is controlled by `CONFIG.name` in `assets/js/model.js`. Runtime page title and branding read it. To fully rebrand distributed files, also update the static HTML metadata, README and guides, which are documentation rather than runtime configuration.

## Versioned interchange schema

`schemaVersion: 1`, UUID `id`, `name`, `description`, ISO `created` and `modified`, application `version`, arrays `nodes`, `edges`, `catalog`, and `settings`. Node and edge IDs use a restricted ASCII identifier alphabet. All imports pass an allowlisted reconstruction step. Unknown fields are not retained; unsupported major schemas are rejected. Imported projects receive a fresh project ID to prevent silent overwrites. Nodes keep IDs so edge references remain stable.

Generic node fields: id, type, x/y, name, optional three-language `title`, description, notes. AI planning: provider, model, modelClass, reasoning, inputTokens, outputTokens, executions, latency and latencyClass, useModel. Controls: maxIterations, estimatedIterations, condition, exitCondition, failures and route. Review metadata: sensitive, important, external, deterministic, contextKey. Pricing: priceOverride, inputPrice, outputPrice.

Edge: id, source, target, label. Parallel edges with different labels are allowed; exact duplicates and self-edges are rejected. Project settings: expectedBudget, maxBudget, maxSteps, currency. Catalog entries match exact provider/model strings and contain prices per million input/output tokens, without live updates.

Limits: 500 nodes, 2,000 edges, 5 MiB serialized project, 12,000 characters for ordinary long fields, 200 for names, 100 for edge labels, 1,000 for iteration counts and base executions. Node coordinates are bounded to ±100,000. History retains at most 60 in-memory snapshots. Practical use is desktop/tablet; large graphs require zoom and pan. PNG is bounded to 8,192 px per side and 16 megapixels.

## Local persistence

IndexedDB database `ai-graph-studio`, object store `projects`, key path `id`. Transactions resolve only after completion. Explicit Save commits validated data. A failed save preserves in-memory edits and prompts JSON export. The app does not silently claim an unsuccessful write. Preference keys use `ags-` in localStorage; failure to store preferences does not stop editing. `?qa=1` isolates the browser test database and preferences from normal projects.

No autosave or cross-tab synchronization is implemented. Avoid editing the same saved project in two tabs: the later explicit save wins. Export JSON for durable backups. Project data is origin-bound and not encrypted by this app. Server file backups do not contain visitor projects.

## Graph analysis and resource model

Tarjan strongly connected components (SCCs) identify cycles in O(V+E). The condensed DAG gives maximum structural depth. For each SCC:

- Without a cycle/control, multiplier = 1.
- A Loop or Retry contributes expected multiplier `max(1, estimatedIterations)`.
- A bounded controller contributes worst multiplier `max(1, maxIterations, estimatedIterations)`; an estimate exceeding the maximum is also warned about.
- Multiple controllers in the same SCC multiply their bounds and trigger an ambiguity warning. This is a conservative approximation, not exact nested-loop semantics.
- A cyclic SCC with no controller, or a controller without a positive maximum, has an unbounded worst multiplier.
- Standalone controllers multiply only their own node and trigger a warning: no repeated body is inferred without return edges.

For each model-using node: calls = base executions × expected SCC multiplier; input/output totals = per-call tokens × calls. Worst uses the worst multiplier. Zero executions or zero token counts remain zero, even when the component is unbounded. Unbounded architecture is still flagged independently. Catalog prices are exact-string matches, overridden by node-specific prices when enabled.

The estimator deliberately sums every node and every branch, including alternatives and unreachable nodes. It does not infer branch probabilities. Estimated/expected values mean a conservative architecture scenario under entered visit assumptions, not a statistical expectation. Simulation totals are path-specific and often lower. A global simulator cap is not used to hide a locally unbounded architecture.

LLM/Agent consume model tokens; Evaluator/Guardrail/RAG do so only with `useModel`. Prompt does not execute a model. Internal agent calls must be specified as nodes or base executions. Embedding/vision model uses are included in the general model-call indicator labeled LLM calls.

Cost = (input tokens × input price + output tokens × output price) / 1,000,000. Prices default to zero with an explicit unconfigured-price warning. Costs exclude tools, hosting, taxes, caching, batch discounts and human labor. Latency is editable descriptive metadata, not a measured critical-path duration.

Scores are transparent engineering heuristics:

- Efficiency = max(0, 100 − 6 × optimization findings − 15 × unbounded-controller findings).
- Reliability = max(0, 100 − 20 × critical findings − 7 × warning findings excluding missing prices).
- Complexity = min(100, round(nodes + 0.5 × edges + 3 × cycles/controllers + depth)).
- LLM/human dependency: corresponding node count divided by nodes excluding Start/Input/Output/Prompt.
- Frontier dependency: frontier model nodes divided by model-using nodes.

They are not calibrated quality or security measurements. Evaluator and guardrail coverage is checked by searching for a path that bypasses the control type, rather than accepting a control found on an unrelated branch. Name-based deterministic-task recommendations are explicitly weak heuristics. Independence cannot be proved without data contracts.

## Simulation semantics

No code or model execution. Deterministic round-based token traversal:

- Start nodes seed the queue. Default outgoing edges activate all targets.
- Router, multi-output Human Approval and Guardrail select the configured exact label, or first branch if empty.
- Evaluator follows FAIL for its first configured failures and then PASS. A missing required branch stops that path with a visible incomplete status.
- Multi-output Loop/Retry uses repeat labels REPEAT/FAIL/TRUE/YES until the expected visit count, then exit labels EXIT/PASS/FALSE/NO. Single-output controllers follow their edge.
- Nodes inside an SCC cannot exceed the product of controller maxima. A separate global cap never exceeds 10,000 trace steps.
- Parallel outputs receive the same next round. Duplicate activations of a node in the same round coalesce. Merge defers while another live token can reach it; when no token can make progress, simulation stops explicitly.
- Output terminates that path. A non-Output dead end is incomplete. Limit exhaustion does not become success.

Merge reachability is structural and may conservatively block complex nested conditional/cyclic patterns. Different token identities, transactional joins, race/first-completion joins, stochastic branches, nested-loop scopes and real timeout/failure semantics are outside V1. The simulator makes no promise to replicate a particular orchestration framework.

## Exports and future adapters

`registerExporter(id, label, run)` provides one central registry. New adapters should accept a validated project, perform capability validation and return a file or diagnostics. Keep semantic translation separate from UI. Current Mermaid export represents topology only and sanitizes syntax delimiters; JSON remains the authoritative complete interchange.

A future LangGraph, OpenAI Agents SDK or n8n adapter should require explicit runtime mappings, tool schemas, model bindings, state contracts and exact loop/join semantics. Reject unsupported patterns rather than generating seemingly executable incomplete code. V1 intentionally contains no experimental executable adapter.

## Optional V2 AI assistance

A future opt-in path could be Browser → authenticated secure backend → AI provider API. Store keys only server-side; add authorization, quotas, request limits, explicit data-transmission consent, logging policy and server-side validation. Return a candidate schema-vetted graph for user review before changes. Keep the static V1 path fully independent. This backend is not present, configured or required in V1, and no UI implies it exists.

## Compatibility and tests

Uses modern ES modules, SVG, Pointer Events, Canvas, Blob downloads, IndexedDB, native dialogs, matchMedia and modern CSS. Chrome was exercised in a real browser. Edge shares Chromium but was not separately run. Firefox and Safari/iOS received a source-level compatibility review only; device/browser certification is not claimed. No WebGL, filesystem API, service worker or clipboard permission is required. UUID has a fallback. Explicit controls avoid requiring drag-and-drop. Native download behavior may vary on iOS.

See `docs/TEST_REPORT.md` and the optional `tests/` suite for evidence and limitations.
