# Semantica11y-CLI

A CLI interface for the Semantica11y accessibility rules engine.

This CLI now uses the published `semantica11y` npm library to analyze HTML pages and URLs.

## Install locally

```bash
npm install
npm run build
```

## Install globally for CLI use

```bash
npm install -g .
```

## Usage

```bash
semantica11y <target> [options]
```

Examples:

```bash
semantica11y https://example.com
semantica11y ./index.html --format json
semantica11y ./index.html --output report.txt
```

### Options

- `-f, --format <format>` — `text` or `json` (default: `text`)
- `-o, --output <file>` — Write the report to a file

## Features

- Scan remote URLs or local HTML files
- Report accessibility issues as text or JSON
- Basic rules for missing `alt`, blank target links, empty ARIA labels, and duplicate IDs

## Notes

- Requires Node.js 18 or newer for the built-in `fetch` API.
