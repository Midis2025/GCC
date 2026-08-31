"use client";

import { useCallback, useEffect, useRef } from "react";

import { globeMarkets, internationalArcs } from "@/data/outreach-globe";
import {
  DEG,
  GLOW_REACH,
  ZOOM_FLOOR,
  ZOOM_MAX,
  ZOOM_MIN,
  approach,
  greatCircle,
  project,
  shortestAngle,
} from "@/lib/globe";
import type { Projected, Rotation } from "@/lib/globe";

/* --------------------------------------------------------------------------
   Palette. Raw values rather than tokens: this is a canvas, so nothing here
   participates in the cascade and `var()` cannot be resolved per pixel. These
   mirror the dark-surface tokens in globals.css - keep them in step.
   -------------------------------------------------------------------------- */
const BRONZE = "184,148,95";
const IVORY = "244,241,235";
/** City lights and the hub glow. Warmer and lighter than the bronze accent. */
const WARM = "232,190,126";

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

/**
 * Fraction of the remaining zoom distance still left after one second.
 *
 * The camera is driven directly by a pinch, so this is not the animation - it
 * is a ~130ms smoothing over it, which takes the stepping out of a gesture
 * without putting any perceptible lag between the fingers and the globe.
 */
const ZOOM_EASE = 0.0005;

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
   * Where the disc sits inside the canvas, as fractions. `cx`/`cy` are of the
   * canvas box; `radius` is of its shorter side.
   *
   * This is what lets one renderer serve two very different placements - the
   * outreach section pushes the disc clear of its floating panel, the hero
   * pushes it right and lets it bleed past the edge of the frame.
   */
  frame: { cx: number; cy: number; radius: number };
  /**
   * `panel` is the outreach treatment: lit from the upper left, no region wash,
   * no leader lines.
   *
   * `hero` is lit from the centre-right and washes the Gulf in bronze, so the
   * limb that passes behind the headline stays near-black while the region the
   * page is about is the brightest thing on the sphere. It also draws a leader
   * from each market to its standing label.
   *
   * Defaulted to `panel` so the outreach section is unaffected by any of this.
   */
  variant?: "panel" | "hero";
  /** Label anchor positions in canvas pixels, keyed by market code. */
  labelAnchors?: Record<string, { x: number; y: number }>;
  /**
   * Draws the active market's name on the globe, beside its marker.
   *
   * Defaults to on for `panel` and off for `hero`, because the hero normally
   * carries a standing HTML label for every market and two names on one dot is
   * a double image. The hero turns it back on below `lg`, where there is no
   * room to fan seven labels and the standing set is not rendered - so this is
   * what keeps the markets named on a phone.
   */
  markerLabels?: boolean;
  /**
   * How close the camera is, as a multiple of `frame.radius`. Sampled once a
   * frame; `ZOOM_MIN` - or omitting it entirely - is the untouched view.
   *
   * A REF rather than a value, because the thing that moves it is a two-finger
   * pinch. Passing it as a prop would mean a React render for every frame of a
   * gesture, of a subtree carrying the whole information panel, to move one
   * number that only the draw loop ever reads.
   *
   * Supplying it is also what OPTS A CALLER IN to pinch-to-zoom: a globe with
   * no zoom ref has nowhere to write, so the gesture is inert there.
   */
  zoom?: React.RefObject<number>;
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
  frame,
  variant = "panel",
  labelAnchors,
  markerLabels,
  zoom,
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
  /**
   * Live TOUCH points, by pointer id. Only touches are tracked: a pinch is a
   * two-finger gesture and nothing else can produce one, which is what keeps
   * this entirely off the desktop.
   */
  const touches = useRef(new Map<number, { x: number; y: number }>());
  /**
   * The in-flight pinch, or null.
   *
   * `distance` and `zoom` are the readings at the moment the second finger
   * landed, so the gesture is a RATIO against where it started rather than an
   * accumulation between frames - the same reasoning as everywhere else here.
   * Pinching back to the separation you began with returns exactly the zoom you
   * began with.
   */
  const pinch = useRef<{ distance: number; zoom: number } | null>(null);
  /**
   * Where the camera actually is. The caller's ref says where it should be -
   * this is what chases it, so the section can write a raw scroll reading and
   * still get a smooth arrival.
   */
  const zoomLevel = useRef(ZOOM_MIN);
  /** Screen positions of every market, refreshed each frame for hit testing. */
  const hits = useRef<{ index: number; x: number; y: number }[]>([]);
  /**
   * Placement, held in a ref so a caller passing an inline object literal
   * cannot restart the draw loop - which would rebuild both observers and drop
   * a frame - on every one of its own renders.
   */
  const layout = useRef(frame);
  /** The caller's camera ref, held the same way and for the same reason. */
  const camera = useRef(zoom);
  const anchors = useRef(labelAnchors);
  const anchorLeft = useRef(Number.POSITIVE_INFINITY);
  /**
   * Where the disc actually landed this frame, in canvas pixels.
   *
   * The hero's canvas is full-bleed so its glow can fade into the page instead
   * of being cut off at a box edge, which means the element is far larger than
   * the globe. Dragging is gated on this so the interactive area stays the
   * globe itself rather than becoming the entire hero.
   */
  const geometry = useRef({ cx: 0, cy: 0, radius: 0 });

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

  useEffect(() => {
    layout.current = frame;
  }, [frame]);

  useEffect(() => {
    camera.current = zoom;
  }, [zoom]);

  useEffect(() => {
    anchors.current = labelAnchors;
    // Precomputed here rather than scanned per frame: the draw loop only needs
    // the leftmost anchor, and it changes on resize, not on rotation.
    anchorLeft.current = labelAnchors
      ? Math.min(...Object.values(labelAnchors).map((anchor) => anchor.x))
      : Number.POSITIVE_INFINITY;
  }, [labelAnchors]);

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
    let backingRatio = 1;
    let layers: GlobeLayers | null = null;

    /*
      Device pixel ratio, scaled down as the canvas gets bigger.

      This globe is drawn from big radial gradients - atmosphere, body,
      terminator, region wash - each of which covers the whole disc, so the
      frame cost is fill rate rather than JavaScript. At the hero's size a flat
      DPR of 2 means 4.4 million backing pixels and roughly half the frames it
      should have. Backing off to 1.25 there costs nothing visible on a globe
      whose sharpest feature is a one-pixel coastline, and hands back the
      frames. The outreach globe is small enough to stay at 2.
    */
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const area = width * height;
      const cap = area > 900_000 ? 1.25 : area > 400_000 ? 1.6 : 2;
      backingRatio = Math.min(window.devicePixelRatio || 1, cap);

      canvas.width = Math.round(width * backingRatio);
      canvas.height = Math.round(height * backingRatio);
      ctx.setTransform(backingRatio, 0, 0, backingRatio, 0, 0);
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

      /* --- Camera ------------------------------------------------------ */
      /*
        Where the caller says the camera should be, clamped here rather than
        trusted, so no mistake at the other end of the ref can put the globe
        somewhere the canvas cannot hold it.
      */
      const target = Math.max(
        ZOOM_FLOOR,
        Math.min(ZOOM_MAX, camera.current?.current ?? ZOOM_MIN),
      );

      if (zoomLevel.current !== target) {
        zoomLevel.current = approach(zoomLevel.current, target, ZOOM_EASE, dt);

        // Settle exactly rather than asymptotically, so a globe that is back at
        // the top of the section compares equal to 1 and takes the untouched
        // path below - which is what makes the return exact rather than close.
        if (Math.abs(zoomLevel.current - target) < 0.0004) {
          zoomLevel.current = target;
        }
      }

      const scale = zoomLevel.current;

      /* --- Frame ------------------------------------------------------- */
      const { cx: fx, cy: fy, radius: fr } = layout.current;
      const cx = width * fx;
      const cy = height * fy;
      /*
        `baseRadius` is the placement the caller asked for; `radius` is what the
        viewer is actually looking at. They are the same number until someone
        zooms, so nothing about the default view is computed any differently
        from the way it was before.
      */
      const baseRadius = Math.min(width, height) * fr;
      const radius = baseRadius * scale;

      geometry.current.cx = cx;
      geometry.current.cy = cy;
      geometry.current.radius = radius;

      /*
        Clear only what is ever drawn to.

        The hero's canvas is the size of the section but the drawing occupies
        its right-hand side: the glow at its widest, and the label leaders,
        whose far ends are clamped to the right of the type column. Clearing the
        full element there meant wiping two million transparent pixels a frame.
        Anything left of `dirtyLeft` is never painted, so it is already clear.
      */
      let dirtyLeft = 0;
      if (variant === "hero") {
        let leftmost = cx - radius * GLOW_REACH;
        if (anchors.current) {
          for (const anchor of Object.values(anchors.current)) {
            if (anchor.x < leftmost) leftmost = anchor.x;
          }
        }
        dirtyLeft = Math.max(0, Math.floor(leftmost) - 48);
      }

      ctx.clearRect(dirtyLeft, 0, width - dirtyLeft, height);

      const hero = variant === "hero";

      /*
        The body of the globe does not rotate.

        Atmosphere, sphere, terminator and rim are all functions of cx, cy and
        radius alone - nothing in them depends on the orientation - yet they are
        four large radial gradients, which is the most expensive thing in the
        frame. So they are rendered once into two offscreen layers and blitted
        thereafter, and only the parts that actually turn are redrawn. Rebuilt
        only when the geometry itself changes.

        Built for the PLACEMENT radius, not the zoomed one. Everything in them
        scales linearly with the radius about the same centre, so a zoomed globe
        blits the layer it already has at a larger size rather than re-rendering
        those four gradients on every frame of a zoom - which is the one thing
        that would have made this expensive.
      */
      if (
        !layers ||
        layers.cx !== cx ||
        layers.cy !== cy ||
        layers.radius !== baseRadius ||
        layers.dpr !== backingRatio
      ) {
        layers = buildLayers(backingRatio, cx, cy, baseRadius, compact, hero);
      }

      blitLayer(ctx, layers.base, layers, cx, cy, scale);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      drawGraticule(ctx, rot, cx, cy, radius, compact, hero);

      if (land.current) {
        // Project every coastline vertex ONCE, then let the fill, the stroke
        // and the light field all read the same buffer. Projecting per layer
        // instead cost three passes over 1,500 vertices and took the hero from
        // 60fps to 30.
        projectLand(land.current, rot, cx, cy, radius);

        // The hero reads as a night earth: land carries a fill so the
        // continents are masses rather than wireframes, and the coasts are lit.
        if (hero) drawLandmass(ctx, land.current);
        drawCoastlines(ctx, land.current, hero);
        if (hero) drawCityLights(ctx, land.current);
      }

      if (hero) drawRegionWash(ctx, rot, cx, cy, radius);

      ctx.restore();

      // Terminator and rim, pre-rendered together.
      blitLayer(ctx, layers.overlay, layers, cx, cy, scale);

      if (hero) {
        // Left boundary for the arcs, as a fraction of the layer. The layer
        // starts at 38% of the viewport and the headline ends near 58%, so
        // ~0.27 of the layer is where the type column stops.
        drawHubNetwork(ctx, rot, cx, cy, radius, active.current, linkProgress.current, width * 0.27);
        if (anchors.current) {
          drawLeaders(ctx, rot, cx, cy, radius, anchors.current, active.current);
        }
      } else {
        drawConnections(ctx, market, rot, cx, cy, radius, linkProgress.current);
      }
      // The hero carries a standing HTML label for every market, so the canvas
      // must not draw one too - two names on one dot is just a double image.
      drawMarkets(ctx, rot, cx, cy, radius, active.current, hovered.current, elapsed, reducedMotion, fontFamily, hits, markerLabels ?? !hero);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, [reducedMotion, compact, variant, markerLabels]);

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

  /** True when the pointer is over the disc rather than the canvas around it. */
  const onDisc = useCallback((element: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = element.getBoundingClientRect();
    const { cx, cy, radius } = geometry.current;
    if (radius === 0) return false;
    return Math.hypot(clientX - rect.left - cx, clientY - rect.top - cy) <= radius;
  }, []);

  /*
    Written straight onto the element rather than held in state.

    The canvas is far larger than the globe - the hero's is the whole section -
    so a blanket `cursor: grab` would advertise the entire hero as draggable
    when only the disc is. Setting it per move keeps the affordance honest, and
    doing it through the style object rather than through React keeps it off the
    render path.
  */
  const setCursor = useCallback((element: HTMLCanvasElement, value: string) => {
    if (element.style.cursor !== value) element.style.cursor = value;
  }, []);

  /**
   * Separation between the two live touches, in client pixels.
   *
   * Returns 0 for any other count, which every caller treats as "not a pinch".
   */
  const spread = useCallback(() => {
    const points = [...touches.current.values()];
    if (points.length !== 2) return 0;
    return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  }, []);

  /**
   * Ends a pinch and hands the element back to the page.
   *
   * Restoring `pan-y` is the important half: while a pinch is running the
   * canvas is `touch-action: none` so the browser does not pan the page out
   * from under the gesture, and leaving it that way would make the section a
   * dead zone for one-finger scrolling.
   */
  const endPinch = useCallback((element: HTMLCanvasElement) => {
    if (!pinch.current) return;
    pinch.current = null;
    element.style.touchAction = "pan-y";

    /*
      Disarm the tap test for whatever is still down.

      A pinch ends on the FIRST lift, but the second finger is still on the
      glass and will fire its own `pointerup` a moment later. That one arrives
      with `pinch.current` already null, so without this it would run the
      normal path - and because a pinch never accumulates `moved`, it would
      look like a stationary tap and select whichever market it happened to be
      resting on. Finishing a zoom must not change the active market.

      The next press resets this: `pointerdown` on the disc replaces the whole
      object with a fresh `moved: 0`.
    */
    pointer.current.moved = Number.POSITIVE_INFINITY;
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      /*
        Track touches first, and before the disc test below returns.

        A pinch is judged on where the two fingers are TOGETHER, so a finger
        that lands off the disc still has to be counted - otherwise a pinch
        straddling the limb would look like a one-finger gesture.
      */
      if (event.pointerType === "touch") {
        touches.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

        /*
          Second finger down. A pinch starts only if the gesture is ON the
          globe - the midpoint has to be inside the disc - so two fingers
          landing on the copy beside it still belong to the page.

          `camera.current` is the caller's zoom ref, and it is the switch that
          keeps this to the one globe that has one: the hero passes no ref, so
          a pinch there does nothing and its behaviour is unchanged.
        */
        if (touches.current.size === 2 && camera.current) {
          const [a, b] = [...touches.current.values()];
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;

          if (onDisc(event.currentTarget, midX, midY)) {
            pinch.current = {
              distance: Math.hypot(a.x - b.x, a.y - b.y),
              zoom: camera.current.current,
            };

            // A pinch is not a drag. Drop any rotation the first finger began.
            pointer.current.dragging = false;

            /*
              `none` for the duration of the gesture ONLY.

              The element sits at `pan-y` the rest of the time, which is what
              lets a one-finger swipe scroll the page normally. Holding it at
              `none` globally would make the globe a hole in the page on a
              phone - the thing this must not do - so it is set here and put
              back in `endPinch`.
            */
            event.currentTarget.style.touchAction = "none";
          }
        }
      }

      // Only inside the disc. Everywhere else in the canvas is background, and a
      // press there belongs to the page - selecting the headline, for instance -
      // not to the globe.
      if (!onDisc(event.currentTarget, event.clientX, event.clientY)) return;

      // A second finger is a zoom, not a grab.
      if (pinch.current) return;

      // Stops the press turning into a text selection or a native image drag
      // as the pointer travels across the section.
      event.preventDefault();

      pointer.current = { dragging: true, moved: 0, x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
      setCursor(event.currentTarget, "grabbing");
    },
    [onDisc, setCursor],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const state = pointer.current;

      /* --- Pinch ------------------------------------------------------- */
      if (event.pointerType === "touch" && touches.current.has(event.pointerId)) {
        touches.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

        const gesture = pinch.current;
        const camera_ = camera.current;

        if (gesture && camera_) {
          const distance = spread();

          if (distance > 0 && gesture.distance > 0) {
            /*
              A ratio against the separation the gesture STARTED at, not a
              per-frame delta, so the zoom is reversible: bring the fingers
              back to where they began and the globe is exactly where it began.

              Clamped to the same pair the renderer clamps to, so the value in
              the ref is never a number the draw loop would have to correct.
            */
            camera_.current = Math.max(
              ZOOM_FLOOR,
              Math.min(ZOOM_MAX, (gesture.zoom * distance) / gesture.distance),
            );
          }

          // Belt and braces with the `touch-action: none` set on pointerdown:
          // if the browser has not already claimed the gesture, this stops it
          // scrolling the page while two fingers are working the globe.
          if (event.cancelable) event.preventDefault();
          return;
        }

        // Touches that are not a pinch fall through to the drag path below,
        // which is what keeps one-finger rotation working exactly as it did.
      }

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

      // Grab only over the disc; plain elsewhere, because "elsewhere" on the
      // hero is the whole section.
      setCursor(
        event.currentTarget,
        onDisc(event.currentTarget, event.clientX, event.clientY) ? "grab" : "default",
      );

      const index = pick(event.clientX, event.clientY);
      if (index !== hovered.current) {
        hovered.current = index;
        const rect = event.currentTarget.getBoundingClientRect();
        onHover(index, event.clientX - rect.left, event.clientY - rect.top);
      }
    },
    [onHover, pick, onDisc, setCursor, spread],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const state = pointer.current;

      /*
        Retire the finger, and end the pinch as soon as there are fewer than
        two - which also restores `touch-action: pan-y`.

        `wasPinching` suppresses the selection below: lifting from a pinch must
        not be read as a tap, or finishing a zoom would change the active
        market as a side effect.
      */
      const wasPinching = pinch.current !== null;

      if (event.pointerType === "touch") {
        touches.current.delete(event.pointerId);
        if (touches.current.size < 2) endPinch(event.currentTarget);
      }

      state.dragging = false;

      if (wasPinching) {
        setCursor(event.currentTarget, "default");
        return;
      }

      setCursor(
        event.currentTarget,
        onDisc(event.currentTarget, event.clientX, event.clientY) ? "grab" : "default",
      );

      if (state.moved <= DRAG_THRESHOLD) {
        const index = pick(event.clientX, event.clientY);

        // Touch has no "moved away", so a tap on bare globe is the only way to
        // put a card away again. Without this it would stand until the next
        // marker was found.
        if (index === null && event.pointerType === "touch" && hovered.current !== null) {
          hovered.current = null;
          onHover(null, 0, 0);
        }

        if (index !== null) {
          /*
            Report the position before the selection. A touch tap can produce
            no pointermove at all, so without this the card would be shown at
            wherever the last pointer report left it - which on a phone, where
            there may never have been one, is the corner of the layer.
          */
          if (hovered.current !== index) {
            hovered.current = index;
            const rect = event.currentTarget.getBoundingClientRect();
            onHover(index, event.clientX - rect.left, event.clientY - rect.top);
          }
          onSelect(index);
        }
      }
    },
    [onSelect, onHover, pick, onDisc, setCursor, endPinch],
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      pointer.current.dragging = false;
      setCursor(event.currentTarget, "default");

      /*
        Also the cancel path - the same handler serves `pointercancel`, which is
        what fires if the browser takes a gesture over. A finger that ends this
        way must still be forgotten, or the map would keep a phantom touch and
        the next single tap would look like the second half of a pinch.
      */
      if (event.pointerType === "touch") {
        touches.current.delete(event.pointerId);
        if (touches.current.size < 2) endPinch(event.currentTarget);
      }

      /*
        A touch pointer ceases to exist the moment the finger lifts, so the
        browser fires `pointerleave` immediately after every `pointerup`.
        Treating that as "the pointer has moved away" wiped the card a tap had
        just opened - which is why tapping a marker on a phone appeared to do
        nothing at all. Hover is a pointing-device idea; a tap is a choice, and
        it stands until the next one.
      */
      if (event.pointerType === "touch") return;

      if (hovered.current !== null) {
        hovered.current = null;
        onHover(null, 0, 0);
      }
    },
    [onHover, setCursor, endPinch],
  );

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      /*
        `pan-y` is what lets the page keep scrolling vertically under a finger
        while a horizontal swipe turns the globe instead of panning the page -
        so dragging the globe can never produce a sideways scroll.

        `userSelect: none` stops a drag that starts on the disc from running on
        into a text selection of whatever the canvas is layered over.
      */
      style={{ touchAction: "pan-y", userSelect: "none", WebkitUserSelect: "none" }}
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

/**
 * The two pre-rendered, rotation-independent layers of the globe.
 *
 * `base` is what goes under everything (atmosphere and body); `overlay` is what
 * goes over the rotating content (terminator and rim). The geometry they were
 * built for is carried alongside so the draw loop can tell when they are stale.
 */
interface GlobeLayers {
  base: HTMLCanvasElement;
  overlay: HTMLCanvasElement;
  cx: number;
  cy: number;
  radius: number;
  dpr: number;
  /** Where the layers sit in canvas space, and how big they are. */
  originX: number;
  originY: number;
  size: number;
}

/**
 * Blits a pre-rendered layer, scaled about the centre of the disc.
 *
 * At rest this is the drawImage call it replaced, argument for argument - the
 * default view must not go anywhere near the arithmetic. Once zoomed, the same
 * layer is drawn larger about the same centre, which is exact: every gradient
 * in it is a function of the radius and the centre alone, so scaling the blit
 * and rebuilding at the new radius produce the same picture.
 */
function blitLayer(
  ctx: CanvasRenderingContext2D,
  layer: HTMLCanvasElement,
  layers: GlobeLayers,
  cx: number,
  cy: number,
  scale: number,
) {
  if (scale === 1) {
    ctx.drawImage(layer, layers.originX, layers.originY, layers.size, layers.size);
    return;
  }

  ctx.drawImage(
    layer,
    cx + (layers.originX - cx) * scale,
    cy + (layers.originY - cy) * scale,
    layers.size * scale,
    layers.size * scale,
  );
}

function buildLayers(
  dpr: number,
  cx: number,
  cy: number,
  radius: number,
  compact: boolean,
  hero: boolean,
): GlobeLayers {
  // Sized to the globe and its glow rather than to the whole canvas. The hero's
  // canvas is now full-bleed, and blitting two viewport-sized images every
  // frame to move a disc that occupies half of one is most of a frame budget
  // spent on transparent pixels.
  const size = Math.ceil(radius * GLOW_REACH * 2);
  const originX = cx - radius * GLOW_REACH;
  const originY = cy - radius * GLOW_REACH;

  const make = () => {
    const surface = document.createElement("canvas");
    surface.width = Math.max(1, Math.round(size * dpr));
    surface.height = Math.max(1, Math.round(size * dpr));
    const context = surface.getContext("2d");
    if (context) {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Draw in canvas coordinates; the translate puts the disc in the layer.
      context.translate(-originX, -originY);
    }
    return { surface, context };
  };

  const base = make();
  if (base.context) {
    /*
      The atmosphere is the HERO's alone.

      The outreach globe sits on a flat dark band, and there the halo read as a
      light source hanging behind the disc rather than as an edge-lit sphere.
      It is not drawn for the `panel` variant at all, so the pixels immediately
      outside the limb are the section's own background.

      Only the OUTER light goes. The gradient starts at 0.94r, inside the limb,
      but `drawSphere` paints over that on the next line - so nothing that was
      ever visible ON the disc is affected, and the rim, terminator, graticule,
      coastlines, markers and labels are all untouched. The layer is still
      sized to `GLOW_REACH`, so the disc keeps exactly the size and position it
      had.
    */
    if (hero) drawAtmosphere(base.context, cx, cy, radius, compact || hero);
    drawSphere(base.context, cx, cy, radius, hero);
  }

  const overlay = make();
  if (overlay.context) {
    overlay.context.save();
    overlay.context.beginPath();
    overlay.context.arc(cx, cy, radius, 0, Math.PI * 2);
    overlay.context.clip();
    drawTerminator(overlay.context, cx, cy, radius, hero);
    overlay.context.restore();
    drawRim(overlay.context, cx, cy, radius, hero);
  }

  return {
    base: base.surface,
    overlay: overlay.surface,
    cx,
    cy,
    radius,
    dpr,
    originX,
    originY,
    size,
  };
}

/**
 * Outer glow. Bronze close in, cool steel further out, gone by 1.3r.
 *
 * `dim` is passed for the hero as well as for small screens: at hero scale the
 * limb runs directly behind the headline, and a glow bright enough to look
 * right on a 400px disc becomes a lit band across an 80px word.
 */
function drawAtmosphere(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  dim: boolean,
) {
  const gradient = ctx.createRadialGradient(cx, cy, radius * 0.94, cx, cy, radius * 1.3);
  gradient.addColorStop(0, `rgba(${BRONZE},${dim ? 0.11 : 0.17})`);
  gradient.addColorStop(0.34, "rgba(150,168,190,0.075)");
  gradient.addColorStop(1, "rgba(150,168,190,0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
  ctx.fill();
}

/** Edge light strength, eased back at hero scale for the same reason. */
function rimAlpha(hero: boolean, base: number) {
  return hero ? base * 0.55 : base;
}

/**
 * The body. A single off-centre radial gradient does all the metal.
 *
 * The hero lights from the centre-right and sits darker overall, because its
 * left limb passes behind the headline: a highlight there would be the one
 * thing on this page capable of pulling an 80px word down toward AA.
 */
function drawSphere(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  hero: boolean,
) {
  const gradient = ctx.createRadialGradient(
    cx + radius * (hero ? 0.2 : -0.36),
    cy - radius * (hero ? 0.26 : 0.42),
    radius * 0.04,
    cx,
    cy,
    radius * 1.04,
  );

  if (hero) {
    gradient.addColorStop(0, "#3d5877");
    gradient.addColorStop(0.38, "#1f3244");
    gradient.addColorStop(0.72, "#111e29");
    gradient.addColorStop(1, "#0a1119");
  } else {
    gradient.addColorStop(0, "#38506a");
    gradient.addColorStop(0.4, "#20303f");
    gradient.addColorStop(0.78, "#111d27");
    gradient.addColorStop(1, "#0b131b");
  }

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * The hero network: every connection at once, radiating from Dubai.
 *
 * Structurally different from the outreach globe's connections, which fan out
 * from whichever market is active. Here the hub is fixed - the whole graphic is
 * a statement about one gateway reaching outward, so the arcs are permanent and
 * the active market only brightens the one that belongs to it.
 *
 * Each arc is stroked twice: a wide, very faint pass that reads as bloom, then
 * the hairline itself. That is what makes a 1px line look lit rather than drawn,
 * and it costs one extra stroke rather than a shadow blur.
 */
function drawHubNetwork(
  ctx: CanvasRenderingContext2D,
  rot: Rotation,
  cx: number,
  cy: number,
  radius: number,
  activeIndex: number,
  progress: number,
  clipX: number,
) {
  const hub = globeMarkets.find((market) => market.code === "AE");
  if (!hub) return;

  const activeCode = globeMarkets[activeIndex]?.code;
  const internationalActive = globeMarkets[activeIndex]?.international;

  ctx.lineCap = "round";

  /*
    Arcs are batched into three paths - quiet, active, outbound - and each path
    is stroked twice: once wide and faint for bloom, once at a hairline. Stroked
    per arc instead, this was 24 stroke calls a frame against 6, and the
    difference was most of the hero's frame budget.
  */
  const trace = (points: number[][], altitude: number, drawnFraction: number) => {
    const limit = Math.max(2, Math.floor(points.length * drawnFraction));
    let started = false;

    for (let i = 0; i < limit; i += 1) {
      const t = i / (points.length - 1);
      const lift = altitude * Math.sin(Math.PI * t);

      project(points[i][0], points[i][1], rot, cx, cy, radius, P, lift);

      // The westbound legs are geographically correct and visually wrong: they
      // run left across the whole frame and end up under the headline. Cutting
      // them at the type column keeps the reach honest - the arc still leaves
      // the region - without drawing line work behind words.
      if (P.sx < clipX || P.z <= -0.28) {
        started = false;
        continue;
      }

      if (started) ctx.lineTo(P.sx, P.sy);
      else {
        ctx.moveTo(P.sx, P.sy);
        started = true;
      }
    }
  };

  const paint = (alpha: number) => {
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = `rgba(${BRONZE},${alpha * 0.22})`;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${BRONZE},${alpha})`;
    ctx.stroke();
  };

  // Quiet Gulf legs.
  ctx.beginPath();
  for (const market of globeMarkets) {
    if (market.international || market.code === hub.code || market.code === activeCode) continue;
    trace(cachedArc(hub.lon, hub.lat, market.lon, market.lat, 26), 0.06, 1);
  }
  paint(0.34);

  // The active leg, drawn in as the market changes.
  const activeMarket = globeMarkets[activeIndex];
  if (activeMarket && !activeMarket.international && activeMarket.code !== hub.code) {
    ctx.beginPath();
    trace(cachedArc(hub.lon, hub.lat, activeMarket.lon, activeMarket.lat, 26), 0.06, progress);
    paint(0.78);
  }

  // Outbound legs. Lifted well clear so they read as leaving the region.
  ctx.beginPath();
  for (const target of internationalArcs) {
    trace(
      cachedArc(hub.lon, hub.lat, target.lon, target.lat, 54),
      0.28,
      internationalActive ? progress : 1,
    );
  }
  paint(internationalActive ? 0.7 : 0.3);

  // The hub itself: a warm bloom over Dubai, which is the brightest thing on
  // the sphere and the point every arc leaves from.
  project(hub.lon, hub.lat, rot, cx, cy, radius, N);
  if (N.z > 0.02) {
    const strength = Math.min(1, N.z * 2.6);
    const bloom = ctx.createRadialGradient(N.sx, N.sy, 0, N.sx, N.sy, radius * 0.115);
    bloom.addColorStop(0, `rgba(${WARM},${0.42 * strength})`);
    bloom.addColorStop(0.35, `rgba(${WARM},${0.16 * strength})`);
    bloom.addColorStop(1, `rgba(${WARM},0)`);

    ctx.fillStyle = bloom;
    ctx.beginPath();
    ctx.arc(N.sx, N.sy, radius * 0.16, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(N.sx, N.sy, 2.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,238,210,${0.95 * strength})`;
    ctx.fill();
  }
}

/**
 * Hairline leaders from each market to its standing label.
 *
 * Drawn here rather than as DOM elements because one end of every line moves
 * with the globe: the marker end is a projected point that changes each frame,
 * and only the label end is fixed. The active market's leader is brought up a
 * step, which is what ties the card to the dot it belongs to.
 */
function drawLeaders(
  ctx: CanvasRenderingContext2D,
  rot: Rotation,
  cx: number,
  cy: number,
  radius: number,
  anchors: Record<string, { x: number; y: number }>,
  activeIndex: number,
) {
  ctx.lineWidth = 1;

  globeMarkets.forEach((market, index) => {
    const anchor = anchors[market.code];
    if (!anchor) return;

    // The international step has no node of its own; its leader runs from the
    // Gulf, which is where the outbound arcs leave from.
    project(market.lon, market.lat, rot, cx, cy, radius, P);
    if (P.z <= 0.04) return;

    const depth = Math.min(1, (P.z - 0.04) * 3);
    const isActive = index === activeIndex;

    ctx.beginPath();
    ctx.moveTo(P.sx, P.sy);
    ctx.lineTo(anchor.x, anchor.y);
    ctx.strokeStyle = `rgba(${BRONZE},${(isActive ? 0.42 : 0.16) * depth})`;
    ctx.stroke();

    // A tick at the label end, so the line resolves into the text.
    ctx.beginPath();
    ctx.arc(anchor.x, anchor.y, isActive ? 2.2 : 1.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${BRONZE},${(isActive ? 0.85 : 0.45) * depth})`;
    ctx.fill();
  });
}

function drawGraticule(
  ctx: CanvasRenderingContext2D,
  rot: Rotation,
  cx: number,
  cy: number,
  radius: number,
  compact: boolean,
  hero: boolean,
) {
  const meridianStep = compact ? 40 : 25;
  const parallelStep = compact ? 30 : 20;
  const sample = compact ? 5 : 3;

  // Barely there in the hero. The grid is structure, not subject; against a
  // night earth it should register only once you look for it.
  ctx.strokeStyle = `rgba(${IVORY},${hero ? 0.045 : 0.1})`;
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
/**
 * Per-frame projection buffer for the coastline set: sx, sy, z per vertex.
 *
 * Module-level and reused, because the alternative is allocating a 4,700-float
 * array sixty times a second. Sized once, on the first frame the geometry
 * arrives.
 */
let landBuffer: Float32Array | null = null;

function projectLand(
  lines: readonly (readonly number[])[],
  rot: Rotation,
  cx: number,
  cy: number,
  radius: number,
) {
  let vertices = 0;
  for (const line of lines) vertices += line.length / 2;

  if (!landBuffer || landBuffer.length !== vertices * 3) {
    landBuffer = new Float32Array(vertices * 3);
  }

  let k = 0;
  for (const line of lines) {
    for (let i = 0; i < line.length; i += 2) {
      project(line[i], line[i + 1], rot, cx, cy, radius, P);
      landBuffer[k] = P.sx;
      landBuffer[k + 1] = P.sy;
      landBuffer[k + 2] = P.z;
      k += 3;
    }
  }
}

/**
 * Land as filled masses.
 *
 * Every entry in the coastline set is a closed ring - the source has no shared
 * borders between separate landmasses, so each one is a single complete arc -
 * which is what makes filling them possible at all.
 *
 * Rings that cross the horizon are closed with a chord across the visible run
 * rather than along the horizon arc. That is not strictly correct, and on a
 * bright globe it would show; here the terminator has the limb down to near
 * black by the time a chord could be spotted, and the alternative is a full
 * circle-clipping routine for a difference no one can see.
 */
function drawLandmass(ctx: CanvasRenderingContext2D, lines: readonly (readonly number[])[]) {
  const buffer = landBuffer;
  if (!buffer) return;

  ctx.fillStyle = "rgba(27,40,54,0.55)";
  ctx.beginPath();

  let k = 0;
  for (const line of lines) {
    let started = false;

    for (let i = 0; i < line.length; i += 2, k += 3) {
      if (buffer[k + 2] > 0) {
        if (started) ctx.lineTo(buffer[k], buffer[k + 1]);
        else {
          ctx.moveTo(buffer[k], buffer[k + 1]);
          started = true;
        }
      } else if (started) {
        ctx.closePath();
        started = false;
      }
    }

    if (started) ctx.closePath();
  }

  ctx.fill();
}

/**
 * City lights.
 *
 * Placed on coastline vertices rather than on a population raster, which is a
 * cheat that happens to be true: on any night image of the earth the lights sit
 * overwhelmingly on the coasts and the great river valleys. Two tiers, batched
 * so the whole field costs two fill styles rather than one per point, and
 * `fillRect` rather than `arc` because at one pixel the difference is invisible
 * and the cost is not.
 *
 * Jitter is derived from the vertex index, never from `Math.random`, so the
 * field is identical on every frame and does not shimmer.
 */
function drawCityLights(ctx: CanvasRenderingContext2D, lines: readonly (readonly number[])[]) {
  const buffer = landBuffer;
  if (!buffer) return;

  // Three tiers, each one pass, so the whole field costs three fill styles
  // rather than one per point. `fillRect` rather than `arc` because at one
  // pixel the difference is invisible and the cost is not.
  let k = 0;
  let index = 0;

  ctx.fillStyle = `rgba(${WARM},0.5)`;
  for (const line of lines) {
    for (let i = 0; i < line.length; i += 2, k += 3, index += 1) {
      if (index % 3 !== 0) continue;
      if (buffer[k + 2] > 0.06) ctx.fillRect(buffer[k], buffer[k + 1], 1, 1);
    }
  }

  // Bright tier: a scattering of larger points, reading as the cities big
  // enough to see from orbit.
  k = 0;
  index = 0;
  ctx.fillStyle = `rgba(${WARM},0.9)`;
  for (const line of lines) {
    for (let i = 0; i < line.length; i += 2, k += 3, index += 1) {
      if (index % 9 !== 0) continue;
      if (buffer[k + 2] > 0.12) ctx.fillRect(buffer[k] - 0.5, buffer[k + 1] - 0.5, 2, 2);
    }
  }

  // The Gulf and its neighbours burn brighter than the rest of the field. Not
  // a claim about anything - it is where the page is looking, and a night earth
  // that is uniformly lit gives the eye nowhere to land.
  k = 0;
  ctx.fillStyle = "rgba(255,222,178,0.95)";
  for (const line of lines) {
    for (let i = 0; i < line.length; i += 2, k += 3) {
      const lon = line[i];
      const lat = line[i + 1];
      if (lon < 25 || lon > 85 || lat < 5 || lat > 45) continue;
      if (buffer[k + 2] > 0.12) ctx.fillRect(buffer[k] - 1, buffer[k + 1] - 1, 2.4, 2.4);
    }
  }
}

function drawCoastlines(
  ctx: CanvasRenderingContext2D,
  lines: readonly (readonly number[])[],
  hero: boolean,
) {
  const buffer = landBuffer;
  if (!buffer) return;

  ctx.strokeStyle = `rgba(${IVORY},${hero ? 0.2 : 0.38})`;
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.beginPath();

  let k = 0;
  for (const line of lines) {
    let started = false;

    for (let i = 0; i < line.length; i += 2, k += 3) {
      if (buffer[k + 2] > 0) {
        if (started) ctx.lineTo(buffer[k], buffer[k + 1]);
        else {
          ctx.moveTo(buffer[k], buffer[k + 1]);
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
 * Soft bronze wash over the Gulf.
 *
 * Centred on the region rather than on any one market, and drawn under the
 * terminator so it dims with the rest of the sphere as the region turns toward
 * the limb - a highlight that stayed at full strength on the edge of the disc
 * would read as a sticker rather than as part of the surface.
 */
function drawRegionWash(
  ctx: CanvasRenderingContext2D,
  rot: Rotation,
  cx: number,
  cy: number,
  radius: number,
) {
  // Roughly the centre of the six markets.
  project(51.5, 25.5, rot, cx, cy, radius, P);
  if (P.z <= 0.06) return;

  const strength = Math.min(1, (P.z - 0.06) * 2.4);
  const reach = radius * 0.36;

  const gradient = ctx.createRadialGradient(P.sx, P.sy, 0, P.sx, P.sy, reach);
  gradient.addColorStop(0, `rgba(${BRONZE},${0.22 * strength})`);
  gradient.addColorStop(0.5, `rgba(${BRONZE},${0.085 * strength})`);
  gradient.addColorStop(1, `rgba(${BRONZE},0)`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(P.sx, P.sy, reach, 0, Math.PI * 2);
  ctx.fill();
}

/** Shades the sphere away from the light, so the limb rolls off. */
function drawTerminator(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  hero: boolean,
) {
  const gradient = ctx.createRadialGradient(
    cx + radius * (hero ? 0.18 : -0.32),
    cy - radius * (hero ? 0.24 : 0.4),
    radius * 0.1,
    cx + radius * (hero ? 0.06 : -0.12),
    cy - radius * (hero ? 0.06 : 0.14),
    radius * 1.55,
  );
  gradient.addColorStop(0, "rgba(5,9,14,0)");
  gradient.addColorStop(0.58, `rgba(5,9,14,${hero ? 0.28 : 0.26})`);
  gradient.addColorStop(1, `rgba(4,7,11,${hero ? 0.8 : 0.76})`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
}

/** Edge light: bronze where the light hits, gone by the far side. */
function drawRim(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  hero: boolean,
) {
  const gradient = ctx.createLinearGradient(
    cx - radius,
    cy - radius,
    cx + radius,
    cy + radius * 0.85,
  );
  gradient.addColorStop(0, `rgba(${BRONZE},${rimAlpha(hero, 0.62)})`);
  gradient.addColorStop(0.4, `rgba(${BRONZE},${rimAlpha(hero, 0.24)})`);
  gradient.addColorStop(0.78, `rgba(150,168,190,${rimAlpha(hero, 0.12)})`);
  gradient.addColorStop(1, `rgba(150,168,190,${rimAlpha(hero, 0.04)})`);

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
  withLabel: boolean,
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
    if (isActive && withLabel) {
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
