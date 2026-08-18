import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteConfig } from "@/data/site";
import { createRootMetadata } from "@/lib/seo";

import "./globals.css";

/**
 * Typography pairing.
 *
 * Newsreader carries the major editorial headlines - an optical-size aware
 * text serif with the moderate contrast and slightly narrow set that reads as
 * financial publishing rather than fashion display. Instrument Sans handles
 * navigation, UI and body copy: a quiet grotesque with a taller x-height and
 * less startup association than the usual UI sans.
 *
 * Both are loaded with `display: swap` and latin subsets, so there is no
 * invisible-text flash and no layout shift from a late webfont. The CSS
 * variables are named for their ROLE, not the family, so changing typeface
 * later means editing only this file.
 */
const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  // Only the 400 upright is used anywhere in the design. Loading the 300/500
  // weights and the italics pulled six font files for no visual gain.
  weight: ["400"],
});

const body = Instrument_Sans({
  variable: "--font-body",
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
    <html
      lang={siteConfig.locale}
      className={`${display.variable} ${body.variable} h-full`}
    >
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
