#!/usr/bin/env node

import { Command } from 'commander';
import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';
import { Analyzer, formatConsoleReport, type AnalysisResult } from 'semantica11y';

const analyzer = new Analyzer();
const program = new Command();

program
  .name('semantica11y')
  .description('Scan a URL or local HTML file for accessibility issues using the Semantica11y rules engine')
  .argument('<target>', 'URL or path to an HTML file')
  .option('-f, --format <format>', 'report format: text or json', 'text')
  .option('-o, --output <file>', 'write the report to a file')
  .action(async (target: string, options: { format: string; output?: string }) => {
    try {
      const source = await loadSource(target);
      const audit = await analyzer.analyzeHTML(source, target);
      const report = createReport(audit, options.format);

      if (options.output) {
        await fs.writeFile(options.output, report, 'utf8');
        console.log(`Report written to ${options.output}`);
      } else {
        console.log(report);
      }
    } catch (error) {
      handleError(error);
      process.exit(1);
    }
  });

program.parse(process.argv);

async function loadSource(target: string): Promise<string> {
  if (isUrl(target)) {
    const response = await fetch(target);
    if (!response.ok) {
      throw new Error(`Unable to fetch URL ${target}: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  }

  const filePath = path.resolve(process.cwd(), target);
  return await fs.readFile(filePath, 'utf8');
}

function isUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function createReport(audit: AnalysisResult, format: string): string {
  switch (format.toLowerCase()) {
    case 'json':
      return JSON.stringify(audit, null, 2);
    case 'text':
      return formatConsoleReport(audit);
    default:
      throw new Error(`Unsupported format: ${format}. Use "text" or "json".`);
  }
}

function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.error('An unknown error occurred.');
  }
}
