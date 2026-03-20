import type { Metadata } from "next";
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
        <header className="px-8 py-8 pb-4 border-b border-border bg-gradient-to-b from-[#0f1218] to-bg">
          <div className="flex items-baseline gap-3 mb-1 flex-wrap">
            <h1 className="font-oswald font-bold text-[2.2rem] uppercase tracking-wider leading-none">
              <span className="text-gold">Flipper</span>{" "}
              <span className="text-txt">Lyle's</span>
            </h1>
            <span className="font-serif italic text-[0.95rem] text-txt2">
              Pinball Strategy for the Rest of Us
            </span>
          </div>
          <div className="meta mt-1">
            Bar Napkin Wisdom, Not Doctoral Theses
          </div>
        </header>

        <nav className="flex gap-0 px-8 border-b border-border bg-card overflow-x-auto">
          <a href="/" className="px-6 py-4 font-oswald uppercase text-sm tracking-wider border-b-2 border-transparent hover:border-gold hover:text-gold transition-colors">
            The Bar
          </a>
          <a href="/napkins" className="px-6 py-4 font-oswald uppercase text-sm tracking-wider border-b-2 border-transparent hover:border-gold hover:text-gold transition-colors">
            Bar Napkins
          </a>
          <a href="/sources" className="px-6 py-4 font-oswald uppercase text-sm tracking-wider border-b-2 border-transparent hover:border-gold hover:text-gold transition-colors">
            Sources
          </a>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-border bg-card px-8 py-6 text-center text-txt2 text-sm">
          <div className="mb-2">
            <span className="text-gold font-oswald">Flipper Lyle's</span> · flipperlyles.com · Named for a legend. Built for league night.
          </div>
          <div className="text-xs text-mute">
            Not affiliated with Stern, CGC, Barrels of Fun, or any manufacturer · © 2026
          </div>
        </footer>
      </body>
    </html>
  );
}
