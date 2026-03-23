// Resolves Pinball Map machine IDs for all games
// Run: node scripts/resolve-pinball-map-ids.js

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
  { slug: "medieval-madness", search: "Medieval Madness", manufacturer: "Williams", year: 1997 },
];

async function resolveIds() {
  console.log("Querying Pinball Map API for machine IDs...\n");

  for (const game of GAMES) {
    const res = await fetch(
      `https://pinballmap.com/api/v1/machines.json?name=${encodeURIComponent(game.search)}`
    );
    const data = await res.json();

    // Filter to matching manufacturer AND name/year
    const manufacturerBase = game.manufacturer.toLowerCase().split(" ")[0];
    const gameName = game.search.toLowerCase();

    const matches = data.machines.filter(m => {
      const matchesMfg = m.manufacturer?.toLowerCase().includes(manufacturerBase);
      const matchesName = m.name?.toLowerCase().includes(gameName);
      // Year might be off by 1 for late-year releases or re-releases
      const matchesYear = m.year && Math.abs(m.year - game.year) <= 2;

      return matchesMfg && matchesName && matchesYear;
    });

    console.log(`\n${game.slug} (${game.search}):`);

    if (matches.length === 0) {
      console.log(`  ⚠️  No matches found`);
      console.log(`  Top 10 results from API:`);
      data.machines.slice(0, 10).forEach(m => {
        console.log(`    - ${m.name} (${m.manufacturer}, ${m.year}) | id: ${m.id}`);
      });
    } else {
      matches.forEach(m => {
        console.log(`  ✓ id: ${m.id} | ${m.name} (${m.manufacturer}, ${m.year}) | group: ${m.machine_group_id || 'none'}`);
      });

      // Suggest the machine_ids array
      const ids = matches.map(m => m.id);
      console.log(`  \n  Suggested JSON:`);
      console.log(`  "pinball_map": {`);
      console.log(`    "machine_ids": [${ids.join(", ")}],`);
      console.log(`    "search_name": "${game.search}"`);
      console.log(`  }`);
    }

    // Rate limit courtesy
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log("\n\n✅ Done! Review the output above and add pinball_map fields to each game JSON.");
}

resolveIds().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
