# Security review — AI Graph Studio 1.0.0

## Scope and result

Source review plus automated hostile-input checks and real Chrome integration tests. This is not an independent penetration test or certification. No runtime third-party dependencies, analytics, AI APIs, API keys, secrets or arbitrary code execution are present.

## Trust boundaries

Treat imported projects and every user-entered string as untrusted. The web host serves application bytes; project data stays in the visitor's browser. A compromised host, malicious browser extension or another script on the same origin can still access local data. Prefer a dedicated HTTPS subdomain. Local projects are not application-encrypted. Hosting access logs may contain ordinary web requests; the app does not transmit graph contents or telemetry.

## Controls

| Risk | Implemented protection | Residual limitation |
| --- | --- | --- |
| DOM XSS | UI uses createElement/createElementNS and textContent/text nodes. No innerHTML or eval. | A compromised application origin can replace scripts. |
| Hostile JSON | Size, depth, type, numeric range, ID uniqueness, references and schema checks; allowlisted reconstruction. | Limits bound supported input, not every possible browser memory condition. |
| Prototype pollution | Reject `__proto__`, `constructor`, `prototype` property keys recursively; no untrusted Object.assign/spread reconstruction; analyzer dictionaries have null prototypes. | Unknown user strings remain plain text. |
| SVG injection | DOM SVG generation and XMLSerializer; user data is only text; no foreignObject, image URLs or scripting. | Diagram labels are visually shortened. |
| Printable HTML injection | HTML-escape complete Markdown and title; serialize safe SVG; restrictive export CSP. | The exported document is intentionally simple structured text, not a Markdown HTML renderer. |
| Mermaid syntax injection | Generated safe node IDs; remove structural delimiters from labels. | Some punctuation is lost in Mermaid; JSON retains it. |
| Malicious Code node | Descriptive strings only; no execution path. | Users must assess any code manually implemented elsewhere. |
| Resource exhaustion | 500 nodes, 2,000 edges, 5 MiB, bounded coordinates/text, simulator cap 10,000, bounded PNG raster. | Maximum-size graphs can be slow on older mobile devices; 60 history snapshots use memory. |
| Unbounded cycles | SCC detection, explicit findings and infinite/unknown worst estimates; simulator hard cap. | Nested loops/joins are conservative approximations. |
| Data loss | Transaction-complete IndexedDB saves, explicit errors, JSON backup and import. | No cloud recovery, cross-tab conflict handling or application encryption. |
| Network exfiltration | No fetch/XHR/WebSocket/beacon code; `connect-src 'none'`; local script/style assets; no external fonts or CDN. | Clicking documentation links intentionally opens external official help sites. |

## Browser/server policies

The HTML meta CSP restricts script loading to self, forbids connection APIs, objects, base overrides and forms. Inline styles are permitted for dynamic SVG/CSS positioning, not inline scripts. Blob/data images support PNG generation. Optional Apache `.htaccess` adds nosniff, no-referrer, same-origin framing, permissions policy and CSP headers. HTTPS redirect configuration remains with the hosting/domain/proxy to avoid redirect loops. Revalidate policies when introducing new capabilities.

## Storage practices

Never put credentials in a graph. Anyone using the same unlocked browser profile may access its projects. Export backups to a trusted location. Clearing browser storage or using private mode may remove data. Replacing website files does not back up or synchronize visitor projects. Separate QA mode uses its own database and prefix; test pages can be omitted from production.

## Tested malicious cases

Prototype keys, malformed/oversized JSON, unsupported schemas, duplicate IDs, invalid edge references, self-links, nonfinite numeric values, hostile text in SVG and HTML, and Mermaid delimiter attempts. SVG was parsed as XML with no executable elements; HTML was parsed with no script nodes; PNG signature and nonempty raster were verified.

## Future change requirements

Adding external APIs requires a separate backend, authentication, authorization and explicit data-flow review. Never place provider keys in this static package. Recheck imports, exports, dependency licensing, CSP and storage migrations whenever the schema changes.
