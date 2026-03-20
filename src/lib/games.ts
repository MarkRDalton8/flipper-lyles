import { GameGuide } from "./types";
import { promises as fs } from "fs";
import path from "path";

const gamesDirectory = path.join(process.cwd(), "content", "games");

export async function getAllGames(): Promise<GameGuide[]> {
  try {
    const fileNames = await fs.readdir(gamesDirectory);
    const jsonFiles = fileNames.filter((name) => name.endsWith(".json"));

    const games = await Promise.all(
      jsonFiles.map(async (fileName) => {
        const filePath = path.join(gamesDirectory, fileName);
        const fileContents = await fs.readFile(filePath, "utf8");
        const game: GameGuide = JSON.parse(fileContents);
        return game;
      })
    );

    return games.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error loading games:", error);
    return [];
  }
}

export async function getGameBySlug(slug: string): Promise<GameGuide | null> {
  try {
    const filePath = path.join(gamesDirectory, `${slug}.json`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const game: GameGuide = JSON.parse(fileContents);
    return game;
  } catch (error) {
    console.error(`Error loading game ${slug}:`, error);
    return null;
  }
}
