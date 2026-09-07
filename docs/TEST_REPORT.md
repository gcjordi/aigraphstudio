# Test report — 6 September 2026

## Executed results

**31 core tests passed** under Node.js 24; **17 browser integration tests passed** in the available Chrome browser. Source syntax checks were run for every JavaScript module. The application was served as static files through a development-only server, which is not included or needed in production.

### Core suite: `tests/core.test.mjs`

- All 14 templates validate, analyze and simulate to Output.
- All 18 node types survive JSON round trips.
- Research example executes three research branches in the same round, merges once and follows FAIL → correction → PASS.
- Exact input/output token multiplication, bounded/worst costs and catalog lookup.
- Unbounded and accidental cycles produce nonfinite worst-case estimates with findings.
- Bypass paths around evaluators and guardrails are detected.
- Loop limits and global step caps stop simulations without false success.
- Router follows its configured alternative.
- Prototype keys, invalid IDs/references, duplicate IDs/edges, self-edges, unsupported schema, oversized input and nonfinite numbers are rejected.
- A 500-node chain analyzes and simulates with the expected depth and visit count.

### Browser suite: `tests/browser.html`

1. Complete UI dictionary for CA/ES/EN and six educational fields for every node type.
2. SVG is valid XML; hostile label text remains text, without executable elements.
3. PNG is a nonempty real raster with the correct PNG byte signature.
4. JSON serialization and validated import retain the complete data.
5. Markdown, Mermaid and printable HTML exports contain expected content and resist tested injection strings.
6. Onboarding next, skip, reopen and finish.
7. New project creation.
8. Add every node type.
9. Edit node properties.
10. Connect, delete edge, undo and redo.
11. Duplicate and delete selected nodes.
12. Keyboard movement, undo and redo.
13. Save, reopen, duplicate and delete temporary QA projects using isolated IndexedDB.
14. CA → ES → EN → CA language switching.
15. Light, dark and system theme selection.
16. Template loading, analysis, simulation run, step and reset.
17. 390px and 768px viewport checks: editor and analyzer fit without page-level horizontal overflow.

Browser integration tests exercise DOM controls/events in an application iframe and actual browser APIs. They are complemented by direct browser UI interactions for onboarding, selection, property editing, save, simulation and visual inspection. They do not constitute exhaustive device testing.

## Defects found and corrected

- A missing closing parenthesis prevented application startup.
- Form updates now use input events, keeping the model synchronized while typing.
- Dialogs are removed synchronously on application-driven close, avoiding stale overlays.
- Pointer capture is acquired only for actual drags, preserving ordinary node clicks.
- Keyboard handler tolerates non-element event targets.
- Toolbar undo/redo/delete availability updates with selection and editing.
- Duplicate catalog keys and edge labels are guarded; analyzer aggregation uses null-prototype dictionaries.

## Compatibility scope

| Browser | Evidence |
| --- | --- |
| Chrome | Real application interactions, visual review and 17 integration tests. |
| Edge | Source/API compatibility review; not separately executed. |
| Firefox | Source/API compatibility review; not executed. |
| Safari / iOS | Source/API compatibility review and narrow viewport layout checks in Chrome; no real Safari/iOS device run. |

Desktop and responsive layouts were inspected; narrow Chrome iframes are not equivalent to actual iOS testing. Native download dialogs, printing to PDF, assistive technologies, touchscreen gestures and Apache/IONOS account-specific configuration require validation in the deployment environment. No claim of WCAG certification, penetration-test certification or universal production certification is made.

## Security and network review

No runtime dependencies, external fonts, trackers, fetch/XHR/WebSocket/beacon calls or secret material. Imported data is reconstructed with validated known fields. DOM and export injection tests passed. `SECURITY.md` describes residual origin/browser risks. Browser-extension log noise is separate from application code; earlier application syntax defects were fixed before the final run.

## Reproduction

Core: `node tests/core.test.mjs` on a development computer. Browser: serve the folder over HTTP/HTTPS, open `tests/browser.html`, click Run tests. The test app uses `?qa=1` and a separate database; only QA records are deleted. The test harness is English-only developer material, not part of the localized product UI.
