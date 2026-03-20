# Claude Code Instructions — Flipper Lyle's

## Your Role
You are building the frontend for flipperlyles.com — a pinball strategy site. The game research, narrative writing, and content generation is handled separately (in Claude.ai conversations). Your job is:

1. Scaffold the Next.js project with the correct structure
2. Implement the design system from DESIGN_SYSTEM.md precisely
3. Build reusable components that consume the JSON content schema from CONTENT_SCHEMA.md
4. Set up the routing, MDX/JSON loading, and deploy pipeline
5. Make it look GOOD — this is not a prototype, it's the real site

## Build Order

### Phase 1: Scaffold + Design Tokens
```bash
npx create-next-app@latest flipperlyles --typescript --tailwind --app --src-dir
cd flipperlyles
```
- Set up Google Fonts (Oswald, Source Serif 4, JetBrains Mono) in layout.tsx
- Create `/src/styles/tokens.css` with all CSS custom properties from DESIGN_SYSTEM.md
- Import tokens in the global stylesheet
- Set up the noise texture overlay on body
- Implement the dark background, base typography

### Phase 2: Layout Shell
- Build the site header with "Flipper Lyle's" branding (see DESIGN_SYSTEM.md for the gold/white split)
- Build the nav bar with tab styling
- Build the footer
- Home page with manifesto content and "Who's This For" cards
- Verify fonts render correctly, colors match tokens

### Phase 3: Game Guide Components
Build these components to be purely data-driven — they take props from the JSON schema, they don't contain any game-specific content:

- `GameHeader` — badge + meta + stat pips + description
- `Summary` — 30-second summary with ModePills
- `OneShot` — 🎯 box with the key shot
- `BetweenUs` — orange-bordered callout (reusable, takes label + text)
- `BallPlan` — card with header bar (ball number badge) + priority items
- `PriorityItem` — rank circle + title with difficulty tag + description
- `DontBeAHero` — red danger box with ⚠ list items
- `StayAlive` — green survival box with → list items
- `ModePills` — flex-wrap container of colored pills
- `DifficultyTag` — inline pill ("You Got This" / "Earnable" / "Good Luck")
- `StatPips` — 5-pip rating bar with color parameter
- `PlayfieldCallout` — inline 📍 tag that opens a modal on click
- `PlayfieldModal` — overlay with zoomed image, title, description, close button

### Phase 4: Content Loading + Dynamic Routes
- Create `/content/games/` directory with JSON files
- Build a `getGameBySlug()` utility that reads and parses the JSON
- Build a `getAllGames()` utility for the game index page
- Set up `/napkins/[slug]/page.tsx` to load the correct game JSON and render all components
- Build `/napkins/page.tsx` as a card grid linking to each game (each card labeled "Bar Napkin")
- Build `/sources/page.tsx` that aggregates all game sources
- URLs should be: `flipperlyles.com/napkins/jaws`, `flipperlyles.com/napkins/pulp-fiction`, etc.

### Phase 5: Playfield Callout System
- Parse `{{callout:id}}` syntax in narrative text (build a custom text renderer)
- Render inline PlayfieldCallout components
- Build the modal with image zoom (CSS transform-based, not a separate cropped image)
- Support Escape key and overlay click to close
- Fallback gracefully if image doesn't load (show link to source instead)

### Phase 6: Polish + Deploy
- Mobile responsive (700px breakpoint, stack grids)
- Verify all fonts, colors, spacing match DESIGN_SYSTEM.md
- Add `<meta>` tags for SEO (title, description per page)
- Set up GitHub repo + Vercel project
- Push to main, verify deployment

## Critical Rules

1. **DO NOT use generic AI aesthetics.** No Inter font, no purple-on-white gradients, no rounded-everything SaaS look. Read DESIGN_SYSTEM.md carefully. This should look like it was designed by someone who hangs out in pinball bars.

2. **Components are dumb, content is smart.** Components should NEVER contain game-specific text, strategy advice, or jokes. They render whatever the JSON gives them. All personality lives in the content files.

3. **The playfield callout text parser is important.** The `{{callout:id}}` syntax appears throughout narrative text in the JSON files. Build a robust parser that handles this — probably a custom React component that splits text on the pattern and interleaves PlayfieldCallout components.

4. **Preserve the noise texture.** The subtle SVG noise overlay on the body is what prevents the flat-dark-mode look. Don't remove it.

5. **The nav should work as client-side navigation**, not full page reloads. Standard Next.js Link behavior.

6. **No JavaScript frameworks for animations.** CSS transitions only. This is a content site, not a demo reel.

## File Naming
- Components: PascalCase (`BallPlan.tsx`)
- Content files: kebab-case (`star-wars-fote.json`)
- Utilities: camelCase (`getGameBySlug.ts`)
- Styles: kebab-case (`tokens.css`)

## Git Workflow
```bash
git checkout -b feature/scaffold
# ... build phase 1-2
git add . && git commit -m "scaffold: project structure, design tokens, layout shell"
git push origin feature/scaffold

git checkout -b feature/game-components
# ... build phase 3-4
git add . && git commit -m "feat: game guide components + content loading"
git push origin feature/game-components

# etc. — merge to main when each feature is stable
```

## Testing
For v1, manual testing is fine. Verify:
- All 4 game guides render correctly from JSON
- Mobile responsive at 700px
- Playfield modal opens/closes (click + escape)
- Nav works between all pages
- Vercel build succeeds
- Fonts load correctly (check network tab)
