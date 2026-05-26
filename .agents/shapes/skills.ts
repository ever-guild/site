function hash(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Generates a point for a terminal prompt icon `>_`.
 *
 * Chevron `>`: two thick diagonal strokes meeting at a point on the right,
 * centered around y = +1.0 in the upper half. Opening angle ≈ 59°.
 *
 * Underscore `_`: thick horizontal stroke on the lower half around y = –1.6,
 * clearly separated from the chevron by > 1.0 unit of vertical space.
 *
 * @param path  0..1 normalized position along the entire shape
 * @param seed  random seed for perpendicular stroke thickness
 * @returns [x, y, z] with z always 0
 */
export function terminalPoint(path: number, seed: number): [number, number, number] {
  const t = Math.max(0, Math.min(1, path));

  // ~60/40 split between chevron (upper) and underscore (lower)
  if (t < 0.6) {
    const ct = t / 0.6;

    // Top diagonal of chevron: (-1.9, 2.3) → (0.4, 1.0)
    if (ct < 0.5) {
      const segT = ct / 0.5;
      const x0 = -1.9, y0 = 2.3;
      const x1 = 0.4, y1 = 1.0;
      const dx = x1 - x0;
      const dy = y1 - y0;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len;
      const ny = dx / len;
      const rand = hash(seed + t * 997.3);
      const offset = (rand - 0.5) * 0.3; // ±0.15
      const x = lerp(x0, x1, segT) + nx * offset;
      const y = lerp(y0, y1, segT) + ny * offset;
      return [x, y, 0];
    }
    // Bottom diagonal of chevron: (-1.9, -0.3) → (0.4, 1.0)
    else {
      const segT = (ct - 0.5) / 0.5;
      const x0 = -1.9, y0 = -0.3;
      const x1 = 0.4, y1 = 1.0;
      const dx = x1 - x0;
      const dy = y1 - y0;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len;
      const ny = dx / len;
      const rand = hash(seed + t * 997.3 + 1.0);
      const offset = (rand - 0.5) * 0.3;
      const x = lerp(x0, x1, segT) + nx * offset;
      const y = lerp(y0, y1, segT) + ny * offset;
      return [x, y, 0];
    }
  }
  // Underscore: (-1.9, -1.6) → (1.5, -1.6)
  else {
    const ut = (t - 0.6) / 0.4;
    const x0 = -1.9, y0 = -1.6;
    const x1 = 1.5, y1 = -1.6;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len; // 0
    const ny = dx / len;  // 1
    const rand = hash(seed + t * 997.3 + 2.0);
    const offset = (rand - 0.5) * 0.3;
    const x = lerp(x0, x1, ut) + nx * offset;
    const y = lerp(y0, y1, ut) + ny * offset;
    return [x, y, 0];
  }
}
