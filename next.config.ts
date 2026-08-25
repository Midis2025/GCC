import type { NextConfig } from "next";

/**
 * Redirects for routes retired by the Phase 1 sitemap.
 *
 * The brief replaced a seven-page structure with five plus four service pages,
 * and several old routes have no equivalent. Nothing is simply deleted: each
 * one points at the page that now carries its subject, so links already in
 * circulation - proposals, email signatures, the deployed preview - keep
 * working rather than producing a 404.
 *
 * All permanent (308). These are structural moves, not experiments.
 *
 * `/industries`, `/projects` and `/investor-outreach` route to the pages whose
 * content absorbed them:
 *
 *   - Industries described sector context. The three sectors the firm actually
 *     covers are now named on For Investors and About, so it points at What We
 *     Do rather than at a sector page that no longer exists.
 *   - Investor Outreach was the old name for work now split between Investor
 *     Roadshows and The Gulf Programme. It points at the overview so a visitor
 *     chooses between them rather than landing on a guess.
 *   - Selected Work was a case-study index with no case studies. It points at
 *     What We Do.
 */
const nextConfig: NextConfig = {
  /*
   * Image delivery.
   *
   * The source frames are 1800-2000px JPEGs, which is the right size for a
   * full-bleed band on a 1440-1920px display and sharp enough not to soften on
   * a retina panel at the widths they are actually rendered. The job here is
   * to stop shipping them as JPEG.
   *
   * `formats` was unset, so Next served WebP alone. AVIF is listed first
   * because it is materially smaller than WebP on exactly this kind of
   * material - large, dark, low-frequency architectural photography, where
   * WebP spends bits on gradient noise that AVIF does not. Browsers that do
   * not accept AVIF fall back to WebP, and anything older falls back to the
   * original JPEG, so there is no floor to raise.
   *
   * `deviceSizes` drops the 3840 bucket. Nothing on the site is a full-width
   * image on a 4K display, the sources top out at 2000px, and leaving the
   * bucket in only invites `sizes` mistakes to request an upscale.
   */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async redirects() {
    return [
      /* --- Services -> What We Do ---------------------------------------- */
      { source: "/services", destination: "/what-we-do", permanent: true },
      {
        source: "/services/investor-relations",
        destination: "/what-we-do/gulf-programme",
        permanent: true,
      },
      {
        source: "/services/media-relations",
        destination: "/what-we-do/media-arabic-communications",
        permanent: true,
      },
      {
        source: "/services/digital-communications",
        destination: "/what-we-do/media-arabic-communications",
        permanent: true,
      },
      { source: "/services/:slug", destination: "/what-we-do", permanent: true },

      /* --- Investor outreach -> the two programme pages ------------------- */
      {
        source: "/investor-outreach",
        destination: "/what-we-do/investor-roadshows",
        permanent: true,
      },

      /* --- Insights -> Insight ------------------------------------------- */
      { source: "/insights", destination: "/insight", permanent: true },
      { source: "/insights/:slug", destination: "/insight/:slug", permanent: true },

      /* --- Retired sections ---------------------------------------------- */
      { source: "/industries", destination: "/what-we-do", permanent: true },
      { source: "/projects", destination: "/what-we-do", permanent: true },
      { source: "/projects/:slug", destination: "/what-we-do", permanent: true },
    ];
  },
};

export default nextConfig;
