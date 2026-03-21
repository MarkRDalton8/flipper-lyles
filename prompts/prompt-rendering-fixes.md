# Flipper Lyle's — Three Bar Napkin Rendering Fixes

## Context
The Bar Napkin game guide pages have three rendering issues to fix. All fixes are in the frontend components — the JSON data files are correct and should not be modified.

---

## Fix 1: HTML Fields Rendering as Literal Text

Several JSON fields contain HTML (`<strong>`, `<a>`, etc.) that is currently rendering as literal text instead of parsed HTML.

**Affected fields across all game JSON files:**
- `summary.text`
- `one_shot.description`
- `hard_box.text`
- `ball_plans[].priorities[].description`
- `between_us[].text`
- `survival.items[].description`
- `skip.items[].description`
- `level_up.tips[].description`
- `key_areas[].why_it_matters`

**Fix:** Any component rendering these fields must use `dangerouslySetInnerHTML` instead of plain text interpolation.

```jsx
// WRONG
<p>{priority.description}</p>

// CORRECT
<p dangerouslySetInnerHTML={{ __html: priority.description }} />
```

Apply this to every component that renders any of the fields listed above.

---

## Fix 2: `{{callout:id}}` Tokens Not Rendering as Clickable Links

Description fields use a `{{callout:shot_id}}` token syntax to mark shot names that should render as styled, clickable links. Clicking them triggers the existing playfield flyout modal for that callout. Currently these tokens are rendering as literal text.

**Example of token in JSON:**
```json
"description": "Shoot the {{callout:helipad_ramp}} to call the helicopter."
```

**Should render as:**
```html
Shoot the <a class="callout-link" data-callout-id="helipad_ramp">Helipad Ramp</a> to call the helicopter.
```

**Implementation:** Create a `renderDescription(text, callouts)` helper function that pre-processes description strings before they are passed to `dangerouslySetInnerHTML`:

```javascript
function renderDescription(text, callouts = []) {
  return text.replace(/\{\{callout:([\w_-]+)\}\}/g, (match, id) => {
    const callout = callouts.find(c => c.id === id);
    const name = callout ? callout.name : id;
    return `<a class="callout-link" data-callout-id="${id}">${name}</a>`;
  });
}
```

**Usage:**
```jsx
<p dangerouslySetInnerHTML={{ 
  __html: renderDescription(priority.description, game.playfield_callouts) 
}} />
```

Apply `renderDescription()` to every field that uses `dangerouslySetInnerHTML` (all fields from Fix 1). The existing playfield flyout click handler should already respond to `.callout-link` elements with `data-callout-id` — verify this is wired correctly and wire it if not.

The `callout-link` class should be styled to match the existing design system — use the gold/teal accent color, no underline by default, underline on hover.

---

## Fix 3: Build and Render the "Know the Playfield" Section

Each game JSON has a `key_areas` array that is not currently rendered anywhere on the Bar Napkin page. This needs to become a visible section.

**JSON structure (already exists in all game files):**
```json
"key_areas": [
  {
    "id": "helipad_ramp",
    "name": "The Helipad Ramp",
    "location_hint": "Right side of the playfield, fed from the right flipper.",
    "why_it_matters": "Step 4 of 5 in the Paddock Loop. You can't capture a dinosaur without it..."
  }
]
```

**Page placement:** Insert the new section between the Summary/mode pills section and the One Shot That Matters section.

**Section header:** "Know the Playfield" — use the same header style as "The One Shot That Matters" and "Your Game Plan."

**Card layout:**
- 2-column grid on desktop, single column on mobile (match the existing card grid breakpoint)
- Each card renders:
  - `name` as the card header — styled as a clickable callout link (same `.callout-link` style from Fix 2), clicking opens the playfield flyout for `area.id`
  - `location_hint` directly below the name — small, muted, italic text (one line)
  - `why_it_matters` as the card body — normal weight prose, no special styling

**No difficulty tags** in this section. No `{{callout:}}` token processing needed in `why_it_matters` — these are plain prose descriptions.

**React implementation:**

```jsx
{game.key_areas && game.key_areas.length > 0 && (
  <section className="napkin-section">
    <h2 className="section-header">Know the Playfield</h2>
    <div className="key-areas-grid">
      {game.key_areas.map(area => (
        <div key={area.id} className="key-area-card">
          <a
            className="callout-link key-area-name"
            data-callout-id={area.id}
            onClick={() => openCallout(area.id)}
          >
            {area.name}
          </a>
          <p className="key-area-location">{area.location_hint}</p>
          <p className="key-area-body">{area.why_it_matters}</p>
        </div>
      ))}
    </div>
  </section>
)}
```

---

## Verification Checklist

After implementing all three fixes, verify the following on the Jurassic Park Bar Napkin page:

- [ ] Ball 1 Priority 1 description renders bold shot names (no literal `<strong>` tags visible)
- [ ] Ball 1 Priority 2 description renders shot names as clickable gold/teal links
- [ ] Clicking a shot name link in a priority description opens the correct playfield flyout
- [ ] Summary text renders `<strong>` mode names as bold (no literal tags)
- [ ] The "Know the Playfield" section appears between Summary and One Shot That Matters
- [ ] Know the Playfield shows 5 cards for Jurassic Park (Truck, M-A-P Zone, Paddock Entrance, Set Trap Cluster, Helipad Ramp)
- [ ] Clicking a card name opens the correct playfield flyout
- [ ] Location hints render in small muted italic text
- [ ] Know the Playfield renders correctly on mobile (single column)
- [ ] Check one other game (e.g. Star Wars) — should show 4 key area cards

## Do Not Modify

- Any `.json` files in `/content/games/` — all JSON content is correct as-is
- The playfield flyout modal component — only wire to it, don't change it
- The stdout contract in any backend scripts