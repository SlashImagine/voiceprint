# tonethief

> Steal any brand's voice from their website. Get a deployable `VOICE.md` in seconds. Zero deps. Zero API keys.

Point it at any URL. Get back archetypes, tone spectrum, vocabulary DNA, writing rules, example copy, and a copy-paste AI system prompt — all packaged as a `VOICE.md` you can drop into any project, agent, or LLM.

**🌐 [tonethief.xyz](https://slashimagine.github.io/tonethief/) · [View Demo](https://github.com/SlashImagine/tonethief/raw/gh-pages/demo.mp4) · [npm](https://www.npmjs.com/package/tonethief)**

---

## The output isn't a report. It's a `VOICE.md`.

Most tools give you analytics. tonethief gives you something you can actually use — a **deployable brand identity file**.

Drop `VOICE.md` into any project, AI agent, or system prompt. Your AI writes indistinguishably from that brand.

Think `SOUL.md` — but for any company on the internet.

---

## Quick start

```bash
# No install — just run it
npx tonethief https://liquiddeath.com

# Save to file
npx tonethief https://yourbrand.com --output VOICE.md

# Compare two brands side-by-side
npx tonethief compare stripe.com square.com

# Analytics view (stats/scores instead of VOICE.md)
npx tonethief https://stripe.com --analytics

# JSON for pipelines
npx tonethief https://notion.so --format json
```

---

## What you get

```markdown
# Liquid Death — VOICE.md
> The brand voice operating system.
> Every word should be indistinguishable from Liquid Death.

## The One-Line Brief
Liquid Death is a provocateur. It speaks in the voice of The Outlaw —
provocative, irreverent, witty. Darkness is a feature, not a bug.

## Archetypes
The Outlaw · The Rebel · The Anti-Hero · The Jester

## Irreverence Score
██████████ 10/10

## ✅ Always
- Lean into dark, unexpected, provocative
- Mock corporate speak — it's the positioning
- Short punchy lines. Let the joke breathe.

## ❌ Never
- Sanitize the edge. That kills the voice.
- Sound like a normal beverage brand.
- Explain the joke.

## System Prompt
[copy-paste into ChatGPT, Claude, or any agent]
```

See [`examples/liquid-death-VOICE.md`](examples/liquid-death-VOICE.md) for the full output.

---

## 12 personality archetypes

| Archetype | Signals |
|-----------|---------|
| **The Outlaw** | Dark language, anti-establishment, 7+ irreverence |
| **The Rebel** | Counter-culture, punk signals, 5+ irreverence |
| **The Anti-Hero** | Irreverent + humorous, refuses convention |
| **The Jester** | Absurdist logic, short punchlines, wit |
| **The Expert** | Technical, precise, formal |
| **The Sage** | Educational, calm authority |
| **The Storyteller** | Human, warm, community-focused |
| **The Coach** | Action-driven, imperative-heavy CTAs |
| **The Friend** | Casual, contractions, approachable |
| **The Minimalist** | Concise, few words, lets product speak |
| **The Analyst** | Data-driven, specific, numbers-forward |
| **The Doer** | Active voice, direct, no passive constructions |

---

## 10-dimension tone spectrum

Each dimension scored 1–10:

- **Formal ↔ Casual** — contractions, slang, register
- **Serious ↔ Playful** — humor signals, energy
- **Technical ↔ Accessible** — jargon load, readability
- **Reserved ↔ Enthusiastic** — exclamations, superlatives
- **Corporate ↔ Human** — "you/we" vs buzzwords
- **Passive ↔ Active** — voice construction analysis
- **Vague ↔ Specific** — numbers, concrete examples
- **Long-winded ↔ Concise** — avg sentence length
- **Earnest ↔ Irreverent** — dark language, anti-establishment signals
- **Dry ↔ Humorous** — absurdist logic, wit, rhetorical patterns

---

## CLI

```
Usage:
  tonethief <url>                     Output VOICE.md (default)
  tonethief <url> --output VOICE.md   Save to file
  tonethief <url> --analytics         Analytics/scores view
  tonethief <url> --format json       Raw JSON output
  tonethief <url> --pages 10          Crawl more pages (default: 8, max: 20)
  tonethief compare <url1> <url2>     Side-by-side brand diff
  tonethief compare <url1> <url2> --format json

Options:
  --analytics, -a   Scores/stats view instead of VOICE.md
  --format, -f      voice (default) | markdown | json
  --pages, -p       Pages to crawl (default: 8)
  --output, -o      Write output to file
  --verbose, -v     Show crawl progress
```

---

## Install

```bash
# npx — no install needed
npx tonethief <url>

# Global install
npm install -g tonethief

# From source
git clone https://github.com/SlashImagine/tonethief
cd tonethief
node bin/cli.js <url>
```

**Requirements:** Node.js 18+. Zero dependencies. Zero API keys.

---

## Examples

- [`examples/liquid-death-VOICE.md`](examples/liquid-death-VOICE.md) — Liquid Death brand identity file

---

## How it works

1. **Crawl** — Fetches up to 8 pages, prioritizing `/about`, `/story`, `/manifesto`, `/blog`. Nav and header copy included — that's where taglines live.
2. **Analyze** — Runs 10-dimension tone analysis using linguistic heuristics. No AI required.
3. **Generate** — Produces archetypes, vocabulary DNA, writing rules, example copy, and an AI-ready system prompt — packaged as VOICE.md.

Runs entirely locally. Zero network calls beyond the target website.

---

## Why tonethief gets Liquid Death right

The original tool returned *"The Analyst, The Minimalist — serious, warm, concise"* for Liquid Death. That's completely wrong.

**The fix:**
- **Nav/header back in crawl** — "Murder Your Thirst" lives in the nav. Stripping it kills the signal.
- **8 pages default** (was 3) — brand personality lives in `/about` and manifestos, not product listings.
- **New archetypes** — The Outlaw, The Rebel, The Anti-Hero, The Jester. The old system had zero concept of irreverence.
- **New tone dimensions** — `Earnest ↔ Irreverent` + `Dry ↔ Humorous`. Liquid Death now scores 10/10 Irreverent.

Result: `The Outlaw · The Rebel · The Anti-Hero · The Jester`

---

## Made by

[Ad Machine](https://admachine.xyz) — AI-powered ad generation.

MIT License · [GitHub](https://github.com/SlashImagine/tonethief) · [Site](https://slashimagine.github.io/tonethief/)
