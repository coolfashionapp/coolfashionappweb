import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "bundl — curated vintage style bundles, handpicked by stylists",
  description:
    "a curated bundle of clothing items, personalized to fit your budget, style, & size — sourced by an independent stylist, shipped to your door.",
  openGraph: {
    title: "bundl — curated vintage style bundles, handpicked by stylists",
    description:
      "a curated bundle of clothing items, personalized to fit your budget, style, & size — sourced by an independent stylist, shipped to your door.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
