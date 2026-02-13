# Portfolio Site

## Overview

Personal portfolio website designed to showcase projects and research with a clean, warm aesthetic. The site itself serves as a demonstration of full-stack and AI capabilities.

## Design Philosophy

### Demo Showcase
Projects are the content. Minimal bio, maximum demonstration of technical skills through the portfolio's own features.

### Warm Terminal Aesthetic
Combines the precision of terminal/code aesthetics with warm, approachable colors. Orange accents on cream backgrounds. Monospace headings with clean sans-serif body text.

### Transparent AI
RAG-powered search that shows its work. Status lines display pipeline stages (embedding, searching, matching). Source attribution for all AI-generated responses.

## Technical Features

### RAG Search
Semantic search across all projects using OpenAI embeddings. Query processing shows transparent pipeline steps. Results ranked by relevance with matched terms highlighted.

### Per-Project FAQ
Each project page has an AI-powered FAQ that only answers from that project's content. Source attribution shows which sections informed the answer.

### Build-Time Embeddings
Content is embedded at build time and stored in JSON. No vector database dependency. Fast cosine similarity search at runtime.

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Space Mono (headings), DM Sans (body)
- **Hosting:** Vercel with Edge Functions
- **AI:** OpenAI embeddings, Groq LLM

## Design System

Colors:
- Background: #FFFDF7 (warm cream)
- Primary: #FF8A00 (orange)
- Foreground: #1A1832 (dark navy)
- Muted: #918A7E (warm grey)

## Status

Work in progress. Core layout complete. RAG search system being implemented.

## Keywords

portfolio, Next.js, React, TypeScript, Tailwind CSS, RAG, semantic search, web development, frontend, full-stack
