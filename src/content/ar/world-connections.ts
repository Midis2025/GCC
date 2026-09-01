import type { Localised } from "@/content";
import type { insightMap, investorsMap, whatWeDoMap } from "@/data/world-connections";

/**
 * ============================================================================
 * MAP CONFIGURATIONS - ARABIC
 * ============================================================================
 * Mirrors `data/world-connections.ts`.
 *
 * ----------------------------------------------------------------------------
 * WHAT IS TRANSLATED AND WHAT IS NOT
 * ----------------------------------------------------------------------------
 * - `id` stays in Latin. It is the key a connection is drawn against; a
 *   translated one would draw no line at all rather than fail loudly.
 * - `lon`, `lat`, `kind`, `side`, `labelDy`, `compact` are geometry and
 *   identifiers, repeated verbatim.
 * - `label` and `detail` are visible copy and are translated. Place names use
 *   their established Arabic forms - دبي، أبوظبي، الرياض، لندن، جنيف - which
 *   is what a Gulf reader expects; "North America" and "Asia-Pacific" are
 *   regions, not proper company names, and translate normally.
 *
 * NOTE ON `side: "left"`. This is a LAYOUT hint consumed by
 * `ConnectedWorldMap`, not a reading direction, and it is repeated unchanged.
 * It decides which side of a plotted dot its label is drawn on so that labels
 * do not collide over Europe and the Gulf - a decision about the geography
 * under the label, which does not change with the language above it. The map
 * itself is never mirrored: mirroring it would move the Gulf to the wrong side
 * of the world.
 *
 * ----------------------------------------------------------------------------
 * COMPLIANCE
 * ----------------------------------------------------------------------------
 * A line on this map means cross-border company and market connectivity and
 * nothing else. The Arabic keeps that: no `detail` says a meeting produced an
 * investment, and Dubai remains the only place the firm is said to be - Riyadh
 * and the other Gulf markets are أسواق, never مكاتب.
 *
 * The standing denial that sits under every map is in the chrome dictionary as
 * `maps.denial`, so it is identical wherever a map appears.
 */

export const insightMapAr: Localised<typeof insightMap> = {
  nodes: [
    {
      id: "dubai",
      lon: 55.27,
      lat: 25.2,
      label: "دبي",
      kind: "hub",
      detail: "مقر Gulf Connect في دبي. اجتماعات المستثمرين والإعلام والتواصل الإقليمي.",
    },
    {
      id: "abu-dhabi",
      lon: 54.37,
      lat: 24.45,
      label: "أبوظبي",
      kind: "regional",
      side: "left",
      labelDy: 13,
      detail: "رأس مال مؤسسي ومنظومة مرتبطة بالصناديق السيادية. اجتماعات وجلسات تعريفية منظَّمة.",
    },
    {
      id: "riyadh",
      lon: 46.72,
      lat: 24.71,
      label: "الرياض",
      kind: "regional",
      side: "left",
      labelDy: -11,
      detail: "تفاعل مع السوق الإقليمية، حيثما جعل قطاع الشركة ذلك ذا صلة.",
    },
    {
      id: "london",
      lon: -0.13,
      lat: 51.5,
      label: "لندن",
      kind: "origin",
      side: "left",
      detail: "شركات مُدرَجة عابرة للحدود وفرق إدارتها.",
    },
    {
      id: "geneva",
      lon: 6.14,
      lat: 46.2,
      label: "جنيف",
      kind: "origin",
      side: "left",
      compact: true,
      detail: "شركات مُدرَجة عابرة للحدود وفرق إدارتها.",
    },
    {
      id: "north-america",
      lon: -74,
      lat: 40.7,
      label: "أمريكا الشمالية",
      kind: "origin",
      side: "left",
      detail: "شركات عالمية تعمل في القطاعات التي تغطيها Gulf Connect.",
    },
    {
      id: "asia",
      lon: 103.8,
      lat: 1.35,
      label: "آسيا والمحيط الهادئ",
      kind: "origin",
      compact: true,
      detail: "شركات عالمية تعمل في القطاعات التي تغطيها Gulf Connect.",
    },
  ],
  connections: ["london", "north-america", "geneva", "asia", "riyadh", "abu-dhabi"],
  captions: [
    {
      term: "شركات عالمية",
      detail: "شركات مُدرَجة عابرة للحدود وفرق إدارتها في القطاعات المشمولة بالتغطية.",
    },
    {
      term: "أسواق الخليج",
      detail: "دبي وأبوظبي، والرياض حيثما كان ذلك ذا صلة بالقطاع.",
    },
    {
      term: "محتوى دوري",
      detail: "سياق قطاعي وسوقي يُنشر وفق وتيرة معلنة.",
    },
  ],
};

export const whatWeDoMapAr: Localised<typeof whatWeDoMap> = {
  nodes: [
    insightMapAr.nodes[0],
    insightMapAr.nodes[1],
    insightMapAr.nodes[2],
    insightMapAr.nodes[3],
    insightMapAr.nodes[5],
    insightMapAr.nodes[6],
  ],
  connections: ["london", "north-america", "asia", "riyadh", "abu-dhabi"],
  captions: [
    { term: "الاجتماعات", detail: "اجتماعات ثنائية منظَّمة وجلسات مستضافة." },
    { term: "الإعلام", detail: "تطوير القصة وعرضها على الإعلام الاقتصادي الإقليمي." },
    {
      term: "التواصل باللغة العربية",
      detail: "ترجمة مالية معتمدة وتوزيع إقليمي.",
    },
  ],
};

/**
 * COMPLIANCE. The third caption is the load-bearing one: the firm is not paid
 * by investors and makes no recommendations. It states the absence of both and
 * must not be softened into a statement of preference.
 */
export const investorsMapAr: Localised<typeof investorsMap> = {
  nodes: whatWeDoMapAr.nodes,
  connections: ["london", "north-america", "asia", "abu-dhabi", "riyadh"],
  captions: [
    {
      term: "من يسجّل",
      detail: "مؤسسات، ومديرو أصول، ومكاتب عائلية، وبنوك خاصة، ومستثمرون أفراد مؤهَّلون.",
    },
    {
      term: "ما يُنظَّم",
      detail: "جلسات تعريفية مع شركات عالمية، يُبلَّغ عنها عند جدولتها.",
    },
    {
      term: "ليست استقطابًا",
      detail: "لا تتقاضى Gulf Connect أتعابًا من المستثمرين ولا تقدّم أي توصيات.",
    },
  ],
};
