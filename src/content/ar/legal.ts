import type { Localised } from "@/content";
import type {
  cookieNotice,
  disclaimer,
  legalPageChrome,
  pendingCounselNotice,
  privacyPolicy,
  termsOfUse,
} from "@/data/legal";

/**
 * ============================================================================
 * LEGAL PAGES - ARABIC
 * ============================================================================
 * Mirrors `data/legal.ts`, page for page and section for section.
 *
 * ----------------------------------------------------------------------------
 * WHAT THESE PAGES ARE
 * ----------------------------------------------------------------------------
 * READ THIS BEFORE TREATING ANYTHING BELOW AS A LEGAL TRANSLATION.
 *
 * The English pages are STRUCTURE, not counsel-approved wording. Each one
 * states at the top that the document is being prepared with legal counsel
 * alongside the regulatory opinion, and each section says what the finished
 * document WILL COVER rather than stating the clause itself. See the header of
 * `data/legal.ts` for why that decision was taken.
 *
 * The Arabic therefore translates a description of a document, not a document.
 * Every section survives:
 *
 *   Privacy Policy  10 sections   ->  10 sections, same order
 *   Disclaimer       8 sections   ->   8 sections, same order
 *   Terms of Use     7 sections   ->   7 sections, same order
 *   Cookie Notice    4 sections   ->   4 sections, same order
 *
 * Nothing is summarised, merged, reordered or dropped, and no clause is added.
 *
 * ----------------------------------------------------------------------------
 * AWAITING LEGAL REVIEW - ALL FOUR PAGES
 * ----------------------------------------------------------------------------
 * When counsel supplies the finished English wording, the Arabic of these four
 * documents must be produced or certified by a legal translator, not carried
 * over from here. A description of a clause and the clause itself are not the
 * same object, and the second is the one a reader may rely on.
 *
 * Until then these pages say, in Arabic exactly as in English, that nothing on
 * them is final and nothing on them should be relied upon. That statement -
 * `pendingCounselNotice.body` - is the most important sentence on all four
 * pages and is translated in full.
 *
 * ----------------------------------------------------------------------------
 * TERMINOLOGY
 * ----------------------------------------------------------------------------
 *   controller (data protection)   -> المتحكّم في البيانات
 *   processor                      -> المعالِج
 *   lawful basis                   -> الأساس القانوني
 *   consent                        -> الموافقة
 *   retention                      -> الاحتفاظ
 *   double opt-in                  -> التأكيد المزدوج للاشتراك
 *   unsubscribe / suppression      -> إلغاء الاشتراك / الحجب
 *   solicit investment             -> استقطاب الاستثمار
 *   forward-looking statements     -> البيانات التطلعية
 *   limitation of liability        -> حدود المسؤولية
 *   governing law and jurisdiction -> القانون الحاكم والاختصاص القضائي
 *   strictly necessary cookies     -> ملفات تعريف الارتباط الضرورية للغاية
 *
 * "Gulf Connect Consultancy FZCO" is a registered legal name and is never
 * translated. `slug` and `eyebrow` follow the site's own conventions: the slug
 * is a route, and the eyebrow is translated.
 */

export const pendingCounselNoticeAr: Localised<typeof pendingCounselNotice> = {
  label: "الحالة",
  heading: "بانتظار الصياغة النهائية المعتمدة من المستشار القانوني",
  body: "تعرض هذه الصفحة هيكل وثيقة يجري إعدادها بالتعاون مع مستشار قانوني إلى جانب الرأي التنظيمي. وتصف الأقسام أدناه ما ستغطيه الوثيقة النهائية. ولا شيء في هذه الصفحة نهائي، ولا يجوز الاعتماد على أي مما فيها.",
};

export const legalPageChromeAr: Localised<typeof legalPageChrome> = {
  contentsHeading: "ما ستغطيه هذه الوثيقة",
  publishedBy:
    "تُنشر هذه الصفحة بواسطة {entity}. وستحلّ الصياغة النهائية محلّ الهيكل الوارد أعلاه بمجرد اعتمادها.",
};

export const privacyPolicyAr: Localised<typeof privacyPolicy> = {
  slug: "privacy",
  title: "سياسة الخصوصية",
  eyebrow: "قانوني",
  lead: "كيف تجمع شركة Gulf Connect Consultancy FZCO المعلومات الشخصية المقدَّمة عبر هذا الموقع وتستخدمها وتخزّنها وتحميها.",
  sections: [
    {
      heading: "من نحن وكيفية التواصل معنا",
      scope:
        "هوية المتحكّم في البيانات، والكيان المسجَّل، وعنوان الاستفسارات والطلبات المتعلقة بالخصوصية.",
    },
    {
      heading: "ما الذي نجمعه",
      scope:
        "الحقول التي يلتقطها نموذج استفسار الشركات ونموذج تسجيل المستثمرين، وما يُجمع تلقائيًا، وما لا يُجمع إطلاقًا.",
    },
    {
      heading: "لماذا نجمعه، وعلى أي أساس",
      scope:
        "الغرض من كل فئة من فئات المعالجة والأساس القانوني المعتمد عليه فيها، بما في ذلك الموافقة على الرسائل التسويقية والسجل المحفوظ لوقت منحها وكيفيته.",
    },
    {
      heading: "قائمة المستثمرين ودعوات الجلسات التعريفية",
      scope:
        "كيفية استخدام فئة المستثمر المسجَّلة عند التسجيل، وما يعنيه التأكيد المزدوج للاشتراك عمليًا، وكيفية توجيه الدعوات.",
    },
    {
      heading: "مع من نشاركه",
      scope:
        "المعالِجون المستخدَمون لتشغيل الموقع ونظام إدارة العلاقات والبريد الصادر، والموقف من عمليات النقل الدولية للبيانات.",
    },
    {
      heading: "مدة احتفاظنا به",
      scope: "مدد الاحتفاظ بحسب الفئة، وما يحدث للسجل بعد إلغاء الاشتراك.",
    },
    {
      heading: "حقوقكم",
      scope:
        "الوصول والتصحيح والحذف والاعتراض وسحب الموافقة، وكيفية تقديم كل طلب منها ومعالجته.",
    },
    {
      heading: "إلغاء الاشتراك",
      scope:
        "إلغاء الاشتراك بنقرة واحدة في كل رسالة تسويقية، والمدة التي يُنفَّذ خلالها، والحجب الدائم بعد ذلك.",
    },
    {
      heading: "الأمن",
      scope: "التدابير المطبَّقة على البيانات الشخصية المخزَّنة وعلى الأنظمة التي تحتفظ بها.",
    },
    {
      heading: "التعديلات على هذه السياسة",
      scope: "كيفية الإخطار بالتعديلات وأين تتوافر النسخ السابقة.",
    },
  ],
};

/*
  COMPLIANCE. Sections 02 to 05 of this page are the same four statements the
  standing disclosure makes, and they carry the same force here: nothing is an
  offer or a recommendation; the firm is not licensed for financial services
  activity in the UAE; it takes no compensation linked to capital, share price
  or trading volume; and a client relationship is disclosed on the content it
  concerns. None may be softened.
*/
export const disclaimerAr: Localised<typeof disclaimer> = {
  slug: "disclaimer",
  title: "إخلاء المسؤولية",
  eyebrow: "قانوني",
  lead: "الأساس الذي تُنشر عليه المعلومات في هذا الموقع، وحدود ما هي عليه.",
  sections: [
    {
      heading: "طبيعة المعلومات",
      scope:
        "أن المواد الواردة في هذا الموقع معلومات عامة عن خدمات شركة Gulf Connect Consultancy FZCO وتعليق على القطاعات والأسواق، وأنها ليست موجَّهة إلى ظروف أي شخص بعينه.",
    },
    {
      heading: "ليست عرضًا ولا توصية",
      scope:
        "أن لا شيء في هذا الموقع يشكّل عرضًا أو استقطابًا أو توصية أو مشورة استثمارية، وأنه لا يجوز الاعتماد عليه في اتخاذ أي قرار استثماري.",
    },
    {
      heading: "الوضع التنظيمي",
      scope:
        "أن شركة Gulf Connect غير مرخّصة لممارسة أنشطة الخدمات المالية في دولة الإمارات العربية المتحدة، ولا تستقطب استثمارات، ولا تحتفظ بأموال العملاء.",
    },
    {
      heading: "المقابل المالي",
      scope:
        "أن شركة Gulf Connect تتقاضى أتعابًا مهنية ثابتة مقابل نطاقات عمل محدَّدة، ولا تتقاضى أي مقابل مرتبط برأس المال المُجمَّع أو بسعر السهم أو بحجم التداول.",
    },
    {
      heading: "علاقات العملاء والإفصاح عنها",
      scope:
        "أنه حيثما اتصل المحتوى بشركة تعاقدت مع Gulf Connect، يُفصح عن العلاقة التجارية ضمن ذلك المحتوى.",
    },
    {
      heading: "محتوى الأطراف الأخرى والروابط",
      scope: "الموقف من المواد التي ينشرها الغير ومن الروابط التي تغادر هذا الموقع.",
    },
    {
      heading: "البيانات التطلعية",
      scope:
        "معالجة أي بيان يتعلق بالمستقبل تدلي به شركة يرد ذكرها في محتوى منشور هنا.",
    },
    {
      heading: "حدود المسؤولية",
      scope: "حدود المسؤولية الناشئة عن استخدام هذا الموقع.",
    },
  ],
};

export const termsOfUseAr: Localised<typeof termsOfUse> = {
  slug: "terms",
  title: "شروط الاستخدام",
  eyebrow: "قانوني",
  lead: "الشروط التي يجوز بموجبها استخدام هذا الموقع.",
  sections: [
    {
      heading: "القبول",
      scope: "أن استخدام الموقع يشكّل قبولًا لهذه الشروط.",
    },
    {
      heading: "الاستخدام المسموح به",
      scope: "ما يجوز للزائرين فعله بمواد الموقع، وما لا يجوز لهم.",
    },
    {
      heading: "الملكية الفكرية",
      scope:
        "ملكية المحتوى والعلامات والمواد المنشورة هنا، بما في ذلك المحتوى المُنتَج للعملاء.",
    },
    {
      heading: "التسجيل والحسابات",
      scope:
        "الشروط السارية على تسجيل المستثمرين، بما في ذلك دقة البيانات المقدَّمة والأساس الذي يُمنح بموجبه الوصول إلى المحتوى المقيَّد.",
    },
    {
      heading: "التوافر",
      scope: "أن الموقع يُقدَّم كما هو، دون التزام بالتوافر المستمر.",
    },
    {
      heading: "القانون الحاكم والاختصاص القضائي",
      scope: "القانون الذي يحكم هذه الشروط والجهة المختصة بنظر أي نزاع.",
    },
    {
      heading: "التعديلات على هذه الشروط",
      scope: "كيفية سريان التعديلات.",
    },
  ],
};

export const cookieNoticeAr: Localised<typeof cookieNotice> = {
  slug: "cookies",
  title: "إشعار ملفات تعريف الارتباط",
  eyebrow: "قانوني",
  lead: "ما الذي يخزّنه هذا الموقع على جهازكم، وكيف تتحكمون فيه.",
  sections: [
    {
      heading: "ملفات تعريف الارتباط الضرورية للغاية",
      scope:
        "العدد المحدود من العناصر اللازمة لعمل الموقع، بما في ذلك سجل تفضيلكم الخاص بملفات تعريف الارتباط. وتُضبط هذه دون موافقة لأن الموقع لا يعمل بدونها.",
    },
    {
      heading: "أدوات التحليل",
      scope:
        "ما الذي سيُقاس، ومن يقيسه، وإلى متى. وتظل أدوات التحليل معطّلة حتى تُمنح الموافقة، ولا يُحمَّل أي شيء متعلق بها قبل ذلك.",
    },
    {
      heading: "كيفية تغيير اختياركم",
      scope:
        "كيفية القبول أو الرفض أو إعادة النظر في القرار في أي وقت، وما يحدث للبيانات التي جُمعت بالفعل.",
    },
    {
      heading: "ملفات تعريف الارتباط التي يضبطها الغير",
      scope: "الموقف من المحتوى المضمَّن وما قد يضبطه.",
    },
  ],
};
