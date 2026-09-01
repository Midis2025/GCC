import type { Localised } from "@/content";
import type {
  confirmContent,
  notFoundContent,
  unsubscribeContent,
} from "@/data/utility-pages";

/**
 * ============================================================================
 * UTILITY PAGES - ARABIC
 * ============================================================================
 * Mirrors `data/utility-pages.ts`.
 *
 * "OPTIN_SECRET" is an environment variable name and stays in Latin script in
 * both editions: a translated variable name is a variable nobody can set.
 * "Gulf Connect" is a registered name and does the same. The series names -
 * الموجز الخليجي، المذكرات القطاعية - follow `content/ar/insight.ts`.
 *
 * ----------------------------------------------------------------------------
 * CONTENT INTEGRITY
 * ----------------------------------------------------------------------------
 * The two failure branches are the point of these pages and the Arabic keeps
 * them at full strength:
 *
 * - `confirmContent.notRecorded` says the link was valid but the registration
 *   was NOT recorded, and asks the reader to make contact rather than assume
 *   they are on the list. It must never read as a confirmation.
 * - `unsubscribeContent.notRecorded` says the suppression was NOT recorded.
 *   Telling someone they have been removed from a list that still holds their
 *   address would be the worse failure of the two, and the English says so;
 *   the Arabic says the same.
 *
 * `unsubscribeContent.failed.lead` keeps its most important clause: a working
 * link is not required in order to be unsubscribed.
 */

export const notFoundContentAr: Localised<typeof notFoundContent> = {
  eyebrow: "404",
  title: "تعذّر العثور على هذه الصفحة.",
  lead: "قد تكون الصفحة التي تبحثون عنها قد نُقلت، أو قد يكون العنوان غير صحيح.",
  home: "العودة إلى الرئيسية",
  contact: "تواصل مع Gulf Connect",
  goTo: "انتقل إلى",
};

export const confirmContentAr: Localised<typeof confirmContent> = {
  eyebrow: "التسجيل",
  actionInvestors: "للمستثمرين",
  actionContact: "تواصل مع Gulf Connect",
  statusLabel: "الحالة",

  failed: {
    title: "تعذّر تأكيد هذا الرابط.",
    expired:
      "روابط التأكيد صالحة لأربعة عشر يومًا. وقد تجاوز هذا الرابط تلك المدة، لذا يُرجى التسجيل من جديد والتأكيد من الرسالة الجديدة.",
    unconfigured:
      "لم يُربط نظام التأكيد بعد في هذا الإصدار، ولذلك لا يمكن التحقق من هذا الرابط.",
    unconfiguredNote:
      "ملاحظة للمراجعة: يجب ضبط OPTIN_SECRET في بيئة النشر. وما لم يُضبط، لا يمكن توقيع أي رابط تأكيد أو التحقق منه.",
    invalid:
      "قد يكون الرابط قد تغيّر أو اقتُطع في برنامج البريد لديكم. يُرجى محاولة فتحه مرة أخرى من الرسالة الأصلية، أو التسجيل من جديد.",
  },

  confirmed: {
    title: "تم تأكيد تسجيلكم.",
    lead: "شكرًا لكم. ستصلكم دعوات إلى الجلسات التعريفية التي تكون اهتماماتكم القطاعية ذات صلة بها، والموجز الخليجي، والمذكرات القطاعية الربع سنوية، والوصول إلى مكتبة المقابلات. ويمكنكم إلغاء الاشتراك من أي رسالة نرسلها.",
  },

  /*
    CONTENT INTEGRITY. This is a FAILURE state. It must not read as a
    confirmation in any edition.
  */
  notRecorded: {
    title: "تعذّر إتمام تأكيدكم.",
    lead: "رابطكم صالح، غير أن نظام التسجيل لم يسجّل التأكيد. يُرجى التواصل معنا لإتمامه يدويًا بدلًا من افتراض أنكم مُدرَجون في القائمة.",
    note: "ملاحظة للمراجعة: {reason}",
    fallbackReason: "لم يسجّل نظام إدارة العلاقات التأكيد.",
  },
};

export const unsubscribeContentAr: Localised<typeof unsubscribeContent> = {
  eyebrow: "البريد الإلكتروني",
  actionContact: "تواصل مع Gulf Connect",
  actionPrivacy: "سياسة الخصوصية",
  statusLabel: "الحالة",

  failed: {
    title: "تعذّر تنفيذ رابط إلغاء الاشتراك هذا.",
    lead: "قد يكون الرابط قد تغيّر أو اقتُطع في برنامج البريد لديكم. يُرجى التواصل معنا وسنزيلكم من القائمة يدويًا — ولا تحتاجون إلى رابط صالح كي يُلغى اشتراككم.",
    unconfiguredNote:
      "ملاحظة للمراجعة: يجب ضبط OPTIN_SECRET في بيئة النشر. وما لم يُضبط، لا يمكن توقيع أي رابط لإلغاء الاشتراك أو التحقق منه.",
  },

  done: {
    title: "تم إلغاء اشتراككم.",
    lead: "حُجب عنوانكم بصفة دائمة. ولن تصلكم أي دعوات إلى جلسات تعريفية أو محتوى مكتوب من Gulf Connect بعد الآن.",
  },

  /*
    CONTENT INTEGRITY. A FAILURE state, and the more damaging of the two to get
    wrong. It says the suppression was not recorded and must stay that way.
  */
  notRecorded: {
    title: "تعذّر تسجيل إلغاء اشتراككم.",
    lead: "يُرجى التواصل معنا لتنفيذه يدويًا. فنحن نُفضّل أن تعلموا ذلك صراحةً على أن يُقال لكم إنكم أُزلتم من قائمة ما زالت تحتفظ بعنوانكم.",
    note: "ملاحظة للمراجعة: {reason}",
    fallbackReason: "لم يسجّل نظام إدارة العلاقات الحجب.",
  },
};
