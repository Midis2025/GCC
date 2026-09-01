import type { Localised } from "@/content";
import type { advisoryAreas, mediaStrategy, roadshowPhases } from "@/data/services-depth";

/**
 * ============================================================================
 * SERVICE PAGES, THE DEEPER SECTIONS - ARABIC
 * ============================================================================
 * Mirrors `data/services-depth.ts`.
 *
 * `key` and `number` are identifiers and Western numerals and are repeated
 * verbatim; a translated `key` would break the React key and the anchor it
 * belongs to.
 *
 * ----------------------------------------------------------------------------
 * COMPLIANCE
 * ----------------------------------------------------------------------------
 * Every phrase below describes WORK PERFORMED. The English is careful never to
 * say that an investor invests, an editor publishes or a company benefits, and
 * the Arabic keeps that discipline throughout: the verbs are يُعدّ، يُنظَّم،
 * يُنتَج، يُقدَّم عنه تقرير - never verbs of result.
 *
 * `advisoryAreas.regional-listing` is the highest-risk entry on the Advisory
 * page. Its final qualifier - "وليست مشورة بشأن جدوى الإدراج أو بشأن أي ورقة
 * مالية" - is not optional and is not a bullet like the others: it is the
 * boundary of the work. It must not be dropped, softened or moved.
 *
 * `mediaStrategy.statement` says what the work is AIMED at, not what it
 * achieves. "أن يُفهَم" is deliberately not "سنجعل السوق يفهمكم"; the honest
 * line on the same page says who decides the outcome.
 */

export const roadshowPhasesAr: Localised<typeof roadshowPhases> = {
  label: "شكل البرنامج",
  heading: "قبل، وأثناء، وبعد",
  intro:
    "الجولة ليست اليومين اللذين تقضيهما في القاعة. فمعظم العمل يقع على جانبيهما، والبرنامج الذي يتخطّاه يصل غير مستعد ويغادر بلا سجل.",
  phases: [
    {
      key: "before",
      number: "01",
      term: "قبل",
      summary: "الإعداد، والقرارات التي تجعل الاجتماعات جديرة بالانعقاد.",
      items: [
        "مراجعة السردية المؤسسية",
        "إعداد مواد الاجتماعات",
        "تحديد جمهور المستثمرين",
        "إحاطة الإدارة",
        "الجدولة والتأكيدات",
      ],
    },
    {
      key: "during",
      number: "02",
      term: "أثناء",
      summary: "البرنامج نفسه، منسَّقًا يومًا بيوم لا متروكًا لجدول مواعيد.",
      items: [
        "اجتماعات ثنائية",
        "جلسة جماعية مستضافة",
        "تنسيق يومي",
        "نشاط إعلامي مختار حيثما كان مشمولًا",
      ],
    },
    {
      key: "after",
      number: "03",
      term: "بعد",
      summary: "السجل. ما سُئل، وما قيل، وما ينبغي للشركة أن تفعله به.",
      items: [
        "ملخّص مكتوب للاجتماعات",
        "إجراءات المتابعة",
        "ملاحظات على التواصل",
        "متابعة على مدى ستين يومًا حيثما كانت مشمولة",
      ],
    },
  ],
};

export const mediaStrategyAr: Localised<typeof mediaStrategy> = {
  statement: "أن تكون مرئيًا وأن تكون مفهومًا ليسا المسألة نفسها.",
  paragraphs: [
    "الظهور مسألة حضور. أما الفهم فمسألة ما يستطيع القارئ أن يقوله بدقّة عن الشركة بعد ذلك، والثاني لا يترتب تلقائيًا على الأول.",
    "والشركة التي تظهر كثيرًا وتُقرأ على أنحاء متضاربة لديها مشكلة تواصل لن يحلّها مزيد من الظهور. يبدأ العمل ممّا ينبغي أن يكون السوق قادرًا على قوله، ويتعامل مع النشر بوصفه وسيلة لا غاية.",
  ],
};

export const advisoryAreasAr: Localised<typeof advisoryAreas> = {
  label: "بالتفصيل",
  heading: "ما تُنتجه الاستشارات فعليًا",
  intro:
    "العمل الاستشاري عمل مكتوب. وينتهي كل مجال أدناه إلى وثيقة يستطيع فريق الإدارة قراءتها وتعميمها والعمل بها، لا إلى محادثة يتعيّن تذكّرها.",
  involvesLabel: "ما ينطوي عليه",
  areas: [
    {
      key: "market-entry",
      number: "01",
      term: "إحاطات دخول السوق",
      addresses:
        "شركة تدرس الخليج دون صورة واضحة عن اختلاف هذه السوق هيكليًا عن سوقها الأصلية.",
      involves: [
        "كيف تُدار الأعمال إقليميًا",
        "من الجهات المعنية، ولماذا",
        "ما تتوقعه الأطراف الإقليمية",
        "أين يقع قطاع الشركة حاليًا من الاهتمام الإقليمي",
      ],
    },
    {
      key: "regional-listing",
      number: "02",
      term: "تقييم الإدراج الإقليمي",
      addresses:
        "كيف سيُقرأ هيكل الشركة وقطاعها وإفصاحها قياسًا على أعراف الإدراج الإقليمية.",
      involves: [
        "ممارسة الإفصاح قياسًا على العرف الإقليمي",
        "انعكاسات الإدراج الإقليمي على التواصل",
        "الأسئلة التي ينبغي للشركة أن تتوقعها",
        "وليست مشورة بشأن جدوى الإدراج أو بشأن أي ورقة مالية",
      ],
    },
    {
      key: "conference-strategy",
      number: "03",
      term: "استراتيجية المؤتمرات",
      addresses:
        "وقت الإدارة المُنفَق في فعاليات تُختار بحسب سمعتها لا بحسب صلتها بهدف محدَّد.",
      involves: [
        "أي الفعاليات تناسب قطاعًا ومرحلة بعينهما",
        "أي هدف ينبغي أن يخدمه الحضور",
        "من ينبغي التواصل معه حوله",
        "أي تواصل ينبغي أن يحيط بالحضور",
      ],
    },
    {
      key: "executive-preparation",
      number: "04",
      term: "إعداد القيادة التنفيذية",
      addresses:
        "قيادة تعرض الشركة نفسها بصور مختلفة في الاجتماع وفي المقابلة وعلى المنصة.",
      involves: [
        "تطوير الرسائل والتدرّب عليها",
        "الأسئلة المتوقعة والمواضع الصعبة",
        "الاتساق عبر الاجتماعات والإعلام والفعاليات",
        "الجاهزية للبث حيثما كان ذلك ذا صلة",
      ],
    },
    {
      key: "communication-considerations",
      number: "05",
      term: "اعتبارات التواصل الإقليمي",
      addresses:
        "إفصاح ولغة ووتيرة تنجح في السوق الأصلية ولا تنتقل كما هي.",
      involves: [
        "كيف تختلف ممارسة الإفصاح إقليميًا",
        "أين تغيّر العربية المتطلَّب تغييرًا جوهريًا",
        "وتيرة التواصل عبر السنة الإقليمية",
        "ما الذي ينبغي تغييره لتُقرأ الشركة على نحو متسق",
      ],
    },
  ],
};
