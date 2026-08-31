import type { Localised } from "@/content";
import type { arabicGap, homeHero, investorInvitation, proposition, whyGulfNow } from "@/data/home";

/**
 * ============================================================================
 * HOME - ARABIC
 * ============================================================================
 * Mirrors `data/home.ts` field for field. The types are taken FROM the English
 * module, so a key that is renamed, removed or reshaped there breaks this file
 * at compile time rather than leaving a gap that only shows up on an Arabic
 * page nobody on the team can read.
 *
 * ----------------------------------------------------------------------------
 * NOT TRANSLATED, DELIBERATELY
 * ----------------------------------------------------------------------------
 * - `href` values. Routes are language-neutral; `LocaleLink` adds the prefix.
 * - `mark` and `key` values. Identifiers that select a drawing or a photograph.
 * - `number` values. Western numerals, matching the English site and Gulf
 *   corporate convention.
 * - "Gulf Connect" and "Gulf Connect Consultancy FZCO". A registered name.
 *
 * ----------------------------------------------------------------------------
 * REGISTER
 * ----------------------------------------------------------------------------
 * Formal Modern Standard Arabic, in the register of Gulf institutional
 * investor communications. Sector terms use the forms regional financial media
 * actually use - "المعادن الحيوية", "البنية التحتية للبيانات",
 * "علوم الحياة" - rather than literal calques.
 *
 * COMPLIANCE: the English makes no claim about outcomes anywhere, and neither
 * does this. "نتولّى" and "نُعِدّ" describe work performed. Nothing here says
 * that capital is raised, coverage is secured or interest is guaranteed, and
 * nothing may be edited in that direction.
 */

export const homeHeroAr: Localised<typeof homeHero> = {
  eyebrow: "Gulf Connect",
  title: "نربط الشركات العالمية برأس المال والشركاء والإعلام في الخليج.",
  lead: "المعادن الحيوية، والذكاء الاصطناعي والبنية التحتية للبيانات، وعلوم الحياة — عبر دبي وأبوظبي والرياض.",
  actions: {
    company: { label: "للشركات", href: "/what-we-do" },
    investor: { label: "للمستثمرين", href: "/for-investors" },
  },
};

export const propositionAr: Localised<typeof proposition> = {
  label: "خدماتنا",
  heading: "نجمع، ونعرض، وننتج",
  intro: "ثلاثة أنماط من العمل، وكل تكليف مزيج منها.",
  items: [
    {
      number: "01",
      term: "نجمع",
      mark: "convene",
      description:
        "لقاءات مختارة مع المستثمرين في دبي وأبوظبي والرياض. نحدّد المستثمرين الذين يتصل بهم قطاع الشركة ومرحلتها، ونُعِدّ الطرفين، ثم ننظّم اللقاءات.",
    },
    {
      number: "02",
      term: "نعرض",
      mark: "place",
      description:
        "نطوّر قصة الشركة ونصوغ موقعها ونعرضها على قائمة محدّدة من وسائل الإعلام الاقتصادي الإقليمي، بالإنجليزية والعربية. والتغطية التحريرية قرار تتخذه الجهة الناشرة؛ أما العمل الذي نتقاضى عنه أتعابًا فهو العرض ذاته.",
    },
    {
      number: "03",
      term: "ننتج",
      mark: "produce",
      description:
        "مقابلات وأفلام ومواد مكتوبة تُنتَج حول البرنامج وتُسلَّم إلى العميل. محتوى تحتفظون به وتعيدون استخدامه وتوزيعه، لا محتوى مستأجَر.",
    },
  ],
};

export const whyGulfNowAr: Localised<typeof whyGulfNow> = {
  label: "الفرصة",
  heading: "مسار لم يوجد بعد",
  paragraphs: [
    "لدى رأس المال الخليجي إقبال على الأصول الحقيقية: المعادن الحيوية، وتحوّل الطاقة، والبنية التحتية الرقمية، والرعاية الصحية وعلوم الحياة. وهي القطاعات التي تنظر فيها فعليًا المؤسسات الإقليمية والمكاتب العائلية ورؤوس الأموال المرتبطة بالجهات السيادية.",
    "أما الشركات العالمية الصغيرة والمتوسطة العاملة في هذه القطاعات تحديدًا فلا تملك مسارًا منظّمًا يصل بها إلى هذه الأوساط. فهي أصغر من أن تحظى باهتمام البنوك التي تنظّم هذه اللقاءات، وأبعد من أن تبني تلك العلاقات بنفسها. وهذه الفجوة هي سبب وجود هذه الشركة.",
  ],
  sectors: [
    "الأصول الحقيقية",
    "المعادن الحيوية",
    "تحوّل الطاقة",
    "البنية التحتية الرقمية",
    "الرعاية الصحية وعلوم الحياة",
  ],
};

export const arabicGapAr: Localised<typeof arabicGap> = {
  label: "الفجوة العربية",
  statement:
    "لا تكاد توجد شركة عالمية صغيرة أو متوسطة تنشر أو تظهر باللغة العربية. ونحن نفعل ذلك.",
  paragraph:
    "لا تكفي مكاتب الترجمة العامة لإفصاحات شركة مدرجة، فالمصطلح يحمل معنى محدّدًا في السياق التنظيمي.",
  concepts: [
    { number: "01", term: "ترجمة مالية معتمدة" },
    { number: "02", term: "تواصل مؤسسي بالعربية" },
    { number: "03", term: "توزيع إقليمي" },
  ],
  route: ["الإنجليزية", "العربية", "التوزيع الإقليمي"],
  arabicMark: "العربية",
  cta: {
    label: "الإعلام والتواصل باللغة العربية",
    href: "/what-we-do/media-arabic-communications",
  },
};

export const investorInvitationAr: Localised<typeof investorInvitation> = {
  label: "للمستثمرين",
  statement:
    "تجمع Gulf Connect مستثمرين خليجيين مؤهَّلين في جلسات تعريفية مع شركات عالمية.",
  cta: { label: "انضم إلى قائمة الدعوات", href: "/for-investors#register" },
};
