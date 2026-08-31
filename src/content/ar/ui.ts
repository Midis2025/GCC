import type { Dictionary } from "@/content/dictionary";

/**
 * ARABIC CHROME.
 *
 * Modern Standard Arabic in the formal institutional register: the language of
 * a bank's investor communications or a regulator's circular, not
 * conversational Arabic and not a literal word-for-word rendering of the
 * English.
 *
 * ---------------------------------------------------------------------------
 * TERMS DELIBERATELY LEFT IN LATIN SCRIPT
 * ---------------------------------------------------------------------------
 * "Gulf Connect Consultancy FZCO" is a registered legal name. It appears
 * unchanged inside Arabic sentences, which is standard practice in Gulf
 * corporate Arabic and the only correct treatment: a translated entity name is
 * an entity that appears on no licence and in no register.
 *
 * The placeholder "e.g. LSE, ASX, TSX-V" keeps its exchange codes for the same
 * reason - they are identifiers, not words.
 *
 * Western numerals throughout, matching the English site and Gulf corporate
 * convention.
 *
 * ---------------------------------------------------------------------------
 * AWAITING LEGAL REVIEW
 * ---------------------------------------------------------------------------
 * `consentLabel`, `consentNote` and `clientDisclosure` are compliance
 * statements. The Arabic below preserves the meaning of the approved English
 * clause for clause, but it has not been read by a translator qualified to
 * certify that - which is why `NEXT_PUBLIC_AR_ENABLED` is off. See
 * `legalReviewRequired` in `content/dictionary.ts`.
 */
export const ui: Dictionary = {
  meta: {
    languageName: "العربية",
    switchLabel: "اللغة",
    switchTo: "عرض هذه الصفحة بالإنجليزية",
  },

  nav: {
    primary: "التنقل الرئيسي",
    mobile: "تنقل الهاتف",
    siteMenu: "قائمة الموقع",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    skipToContent: "تخطٍ إلى المحتوى الرئيسي",
    items: {
      whatWeDo: "خدماتنا",
      forInvestors: "للمستثمرين",
      insight: "رؤى",
      about: "من نحن",
      contact: "تواصل معنا",
    },
    services: {
      investorRoadshows: "جولات المستثمرين",
      gulfProgramme: "برنامج الخليج",
      mediaArabic: "الإعلام والتواصل باللغة العربية",
      advisory: "الاستشارات",
    },
    cta: "قدّم استفسارًا",
    secondaryCta: "انضم إلى القائمة",
  },

  footer: {
    groups: {
      whatWeDo: "خدماتنا",
      company: "الشركة",
      forInvestors: "للمستثمرين",
    },
    joinTheList: "انضم إلى القائمة",
    email: "البريد الإلكتروني",
    telephone: "الهاتف",
    office: "المكتب",
    international: "الأسواق الدولية",
    contact: "تواصل معنا",
    /*
      AWAITING LEGAL REVIEW.

      The four statements of the English are preserved in the same order and
      with the same force: the services and the fixed-fee basis; the denial
      that anything here is an offer, solicitation, recommendation or advice;
      the absence of a UAE financial-services licence together with the three
      things the firm does not do; and the disclosure of a commercial
      relationship where one exists.

      "غير مرخّصة لممارسة أنشطة الخدمات المالية في دولة الإمارات" is the
      load-bearing clause. It states the absence of a licence and must not be
      softened into a statement about what the firm chooses not to do.
    */
    disclosure:
      "تقدّم شركة Gulf Connect Consultancy FZCO خدمات التواصل مع المستثمرين وتنظيم الفعاليات والخدمات الإعلامية مقابل أتعاب مهنية ثابتة. ولا يشكّل أي محتوى في هذا الموقع عرضًا أو استقطابًا أو توصية أو مشورة استثمارية، ولا يجوز الاعتماد عليه في اتخاذ أي قرار استثماري. وشركة Gulf Connect غير مرخّصة لممارسة أنشطة الخدمات المالية في دولة الإمارات العربية المتحدة، ولا تستقطب استثمارات، ولا تحتفظ بأموال العملاء، ولا تتقاضى أي مقابل مرتبط برأس المال المُجمَّع أو بسعر السهم أو بحجم التداول. وحيثما اتصل المحتوى بشركة تعاقدت مع Gulf Connect، يُفصح عن العلاقة التجارية ضمن ذلك المحتوى.",
    legal: {
      privacy: "سياسة الخصوصية",
      disclaimer: "إخلاء المسؤولية",
      terms: "شروط الاستخدام",
      cookies: "إشعار ملفات تعريف الارتباط",
    },
    rights: "جميع الحقوق محفوظة.",
  },

  cookies: {
    heading: "ملفات تعريف الارتباط",
    body: "نستخدم عددًا محدودًا من ملفات تعريف الارتباط الضرورية لعمل هذا الموقع. ونودّ كذلك قياس طريقة استخدام الموقع، ولكن بموافقتك وحدها. تظل أدوات التحليل معطّلة ما لم توافق عليها.",
    noticeLink: "إشعار ملفات تعريف الارتباط",
    accept: "أوافق",
    reject: "رفض غير الضروري",
  },

  forms: {
    optional: "اختياري",
    required: "(مطلوب)",
    submitting: "جارٍ الإرسال…",
    company: {
      badge: "استفسار من شركة",
      companyName: "اسم الشركة",
      listingVenue: "سوق الإدراج",
      listingVenuePlaceholder: "مثال: LSE، ASX، TSX-V",
      ticker: "رمز التداول",
      sector: "القطاع",
      yourName: "الاسم الكامل",
      role: "المنصب",
      workEmail: "البريد الإلكتروني المهني",
      phone: "الهاتف",
      country: "الدولة",
      areaOfInterest: "مجال الاهتمام",
      areaPlaceholder: "اختر المجال…",
      preferredDate: "التاريخ المفضل",
      preferredTime: "الوقت المفضل",
      timePlaceholder: "اختر الوقت…",
      timezone: "بتوقيت الخليج القياسي",
      enquiry: "الاستفسار",
      enquiryHelp: "نبذة موجزة عن وضع الشركة وما تتطلعون إليه.",
      consentLabel:
        "أوافق على أن تتواصل معي شركة Gulf Connect Consultancy FZCO بشأن هذا الاستفسار.",
      submit: "إرسال الاستفسار",
      successHeading: "شكرًا لاستفساركم.",
      successBody: "تلقّينا بياناتكم، وسيطّلع أحد أعضاء الفريق على استفساركم.",
      notStored:
        "ملاحظة للمراجعة: لم يتم ربط نظام إدارة العلاقات بعد، ولذلك لم يُحفظ هذا الاستفسار. وُجدت هذه الحالة لإتاحة تقييم المسار كاملًا.",
      sendAnother: "إرسال استفسار آخر",
    },
    investor: {
      badge: "تسجيل المستثمرين",
      fullName: "الاسم الكامل",
      firm: "المؤسسة",
      role: "المنصب",
      workEmail: "البريد الإلكتروني المهني",
      country: "الدولة",
      category: "فئة المستثمر",
      categoryHelp: "الجلسات التعريفية موجَّهة إلى الجهات المؤسسية والمهنية.",
      categoryPlaceholder: "اختر الفئة",
      sectorsLegend: "القطاعات محل الاهتمام",
      sectorsHelp: "اختياري. نستعين بذلك لإرسال الدعوات ذات الصلة بكم دون سواها.",
      consentLabel:
        "أوافق على أن تتواصل معي شركة Gulf Connect Consultancy FZCO عبر البريد الإلكتروني بدعوات الجلسات التعريفية والمواد التحريرية، وأدرك أن بإمكاني إلغاء الاشتراك في أي وقت.",
      consentNote:
        "سنرسل إليكم رسالة تأكيد. ويكتمل تسجيلكم بمجرد تأكيده من خلال تلك الرسالة.",
      submit: "تسجيل",
      almostThere: "بقيت خطوة واحدة.",
      received: "تم استلام التسجيل.",
      pendingBody:
        "أرسلنا إليكم رسالة بريد إلكتروني. يُرجى تأكيد عنوانكم من خلالها ليكتمل تسجيلكم. ولن تُدرجوا في القائمة قبل ذلك.",
      confirmedBody: "شكرًا لكم. تلقّينا بياناتكم.",
      notStored:
        "ملاحظة للمراجعة: لم يتم ربط نظام إدارة العلاقات بعد، ولذلك لم يُحفظ هذا التسجيل. وُجدت هذه الحالة لإتاحة تقييم المسار كاملًا. يجب إعداد النظام قبل استخدام الموقع مع مسجِّلين فعليين.",
      registerAnother: "تسجيل شخص آخر",
    },
    errors: {
      companyName: "يُرجى إدخال اسم الشركة.",
      sector: "يُرجى تحديد القطاع الذي تعملون فيه.",
      name: "يُرجى إدخال الاسم الكامل.",
      firm: "يُرجى إدخال اسم المؤسسة.",
      role: "يُرجى إدخال المنصب.",
      email: "يُرجى إدخال البريد الإلكتروني المهني.",
      emailInvalid: "يُرجى إدخال بريد إلكتروني صحيح.",
      country: "يُرجى إدخال الدولة.",
      investorCategory: "يُرجى اختيار فئة المستثمر.",
      areaOfInterest: "يُرجى اختيار مجال الاهتمام.",
      preferredDate: "يُرجى اختيار التاريخ المفضل.",
      preferredDatePast: "يُرجى اختيار تاريخ لم يمضِ بعد.",
      preferredTime: "يُرجى اختيار الوقت المفضل.",
      message: "يُرجى بيان ما تتطلعون إليه بإيجاز.",
      messageShort: "يُرجى إضافة مزيد من التفاصيل.",
      consent: "يُرجى تأكيد موافقتكم على التواصل معكم.",
      generic: "حدث خطأ ما. يُرجى المحاولة مرة أخرى.",
      unreachable: "تعذّر الوصول إلى الخادم. يُرجى المحاولة مرة أخرى.",
    },
  },

  insight: {
    by: "بقلم",
    disclosure: "إفصاح",
    clientDisclosure:
      "{company} عميل لدى شركة Gulf Connect Consultancy FZCO، وقد سدّد إليها أتعابًا مهنية ثابتة مقابل خدمات التواصل.",
    allInsights: "جميع الرؤى",
  },
};
