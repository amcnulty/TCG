# Contractor Garage™ — Marketing Website

Static marketing site for Contractor Garage™, a commercial real estate brand offering large-bay industrial workspace for contractors, tradespeople, and small businesses.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 3 |
| Routing | React Router v7 (client-side, BrowserRouter) |
| Animation | Framer Motion 12 (scroll-triggered fade-in) |
| Fonts | Barlow Condensed (display), Inter (body) — loaded via Google Fonts in `index.html` |
| Deployment | Render (static site) — configured in `render.yaml` |

---

## Folder Structure

```
contractor-garage/
├── index.html              # App shell — Google Fonts links live here
├── vite.config.js          # Vite build config
├── tailwind.config.js      # Brand colors and font families
├── postcss.config.js       # Required by Tailwind
├── render.yaml             # Render.com static site deploy config
├── package.json
└── src/
    ├── main.jsx            # Entry point — mounts <App> into #root
    ├── App.jsx             # Router setup + Nav/Footer shell
    ├── index.css           # Tailwind directives + global base resets
    ├── assets/             # Static images (imported directly in JSX)
    │   ├── hero.jpg        # Dusk exterior (used: Home hero, Home split)
    │   ├── location.jpg    # Daytime exterior (used: Home split, Locations hero)
    │   ├── kevin.jpg       # Kevin headshot (used: About bio)
    │   └── presenting.png  # Kevin presenting (used: BrandWithUs seminar)
    ├── components/
    │   ├── AnimateOnScroll.jsx  # Framer Motion scroll-trigger wrapper
    │   ├── Footer.jsx           # 4-column dark footer
    │   ├── Logo.jsx             # Official brand SVG (inline, color-switchable)
    │   └── Nav.jsx              # Sticky nav — transparent to dark on scroll
    └── pages/
        ├── Home.jsx             # Landing page
        ├── About.jsx            # Kevin Combs founder bio
        ├── Locations.jsx        # All locations with status table/cards
        └── BrandWithUs.jsx      # Developer pitch + pricing + contact form
```

---

## Running Locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. To preview the production build locally:

```bash
npm run preview
```

---

## Deploying to Render

The `render.yaml` at the repo root configures a Render static site:

- **Build command:** `npm install && npm run build`
- **Publish directory:** `dist`
- **SPA rewrite:** all routes (`/*`) rewrite to `/index.html` so React Router handles navigation client-side

Connect the GitHub repo on [render.com](https://render.com) → New → Static Site. Render auto-deploys on every push to `main`.

---

## Brand Colors

| Name | Hex |
|---|---|
| Orange (primary) | `#C85A0A` |
| Orange dark (hover) | `#A84808` |
| Dark (backgrounds, text) | `#1A1A1A` |
| Off-white (page background) | `#F7F6F4` |
| White | `#FFFFFF` |

In Tailwind, use arbitrary value syntax: `bg-[#C85A0A]`, `text-[#1A1A1A]`, etc.
Font utility classes: `font-display` (Barlow Condensed), `font-body` (Inter).

---

## Notes for the Next Developer

### Contact Form
`src/pages/BrandWithUs.jsx` — the contact form currently uses local React state only. `handleSubmit` just flips a `submitted` boolean to show the success state. Wire it to a real endpoint with Axios:

```js
import axios from 'axios'

const handleSubmit = async (e) => {
  e.preventDefault()
  await axios.post('/api/contact', form)
  setSubmitted(true)
}
```

Form fields: `name`, `email`, `market` (city/region), `message`.

### Adding a Leaflet Map to Locations
`src/pages/Locations.jsx` — the location data array currently has `name`, `address`, `city`, and `status`. Add `lat` and `lng` to each entry, then mount a Leaflet `<MapContainer>` in the page. There is a `TODO` comment at the top of the file marking the spot.

### AnimateOnScroll Inside CSS Grids
When `<AnimateOnScroll>` is a direct child of a CSS grid (e.g. the "Why It Works" cards on Home), pass `className="h-full"` to the component and also add `h-full` to the inner card div. Without it, the motion wrapper collapses shorter than the grid cell and the gap background color bleeds through above/below cards.

### Image Imports
Images are imported as ES module imports at the top of each page file:
```js
import heroImage from '../assets/hero.jpg'
```
Vite automatically hashes filenames and bundles them. Do not reference images via `/public/` unless a stable, unhashed URL is specifically required.

### Fonts
Barlow Condensed and Inter are loaded via `<link>` tags in `index.html`. Inline SVG `<text>` elements in `Logo.jsx` inherit document fonts automatically — no extra configuration needed.

### Logo Color Switching
`src/components/Logo.jsx` — the `white` prop swaps all dark-gray (`#3B3D40`) elements to white. Always use `<Logo white />` on dark backgrounds (the nav does this). The orange (`#CC6633`) elements are hardcoded and never change.
