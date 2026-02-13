# Spotify RAG

## Overview

Retrieval-Augmented Generation system for Spotify data, allowing natural language queries about music taste and intelligent playlist generation. Demonstrates RAG architecture, embedding pipelines, and LLM integration.

## Technical Architecture

### Data Ingestion
Pulls listening history, saved tracks, playlists, and audio features via Spotify Web API. Data is normalized and enriched with genre tags and artist metadata.

### Embedding Pipeline
Track and playlist descriptions are embedded using OpenAI's text-embedding-3-small model. Audio features (tempo, energy, valence, etc.) are concatenated as structured metadata.

### Vector Storage
Embeddings stored in a local ChromaDB instance for development. Production would use Pinecone or similar managed vector DB.

### Query Processing
Natural language queries are:
1. Embedded using the same model
2. Matched against track/playlist embeddings via cosine similarity
3. Top-k results passed to LLM with query for response generation

### LLM Integration
Uses Groq (Llama 3) for fast inference. The LLM synthesizes retrieved context into natural responses like "Based on your listening history, you seem to enjoy upbeat indie rock. Here are some recommendations..."

## Example Queries

- "What genres do I listen to most?"
- "Make me a workout playlist"
- "Find songs similar to my top tracks from last month"
- "What's my most underrated artist?"

## Tech Stack

- **LLM:** Groq (Llama 3 70B)
- **Embeddings:** OpenAI text-embedding-3-small
- **Vector DB:** ChromaDB (dev), Pinecone (prod)
- **API:** Spotify Web API
- **Backend:** FastAPI, Python

## Status

Work in progress. Core RAG pipeline functional. Currently building the playlist generation feature and improving query understanding.

## Keywords

RAG, retrieval-augmented generation, LLM, embeddings, vector database, Spotify API, natural language processing, recommendation system, Groq, ChromaDB
