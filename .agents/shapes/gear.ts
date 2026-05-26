function fract(n: number): number {
  return n - Math.floor(n);
}

function hash01(n: number): number {
  return fract(Math.sin(n * 12.9898 + 78.233) * 43758.5453123);
}

export function gearPoint(path: number, seed: number): [number, number, number] {
  const t = fract(path);
  const rVar = (hash01(seed) - 0.5) * 0.2; // ±0.1 thickness variation

  if (t < 0.35) {
    // Central hub: annulus from r = 0.3 to 1.0
    const u = t / 0.35;
    // Area-uniform distribution in annulus
    const rBase = Math.sqrt(0.09 + u * 0.91);
    const r = Math.max(0.05, rBase + rVar);
    const theta = hash01(seed + 1.0) * Math.PI * 2;
    return [Math.cos(theta) * r, Math.sin(theta) * r, 0];
  }

  if (t < 0.95) {
    // 6 rectangular teeth
    const v = (t - 0.35) / 0.6;
    const toothIdx = Math.min(5, Math.floor(v * 6));
    const u = v * 6 - toothIdx; // 0..1 within the tooth

    const angle = toothIdx * (Math.PI / 3);
    // Local rectangle: radial x from 1.0 to 2.2, tangential y ±0.35
    const xLocal = 1.0 + u * 1.2 + rVar;
    const yLocal = (hash01(seed + 2.0 + toothIdx * 7.13) * 2 - 1) * 0.35;

    const x = xLocal * Math.cos(angle) - yLocal * Math.sin(angle);
    const y = xLocal * Math.sin(angle) + yLocal * Math.cos(angle);
    return [x, y, 0];
  }

  // Inner hole rim: circle r ≈ 0.3
  const r = Math.max(0.05, 0.3 + rVar);
  const theta = hash01(seed + 9.0) * Math.PI * 2;
  return [Math.cos(theta) * r, Math.sin(theta) * r, 0];
}
