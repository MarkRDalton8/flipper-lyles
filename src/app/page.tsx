export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h2 className="font-oswald text-4xl mb-6 text-gold">Pull Up a Stool. Let's Talk Pinball.</h2>

        <div className="space-y-4 text-txt2 text-lg">
          <p>
            Welcome to Flipper Lyle's — named after a certain legendary Minneapolis dive bar that was reborn as a pinball joint. If you know, you know.
          </p>
          <p>
            This site exists because every other strategy guide out there is written for people who can backhand a spinner, stack three multiballs in their sleep, and casually drop billion-point games between sips of beer. That's not us. We're the ones who play a couple nights a week, show up to Tuesday league, maybe hit a monthly tournament, and just want to understand the game in front of us without reading a doctoral thesis.
          </p>
          <p className="text-txt font-serif italic border-l-4 border-gold pl-6 py-2 bg-card">
            "I just trapped the ball and I have no idea what's lit. What do I do?" — That's the question we answer. Every game. Every ball.
          </p>
          <p>
            Every guide follows the same format: <strong className="text-txt">Your Game Plan</strong> — priority-ranked lists for each ball. Priority 1 is always the safest, highest-value play. You work down only as the game allows. We tell you what modes and multiballs are called (so the names aren't a mystery when they pop up), we flag the <strong className="text-txt">One Shot That Matters</strong>, and we're honest about what to skip. If you can reliably hit the shot we're telling you to skip, honestly, why are you reading this?
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-safe border border-teal p-6 rounded">
          <h3 className="font-oswald text-xl text-teal mb-4">Grab a Seat If...</h3>
          <ul className="space-y-2 text-txt2">
            <li>→ You play 2-3 times a week</li>
            <li>→ You're in a local league or thinking about it</li>
            <li>→ You know what a dead bounce is (mostly)</li>
            <li>→ You've stared at a rulesheet and felt your soul leave your body</li>
            <li>→ You want to win a few more games at league, not the state title</li>
          </ul>
        </div>

        <div className="bg-danger border border-red p-6 rounded">
          <h3 className="font-oswald text-xl text-red mb-4">Maybe Not Your Spot If...</h3>
          <ul className="space-y-2 text-txt2">
            <li>→ You're in the IFPA top 500</li>
            <li>→ You want frame-by-frame combo breakdowns</li>
            <li>→ You already know your ball plan for every game cold</li>
            <li>→ You can reliably post-pass on any machine</li>
            <li>→ You're already winning your state championship</li>
          </ul>
        </div>
      </div>

      <div className="text-center py-8">
        <a href="/napkins" className="inline-block bg-gold text-bg px-8 py-4 font-oswald text-lg uppercase tracking-wider rounded hover:bg-orange transition-colors">
          Check Out the Bar Napkins
        </a>
      </div>
    </div>
  );
}
