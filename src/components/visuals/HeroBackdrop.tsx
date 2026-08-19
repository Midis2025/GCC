import { cn } from "@/lib/utils";

export interface HeroBackdropProps {
  /**
   * `full`    - the standalone treatment, used when no photograph is supplied.
   *             Paints its own depth wash and legibility gradient.
   * `overlay` - geometry only, at reduced strength, to be layered over
   *             photography. Contributes no background of its own.
   */
  variant?: "full" | "overlay";
  className?: string;
}

/**
 * Authored architectural geometry.
 *
 * Drawn rather than photographed: receding vertical mullions, floor plates and
 * a single accent rule, suggesting a curtain-walled financial district without
 * depicting a specific building.
 *
 * It serves two purposes. As `full` it carries the hero outright when no
 * photography is supplied, which is what lets the site ship without stock
 * imagery. As `overlay` the same geometry sits at low opacity over a
 * photograph, so the drawn and photographic treatments share one visual
 * language instead of reading as two unrelated design decisions.
 *
 * Purely decorative: hidden from assistive technology.
 */
export function HeroBackdrop({ variant = "full", className }: HeroBackdropProps) {
  const isOverlay = variant === "overlay";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        isOverlay && "-z-10 opacity-55",
        className,
      )}
    >
      {/* Depth wash. Omitted in overlay mode so the photograph shows through. */}
      {!isOverlay && (
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_18%,#1c2b3b_0%,#111c27_45%,#0c141d_100%)]" />
      )}

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
      {!isOverlay && (
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#0c141d_18%,rgba(12,20,29,0.86)_46%,rgba(12,20,29,0.35)_100%)]" />
      )}
    </div>
  );
}
