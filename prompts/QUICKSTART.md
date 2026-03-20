# PASTE THIS INTO CLAUDE CODE TO START THE BUILD

I'm building flipperlyles.com — a pinball strategy site for intermediate league players. I have a complete project specification ready. Here's what I need you to do:

## Context
Read these files in order before writing any code:
1. `README.md` — Project overview, tech stack, directory structure
2. `DESIGN_SYSTEM.md` — Colors, typography, component patterns, aesthetic direction  
3. `CONTENT_SCHEMA.md` — JSON structure for game guides, TypeScript interfaces
4. `CLAUDE_CODE_INSTRUCTIONS.md` — Build phases, critical rules, file naming

## What's Already Done (by me + Claude.ai)
- Complete design system defined
- Content schema with TypeScript interfaces
- Four complete game content JSON files in `/content/games/`: `star-wars-fote.json` (reference example), `jaws.json`, `pulp-fiction.json`, `winchester-mystery-house.json`
- Home page content (`content/home.json`)
- Each game guide is called a "Bar Napkin" on the site — routes are `/napkins/[slug]`

## What I Need You To Build
Follow the build phases in CLAUDE_CODE_INSTRUCTIONS.md:

1. Scaffold Next.js + TypeScript + Tailwind project
2. Implement design tokens and layout shell (header, nav, footer)
3. Build all game guide components (data-driven, consuming JSON)
4. Set up content loading + dynamic `[slug]` routing
5. Build the playfield callout inline parser + modal system
6. Deploy to Vercel via GitHub

## Important
- All 4 game JSON files are ready in `/content/games/` — use `star-wars-fote.json` as the initial test
- Game guides are called "Bar Napkins" — route them at `/napkins/[slug]`
- The aesthetic is "dark arcade bar with editorial confidence" — NOT a SaaS dashboard
- Components must be purely data-driven — no game-specific content in React code
- The `{{callout:id}}` syntax in text fields needs a custom parser
- Use the CSS custom properties defined in DESIGN_SYSTEM.md, integrated with Tailwind

## GitHub
Initialize a git repo, create the GitHub remote, and commit after each build phase. I'll connect Vercel to the repo for auto-deploy.

Start with Phase 1 (scaffold + design tokens) and show me the result before proceeding.
