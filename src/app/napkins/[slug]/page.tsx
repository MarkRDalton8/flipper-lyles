import { getGameBySlug, getAllGames } from "@/lib/games";
import GameHeader from "@/components/GameHeader";
import Summary from "@/components/Summary";
import KnowThePlayfield from "@/components/KnowThePlayfield";
import OneShot from "@/components/OneShot";
import BetweenUs from "@/components/BetweenUs";
import BallPlan from "@/components/BallPlan";
import StayAlive from "@/components/StayAlive";
import DontBeAHero from "@/components/DontBeAHero";
import FindThisGame from "@/components/FindThisGame";
import Comments from "@/components/Comments";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const games = await getAllGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: `${game.title} — Flipper Lyle's Bar Napkin`,
    description: game.description,
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const callouts = game.playfield_callouts || [];

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <GameHeader game={game} />

      <Summary text={game.summary.text} modes={game.summary.modes} callouts={callouts} />

      <KnowThePlayfield keyAreas={(game as any).key_areas || []} />

      <OneShot
        name={game.one_shot.name}
        description={game.one_shot.description}
        callouts={callouts}
      />

      <BetweenUs label="What Makes This Game Hard" text={game.hard_box.text} callouts={callouts} />

      {/* Ball Plans */}
      <div className="mb-8">
        <h3 className="font-oswald text-3xl text-gold mb-6">Your Game Plan</h3>
        {game.ball_plans.map((plan) => (
          <BallPlan key={plan.ball_number} plan={plan} callouts={callouts} />
        ))}
      </div>

      <StayAlive items={game.survival.items} callouts={callouts} />

      <DontBeAHero items={game.skip.items} callouts={callouts} />

      {/* Between Us Boxes */}
      {game.between_us.map((box, idx) => (
        <BetweenUs key={idx} label={box.label} text={box.text} callouts={callouts} />
      ))}

      {/* Sources */}
      <div className="mt-12 pt-8 border-t border-border">
        <h3 className="font-oswald text-2xl text-gold mb-4">The Research Pile</h3>
        <p className="text-txt2 mb-6">
          Every claim is sourced. Here's where we got our homework for this guide.
        </p>
        <div className="space-y-4">
          {game.sources.map((source, idx) => (
            <div key={idx} className="bg-card border border-border rounded px-4 py-3">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-oswald text-gold hover:text-orange transition-colors"
              >
                {source.title} →
              </a>
              <p className="text-txt2 text-sm mt-1">{source.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Find This Game Near You */}
      <FindThisGame game={game} />

      {/* Comments / Strategy Tips */}
      <Comments slug={game.slug} gameTitle={game.title} />
    </div>
  );
}
