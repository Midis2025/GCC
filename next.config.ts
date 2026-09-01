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
   * `formats` lists AVIF first because it is materially smaller than WebP on
   * exactly this kind of material - large, dark, low-frequency architectural
   * photography, where WebP spends bits on gradient noise that AVIF does not.
   * Browsers that do not accept AVIF fall back to WebP, and anything older
   * falls back to the original JPEG, so there is no floor to raise.
   *
   * `deviceSizes` has no 3840 bucket. Nothing on the site is a full-width
   * image on a 4K display, so the widest anything is asked to serve is 2048,
   * and leaving the bucket in only invites a `sizes` mistake to request an
   * upscale. Every photograph in the library is now well above 2048 on its
   * long edge, so 2048 is a genuine downscale rather than a ceiling.
   *
   * ---------------------------------------------------------------------
   * `qualities` - this line is why the photography looked soft
   * ---------------------------------------------------------------------
   * Next 16 changed the default for `images.qualities` from `all allowed` to
   * `[75]`, and it does not warn when it clamps: a `quality` prop outside the
   * list is silently coerced to the nearest allowed value. With the field
   * unset, every frame on the site - 4000px sources included - was being
   * re-encoded at q75, and there was no way to raise one.
   *
   * 90 is the value the photographic frames ask for. It is the point where
   * AVIF stops smearing the fine repeating detail these images are made of -
   * window mullions, facade grids, the flutes on a tower - which is the exact
   * artefact that reads as `blurry` rather than as `compressed`. 100 was not
   * used: it roughly doubles the bytes over 90 for a difference that does not
   * survive a downscale into a 400px card.
   *
   * 75 stays in the list and stays the default, so nothing that does not ask
   * for 90 changes weight.
   */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
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
