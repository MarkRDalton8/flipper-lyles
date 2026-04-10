import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flipper Lyle's — Pinball Strategy for the Rest of Us",
  description: "Pinball strategy guides for intermediate league players. Bar Napkin wisdom, not doctoral theses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          id="piano-composer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(src){var a=document.createElement("script");a.type="text/javascript";a.async=true;a.src=src;var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})("https://experience.tinypass.com/xbuilder/experience/load?aid=VJP03WZIpu");`,
          }}
        />

        <Script
          id="piano-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(_config) {
                var script = document.createElement("script");
                script.src = "https://tag.aticdn.net/piano-analytics.js";
                script.async = true;
                script.dataset.config = JSON.stringify(_config);
                document.head.appendChild(script);
              })({
                site: 639124,
                collectDomain: "https://fjqqzhr.pa-cd.com",
                instantTracking: true
              });
            `,
          }}
        />

        {/* Header — styled after the Liquor Lyle's exterior sign */}
        <header className="px-8 pt-8 pb-0 bg-gradient-to-b from-[#120806] to-bg">
          <div className="flex items-center gap-4 mb-1 flex-wrap">
            {/* Wordmark: FLIPPER in Oswald, Lyle's in Pacifico */}
            <h1 className="leading-none flex items-baseline gap-2">
              <span className="font-oswald font-bold text-[2.4rem] uppercase tracking-[0.06em] text-txt">
                FLIPPER
              </span>
              <span className="font-pacifico text-[2.2rem] text-red leading-none" style={{ textShadow: '0 0 20px rgba(196,32,32,0.4)' }}>
                Lyle's
              </span>
            </h1>
            {/* Sub-header like "BAR & RESTAURANT" on the sign */}
            <div className="font-oswald text-[0.75rem] uppercase tracking-[0.18em] text-txt2 border-l border-border pl-4 leading-tight hidden sm:block">
              MACHINES<br />& STRATEGY
            </div>
          </div>
          <div className="meta mb-4">
            Bar Napkin Wisdom, Not Doctoral Theses · Minneapolis
          </div>

          {/* Arch divider — inspired by the red booth dividers (pic-8, pic-9) */}
          <div className="w-full overflow-hidden" aria-hidden="true">
            <svg viewBox="0 0 800 44" preserveAspectRatio="xMidYMid meet" className="w-full h-[44px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 8 flame/arch shapes side by side — the booth divider silhouette */}
              {[0,1,2,3,4,5,6,7].map((i) => (
                <g key={i} transform={`translate(${i * 100}, 0)`}>
                  {/* Arch shape: rectangle bottom, pointed arch top */}
                  <path
                    d="M10 44 L10 20 Q50 -2 90 20 L90 44 Z"
                    fill="#c42020"
                    opacity={i % 2 === 0 ? "1" : "0.75"}
                  />
                </g>
              ))}
            </svg>
          </div>
        </header>

        <nav className="flex gap-0 px-8 border-b border-border bg-card overflow-x-auto">
          <a href="/" className="px-6 py-4 font-oswald uppercase text-sm tracking-wider border-b-2 border-transparent hover:border-red hover:text-red transition-colors">
            The Bar
          </a>
          <a href="/napkins" className="px-6 py-4 font-oswald uppercase text-sm tracking-wider border-b-2 border-transparent hover:border-red hover:text-red transition-colors">
            Bar Napkins
          </a>
          <a href="/sources" className="px-6 py-4 font-oswald uppercase text-sm tracking-wider border-b-2 border-transparent hover:border-red hover:text-red transition-colors">
            Sources
          </a>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-border bg-card px-8 py-6 text-center text-txt2 text-sm">
          <div className="mb-3 flex items-center justify-center gap-3 flex-wrap">
            <span className="font-pacifico text-red text-lg leading-none">Flipper Lyle's</span>
            <span className="text-mute">·</span>
            <span>flipperlyles.com</span>
            <span className="text-mute">·</span>
            {/* "Since 1963" sticker-style badge (pic-6 inspired) */}
            <span className="inline-flex items-center gap-1.5 bg-red text-white font-oswald text-[0.6rem] uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm">
              Since Forever · Built for League Night
            </span>
          </div>
          <div className="text-xs text-mute">
            Not affiliated with Stern, CGC, Barrels of Fun, or any manufacturer · © 2026
          </div>
        </footer>
      </body>
    </html>
  );
}
