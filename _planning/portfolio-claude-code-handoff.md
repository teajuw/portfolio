# Portfolio Project — Claude Code Handoff Document

**Date:** February 12, 2026
**Status:** Planning complete, ready for implementation
**Purpose:** Transfer all design and architecture decisions to Claude Code for building

---

## Project Summary

Building a personal portfolio website for an ML/AI new grad (Dec 2024). The portfolio itself is a live demonstration of core skills: LLM/RAG systems, computer vision, and frontend development. The site features two primary views — a traditional project card layout and a RAG-powered conversational interface — unified by a **toy-like, transparent** design philosophy.

### Two Guiding Design Principles

1. **Toy-like:** Playful, interactive, blocky, invites clicking. Hover effects (cards tilt, elements react to cursor). Almost game-like but still professional enough for hiring managers. Think friendly dev tool, not children's toy.

2. **Transparency:** The RAG pipeline shows its work visibly. Every retrieval step is displayed as a progress message with plain-English descriptions and clickable links to source files. The user sees *how* the system finds information, not just the result. This is both a UX feature and a skill demonstration.

These two principles are intertwined — the toy-like interactions make the transparency engaging rather than dry.

---

## Decisions Already Made

### Hosting & Infrastructure
- **Frontend:** Vercel (free tier, Git-based deploys) — NOT GitHub Pages
- **Backend:** Railway or Fly.io (~$5-10/month) for any backend services needed
- **Repo:** Dedicated repository. Clean README from day one (this repo IS a portfolio entry).

### Color Scheme: Mango Fizz
Selected from 10+ explored palettes. Warm yellow-orange on white. Key values:

```
Background:     #FFFDF7
Card:           #FFFFFF
Primary:        #FF8A00  (golden-orange)
Secondary:      #FFAB42
Accent/Text:    #1A1832  (deep navy-charcoal)
Muted:          #918A7E
Text Light:     #5C5648
Code Block BG:  #FFF7EA
Tag BG:         #FFF3DE
Tag Text:       #B86600
Chat Bubble:    #FF8A00
Bubble Text:    #FFFFFF
Step BG:        #FFEED4  (transparency step background)
Step Text:      #A06B10  (transparency step text)
```

### Typography
- **Display/Headings:** Space Mono (blocky, monospace, bold) — reinforces the dev/toy aesthetic
- **Body:** DM Sans (clean, readable, pairs well with Space Mono)
- Blocky feel throughout — letter-spacing tight on headings, generous on body

### Micro-Interactions
- Hover effects: cards tilt, elements react to cursor position
- NOT bouncy physics or heavy animation — subtle, tactile, responsive
- CSS transitions preferred, keep it performant

### Layout: Companion Chat Panel
- **Desktop:** Chat panel slides in from right (~30-40% width), main content compresses to accommodate. NOT a separate page or tab.
- **Mobile:** Bottom sheet that slides up from a bubble.
- **Key feature:** The chat can interact with the page — when it finds relevant projects, those cards highlight/glow on the main page. Clickable links in chat responses scroll to and highlight the relevant page sections.
- **Landing state:** TBD (collapsed bubble vs. greeting — decide during implementation)

### Views
1. **Card View (Traditional):** 5 project cards with auto-generated smart summaries and keywords. Clean, scannable, works without the chat.
2. **Chat View (LLM):** RAG-powered assistant that retrieves from project data and answers questions about the portfolio owner's experience.

Both views coexist — the chat panel overlays/accompanies the card view.

---

## RAG Architecture — "Toy RAG" Build

### Design Philosophy
This should be ~200 lines of code total. Intentionally simple. The transparency UX makes simplicity a feature, not a limitation.

### Three-Tier Architecture

**Tier 1 — Build Time (free, runs once per deploy)**
- Script processes all project READMEs, bio, context.md, etc.
- Generates: smart summaries, keywords, text chunks, pre-computed embeddings
- Output: single `knowledge.json` bundled with the static site
- This powers the card view (summaries, keywords) at zero runtime cost

**Tier 2 — Client-Side Retrieval (free, runs in browser)**
- User query gets compared against pre-computed embeddings
- Cosine similarity in ~20 lines of JS
- Returns ranked chunks with similarity scores
- ALL transparency steps at this tier are real, local operations:
  - "searching project embeddings..." → actual cosine similarity computation
  - "found 2 matches (0.91, 0.84)" → real scores
  - "retrieving README context..." → pulling the matched chunks
- Option to explore: Transformers.js for client-side query embedding (~30MB, lazy-loaded)
- Alternative: pre-compute a simpler index (TF-IDF based) to avoid the model download
- **This tier IS the fallback** — if the LLM is unavailable, show retrieved chunks directly

**Tier 3 — LLM Response (Groq free tier, rate limited)**
- Only the final "composing response..." step hits the API
- Uses Groq with Llama 3 (fast inference, generous free tier)
- One API call per user message
- **Graceful degradation:** If rate-limited, chat says "running in lightweight mode" and shows retrieved chunks without conversational wrapper

### Transparency UX Spec
When a user asks a question, the chat shows sequential status messages:

```
⟳ searching project embeddings...
✓ found 2 matches (similarity: 0.91, 0.84)     ← clickable, shows sources
⟳ retrieving context from README.md...          ← "README.md" is a link
✓ composing response via llama-3...
```

- Each step appears sequentially with a brief delay (real processing time, not fake)
- Completed steps dim (opacity ~0.45) as new steps appear
- Steps are expandable on click to show details (similarity scores, chunk text, source files)
- Links in steps (e.g., "README.md", "context.md") are clickable and navigate to the source

### Important: LLM-Free Exploration
The owner is actively exploring whether this can be done WITHOUT an LLM entirely — potentially using only retrieval + template-based responses. Claude Code instance should explore this direction. The simpler the better. If the retrieval is good enough and the transparency is engaging, a templated response might be sufficient and eliminates all API dependency.

### Data Sources for RAG
- Project README files (from GitHub repos)
- Bio / about / context.md files
- System prompt (made transparent as a feature)
- Current date / context
- Commit history metadata (where relevant)
- Any publicly available project data

---

## Project Lineup (5 Projects)

### 1. Pickleball Computer Vision — FLAGSHIP
- **Category:** Computer Vision for Sports
- **Status:** Baseline complete, 2-3 weeks of active dev planned
- **Tech:** Pose estimation, object detection/tracking, court mapping
- **Demo:** Pre-processed video with interactive overlays (bounding boxes, pose skeletons, shot analytics). Metrics like shot speed, court coverage, rally length.
- **Why flagship:** Aligns with career goal (sports CV). Visually compelling. Shows end-to-end pipeline.
- **Pinned position:** Top row, passion project

### 2. AIM VIP — NPU Hardware Acceleration Research
- **Category:** Research / Hardware-Aware ML
- **Status:** Complete (collaborative)
- **Tech:** MediaPipe, NPU acceleration, performance benchmarking
- **Demo:** Side-by-side CPU vs NPU inference comparison with FPS/latency metrics. Possible webcam pose estimation.
- **Framing:** "Contributed to large-scale research; here I demonstrate the core concept independently."
- **Pinned position:** Top row, passion project

### 3. Spotify RAG Search + DJ Assistant (Paired Entry)
- **Category:** Multimodal Retrieval / Audio ML

#### 3a. Spotify RAG Search (primary)
- **Tech:** CLAP, sentence transformers, vector database
- **Demo:** Interactive search — type mood/lyric descriptions, see results with retrieval pipeline visualized
- **Status:** WIP, needs polish

#### 3b. DJ Assistant (secondary, shows frontend/design skills)
- **Tech:** Essentia, Demucs (stem separation), audio feature extraction, compatibility scoring
- **Demo:** Visual pipeline breakdown of song analysis and compatibility
- **Status:** Stopped but has working components, present as-is with clean writeup
- **Pinned position:** Top row, passion project

### 4. CV Coursework — Combined Entry
- **Category:** CV Fundamentals + Research Methodology
- **Status:** Complete
- **4a:** HW2 — Image classifiers from scratch implementing foundational CV paper architectures
- **4b:** Term project — SAM 2 background augmentation for fine-tuned classification + ablation study
- **Demo:** Visualizations — training curves, confusion matrices, augmented images, ablation results table
- **Framing:** Progression from fundamentals to research methodology
- **Pinned position:** Bottom row, foundations

### 5. HuggingFace Clone — Class Project
- **Category:** SWE / MLOps
- **Status:** Complete
- **Tech:** CI/CD, AWS deployment, end-to-end platform
- **Demo:** No live demo. Architecture diagram + clean writeup.
- **Pinned position:** Bottom row, foundations

### The Portfolio Itself (Implicit 6th)
- **Pinned position:** Bottom row, foundations
- Documents the RAG pipeline, design decisions, and transparent architecture

---

## GitHub Pinned Projects Layout

**Top Row (Passion / Flagship):**
1. Pickleball CV
2. Spotify RAG
3. AIM VIP

**Bottom Row (Foundations):**
4. Portfolio Site
5. CV Coursework
6. HuggingFace Clone

---

## Smart Summaries & Keywords
- NOT manual tags — auto-generated at build time
- LLM (or simpler NLP) processes each project's README and generates:
  - One-line summary
  - 3-5 keywords
- Cached/pre-generated so the site loads fast
- Could version them: "summary generated from README as of [commit hash]"

---

## Design Details to Finalize During Implementation

- [ ] Chat panel landing state (collapsed bubble vs. greeting with suggested prompts)
- [ ] Exact chat panel width and animation behavior
- [ ] Mobile breakpoint behavior for chat (bottom sheet specifics)
- [ ] How video demos are embedded and controlled (for Pickleball CV especially)
- [ ] Whether to use Transformers.js client-side or a simpler retrieval approach
- [ ] LLM vs. no-LLM decision (explore template-based responses)
- [ ] Project page layout (individual project detail pages vs. expanded cards)
- [ ] Smart summary generation approach (LLM at build time vs. simpler NLP)
- [ ] Exact hover tilt parameters and interaction feel

---

## Tech Stack (Recommended, Finalize in Implementation)

- **Framework:** Next.js or Astro (static-first, Vercel-friendly)
- **Styling:** Tailwind CSS (utility classes, easy to maintain the Mango Fizz theme)
- **Animations:** CSS transitions for hovers, Framer Motion if needed for panel slides
- **Fonts:** Space Mono (Google Fonts) + DM Sans (Google Fonts)
- **RAG:** Custom ~200 LOC pipeline, knowledge.json, cosine similarity
- **LLM (if used):** Groq free tier, Llama 3
- **Deployment:** Vercel (frontend) + Railway/Fly.io (backend, if needed)

---

## Files to Create in Repo

```
portfolio/
├── README.md              ← Clean, this is a portfolio entry itself
├── docs/
│   ├── DESIGN.md          ← This document, design decisions
│   ├── RAG_ARCHITECTURE.md
│   └── COLOR_SCHEME.md
├── src/
│   ├── ...                ← Implementation
│   └── knowledge.json     ← Pre-computed RAG data (generated at build)
├── scripts/
│   └── build-knowledge.js ← Build-time script to generate knowledge.json
└── ...
```
