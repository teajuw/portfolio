# Portfolio Development Plan

Coordination file for Claude Code (backend) and Antigravity/Gemini (frontend).

---

## Current Status

**Phase:** 1 - Foundation
**Last Updated:** Feb 12, 2026

---

## Backend

### Phase 1: Foundation
- [x] Create GitHub repository
- [x] Initialize Next.js + Tailwind
- [x] Set up Warm Terminal theme (colors, fonts)
- [ ] Create basic file structure for components

### Phase 4: Assistant Backend (later)
- [ ] Set up Edge Functions
- [ ] Implement embedding endpoint (OpenAI)
- [ ] Implement chat endpoint (Groq)
- [ ] Build RAG retrieval logic
- [ ] Create build-time embedding script

---

## Frontend

### Phase 1: Foundation
- [ ] Build basic page layout (header, card grid, footer)

### Phase 2: Project Cards
- [ ] Create ProjectCard component
- [ ] Implement hover tilt effect
- [ ] Add project data (titles, summaries, tags)
- [ ] Style tags with pill design

### Phase 3: Chat Panel
- [ ] Build ChatPanel slide-in component
- [ ] Create chat message UI
- [ ] Add greeting state with suggested prompts
- [ ] Mobile bottom sheet variant

---

## Design Specs

### Colors
```
Background:   #FFFDF7 (warm cream)
Card:         #FFFFFF
Primary:      #FF8A00 (orange)
Text:         #1A1832 (dark navy)
Muted:        #918A7E
Text Light:   #5C5648
Tag BG:       #FFF3DE
Tag Text:     #B86600
```

### Typography
- Headings: Space Mono, bold
- Body: DM Sans, regular

### Card Specs
```
Border radius: 8px
Shadow: 0 4px 12px rgba(26, 24, 50, 0.08)
Padding: 24px
Hover: subtle 3D tilt
```

---

## Notes

- Gemini handles frontend visual implementation
- Claude Code handles backend + orchestration
- Update this file when completing tasks
