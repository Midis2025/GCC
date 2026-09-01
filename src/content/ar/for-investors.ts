import type { Localised } from "@/content";
import type {
  forInvestorsHero,
  forInvestorsIntro,
  investorAssurance,
  investorBenefits,
  investorsReach,
  registerPanelContent,
  upcomingBriefingsContent,
  whoRegistersContent,
} from "@/data/for-investors";
import type { briefingProcess, coverage } from "@/data/investors-depth";

/**
 * ============================================================================
 * FOR INVESTORS - ARABIC
 * ============================================================================
 * Mirrors `data/for-investors.ts` and `data/investors-depth.ts`.
 *
 * ----------------------------------------------------------------------------
 * BACKEND VALUES ARE NEVER TRANSLATED
 * ----------------------------------------------------------------------------
 * `investorCategories` is the one place on the site where the distinction
 * matters most. Each entry is a pair:
 *
 *   value  the identifier submitted to the API and, later, to the CRM
 *   label  what a registrant reads
 *
 * Only `label` is translated. `value` is repeated character for character:
 *
 *   institution                 -> مؤسسة استثمارية
 *   asset-manager               -> شركة إدارة أصول
 *   family-office               -> مكتب عائلي
 *   private-bank-broker         -> بنك خاص أو وسيط
 *   qualified-private-investor  -> مستثمر خاص مؤهَّل
 *   other                       -> غير ذلك
 *
 * A translated `value` would submit a category no route recognises, and the
 * registrant would silently fall outside `GENERAL_CONTENT_ONLY` handling. The
 * same rule holds for `key` on the coverage sectors and for `href` on the CTA.
 *
 * `investorSectors` is a plain string array with no separate identifier - the
 * label IS the submitted value there. See the note on that export below.
 *
 * ----------------------------------------------------------------------------
 * COMPLIANCE - THE HIGHEST-RISK PAGE ON THE SITE
 * ----------------------------------------------------------------------------
 * Four statements do the load-bearing work, and all four survive in full:
 *
 * 1. `forInvestorsIntro.paragraphs[1]` - not paid by investors, does not
 *    solicit investment, makes no recommendations about any security.
 * 2. `coverage.disclaimer` - informational, not investment research, not a
 *    recommendation, not advice on any security.
 * 3. `briefingProcess.steps[4]` - registration places a reader on the list and
 *    does NOT guarantee a place at any briefing. "لا يضمن" must not soften
 *    into a statement about likelihood.
 * 4. `investorAssurance` - four plain denials about the registrant's details.
 *
 * Nothing in the Arabic describes what an investor might gain. Registration
 * gives access to briefings and written content; that is the whole
 * proposition, in both languages.
 */

export const forInvestorsHeroAr: Localised<typeof forInvestorsHero> = {
  eyebrow: "للمستثمرين",
  title: "جلسات تعريفية مع شركات عالمية",
  lead: "تنظّم Gulf Connect جلسات تعريفية مع شركات عالمية مدرجة تعمل عبر قطاعات تشمل الطاقة والتعدين والمستحضرات الدوائية ومراكز البيانات، وتنشر تعليقًا مكتوبًا عن هذه القطاعات موجَّهًا إلى جمهور خليجي.",
};

export const forInvestorsIntroAr: Localised<typeof forInvestorsIntro> = {
  label: "العضوية",
  heading: "مجانية، وبالتسجيل",
  paragraphs: [
    "التسجيل مجاني. وهو قائم كي تصل الدعوات إلى من تكون الشركة والقطاع والصيغة ذات صلة فعلية بهم، بدلًا من بثّها على الجميع.",
    "تتقاضى Gulf Connect أتعابها من الشركات التي تعمل معها، بأتعاب مهنية ثابتة مقابل نطاقات عمل محدَّدة. ولا نتقاضى أتعابًا من المستثمرين، ولا نستقطب استثمارات، ولا نقدّم توصيات بشأن أي ورقة مالية.",
  ],
};

export const investorBenefitsAr: Localised<typeof investorBenefits> = {
  label: "ما تحصلون عليه",
  heading: "أربعة أمور، محدَّدة بالاسم",
  items: [
    {
      term: "دعوات إلى جلسات تعريفية وجلسات مستضافة",
      description:
        "جلسات تعريفية ثنائية وضمن مجموعات صغيرة مع شركات عالمية تزور المنطقة، تُرسَل إلى المسجَّلين الذين يكون القطاع ذا صلة بهم.",
    },
    {
      /* The series names follow `content/ar/insight.ts`. */
      term: "الموجز الخليجي",
      description:
        "نشرة مكتوبة كل أسبوعين عمّا يتحرك في أسواق المال الخليجية وفي القطاعات التي نغطيها. تعليق فحسب.",
    },
    {
      term: "المذكرات القطاعية الربع سنوية",
      description:
        "إحاطة مكتوبة أطول عن قطاع واحد كل ربع سنة، متاحة للأعضاء المسجَّلين.",
    },
    {
      term: "الوصول إلى مكتبة المقابلات",
      description:
        "خمسة أسئلة — مقابلة بصيغة ثابتة مع الرئيس التنفيذي لشركة في أحد القطاعات التي نغطيها.",
    },
  ],
};

/*
  COMPLIANCE. Four plain denials about a registrant's details. Each is a
  statement of what the firm does NOT do and must stay categorical.
*/
export const investorAssuranceAr: Localised<typeof investorAssurance> = {
  label: "بياناتكم",
  heading: "ماذا نفعل بها",
  items: [
    "لا نبيع بياناتكم.",
    "لا نشاركها خارج ما تقتضيه إدارة القائمة.",
    "لا نرسل توصيات استثمارية.",
    "يمكنكم إلغاء الاشتراك من أي رسالة، ونحن ننفّذ ذلك.",
  ],
};

/*
  THE CATEGORY AND SECTOR LABELS ARE NOT HERE.

  They live in the chrome dictionary, as `forms.options.investorCategory` and
  `forms.options.investorSector`, keyed by the value each option submits. Two
  reasons, and both matter:

  - The registration form is a Client Component. Page content modules are read
    on the server by `pick` and never cross that boundary; the dictionary is
    the half of the system that does.
  - The same six categories are rendered twice on this page - once in the form,
    once in the "Who registers" list - and once more on Contact. One source
    means the three can never disagree.
*/

export const upcomingBriefingsContentAr: Localised<typeof upcomingBriefingsContent> = {
  label: "التقويم",
  heading: "الجلسات التعريفية القادمة",
  intro: "جلسات Gulf Connect التعريفية والجلسات المستضافة القادمة مع شركات عالمية.",
  cta: { label: "اطلب دعوة", href: "/contact?enquiry=investor" },
};

export const investorsReachAr: Localised<typeof investorsReach> = {
  label: "النطاق",
  heading: "من أين تأتي الشركات",
  paragraphs: [
    "الشركات التي تُنظَّم لها الجلسات التعريفية شركات عالمية — شركات مدرجة صغيرة ومتوسطة الحجم تعمل عبر قطاعات تشمل الطاقة والتعدين والمستحضرات الدوائية ومراكز البيانات، ويقع مقرها بعيدًا عن المنطقة.",
    "وجمعها في قاعة واحدة مع جمهور خليجي هو جوهر العمل كله. والتسجيل هو ما يضع المستثمر المهني على قائمة تلك الجلسات.",
  ],
};

/*
  COMPLIANCE. `note` states what this list IS: the options the form offers.
  It is not a claim about who has registered, and must not become one.
*/
export const whoRegistersContentAr: Localised<typeof whoRegistersContent> = {
  label: "من يسجّل",
  heading: "قائمة مهنية",
  note: "الفئات التي يطلب إليكم نموذج التسجيل الاختيار من بينها. التسجيل مجاني، والفئة التي تختارونها تحدّد ما يُرسَل إليكم.",
};

export const registerPanelContentAr: Localised<typeof registerPanelContent> = {
  label: "التسجيل",
  heading: "انضم إلى القائمة",
};

/* ---------------------------------------------------------------------------
   The deeper sections
   --------------------------------------------------------------------------- */

/**
 * COMPLIANCE. Each `focus` entry names SUBJECT MATTER, never a view on it.
 * "سلاسل التوريد" is a topic; a phrase about a company's advantage in its
 * supply chain would be an opinion, and the difference is the whole compliance
 * position of this section. `disclaimer` is standing text and is not a
 * footnote.
 */
/*
  QUALIFICATION, NOT A COUNT.

  The heading and intro used to count to three and to call the focus
  deliberately narrow ("والتركيز ضيّق عن قصد"). Both are gone, matching the
  English: the practice is cross-sector, and these four are where the coverage
  sits today rather than the boundary of it. The intro carries that
  qualification in Arabic too - dropping it there would leave the two editions
  saying different things about the same list.

  `key` values are identifiers and are repeated from the English verbatim.
*/
export const coverageAr: Localised<typeof coverage> = {
  label: "ما نغطيه",
  heading: "القطاعات التي نغطيها",
  intro:
    "تُنشر الجلسات التعريفية والمحتوى المكتوب عبر قطاعات متعددة، وتتركّز حاليًا على الطاقة والتعدين والمستحضرات الدوائية ومراكز البيانات. وينبغي للقارئ الذي يتابع أحدها أن يجد التغطية جديرة بوقته، لا أن يجد قليلًا من كل شيء — وتتّسع القائمة باتساع الأعمال التي تعمل معها الشركة.",
  sectors: [
    {
      key: "energy",
      name: "الطاقة",
      description:
        "الإنتاج والتوليد ومشاريع التحوّل التي تعيد تشكيلهما. تتابع التغطية تطوير المشاريع وتحديثات الشركات والبنية التحتية التي يعتمد عليها القطاع.",
      focus: ["الإنتاج والتوليد", "مشاريع التحوّل", "البنية التحتية للطاقة", "تطوير المشاريع"],
    },
    {
      key: "mining",
      name: "التعدين",
      description:
        "تطوير الموارد والمواد التي يقوم عليها تحوّل الطاقة والإمداد الصناعي. تتابع التغطية تطوير المشاريع وتحديثات الشركات وبنية سلاسل التوريد المعنية.",
      focus: ["تطوير الموارد", "المواد الاستراتيجية", "سلاسل التوريد", "تطوير المشاريع"],
    },
    {
      key: "pharmaceuticals",
      name: "المستحضرات الدوائية",
      description:
        "الابتكار في الرعاية الصحية، والتقنية الحيوية، والتقنية الطبية، مع اهتمام بالتطور المؤسسي وبطريقة تعامل شركات القطاع مع الأسواق الدولية.",
      focus: ["الابتكار في الرعاية الصحية", "التقنية الحيوية", "التقنية الطبية", "النشاط الدولي"],
    },
    {
      key: "data-centres",
      name: "مراكز البيانات",
      description:
        "الطبقة المادية تحت الذكاء الاصطناعي: مراكز البيانات، والقدرة الحوسبية، وما تعتمد عليه من طاقة واتصال، إلى جانب التطور المؤسسي للشركات التي تبنيها.",
      focus: ["مراكز البيانات", "القدرة الحوسبية", "متطلبات الطاقة", "البنية التحتية الرقمية"],
    },
  ],
  disclaimer:
    "المحتوى إعلامي ويُنشر لأغراض السياق. وهو ليس بحثًا استثماريًا ولا توصية ولا مشورة بشأن أي ورقة مالية.",
};

/**
 * COMPLIANCE. Step 05 is the load-bearing sentence in this file: registration
 * places a reader on the list and does not guarantee a place at any briefing.
 * "لا يضمن لكم مقعدًا في كل جلسة" is categorical and must stay that way.
 */
export const briefingProcessAr: Localised<typeof briefingProcess> = {
  label: "كيف تجري الجلسات التعريفية",
  heading: "من التسجيل إلى القاعة",
  steps: [
    {
      term: "الانضمام إلى قائمة الدعوات",
      description:
        "التسجيل مجاني ولا يستغرق سوى دقيقة. والفئة والقطاعات المختارة تحدّد ما يُرسَل إليكم.",
    },
    {
      term: "الإعلان عن الجلسات",
      description:
        "عند جدولة جلسة، يُبلَّغ بها المسجَّلون الذين تكون الشركة والقطاع والصيغة ذات صلة بهم.",
    },
    {
      term: "تختارون ما يهمّكم",
      description:
        "الدعوات ليست التزامات. يشير المسجَّل إلى الجلسات التي يودّ حضورها، ويتجاوز ما عداها.",
    },
    {
      term: "تُقدَّم المواد",
      description:
        "تُعمَّم مواد الشركة والمواد الخلفية قبل الجلسة، لتبدأ المناقشة من أرضية مشتركة لا من تعريف أوّلي.",
    },
    {
      term: "يُؤكَّد الحضور",
      description:
        "يظل الحضور خاضعًا لملاءمة الجلسة وللسعة المتاحة. التسجيل يضعكم على القائمة؛ ولا يضمن لكم مقعدًا في كل جلسة تعريفية.",
    },
  ],
};
