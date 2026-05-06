# Axe to Grind Café — Website

Static site for **Axe to Grind Café** — a neighborhood coffee shop where the lattes have setlist names and the kitchen is made-to-order. Built by Sweet Dreams Studios.

## Pages

- `index.html` — home
- `menu.html` — The Playlist (drinks), Food Menu, and Others (cold + tea)
- `story.html` — origin & day-in-the-life
- `visit.html` — location, hours, contact form
- `order.html` — pickup checkout (demo)
- `404.html` — not-found page

## Stack

Pure static — HTML + CSS + vanilla JS. No build step. Hosted free on GitHub Pages.

- **Type:** Anton (display), Inter (body), Caveat (script accents), JetBrains Mono (caps/labels)
- **Palette:** black cherry `#660013` (brand dark), white smoke `#F5F5F5` (bg), gold `#F4C247` (primary accent), frosted blue `#63E5FF` (secondary accent), shadow grey `#1F1E22` (text), silver `#A5A5A5` (utility)
- **Brand assets:** `assets/axetogrindlogo.png` (full circular badge) and `assets/coffeecupAxeIcon.png` (cup-with-guitar icon, used as favicon)
- **Imagery:** Unsplash placeholders — swap with real café photography when ready

## Local preview

Just open `index.html` in a browser, or run a quick static server:

```bash
python -m http.server 8000
# or
npx serve .
```

## Deployment — GitHub Pages

The repo's root is the publish target. The `.nojekyll` file is in place so Pages serves files as-is.

To enable, in the GitHub repo settings:
1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` · `/ (root)`
4. Save — site goes live at `https://sweet-dreams-us.github.io/AxetoGrindCafe/`

Or with the `gh` CLI:
```bash
gh api -X POST /repos/Sweet-Dreams-US/AxetoGrindCafe/pages \
  -f "source[branch]=main" -f "source[path]=/"
```

## Items still to fill in (placeholders in copy)

- **Address & phone** on `visit.html` (currently "coming soon")
- **Hours** on `visit.html` and the order-page hours-of-operation in `scripts/order.js`
- **Real photography** to replace Unsplash placeholders

## Cart & checkout

`scripts/cart.js` powers a demo cart with per-section modifiers (Playlist / Food / Others). Live integration would route through Square's hosted checkout. Order IDs are prefixed `ATG-` to namespace the brand.
