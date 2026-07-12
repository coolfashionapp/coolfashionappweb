/** @type {import('next').NextConfig} */

// GitHub Pages serves this project at /coolfashionappweb.
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH=/coolfashionappweb.
// Locally (and on Railway) it's empty, so the site serves from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// GitHub Pages needs a static HTML export; the deploy workflow sets
// STATIC_EXPORT=true. Railway (and `next dev`) leave it unset and run a real
// Next.js server via `next start`, so server features stay available.
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  ...(staticExport ? { output: "export" } : {}), // static HTML export for GitHub Pages only
  images: { unoptimized: true }, // keep raw <img> behavior identical on both targets
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true, // clean URLs on Pages; harmless on Railway
};

export default nextConfig;
