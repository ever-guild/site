function fract(x: number): number {
  return x - Math.floor(x);
}

function hash(n: number): number {
  return fract(Math.sin(n * 127.1 + 311.7) * 43758.5453123);
}

function circlePoint(
  cx: number,
  cy: number,
  r: number,
  t: number
): [number, number] {
  const angle = 2 * Math.PI * t;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

function arcPoint(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
  t: number
): [number, number] {
  const angle = startAngle + (endAngle - startAngle) * t;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

export function teamPoint(path: number, seed: number): [number, number, number] {
  path = Math.max(0, Math.min(1, path));

  const rHead = 0.9;
  const rBody = 1.3;
  const bodyOffset = 0.9;

  const persons = [
    { cx: -2.0, cy: -0.2, scale: 1.0 },
    { cx: 0.0, cy: 0.5, scale: 1.1 },
    { cx: 2.0, cy: -0.2, scale: 1.0 },
  ];

  const headArc = 2 * Math.PI * rHead;
  const bodyArc = Math.PI * rBody;

  const lengths = persons.map((p) => p.scale * (headArc + bodyArc));
  const totalLength = lengths.reduce((sum, v) => sum + v, 0);

  let cumulative = 0;
  let personIdx = 0;
  let local = 0;

  for (let i = 0; i < persons.length; i++) {
    const start = cumulative;
    cumulative += lengths[i] / totalLength;
    const end = cumulative;

    if (path < end || i === persons.length - 1) {
      personIdx = i;
      local = (path - start) / (end - start);
      break;
    }
  }

  const p = persons[personIdx];
  const headShare = headArc / (headArc + bodyArc);
  const bodyShare = 1 - headShare;

  const rand = hash(seed * 37.13 + path * 1000.0);
  const dr = (rand - 0.5) * 0.24; // ±0.12

  let x: number;
  let y: number;

  if (local < headShare) {
    const t = local / headShare;
    const r = rHead * p.scale + dr;
    [x, y] = circlePoint(p.cx, p.cy, r, t);
  } else {
    const t = (local - headShare) / bodyShare;
    const r = rBody * p.scale + dr;
    const bx = p.cx;
    const by = p.cy - bodyOffset * p.scale;
    [x, y] = arcPoint(bx, by, r, Math.PI, 2 * Math.PI, t);
  }

  return [x, y, 0];
}
