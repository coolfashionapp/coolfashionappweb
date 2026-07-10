# bundl — website

Waitlist landing page for **bundl**: curated vintage style bundles, handpicked
by stylists. Built with Next.js (App Router + TypeScript), exported as a static
site and hosted on **GitHub Pages**.

The page has two sections:

- **Hero** — headline, buyer/stylist waitlist form, and an animated phone mockup
  of the app.
- **For stylists** — the "already bundling on tiktok? come home." call-to-action,
  plus footer.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Waitlist form → Google Sheet

The waitlist form submits directly from the browser to a **Google Apps Script
Web App**, which appends each signup (`timestamp`, `email`, `role`) as a row in
a Google Sheet. No backend server is needed, which is what makes static hosting
on GitHub Pages possible.

- Script: [google-apps-script/Code.gs](google-apps-script/Code.gs)
- Endpoint: configured in [lib/config.ts](lib/config.ts) (override via
  `NEXT_PUBLIC_WAITLIST_ENDPOINT`)

### Re-pointing to a different Sheet

1. In the Google Sheet: **Extensions → Apps Script**, paste
   [google-apps-script/Code.gs](google-apps-script/Code.gs), **Save**.
2. **Deploy → New deployment → Web app**, with **Execute as: Me** and
   **Who has access: Anyone**. Copy the `/exec` URL.
3. Set it as `NEXT_PUBLIC_WAITLIST_ENDPOINT` (locally in `.env.local`, or as a
   GitHub Actions repo variable named `WAITLIST_ENDPOINT` for the deployed site),
   or update the default in `lib/config.ts`.

> **Later: moving to a real backend.** When you're ready to switch off the Sheet
> (e.g. to Supabase), just change the endpoint the form posts to in
> `components/WaitlistForm.tsx` / `lib/config.ts`. Nothing else needs to change.

## Deploying (GitHub Pages)

Deploys automatically via GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) on every push to
`main`. One-time setup:

1. **Repo → Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Push to `main`. The workflow builds the static export and publishes it.
3. Live at **https://coolfashionapp.github.io/coolfashionappweb/**.

The site is served under the `/coolfashionappweb` base path (set by the workflow
via `NEXT_PUBLIC_BASE_PATH`). For local dev the base path is empty, so
`localhost:3000` works normally. If you later add a custom domain, set
`NEXT_PUBLIC_BASE_PATH` to empty in the workflow.

## Project structure

```
app/
  layout.tsx           fonts, metadata
  page.tsx             composes the page
  globals.css          all styles (ported from the design)
  icon.svg             favicon
components/
  Nav.tsx  Hero.tsx  PhoneMockup.tsx  WaitlistForm.tsx  Stylist.tsx  Footer.tsx
lib/
  config.ts            base path + waitlist endpoint helpers
google-apps-script/
  Code.gs              paste into the Sheet's Apps Script editor
public/assets/         logo + product images
.github/workflows/
  deploy.yml           build + deploy to GitHub Pages
```

## Scripts

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Start the dev server                           |
| `npm run build` | Static export to `out/`                        |
| `npm run lint`  | Lint                                           |
