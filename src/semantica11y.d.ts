declare module 'semantica11y' {
  export interface AnalyzerOptions {
    rules?: Array<Record<string, unknown>>;
  }

  export interface AnalysisResult {
    issues?: Array<Record<string, unknown>>;
    [key: string]: unknown;
  }

  export class Analyzer {
    constructor(options?: AnalyzerOptions);
    analyzeHTML(html: string, url?: string): Promise<AnalysisResult>;
    formatResults(results: AnalysisResult): string;
  }

  export function formatConsoleReport(results: AnalysisResult): string;
  export function exportTextReport(results: AnalysisResult, destination: string): Promise<void>;
}
