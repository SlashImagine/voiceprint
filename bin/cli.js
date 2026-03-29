#!/usr/bin/env node

import { parseArgs } from "node:util";
import { analyzeBrandVoice, formatMarkdown, formatJSON, formatVoiceFile } from "../src/index.js";

const help = `
  brand-voice — Reverse-engineer any brand's voice into an AI-ready guide.

  Usage:
    brand-voice <url>                          Analyze a website's brand voice
    brand-voice <url> --voice                  Generate a drop-in VOICE.md file
    brand-voice <url> --format json            Output as JSON
    brand-voice <url> --pages 5                Crawl up to 5 pages (default: 8)
    brand-voice <url> --output voice.md        Save to file
    brand-voice compare <url1> <url2>          Compare two brands side-by-side

  Options:
    --voice         Generate a drop-in VOICE.md (the killer feature)
    --format, -f    Output format: markdown (default) | json | voice
    --pages, -p     Max pages to crawl (default: 8, max: 20)
    --output, -o    Write output to file instead of stdout
    --verbose, -v   Show crawling progress
    --help, -h      Show this help
    --version       Show version

  Examples:
    brand-voice https://stripe.com
    brand-voice https://liquiddeath.com --voice --output voice.md
    brand-voice https://notion.so --pages 10 --format json
    brand-voice compare https://stripe.com https://square.com
`;

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      format: { type: "string", short: "f", default: "markdown" },
      voice: { type: "boolean", default: false },
      pages: { type: "string", short: "p", default: "8" },
      output: { type: "string", short: "o" },
      verbose: { type: "boolean", short: "v", default: false },
      help: { type: "boolean", short: "h", default: false },
      version: { type: "boolean", default: false },
    },
  });

  if (values.help || positionals.length === 0) {
    console.log(help);
    process.exit(0);
  }

  if (values.version) {
    const pkg = await import("../package.json", { with: { type: "json" } });
    console.log(pkg.default.version);
    process.exit(0);
  }

  // --voice flag overrides format
  const format = values.voice ? "voice" : values.format;

  const isCompare = positionals[0] === "compare";
  const urls = isCompare ? positionals.slice(1) : [positionals[0]];
  const maxPages = Math.min(parseInt(values.pages) || 8, 20);

  if (urls.length === 0 || (isCompare && urls.length < 2)) {
    console.error(isCompare ? "Error: compare needs two URLs" : "Error: provide a URL");
    process.exit(1);
  }

  const log = values.verbose ? (msg) => process.stderr.write(`  ${msg}\n`) : () => {};

  if (isCompare) {
    log(`Analyzing ${urls[0]}...`);
    const a = await analyzeBrandVoice(urls[0], { maxPages, log });
    log(`Analyzing ${urls[1]}...`);
    const b = await analyzeBrandVoice(urls[1], { maxPages, log });

    const output = format === "json"
      ? JSON.stringify({ brands: [a, b] }, null, 2)
      : formatComparison(a, b);

    await write(output, values.output);
  } else {
    log(`Crawling ${urls[0]}...`);
    const result = await analyzeBrandVoice(urls[0], { maxPages, log });

    let output;
    switch (format) {
      case "json":
        output = formatJSON(result);
        break;
      case "voice":
        output = formatVoiceFile(result);
        break;
      default:
        output = formatMarkdown(result);
    }

    await write(output, values.output);
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

async function write(content, outputPath) {
  if (outputPath) {
    const { writeFileSync } = await import("node:fs");
    writeFileSync(outputPath, content, "utf-8");
    console.error(`Written to ${outputPath}`);
  } else {
    console.log(content);
  }
}

function formatComparison(a, b) {
  return `# Brand Voice Comparison

## ${a.brand} vs ${b.brand}

### Tone
| Dimension | ${a.brand} | ${b.brand} |
|-----------|${"-".repeat(a.brand.length + 2)}|${"-".repeat(b.brand.length + 2)}|
${a.tone.dimensions.map((d, i) => `| ${d.name} | ${d.score}/10 | ${b.tone.dimensions[i]?.score ?? "–"}/10 |`).join("\n")}

### ${a.brand} Summary
${a.summary}

### ${b.brand} Summary
${b.summary}

### Key Differences
${diffBrands(a, b)}
`;
}

function diffBrands(a, b) {
  const diffs = [];
  for (let i = 0; i < a.tone.dimensions.length; i++) {
    const da = a.tone.dimensions[i];
    const db = b.tone.dimensions[i];
    if (db && Math.abs(da.score - db.score) >= 3) {
      diffs.push(`- **${da.name}:** ${a.brand} (${da.score}/10) vs ${b.brand} (${db.score}/10)`);
    }
  }
  return diffs.length ? diffs.join("\n") : "Brands are relatively similar in tone.";
}
