# Portfolio Development Plan

Coordination file for Claude Code (backend) and Antigravity/Gemini (frontend).

---

## Current Status

**Phase:** 2 - Progress Cards + Chat Trigger
**Last Updated:** Feb 12, 2026

---

## Backend (Claude Code)

- [x] Create GitHub repository
- [x] Initialize Next.js + Tailwind
- [x] Set up Warm Terminal theme
- [x] Create component file structure
- [ ] Set up Edge Functions (Phase 4)
- [ ] Implement RAG backend (Phase 4)

---

## Frontend (Gemini)

### Phase 1: Foundation - COMPLETE
- [x] Configure Tailwind CSS v4 & globals.css
- [x] Implement layout.tsx with fonts
- [x] Create Header/Footer/ProjectCard components
- [x] Assemble page.tsx with card grid

### Phase 2: Progress Cards (ACTIVE)
- [ ] Add `progress` prop to ProjectCard (0-100)
- [ ] Implement reveal effect (gradient overlay covers incomplete portion)
- [ ] Show progress % in bottom-right corner
- [ ] Reduce hover effects proportionally to progress

### Phase 3: Chat Trigger (ACTIVE)
- [ ] Create ChatTrigger component (fixed right edge)
- [ ] Arrow tab that expands on hover to show "Ask me"
- [ ] Orange glow/branded styling
- [ ] Magnetic hover feel (expands as cursor approaches)

### Phase 4: Chat Panel (later)
- [ ] Build ChatPanel slide-in component
- [ ] Create chat message UI
- [ ] Add greeting state with suggested prompts

---

## Progress Values

| Project | Progress |
|---------|----------|
| Pickleball CV | 80% |
| Spotify RAG | 40% |
| AIM VIP | 60% |
| Portfolio Site | 90% |
| CV Coursework | 50% |
| HuggingFace Clone | 30% |

---

## Design Specs

### Progress Card Reveal Effect
```
- Gradient overlay starts at (100 - progress)% from top
- Overlay: rgba(255, 253, 247, 0.7)
- Progress text: muted, 12px, font-mono, bottom-right
- Hover lift reduced proportionally to completion
```

### Chat Trigger
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
| `src/components/ProjectCard.tsx` | Needs progress prop |
| `src/components/ChatTrigger.tsx` | TODO |
| `src/components/ChatPanel.tsx` | TODO (Phase 4) |
