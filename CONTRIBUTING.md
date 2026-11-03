# Contributing to Houscape

Thank you for helping improve Houscape.

## Before opening an issue

- Search existing issues first.
- Confirm the problem still occurs on the latest release.
- Include your Home Assistant version, browser, Houscape version, and relevant logs.
- Remove tokens, private URLs, camera addresses, and personal floor plans from attachments.

## Development setup

Houscape requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Before submitting a pull request, run:

```bash
npm run typecheck
npm test
npm run build
npm run build:demo
```

Keep changes focused, update tests for behavioural changes, and update the documentation for user-facing features. By contributing, you agree that your changes are provided under the project's MIT License.

