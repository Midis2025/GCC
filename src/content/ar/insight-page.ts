import type { Localised } from "@/content";
import type {
  bilingualIntent,
  editorialPrinciples,
  editorialThemes,
  fiveQuestionsDetail,
  fromTheRoomDetail,
  gulfBriefDetail,
  insightCta,
  insightPosition,
  insightSectors,
  insightSystem,
  menasDigitalNewsDetail,
  sectorNotesDetail,
} from "@/data/insight-page";

/**
 * ============================================================================
 * INSIGHT, THE PAGE - ARABIC
 * ============================================================================
 * Mirrors `data/insight-page.ts`.
 *
 * `key`, `number` and `href` are identifiers, ordinals and routes and are
 * repeated verbatim. The WhatsApp URL on `menasDigitalNewsDetail.cta` is an
 * external destination and is never translated; the format names follow
 * `content/ar/insight.ts`, which is where the decision behind them is
 * recorded.
 *
 * ----------------------------------------------------------------------------
 * COMPLIANCE - THE STANDING QUALIFIERS
 * ----------------------------------------------------------------------------
 * Each format carries one, and each survives in full. They are the sentences
 * that keep a library of market commentary on the right side of an
 * investment-research question, and none of them is a footnote:
 *
 *   menasDigitalNews.note  نشرة أخبار — وليست توصيات استثمارية.
 *   gulfBrief.note         تعليق فحسب — وليس توصيات استثمارية.
 *   fiveQuestions.note     صيغة مقابلة. وليست تحليلًا استثماريًا.
 *   sectorNotes.note       إحاطات إعلامية. وليست توصيات بشأن أوراق مالية.
 *   insightSectors.disclaimer / editorialThemes.note
 *
 * `editorialThemes` are SUBJECTS the library may examine. They are not
 * articles: they carry no date, no author and no link, and `note` says so.
 * Nothing in the Arabic may let them read as published work.
 *
 * ----------------------------------------------------------------------------
 * `bilingualIntent` - FLAGGED FOR CLIENT REVIEW
 * ----------------------------------------------------------------------------
 * The English says "No Arabic edition is published at present." That sentence
 * was written about the INSIGHT LIBRARY, and of the library it remains true:
 * no Arabic Insight item has been published. It now sits, however, on a page
 * that is itself being read in Arabic, which a reader may reasonably find
 * confusing.
 *
 * It is translated faithfully rather than quietly reworded, because rewriting
 * approved English is out of scope and because softening a factual statement
 * about what exists is the wrong direction to guess in. The client should
 * decide whether the English should now read "no Arabic Insight content is
 * published yet" - a copy change to `data/insight-page.ts` that this file
 * would then follow.
 */

export const insightPositionAr: Localised<typeof insightPosition> = {
  label: "الموقع",
  heading: "السياق قبل التعليق",
  paragraphs: [
    "صُمِّمت صيغ الرؤى لتوفير سياق حول أسواق المال الخليجية والقطاعات المشمولة بالتغطية والشركات العاملة فيها. والتركيز على المعلومات المنظَّمة والصيغ الدورية والمنظور السوقي المفيد، لا على التوصيات الاستثمارية أو الآراء المتعلقة بأوراق مالية بعينها.",
    "والغاية مساعدة الجمهور المهني على فهم الموضوعات والشركات والتطورات الإقليمية التي تُشكّل النقاش في أنحاء الخليج.",
  ],
};

/*
  COMPLIANCE. Each `covers` entry is SUBJECT MATTER, never a view on it, and
  `disclaimer` is standing text under the three panels.
*/
export const insightSectorsAr: Localised<typeof insightSectors> = {
  label: "المجال",
  heading: "ما نتابعه",
  intro:
    "ثلاثة قطاعات تُتابَع باستمرار لا تُغطّى بين حين وآخر. وينبغي للقارئ الذي يتابع أحدها أن يجد المادة جديرة بوقته.",
  sectors: [
    {
      key: "critical-minerals",
      number: "01",
      name: "المعادن الحيوية",
      covers: [
        "الموارد الاستراتيجية",
        "مشاريع التطوير",
        "سلاسل التوريد",
        "تحوّل الطاقة",
        "الشركات المدرجة دوليًا",
      ],
    },
    {
      key: "ai-data-infrastructure",
      number: "02",
      name: "الذكاء الاصطناعي والبنية التحتية للبيانات",
      covers: [
        "مراكز البيانات",
        "البنية التحتية الحوسبية",
        "متطلبات الطاقة",
        "البنية التحتية الرقمية",
        "تطبيقات الذكاء الاصطناعي",
      ],
    },
    {
      key: "life-sciences",
      number: "03",
      name: "علوم الحياة",
      covers: [
        "التقنية الحيوية",
        "الابتكار في الرعاية الصحية",
        "التقنية الطبية",
        "البحث العلمي",
        "التطور المؤسسي الدولي",
      ],
    },
  ],
  disclaimer:
    "التغطية سياقية. وهي ليست بحثًا استثماريًا ولا توصية ولا مشورة بشأن أي ورقة مالية.",
};

export const menasDigitalNewsDetailAr: Localised<typeof menasDigitalNewsDetail> = {
  subline:
    "نشرة أخبار رقمية يومية تغطي التطورات ذات الصلة في أسواق الخليج وفي القطاعات الأساسية لدى Gulf Connect.",
  paragraphs: [
    "أقصر الصيغ وأكثرها تواترًا: قراءة يومية لمن يتابعون المنطقة على نحو متصل لا كل ربع سنة.",
  ],
  coversLabel: "ما قد تتناوله",
  covers: [
    "تطورات الأسواق الخليجية",
    "المعادن الحيوية",
    "الذكاء الاصطناعي والبنية التحتية للبيانات",
    "علوم الحياة",
    "أخبار الأعمال الإقليمية",
    "الشركات العالمية في النقاش الخليجي",
  ],
  /* COMPLIANCE. Standing qualifier. */
  note: "نشرة أخبار — وليست توصيات استثمارية.",
  cta: {
    label: "انضم إلى أخبار MENA الرقمية",
    href: "https://chat.whatsapp.com/Im5OKXVMWDjAeFaO0xiDTG",
    note: "تُوزَّع النشرة عبر واتساب. ويفتح الرابط خارج هذا الموقع.",
  },
};

export const gulfBriefDetailAr: Localised<typeof gulfBriefDetail> = {
  subline: "سياق مكتوب كل أسبوعين عن أسواق المال الخليجية والقطاعات التي نتابعها.",
  paragraphs: [
    "قصير بما يكفي لقراءته بين اجتماعين، ومكتوب ليكون مفيدًا لمن يتابع المنطقة لا لمن يطالعها للمرة الأولى.",
  ],
  coversLabel: "ما قد يتناوله",
  covers: [
    "تطورات السوق الإقليمية",
    "أخبار القطاعات",
    "موضوعات التواصل المؤسسي",
    "سياق الأعمال الخليجي",
    "بنية السوق ذات الصلة",
    "الشركات العالمية الداخلة في النقاش الخليجي",
  ],
  /* COMPLIANCE. Standing qualifier. */
  note: "تعليق فحسب — وليس توصيات استثمارية.",
};

/*
  COMPLIANCE. These are SUBJECTS the library may examine, not articles. They
  carry no date, no author and no link, and `note` states that plainly.
*/
export const editorialThemesAr: Localised<typeof editorialThemes> = {
  label: "المجال",
  heading: "موضوعات قد نتناولها",
  note: "موضوعات تحريرية، وليست بحوثًا منشورة.",
  themes: [
    {
      number: "01",
      title: "كيف تقيّم المؤسسات الخليجية شركات النمو العالمية",
      tag: "بنية السوق",
    },
    {
      number: "02",
      title: "لماذا يهمّ التواصل باللغة العربية في الأسواق الإقليمية",
      tag: "التواصل",
    },
    {
      number: "03",
      title: "دور البنية التحتية في توسّع الذكاء الاصطناعي ومراكز البيانات",
      tag: "الذكاء الاصطناعي والبنية التحتية للبيانات",
    },
    {
      number: "04",
      title: "سلاسل توريد المعادن الحيوية والاستراتيجية الصناعية الخليجية",
      tag: "المعادن الحيوية",
    },
    {
      number: "05",
      title: "ما يسيء الفهم فيه المُصدِرون الدوليون كثيرًا بشأن التعامل مع السوق الخليجية",
      tag: "دخول السوق",
    },
    {
      number: "06",
      title: "كيف يعزّز الإعلام والاجتماعات والتواصل الرقمي بعضها بعضًا",
      tag: "التواصل",
    },
  ],
};

export const fiveQuestionsDetailAr: Localised<typeof fiveQuestionsDetail> = {
  subline: "صيغة مقابلة تنفيذية متسقة، مصمَّمة لتيسير متابعة قصص الشركات.",
  areas: [
    { number: "01", term: "الأعمال" },
    { number: "02", term: "الاستراتيجية" },
    { number: "03", term: "السوق" },
    { number: "04", term: "التنفيذ" },
    { number: "05", term: "ما يأتي بعد ذلك" },
  ],
  /* COMPLIANCE. A structure for a conversation, not analysis. */
  note: "صيغة مقابلة. وليست تحليلًا استثماريًا.",
  consistency: {
    heading: "الاتساق يُيسّر المقارنة",
    paragraphs: [
      "استخدام مجالات الأسئلة العامة نفسها عبر المقابلات يمنح المشاهدين بنية مألوفة.",
      "وتُبقي هذه الصيغة التركيز على الأعمال والاستراتيجية والتنفيذ والسياق، لا على اللغة الترويجية.",
    ],
  },
};

export const sectorNotesDetailAr: Localised<typeof sectorNotesDetail> = {
  subline: "إحاطات مكتوبة موسَّعة عن قطاعات ذات صلة بأسواق المال الخليجية.",
  examinesLabel: "ما قد تبحثه المذكرة",
  categoriesLabel: "أمثلة على فئات الموضوعات",
  examines: [
    "بنية السوق",
    "الصلة الإقليمية",
    "البنية التحتية",
    "سلاسل التوريد",
    "السياق التنظيمي حيثما كان مناسبًا",
    "الموضوعات المؤسسية",
    "تطور القطاع",
  ],
  /* Sample TOPIC CATEGORIES, not report titles. */
  categories: ["المعادن الحيوية", "البنية التحتية للذكاء الاصطناعي", "مراكز البيانات", "علوم الحياة"],
  note: "إحاطات إعلامية. وليست توصيات بشأن أوراق مالية.",
  gated: {
    heading: "بعض الإحاطات متاحة بالتسجيل",
    paragraph:
      "قد تتاح مواد مختارة موسَّعة للجمهور المهني المسجَّل. ويساعد التسجيل Gulf Connect على فهم الاهتمامات القطاعية وتوزيع المواد ذات الصلة على النحو المناسب.",
    cta: { label: "انضم إلى القائمة", href: "/for-investors#register" },
  },
};

/* COMPLIANCE: environment and discussion, never outcome. */
export const fromTheRoomDetailAr: Localised<typeof fromTheRoomDetail> = {
  subline: "أفلام قصيرة ومواد برامجية تُلتقط حول ارتباطات Gulf Connect.",
  showsLabel: "ما يمكن أن تُظهره",
  shows: [
    "بيئة البرنامج",
    "تواصل الإدارة",
    "موضوعات النقاش",
    "السياق الإقليمي",
    "أجواء الفعالية",
  ],
};

/*
  COMPLIANCE. "تمتدّ بالنقاش" and "توفّر استمرارية" describe what the content
  does. Nothing here says it produces coverage, interest, meetings or capital.

  `nodes[].href` are routes and `key` an identifier; both repeated verbatim.
  The four names match `nav.services` in the chrome dictionary, except
  "Media & Arabic", which is the shortened form this diagram uses and is
  shortened here too.
*/
export const insightSystemAr: Localised<typeof insightSystem> = {
  label: "المنظومة",
  heading: "الرؤى جزء من منظومة التواصل",
  paragraphs: [
    "تمتدّ الرؤى بالنقاش إلى ما وراء اجتماع واحد أو ظهور إعلامي واحد. فالصيغ الدورية توفّر استمرارية، وتمنح الجمهور سياقًا مفيدًا، وتُنتج مادة تواصل قابلة لإعادة الاستخدام حول القطاعات والشركات التي تعمل معها Gulf Connect.",
  ],
  nodes: [
    { key: "roadshows", term: "جولات المستثمرين", href: "/what-we-do/investor-roadshows" },
    { key: "programme", term: "برنامج الخليج", href: "/what-we-do/gulf-programme" },
    { key: "media", term: "الإعلام والعربية", href: "/what-we-do/media-arabic-communications" },
    { key: "briefings", term: "جلسات المستثمرين التعريفية", href: "/for-investors" },
  ],
};

/*
  FLAGGED FOR CLIENT REVIEW - see the note at the head of this file.

  `english` and `arabic` are the two language names as they appear beside each
  other on the page. They are names of languages in their own script and are
  identical in both editions, which is the whole point of the pair.
*/
export const bilingualIntentAr: Localised<typeof bilingualIntent> = {
  label: "اللغة",
  heading: "مبنيّ للتواصل بالإنجليزية والعربية",
  paragraph:
    "تدعم بنية الرؤى النشر باللغة الإنجليزية عند الإطلاق، والمحتوى باللغة العربية عند تقديم البرنامج العربي المعتمد.",
  english: "English",
  arabic: "العربية",
  note: "لا توجد نسخة عربية منشورة من الرؤى في الوقت الحالي.",
};

export const editorialPrinciplesAr: Localised<typeof editorialPrinciples> = {
  label: "المعايير",
  heading: "كيف نتعامل مع الرؤى",
  principles: [
    {
      number: "01",
      term: "محدَّد",
      description: "قطاعات وأسواق وموضوعات مسمّاة، لا تعليق عام.",
    },
    {
      number: "02",
      term: "منظَّم",
      description: "صيغ دورية ذات غرض واضح ووتيرة معلنة.",
    },
    {
      number: "03",
      term: "ذو صلة",
      description: "محتوى مصمَّم للجمهور المهني في الخليج.",
    },
    {
      number: "04",
      term: "ملتزم",
      description:
        "لا توصيات استثمارية، ولا تنبؤات بأسعار الأوراق المالية، ولا علاقات عملاء غير مُفصَح عنها.",
    },
  ],
};

export const insightCtaAr: Localised<typeof insightCta> = {
  label: "التسجيل",
  heading: "احصل على رؤى Gulf Connect",
  paragraph:
    "انضم إلى قائمة المستثمرين لتصلك الجلسات التعريفية ذات الصلة، والموجز الخليجي، ومذكرات قطاعية مختارة، ومقابلات خمسة أسئلة الجديدة.",
  primary: { label: "انضم إلى القائمة", href: "/for-investors#register" },
  secondary: { label: "للمستثمرين", href: "/for-investors" },
};
