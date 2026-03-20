# Deployment: Vercel

## Overview
flipperlyles.com runs entirely on Vercel — frontend, API routes, and eventually the Phase 7 chat serverless function. No EC2, no containers, no server management. Push to GitHub main branch and Vercel auto-deploys.

## Initial Setup

### 1. GitHub Repository
```bash
cd flipperlyles
git init
git add .
git commit -m "initial commit: project scaffold"
git remote add origin git@github.com:USERNAME/flipperlyles.git
git push -u origin main
```

### 2. Connect Vercel
```bash
# Option A: Vercel CLI
npm i -g vercel
vercel login
vercel link  # Links local project to Vercel
vercel        # First deploy (preview)
vercel --prod # Production deploy

# Option B: Vercel Dashboard (easier)
# 1. Go to vercel.com/new
# 2. Import the flipperlyles GitHub repo
# 3. Framework preset: Next.js (auto-detected)
# 4. Build settings: defaults are fine
# 5. Deploy
```

### 3. Custom Domain
In Vercel Dashboard → Project → Settings → Domains:
1. Add `flipperlyles.com`
2. Add `www.flipperlyles.com` (redirect to apex)
3. Vercel will provide DNS records to configure at your domain registrar:
   - A record: `76.76.21.21` (for apex domain)
   - CNAME record: `cname.vercel-dns.com` (for www subdomain)
4. SSL is automatic — Vercel provisions and renews Let's Encrypt certs

### 4. Environment Variables
In Vercel Dashboard → Project → Settings → Environment Variables:

**For Phase 7 (add when ready to launch chat feature):**
```
ANTHROPIC_API_KEY=sk-ant-...
```
Set for Production, Preview, and Development environments.

**No environment variables needed for Phase 1-6.** The site is entirely static content until the chat feature is added.

## Deploy Workflow

### Automatic (recommended)
Every push to `main` triggers a production deploy:
```bash
git add .
git commit -m "feat: add new bar napkin for Monster Bash"
git push origin main
# Vercel auto-deploys in ~30-60 seconds
```

Preview deploys happen on pull requests — useful for reviewing new Bar Napkins before they go live.

### Manual
```bash
vercel --prod  # Force production deploy from local
```

## Adding a New Bar Napkin (Content Workflow)
No build configuration needed. Just:
1. Add the new JSON file to `/content/games/new-game.json`
2. Add playfield images to `/public/playfields/new-game/`
3. Commit and push to main
4. Vercel deploys automatically
5. New Bar Napkin is live at `flipperlyles.com/napkins/new-game`

## Build Settings
These should be auto-detected by Vercel, but for reference:
```
Framework Preset: Next.js
Build Command: next build
Output Directory: .next
Install Command: npm install
Node.js Version: 20.x
```

## Vercel Project Structure
```
Vercel Project: flipperlyles
├── Production Domain: flipperlyles.com
├── Preview Domain: flipperlyles-*.vercel.app (auto per PR)
├── Framework: Next.js (App Router)
├── Serverless Functions: /api/* routes (Phase 7)
└── Edge Config: none needed for v1
```

## Cost Estimate

### Phase 1-6 (Static Site)
**Free tier covers this easily.** The site is essentially static — JSON content rendered at build time. Vercel's free tier includes:
- 100GB bandwidth/month
- Unlimited static deploys
- Custom domains with SSL
- Preview deployments on PRs

You won't come close to these limits with a pinball strategy site.

### Phase 7 (Chat Feature)
Serverless function invocations for `/api/chat`:
- **Vercel free tier:** 100,000 function invocations/month, 100GB-hours execution
- **Anthropic API cost:** ~$0.005-0.01 per chat turn (Sonnet, ~4K token system prompt + short Q&A)
- **Realistic estimate:** Even at 1,000 chat questions/month, you're looking at $5-10/month in API costs and well within Vercel's free tier for function invocations

If traffic grows significantly, Vercel Pro ($20/month) gives you more generous limits. But cross that bridge when you get there.

## Monitoring
Vercel provides built-in analytics (add later):
```bash
npm install @vercel/analytics
```

Add to `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## If You Ever Need to Move to EC2
If the chat feature gets expensive on Vercel serverless or you need persistent state (Redis for rate limiting, PostgreSQL for user accounts), you can split the architecture later:
- Keep Vercel for the frontend (Next.js static + ISR)
- Move `/api/chat` to a Node.js service on the EC2 instance behind your existing ALB
- Point the chat API calls to `api.flipperlyles.com` → ALB → EC2
- Use the same ACM cert setup you already have for yamily.app

But this is a "when you need it" move, not a "plan for it now" move. Vercel handles everything for the foreseeable future.
