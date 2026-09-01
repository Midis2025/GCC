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
 * "Gulf Connect" is the name in both editions, in Latin script. It appears
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
 * certify that. The edition is now published, so that review is outstanding
 * rather than pending. See `legalReviewRequired` in `content/dictionary.ts`.
 */
export const ui: Dictionary = {
  meta: {
    languageName: "العربية",
    switchLabel: "اللغة",
    switchTo: "عرض هذه الصفحة بالإنجليزية",
  },

  nav: {
    homeLink: "{wordmark} — الصفحة الرئيسية",
    primary: "التنقل الرئيسي",
    mobile: "تنقل الهاتف",
    siteMenu: "قائمة الموقع",
    menuHeading: "القائمة",
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
    exploreCapabilities: "استكشف قدراتنا",
  },

  footer: {
    groups: {
      whatWeDo: "خدماتنا",
      company: "الشركة",
      forInvestors: "للمستثمرين",
    },
    description: "خدمات التواصل مع المستثمرين والفعاليات والإعلام لأسواق المال الخليجية.",
    markets: "الأسواق",
    joinTheList: "انضم إلى القائمة",
    email: "البريد الإلكتروني",
    telephone: "الهاتف",
    office: "المكتب",
    international: "الأسواق الدولية",
    contact: "تواصل معنا",
    /*
      Display copy, and the flag is part of the string in both languages so
      the two editions show the same thing.

      The emoji is direction-neutral, so appending it puts it at the visual
      end of the line in each script - after "UAE" in English, to the LEFT of
      the Arabic in RTL. That is the correct place in both.

      Metadata, structured data, legal paragraphs and accessible names read
      `contactConfig.locality`, which carries no emoji.
    */
    locality: "دبي، الإمارات العربية المتحدة 🇦🇪",
    /*
      AWAITING LEGAL REVIEW.

      The four statements of the English are preserved in the same order and
      with the same force: the services and the fixed-fee basis; the denial
      that anything here is an offer, solicitation, recommendation or advice;
      the absence of a UAE financial-services licence together with the two
      things the firm does not do; and the disclosure of a commercial
      relationship where one exists.

      A third "does not do" clause was removed to match the English, on
      client instruction to take share-price and equity compensation language
      off the public site. The registered entity that opened the sentence was
      removed with it: no company has been incorporated under this name, so
      the brand name stands alone. Both cuts await the same legal review as
      the English.

      "غير مرخّصة لممارسة أنشطة الخدمات المالية في دولة الإمارات" is the
      load-bearing clause. It states the absence of a licence and must not be
      softened into a statement about what the firm chooses not to do.
    */
    disclosure:
      "تقدّم Gulf Connect خدمات التواصل مع المستثمرين وتنظيم الفعاليات والخدمات الإعلامية مقابل أتعاب مهنية ثابتة. ولا يشكّل أي محتوى في هذا الموقع عرضًا أو استقطابًا أو توصية أو مشورة استثمارية، ولا يجوز الاعتماد عليه في اتخاذ أي قرار استثماري. وGulf Connect غير مرخّصة لممارسة أنشطة الخدمات المالية في دولة الإمارات العربية المتحدة، ولا تستقطب استثمارات، ولا تحتفظ بأموال العملاء. وحيثما اتصل المحتوى بشركة تعاقدت مع Gulf Connect، يُفصح عن العلاقة التجارية ضمن ذلك المحتوى.",
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

  /*
    COMPLIANCE. The denial under every map. Both halves are load-bearing: what
    a line DOES mean, and the four things it does not. Neither may be dropped.
  */
  maps: {
    denial:
      "تمثّل الروابط المعروضة ترابطًا عابرًا للحدود بين الشركات والأسواق. ولا تمثّل مكاتب أو تسجيلات أو تراخيص أو علاقات في أي ولاية قضائية.",
  },

  forms: {
    optional: "اختياري",
    required: "(مطلوب)",
    submitting: "جارٍ الإرسال…",
    audience: {
      legend: "من مقدّم الاستفسار",
      company: "أمثّل شركة",
      investor: "أنا مستثمر",
    },
    /*
      OPTION LABELS ONLY.

      Every key below is a backend identifier submitted to `/api/submit` and
      stored in the CRM - `family-office`, `ae`, `09:00 AM` - and none of them
      is translated. A registration made on this edition writes exactly the
      record an English one writes; only what the registrant reads changes.

      The four service-line names match `nav.services` so the header, the
      footer and this select all name the same thing the same way.

      Times keep their Western numerals and are given the Arabic forms of
      morning and afternoon. The KEY remains the English string, so the
      notification email and the stored record are unchanged.
    */
    options: {
      areaOfInterest: {
        "investor-roadshows": "جولات المستثمرين",
        "gulf-programme": "برنامج الخليج",
        "media-arabic-communications": "الإعلام والتواصل باللغة العربية",
        advisory: "الاستشارات",
        general: "استفسار عام",
      },
      market: {
        ae: "الإمارات العربية المتحدة",
        sa: "المملكة العربية السعودية",
        qa: "قطر",
        kw: "الكويت",
        bh: "البحرين",
        om: "عُمان",
        intl: "سوق دولية أخرى",
      },
      /*
        COMPLIANCE. "غير ذلك" is a neutral "other", not a decline. Registrants
        who select it receive general content only, and the label must not
        imply that they have withheld an answer.
      */
      investorCategory: {
        institution: "مؤسسة استثمارية",
        "asset-manager": "شركة إدارة أصول",
        "family-office": "مكتب عائلي",
        "private-bank-broker": "بنك خاص أو وسيط",
        "qualified-private-investor": "مستثمر خاص مؤهَّل",
        other: "غير ذلك",
      },
      investorSector: {
        Energy: "الطاقة",
        Mining: "التعدين",
        Pharmaceuticals: "المستحضرات الدوائية",
        "Data centres": "مراكز البيانات",
      },
      preferredTime: {
        "09:00 AM": "09:00 صباحًا",
        "10:00 AM": "10:00 صباحًا",
        "11:00 AM": "11:00 صباحًا",
        "12:00 PM": "12:00 ظهرًا",
        "01:00 PM": "01:00 مساءً",
        "02:00 PM": "02:00 مساءً",
        "03:00 PM": "03:00 مساءً",
        "04:00 PM": "04:00 مساءً",
        "05:00 PM": "05:00 مساءً",
      },
    },
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
        "أوافق على أن تتواصل معي Gulf Connect بشأن هذا الاستفسار.",
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
        "أوافق على أن تتواصل معي Gulf Connect عبر البريد الإلكتروني بدعوات الجلسات التعريفية والمواد التحريرية، وأدرك أن بإمكاني إلغاء الاشتراك في أي وقت.",
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

  sections: {
    ourCapabilities: "قدراتنا",
    questionBehindTheWork: "السؤال الذي يقوم عليه العمل",
    whereAppetiteSits: "أين يتركّز الإقبال",
    gulfMarketCoverage: "التغطية في أسواق الخليج",
  },

  insight: {
    by: "بقلم",
    disclosure: "إفصاح",
    clientDisclosure:
      "{company} عميل لدى Gulf Connect، وقد سدّد إليها أتعابًا مهنية ثابتة مقابل خدمات التواصل.",
    thisCompany: "هذه الشركة",
    allInsights: "جميع الرؤى",
  },
};
