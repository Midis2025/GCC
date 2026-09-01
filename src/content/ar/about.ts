import type { Localised } from "@/content";
import type {
  aboutClients,
  aboutCommercial,
  aboutCommunication,
  aboutHero,
  aboutHowWeWork,
  aboutPhilosophy,
  aboutPositioning,
  aboutPositioningQuote,
  aboutPrincipals,
  aboutPrinciplesContent,
  aboutPurpose,
  aboutPurposeCriteriaLabel,
  aboutRegion,
  aboutRiyadhContent,
  aboutTeamContent,
  aboutTransition,
} from "@/data/about";
import type { communicationEffects, workBehindTheRoom } from "@/data/about-depth";
import type { commercialModel } from "@/data/site";

/**
 * ============================================================================
 * ABOUT - ARABIC
 * ============================================================================
 * Mirrors `data/about.ts`, `data/about-depth.ts` and the `commercialModel`
 * block in `data/site.ts`.
 *
 * ----------------------------------------------------------------------------
 * PROPER NAMES ARE NOT TRANSLATED
 * ----------------------------------------------------------------------------
 * "Edward Karr" and "Peter Lee" are personal names and stay in Latin script.
 * Transliterating a person's name invents a spelling they do not use and that
 * appears on no document of theirs. Their LOCATIONS are place names and do
 * translate: Geneva -> جنيف, Dubai -> دبي.
 *
 * "Gulf Connect" is a registered name and stays in Latin inside Arabic
 * sentences. `key` values are identifiers and are repeated verbatim.
 *
 * ----------------------------------------------------------------------------
 * CONTENT INTEGRITY - THE LIMITS THE ENGLISH SETS
 * ----------------------------------------------------------------------------
 * This page makes no claim about size, history, headcount, offices, clients or
 * credentials, because none was supplied. The Arabic adds none:
 *
 * - `aboutPrincipals` carries only what the client supplied. No employers, no
 *   years of experience, no qualifications, no deal history. The register
 *   stays "two capable people", never a larger firm standing behind them.
 * - `aboutClients` says who the firm is SET UP to serve. It is not a client
 *   list and the Arabic must never read as one.
 * - `aboutRegion.disclaimer` and `aboutCommunication.disclaimer` are the same
 *   sentence, and it denies offices, registrations and investor relationships.
 *   Both are translated identically, from one string, for the same reason the
 *   English references rather than retypes it.
 * - `communicationEffects` describes what COMMUNICATION does, never what Gulf
 *   Connect achieves for a client. The Arabic verbs - يوضّح، يربط، يعزّز،
 *   يتراكم - are properties of the communication, not effects on a market.
 * - `commercialModel.exclusions` are the three compensation denials, at the
 *   same force as everywhere else on the site.
 */

export const aboutHeroAr: Localised<typeof aboutHero> = {
  eyebrow: "عن Gulf Connect",
  title: "مبنيّة حول الخليج. وموصولة برأس المال العالمي.",
  lead: "شركة تواصل مع المستثمرين مقرّها دبي، تعمل في دول مجلس التعاون الخليجي، وتُعرّف الشركات العالمية بالمستثمرين والشركاء والإعلام في الخليج.",
};

/*
  CONTENT INTEGRITY. Only what was supplied. Personal names stay in Latin.
*/
export const aboutPrincipalsAr: Localised<typeof aboutPrincipals> = {
  label: "الشركاء المؤسسون",
  heading: "شريكان مؤسسان",
  intro: "تُدار Gulf Connect بواسطة شريكين مؤسسين، يعملان بين جنيف ودبي.",
  people: [
    {
      name: "Edward Karr",
      location: "جنيف",
      bio: "مواطن سويسري ذو خلفية في أسواق المال والتمويل المؤسسي، وخبرة في بناء أعمال التواصل مع المستثمرين العابرة للحدود في أوروبا.",
    },
    {
      name: "Peter Lee",
      location: "دبي",
      bio: "مقيم في دبي، ذو خلفية تمتد عبر الخدمات المالية والتقنية وتطوير الأعمال الدولية، وخبرة تشغيلية في دخول السوق الإماراتية والترخيص فيها.",
    },
  ],
};

/*
  A statement about who the firm is SET UP to serve. Not a client list.
*/
export const aboutClientsAr: Localised<typeof aboutClients> = {
  label: "مع من نعمل",
  heading: "شركات عالمية مدرجة صغيرة ومتوسطة",
  paragraphs: [
    "تعمل Gulf Connect مع شركات عالمية مدرجة صغيرة ومتوسطة الحجم — وهي فئة الشركات التي لا يوجد لها طريق منظَّم إلى أسواق الخليج بغير ذلك.",
    "وثلاثة قطاعات، لأنها القطاعات التي ينظر إليها رأس المال الإقليمي فعليًا، والقطاعات التي يكون فيها إعداد الشركة نفسها أعمق ما يكون.",
  ],
  sectors: [
    {
      term: "المعادن الحيوية",
      description:
        "منتجون ومطوّرون تحتاج قاعدة أصولهم وترتيبات بيع إنتاجهم إلى شرح لجمهور يقرأ التعدين قراءة مختلفة.",
    },
    {
      term: "الذكاء الاصطناعي والبنية التحتية للبيانات",
      description:
        "أعمال الحوسبة والاتصال ومراكز البيانات التي يقوم عليها الاستثمار الرقمي الإقليمي.",
    },
    {
      term: "علوم الحياة",
      description:
        "شركات تُقيَّم بناءً على خط منتجاتها ومحطاتها لا على أرباحها الحالية.",
    },
  ],
};

export const aboutPositioningAr: Localised<typeof aboutPositioning> = {
  label: "الموقع",
  heading: "شركة تواصل مبنيّة لأسواق المال",
  paragraphs: [
    "تقدّم Gulf Connect المشورة للشركات في علاقات المستثمرين، واستهداف المستثمرين، والعلاقات الإعلامية، والاتصال الرقمي. وينتظم العمل حول سؤال واحد: هل يفهم السوق هذه الشركة على النحو الذي تقصده قيادتها؟",
    "ونادرًا ما تكون الإجابة عن هذا السؤال ترويجية محضة. فهي تُحسم بجودة الأطروحة الاستثمارية للشركة، واتساق إفصاحها، ومدى صلة الجهات التي تخاطبها بها.",
  ],
};

export const aboutPositioningQuoteAr: Localised<typeof aboutPositioningQuote> = {
  ghost: "الوضوح",
  quote: "الوضوح موقف تجاري.",
};

export const aboutPurposeAr: Localised<typeof aboutPurpose> = {
  label: "الغاية",
  heading: "الوضوح موقف تجاري",
  paragraphs: [
    "رأس المال لا تعوزه الخيارات. والشركات التي تتنافس على اهتمام المؤسسات تُقاس بمدى وضوح شرحها للاستراتيجية والمخاطر والطريق إلى القيمة، وبما إذا كان ذلك الشرح ثابتًا عبر فترات إفصاح متعاقبة.",
    "ونحن نتعامل مع التواصل بوصفه جزءًا من طريقة تقييم الشركة، لا نشاطًا يقف إلى جانبها. والغاية شركة مفهومة جيدًا لدى من يؤثّر حكمهم فيها.",
  ],
  criteria: ["الاستراتيجية", "المخاطر", "الطريق إلى القيمة", "الاتساق"],
};

export const aboutPurposeCriteriaLabelAr: Localised<typeof aboutPurposeCriteriaLabel> =
  "ما يزنه السوق";

/*
  CONTENT INTEGRITY. `disclaimer` denies offices, registrations and investor
  relationships. It sits under a map of six located markets and is not a
  footnote. `aboutCommunicationAr` reuses this same string, exactly as the
  English module references rather than retypes it.
*/
export const aboutRegionAr: Localised<typeof aboutRegion> = {
  label: "الفهم الإقليمي",
  heading: "أسواق تكافئ الدقة",
  paragraphs: [
    "لأسواق المال الخليجية إيقاعاتها في الإفصاح، وتوقعاتها التنظيمية، وقواعد مستثمريها، وأعرافها اللغوية. وتقيّم المؤسسات الإقليمية والمكاتب العائلية ورؤوس الأموال المرتبطة بالصناديق السيادية الفرصَ كلٌّ على نحوه، بينما يقارب المستثمرون الدوليون المنطقة من إطارهم المرجعي الخاص.",
    "والعمل عبر الإمارات والسعودية وقطر والكويت والبحرين وعُمان يعني إدراك هذه الفوارق عمليًا، لا التعامل مع المنطقة بوصفها جمهورًا واحدًا.",
  ],
  disclaimer:
    "التوجّه السوقي معروض للاسترشاد فحسب. ولا يمثّل مكاتب أو تسجيلات أو علاقات مع مستثمرين في أي ولاية قضائية.",
};

export const aboutTransitionAr: Localised<typeof aboutTransition> = {
  statement: "فهم إقليمي. ومنظور استثماري عالمي.",
};

export const aboutPhilosophyAr: Localised<typeof aboutPhilosophy> = {
  label: "عمليًا",
  statement: "أقوى تواصل مع السوق هو الواضح والمتسق والمفهوم لدى كل جمهور.",
};

export const aboutHowWeWorkAr: Localised<typeof aboutHowWeWork> = {
  label: "كيف نعمل",
  heading: "ارتباطات مبنيّة لتصمد مع الوقت",
  intro:
    "يُحدَّد نطاق كل ارتباط بحسب مرحلة الشركة وسوقها وأهدافها. وعمليًا، يأخذ معظم عملنا أحد الأشكال التالية.",
  modes: [
    {
      term: "استشارات مستمرة",
      description:
        "برنامج متواصل لعلاقات المستثمرين أو التواصل يُنفَّذ على مدى سنة الإفصاح، بمواد وتقويم ووتيرة محدَّدة.",
    },
    {
      term: "تصميم البرامج",
      description:
        "إرساء الأطروحة الاستثمارية والموقع وبنية التواصل التي ستُشغّلها الشركة بنفسها.",
    },
    {
      term: "تكليفات محدَّدة",
      description:
        "عمل موجَّه حول متطلب بعينه، كبرنامج تواصل، أو دورة نتائج، أو مراجعة للسردية.",
    },
    {
      term: "دعم الفرق",
      description:
        "العمل إلى جانب فرق علاقات المستثمرين والمالية والتواصل القائمة، لإضافة طاقة عمل ومنظور خارجي.",
    },
  ],
};

export const aboutCommunicationAr: Localised<typeof aboutCommunication> = {
  label: "المنهج",
  heading: "سردية واحدة، تُروى باتساق",
  paragraphs: [
    "كثيرًا ما تُدار علاقات المستثمرين والإعلام والاتصال الرقمي بوصفها أنشطة منفصلة، وهو ما ينتهي بالشركات إلى وصف نفسها وصفًا مختلفًا باختلاف الجمهور.",
    "ونحن نعمل من سردية مؤسسية واحدة، ونُكيّف تعبيرها لا جوهرها. فما يقرأه المستثمر في عرض النتائج، وما يسمعه الصحفي في إحاطة، وما يراه صاحب المصلحة على قنوات الشركة نفسها، ينبغي أن يكون هو الحكاية نفسها عن الشركة بصورة يمكن التعرّف عليها.",
  ],
  selectorLabel: "الأسواق",
  /* The same sentence as `aboutRegionAr.disclaimer`, referenced not retyped. */
  disclaimer: aboutRegionAr.disclaimer,
  principles: [
    {
      term: "الدقة قبل التأكيد",
      description: "يُبنى الموقع على ما يمكن إسناده والإفصاح عنه.",
    },
    {
      term: "الإعداد جوهر لا إجراء",
      description: "يُعامَل الإعداد للاجتماعات ومتابعتها بوصفهما صلب العمل لا عملًا إداريًا.",
    },
    {
      term: "الصلة قبل الكم",
      description: "محادثات أقل وأدقّ مطابقةً، بدل التوزيع الواسع.",
    },
    {
      term: "الاستمرارية",
      description: "برامج مصمَّمة لتستمر إلى ما بعد إعلان واحد أو ربع سنة واحد.",
    },
  ],
};

/*
  COMPLIANCE. The three compensation denials, at the same force as the
  standing disclosure and the What We Do page. None may be softened.
*/
export const commercialModelAr: Localised<typeof commercialModel> = {
  basis: "أتعاب مهنية ثابتة مقابل نطاقات عمل محدَّدة.",
  exclusions: [
    "لا أتعاب مشروطة بالنجاح",
    "لا مقابل مرتبط برأس المال المُجمَّع",
    "لا مقابل مرتبط بسعر السهم أو بحجم التداول",
  ],
};

export const aboutCommercialAr: Localised<typeof aboutCommercial> = {
  label: "كيف نعمل",
  heading: "أتعاب ثابتة، ونطاق محدَّد، وتقارير مكتوبة",
  detail:
    "يُتفق على كل ارتباط مسبقًا مقابل ما سيُعدّ ويُنظَّم ويُنتَج ويُقدَّم عنه تقرير، ويُرفع عنه تقرير مكتوب أثناء سريانه.",
  exclusionsLabel: "ما لا نتقاضى مقابله أتعابًا",
};

/*
  CONTENT INTEGRITY. A city name over a photograph of that city asserts
  nothing about presence. The line restates that the six markets are read
  separately, and must not acquire anything that reads as a footprint.
*/
export const aboutRiyadhContentAr: Localised<typeof aboutRiyadhContent> = {
  eyebrow: "الرياض",
  statement: "ستة أسواق، تُقرأ كلٌّ على حدة.",
};

export const aboutPrinciplesContentAr: Localised<typeof aboutPrinciplesContent> = {
  label: "المبادئ",
  heading: "ما يضبط العمل",
};

export const aboutTeamContentAr: Localised<typeof aboutTeamContent> = {
  label: "الفريق",
  heading: "من يقفون وراء العمل",
};

/* ---------------------------------------------------------------------------
   The deeper sections
   --------------------------------------------------------------------------- */

/*
  COMPLIANCE. Each verb is a property of the COMMUNICATION, never an effect
  the firm produces in a market. "يوضّح ما هي الشركة" is a statement about
  clarity; a phrase about clarifying the market's view of a company would be a
  claim about third parties, and that difference is the whole section.
*/
export const communicationEffectsAr: Localised<typeof communicationEffects> = {
  label: "لماذا يهمّ",
  heading: "ما الذي يفعله التواصل الجيد",
  intro:
    "التواصل ليس زينة على الشركة؛ بل هو الطريقة التي يفهمها بها من لن يروا داخلها قط. وأربعة أمور تفصل التواصل المجدي عمّا يملأ الجدول فحسب.",
  effects: [
    {
      number: "01",
      term: "يوضّح",
      description:
        "ما هي الشركة، وماذا تفعل، وإلى أين تتجه — مصوغًا بالطريقة نفسها سواء كان أمام القارئ خمس دقائق أو بعد ظهيرة كاملة.",
    },
    {
      number: "02",
      term: "يربط",
      description:
        "الاستراتيجية المؤسسية بالجهات التي تكون ذات صلة فعلية بها، لا بمن يصادف أن يكون متاحًا.",
    },
    {
      number: "03",
      term: "يعزّز",
      description:
        "حكاية واحدة عن الشركة عبر الاجتماعات والإعلام وقنوات الشركة نفسها، فلا تتناقض الثلاث في صمت.",
    },
    {
      number: "04",
      term: "يتراكم",
      description:
        "الفهم بالتكرار. فالسوق الذي التقى شركةً أربع مرات يقرأ اللقاء الخامس قراءة مختلفة عن الأول.",
    },
  ],
};

/*
  COMPLIANCE. Every item names WORK PERFORMED. None is a result: the section
  argues about scope, not about outcome.
*/
export const workBehindTheRoomAr: Localised<typeof workBehindTheRoom> = {
  label: "العمل",
  heading: "الاجتماع هو الجزء الظاهر",
  intro:
    "يُذكَر الارتباط بوصفه مجموعة اجتماعات. لكن معظم ما يحدّد جدوى انعقادها يجري قبل أن يجلس أحد، ومعظم ما يجعلها مفيدة يجري بعد أن يغادر الجميع.",
  stages: [
    {
      key: "before",
      term: "قبل",
      items: ["البحث", "السردية", "المواد", "الإعداد"],
    },
    {
      key: "in-the-room",
      term: "داخل القاعة",
      items: ["نقاش منظَّم", "تواصل الإدارة", "أسئلة ذات صلة"],
    },
    {
      key: "after",
      term: "بعد",
      items: ["المتابعة", "التقارير المكتوبة", "المحتوى", "الصقل"],
    },
  ],
};
