import type { Localised } from "@/content";
import type {
  continuity,
  gulfDifference,
  marketContexts,
  openingQuestions,
} from "@/data/home-depth";

/**
 * HOME, THE DEEPER SECTIONS - ARABIC.
 *
 * Mirrors `data/home-depth.ts`. Same rules as `ar/home.ts`: `key` values are
 * identifiers and stay in Latin, numerals stay Western, and no claim about an
 * outcome is introduced that the English does not make.
 *
 * COMPLIANCE, and it governs two passages here:
 *
 *   `continuity` compares two SHAPES OF WORK. Neither column is presented as
 *   better, neither carries a tick or a score, and the Arabic must not acquire
 *   a comparative that the English avoids.
 *
 *   `marketContexts.disclaimer` denies offices, registrations, licences and
 *   relationships. Three cities named under a firm's logo is the easiest thing
 *   on this site to misread as a footprint, and the denial is what prevents
 *   that. It is translated in full, not summarised.
 */

export const gulfDifferenceAr: Localised<typeof gulfDifference> = {
  label: "السياق الإقليمي",
  heading: "أسواق الخليج ليست امتدادًا للندن أو نيويورك",
  paragraphs: [
    "كثيرًا ما تصل الشركات العالمية إلى الخليج بمنهج لعلاقات المستثمرين وُضِع لمركز مالي آخر، لتجد أن ما ينتقل معها هو المواد لا المنهج. والصعوبة ليست في الترجمة.",
    "فقاعدة المستثمرين هنا مبنية على نحو مختلف. إذ تنظر المؤسسات ورؤوس الأموال المرتبطة بالجهات السيادية والمكاتب العائلية والبنوك الخاصة إلى الفرصة، كلٌّ من زاويته، ونادرًا ما يكون الطريق إلى محادثة مع أحدها هو الطريق إلى محادثة مع غيره.",
    "والعلاقات تسير بإيقاع مختلف. فالزيارة الواحدة تُعرِّف بالشركة، لكنها لا تُرسّخ حضورها. إذ يميل المشاركون في المنطقة إلى تقييم النشاط عبر تواصل متكرر، وهو ما يجعل الفترات الفاصلة بين الأنشطة لا تقل أهمية عن الأنشطة نفسها.",
    "أما المنظومة الإعلامية فبيئة قائمة بذاتها، تعمل بالإنجليزية والعربية، ولها أولوياتها التحريرية وتصوّرها الخاص عن السياق الإقليمي الذي تحتاجه القصة قبل أن تستحق النشر.",
  ],
  closing:
    "تبني Gulf Connect برامجها على الطريقة التي تعمل بها المنطقة فعليًا، لا باستيراد قالب جاهز وانتظار أن ينجح.",
};

export const openingQuestionsAr: Localised<typeof openingQuestions> = {
  label: "من أين يبدأ العمل",
  heading: "قبل التواصل يأتي الفهم",
  intro:
    "تبدأ أقوى برامج التواصل بوضوح تام بشأن النشاط نفسه. ويُوضَع إطار التواصل قبل اتخاذ أي قرار بشأن اللقاءات أو الإعلام أو المحتوى.",
  questions: [
    {
      question: "ما الذي تحتاج الشركة أن يفهمه السوق؟",
      note: "ليس ما تودّ أن يُقال عنها، بل الأمر المحدّد الذي ينبغي أن يكون القارئ أو المحلل أو الصحفي قادرًا على ذكره بدقة بعد أي تعامل مع الشركة.",
    },
    {
      question: "أي الجهات تتصل فعليًا بهذا الهدف؟",
      note: "تُحدَّد الصلة بالتفويض والنطاق الجغرافي والقطاع، لا باتساع الانتشار. والغاية من العمل هي عدد أقل من المحادثات المناسبة.",
    },
    {
      question: "ما الأدلة التي تسند هذه القصة؟",
      note: "كل ما يُذكر في قصة الشركة يجب أن يكون قابلًا للإسناد إلى أمر مُفصَح عنه. وحيثما تعذّر ذلك، تُراجَع القصة بدل التوسّع في الأدلة.",
    },
  ],
};

export const continuityAr: Localised<typeof continuity> = {
  label: "الاستمرارية",
  heading: "الحضور في السوق يُبنى بالاستمرارية",
  intro:
    "الزيارة الواحدة والبرنامج المستمر عملان مختلفان، لا عمل واحد بحجمين. فالتواصل المنضبط والمتكرر يمنح السوق سياقًا أوسع لقراءة الشركة مما يتيحه ظهور واحد.",
  columns: [
    {
      key: "visit",
      label: "زيارة واحدة",
      term: "لحظة محدَّدة",
      description:
        "برنامج لقاءات يُعَدّ ويُعقَد ويُرفَع عنه تقرير خلال مدة قصيرة. يُعرِّف بالشركة إلى مجموعة من المشاركين المعنيين، ويترك سجلًا لما جرى بحثه.",
      items: ["إحاطة عن السوق", "لقاءات مختارة", "الإعداد الإعلامي", "متابعة مكتوبة"],
    },
    {
      key: "programme",
      label: "برنامج مستمر",
      term: "موقع قائم",
      description:
        "الانضباط ذاته ممتدًّا على أشهر لا أيام، بحيث تكون الشركة حاضرة بين الزيارات كما هي حاضرة خلالها، ويبني كل نشاط على ما كشفه سابقه.",
      items: [
        "لقاءات مستمرة مع المستثمرين",
        "إيقاع منتظم للمحتوى",
        "دورات العرض على وسائل الإعلام",
        "التوزيع باللغة العربية",
        "تقارير مكتوبة",
        "قراءة ملاحظات السوق",
      ],
    },
  ],
};

export const marketContextsAr: Localised<typeof marketContexts> = {
  label: "أين تُنفَّذ البرامج",
  heading: "ثلاثة أسواق. سياقات مختلفة.",
  intro:
    "تُبنى البرامج في دبي وأبوظبي، وفي الرياض حيثما كان قطاع الشركة ذا صلة. والأسواق الثلاثة ليست بديلًا بعضها عن بعض، والبرنامج الذي يعاملها كجمهور واحد برنامج لم يبدأ على وجهه الصحيح.",
  cities: [
    {
      key: "dubai",
      city: "دبي",
      country: "الإمارات العربية المتحدة",
      description:
        "الأعمال الدولية والخدمات المالية ورؤوس الأموال الخاصة، والمقارّ الإقليمية للشركات العاملة في عموم الخليج.",
    },
    {
      key: "abu-dhabi",
      city: "أبوظبي",
      country: "الإمارات العربية المتحدة",
      description:
        "رأس المال المؤسسي ومنظومة مرتبطة بالجهات السيادية، مع تركّز في الطاقة والبنية التحتية والصناعات الاستراتيجية.",
    },
    {
      key: "riyadh",
      city: "الرياض",
      country: "المملكة العربية السعودية",
      description:
        "أسواق مال في طور النمو مع مشاركة مؤسسية متنامية، إلى جانب الشركات والنشاط الاستثماري الإقليمي.",
    },
  ],
  disclaimer:
    "سياق الأسواق معروض للاسترشاد فحسب، ولا يمثّل مكاتب أو تسجيلات أو تراخيص أو علاقات في أي ولاية قضائية.",
};
