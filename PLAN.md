# Portfolio Development Plan

Coordination file for Claude Code (backend) and Antigravity/Gemini (frontend).

---

## Current Status

**Phase:** 2 - Project Cards
**Last Updated:** Feb 12, 2026

---

## Backend (Claude Code)

- [x] Create GitHub repository
- [x] Initialize Next.js + Tailwind
- [x] Set up Warm Terminal theme (colors, fonts)
- [x] Create component file structure
- [x] Create project data (`src/data/projects.ts`)
- [ ] Set up Edge Functions (Phase 4)
- [ ] Implement RAG backend (Phase 4)

---

## Frontend (Gemini)

### Phase 1: Foundation
- [x] Configure Tailwind CSS v4 & globals.css
- [x] Implement layout.tsx with fonts
- [ ] Create Header component
- [ ] Create Footer component

### Phase 2: Project Cards
- [~] Create ProjectCard component (scaffold exists, needs styling)
- [ ] Implement hover tilt effect
- [ ] Style tags with pill design
- [ ] Assemble page.tsx with card grid

### Phase 3: Chat Panel (later)
- [ ] Build ChatPanel slide-in component
- [ ] Create chat message UI
- [ ] Add greeting state with suggested prompts

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
Hover: subtle 3D tilt (transform based on cursor position)
```

---

## Files

| File | Purpose |
|------|---------|
| `src/data/projects.ts` | Project data (6 projects) |
| `src/components/ProjectCard.tsx` | Card component (needs hover effect) |
| `src/components/Header.tsx` | TODO |
| `src/components/Footer.tsx` | TODO |

---

## Notes

- Project data is ready in `src/data/projects.ts`
- ProjectCard scaffold exists, Gemini should add hover tilt effect
- Use CSS variables via `style={{ color: 'var(--name)' }}`
