// Base path the site is served under (e.g. "/coolfashionappweb" on GitHub Pages).
// Raw <img> tags and other absolute asset refs need this prefixed manually;
// Next.js only auto-prefixes next/image, next/link, and metadata.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Google Apps Script Web App URL that appends waitlist signups to the Sheet.
// Overridable via NEXT_PUBLIC_WAITLIST_ENDPOINT; defaults to the live endpoint.
export const waitlistEndpoint =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ??
  "https://script.google.com/macros/s/AKfycbzrtRxrM9fsnU7u4qppBfg4lAiY0bQ-gLonOUVRLSvlU_OHhNnonxts-nlRh-WwJbkgWQ/exec";

// Prefix an absolute asset path with the base path.
export function asset(path: string): string {
  return `${basePath}${path}`;
}
