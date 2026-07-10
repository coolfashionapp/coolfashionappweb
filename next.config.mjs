/** @type {import('next').NextConfig} */

// GitHub Pages serves this project at /coolfashionappweb.
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH=/coolfashionappweb.
// Locally it's empty, so `next dev` serves from the root as usual.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // static HTML export for GitHub Pages
  images: { unoptimized: true }, // no image optimization server on Pages
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true, // emit /path/index.html so Pages serves clean URLs
};

export default nextConfig;
