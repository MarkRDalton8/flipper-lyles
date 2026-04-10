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

      {/* Tap board header — styled after the "40 Tap Beers" menu board (pic-3) */}
      <div className="mb-10 border border-border overflow-hidden" style={{ boxShadow: '3px 3px 0 #2e1e18' }}>
        {/* Red header bar */}
        <div className="bg-red px-6 py-4 flex items-center justify-between">
          <div>
            <div className="font-oswald font-bold text-[1.6rem] uppercase tracking-[0.06em] text-white leading-none">
              The Machines
            </div>
            <div className="font-oswald text-[0.7rem] uppercase tracking-[0.18em] text-red-200 mt-0.5 opacity-80">
              On Tap Tonight
            </div>
          </div>
          <div className="text-right">
            <div className="font-oswald font-bold text-[2rem] text-white leading-none">
              {games.length}
            </div>
            <div className="font-oswald text-[0.65rem] uppercase tracking-[0.18em] text-white opacity-80">
              Games
            </div>
          </div>
        </div>
        {/* Menu board tagline strip */}
        <div className="bg-card px-6 py-2 flex items-center gap-2">
          <div className="font-pacifico text-red text-[1rem]">Flipper Lyle's</div>
          <span className="text-mute text-xs">·</span>
          <div className="font-oswald text-[0.68rem] uppercase tracking-[0.14em] text-txt2">
            Game-specific strategy guides · Priority-ranked ball plans · Honest advice about what to skip
          </div>
        </div>
      </div>

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
            className="block bg-card border border-border rounded-lg overflow-hidden hover:border-red transition-colors"
          >
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-border bg-card2 flex items-center gap-4">
              {/* Badge */}
              <img
                src={`/badges/${game.slug}.svg`}
                alt={`${game.title} badge`}
                width={70}
                height={70}
                className="rounded flex-shrink-0"
              />

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
