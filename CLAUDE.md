# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A VitePress-based knowledge base for AI Coding and Frontend Development content. All documentation is in Chinese.

**Architecture inspired by [Karpathy's Agent + Obsidian pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f):** LLM acts as a knowledge engineer, continuously maintaining a Wiki that grows with compound interest.

## Two-Layer Architecture

```
kb/
├── docs/                   # Layer 1: Wiki (LLM writes, human reads)
│   ├── index.md            # Content directory
│   ├── log.md              # Timeline log
│   └── ...                 # Categorized content
└── CLAUDE.md               # Layer 2: Schema (this file)
```

| Layer | Purpose | Who Owns |
|-------|---------|----------|
| **Wiki** | Structured knowledge, cross-linked | LLM writes, human reads |
| **Schema** | Rules, conventions, operations | Co-evolved with usage |

## Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Three Core Operations

### Ingest（录入）

Add new source to the knowledge base.

**Workflow:**
1. User provides URL → LLM fetches content
2. LLM reads content, discusses key points with user
3. LLM creates summary page in Wiki, updates related entity/concept pages
4. Update `docs/log.md` with entry
5. Update sidebar in `docs/.vitepress/config.mts` if needed

**Trigger:** `/collect <URL>`

**Wiki document format:**
```markdown
> 来源：[原标题](原URL)

# 标题

...content...
```

### Query（提问）

Ask questions against the Wiki.

**Workflow:**
1. User asks a question
2. LLM searches relevant Wiki pages (via index or Obsidian graph)
3. LLM synthesizes answer from multiple sources
4. Optionally save good answers as new Wiki pages

**Key insight:** Good Q&A becomes new knowledge, enriching the Wiki.

### Lint（体检）

Periodic health check for the Wiki.

**Checks:**
- Contradictions between pages
- Orphan pages (no incoming links)
- Missing cross-references
- Outdated information superseded by new sources
- Important concepts without dedicated pages

**Output:** Lint report with actionable fixes

**Trigger:** `/lint` or periodic maintenance

## Content Structure

```
docs/
├── ai-coding/
│   ├── ai-editors/      # Cursor, Copilot, Claude Code
│   ├── prompt-skills/   # Prompt techniques
│   ├── ai-workflow/     # AI-assisted workflows
│   └── ai-frameworks/   # AI development frameworks
├── frontend/
│   ├── frameworks/      # React, Vue
│   ├── languages/       # TypeScript
│   ├── build-tools/
│   └── engineering/
├── tools/
│   ├── editors/         # VS Code
│   ├── debugging/
│   ├── version-control/
│   └── productivity/
└── best-practices/
```

## Key Files

- `docs/.vitepress/config.mts` - VitePress config with sidebar structure
- `docs/log.md` - Timeline of knowledge base changes
- `.cursor/skills/collect-kb-article/SKILL.md` - Article collection skill

## Deployment

Pushing to `main` branch triggers GitHub Actions to build and deploy to GitHub Pages.

## Obsidian Integration

This project is an Obsidian vault. Open the root directory in Obsidian to:
- View knowledge graph
- Follow backlinks
- Use graph view to spot clusters and orphans
