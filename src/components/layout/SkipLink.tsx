import { getDictionary } from "@/content";

/** Lets keyboard users jump past the header. Visible only when focused. */
export async function SkipLink() {
  const t = await getDictionary();

  return (
    <a
      href="#main-content"
      /*
        `start-5` rather than `left-5`.

        This is the one position on the site that must follow the reading
        direction rather than the viewport: a skip link is the first thing a
        keyboard user meets, and in Arabic it belongs at the top RIGHT, where
        reading starts. The logical property resolves against `dir` on <html>,
        so one class is correct in both languages.
      */
      className="sr-only focus:not-sr-only focus:fixed focus:start-5 focus:top-5 focus:z-100 focus:bg-(--color-surface) focus:px-5 focus:py-3 focus:text-sm focus:text-(--color-foreground) focus:outline-2 focus:outline-offset-2 focus:outline-(--color-ring)"
    >
      {t.nav.skipToContent}
    </a>
  );
}
