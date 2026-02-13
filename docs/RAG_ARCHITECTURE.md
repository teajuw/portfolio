# RAG Architecture Planning

## Overview

This document plans the RAG (Retrieval-Augmented Generation) system for the portfolio, covering both homepage search and per-project intelligence.

---

## System Components

### 1. Homepage Search Bar
**Purpose:** Help users find relevant projects based on interests, skills, keywords, tech stack.

**User intent examples:**
- "computer vision projects"
- "Python experience"
- "real-time ML"
- "what have you built with PyTorch?"

**Output:** Ranked list of relevant projects with relevance explanation.

### 2. Per-Project Intelligence
**Purpose:** Answer questions about a specific project.

**User intent examples:**
- "How does the pose estimation work?"
- "What was the hardest challenge?"
- "What tech stack did you use?"

**Output:** Grounded answer from project content only.

---

## Architecture Options

### Option A: Pure Embedding Search (No LLM)
```
User query → Embed query → Cosine similarity → Ranked results
```
- Fast, cheap, no hallucination
- Limited to keyword/semantic matching
- Can't synthesize or explain

### Option B: RAG with LLM
```
User query → Embed query → Retrieve chunks → LLM generates response
```
- Can explain relevance
- Can synthesize across content
- Needs grounding to prevent hallucination

### Option C: Hybrid
```
User query → Embed query → Retrieve chunks →
  - Simple queries: Return chunks directly
  - Complex queries: LLM synthesizes
```
- Best of both
- More complex to implement

---

## Homepage Search: Design Questions

### Display Options for Results

**1. Reorder cards in place**
- Cards animate to new positions based on relevance
- Most relevant floats to top
- Subtle, integrated feel

**2. Modal with ranked results**
- Click search → modal appears
- Shows ranked projects with relevance snippets
- Click result → goes to project

**3. Dropdown results (Algolia style)**
- Type → dropdown shows matches
- Shows project title + why it matched
- Click → navigates or highlights

**4. Filter mode**
- Non-matching cards fade/grey out
- Matching cards stay prominent
- Real-time as you type

### Placeholder Text Ideas
- "Search projects by skill, tech, or interest..."
- "What are you looking for?"
- "Find projects using RAG search..."
- "Ask me anything about my work..."
- "semantic search across projects..."

---

## Per-Project: Design Questions

### Option 1: Pre-written FAQ
```
▶ How does X work?
▶ What was challenging?
▶ What would you improve?
```
- No LLM needed
- Full control over answers
- Static, doesn't adapt to questions

### Option 2: Smart FAQ (LLM-backed)
```
▶ [Suggested questions based on content]
   User clicks → LLM generates answer from page content
```
- Dynamic suggestions
- Grounded in page content
- Feels more intelligent

### Option 3: Scoped Search Bar
```
[Ask about this project...]
```
- Same UX as homepage
- Scoped to this project's content only
- Full flexibility

### Option 4: LLM Chat (Page-Grounded)
```
Chat interface that ONLY answers from:
- Project README
- Project description
- Visible page content
```
- Most flexible
- Needs strong grounding prompt
- Risk: may refuse valid questions if too strict

---

## Technical Implementation

### Content Sources
```
/content/
├── projects/
│   ├── pickleball-cv.md      # Full project writeup
│   ├── spotify-rag.md
│   └── ...
├── bio.md                     # About me
└── skills.md                  # Technical skills
```

### Embedding Pipeline (Build Time)
```
1. Load all markdown content
2. Chunk into ~500 token segments
3. Embed each chunk (OpenAI text-embedding-3-small)
4. Save to knowledge.json
```

### Search Endpoint
```
POST /api/search
{
  "query": "computer vision projects",
  "scope": "all" | "project-slug"
}

Response:
{
  "results": [
    {
      "project": "pickleball-cv",
      "relevance": 0.92,
      "snippet": "Uses pose estimation and object tracking...",
      "chunk_id": "pickleball-cv-3"
    }
  ]
}
```

### LLM Endpoint (Optional)
```
POST /api/ask
{
  "query": "How does pose estimation work?",
  "scope": "pickleball-cv",
  "chunks": ["pickleball-cv-3", "pickleball-cv-7"]  // from search
}

Response:
{
  "answer": "The pose estimation uses MediaPipe BlazePose...",
  "sources": ["pickleball-cv-3"]
}
```

---

## Decisions Needed

1. **Homepage results display:** Modal, dropdown, reorder cards, or filter?

2. **Per-project approach:** FAQ, smart FAQ, scoped search, or chat?

3. **LLM usage:**
   - None (pure embedding search)?
   - Homepage only?
   - Per-project only?
   - Both?

4. **Grounding strictness:** How strict should the LLM be about only using provided content?

---

## Next Steps

1. [ ] Decide on homepage results display
2. [ ] Decide on per-project approach
3. [ ] Create content markdown files for each project
4. [ ] Build embedding pipeline
5. [ ] Build search API endpoint
6. [ ] Build frontend search component
7. [ ] (Optional) Add LLM synthesis
