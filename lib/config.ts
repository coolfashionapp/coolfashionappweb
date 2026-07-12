// Base path the site is served under (e.g. "/coolfashionappweb" on GitHub Pages).
// Raw <img> tags and other absolute asset refs need this prefixed manually;
// Next.js only auto-prefixes next/image, next/link, and metadata.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Google Apps Script Web App URL that appends waitlist signups to the Sheet.
// Overridable via NEXT_PUBLIC_WAITLIST_ENDPOINT; defaults to the live endpoint.
// Use || (not ??) so an empty env value (e.g. an unset CI variable) also falls back.
export const waitlistEndpoint =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbzrtRxrM9fsnU7u4qppBfg4lAiY0bQ-gLonOUVRLSvlU_OHhNnonxts-nlRh-WwJbkgWQ/exec";

// Supabase project the waitlist also writes to (alongside the Sheet above).
// Both are public-safe: the anon key only grants the INSERT the RLS policy allows.
// Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (local)
// or as GitHub Actions repo variables/secrets (CI). Empty => the Supabase write is
// skipped and only the Sheet receives the signup.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Prefix an absolute asset path with the base path.
export function asset(path: string): string {
  return `${basePath}${path}`;
}
