function hash1f(n: number): number {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

export function envelopePoint(path: number, seed: number): [number, number, number] {
  const w = 5.0;
  const h = 3.0;
  const halfW = w * 0.5;
  const halfH = h * 0.5;
  const flapApexY = halfH - h * 0.4;
  const thick = 0.12;

  const p = path - Math.floor(path);
  const s = seed + 0.0;

  const BORDER_SHARE = 0.30;
  const FILL_SHARE = 0.15;

  let x = 0.0;
  let y = 0.0;

  if (p < BORDER_SHARE) {
    const t = p / BORDER_SHARE;
    const perimeter = 2.0 * (w + h);
    const dist = t * perimeter;

    let nx = 0.0;
    let ny = 0.0;

    if (dist < w) {
      x = -halfW + dist;
      y = -halfH;
      nx = 0.0;
      ny = -1.0;
    } else if (dist < w + h) {
      x = halfW;
      y = -halfH + (dist - w);
      nx = 1.0;
      ny = 0.0;
    } else if (dist < w + h + w) {
      x = halfW - (dist - w - h);
      y = halfH;
      nx = 0.0;
      ny = 1.0;
    } else {
      x = -halfW;
      y = halfH - (dist - w - h - w);
      nx = -1.0;
      ny = 0.0;
    }

    const off = (hash1f(s * 17.31 + p * 31.13) - 0.5) * 2.0 * thick;
    x += nx * off;
    y += ny * off;
  } else if (p < BORDER_SHARE + FILL_SHARE) {
    const t = (p - BORDER_SHARE) / FILL_SHARE;
    x = -halfW + 0.2 + hash1f(s * 13.71 + t * 47.29) * (w - 0.4);
    y = -halfH + 0.2 + hash1f(s * 29.13 + t * 51.79) * (h - 0.4);

    const offX = (hash1f(s * 53.17 + t * 19.71) - 0.5) * 2.0 * thick;
    const offY = (hash1f(s * 61.29 + t * 29.31) - 0.5) * 2.0 * thick;
    x += offX;
    y += offY;
  } else {
    const t = (p - BORDER_SHARE - FILL_SHARE) / (1.0 - BORDER_SHARE - FILL_SHARE);

    if (t < 0.5) {
      const lt = t * 2.0;
      x = -halfW + lt * halfW;
      y = halfH + lt * (flapApexY - halfH);

      const dx = halfW;
      const dy = flapApexY - halfH;
      const len = Math.sqrt(dx * dx + dy * dy);
      const px = -dy / len;
      const py = dx / len;

      const off = (hash1f(s * 37.91 + p * 43.17) - 0.5) * 2.0 * thick;
      x += px * off;
      y += py * off;
    } else {
      const rt = (t - 0.5) * 2.0;
      x = halfW - rt * halfW;
      y = halfH + rt * (flapApexY - halfH);

      const dx = -halfW;
      const dy = flapApexY - halfH;
      const len = Math.sqrt(dx * dx + dy * dy);
      const px = -dy / len;
      const py = dx / len;

      const off = (hash1f(s * 37.91 + p * 43.17) - 0.5) * 2.0 * thick;
      x += px * off;
      y += py * off;
    }
  }

  return [x, y, 0.0];
}
