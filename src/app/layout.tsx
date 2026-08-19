import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteConfig } from "@/data/site";
import { createRootMetadata } from "@/lib/seo";

import "./globals.css";

/**
 * Typography.
 *
 * One family across the whole site: Plus Jakarta Sans, a humanist geometric
 * sans with the slightly narrow set and open apertures that read as
 * contemporary corporate rather than as a UI system font.
 *
 * Single-family by choice. Hierarchy here is carried by WEIGHT, SIZE and
 * TRACKING rather than by contrasting typefaces - large headings sit at 500
 * with tight negative tracking, body at 400, labels at 600 with wide tracking.
 * That is what keeps the display sizes feeling elegant instead of shouty; a
 * heading does not need to be bold to be dominant when it is 6rem tall.
 *
 * Loaded as a variable font, so the entire 200-800 axis is available from a
 * single file rather than one request per weight. `display: swap` with latin
 * subsets means no invisible-text flash, and because the fallback metrics are
 * adjusted automatically there is no layout shift when it lands.
 *
 * The CSS variable is named for its ROLE, not the family, so changing typeface
 * later means editing only this file.
 */
const primary = Plus_Jakarta_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = createRootMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c141d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.locale} className={`${primary.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <Header />
        {/*
          The header is fixed, so page sections own their own top spacing.
          Sections that open with a dark hero pad for it internally.
        */}
        <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
