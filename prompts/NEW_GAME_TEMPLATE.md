# How to Request New Game Guides from Claude.ai

Use this template when asking Claude.ai to research and write a new game guide for Flipper Lyle's. The output will be a JSON file matching the content schema that Claude Code can consume directly.

---

## Template Prompt:

```
I need a new game guide for Flipper Lyle's (flipperlyles.com). 

**Game:** [Game Name]
**Manufacturer:** [Stern / CGC / JJP / etc.]
**Year:** [Release year]

**Context:** This game is at [my Tuesday league / a local bar / my home collection]. I see it [frequently / occasionally]. 

**Sources to check:**
- [Kineticist tutorial if one exists]
- [Tilt Forums rulesheet]
- [Any specific YouTube videos — paste transcripts if available]
- [Any Pinside threads]
- [Official manufacturer page]

**What I need:**
Generate a complete game JSON file following the content schema in CONTENT_SCHEMA.md. Include:
- 30-second summary with mode/multiball name pills
- The One Shot That Matters
- "Between Us — What Makes This Game Hard"
- Ball Plans for all 3 balls with priorities and difficulty tags
- Stay Alive Out There (survival tips)
- Don't Be a Hero (what to skip)
- Between Us boxes (score targets, model differences if applicable)
- Sources appendix entries
- Level Up section (advanced tips, collapsed by default)

**Voice:** Flipper Lyle's voice — warm, self-deprecating, your buddy at league. "You Got This / Earnable / Good Luck" difficulty tags. Movie/theme tie-ins where natural. Honest about what's hard.

**Output format:** Raw JSON matching the GameGuide interface from CONTENT_SCHEMA.md. I'll paste it directly into /content/games/[slug].json.
```

---

## Providing Video Transcripts

The most valuable source material is YouTube video transcripts. Here's how to get them:

1. Go to the video on YouTube
2. Click "..." under the video
3. Click "Show Transcript"  
4. Select All → Copy
5. Paste into the Claude.ai chat with a note like:
   "This is Travis from The Pinball Company, Ball 1 strategy for [Game], Pro model"

Claude.ai will extract strategy insights and integrate them into the guide, crediting the source.

## Batch Processing

You can submit multiple sources at once:
```
Research these sources for [Game Name] and generate the complete JSON:
1. [URL to Kineticist article]
2. [URL to Tilt Forums rulesheet]  
3. [Pasted transcript from Travis video]
4. [URL to Pinside strategy thread]
5. [URL to official manufacturer page]
```

Claude.ai will cross-reference all sources and produce a single synthesized JSON.
