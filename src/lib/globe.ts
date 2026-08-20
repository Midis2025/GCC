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
