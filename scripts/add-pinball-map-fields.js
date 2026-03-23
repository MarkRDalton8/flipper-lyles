// Adds pinball_map fields to all game JSON files based on resolved machine IDs

const fs = require('fs');
const path = require('path');

const PINBALL_MAP_DATA = {
  "jaws": {
    "machine_ids": [3801, 3799, 3800, 4541],
    "machine_group_id": 106,
    "search_name": "Jaws"
  },
  "terminator-2": {
    "machine_ids": [686],
    "search_name": "Terminator 2"
  },
  "jurassic-park": {
    "machine_ids": [3167, 3169, 3168, 3419],
    "machine_group_id": 78,
    "search_name": "Jurassic Park"
  },
  "star-wars-fote": {
    "machine_ids": [4547, 4549, 4548],
    "machine_group_id": 128,
    "search_name": "Star Wars: Fall of the Empire"
  },
  "pulp-fiction": {
    "machine_ids": [3680, 3681],
    "machine_group_id": 102,
    "search_name": "Pulp Fiction"
  },
  "winchester-mystery-house": {
    "machine_ids": [4562],
    "search_name": "Winchester Mystery House"
  },
  "james-bond-007": {
    "machine_ids": [3643, 3642, 3640, 3641],
    "machine_group_id": 95,
    "search_name": "James Bond 007"
  },
  "cyclone": {
    "machine_ids": [776],
    "search_name": "Cyclone"
  },
  "swords-of-fury": {
    "machine_ids": [750],
    "search_name": "Swords of Fury"
  },
  "demolition-man": {
    "machine_ids": [670],
    "search_name": "Demolition Man"
  },
  "judge-dredd": {
    "machine_ids": [815],
    "search_name": "Judge Dredd"
  },
  "medieval-madness": {
    "machine_ids": [642],
    "machine_group_id": 18,
    "search_name": "Medieval Madness"
  }
};

const gamesDir = path.join(__dirname, '..', 'content', 'games');

console.log("Adding pinball_map fields to all game JSON files...\n");

for (const [slug, pinballData] of Object.entries(PINBALL_MAP_DATA)) {
  const filePath = path.join(gamesDir, `${slug}.json`);

  try {
    // Read the existing JSON
    const content = fs.readFileSync(filePath, 'utf8');
    const game = JSON.parse(content);

    // Add or update the pinball_map field
    game.pinball_map = pinballData;

    // Write back with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(game, null, 2) + '\n', 'utf8');

    console.log(`✅ ${slug}.json updated`);
  } catch (err) {
    console.error(`❌ Error updating ${slug}.json:`, err.message);
  }
}

console.log("\n✅ All game files updated with pinball_map data!");
