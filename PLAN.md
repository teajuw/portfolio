# Portfolio Development Plan

Coordination file for Claude Code (backend) and Antigravity/Gemini (frontend).

---

## Current Status

**Phase:** 2 - Status Cards + Chat Trigger
**Last Updated:** Feb 12, 2026
**Live URL:** https://trevorju.vercel.app

---

## Backend (Claude Code)

- [x] Create GitHub repository
- [x] Initialize Next.js + Tailwind
- [x] Set up Warm Terminal theme
- [x] Create component file structure
- [x] Deploy to Vercel
- [ ] Set up Edge Functions (Phase 5)
- [ ] Implement RAG backend (Phase 5)

---

## Frontend (Gemini)

### Phase 1: Foundation - COMPLETE
- [x] Configure Tailwind CSS v4 & globals.css
- [x] Implement layout.tsx with fonts
- [x] Create Header/Footer/ProjectCard components
- [x] Assemble page.tsx with card grid

### Phase 2: Status Cards (ACTIVE)
- [ ] Replace `progress` prop with `status` prop
- [ ] Implement opacity + border system (see specs below)
- [ ] Add status badges

### Phase 3: Chat Trigger (ACTIVE)
- [x] Create ChatTrigger component
- [ ] Refine hover animation
- [ ] Add tooltip on first hover

### Phase 4: Chat Panel
- [ ] Build ChatPanel slide-in component
- [ ] Create chat message UI
- [ ] Add greeting state with suggested prompts

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

## Chat Trigger Specs

```
- Fixed position, right edge, vertically centered
- Tab extends ~40px, expands to ~80px on hover
- Background: var(--primary) with transparency
- Icon: chevron-left (lucide-react)
- Border-radius on left side only (pill edge)
- Shows "Ask me" text on hover
```

---

## Files

| File | Status |
|------|--------|
| `src/components/ProjectCard.tsx` | Needs status prop refactor |
| `src/components/ChatTrigger.tsx` | Basic version done |
| `src/components/ChatPanel.tsx` | TODO |
