import type { Localised } from "@/content";
import type { capabilities } from "@/data/capabilities";

/**
 * CAPABILITIES - ARABIC.
 *
 * Mirrors `data/capabilities.ts`. `slug` and `href` are identifiers and routes
 * and stay in Latin; `number` stays in Western numerals.
 *
 * TERMINOLOGY. The four capability names use the terms Gulf financial
 * institutions and regional business media actually use, not literal calques:
 *
 *   Investor Relations            -> علاقات المستثمرين   (the standard term)
 *   Investor Targeting & Outreach -> استهداف المستثمرين والتواصل مع الأسواق
 *   Media Relations               -> العلاقات الإعلامية
 *   Digital Communications        -> الاتصال الرقمي
 *
 * "الإفصاح" is the regulatory term for disclosure and is used consistently,
 * because in this context it carries a specific meaning that a general word
 * for "announcement" would lose.
 *
 * COMPLIANCE: every `summary` and `description` describes WORK PERFORMED. The
 * English is careful never to promise coverage, interest or capital, and the
 * Arabic keeps that discipline - "ندعم"، "نعمل مع"، "نبني" describe activity,
 * not outcomes.
 */
export const capabilitiesAr: Localised<typeof capabilities> = [
  {
    title: "علاقات المستثمرين",
    slug: "investor-relations",
    href: "/what-we-do/gulf-programme",
    summary:
      "برامج لعلاقات المستثمرين تقوم على سردية استثمارية محدَّدة، وإفصاح متسق، وحوار مطّلع مع السوق.",
    description:
      "نعمل مع فرق الإدارة على ترسيخ الصورة التي يفهم بها المستثمرون الشركة، بدءًا من الأطروحة الاستثمارية ذاتها ووصولًا إلى الرزنامة والمواد والانضباط الذي يبقيها متسقة على امتداد السنة المالية.",
    areas: [
      "استراتيجية علاقات المستثمرين وتطوير البرامج",
      "السردية الاستثمارية والتموضع",
      "التواصل مع المستثمرين",
      "العروض المؤسسية",
      "التواصل بشأن النتائج والأرباح",
      "الإعداد للقاءات المستثمرين",
      "التواصل مع المساهمين",
      "إدراك السوق وصياغة الرسائل",
    ],
  },
  {
    title: "استهداف المستثمرين والتواصل مع الأسواق",
    slug: "investor-outreach",
    href: "/what-we-do/investor-roadshows",
    summary:
      "تحديد المستثمرين الذين يتوافق تفويضهم ونطاقهم الجغرافي وملفهم الاستثماري مع أهداف الشركة، والتواصل معهم.",
    description:
      "يبدأ التواصل بالبحث. نرسم خريطة أوساط المستثمرين المتصلة بقطاع الشركة وحجمها واستراتيجيتها، ثم نبني برنامج تواصل حول الجهات التي تستحق محادثة فعلية.",
    areas: [
      "استهداف المستثمرين المؤسسيين",
      "التواصل مع المكاتب العائلية",
      "رسم خريطة المستثمرين الإقليميين",
      "التواصل مع المستثمرين عبر الحدود",
      "التعريف بالمستثمرين",
      "برامج لقاءات المستثمرين",
      "الجولات التعريفية غير المرتبطة بصفقات",
      "استهداف المؤتمرات",
      "معلومات عن المستثمرين",
      "الإعداد قبل اللقاءات",
      "ملاحظات ما بعد اللقاءات",
    ],
  },
  {
    title: "العلاقات الإعلامية",
    slug: "media-relations",
    href: "/what-we-do/media-arabic-communications",
    summary:
      "تواصل مع الإعلام المؤسسي والاقتصادي يدعم الطريقة التي يقرأ بها السوق الشركة.",
    description:
      "يُعامَل العمل الإعلامي بوصفه امتدادًا للسردية المؤسسية لا نشاطًا منفصلًا، ويُنظر إليه من زاوية ما يحتاج السوق إلى فهمه، ومتى.",
    areas: [
      "تطوير السردية المؤسسية",
      "التواصل مع الإعلام الاقتصادي",
      "التعريف بالقيادات التنفيذية",
      "محتوى الريادة الفكرية",
      "استراتيجية الإعلانات",
      "الإعداد الإعلامي",
      "تموضع السمعة",
    ],
  },
  {
    title: "الاتصال الرقمي",
    slug: "digital-communications",
    href: "/what-we-do/media-arabic-communications",
    summary:
      "تواصل رقمي موجَّه إلى المستثمرين يحافظ على اتساق السردية المؤسسية عبر القنوات المملوكة والعامة.",
    description:
      "تُشكّل القنوات الرقمية الصورة التي يكوّنها المستثمرون والصحفيون عن الشركة. ونحن نوائمها مع المعايير ذاتها المطبَّقة على الإفصاح ومواد علاقات المستثمرين.",
    areas: [
      "التواصل الرقمي مع المستثمرين",
      "استراتيجية التواصل المؤسسي الاجتماعي",
      "التموضع الرقمي للقيادات التنفيذية",
      "محتوى موجَّه إلى المستثمرين",
      "الحملات الرقمية",
      "السمعة المؤسسية على الإنترنت",
      "تعزيز انتشار الإعلانات",
      "الموقع الإلكتروني والتواصل الرقمي لعلاقات المستثمرين",
    ],
  },
];
