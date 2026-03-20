import { getAllGames } from "@/lib/games";
import Link from "next/link";
import StatPips from "@/components/StatPips";

export const metadata = {
  title: "Bar Napkins — Flipper Lyle's",
  description: "Game-specific strategy guides for intermediate league players",
};

export default async function NapkinsPage() {
  const games = await getAllGames();

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <h2 className="font-oswald text-4xl mb-3 text-gold">Bar Napkins</h2>
      <p className="text-txt2 mb-8 text-lg">
        Game-specific strategy guides. Priority-ranked ball plans, survival tips, and honest advice
        about what to skip.
      </p>

      {games.length === 0 && (
        <div className="text-txt2 text-center py-12">
          No games available yet. Check back soon!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Link
            key={game.slug}
            href={`/napkins/${game.slug}`}
            className="block bg-card border border-border rounded-lg overflow-hidden hover:border-gold transition-colors"
          >
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-border bg-card2 flex items-center gap-4">
              {/* Badge */}
              <div
                className="flex flex-col items-center justify-center px-3 py-2 rounded border-2 min-w-[70px]"
                style={{
                  background: `linear-gradient(135deg, ${game.badge.gradient_from}, ${game.badge.gradient_to})`,
                  borderColor: game.badge.border_color,
                  color: game.badge.text_color,
                }}
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-widest opacity-80">
                  {game.manufacturer_short}
                </span>
                <span className="font-oswald text-lg font-bold tracking-wider">
                  {game.badge.abbreviation}
                </span>
              </div>

              {/* Title */}
              <div className="flex-1">
                <h3 className="font-oswald text-2xl text-txt">{game.title}</h3>
                <div className="meta">{game.year}</div>
              </div>
            </div>

            {/* Card Body */}
            <div className="px-6 py-4">
              <p className="text-txt2 text-sm mb-4 line-clamp-2 italic">{game.description}</p>

              {/* Mini Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="meta mb-1">Drain Danger</div>
                  <StatPips value={game.ratings.drain_danger} color="red" />
                </div>
                <div>
                  <div className="meta mb-1">Fun Factor</div>
                  <StatPips value={game.ratings.fun_factor} color="teal" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
