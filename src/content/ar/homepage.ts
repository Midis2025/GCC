import type { Localised } from "@/content";
import type {
  approachContent,
  audienceContent,
  ctaContent,
  gulfMarkets,
  heroContent,
  heroStats,
  introContent,
  marketPanelContent,
  orientationContent,
  outreachContent,
  whyContent,
} from "@/data/homepage";

/**
 * ============================================================================
 * HOMEPAGE MODULES - ARABIC
 * ============================================================================
 * Mirrors `data/homepage.ts`. Types taken from the English module, so a
 * renamed or reshaped field is a compile error here rather than a silent gap
 * on an Arabic page.
 *
 * ----------------------------------------------------------------------------
 * WHAT STAYS IN LATIN OR IN WESTERN NUMERALS
 * ----------------------------------------------------------------------------
 * - `code` on a market ("AE", "SA") - ISO identifiers.
 * - `mark` and `photo` - identifiers selecting a drawing or a photograph.
 * - `href` - routes; the prefix is added by `LocaleLink`.
 * - `figure` values that are numerals ("04", "06", "01") - Western numerals
 *   throughout, matching the English site and Gulf corporate convention.
 *
 * `heroStats` has three `figure` values that are WORDS rather than numbers -
 * "Global", "Cross-Border", "Strategic" - and those are copy, so they are
 * translated. They are set at display size beside a label, and Arabic runs
 * longer than English here; the layout wraps rather than clipping, which is
 * why the figures were kept short.
 *
 * ----------------------------------------------------------------------------
 * COMPLIANCE
 * ----------------------------------------------------------------------------
 * `marketOrientationNote`, `outreachContent.disclaimer` and
 * `audienceContent.note` are the three denials on this page: market
 * orientation is not offices or registrations, and the audience list is not a
 * client list. All three are translated in full. None may be shortened.
 *
 * `headlineLines` breaks the headline for the display setting. Arabic is
 * broken at its own natural clause boundaries rather than at the English ones,
 * because a line break placed by character count in a connected script lands
 * mid-phrase.
 */

export const heroContentAr: Localised<typeof heroContent> = {
  eyebrow: "رأس المال الخليجي / الشركاء في الخليج / الإعلام الخليجي",
  headline: "نربط الشركات العالمية برأس المال والشركاء والإعلام في الخليج.",
  headlineLines: ["نربط الشركات العالمية", "برأس المال والشركاء", "والإعلام في الخليج."],
  headlineAccent: "والإعلام في الخليج.",
  supporting:
    "المعادن الحيوية، والذكاء الاصطناعي والبنية التحتية للبيانات، وعلوم الحياة — عبر دبي وأبوظبي والرياض.",
  primaryCta: { label: "للشركات", href: "/what-we-do" },
  secondaryCta: { label: "للمستثمرين", href: "/for-investors" },
};

export const orientationContentAr: Localised<typeof orientationContent> = {
  statement: "سردية واحدة. أربع قدرات. ستة أسواق خليجية.",
  supporting:
    "تُنظَّم الممارسة بحيث تستند أعمال علاقات المستثمرين والتواصل مع الأسواق والإعلام والاتصال الرقمي إلى رواية واحدة عن النشاط.",
  facts: [
    {
      figure: "04",
      label: "قدرات مترابطة",
      description: "علاقات المستثمرين، والتواصل مع الأسواق، والإعلام، والاتصال الرقمي.",
    },
    {
      figure: "06",
      label: "أسواق خليجية",
      description: "الإمارات والسعودية وقطر والكويت والبحرين وعُمان.",
    },
    {
      figure: "01",
      label: "سردية مؤسسية",
      description: "رواية واحدة عن النشاط، يتغيّر أسلوب عرضها لا جوهرها.",
    },
  ],
};

export const introContentAr: Localised<typeof introContent> = {
  label: "دبي / الخليج / الأسواق العالمية",
  heading: "منظور إقليمي. معايير أسواق عالمية.",
  paragraphs: [
    "التواصل الفعّال في أسواق المال ليس مسألة ظهور فحسب. فالشركات تُقيَّم بوضوح استراتيجيتها، واتساق إفصاحها، وصلة الجهات التي تصل إليها بنشاطها.",
    "نعمل مع فرق الإدارة ومجالس الإدارة على تحديد الصورة التي تُفهم بها الشركة في السوق، ثم نبني السردية والمواد وبرنامج التواصل الذي يحافظ على ثبات هذا الفهم مع الوقت.",
  ],
  principles: [
    { title: "وضوح استراتيجي", description: "أطروحة استثمارية محدَّدة، تُعرض على نحو متسق." },
    { title: "فهم المستثمرين", description: "إدراك الطريقة التي تُقيّم بها كل جهة الشركة." },
    { title: "وصول سوقي ذو صلة", description: "تواصل تحكمه ملاءمة التفويض لا حجم الانتشار." },
    {
      title: "سردية مؤسسية",
      description: "رواية واحدة عن النشاط عبر علاقات المستثمرين والإعلام والاتصال الرقمي.",
    },
    { title: "تواصل متسق", description: "انضباط يُحافَظ عليه على امتداد السنة المالية." },
    { title: "علاقات طويلة الأمد", description: "حوار يُبنى ليتجاوز إعلانًا واحدًا." },
  ],
};

export const gulfMarketsAr: Localised<typeof gulfMarkets> = [
  { code: "AE", label: "الإمارات", city: "دبي" },
  { code: "SA", label: "السعودية", city: "الرياض" },
  { code: "QA", label: "قطر", city: "الدوحة" },
  { code: "KW", label: "الكويت", city: "مدينة الكويت" },
  { code: "BH", label: "البحرين", city: "المنامة" },
  { code: "OM", label: "عُمان", city: "مسقط" },
];

export const marketOrientationNoteAr = "توجّه سوقي فحسب. ولا يمثّل مكاتب أو تسجيلات.";

export const heroStatsAr: Localised<typeof heroStats> = [
  { figure: "06", label: "أسواق خليجية", note: "تغطية إقليمية عميقة", mark: "markets" },
  {
    figure: "عالمية",
    label: "شبكات المستثمرين",
    note: "وصول إلى أوساط المستثمرين الدوليين",
    mark: "network",
  },
  {
    figure: "عابر للحدود",
    label: "التواصل",
    note: "ربط الشركات برأس المال المناسب",
    mark: "engagement",
  },
  {
    figure: "استراتيجي",
    label: "التواصل المؤسسي",
    note: "وضوح وصلة واتساق",
    mark: "communication",
  },
];

export const marketPanelContentAr: Localised<typeof marketPanelContent> = {
  eyebrow: "التغطية في أسواق الخليج",
  statement: "تركيز إقليمي عبر أسواق خليجية رئيسية",
  note: marketOrientationNoteAr,
};

export const outreachContentAr: Localised<typeof outreachContent> = {
  label: "التواصل مع المستثمرين",
  heading: "التواصل مع المستثمرين في أنحاء الخليج",
  paragraphs: [
    "نساعد الشركات على تحديد أوساط المستثمرين المتصلة باستراتيجيتها في أسواق المال الخليجية والتواصل معها، وندعم التواصل مع المستثمرين الدوليين الباحثين عن انكشاف مدروس على المنطقة.",
    "والغاية هي الصلة لا الانتشار. إذ يبدأ كل برنامج ببحث في التفويض والنطاق الجغرافي والملف الاستثماري قبل اقتراح أي لقاء.",
  ],
  disclaimer:
    "التوجّه السوقي معروض للاسترشاد فحسب، ولا يمثّل مكاتب أو تسجيلات أو علاقات مع مستثمرين في أي ولاية قضائية.",
  categories: [
    "تحديد المستثمرين",
    "مسح السوق",
    "تواصل موجَّه",
    "إشراك المستثمرين",
    "دعم الجولات التعريفية",
    "الربط عبر الحدود",
  ],
  cta: { label: "استكشف التواصل مع المستثمرين", href: "/investor-outreach" },
};

export const approachContentAr: Localised<typeof approachContent> = {
  label: "منهجنا",
  heading: "منهج أكثر تركيزًا في التواصل مع السوق",
  steps: [
    {
      number: "01",
      title: "الفهم",
      description: "تكوين صورة واضحة عن الشركة واستراتيجيتها وسوقها وأطروحتها الاستثمارية.",
    },
    {
      number: "02",
      title: "التموضع",
      description: "صياغة سردية موجزة تتوافق مع الجهات المعنيّة.",
    },
    {
      number: "03",
      title: "الاستهداف",
      description:
        "تحديد المستثمرين والمشاركين في السوق وقنوات التواصل المناسبة للتفويض.",
    },
    {
      number: "04",
      title: "التواصل",
      description: "تنفيذ تواصل منسّق مع المستثمرين والإعلام والقنوات الرقمية.",
    },
    {
      number: "05",
      title: "التطوير",
      description: "الإفادة من ملاحظات السوق ورؤى التواصل لتعزيز الاتصال مع الوقت.",
    },
  ],
};

export const whyContentAr: Localised<typeof whyContent> = {
  label: "لماذا Gulf Connect",
  heading: "مبنيّة على الطريقة التي تعمل بها أسواق الخليج",
  pillars: [
    {
      title: "منظور خليجي",
      description: "تواصل مصوغ وفق واقع أسواق المال الإقليمية ورزنامتها وتوقعاتها.",
    },
    {
      title: "تواصل متكامل",
      description:
        "علاقات المستثمرين والإعلام والاتصال الرقمي تُعامَل كسردية مؤسسية واحدة مترابطة.",
    },
    {
      title: "تواصل مركّز",
      description: "اختيار الجهات تحكمه الصلة وملاءمة التفويض لا حجم الانتشار.",
    },
    {
      title: "تنفيذ منضبط",
      description: "برامج تُنفَّذ وفق معيار محدَّد، والإعداد والمتابعة جزء من العمل.",
    },
  ],
};

export const audienceContentAr: Localised<typeof audienceContent> = {
  label: "مع من نعمل",
  heading: "أسواق مختارة",
  note: "الجهات والقطاعات التي بُنيت هذه الممارسة من أجلها. وليست قائمة عملاء.",
  segments: [
    { label: "الشركات المدرجة الصغيرة والمتوسطة", photo: "listed" },
    { label: "فرق القيادة وعلاقات المستثمرين", photo: "leadership" },
    { label: "الذكاء الاصطناعي والبنية التحتية للبيانات", photo: "aiInfrastructure" },
    { label: "المعادن الحيوية", photo: "criticalMinerals" },
    { label: "علوم الحياة", photo: "lifeSciences" },
    { label: "الشركات العالمية الداخلة إلى الخليج", photo: "international" },
  ],
};

export const ctaContentAr: Localised<typeof ctaContent> = {
  heading: "ابدأ الحديث",
  supporting:
    "للشركات التي تسعى إلى حضور أقوى لدى المستثمرين وتواصل استراتيجي عبر الأسواق الخليجية والعالمية.",
  cta: { label: "تواصل مع Gulf Connect", href: "/contact" },
};
