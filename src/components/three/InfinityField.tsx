import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface InfinityFieldProps {
  reducedMotion?: boolean;
  opacity?: number;
  morphTarget?: number;
}

interface ParticleData {
  positions: Float32Array;
  aboutPositions: Float32Array;
  teamPositions: Float32Array;
  servicesPositions: Float32Array;
  skillsPositions: Float32Array;
  contactPositions: Float32Array;
  colors: Float32Array;
  seeds: Float32Array;
  sizes: Float32Array;
  alphas: Float32Array;
  paths: Float32Array;
}

const MAIN_PARTICLES = 2200;
const HALO_PARTICLES = 900;
const MIST_PARTICLES = 420;
const TOTAL_PARTICLES = MAIN_PARTICLES + HALO_PARTICLES + MIST_PARTICLES;

const teal = new THREE.Color('#4db8cc');
const deepTeal = new THREE.Color('#002835');
const gold = new THREE.Color('#F1B800');
const warmWhite = new THREE.Color('#FFE79C');

const vertexShader = `
  attribute vec3 aAboutPosition;
  attribute vec3 aTeamPosition;
  attribute vec3 aServicesPosition;
  attribute vec3 aSkillsPosition;
  attribute vec3 aContactPosition;
  attribute vec3 color;
  attribute float aSeed;
  attribute float aSize;
  attribute float aAlpha;
  attribute float aPath;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uOpacity;
  uniform float uMorph;

  varying vec3 vColor;
  varying float vAlpha;

  vec3 getShape(float idx) {
    if (idx < 0.5) return position;
    if (idx < 1.5) return aAboutPosition;
    if (idx < 2.5) return aTeamPosition;
    if (idx < 3.5) return aServicesPosition;
    if (idx < 4.5) return aSkillsPosition;
    return aContactPosition;
  }

  void main() {
    float fromIdx = floor(uMorph);
    float t = fract(uMorph);
    float stagger = aSeed * 0.2 + fract(aPath * 1.61803398875) * 0.28;
    float localT = clamp((t - stagger * 0.42) / 0.82, 0.0, 1.0);
    float eased = localT * localT * (3.0 - 2.0 * localT);
    float transition = sin(localT * 3.14159265359);

    vec3 start = getShape(fromIdx);
    vec3 end = getShape(fromIdx + 1.0);
    vec3 p = mix(start, end, eased);
    vec3 travel = end - start;
    vec2 radial = normalize(p.xy + vec2(0.0001));

    float slowSeed = aSeed * 6.28318530718;
    float current = uTime * 0.36;
    vec2 travelDir = normalize(travel.xy + radial * 0.2 + vec2(0.0001));
    vec2 tangent = vec2(-travelDir.y, travelDir.x);
    float magnetBand = (1.0 - smoothstep(0.0, 0.16, abs(localT - aPath)));
    float magneticPull = transition * (0.24 + magnetBand * 0.58);
    float magneticSide = sin(slowSeed + fromIdx * 1.7);
    vec2 magneticRail = mix(start.xy, end.xy, localT)
      + tangent * magneticSide * (0.72 + aSeed * 0.54) * transition;

    p.xy = mix(p.xy, magneticRail, magneticPull);
    p.xy += travelDir * transition * (0.24 + aSeed * 0.34);
    p.xy += tangent * sin(localT * 3.14159265359 + slowSeed) * transition * 0.18;
    p.z += transition * (1.05 + aSeed * 1.35 + magnetBand * 1.85)
      + sin(slowSeed + t * 6.28318530718) * transition * 0.5;

    p.x += sin(current + slowSeed * 1.7) * 0.06;
    p.y += cos(current * 1.32 + slowSeed) * 0.08;
    p.z += sin(current * 1.8 + slowSeed * 1.13) * 0.24;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    float shimmer = 0.72 + 0.28 * sin(uTime * (1.15 + aSeed * 0.7) + slowSeed * 4.2);
    float runner = smoothstep(
      0.9,
      1.0,
      sin(aPath * 12.56637061436 - uTime * 1.45) * 0.5 + 0.5
    );
    float sweep = magnetBand * transition;

    vColor = color + runner * vec3(0.42, 0.25, 0.02) + sweep * vec3(0.7, 0.45, 0.02);
    vAlpha = aAlpha * (shimmer + runner * 0.34 + sweep * 0.48) * uOpacity;

    gl_PointSize = aSize * uPixelRatio * (shimmer + transition * 0.2 + sweep * 0.18) * (13.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float core = smoothstep(0.5, 0.0, dist);
    float glow = smoothstep(0.5, 0.12, dist) * 0.38;
    float alpha = (core + glow) * vAlpha;

    if (alpha < 0.01) {
      discard;
    }

    gl_FragColor = vec4(vColor, alpha);
  }
`;

function random(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function signedRandom(seed: number): number {
  return random(seed) * 2 - 1;
}

function fract(x: number): number {
  return x - Math.floor(x);
}

function hash(n: number): number {
  return fract(Math.sin(n * 127.1 + 311.7) * 43758.5453123);
}

function hash01(n: number): number {
  return fract(Math.sin(n * 12.9898 + 78.233) * 43758.5453123);
}

function hash1f(n: number): number {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function jitter(seed: number, amount: number): number {
  return (hash1f(seed) - 0.5) * amount;
}

function linePoint(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  t: number,
  seed: number,
  thickness = 0.08,
): [number, number] {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.max(0.0001, Math.sqrt(dx * dx + dy * dy));
  const nx = -dy / len;
  const ny = dx / len;
  const offset = jitter(seed * 17.37 + t * 41.19, thickness);

  return [
    lerp(x0, x1, t) + nx * offset,
    lerp(y0, y1, t) + ny * offset,
  ];
}

function ringPoint(radius: number, t: number, seed: number, thickness = 0.08): [number, number] {
  const angle = t * Math.PI * 2;
  const r = radius + jitter(seed * 11.71 + t * 29.31, thickness);

  return [Math.cos(angle) * r, Math.sin(angle) * r];
}

function polygonEdgePoint(sides: number, radius: number, t: number, seed: number): [number, number] {
  const edge = Math.min(sides - 1, Math.floor(t * sides));
  const local = t * sides - edge;
  const start = -Math.PI / 2 + (edge / sides) * Math.PI * 2;
  const end = -Math.PI / 2 + ((edge + 1) / sides) * Math.PI * 2;
  const x0 = Math.cos(start) * radius;
  const y0 = Math.sin(start) * radius;
  const x1 = Math.cos(end) * radius;
  const y1 = Math.sin(end) * radius;

  return linePoint(x0, y0, x1, y1, local, seed, 0.06);
}

function writeParticle(
  data: ParticleData,
  index: number,
  positions: [number, number, number][],
  color: THREE.Color,
  seed: number,
  size: number,
  alpha: number,
  path: number,
): void {
  const pointIndex = index * 3;

  data.positions[pointIndex] = positions[0][0];
  data.positions[pointIndex + 1] = positions[0][1];
  data.positions[pointIndex + 2] = positions[0][2];

  data.aboutPositions[pointIndex] = positions[1][0];
  data.aboutPositions[pointIndex + 1] = positions[1][1];
  data.aboutPositions[pointIndex + 2] = positions[1][2];

  data.teamPositions[pointIndex] = positions[2][0];
  data.teamPositions[pointIndex + 1] = positions[2][1];
  data.teamPositions[pointIndex + 2] = positions[2][2];

  data.servicesPositions[pointIndex] = positions[3][0];
  data.servicesPositions[pointIndex + 1] = positions[3][1];
  data.servicesPositions[pointIndex + 2] = positions[3][2];

  data.skillsPositions[pointIndex] = positions[4][0];
  data.skillsPositions[pointIndex + 1] = positions[4][1];
  data.skillsPositions[pointIndex + 2] = positions[4][2];

  data.contactPositions[pointIndex] = positions[5][0];
  data.contactPositions[pointIndex + 1] = positions[5][1];
  data.contactPositions[pointIndex + 2] = positions[5][2];

  data.colors[pointIndex] = color.r;
  data.colors[pointIndex + 1] = color.g;
  data.colors[pointIndex + 2] = color.b;
  data.seeds[index] = seed;
  data.sizes[index] = size;
  data.alphas[index] = alpha;
  data.paths[index] = path;
}

function infinityPoint(t: number): [number, number, number] {
  return [
    Math.sin(t) * 6.45,
    Math.sin(t * 2) * 2.45,
    Math.cos(t * 2) * 0.72,
  ];
}

function loopPoint(path: number, seed: number): [number, number, number] {
  const circleRatio = 0.74;
  const radius = 2.22;
  const centerX = -0.72;
  const centerY = 0.22;
  if (path < circleRatio) {
    const angle = (path / circleRatio) * Math.PI * 2;
    return [
      centerX + Math.cos(angle) * radius + signedRandom(seed) * 0.05,
      centerY + Math.sin(angle) * radius + signedRandom(seed + 1) * 0.05,
      signedRandom(seed + 2) * 0.08,
    ];
  }
  const handlePath = (path - circleRatio) / (1 - circleRatio);
  const handleAngle = -Math.PI / 4.5;
  const startX = centerX + Math.cos(handleAngle) * radius;
  const startY = centerY + Math.sin(handleAngle) * radius;
  const d = handlePath * 3.65;
  const perpAngle = handleAngle + Math.PI / 2;
  const perpOff = signedRandom(seed + 3) * 0.12;
  return [
    startX + Math.cos(handleAngle) * d + Math.cos(perpAngle) * perpOff + signedRandom(seed) * 0.05,
    startY + Math.sin(handleAngle) * d + Math.sin(perpAngle) * perpOff + signedRandom(seed + 1) * 0.05,
    signedRandom(seed + 2) * 0.08,
  ];
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

function teamPoint(path: number, seed: number): [number, number, number] {
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

function gearPoint(path: number, seed: number): [number, number, number] {
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

function terminalPoint(path: number, seed: number): [number, number, number] {
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

function guildTeamPoint(path: number, seed: number): [number, number, number] {
  const t = Math.max(0, Math.min(1, path));
  const scaleX = 0.24;
  const scaleY = 0.19;
  const yShift = 0.16;
  const toField = (x: number, y: number): [number, number] => [
    (x - 12) * scaleX,
    (12 - y) * scaleY + yShift,
  ];
  const rearSilhouettePoint = (side: -1 | 1, local: number): [number, number] => {
    if (local < 0.48) {
      const headT = local / 0.48;
      const angle = -1.36 + headT * 2.72;
      const radius = 3.35 + jitter(seed * 11.9 + local * 37.1, 0.18);

      return toField(
        12 + side * 4.65 + side * Math.cos(angle) * radius,
        8.1 + Math.sin(angle) * radius,
      );
    }

    const bodyT = (local - 0.48) / 0.52;
    const inv = 1 - bodyT;
    const rightX =
      inv * inv * inv * 20.75
      + 3 * inv * inv * bodyT * 20.45
      + 3 * inv * bodyT * bodyT * 18.7
      + bodyT * bodyT * bodyT * 16.7;
    const ySvg =
      inv * inv * inv * 18.35
      + 3 * inv * inv * bodyT * 15.25
      + 3 * inv * bodyT * bodyT * 12.9
      + bodyT * bodyT * bodyT * 11.95;

    return toField(side === 1 ? rightX : 24 - rightX, ySvg);
  };

  if (t < 0.34) {
    const local = t / 0.34;
    const angle = local * Math.PI * 2;
    const radius = 4.25 + jitter(seed * 13.7 + local * 31.1, 0.22);
    const [x, y] = toField(
      12 + Math.cos(angle) * radius,
      7.5 + Math.sin(angle) * radius,
    );

    return [x, y, jitter(seed * 9.23, 0.08)];
  }

  if (t < 0.6) {
    const local = (t - 0.34) / 0.26;
    const angle = local * Math.PI;
    const [x, y] = toField(
      12 + Math.cos(angle) * 6.6,
      18.8 - Math.sin(angle) * 6.3,
    );

    return [
      x + jitter(seed * 17.3 + local * 19.9, 0.045),
      y + jitter(seed * 21.1 + local * 23.7, 0.045),
      jitter(seed * 5.17, 0.08),
    ];
  }

  if (t < 0.8) {
    const local = (t - 0.6) / 0.2;
    const [x, y] = rearSilhouettePoint(1, local);

    return [x, y, jitter(seed * 3.31, 0.08)];
  }

  const local = (t - 0.8) / 0.2;
  const [x, y] = rearSilhouettePoint(-1, local);

  return [x, y, jitter(seed * 7.41, 0.08)];
}

function gearOutlinePoint(path: number, seed: number): [number, number, number] {
  const t = fract(path);
  const teeth = 8;

  if (t < 0.72) {
    const u = t / 0.72;
    const toothPhase = fract(u * teeth);
    const angle = u * Math.PI * 2 + Math.PI / teeth;
    const root = 1.62;
    const tip = 2.38;
    let radius = root;

    if (toothPhase < 0.18) {
      radius = root;
    } else if (toothPhase < 0.34) {
      radius = lerp(root, tip, (toothPhase - 0.18) / 0.16);
    } else if (toothPhase < 0.66) {
      radius = tip;
    } else if (toothPhase < 0.82) {
      radius = lerp(tip, root, (toothPhase - 0.66) / 0.16);
    }

    radius += jitter(seed * 19.13 + u * 37.1, 0.1);

    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      jitter(seed * 5.41, 0.1),
    ];
  }

  if (t < 0.88) {
    const local = (t - 0.72) / 0.16;
    const [x, y] = ringPoint(0.98, local, seed, 0.07);
    return [x, y, jitter(seed * 7.17, 0.1)];
  }

  const local = (t - 0.88) / 0.12;
  const [x, y] = ringPoint(0.42, local, seed, 0.05);
  return [x, y, jitter(seed * 11.83, 0.1)];
}

function expertiseCorePoint(path: number, seed: number): [number, number, number] {
  const t = Math.max(0, Math.min(1, path));
  const nodes = 6;
  const nodeRadius = 2.3;

  if (t < 0.26) {
    const local = t / 0.26;
    const [x, y] = ringPoint(0.58, local, seed, 0.08);
    return [x, y, jitter(seed * 13.3, 0.12)];
  }

  if (t < 0.56) {
    const local = (t - 0.26) / 0.3;
    const [x, y] = polygonEdgePoint(nodes, nodeRadius, local, seed);
    return [x, y, jitter(seed * 17.1, 0.12)];
  }

  if (t < 0.82) {
    const spoke = Math.min(nodes - 1, Math.floor(((t - 0.56) / 0.26) * nodes));
    const local = ((t - 0.56) / 0.26) * nodes - spoke;
    const angle = -Math.PI / 2 + (spoke / nodes) * Math.PI * 2;
    const x1 = Math.cos(angle) * (nodeRadius - 0.2);
    const y1 = Math.sin(angle) * (nodeRadius - 0.2);
    const [x, y] = linePoint(0, 0, x1, y1, local, seed, 0.06);
    return [x, y, jitter(seed * 23.5, 0.12)];
  }

  const node = Math.min(nodes - 1, Math.floor(((t - 0.82) / 0.18) * nodes));
  const local = ((t - 0.82) / 0.18) * nodes - node;
  const angle = -Math.PI / 2 + (node / nodes) * Math.PI * 2;
  const cx = Math.cos(angle) * nodeRadius;
  const cy = Math.sin(angle) * nodeRadius;
  const [x, y] = ringPoint(0.22, local, seed, 0.04);

  return [cx + x, cy + y, jitter(seed * 31.9, 0.1)];
}

function envelopePoint(path: number, seed: number): [number, number, number] {
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

function completeEnvelopePoint(path: number, seed: number): [number, number, number] {
  const w = 4.05;
  const h = 2.35;
  const halfW = w * 0.5;
  const halfH = h * 0.5;
  const yShift = 0.46;
  const p = fract(path);
  const finish = (x: number, y: number, localSeed: number): [number, number, number] => [
    x + jitter(localSeed, 0.055),
    y + yShift + jitter(localSeed * 1.37, 0.055),
    0.0,
  ];

  if (p < 0.62) {
    const t = p / 0.62;
    const perimeter = 2.0 * (w + h);
    const dist = t * perimeter;
    let x = 0.0;
    let y = 0.0;

    if (dist <= w) {
      x = -halfW + dist;
      y = -halfH;
    } else if (dist < w + h) {
      x = halfW;
      y = -halfH + (dist - w);
    } else if (dist < w + h + w) {
      x = halfW - (dist - w - h);
      y = halfH;
    } else {
      x = -halfW;
      y = halfH - (dist - w - h - w);
    }

    return finish(x, y, seed * 17.31 + p * 31.13);
  }

  const flapT = (p - 0.62) / 0.38;
  const [x, y] = flapT < 0.5
    ? linePoint(-halfW, halfH * 0.82, 0, 0.02, flapT / 0.5, seed, 0.045)
    : linePoint(halfW, halfH * 0.82, 0, 0.02, (flapT - 0.5) / 0.5, seed, 0.045);

  return finish(x, y, seed * 23.71 + p * 37.19);
}

function createParticles(): ParticleData {
  const data: ParticleData = {
    positions: new Float32Array(TOTAL_PARTICLES * 3),
    aboutPositions: new Float32Array(TOTAL_PARTICLES * 3),
    teamPositions: new Float32Array(TOTAL_PARTICLES * 3),
    servicesPositions: new Float32Array(TOTAL_PARTICLES * 3),
    skillsPositions: new Float32Array(TOTAL_PARTICLES * 3),
    contactPositions: new Float32Array(TOTAL_PARTICLES * 3),
    colors: new Float32Array(TOTAL_PARTICLES * 3),
    seeds: new Float32Array(TOTAL_PARTICLES),
    sizes: new Float32Array(TOTAL_PARTICLES),
    alphas: new Float32Array(TOTAL_PARTICLES),
    paths: new Float32Array(TOTAL_PARTICLES),
  };

  const color = new THREE.Color();

  for (let i = 0; i < MAIN_PARTICLES; i += 1) {
    const path = i / MAIN_PARTICLES;
    const seed = random(i + 1);
    const t = path * Math.PI * 2 + signedRandom(i + 101) * 0.018;

    const [baseX, baseY, baseZ] = infinityPoint(t);
    const crossGlow = Math.max(0, 1 - Math.hypot(baseX, baseY) / 3.4);
    const colorMix = Math.min(1, 0.2 + random(i + 222) * 0.48 + crossGlow * 0.5);
    const thickness = 0.05 + random(i + 303) * 0.16;

    color.lerpColors(teal, gold, colorMix);

    writeParticle(
      data,
      i,
      [
        [baseX + signedRandom(i + 404) * thickness, baseY + signedRandom(i + 505) * thickness, baseZ + signedRandom(i + 606) * 0.18],
        loopPoint(path, i + 700),
        guildTeamPoint(path, i + 800),
        gearOutlinePoint(path, i + 900),
        expertiseCorePoint(path, i + 1000),
        completeEnvelopePoint(path, i + 1100),
      ],
      color,
      seed,
      5.7 + random(i + 707) * 6.6,
      0.5 + random(i + 808) * 0.38,
      path,
    );
  }

  for (let i = 0; i < HALO_PARTICLES; i += 1) {
    const index = MAIN_PARTICLES + i;
    const path = random(i + 911);
    const seed = random(i + 1001);
    const t = path * Math.PI * 2;

    const [baseX, baseY, baseZ] = infinityPoint(t);
    const haloSpread = 0.34 + random(i + 1111) * 0.9;
    const colorMix = 0.16 + random(i + 1221) * 0.58;

    color.lerpColors(deepTeal, gold, colorMix);

    writeParticle(
      data,
      index,
      [
        [baseX + signedRandom(i + 1331) * haloSpread, baseY + signedRandom(i + 1441) * haloSpread * 0.7, baseZ + signedRandom(i + 1551) * 1.2],
        loopPoint(path, i + 1600),
        guildTeamPoint(path, i + 1700),
        gearOutlinePoint(path, i + 1800),
        expertiseCorePoint(path, i + 1900),
        completeEnvelopePoint(path, i + 2000),
      ],
      color,
      seed,
      8 + random(i + 1661) * 17,
      0.07 + random(i + 1771) * 0.17,
      path,
    );
  }

  for (let i = 0; i < MIST_PARTICLES; i += 1) {
    const index = MAIN_PARTICLES + HALO_PARTICLES + i;
    const seed = random(i + 1881);
    const colorMix = random(i + 1991);
    const mistPath = random(i + 2551);

    color.lerpColors(teal, warmWhite, colorMix);

    writeParticle(
      data,
      index,
      [
        [signedRandom(i + 2001) * 9.8, signedRandom(i + 2111) * 5.3, -4.6 + signedRandom(i + 2221) * 2.2],
        loopPoint(mistPath, i + 2301),
        guildTeamPoint(mistPath, i + 2601),
        gearOutlinePoint(mistPath, i + 2901),
        expertiseCorePoint(mistPath, i + 3201),
        completeEnvelopePoint(mistPath, i + 3501),
      ],
      color,
      seed,
      3.2 + random(i + 2331) * 5.6,
      0.035 + random(i + 2441) * 0.08,
      mistPath,
    );
  }

  return data;
}

export default function InfinityField({ reducedMotion = false, opacity = 1, morphTarget = 0 }: InfinityFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const currentOpacity = useRef(opacity);
  const currentMorph = useRef(morphTarget);
  const morphTargetRef = useRef(morphTarget);
  const particles = useMemo(() => createParticles(), []);
  const { gl, viewport, invalidate } = useThree();
  const isCompact = viewport.width < 8;
  const scale = isCompact
    ? Math.min(0.52, Math.max(0.42, viewport.width / 14.8))
    : Math.min(1.08, Math.max(0.56, viewport.width / 13.8));
  const verticalOffset = isCompact ? -0.9 : 0.35;

  morphTargetRef.current = morphTarget;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uOpacity: { value: opacity },
      uMorph: { value: morphTarget },
    }),
    [gl],
  );

  useEffect(() => {
    if (!reducedMotion || !materialRef.current) {
      return;
    }

    const snappedMorph = Math.round(morphTarget);

    currentMorph.current = snappedMorph;
    currentOpacity.current = opacity;
    materialRef.current.uniforms.uMorph.value = snappedMorph;
    materialRef.current.uniforms.uOpacity.value = opacity;
    invalidate();
  }, [invalidate, morphTarget, opacity, reducedMotion]);

  useFrame((state, delta) => {
    if (reducedMotion) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
      currentOpacity.current = THREE.MathUtils.damp(currentOpacity.current, opacity, 6, delta);
      materialRef.current.uniforms.uOpacity.value = currentOpacity.current;

      const targetMorph = morphTargetRef.current;
      const morphSpeed = targetMorph > 4.35 || currentMorph.current > 4.35 ? 5.2 : 8.5;
      const nextMorph = THREE.MathUtils.damp(
        currentMorph.current,
        targetMorph,
        morphSpeed,
        delta,
      );
      const snappedTarget = Math.round(targetMorph);
      if (
        Math.abs(targetMorph - snappedTarget) < 0.0001
        && Math.abs(nextMorph - targetMorph) < 0.014
      ) {
        currentMorph.current = snappedTarget;
      } else {
        currentMorph.current = nextMorph;
      }
      materialRef.current.uniforms.uMorph.value = currentMorph.current;
    }

    if (pointsRef.current) {
      const m = currentMorph.current;
      const phase = m - Math.floor(m);
      const transition = Math.sin(phase * Math.PI);

      pointsRef.current.rotation.y = Math.sin(elapsed * 0.08 + m * 0.35) * 0.08 + transition * 0.12;
      pointsRef.current.rotation.z = Math.sin(elapsed * 0.06) * 0.025 + transition * (m % 2 > 1 ? -0.08 : 0.08);
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.05 + m) * transition * 0.035;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false} scale={scale} position={[0, verticalOffset, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        <bufferAttribute attach="attributes-aAboutPosition" args={[particles.aboutPositions, 3]} />
        <bufferAttribute attach="attributes-aTeamPosition" args={[particles.teamPositions, 3]} />
        <bufferAttribute attach="attributes-aServicesPosition" args={[particles.servicesPositions, 3]} />
        <bufferAttribute attach="attributes-aSkillsPosition" args={[particles.skillsPositions, 3]} />
        <bufferAttribute attach="attributes-aContactPosition" args={[particles.contactPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[particles.seeds, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[particles.sizes, 1]} />
        <bufferAttribute attach="attributes-aAlpha" args={[particles.alphas, 1]} />
        <bufferAttribute attach="attributes-aPath" args={[particles.paths, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}
