/**
 * Authored hero backdrop.
 *
 * Used when no photography has been supplied. It is a drawn architectural
 * geometry - receding vertical mullions and a horizon line, suggesting a
 * curtain-walled financial district without depicting a specific building or
 * using stock imagery. Deliberately low contrast so the headline stays
 * dominant.
 *
 * Purely decorative: hidden from assistive technology.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Depth wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_18%,#1c2b3b_0%,#111c27_45%,#0c141d_100%)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="gcc-mullion" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4f1eb" stopOpacity="0.11" />
            <stop offset="62%" stopColor="#f4f1eb" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#f4f1eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gcc-accent-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b8945f" stopOpacity="0" />
            <stop offset="52%" stopColor="#b8945f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#b8945f" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gcc-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4f1eb" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#f4f1eb" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Vertical mullions, spacing widening toward the right for perspective */}
        <g stroke="url(#gcc-mullion)" strokeWidth="1">
          <path d="M735 900V132" />
          <path d="M790 900V158" />
          <path d="M851 900V188" />
          <path d="M918 900V222" />
          <path d="M992 900V260" />
          <path d="M1073 900V302" />
          <path d="M1161 900V348" />
          <path d="M1257 900V398" />
          <path d="M1361 900V452" />
        </g>

        {/* Horizontal floor plates */}
        <g stroke="url(#gcc-floor)" strokeWidth="1">
          <path d="M700 300h740" />
          <path d="M700 420h740" />
          <path d="M700 540h740" />
          <path d="M700 660h740" />
        </g>

        {/* Single restrained accent rule */}
        <path d="M0 726h1440" stroke="url(#gcc-accent-line)" strokeWidth="1" />
      </svg>

      {/* Keeps the left column legible over the geometry */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,#0c141d_18%,rgba(12,20,29,0.86)_46%,rgba(12,20,29,0.35)_100%)]" />
    </div>
  );
}
