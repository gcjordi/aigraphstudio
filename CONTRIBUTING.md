# Contributing to AI Graph Studio

Thank you for your interest in contributing to AI Graph Studio.

AI Graph Studio is a free, open-source and vendor-neutral visual
workbench for designing, documenting, analyzing and simulating agentic
AI architectures.

Contributions of all kinds are welcome: bug reports, feature proposals,
architecture-analysis rules, documentation improvements, translations,
accessibility improvements, templates, tests and code contributions.

## Before contributing

Please:

-   Read the [README](README.md) for an overview of the project.
-   Read [ARCHITECTURE.md](ARCHITECTURE.md) before making significant
    architectural changes.
-   Follow the [Code of Conduct](CODE_OF_CONDUCT.md).
-   Review existing Issues and Discussions to avoid duplicate proposals.
-   For security vulnerabilities, follow [SECURITY.md](SECURITY.md)
    instead of opening a public Issue.

## Ways to contribute

You can contribute by:

-   Reporting bugs.
-   Proposing new features.
-   Suggesting new node types or workflow capabilities.
-   Proposing new Architecture Analyzer rules.
-   Improving existing analyzer rules or heuristics.
-   Improving simulation, token or cost estimation.
-   Adding or improving workflow templates.
-   Improving import/export functionality.
-   Improving documentation and examples.
-   Improving accessibility and responsive behavior.
-   Improving Catalan, Spanish or English translations.
-   Fixing code or tests.

## Reporting bugs

Please use the repository's Bug Report issue form.

A useful bug report should include:

-   A clear description of the problem.
-   Steps to reproduce it.
-   Expected behavior.
-   Actual behavior.
-   Browser and operating system.
-   Screenshots or exported project JSON when relevant.

Do not include API keys, credentials, private prompts, confidential
documents or other sensitive information.

## Feature requests

Please use the Feature Request issue form.

Explain:

-   What problem the feature solves.
-   The proposed behavior.
-   Why it is useful for agentic AI architecture design or analysis.
-   Possible alternatives, if relevant.

Features should remain consistent with the project's vendor-neutral
approach.

## Architecture Analyzer proposals

AI Graph Studio includes heuristic analysis of agentic AI architectures.

If you want to propose a new analyzer rule, please use the Architecture
Analyzer Proposal issue form.

A strong proposal should describe:

-   The architecture pattern to detect.
-   Why the pattern may represent a risk, inefficiency or design
    concern.
-   The conditions that should trigger the rule.
-   Expected severity.
-   Potential false positives.
-   Suggested remediation or guidance.
-   References or technical rationale where appropriate.

Analyzer rules should provide useful architectural guidance rather than
enforce a specific AI vendor, model or framework.

## Development principles

Contributions should preserve the core characteristics of AI Graph
Studio.

### Client-side first

The application is designed to run directly in the browser without
requiring a backend service for its core functionality.

Avoid introducing mandatory server-side dependencies unless there is a
compelling architectural reason and the change has been discussed first.

### Vendor neutrality

Do not make core functionality dependent on a specific LLM provider,
agent framework, cloud platform or proprietary AI service.

Provider-specific capabilities may be represented when useful, but the
core architecture model should remain portable and vendor-neutral.

### Privacy

Core project editing and analysis should remain local whenever possible.

Do not introduce unnecessary transmission of user workflows, prompts,
architecture data or project content to external services.

### No mandatory API keys

Core functionality should not require users to provide API keys or
credentials.

### Portability

AI Graph Studio should remain easy to deploy as a static web application
on ordinary web hosting.

Avoid unnecessary build, runtime or infrastructure complexity.

### Backward compatibility

Changes to the project JSON format should consider compatibility with
projects exported by previous versions.

If a breaking format change is necessary, document it clearly and
provide migration handling where practical.

## Testing

Before submitting a Pull Request, run the core test suite:

``` bash
node --test tests/core.test.mjs
```

The repository also uses GitHub Actions and CodeQL.

Pull Requests must pass the required automated checks before they can be
merged.

When changing browser-facing behavior, manually verify the relevant
functionality in a modern browser.

## Pull Requests

Keep Pull Requests focused on one logical change whenever practical.

Before submitting a Pull Request:

1.  Create a dedicated branch.
2.  Make the smallest coherent change that solves the problem.
3.  Test the change.
4.  Update documentation when behavior changes.
5.  Describe what changed and why.
6.  Reference related Issues when applicable.

Please avoid unrelated formatting changes or large refactors in the same
Pull Request unless they are necessary.

## Commit messages

Use concise and descriptive commit messages.

Examples:

``` text
Fix edge validation in analyzer
Add retry node documentation
Improve token estimation for loops
Add Catalan translation for evaluator settings
```

## Documentation

If your contribution changes user-facing behavior, configuration,
architecture rules or project formats, update the relevant
documentation.

Keep documentation clear and technically precise.

## Translations

AI Graph Studio currently supports Catalan, Spanish and English.

When adding or changing user-facing text, preserve the multilingual
structure whenever possible.

Translations should preserve technical meaning rather than translate
terminology mechanically.

## Dependencies

Avoid adding dependencies unless they provide clear value.

Prefer browser-native capabilities and the existing project architecture
when practical.

New dependencies should be:

-   Necessary.
-   Actively maintained.
-   Compatible with the project's license.
-   Appropriate for a privacy-conscious client-side application.

## Security

Do not report security vulnerabilities through public Issues or
Discussions.

Please follow the instructions in [SECURITY.md](SECURITY.md).

Never commit:

-   Passwords.
-   API keys.
-   Access tokens.
-   Private certificates or keys.
-   Personal or confidential data.
-   Production credentials.

## Licensing

By contributing to AI Graph Studio, you agree that your contributions
will be licensed under the project's [MIT License](LICENSE).

Only submit code, documentation or other material that you have the
right to contribute.

## Community

Questions, architecture discussions and broader ideas are welcome in
GitHub Discussions.

For actionable bugs and feature proposals, use GitHub Issues.

Thank you for helping improve AI Graph Studio.
