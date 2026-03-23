# Flipper Lyle's — Pinball Map Integration Spec

## Overview

Each Bar Napkin page gets a "Find This Game Near You" section that queries the [Pinball Map API](https://pinballmap.com/api/v1/docs) to show nearby public locations where the game is on location. Pinball Map is a free, open-source, crowdsourced database of 51,000+ machines at 12,000+ locations. Their API is public and used by Stern Pinball, Kineticist, Matchplay Events, and others. **Attribution is required.**

## Schema Addition

Add a new top-level field to each game JSON:

```typescript
interface GameGuide {
  // ... existing fields ...

  // Pinball Map integration
  pinball_map: {
    machine_ids: number[];        // Pinball Map machine IDs (one per model variant)
    machine_group_id?: number;    // Optional: Pinball Map group ID (covers all variants)
    opdb_id?: string;             // Optional: Open Pinball Database ID (e.g., "G9pXk-LqP3w")
    search_name: string;          // Fallback: name to search if IDs fail (e.g., "Jaws")
  };
}
```

### Why `machine_ids` is an array

Pinball Map treats Pro, Premium, LE, and special editions as separate machines. Our Bar Napkins cover all variants. The `machine_ids` array lets us query for ALL versions of a game. For single-version games (Cyclone, T2, etc.), it's a single-element array.

### Known Machine IDs

Look these up at build time using the Pinball Map API:

```
GET https://pinballmap.com/api/v1/machines.json?name={search_name}
```

This returns all matching machines with `id`, `name`, `manufacturer`, `year`, `machine_group_id`.

**Confirmed IDs from research:**

| Game | Search Name | Known ID(s) | Notes |
|------|-------------|-------------|-------|
| Jaws | `Jaws` | Pro: 3799 | Look up Premium, LE, 50th Anniversary IDs |
| Terminator 2 | `Terminator 2` | 686 | Single version |
| Jurassic Park | `Jurassic Park` | TBD | Pro, Premium, LE variants |
| Star Wars FotE | `Star Wars: Fall of the Empire` | TBD | Pro, Premium, LE variants (new 2025 game) |
| Pulp Fiction | `Pulp Fiction` | TBD | Standard, SE, LE variants |
| Winchester Mystery House | `Winchester Mystery House` | TBD | Very new (2025), may have limited locations |
| James Bond 007 | `James Bond 007` | TBD | Pro, Premium, LE, 60th Anniversary variants |
| Cyclone | `Cyclone` | TBD | Single version (Williams 1988) |
| Swords of Fury | `Swords of Fury` | TBD | Single version (Williams 1988) |
| Demolition Man | `Demolition Man` | TBD | Single version (Williams 1994) |
| Judge Dredd | `Judge Dredd` | TBD | Single version (Bally 1993) |

**To resolve TBD IDs**, run this at build time or in a one-time script:

```javascript
// For each game, search by name and filter by manufacturer/year
const res = await fetch(`https://pinballmap.com/api/v1/machines.json?name=${encodeURIComponent(searchName)}`);
const data = await res.json();
// data.machines is an array of matching machines
// Filter by manufacturer and year to find exact matches
// Store all variant IDs in machine_ids array
```

## API Endpoints Used

### 1. Find locations near user with a specific machine

```
GET https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json
  ?lat={latitude}
  &lon={longitude}
  &by_machine_id={machine_id}
  &max_distance=50          // miles, default 50
  &send_all_within_distance=1  // return all within range, not just closest
```

Returns: Array of locations with name, address, lat, lon, distance, and machine lists.

For games with multiple variant IDs, make parallel requests for each ID and deduplicate by location_id.

### 2. Search machines by name (build-time ID resolution)

```
GET https://pinballmap.com/api/v1/machines.json?name={search_term}
```

Returns: Array of machines with `id`, `name`, `manufacturer`, `year`, `ipdb_id`, `machine_group_id`.

### 3. Deep link to Pinball Map

Link users directly to the game on Pinball Map:

```
https://pinballmap.com/map?by_machine_id={id}
```

Or for a specific location:

```
https://pinballmap.com/map?by_location_id={location_id}
```

## Component Spec: `<FindThisGame />`

### Placement

On each Bar Napkin page, after the Sources section and before Level Up (if present). Collapsed by default with a header like "Find [Game Name] Near You" and a map pin icon.

### Behavior

1. **Initial state**: Collapsed. Shows "Find [Game Name] Near You" with a pin icon.
2. **On expand**: Prompts for location permission OR shows a "Enter your zip/city" text input.
3. **On location**: Queries Pinball Map API with user lat/lon and all `machine_ids` for this game.
4. **Results**: Shows up to 10 closest locations as a list:
   - Location name (linked to Pinball Map location page)
   - Address
   - Distance (miles)
   - Machine variant name (e.g., "Jaws (Premium)")
   - Last updated date if available
5. **Empty state**: "No [Game Name] machines found within 50 miles. Try expanding your search on Pinball Map." with a link to `pinballmap.com/map?by_machine_id={id}`.
6. **Error state**: "Couldn't reach Pinball Map. Try again or search directly on pinballmap.com."

### Design

- Matches the existing Bar Napkin dark theme
- List items use the game's badge color for accents
- Map pin icon uses the game's `badge.text_color`
- Each location row is a card with subtle border, not a bullet list

### Attribution (Required)

Footer below results:

> Location data provided by [Pinball Map](https://pinballmap.com) — a free, community-maintained pinball locator. Help keep it accurate by updating machines at locations you visit.

### Client-Side vs Server-Side

**Recommended: Client-side fetch.**

Reasons:
- No API key needed for read-only requests
- User location stays on the client (privacy)
- Pinball Map API has no CORS restrictions for public endpoints
- No server costs for caching/proxying

If rate limiting becomes an issue, add a Next.js API route that caches responses for 1 hour per machine_id + geohash combination.

### Rate Limiting Considerations

Pinball Map is a community project run on donations. Be respectful:
- Cache results for the session (don't re-fetch on every expand/collapse)
- Don't pre-fetch on page load — only fetch when user expands the section
- Consider a 1-hour cache in localStorage keyed by `pbm:{machine_id}:{geohash}`
- If adding server-side caching later, use ISR or a simple Redis/memory cache

## Example JSON Addition

Here's how the Jaws JSON would look with the new field:

```json
{
  "slug": "jaws",
  "title": "Jaws",
  "manufacturer": "Stern",
  "designer": "Keith Elwin",
  "year": 2024,
  "pinball_map": {
    "machine_ids": [3799, 3800, 3801],
    "search_name": "Jaws"
  },
  ...
}
```

## Build-Time Setup Script

Create a utility script that resolves all machine IDs:

```javascript
// scripts/resolve-pinball-map-ids.js
// Run once, or as a build step, to populate machine_ids in all game JSONs

const GAMES = [
  { slug: "jaws", search: "Jaws", manufacturer: "Stern", year: 2024 },
  { slug: "terminator-2", search: "Terminator 2", manufacturer: "Williams", year: 1991 },
  { slug: "jurassic-park", search: "Jurassic Park", manufacturer: "Stern", year: 2019 },
  { slug: "star-wars-fote", search: "Star Wars: Fall of the Empire", manufacturer: "Stern", year: 2025 },
  { slug: "pulp-fiction", search: "Pulp Fiction", manufacturer: "Chicago Gaming", year: 2023 },
  { slug: "winchester-mystery-house", search: "Winchester Mystery House", manufacturer: "Barrels of Fun", year: 2025 },
  { slug: "james-bond-007", search: "James Bond 007", manufacturer: "Stern", year: 2022 },
  { slug: "cyclone", search: "Cyclone", manufacturer: "Williams", year: 1988 },
  { slug: "swords-of-fury", search: "Swords of Fury", manufacturer: "Williams", year: 1988 },
  { slug: "demolition-man", search: "Demolition Man", manufacturer: "Williams", year: 1994 },
  { slug: "judge-dredd", search: "Judge Dredd", manufacturer: "Bally", year: 1993 },
];

async function resolveIds() {
  for (const game of GAMES) {
    const res = await fetch(
      `https://pinballmap.com/api/v1/machines.json?name=${encodeURIComponent(game.search)}`
    );
    const data = await res.json();

    // Filter to matching manufacturer (fuzzy — "Williams" matches "Williams Electronic Games")
    const matches = data.machines.filter(m =>
      m.manufacturer?.toLowerCase().includes(game.manufacturer.toLowerCase().split(" ")[0])
    );

    console.log(`\n${game.slug}:`);
    matches.forEach(m => {
      console.log(`  id: ${m.id} | ${m.name} (${m.manufacturer}, ${m.year}) | group: ${m.machine_group_id}`);
    });
  }
}

resolveIds();
```

Run this script, review the output, and add the correct `machine_ids` to each game JSON. Then commit.

## Implementation Phases

1. **Phase 1** (Claude Code): Add `pinball_map` field to schema, run ID resolution script, update all 11 game JSONs
2. **Phase 2** (Claude Code): Build `<FindThisGame />` component with geolocation + text input fallback
3. **Phase 3** (Claude Code): Style to match Bar Napkin theme, add attribution footer
4. **Phase 4** (optional): Add server-side caching via Next.js API route if needed
