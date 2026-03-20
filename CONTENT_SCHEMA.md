# Flipper Lyle's — Content Schema

## Game Guide JSON Structure ("Bar Napkins")

Each game guide — called a "Bar Napkin" on the site — lives in `/content/games/{slug}.json`. The components consume this data to render the full guide page. All narrative text — the personality, jokes, specific advice — lives HERE, not in components. The URL route is `/napkins/{slug}`.

```typescript
interface GameGuide {
  // Meta
  slug: string;                    // URL slug: "jaws", "star-wars-fote"
  title: string;                   // Display name: "Jaws"
  manufacturer: string;            // "Stern", "Chicago Gaming", "Barrels of Fun"
  manufacturer_short: string;      // "Stern", "CGC", "BoF"
  designer: string;                // "Keith Elwin"
  code_by: string;                 // "Rick Naegele / Elizabeth Gieske"
  year: number;                    // 2024
  description: string;             // One-line italic tldr under the title

  // Badge styling (unique per game)
  badge: {
    gradient_from: string;         // "#1a2a4a"
    gradient_to: string;           // "#0a1525"
    border_color: string;          // "#2a4a7a"
    text_color: string;            // "#4a9aff"
    abbreviation: string;          // "JAWS"
  };

  // Ratings (1-5 scale)
  ratings: {
    drain_danger: number;
    rule_complexity: number;
    fun_factor: number;
    league_frequency: number;      // How often you'll see this at league
  };

  // 30-Second Summary
  summary: {
    text: string;                  // HTML allowed for <strong> tags
    modes: ModePill[];
  };

  // The One Shot That Matters
  one_shot: {
    name: string;                  // "Center Ramp"
    description: string;           // Full narrative paragraph
  };

  // "Between Us — What Makes This Game Hard"
  hard_box: {
    text: string;
  };

  // Ball Plans
  ball_plans: BallPlan[];

  // Stay Alive Out There
  survival: {
    items: SurvivalItem[];
  };

  // Don't Be a Hero
  skip: {
    items: SkipItem[];
  };

  // Between Us boxes (misc — scores, model differences, etc.)
  between_us: BetweenUsBox[];

  // Playfield callouts
  playfield_callouts: PlayfieldCallout[];

  // Sources
  sources: Source[];

  // Level Up (advanced section, collapsed by default)
  level_up?: LevelUpSection;
}

interface ModePill {
  name: string;                    // "Night Swim"
  type: "mb" | "md" | "ev" | "wiz";  // multiball, mode, event, wizard
}

interface BallPlan {
  ball_number: number;             // 1, 2, 3
  title: string;                   // "Spell FORCE, Start a Mission"
  priorities: Priority[];
}

interface Priority {
  rank: 1 | 2 | 3 | 4;
  title: string;                   // "Hit the Skill Shot"
  difficulty: "easy" | "medium" | "hard";  // renders as You Got This / Earnable / Good Luck
  description: string;             // Full narrative. Can include playfield callout refs as {{callout:chum-bucket}}
}

interface SurvivalItem {
  title: string;                   // "Life Ring (Action Button)"
  description: string;
}

interface SkipItem {
  title: string;                   // "Pond Attack encounter"
  description: string;
}

interface BetweenUsBox {
  label: string;                   // "Good Scores to Aim For"
  text: string;
}

interface PlayfieldCallout {
  id: string;                      // "chum-bucket"
  name: string;                    // "Chum Bucket Captive Ball"
  description: string;             // What it is and why it matters
  image: string;                   // Path to cropped playfield image: "/playfields/jaws/chum-bucket.webp"
  // OR if using a single annotated image with zoom regions:
  crop?: {
    x_percent: number;             // Center of crop as % of image width
    y_percent: number;             // Center of crop as % of image height
    zoom: number;                  // Zoom level (1.5 - 3.0)
  };
}

interface Source {
  title: string;                   // "Kineticist — 'Sharkbit' Tutorial"
  type: "guide" | "podcast" | "forum" | "official" | "video" | "news";
  description: string;             // What we used it for
  url: string;
}

interface LevelUpSection {
  intro: string;                   // "Ready to push further? These strategies involve stacking..."
  tips: LevelUpTip[];
}

interface LevelUpTip {
  title: string;
  description: string;
}
```

## Playfield Callout Inline Syntax

In narrative text, reference playfield callouts using double-brace syntax:

```
"Hit the {{callout:chum-bucket}} to advance the chum line."
```

The rendering component should:
1. Parse the text for `{{callout:id}}` patterns
2. Look up the callout by ID from the game's `playfield_callouts` array
3. Render an inline `<PlayfieldCallout>` component with the 📍 tag
4. On click, open a modal showing the cropped playfield image + description

## Adding a New Bar Napkin

1. Create `/content/games/new-game.json` following the schema
2. Add playfield images to `/public/playfields/new-game/`
3. The `[slug]` dynamic route automatically picks it up at `/napkins/new-game`
4. Add sources to the game's `sources` array
5. Commit and push — Vercel deploys

No code changes required for new games.
