/** Lets keyboard users jump past the header. Visible only when focused. */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-100 focus:bg-(--color-surface) focus:px-5 focus:py-3 focus:text-sm focus:text-(--color-foreground) focus:outline-2 focus:outline-offset-2 focus:outline-(--color-ring)"
    >
      Skip to main content
    </a>
  );
}
