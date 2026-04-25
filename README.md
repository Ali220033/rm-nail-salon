# RM Nail Salon

Luxury React + Vite website for **RM Nail Salon**, a Midtown NYC Russian manicure studio.

## Tech

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Mobile-first responsive layout
- Static multi-page experience with client-side routing

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

The current booking buttons point to the Fresha URL provided in the project request.

## Pages

- `/` Home
- `/services` Full services and pricing
- `/about` Studio story
- `/gallery` Gallery with modal previews
- `/contact` Contact and map placeholder
- `/faq` FAQ accordion

## Replacing Imagery

Generated placeholder assets are stored in:

```text
public/images
```

Replace any image with a real salon photo using the same filename, or update the image path in `src/siteConfig.js`.
