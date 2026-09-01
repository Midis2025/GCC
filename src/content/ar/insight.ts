import type { Localised } from "@/content";
import type { insightContent, insightFormats } from "@/data/insight";

/**
 * ============================================================================
 * INSIGHT - THE TAXONOMY, IN ARABIC
 * ============================================================================
 * Mirrors `data/insight.ts`.
 *
 * ----------------------------------------------------------------------------
 * INTERNAL IDS ARE NEVER TRANSLATED
 * ----------------------------------------------------------------------------
 * `id` is the taxonomy key. It is the anchor a format section is reached by
 * (`/insight#five-questions`), the value an item is classified with, and the
 * argument `getFormat` is called with. All five are repeated character for
 * character:
 *
 *   menas-digital-news   five-questions   from-the-room
 *   gulf-brief           sector-notes
 *
 * `medium` is likewise an identifier - "written" or "video" - and selects
 * nothing a reader sees.
 *
 * ----------------------------------------------------------------------------
 * THE FIVE FORMAT NAMES - FOR CLIENT CONFIRMATION
 * ----------------------------------------------------------------------------
 * These are the firm's own recurring series, so they are named in the language
 * of the edition rather than left in Latin script inside Arabic headings:
 *
 *   MENA's Digital News  ->  أخبار MENA الرقمية
 *   The Gulf Brief       ->  الموجز الخليجي
 *   Five Questions       ->  خمسة أسئلة
 *   Sector Notes         ->  مذكرات قطاعية
 *   From the Room        ->  من داخل القاعة
 *
 * "MENA" is kept in Latin because it is the acronym Gulf business Arabic
 * itself uses, and because the daily feed is distributed under that name on an
 * external channel a reader has to be able to recognise.
 *
 * FLAGGED FOR THE CLIENT. A series name is a brand decision rather than a
 * translation one. If Gulf Connect has, or intends, different Arabic names for
 * any of the five, they belong here and in `content/ar/insight-page.ts`, and
 * changing them touches no id, no anchor and no route.
 *
 * ----------------------------------------------------------------------------
 * COMPLIANCE
 * ----------------------------------------------------------------------------
 * Every `description` describes what a format CONTAINS. None says what reading
 * it produces, and none carries a view on a security. "تعليق" and "سياق" are
 * used deliberately in place of anything that could read as "تحليل استثماري".
 */

export const insightFormatsAr: Localised<typeof insightFormats> = [
  {
    id: "menas-digital-news",
    name: "أخبار MENA الرقمية",
    cadence: "يوميًا",
    medium: "written",
    description:
      "نشرة أخبار رقمية يومية تغطي التطورات ذات الصلة في أسواق الخليج وفي القطاعات الأساسية لدى Gulf Connect.",
  },
  {
    id: "gulf-brief",
    name: "الموجز الخليجي",
    cadence: "كل أسبوعين",
    medium: "written",
    description:
      "تعليق مكتوب موجز عمّا يتحرك في أسواق المال الخليجية وفي المعادن الحيوية، والذكاء الاصطناعي والبنية التحتية للبيانات، وعلوم الحياة. السياق القطاعي أولًا.",
  },
  {
    id: "five-questions",
    name: "خمسة أسئلة",
    cadence: "كل أسبوعين",
    medium: "video",
    description:
      "مقابلة مع رئيس تنفيذي بصيغة ثابتة — المجالات الخمسة نفسها في كل مرة، بحيث تكون السلسلة قابلة للمقارنة من شركة إلى أخرى.",
  },
  {
    id: "sector-notes",
    name: "مذكرات قطاعية",
    cadence: "ربع سنوية",
    medium: "written",
    description:
      "إحاطة مكتوبة أطول عن قطاع واحد كل ربع سنة. متاحة للأعضاء المسجَّلين.",
  },
  {
    id: "from-the-room",
    name: "من داخل القاعة",
    cadence: "بعد كل برنامج",
    medium: "video",
    description:
      "فيلم قصير من برنامج مكتمل، يُصوَّر في موقعه. يتطلب لقطات حقيقية، ولذلك يأتي بعد البرامج نفسها.",
  },
];

export const insightContentAr: Localised<typeof insightContent> = {
  eyebrow: "رؤى",
  title: "مكتوب للخليج، عن القطاعات التي نغطيها",
  lead: "خمس صيغ دورية بدل تدفّق أخبار. لكل منها اسم ووتيرة ووصف ثابت، ليعرف القارئ الذي تهمّه إحداها متى تصل التالية.",
  emptyNote:
    "يبدأ النشر قريبًا. والصيغ أدناه هي السلاسل الدورية التي تنتظم حولها هذه المكتبة.",
  formatsNavLabel: "صيغ الرؤى",
  previewLabel: "رؤى",
  previewHeading: "وجهات نظر في أسواق المال الخليجية",
  fallbackFormatName: "رؤى",
};
