# Portfolio Development Plan

Coordination file for Claude Code (backend) and Antigravity/Gemini (frontend).

---

## Current Status

**Phase:** 2 - Polish & Effects
**Last Updated:** Feb 12, 2026

---

## Backend (Claude Code)

- [x] Create GitHub repository
- [x] Initialize Next.js + Tailwind
- [x] Set up Warm Terminal theme (colors, fonts)
- [x] Create component file structure
- [ ] Set up Edge Functions (Phase 4)
- [ ] Implement RAG backend (Phase 4)

---

## Frontend (Gemini)

### Phase 1: Foundation - COMPLETE
- [x] Configure Tailwind CSS v4 & globals.css
- [x] Implement layout.tsx with fonts
- [x] Create Header component
- [x] Create Footer component
- [x] Create ProjectCard component
- [x] Assemble page.tsx with card grid

### Phase 2: Polish
- [ ] Implement hover tilt effect on cards
- [ ] Add card shadow on hover
- [ ] Refine tag pill styling
- [ ] Add links to GitHub/LinkedIn in Footer

### Phase 3: Chat Panel (later)
- [ ] Build ChatPanel slide-in component
- [ ] Create chat message UI
- [ ] Add greeting state with suggested prompts

---

## Design Specs

### Colors (configured in globals.css)
```
--background:         #FFFDF7 (warm cream)
--foreground:         #1A1832 (dark navy)
--card:               #FFFFFF
--primary:            #FF8A00 (orange)
--muted-foreground:   #5C5648
--accent:             #FFF3DE (tag bg)
--accent-foreground:  #B86600 (tag text)
```

### Typography
- Headings: Space Mono, bold (auto-applied via globals.css)
- Body: DM Sans, regular

### Card Hover Effect (TODO)
```
On hover:
- Subtle 3D tilt based on cursor position
- Shadow intensifies
- Slight lift (-translate-y)
```

---

## Files

| File | Status |
|------|--------|
| `src/components/Header.tsx` | Done |
| `src/components/Footer.tsx` | Done (needs real links) |
| `src/components/ProjectCard.tsx` | Done (needs hover tilt) |
| `src/app/page.tsx` | Done |

---

## Notes

- Project data is inline in page.tsx (6 projects)
- lucide-react installed for icons
- Next task: hover tilt effect on cards
