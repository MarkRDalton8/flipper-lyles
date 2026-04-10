export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">

      {/* Billboard callout — styled after the "Best Hangover Breakfast in Town" Liquor Lyle's ad (pic-1) */}
      <div className="mb-12 border-[3px] border-red bg-[#0d0806]" style={{ boxShadow: '4px 4px 0 #c42020' }}>
        {/* Top red bar */}
        <div className="bg-red px-6 py-3 flex items-center justify-between gap-4">
          <span className="font-oswald font-bold text-[1.05rem] uppercase tracking-[0.12em] text-white">
            Best Hangover
          </span>
          <span className="font-oswald font-bold text-[1.05rem] uppercase tracking-[0.12em] text-white">
            Machines in Town!
          </span>
        </div>

        {/* Main content area */}
        <div className="px-6 py-5 flex items-center gap-6">
          {/* Martini man medallion — simplified SVG from the Liquor Lyle's logo */}
          <div className="flex-shrink-0">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="40" cy="40" r="38" stroke="#c42020" strokeWidth="2.5" fill="#160d0b"/>
              {/* Suited figure holding a martini glass */}
              <ellipse cx="40" cy="28" rx="8" ry="9" fill="#c42020"/>
              <path d="M28 48 Q40 38 52 48 L54 68 H26 Z" fill="#c42020"/>
              {/* Martini glass in right hand */}
              <path d="M52 40 L60 32 M55 28 L65 28 M60 28 L60 36" stroke="#f0c040" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="60" cy="27" r="3" fill="#f0c040"/>
            </svg>
          </div>

          {/* Center text */}
          <div className="flex-1">
            <div className="font-pacifico text-red text-[1.5rem] leading-tight mb-1">
              Flipper Lyle's
            </div>
            <div className="font-oswald text-[0.72rem] uppercase tracking-[0.15em] text-txt2 mb-3">
              "World Famous Game Plans & Pinball Bar Napkins"
            </div>
            <div className="font-serif italic text-txt2 text-sm">
              Named after the legend. Built for league night.
            </div>
          </div>
        </div>

        {/* Bottom strip — like "2-4-1's EVERY DAY" */}
        <div className="bg-card border-t-2 border-red px-6 py-2 flex justify-center gap-6">
          <span className="font-oswald text-[0.75rem] uppercase tracking-[0.14em] text-gold">FREE</span>
          <span className="text-mute">·</span>
          <span className="font-oswald text-[0.75rem] uppercase tracking-[0.14em] text-gold">Every Machine</span>
          <span className="text-mute">·</span>
          <span className="font-oswald text-[0.75rem] uppercase tracking-[0.14em] text-gold">Every Ball</span>
          <span className="text-mute">·</span>
          <span className="font-oswald text-[0.75rem] uppercase tracking-[0.14em] text-gold">League Nights</span>
        </div>
      </div>

      {/* Intro text */}
      <div className="mb-12">
        <h2 className="font-oswald text-4xl mb-6 text-red">Pull Up a Stool. Let's Talk Pinball.</h2>

        <div className="space-y-4 text-txt2 text-lg">
          <p>
            Welcome to Flipper Lyle's — named after a certain legendary Minneapolis dive bar that was reborn as a pinball joint. If you know, you know.
          </p>
          <p>
            This site exists because every other strategy guide out there is written for people who can backhand a spinner, stack three multiballs in their sleep, and casually drop billion-point games between sips of beer. That's not us. We're the ones who play a couple nights a week, show up to Tuesday league, maybe hit a monthly tournament, and just want to understand the game in front of us without reading a doctoral thesis.
          </p>
          <p className="text-txt font-serif italic border-l-4 border-red pl-6 py-2 bg-card">
            "I just trapped the ball and I have no idea what's lit. What do I do?" — That's the question we answer. Every game. Every ball.
          </p>
          <p>
            Every guide follows the same format: <strong className="text-txt">Your Game Plan</strong> — priority-ranked lists for each ball. Priority 1 is always the safest, highest-value play. You work down only as the game allows. We tell you what modes and multiballs are called (so the names aren't a mystery when they pop up), we flag the <strong className="text-txt">One Shot That Matters</strong>, and we're honest about what to skip. If you can reliably hit the shot we're telling you to skip, honestly, why are you reading this?
          </p>
        </div>
      </div>

      {/* "Grab a Seat / Maybe Not" boxes */}
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
        <a href="/napkins" className="inline-block bg-red text-white px-8 py-4 font-oswald text-lg uppercase tracking-wider rounded hover:bg-[#a81818] transition-colors">
          Check Out the Bar Napkins
        </a>
      </div>
    </div>
  );
}
