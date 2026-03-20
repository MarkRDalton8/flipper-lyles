# Flipper Lyle's — Design System

## Aesthetic Direction
**Dark arcade-bar with editorial confidence.** Think: the best pinball bar you've ever been in, but the chalkboard menu was designed by someone who actually knows typography. Moody, warm, textured — NOT slick/corporate and NOT generic dark mode.

## Color Tokens
```css
:root {
  /* Backgrounds */
  --bg-deep: #0a0c10;
  --bg-card: #12151c;
  --bg-card-hover: #181c26;

  /* Accent Colors */
  --accent-gold: #f0c040;       /* Primary brand, headings, active states */
  --accent-orange: #e07020;     /* "Between Us" boxes, warnings */
  --accent-red: #cc3333;        /* Danger, drain ratings, "Don't Be a Hero" */
  --accent-teal: #2ec4b6;       /* Safe zones, "Stay Alive", positive */
  --accent-blue: #3a86ff;       /* Shot tips, playfield callouts */
  --accent-purple: #b060d0;     /* Winchester-specific, events */

  /* Text */
  --text-primary: #e8e4df;
  --text-secondary: #9a9590;
  --text-muted: #5a5550;

  /* Borders */
  --border: #2a2520;

  /* Semantic Backgrounds */
  --danger-zone: #3a1515;
  --safe-zone: #152a1a;
  --caution-zone: #2a2510;
}
```

## Typography
| Role | Font | Weight | Transform | Spacing |
|------|------|--------|-----------|---------|
| Brand / Section Headers | Oswald | 700 | Uppercase | 0.05-0.08em |
| Card Headers / Labels | Oswald | 600 | Uppercase | 0.06-0.1em |
| Body Text | Source Serif 4 | 400 | None | Normal |
| Body Italic | Source Serif 4 | 400 italic | None | Normal |
| Metadata / Tags / Code | JetBrains Mono | 400-500 | Uppercase | 0.1-0.2em |

**NEVER use:** Inter, Roboto, Arial, system fonts. This is not a SaaS dashboard.

## Component Patterns

### Stat Pips (Ratings)
5 small rectangular pips. Filled pips use the semantic color:
- Drain Danger: `--accent-red`
- Rule Complexity: `--accent-gold`
- Fun Factor: `--accent-teal`
- League Frequency: `--accent-gold`

```
[■■■■□] = 4/5
```
Each pip: 16-18px wide, 5-6px tall, 2px border-radius, 2-3px gap.

### Difficulty Tags
Inline pill-shaped tags after priority item headers:
| Label | Background | Text Color | Border |
|-------|-----------|------------|--------|
| You Got This | --safe-zone | --accent-teal | #2a5a35 |
| Earnable | --caution-zone | --accent-gold | #5a5a20 |
| Good Luck | --danger-zone | --accent-red | #5a2a2a |

Font: JetBrains Mono, 0.58-0.62rem, uppercase, 0.12em spacing.

### Mode/Multiball Pills
Inline flex-wrap container of small pills showing mode names:
| Type | Border Color | Text Color | Background |
|------|-------------|------------|------------|
| Multiball (mb) | #2a4a7a | --accent-blue | #0a1525 |
| Mode (md) | #5a5a20 | --accent-gold | #1a1a0a |
| Event (ev) | #3a2060 | --accent-purple | #150a20 |
| Wizard (wiz) | #5a2a2a | --accent-red | #1a0a0a |

Font: JetBrains Mono, 0.6-0.65rem, uppercase, 0.08em spacing.

### Priority Items
Left: numbered circle (32-36px) with rank color:
- P1: `--accent-gold` bg, dark text
- P2: `--accent-orange` bg, dark text
- P3: `--accent-teal` bg, dark text
- P4: `--text-muted` bg, dark text

Right: Oswald h4 header + Source Serif paragraph. Separated by 1px border-bottom in #1a1d24.

### Special Box Types
| Box | Left Border | Label Color | Background |
|-----|-----------|-------------|------------|
| Between Us | --accent-orange | --accent-orange | --bg-card |
| One Shot That Matters | none (1px border all) | --accent-blue | gradient #101520→#0d1118 |
| Don't Be a Hero | none (1px border all) | --accent-red | --danger-zone |
| Stay Alive Out There | none (1px border all) | --accent-teal | --safe-zone |

"One Shot That Matters" gets a 🎯 emoji positioned as ::before, offset -10px top.

### Playfield Callout Tags
Inline element with 📍 prefix:
- Background: gradient #101520→#0d1118
- Border: 1px solid #1a2540
- Font: JetBrains Mono, 0.65rem, uppercase
- Color: --accent-blue
- Hover: border turns --accent-blue, slight translateY(-1px)
- Cursor: pointer
- On click: opens modal with zoomed playfield image

### Game Badge
90-100px square, rounded corners (10-12px), gradient background unique per game:
- Jaws: blue gradient, blue text
- Star Wars: dark indigo gradient, light purple text
- Pulp Fiction: dark brown gradient, gold text
- Winchester: dark purple gradient, purple text

Two lines of text inside: small manufacturer abbreviation + large game abbreviation.

## Layout
- Max content width: 880px, centered
- Section padding: 2rem horizontal
- Card border-radius: 10px
- Body line-height: 1.7
- Mobile breakpoint: 700px (stack grids to single column)

## Texture
Subtle noise overlay on body (SVG filter, opacity 0.03, pointer-events: none, fixed position). Creates a film-grain warmth that prevents the flat-dark-mode look.

## Animation
Minimal. No page transitions. No scroll animations. Just:
- Hover states on nav tabs, playfield callouts, and cards (0.2s transitions)
- Playfield modal fade-in (0.25s)
- Tab content shows/hides (instant, no animation — it's a pinball site, not a portfolio)
