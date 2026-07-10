# bundl — website

Waitlist landing page for **bundl**: curated vintage style bundles, handpicked
by stylists. Built with Next.js (App Router) and TypeScript.

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

## Waitlist form

The form on the hero is wired to a real endpoint at `POST /api/waitlist`
([app/api/waitlist/route.ts](app/api/waitlist/route.ts)). It validates the
email, normalizes it, and stores the signup with the selected role
(`buyer` or `stylist`).

Storage is handled in [lib/waitlist-store.ts](lib/waitlist-store.ts):

- **Local development (no setup):** signups are appended to
  `./data/waitlist.jsonl`. This file is gitignored.
- **Production (Supabase):** set the env vars below and signups are inserted
  into a `waitlist` table via the Supabase REST API.

### Setting up Supabase (for production)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL editor, create the table:

   ```sql
   create table waitlist (
     id          bigint generated always as identity primary key,
     email       text not null unique,
     role        text not null default 'buyer',
     created_at  timestamptz not null default now()
   );
   ```

3. Copy [.env.example](.env.example) to `.env.local` and fill in:

   ```
   SUPABASE_URL=https://<your-project-ref>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
   ```

   The service role key is secret — keep it server-side only.

4. View or export signups from the Supabase dashboard (Table editor → `waitlist`).

> Prefer a different backend (Formspree, a Google Sheet, Resend, etc.)? Swap the
> implementation in `saveSignup()` — the API route and form don't need to change.

## Deploying

The project deploys as-is to [Vercel](https://vercel.com):

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the project's
   Environment Variables.
4. Deploy.

(The local-file fallback only works in dev — serverless filesystems are
ephemeral, so configure Supabase before shipping the waitlist.)

## Project structure

```
app/
  layout.tsx           fonts, metadata
  page.tsx             composes the page
  globals.css          all styles (ported from the design)
  icon.svg             favicon
  api/waitlist/route.ts  waitlist endpoint
components/
  Nav.tsx  Hero.tsx  PhoneMockup.tsx  WaitlistForm.tsx  Stylist.tsx  Footer.tsx
lib/
  waitlist-store.ts    signup persistence (Supabase + local fallback)
public/assets/         logo + product images
```

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server                 |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Lint                                 |
