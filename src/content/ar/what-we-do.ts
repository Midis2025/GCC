import type { Localised } from "@/content";
import type {
  commercialModelContent,
  otherServiceLinesContent,
  serviceLines,
  whatWeDoHero,
  whatWeDoReach,
  whatWeDoShowcase,
  whatWeDoTransition,
} from "@/data/what-we-do";

/**
 * ============================================================================
 * WHAT WE DO - ARABIC
 * ============================================================================
 * Mirrors `data/what-we-do.ts`. Types are taken from the English module, so a
 * renamed or reshaped field is a compile error here rather than a silent gap
 * on an Arabic page.
 *
 * ----------------------------------------------------------------------------
 * WHAT STAYS AS IT IS
 * ----------------------------------------------------------------------------
 * - `slug`, `href`, `photoKey` - identifiers and routes. A translated
 *   `photoKey` would select no photograph; a translated `href` would 404. The
 *   language prefix on a route is added by `LocaleLink`, never here.
 * - `number` - Western numerals, matching the English site and Gulf corporate
 *   convention.
 * - "Gulf Connect" - a registered name, kept in Latin script inside Arabic
 *   sentences as Gulf corporate Arabic does.
 *
 * ----------------------------------------------------------------------------
 * TERMINOLOGY
 * ----------------------------------------------------------------------------
 * The four service-line names match `nav.services` in the chrome dictionary
 * exactly, so the header, the footer, this page and the four service pages all
 * name the same thing the same way.
 *
 * ----------------------------------------------------------------------------
 * COMPLIANCE
 * ----------------------------------------------------------------------------
 * `commercialModelContent.exclusions` is now ONE denial, translated in full
 * and at the same force as the English:
 *
 *   No success fees -> لا أتعاب مشروطة بالنجاح
 *
 * Two were removed with their English originals, on client instruction to take
 * share-price and equity compensation language off the public site:
 *
 *   لا مقابل مرتبط برأس المال المُجمَّع
 *   لا مقابل مرتبط بسعر السهم
 *
 * The statement of fact carried inside the first - "ولا نستقطب استثمارات ولا
 * نحتفظ بأموال العملاء" - is not lost. It is a regulatory statement rather than
 * a compensation one, and it still stands in the standing disclosure in
 * `content/ar/ui.ts` on every page. Only its framing as a compensation
 * exclusion has gone.
 *
 * What remains may not be shortened, merged or softened, and neither cut may be
 * reversed without the client. Both await legal review with the English.
 */

export const whatWeDoHeroAr: Localised<typeof whatWeDoHero> = {
  eyebrow: "خدماتنا",
  title: "أربعة خطوط عمل، ضمن برنامج واحد",
  lead: "تُعرّف Gulf Connect الشركات العالمية بالمستثمرين والشركاء في الخليج. نجمع مستثمرين مؤهَّلين في اجتماعات منظَّمة، ونطوّر قصة الشركة ونعرضها على الإعلام الاقتصادي الإقليمي بالإنجليزية والعربية، وننتج محتوى يبقى ملكًا للعميل.",
};

export const serviceLinesAr: Localised<typeof serviceLines> = [
  {
    slug: "investor-roadshows",
    title: "جولات المستثمرين",
    href: "/what-we-do/investor-roadshows",
    photoKey: "roadshows",
    strapline: "برامج اجتماعات منظَّمة مع المستثمرين في أسواق الخليج.",
    summary:
      "سلسلة منظَّمة من الاجتماعات الثنائية وجلسة جماعية مستضافة مع مستثمرين خليجيين مؤهَّلين، مُعدَّة حول قطاع الشركة وقصتها المؤسسية.",
  },
  {
    slug: "gulf-programme",
    title: "برنامج الخليج",
    href: "/what-we-do/gulf-programme",
    photoKey: "programme",
    strapline: "برنامج تواصل مع المستثمرين مدته ستة أشهر.",
    summary:
      "استمرارية بدل زيارة واحدة. ستة أشهر من اجتماعات المستثمرين، وإنتاج المحتوى، ودورات العرض على الإعلام، والتوزيع باللغة العربية، وتقارير مكتوبة شهرية.",
  },
  {
    slug: "media-arabic-communications",
    title: "الإعلام والتواصل باللغة العربية",
    href: "/what-we-do/media-arabic-communications",
    photoKey: "media",
    strapline: "الإعلام الاقتصادي الإقليمي، والتواصل بالعربية، والترجمة، والمحتوى.",
    summary:
      "تحريري ومدفوع ومملوك، يُفصل بينها فصلًا صريحًا، مع ترجمة مالية معتمدة وتواصل مؤسسي باللغة العربية للتوزيع الإقليمي.",
  },
  {
    slug: "advisory",
    title: "الاستشارات",
    href: "/what-we-do/advisory",
    photoKey: "advisory",
    strapline: "دخول الأسواق الإقليمية، وتقييم الإدراج، واستراتيجية المؤتمرات.",
    summary:
      "إحاطات حول الطريقة التي ستُقرأ بها الشركة في أسواق الخليج: تقييم الإدراج الإقليمي، واعتبارات دخول السوق، واستراتيجية المؤتمرات.",
  },
];

export const commercialModelContentAr: Localised<typeof commercialModelContent> = {
  label: "النموذج التجاري",
  heading: "أتعاب ثابتة لنطاقات عمل محدَّدة",
  paragraphs: [
    "تعمل Gulf Connect بأتعاب مهنية ثابتة يُتفق عليها مسبقًا مقابل نطاق عمل محدَّد. ويُسعَّر البرنامج بناءً على ما يُعدّ ويُنظَّم ويُنتَج ويُقدَّم عنه تقرير، لا بناءً على ما يترتب عليه.",
    "وهذا هيكل مقصود لا مجرد تفضيل في التسعير. فهو يُبقي مصلحة الشركة في جودة العمل لا في إتمام صفقة، وهو ما يتيح الإفصاح عن العلاقة التجارية بوضوح حيثما اتصل محتوانا بشركة تعاقدت معنا.",
  ],
  exclusionsLabel: "ما لا نتقاضى مقابله أتعابًا",
  exclusions: [
    {
      term: "لا أتعاب مشروطة بالنجاح",
      description: "الأتعاب غير مشروطة بأي صفقة أو نتيجة اجتماع أو إعلان.",
    },
  ],
};

export const whatWeDoShowcaseAr: Localised<typeof whatWeDoShowcase> = {
  label: "خطوط الخدمة",
  heading: "أربع طرق نعمل بها",
  note: "لا تحتاج معظم الشركات إلى الأربعة مجتمعة. ويتحدَّد التوازن بينها بموقع الشركة الحالي من المنطقة.",
};

export const whatWeDoTransitionAr: Localised<typeof whatWeDoTransition> = {
  statement: "سوق واحدة. وأربع طرق للعمل فيها.",
};

export const whatWeDoReachAr: Localised<typeof whatWeDoReach> = {
  label: "الاتصال العالمي",
  heading: "شركات عالمية. أسواق خليجية.",
  paragraphs: [
    "يجري كل برنامج بين موضعين: حيث توجد الشركة، وحيث توجد الجهات المعنية بها. والعمل هو الطريق بينهما — اجتماعات تُعدّ وتُنظَّم، وقصة تُطوَّر وتُعرض، ومحتوى يُنتَج ويُسلَّم.",
    "تحمل دبي وأبوظبي معظم هذا العمل، وتنضم إليهما الرياض حيثما جعل قطاع الشركة ذلك ذا صلة.",
  ],
};

export const otherServiceLinesContentAr: Localised<typeof otherServiceLinesContent> = {
  label: "أيضًا",
  heading: "خطوط العمل الثلاثة الأخرى",
};
