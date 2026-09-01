import type { Localised } from "@/content";
import type { contactContent } from "@/data/contact";

/**
 * ============================================================================
 * CONTACT - ARABIC
 * ============================================================================
 * Mirrors `contactContent` in `data/contact.ts`.
 *
 * ----------------------------------------------------------------------------
 * WHAT IS NOT HERE
 * ----------------------------------------------------------------------------
 * The three option lists on this page - area of interest, market and preferred
 * time - are NOT in this file. Their labels live in the chrome dictionary as
 * `forms.options`, keyed by the value each option submits, because the two
 * forms that render them are Client Components and because the same five
 * areas appear both as tags in the left rail and as a select in the form.
 *
 * That split is what keeps the CRM stable: `investor-roadshows`, `ae` and
 * `09:00 AM` are submitted identically from both editions, and only the label
 * changes. See the note at the head of `content/dictionary.ts`.
 *
 * The form copy itself - every field label, placeholder, help line, consent
 * statement, validation message and success state - is likewise in the
 * dictionary, under `forms.company` and `forms.investor`.
 *
 * ----------------------------------------------------------------------------
 * CONTENT INTEGRITY
 * ----------------------------------------------------------------------------
 * `pendingDetails` says that a direct address and number will be published
 * once confirmed. It must not become a claim that either exists: no email
 * address and no telephone number has been supplied by the client, and none
 * may be invented in either language.
 *
 * `lead` describes the kind of company the page is for. It promises no
 * response time, no meeting and no outcome, and the Arabic adds none.
 */
export const contactContentAr: Localised<typeof contactContent> = {
  eyebrow: "تواصل معنا",
  formLabel: "استفسار",
  title: "ابدأ محادثة",
  lead: "للشركات التي تدرس برنامجًا لعلاقات المستثمرين، أو تكليفًا بالتواصل مع السوق، أو مراجعةً للطريقة التي يفهمها بها السوق حاليًا.",
  introHeading: "قبل أن تكتب",
  introParagraphs: [
    "يفيدنا أن نعرف من أين تبدأ الشركة: هل هي مدرجة، أم تستعد للإدراج، أم مملوكة ملكية خاصة، وأي الأسواق أكثر أهمية لها، وما الذي دعا إلى الاستفسار.",
    "تُراجَع الاستفسارات مباشرةً. وإذا كان الطلب خارج نطاق ما نقوم به، فسنقول ذلك بدل عقد اجتماع لذاته.",
  ],
  introTitle: "أخبرنا أين تقف الشركة اليوم.",
  pendingDetails: {
    label: "البريد الإلكتروني والهاتف",
    body: "يُرجى استخدام نموذج الاستفسار. وسيُنشر هنا عنوان ورقم مباشران بمجرد تأكيدهما.",
  },
  areasHeading: "مجالات الاهتمام",
};
