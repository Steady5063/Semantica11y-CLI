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

`<target>` can be:
- a remote URL such as `https://example.com`
- a local HTML file path such as `./index.html`

### Options

- `-f, --format <format>` — Choose the output format.
  - `text` (default): human-readable console report.
  - `json`: structured JSON output suitable for programmatic parsing.
- `-o, --output <file>` — Save the report to the given file path instead of printing it to the terminal.

### Examples

- Run the audit against a remote website and print a readable text report:

  ```bash
  semantica11y https://example.com
  ```

  Output: A formatted list of detected issues in the terminal, including selectors, descriptions, and help links.

- Run the audit on a local HTML file and output JSON:

  ```bash
  semantica11y ./index.html --format json
  ```

  Output: A JSON document printed to stdout containing the audit result object.

- Run the audit on a local HTML file and write the report to a file:

  ```bash
  semantica11y ./index.html --output report.txt
  ```

  Output: The report is saved to `report.txt`, and the terminal prints a confirmation message.

## Features

- Scan remote URLs or local HTML files
- Report accessibility issues as text or JSON
- Basic rules for missing `alt`, blank target links, empty ARIA labels, and duplicate IDs

## Notes

- Requires Node.js 18 or newer for the built-in `fetch` API.
