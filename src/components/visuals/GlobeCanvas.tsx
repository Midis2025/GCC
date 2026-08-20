"use client";

import { useCallback, useEffect, useRef } from "react";

import { globeMarkets, internationalArcs } from "@/data/outreach-globe";
import { DEG, approach, greatCircle, project, shortestAngle } from "@/lib/globe";
import type { Projected, Rotation } from "@/lib/globe";

/* --------------------------------------------------------------------------
   Palette. Raw values rather than tokens: this is a canvas, so nothing here
   participates in the cascade and `var()` cannot be resolved per pixel. These
   mirror the dark-surface tokens in globals.css - keep them in step.
   -------------------------------------------------------------------------- */
const BRONZE = "184,148,95";
const IVORY = "244,241,235";

/** Radians per second of automatic drift. A full turn takes just over 2min. */
const AUTO_SPEED = 0.05;
/** Fraction of the distance to the target still remaining after one second. */
const EASE = 0.0016;
/** How long a drag holds the globe before it eases back to the active market. */
const MANUAL_HOLD_MS = 5200;
/** Pointer travel, in px, above which a press counts as a drag and not a click. */
const DRAG_THRESHOLD = 4;
/** Screen-space radius, in px, for picking a node under the pointer. */
const HIT_RADIUS = 18;

const MAX_PITCH = 62 * DEG;

export interface GlobeCanvasProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  /**
   * Reports the market under the pointer, or null, with the pointer position
   * in canvas-relative pixels so a tooltip can be anchored to it. Fires only
   * when the hovered market changes, never per frame.
   */
  onHover: (index: number | null, x: number, y: number) => void;
  reducedMotion: boolean;
  /** Drops the graticule density and the outer glow on small screens. */
  compact: boolean;
  /**
   * True when the information panel floats over the lower-left of the globe.
   * The disc is pushed right and up so the Gulf - which is what the panel is
   * describing - never ends up behind it.
   */
  offsetForPanel: boolean;
  className?: string;
}

/** Reusable projection targets - the draw loop must not allocate. */
const P: Projected = { x: 0, y: 0, z: 0, sx: 0, sy: 0 };
const N: Projected = { x: 0, y: 0, z: 0, sx: 0, sy: 0 };

/** Great-circle sample cache, keyed by endpoint pair. Geometry never changes. */
const arcCache = new Map<string, number[][]>();

function cachedArc(fromLon: number, fromLat: number, toLon: number, toLat: number, steps: number) {
  const key = `${fromLon},${fromLat},${toLon},${toLat},${steps}`;
  let arc = arcCache.get(key);
  if (!arc) {
    arc = greatCircle(fromLon, fromLat, toLon, toLat, steps);
    arcCache.set(key, arc);
  }
  return arc;
}

/**
 * The globe itself.
 *
 * An orthographic projection of a unit sphere, drawn to a 2D canvas. There is
 * no WebGL context and no 3D library: the depth component that the projection
 * produces anyway is what drives occlusion, so a sphere, its graticule, its
 * coastlines and the arcs over it all fall out of the same twelve lines of
 * maths in `lib/globe.ts`.
 *
 * The draw loop owns its state in refs and never calls `setState` - at 60Hz a
 * React render per frame would cost more than the drawing does. The only state
 * that crosses back into React is the hovered market, and only when it changes.
 *
 * Coastline geometry is imported dynamically, so the 20KB of Natural Earth
 * polylines are a separate chunk that arrives after the globe is already
 * turning rather than blocking it.
 */
export function GlobeCanvas({
  activeIndex,
  onSelect,
  onHover,
  reducedMotion,
  compact,
  offsetForPanel,
  className,
}: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const land = useRef<readonly (readonly number[])[] | null>(null);
  const rotation = useRef<Rotation>({ lambda: -40 * DEG, phi: 18 * DEG });
  const active = useRef(activeIndex);
  const hovered = useRef<number | null>(null);
  /** 0 to 1, advanced whenever the active market changes. Drives the arcs. */
  const linkProgress = useRef(0);
  const manualUntil = useRef(0);
  const inView = useRef(false);
  const pointer = useRef({ dragging: false, moved: 0, x: 0, y: 0 });
  /** Screen positions of every market, refreshed each frame for hit testing. */
  const hits = useRef<{ index: number; x: number; y: number }[]>([]);

  /* --- Coastlines, off the critical path -------------------------------- */
  useEffect(() => {
    let alive = true;
    import("@/data/generated/coastlines").then((module) => {
      if (alive) land.current = module.coastlines;
    });
    return () => {
      alive = false;
    };
  }, []);

  /*
    Hand the new market to the draw loop and restart the connection draw-in.
    The loop reads through refs rather than props so that it can be started
    once and left alone - re-running it on every market change would rebuild
    the observers and drop a frame each time.
  */
  useEffect(() => {
    active.current = activeIndex;
    linkProgress.current = reducedMotion ? 1 : 0;
  }, [activeIndex, reducedMotion]);

  /* --- Draw loop -------------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const fontFamily = getComputedStyle(canvas).fontFamily || "system-ui, sans-serif";

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = performance.now();
    let elapsed = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Off-screen frames are wasted frames. The globe is well down the page, so
    // without this it would animate for the entire time the visitor spends
    // reading the sections above it.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    visibility.observe(canvas);

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!inView.current || document.hidden || width === 0) return;

      elapsed += dt;

      const market = globeMarkets[active.current] ?? globeMarkets[0];
      const rot = rotation.current;

      /* --- Orientation ------------------------------------------------- */
      if (!pointer.current.dragging) {
        if (now < manualUntil.current) {
          // Just released: let it keep turning from wherever they left it
          // rather than snapping the view out from under them.
          if (!reducedMotion) rot.lambda += AUTO_SPEED * dt;
        } else {
          // A slow figure-of-eight around the active market. This is the
          // "slowly rotates automatically" state: the globe is never still,
          // but it never turns the market being described away from the
          // viewer either. Two non-harmonic periods, so it does not visibly
          // repeat.
          const driftLon = reducedMotion ? 0 : Math.sin(elapsed * 0.16) * 13 * DEG;
          const driftLat = reducedMotion ? 0 : Math.sin(elapsed * 0.11) * 3.5 * DEG;

          const targetLambda = -market.view.lon * DEG + driftLon;
          const targetPhi = market.view.lat * DEG * 0.72 + driftLat;

          if (reducedMotion) {
            rot.lambda = targetLambda;
            rot.phi = targetPhi;
          } else {
            rot.lambda += shortestAngle(rot.lambda, targetLambda) * (1 - Math.pow(EASE, dt));
            rot.phi = approach(rot.phi, targetPhi, EASE, dt);
          }
        }
      }

      rot.phi = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, rot.phi));

      if (linkProgress.current < 1) {
        linkProgress.current = Math.min(1, linkProgress.current + dt * 0.85);
      }

      /* --- Frame ------------------------------------------------------- */
      const cx = width * (offsetForPanel ? 0.55 : 0.5);
      const cy = height * (offsetForPanel ? 0.44 : 0.5);
      const radius = Math.min(width, height) * (compact ? 0.38 : 0.44);

      ctx.clearRect(0, 0, width, height);

      drawAtmosphere(ctx, cx, cy, radius, compact);
      drawSphere(ctx, cx, cy, radius);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      drawGraticule(ctx, rot, cx, cy, radius, compact);
      if (land.current) drawCoastlines(ctx, land.current, rot, cx, cy, radius);
      drawTerminator(ctx, cx, cy, radius);

      ctx.restore();

      drawRim(ctx, cx, cy, radius);
      drawConnections(ctx, market, rot, cx, cy, radius, linkProgress.current);
      drawMarkets(ctx, rot, cx, cy, radius, active.current, hovered.current, elapsed, reducedMotion, fontFamily, hits);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, [reducedMotion, compact, offsetForPanel]);

  /* --- Pointer ---------------------------------------------------------- */
  const pick = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    let best: number | null = null;
    let bestDistance = HIT_RADIUS;

    for (const hit of hits.current) {
      const distance = Math.hypot(hit.x - x, hit.y - y);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = hit.index;
      }
    }

    return best;
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    pointer.current = { dragging: true, moved: 0, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const state = pointer.current;

      if (state.dragging) {
        const dx = event.clientX - state.x;
        const dy = event.clientY - state.y;

        state.moved += Math.abs(dx) + Math.abs(dy);
        state.x = event.clientX;
        state.y = event.clientY;

        // Scaled so a drag across the canvas is a little over half a turn,
        // which is fast enough to feel direct and slow enough to stay elegant.
        rotation.current.lambda += dx * 0.005;
        rotation.current.phi = Math.max(
          -MAX_PITCH,
          Math.min(MAX_PITCH, rotation.current.phi + dy * 0.005),
        );

        manualUntil.current = performance.now() + MANUAL_HOLD_MS;
        return;
      }

      const index = pick(event.clientX, event.clientY);
      if (index !== hovered.current) {
        hovered.current = index;
        const rect = event.currentTarget.getBoundingClientRect();
        onHover(index, event.clientX - rect.left, event.clientY - rect.top);
      }
    },
    [onHover, pick],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const state = pointer.current;
      state.dragging = false;

      if (state.moved <= DRAG_THRESHOLD) {
        const index = pick(event.clientX, event.clientY);
        if (index !== null) onSelect(index);
      }
    },
    [onSelect, pick],
  );

  const handlePointerLeave = useCallback(() => {
    pointer.current.dragging = false;
    if (hovered.current !== null) {
      hovered.current = null;
      onHover(null, 0, 0);
    }
  }, [onHover]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ touchAction: "pan-y", cursor: "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
    />
  );
}

/* ==========================================================================
   Drawing
   ========================================================================== */

/** Outer glow. Bronze close in, cool steel further out, gone by 1.3r. */
function drawAtmosphere(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  compact: boolean,
) {
  const gradient = ctx.createRadialGradient(cx, cy, radius * 0.94, cx, cy, radius * 1.3);
  gradient.addColorStop(0, `rgba(${BRONZE},${compact ? 0.13 : 0.17})`);
  gradient.addColorStop(0.34, "rgba(150,168,190,0.075)");
  gradient.addColorStop(1, "rgba(150,168,190,0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
  ctx.fill();
}

/** The body. A single off-centre radial gradient does all the metal. */
function drawSphere(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  const gradient = ctx.createRadialGradient(
    cx - radius * 0.36,
    cy - radius * 0.42,
    radius * 0.04,
    cx,
    cy,
    radius * 1.04,
  );
  gradient.addColorStop(0, "#38506a");
  gradient.addColorStop(0.4, "#20303f");
  gradient.addColorStop(0.78, "#111d27");
  gradient.addColorStop(1, "#0b131b");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawGraticule(
  ctx: CanvasRenderingContext2D,
  rot: Rotation,
  cx: number,
  cy: number,
  radius: number,
  compact: boolean,
) {
  const meridianStep = compact ? 40 : 25;
  const parallelStep = compact ? 30 : 20;
  const sample = compact ? 5 : 3;

  ctx.strokeStyle = `rgba(${IVORY},0.1)`;
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let lon = -180; lon < 180; lon += meridianStep) {
    let started = false;
    for (let lat = -88; lat <= 88; lat += sample) {
      project(lon, lat, rot, cx, cy, radius, P);
      if (P.z > 0) {
        if (started) ctx.lineTo(P.sx, P.sy);
        else {
          ctx.moveTo(P.sx, P.sy);
          started = true;
        }
      } else {
        started = false;
      }
    }
  }

  for (let lat = -80; lat <= 80; lat += parallelStep) {
    let started = false;
    for (let lon = -180; lon <= 180; lon += sample) {
      project(lon, lat, rot, cx, cy, radius, P);
      if (P.z > 0) {
        if (started) ctx.lineTo(P.sx, P.sy);
        else {
          ctx.moveTo(P.sx, P.sy);
          started = true;
        }
      } else {
        started = false;
      }
    }
  }

  ctx.stroke();
}

/**
 * Coastlines as hairline strokes rather than filled landmasses.
 *
 * Outlines are what the brief asks for, and they are also the honest choice
 * here: filling a polygon in an orthographic projection means clipping every
 * ring against the horizon circle and closing it along that arc, which is a
 * real projection-library problem. A stroked polyline only has to break when it
 * crosses behind the limb, which is one comparison per point.
 */
function drawCoastlines(
  ctx: CanvasRenderingContext2D,
  lines: readonly (readonly number[])[],
  rot: Rotation,
  cx: number,
  cy: number,
  radius: number,
) {
  ctx.strokeStyle = `rgba(${IVORY},0.38)`;
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.beginPath();

  for (const line of lines) {
    let started = false;

    for (let i = 0; i < line.length; i += 2) {
      project(line[i], line[i + 1], rot, cx, cy, radius, P);

      if (P.z > 0) {
        if (started) ctx.lineTo(P.sx, P.sy);
        else {
          ctx.moveTo(P.sx, P.sy);
          started = true;
        }
      } else {
        started = false;
      }
    }
  }

  ctx.stroke();
}

/** Shades the sphere away from the light, so the limb rolls off. */
function drawTerminator(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  const gradient = ctx.createRadialGradient(
    cx - radius * 0.32,
    cy - radius * 0.4,
    radius * 0.1,
    cx - radius * 0.12,
    cy - radius * 0.14,
    radius * 1.55,
  );
  gradient.addColorStop(0, "rgba(5,9,14,0)");
  gradient.addColorStop(0.58, "rgba(5,9,14,0.26)");
  gradient.addColorStop(1, "rgba(4,7,11,0.76)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
}

/** Edge light: bronze where the light hits, gone by the far side. */
function drawRim(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  const gradient = ctx.createLinearGradient(
    cx - radius,
    cy - radius,
    cx + radius,
    cy + radius * 0.85,
  );
  gradient.addColorStop(0, `rgba(${BRONZE},0.62)`);
  gradient.addColorStop(0.4, `rgba(${BRONZE},0.24)`);
  gradient.addColorStop(0.78, "rgba(150,168,190,0.12)");
  gradient.addColorStop(1, "rgba(150,168,190,0.04)");

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
}

/**
 * Connection arcs from the active market.
 *
 * Within the Gulf they hug the surface; the international step lifts them well
 * clear of it, so the outbound relationships read as leaving the region rather
 * than crossing it. `progress` draws them in from the origin outwards.
 */
function drawConnections(
  ctx: CanvasRenderingContext2D,
  market: (typeof globeMarkets)[number],
  rot: Rotation,
  cx: number,
  cy: number,
  radius: number,
  progress: number,
) {
  const targets = market.international
    ? internationalArcs
    : globeMarkets.filter((other) => !other.international && other.code !== market.code);

  const altitude = market.international ? 0.26 : 0.05;
  const steps = market.international ? 54 : 20;
  const alpha = market.international ? 0.5 : 0.34;

  ctx.lineWidth = 1;
  ctx.lineCap = "round";

  for (const target of targets) {
    const points = cachedArc(market.lon, market.lat, target.lon, target.lat, steps);
    const drawTo = Math.max(1, Math.floor(points.length * progress));

    ctx.beginPath();
    let started = false;

    for (let i = 0; i < drawTo; i += 1) {
      const t = i / (points.length - 1);
      // A sine lift puts the apex at the midpoint and lands both ends flat.
      const lift = altitude * Math.sin(Math.PI * t);

      project(points[i][0], points[i][1], rot, cx, cy, radius, P, lift);

      // Lifted arcs stay legible a little way past the limb, which is what
      // lets an outbound connection curve over the edge of the disc.
      if (P.z > -0.28) {
        if (started) ctx.lineTo(P.sx, P.sy);
        else {
          ctx.moveTo(P.sx, P.sy);
          started = true;
        }
      } else {
        started = false;
      }
    }

    ctx.strokeStyle = `rgba(${BRONZE},${alpha * progress})`;
    ctx.stroke();

    // Terminal point, so an arc resolves into something rather than stopping.
    if (progress > 0.96) {
      project(target.lon, target.lat, rot, cx, cy, radius, N);
      if (N.z > 0) {
        ctx.beginPath();
        ctx.arc(N.sx, N.sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BRONZE},0.5)`;
        ctx.fill();
      }
    }
  }
}

function drawMarkets(
  ctx: CanvasRenderingContext2D,
  rot: Rotation,
  cx: number,
  cy: number,
  radius: number,
  activeIndex: number,
  hoveredIndex: number | null,
  elapsed: number,
  reducedMotion: boolean,
  fontFamily: string,
  hits: React.RefObject<{ index: number; x: number; y: number }[]>,
) {
  const picks: { index: number; x: number; y: number }[] = [];

  globeMarkets.forEach((market, index) => {
    if (market.international) return;

    project(market.lon, market.lat, rot, cx, cy, radius, P);
    if (P.z <= 0) return;

    // Fade out as a node approaches the limb, so it never pops.
    const depth = Math.min(1, P.z * 3.2);
    const isActive = index === activeIndex;
    const isHovered = index === hoveredIndex;

    picks.push({ index, x: P.sx, y: P.sy });

    if (isActive) {
      const pulse = reducedMotion ? 0.5 : (Math.sin(elapsed * 2.1) + 1) / 2;

      ctx.beginPath();
      ctx.arc(P.sx, P.sy, 8 + pulse * 5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${BRONZE},${(0.4 - pulse * 0.24) * depth})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(P.sx, P.sy, 7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${BRONZE},${0.55 * depth})`;
      ctx.stroke();
    } else if (isHovered) {
      ctx.beginPath();
      ctx.arc(P.sx, P.sy, 7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${BRONZE},${0.42 * depth})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(P.sx, P.sy, isActive ? 4 : 2.8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${BRONZE},${(isActive || isHovered ? 1 : 0.78) * depth})`;
    ctx.fill();

    // Active only. A hovered market gets the HTML tooltip, which can carry its
    // city as well - two labels on one node would just be clutter.
    if (isActive) {
      const context = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
      const previous = context.letterSpacing;
      context.letterSpacing = "1.5px";

      ctx.font = `600 10px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = `rgba(${IVORY},${0.88 * depth})`;
      ctx.fillText(market.label.toUpperCase(), P.sx, P.sy - 16);

      if (previous !== undefined) context.letterSpacing = previous;
    }
  });

  hits.current = picks;
}
