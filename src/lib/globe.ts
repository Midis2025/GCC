/**
 * Orthographic globe projection.
 *
 * The whole 3D layer of the outreach globe is these ~90 lines: geographic
 * coordinates go in, rotated unit-sphere cartesians and screen positions come
 * out. There is no scene graph, no camera and no renderer - an orthographic
 * projection of a unit sphere is a rotation followed by dropping the depth
 * component, and the depth component is exactly the value needed for occlusion,
 * so it is kept rather than discarded.
 *
 * Everything here is pure and allocation-light: `project` is called on the
 * order of ten thousand times per frame, so it writes into a caller-owned
 * result object instead of returning a fresh one.
 */

export const DEG = Math.PI / 180;

/** Globe orientation. Both in radians. */
export interface Rotation {
  /** Yaw. The longitude brought to the centre of the disc. */
  lambda: number;
  /** Pitch. Positive tilts the northern hemisphere toward the viewer. */
  phi: number;
}

/** A point on the unit sphere, in view space. */
export interface Vec3 {
  x: number;
  y: number;
  /** Positive is toward the viewer - so `z > 0` is the visible hemisphere. */
  z: number;
}

/** A projected point: screen pixels plus the depth it came from. */
export interface Projected extends Vec3 {
  sx: number;
  sy: number;
}

/**
 * Geographic coordinates to a rotated unit-sphere cartesian.
 *
 * Yaw is folded into the longitude before the trig rather than applied as a
 * separate matrix, which removes one rotation per point.
 */
export function toVec3(lon: number, lat: number, rotation: Rotation, out: Vec3): Vec3 {
  const lambda = lon * DEG + rotation.lambda;
  const phi = lat * DEG;

  const cosPhi = Math.cos(phi);
  const x = cosPhi * Math.sin(lambda);
  const y = Math.sin(phi);
  const z = cosPhi * Math.cos(lambda);

  // Pitch about the view-space X axis.
  const cosP = Math.cos(rotation.phi);
  const sinP = Math.sin(rotation.phi);

  out.x = x;
  out.y = y * cosP - z * sinP;
  out.z = y * sinP + z * cosP;

  return out;
}

/**
 * Geographic coordinates to screen pixels.
 *
 * `altitude` lifts the point off the surface as a fraction of the radius, which
 * is what gives the outbound connection arcs their curve away from the globe.
 */
export function project(
  lon: number,
  lat: number,
  rotation: Rotation,
  cx: number,
  cy: number,
  radius: number,
  out: Projected,
  altitude = 0,
): Projected {
  toVec3(lon, lat, rotation, out);

  const r = radius * (1 + altitude);
  out.sx = cx + out.x * r;
  // Screen Y grows downward; north should be up.
  out.sy = cy - out.y * r;

  return out;
}

/** Great-circle interpolation between two geographic points, as unit vectors. */
export function greatCircle(
  fromLon: number,
  fromLat: number,
  toLon: number,
  toLat: number,
  steps: number,
): number[][] {
  const a = unit(fromLon, fromLat);
  const b = unit(toLon, toLat);

  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);

  const points: number[][] = [];

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;

    // Spherical linear interpolation, degenerating to linear for near-identical
    // endpoints where sin(omega) approaches zero and the ratios blow up.
    let x: number;
    let y: number;
    let z: number;

    if (sinOmega < 1e-6) {
      x = a[0] + (b[0] - a[0]) * t;
      y = a[1] + (b[1] - a[1]) * t;
      z = a[2] + (b[2] - a[2]) * t;
    } else {
      const wa = Math.sin((1 - t) * omega) / sinOmega;
      const wb = Math.sin(t * omega) / sinOmega;
      x = a[0] * wa + b[0] * wb;
      y = a[1] * wa + b[1] * wb;
      z = a[2] * wa + b[2] * wb;
    }

    // Back to lon/lat so the caller can project it like any other point.
    points.push([Math.atan2(x, z) / DEG, Math.asin(Math.max(-1, Math.min(1, y))) / DEG]);
  }

  return points;
}

function unit(lon: number, lat: number): [number, number, number] {
  const lambda = lon * DEG;
  const phi = lat * DEG;
  const cosPhi = Math.cos(phi);
  return [cosPhi * Math.sin(lambda), Math.sin(phi), cosPhi * Math.cos(lambda)];
}

/**
 * Shortest signed angular distance from `a` to `b`, in radians.
 *
 * Rotating from 170E to 170W is a 20-degree turn, not a 340-degree one. Without
 * this the globe takes the long way round whenever a transition crosses the
 * antimeridian.
 */
export function shortestAngle(a: number, b: number): number {
  let delta = (b - a) % (Math.PI * 2);
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta < -Math.PI) delta += Math.PI * 2;
  return delta;
}

/**
 * Frame-rate independent exponential approach.
 *
 * `smoothing` is the fraction of the remaining distance left after one second,
 * so the easing feels identical at 60Hz and 120Hz. A plain `value += delta * k`
 * would run twice as fast on a 120Hz display.
 */
export function approach(current: number, target: number, smoothing: number, dt: number): number {
  return current + (target - current) * (1 - Math.pow(smoothing, dt));
}

/* ==========================================================================
   GLOW GEOMETRY
   ========================================================================== */

/**
 * How far the atmosphere reaches past the limb, in radii.
 *
 * Lives here rather than in the renderer because it settles two things that
 * have to agree, and which are decided in two different files: how large the
 * cached glow layer is, and how large the CANVAS ELEMENT has to be for that
 * glow to fade out rather than stop.
 */
export const GLOW_REACH = 1.32;

/**
 * How close the camera is allowed to come, as a multiple of the disc's radius.
 *
 * `ZOOM_MIN` is 1 and is the approved view, so a section nobody has scrolled
 * into is exactly as it was drawn.
 *
 * The ceiling is set by the canvas, not by taste. `glowBox` sizes the element
 * to the glow, which puts its sides at `GLOW_REACH` radii from the centre - so
 * at a zoom of 1.32 the limb reaches the edge of the element, and past that the
 * disc would be cut off square. 1.3 stops just short of it: the sphere itself
 * is never cropped at any point in the travel, and only the outer, near
 * transparent part of the halo tightens as the camera closes in, which is what
 * approaching an atmosphere looks like anyway.
 *
 * Lives here beside `GLOW_REACH` because that is the number it is derived from,
 * and because the section that drives the camera must not have to import
 * anything from the renderer - the renderer is a lazily loaded chunk.
 */
export const ZOOM_MIN = 1;
export const ZOOM_MAX = 1.3;

/** Where a disc sits inside a box, as fractions of that box. */
export interface Disc {
  cx: number;
  cy: number;
  /** Of the box's shorter side. */
  radius: number;
}

/**
 * The canvas a disc placement actually needs, given that the disc carries a
 * glow around it.
 *
 * A canvas sized to the globe rather than to the globe's light guillotines the
 * falloff at the element's edge. The gradient is still mid-strength there, so
 * what lands on the page is a dead-straight step in a soft field - down one
 * side of the disc, up the other - and the eye reads a pair of straight edges
 * around a bright centre as a panel boundary. That is the seam, and no amount
 * of tuning the gradient removes it: the cut is rectangular and the light is
 * radial, so they can never agree.
 *
 * So the canvas becomes the glow's bounding box instead of the globe's. The
 * returned `inset` positions it against the layout box the caller already has
 * - negative on any side the glow overruns, positive on any side it does not,
 * so the element is always exactly as big as the light and never larger.
 *
 * Because that box is square and centred on the disc by construction, `frame`
 * is the same for every caller: the disc keeps precisely the size and position
 * the placement asked for, and only the transparent room around it changes.
 */
export function glowBox(disc: Disc) {
  const reach = disc.radius * GLOW_REACH;
  // Negative where the glow overruns the layout box.
  const inset = (overrun: number) => `${(-overrun * 100).toFixed(4)}%`;

  return {
    inset: {
      top: inset(reach - disc.cy),
      right: inset(reach - (1 - disc.cx)),
      bottom: inset(reach - (1 - disc.cy)),
      left: inset(reach - disc.cx),
    },
    /** The same disc, restated against the enlarged canvas. */
    frame: { cx: 0.5, cy: 0.5, radius: 1 / (2 * GLOW_REACH) },
  } as const;
}
