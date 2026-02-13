# Portfolio Site

## Demo

Video demo coming soon - will show the RAG search pipeline in action.

## Overview

This portfolio is a live demo of my ML/AI engineering skills. The site itself showcases RAG search, LLM integration, and modern web development.

## How It Works

### Semantic Search
Type a query like "computer vision" or "Python projects" in the search bar. The system:
1. Embeds your query using OpenAI's text-embedding-3-small
2. Compares against pre-computed project embeddings via cosine similarity
3. Returns ranked results with relevance scores and matched terms

The status line shows each step transparently: `embedding → searching → found X matches`

### Per-Project FAQ
Each project page has an AI assistant that only answers from that project's content. Answers include source attribution showing which sections informed the response.

Uses Groq's Llama 3.3 70B for fast, grounded responses.

### Build-Time Embeddings
Content lives in markdown files. At build time, a script chunks and embeds all content, storing vectors in a JSON file. No vector database needed - just fast cosine similarity at runtime.

## CI/CD Automation

### Auto-Embedding Pipeline
GitHub Action triggers on any push to `content/**`. The workflow:
1. Checks out repo and installs dependencies
2. Runs embedding script with OpenAI API
3. Diffs the generated knowledge.json
4. If changed, commits and pushes automatically

This means I can edit project content in markdown, push, and embeddings regenerate without manual intervention. The `[skip ci]` tag prevents infinite loops.

### Vercel Integration
Repo is connected to Vercel for automatic deployments. Flow:
- Push content → GitHub Action generates embeddings → commits → Vercel deploys

Zero-touch content updates with fresh search indexes.

## What I Learned

- **RAG is about chunking:** Bad chunks = bad retrieval. Section-based chunking with clear headers works better than arbitrary token windows.
- **Transparency builds trust:** Showing "embedding → searching → found 3 matches" makes the AI feel less like magic and more like a tool.
- **Edge functions have limits:** Vercel Edge has size constraints. Keeping knowledge.json small by only storing necessary metadata matters.
- **Two-agent workflow:** Using Claude for backend and Gemini for frontend via PLAN.md coordination worked surprisingly well.

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- OpenAI embeddings + Groq LLM
- Vercel Edge Functions
- GitHub Actions for auto-embedding

## Metrics

- 4 projects indexed
- ~27 content chunks embedded
- <500ms search latency
- 1536-dim embeddings

## Status

Work in progress. Core search and FAQ functional. Adding demo videos and polish.

## Keywords

portfolio, Next.js, React, TypeScript, Tailwind CSS, RAG, semantic search, LLM, embeddings, Groq, OpenAI
