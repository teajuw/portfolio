# Portfolio Development Plan

Coordination file for Claude Code (backend) and Antigravity/Gemini (frontend).

---

## Current Status

**Phase:** 3 - RAG Implementation
**Last Updated:** Feb 13, 2026
**Live URL:** https://trevorju.vercel.app

---

## Backend (Claude Code)

- [x] Create GitHub repository
- [x] Initialize Next.js + Tailwind
- [x] Set up Warm Terminal theme
- [x] Create component file structure
- [x] Deploy to Vercel
- [x] RAG content files (`content/projects/*.md`)
- [x] Embedding pipeline (`scripts/build-knowledge.ts`)
- [x] Search API (`/api/search`) - Edge Function
- [x] Ask API (`/api/ask`) - Edge Function with Groq LLM
- [x] Project detail pages (`/projects/[slug]`)
- [x] ProjectFAQ component with source attribution

### To Activate RAG:
```bash
OPENAI_API_KEY=sk-xxx npm run build:knowledge
GROQ_API_KEY=gsk-xxx  # Set in Vercel env vars
```

---

## Frontend (Gemini)

### Phase 1: Foundation - COMPLETE
- [x] Configure Tailwind CSS v4 & globals.css
- [x] Implement layout.tsx with fonts
- [x] Create Header/Footer/ProjectCard components
- [x] Assemble page.tsx with card grid

### Phase 2: Card Visual Redesign (ACTIVE)
- [x] Status system implemented (done/demo/wip/paused)
- [x] Opacity + border system working
- [x] Status badges added
- [ ] **NEW: Make cards more visually appealing**
  - Keep the warm terminal aesthetic
  - Keep status system: dashed border for WIP, badge for demo/paused
  - Cards feel a bit plain — add visual interest
  - Consider: subtle gradients, better tag styling, icon accents, hover states
  - Don't over-design — keep it clean and professional

### Phase 3: RAG Search - COMPLETE (Backend)
- [x] SearchBar with transparent status line
- [x] Results dropdown with relevance + matched terms
- [x] Click result → navigate to project

### Phase 4: Project Pages - COMPLETE (Backend)
- [x] Project detail page template
- [x] Per-project FAQ with LLM + sources

### Phase 5: SEO & Polish
- [ ] Add meta tags (Open Graph, Twitter cards)
- [ ] Add favicon
- [ ] Add sitemap
- [ ] Performance audit

---

## Project Statuses

| Project | Status |
|---------|--------|
| Pickleball CV | paused |
| Spotify RAG | wip |
| AIM VIP | demo |
| Portfolio Site | wip |
| CV Coursework | demo |
| HuggingFace Clone | demo |

---

## Status Card System

### Logic
- **Opacity** = Is it presentable? (100% = yes, 60% = no)
- **Border** = What work remains? (none, outlined, dashed)

### Visual Specs

| Status | Opacity | Border | Badge | Meaning |
|--------|---------|--------|-------|---------|
| **done** | 100% | none | none | Ready to ship |
| **demo** | 60% | 2px solid (outlined) | "needs demo" | Code done, needs docs |
| **wip** | 60% | 2px dashed | "building" | Actively coding |
| **paused** | 60% | none | "paused" | On hold |

### Border Colors
- `demo`: var(--primary) or var(--muted)
- `wip`: var(--primary) - dashed suggests active work
- `paused`: no border

### Badge Styling
- Small, top-right corner
- Background: var(--muted) for paused, var(--primary) for wip
- Text: white, uppercase, 10px, font-mono
- Padding: 4px 8px, border-radius: 4px

### Hover Behavior
- `done`: Full hover effects (lift, shadow)
- `demo`, `wip`, `paused`: Reduced or no hover effects

---

## Current Task: Card Visual Redesign

**Goal:** Make ProjectCard more visually appealing while keeping the warm terminal aesthetic.

**Current state:**
- Cards are white boxes with subtle shadow
- Tags are orange pills
- Status badges work (WIP = dashed border, demo/paused = badge only)

**Ideas to explore:**
- Subtle hover animations or micro-interactions
- Better visual hierarchy between title/description/tags
- Icon or visual accent per project (optional)
- Gradient or texture backgrounds (subtle)
- Better tag styling with icons or better spacing
- Consider a "featured" or accent treatment for done projects

**Constraints:**
- Keep it professional and clean
- Don't break the status system
- Match the warm terminal palette (cream bg, orange primary, muted greys)

---

## Files

| File | Status |
|------|--------|
| `src/components/ProjectCard.tsx` | Ready for visual redesign (Gemini) |
| `src/components/SearchBar.tsx` | RAG integrated, working |
| `src/components/ProjectFAQ.tsx` | LLM FAQ with sources |
| `src/components/Header.tsx` | Done |
| `src/components/Footer.tsx` | Done |
| `src/app/projects/[slug]/page.tsx` | Project detail pages |
| `src/app/api/search/route.ts` | Search API (Edge) |
| `src/app/api/ask/route.ts` | Ask API (Edge + Groq) |
| `src/lib/search.ts` | Search logic |
| `src/lib/embeddings.ts` | Embedding utilities |
| `src/lib/projects.ts` | Project content loader |
| `scripts/build-knowledge.ts` | Embedding pipeline |
| `content/projects/*.md` | 6 project content files |
