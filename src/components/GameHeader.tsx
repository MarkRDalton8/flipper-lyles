import { GameGuide } from "@/lib/types";
import StatPips from "./StatPips";

interface GameHeaderProps {
  game: GameGuide;
}

export default function GameHeader({ game }: GameHeaderProps) {
  return (
    <div className="mb-8">
      {/* Badge + Meta */}
      <div className="flex flex-wrap gap-6 items-start mb-6">
        {/* Game Badge */}
        <img
          src={`/badges/${game.slug}.svg`}
          alt={`${game.title} badge`}
          width={100}
          height={100}
          className="rounded flex-shrink-0"
        />

        {/* Game Info */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="font-oswald text-4xl mb-2">{game.title}</h2>
          <div className="meta mb-3">
            Design: {game.designer} &bull; Code: {game.code_by} &bull;{" "}
            {game.manufacturer}, {game.year}
          </div>
          <p className="text-txt2 italic leading-relaxed">{game.description}</p>
        </div>
      </div>

      {/* Stat Pips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="meta mb-2">Drain Danger</div>
          <StatPips value={game.ratings.drain_danger} color="red" />
        </div>
        <div>
          <div className="meta mb-2">Rule Complexity</div>
          <StatPips value={game.ratings.rule_complexity} color="blue" />
        </div>
        <div>
          <div className="meta mb-2">Fun Factor</div>
          <StatPips value={game.ratings.fun_factor} color="teal" />
        </div>
        <div>
          <div className="meta mb-2">You'll See This At League</div>
          <StatPips value={game.ratings.league_frequency} color="gold" />
        </div>
      </div>
    </div>
  );
}
