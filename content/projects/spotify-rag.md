# Spotify RAG

## Demo

Video demo coming soon - will show natural language music search in action.

## Overview

A RAG-powered search engine for my Spotify library. Ask questions like "find me something upbeat with meaningful lyrics" and get results based on both audio features and lyric content.

## How It Works

### Data Pipeline
Built an end-to-end pipeline that syncs ~2,000 liked songs from Spotify to a SQLite database. Tracks metadata, download status, and embedding state for each track.

### Dual Embedding Strategy
- **Audio embeddings:** 350-dimensional CLAP embeddings capture musical characteristics (tempo, mood, instrumentation)
- **Lyric embeddings:** 500-dimensional sentence embeddings from Genius lyrics capture thematic content

Both embedding types stored in separate ChromaDB vector databases for flexible querying.

### Two-Stage LLM Pipeline
1. Query interpretation - LLM analyzes natural language to understand intent
2. Dynamic weighting - determines whether to prioritize lyrical vs. musical similarity
3. Hybrid vector search - combines results from both embedding spaces

### Visualization
Built clustering visualizations using PCA and UMAP to explore song similarity. Helps understand how the embedding spaces organize music.

## Tech Stack

- Python, SQLite, ChromaDB
- CLAP (audio embeddings)
- Sentence Transformers (lyric embeddings)
- Spotify API, Genius API, OpenAI API
- PCA, UMAP for visualization

## Metrics

- ~2,000 songs indexed
- 350-dim audio embeddings
- 500-dim lyric embeddings
- 2 ChromaDB vector stores

## Status

In progress. Core pipeline and search working. Building out the query interface and improving result ranking.

## Keywords

RAG, vector search, Spotify, music recommendation, CLAP, sentence transformers, ChromaDB, embeddings, LLM, natural language search
