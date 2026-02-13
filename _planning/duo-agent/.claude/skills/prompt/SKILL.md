---
name: prompt
description: Generate or update the Antigravity frontend agent system prompt based on current project state
---

Read the current project to understand:
1. The tech stack (check package.json, requirements.txt, or equivalent)
2. The styling approach (Tailwind, CSS modules, etc.)
3. The component patterns already in use
4. The current state of PLAN.md

Then update `FRONTEND_AGENT.md` at the project root with a system prompt for the Antigravity frontend agent that includes:
- The specific tech stack and styling approach for this project
- Any component conventions or patterns established in the codebase
- Reference to PLAN.md as the source of truth for tasks and contracts
- The standard rules (don't touch backend, verify visually, flag missing contracts)

If `FRONTEND_AGENT.md` already exists, preserve any manual edits the user has made and only update the project-specific sections.

Keep it concise. The prompt should be under 40 lines. The Antigravity agent doesn't need a novel — it needs clear instructions.
