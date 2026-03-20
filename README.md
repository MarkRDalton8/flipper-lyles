# Flipper Lyle's — Project Specification
## flipperlyles.com

### What This Is
A pinball strategy website for intermediate league players. Named after Liquor Lyle's, a legendary Minneapolis dive bar that was repurposed into a pinball bar. The site provides game-specific strategy guides written in a warm, self-deprecating, buddy-at-league voice — NOT the dense rulesheets or 45-minute pro gameplay videos that dominate the space.

### Target Audience
Players who play 2-3 times a week, attend a weekly league, maybe play 1-2 tournaments a month. They can trap the ball sometimes, know what a dead bounce is, but can't reliably post-pass or stack multiballs. They want to know "what do I do when I trap the ball and have no idea what's lit?" — not how to reach the wizard mode.

### Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS with a custom design token layer (CSS variables) — see DESIGN_SYSTEM.md
- **Content:** MDX files per game in /content/games/ — see CONTENT_SCHEMA.md
- **Deployment:** Vercel (auto-deploy from GitHub main branch)
- **Images:** Local /public/playfields/ directory for annotated playfield crops
- **Fonts:** Google Fonts — Oswald (headings), Source Serif 4 (body), JetBrains Mono (metadata/tags)

### Repository Setup
```bash
# Initialize
npx create-next-app@latest flipperlyles --typescript --tailwind --app --src-dir
cd flipperlyles
git init
git remote add origin git@github.com:USERNAME/flipperlyles.git

# Install dependencies
npm install next-mdx-remote gray-matter
```

### Directory Structure
```
flipperlyles/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts, nav, footer
│   │   ├── page.tsx                # Home ("The Bar")
│   │   ├── napkins/
│   │   │   ├── page.tsx            # Bar Napkin index (all games)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Individual Bar Napkin
│   │   └── sources/
│   │       └── page.tsx            # "The Research Pile"
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── GameHeader.tsx          # Badge + meta + stat pips
│   │   ├── BallPlan.tsx            # Ball plan card with priorities
│   │   ├── PriorityItem.tsx        # Individual priority row
│   │   ├── BetweenUs.tsx           # "Between Us" callout box
│   │   ├── OneShot.tsx             # "The One Shot That Matters"
│   │   ├── DontBeAHero.tsx         # Skip section
│   │   ├── StayAlive.tsx           # Survival kit
│   │   ├── ModePills.tsx           # Mode/multiball name tags
│   │   ├── DifficultyTag.tsx       # "You Got This" / "Earnable" / "Good Luck"
│   │   ├── PlayfieldCallout.tsx    # Inline 📍 tag + modal
│   │   └── StatPips.tsx            # 5-pip rating display
│   ├── lib/
│   │   ├── games.ts                # MDX loader / content utils
│   │   └── types.ts                # TypeScript interfaces
│   └── styles/
│       └── tokens.css              # CSS custom properties (design tokens)
├── content/
│   └── games/
│       ├── jaws.json               # Structured game data
│       ├── star-wars-fote.json
│       ├── pulp-fiction.json
│       └── winchester-mystery-house.json
├── public/
│   └── playfields/                 # Annotated playfield images
├── DESIGN_SYSTEM.md
├── CONTENT_SCHEMA.md
└── CLAUDE_CODE_INSTRUCTIONS.md
```

### Key Architectural Decisions

1. **Game content is JSON, not hardcoded JSX.** Each game guide lives in /content/games/ as a structured JSON file. Components consume this data. This means adding a new game = adding a new JSON file, not writing new React components.

2. **The narrative voice lives in the content files.** The components are structural (cards, pills, callouts). The actual personality — the jokes, the self-deprecation, the specific advice — is in the JSON content. This keeps the voice consistent and editable without touching code.

3. **Playfield callouts are data-driven.** Each game JSON has a `playfield_callouts` array with region names, descriptions, and crop coordinates. The PlayfieldCallout component renders the inline 📍 tags and handles the modal.

4. **No CMS yet.** Start with static JSON files committed to the repo. If the site grows beyond 20 games, consider a headless CMS later.

### Pages

| Route | Content |
|-------|---------|
| `/` | Home page ("The Bar") — manifesto, who-this-is-for cards |
| `/napkins` | Grid of all Bar Napkin cards with badges and stat pips |
| `/napkins/[slug]` | Individual Bar Napkin — full game guide |
| `/sources` | "The Research Pile" — all sources by game |

### Deployment
Vercel auto-deploys from `main` branch. No environment variables needed for v1. Add Vercel Analytics later.

```bash
# Deploy
vercel
# Or just push to main — Vercel webhook handles it
git push origin main
```
