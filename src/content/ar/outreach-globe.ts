import type { GlobeMarket, globePanelContent } from "@/data/outreach-globe";
import { globeMarkets, heroMarkets } from "@/data/outreach-globe";
import type { Localised } from "@/content";

/**
 * ============================================================================
 * GLOBE MARKETS - ARABIC
 * ============================================================================
 * Only the readable fields are translated. The GEOMETRY is copied straight
 * from the English module and never restated here:
 *
 *   lon, lat, view  - real coordinates. Retyping them in a translation file is
 *                     an invitation to a transcription error that would move a
 *                     city on the map.
 *   code            - ISO identifiers, used to key the hero copy and the label
 *                     slots.
 *   international   - a flag the renderer switches on.
 *
 * So each entry is spread from its English original and only `label`, `city`,
 * `description` and `focus` are replaced. A market added to the English module
 * appears here automatically, in English, rather than disappearing from the
 * Arabic globe - which is the safe direction for a data file that carries
 * coordinates.
 *
 * COMPLIANCE: the descriptions characterise MARKETS, not the firm's presence
 * in them. Nothing here implies an office, a registration or a relationship,
 * and the standing denial under the globe says so explicitly.
 */

const copy: Record<string, { label: string; city: string; description: string; focus: string[] }> = {
  AE: {
    label: "الإمارات",
    city: "دبي",
    description: "بوابة إقليمية لأسواق المال الخليجية والتواصل الدولي.",
    focus: ["تحديد المستثمرين", "تواصل موجَّه", "الربط عبر الحدود"],
  },
  SA: {
    label: "السعودية",
    city: "الرياض",
    description: "سوق إقليمي رئيسي بمشاركة مؤسسية متنامية.",
    focus: ["مسح السوق", "إشراك المستثمرين", "دعم الجولات التعريفية"],
  },
  QA: {
    label: "قطر",
    city: "الدوحة",
    description: "مركز مالي خليجي مهم.",
    focus: ["تحديد المستثمرين", "مسح السوق", "إشراك المستثمرين"],
  },
  KW: {
    label: "الكويت",
    city: "مدينة الكويت",
    description: "منظومة راسخة لرؤوس الأموال الخاصة.",
    focus: ["تحديد المستثمرين", "تواصل موجَّه", "إشراك المستثمرين"],
  },
  BH: {
    label: "البحرين",
    city: "المنامة",
    description: "مركز إقليمي للخدمات المالية.",
    focus: ["مسح السوق", "تواصل موجَّه", "الربط عبر الحدود"],
  },
  OM: {
    label: "عُمان",
    city: "مسقط",
    description: "جزء من المشهد الاستثماري الخليجي الأوسع.",
    focus: ["مسح السوق", "تحديد المستثمرين", "دعم الجولات التعريفية"],
  },
  INT: {
    label: "رأس المال الدولي",
    city: "أوساط المستثمرين العالميين",
    description: "ربط شركات الخليج بأوساط المستثمرين الدوليين ذات الصلة.",
    focus: ["الربط عبر الحدود", "تواصل موجَّه", "دعم الجولات التعريفية"],
  },
};

/** The hero's own shorter descriptions, keyed by the same codes. */
const heroCopyAr: Record<string, string> = {
  AE: "بوابة إقليمية لأسواق المال الخليجية والتواصل مع المستثمرين الدوليين.",
  SA: "سوق إقليمي رئيسي بمشاركة مؤسسية متنامية.",
  QA: "مركز مالي خليجي مهم.",
  KW: "منظومة راسخة لرؤوس الأموال الخاصة.",
  BH: "مركز إقليمي للخدمات المالية.",
  OM: "جزء من المشهد الاستثماري الخليجي الأوسع.",
  INT: "مستثمرون عالميون وشبكات مؤسسية في أنحاء العالم.",
};

function translate(markets: readonly GlobeMarket[], descriptions?: Record<string, string>) {
  return markets.map((market) => {
    const c = copy[market.code];
    if (!c) return market;

    return {
      ...market,
      label: c.label,
      city: c.city,
      description: descriptions?.[market.code] ?? c.description,
      focus: c.focus,
    };
  });
}

export const globeMarketsAr: readonly GlobeMarket[] = translate(globeMarkets);
export const heroMarketsAr: readonly GlobeMarket[] = translate(heroMarkets, heroCopyAr);

export const globePanelContentAr: Localised<typeof globePanelContent> = {
  eyebrow: "تركيز السوق",
  focusLabel: "مجالات التركيز",
  hint: "اسحب للتدوير. اختر سوقًا لاستكشافه.",
};
