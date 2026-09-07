# RM Nail Salon

Luxury React + Vite website for **RM Nail Salon**, a Midtown NYC Russian manicure studio.

## Tech

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Mobile-first responsive layout
- Prerendered React pages with client-side hydration and routing

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

## Build

```bash
npm run build
```

## Edit Links, Prices, Contact Details

All booking links, contact placeholders, services, prices, FAQ items, and gallery image paths live in:

```text
src/siteConfig.js
```

Booking buttons open the salon's Booksy profile. The website does not invent available slots or claim to reserve an appointment. Existing Google Ads booking, directions, and phone conversion IDs are retained; review clicks are a separate event.

## Pages

- `/` Home
- `/services` Full services and pricing
- `/about` Studio story
- `/gallery` Gallery with modal previews
- `/contact` Contact, map, and all nearby-area guides
- `/faq` FAQ accordion

## Replacing Imagery

Source image assets are stored in:

```text
public/images
```

Replace any image with a real salon photo using the same filename, or update the image path in `src/siteConfig.js`.

`npm run build` creates uncropped responsive image derivatives, builds the browser and server entries, and renders the actual React components into HTML. The shared image manifest is generated automatically. Gallery dialogs retain the original images. Inter and Playfair Display are self-hosted with their licenses in `public/fonts`; `scripts/prepare-fonts.mjs` refreshes those assets when intentionally needed.

The full route list and metadata live in `src/seoData.js`. When adding a route, update the explicit page rule in `vercel.json`; automated tests catch missing mappings. Unknown URLs return the branded 404 with a real error status. Only indexable routes appear in the sitemap. Use `dateModified` only for a substantive page update.

## Verification

```bash
npm run build
npm test
npm run preview
```

The production-like preview runs at `http://127.0.0.1:5188`, including redirects, 404 responses, and text compression. Choose another port with `npm run preview -- --port 5189`.

With preview running, `node scripts/qa-seo.mjs` checks every page at mobile and desktop widths and verifies no-JavaScript rendering. `node scripts/qa-interactions.mjs` checks navigation, gallery, FAQ, touch review rotation, video visibility playback, and conversion triggers. These checks use an installed Microsoft Edge and block advertising requests. Set `QA_BASE_URL` to test a deployed site.

## Content Maintenance

- Keep review excerpts faithful and attributed. `reviewSummary` records the source, check date, and count; do not substitute model photos for clients or artists.
- The September 6, 2026 public Booksy check reconciled three matching combo prices and the smart-pedicure duration. Confirm website-only packages and technician tiers against the owner's approved menu before changing them.
- Do not publish unverified credentials, product brands, sterilization equipment, travel times, or accessibility claims.
- The website cannot establish completed Booksy appointments from a booking click. Verify platform-supported completion reporting and authenticated Search Console/Business Profile data separately.
