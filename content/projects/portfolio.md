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
Each project page has an AI assistant (this sidebar) that only answers from that project's content. Answers include source attribution showing which sections informed the response.

Uses Groq's Llama 3.3 70B for fast, grounded responses.

### Build-Time Embeddings
Content lives in markdown files. At build time, a script chunks and embeds all content, storing vectors in a JSON file. No vector database needed - just fast cosine similarity at runtime.

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- OpenAI embeddings + Groq LLM
- Vercel Edge Functions
- GitHub Actions for auto-embedding on content changes

## Metrics

- 6 projects indexed
- ~50 content chunks embedded
- <500ms search latency
- 1536-dim embeddings

## Keywords

portfolio, Next.js, React, TypeScript, Tailwind CSS, RAG, semantic search, LLM, embeddings, Groq, OpenAI
