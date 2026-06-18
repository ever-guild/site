import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface InfinityFieldProps {
  reducedMotion?: boolean;
  opacity?: number;
  scroll?: number;
}

interface ParticleData {
  positions: Float32Array;
  scatter: Float32Array;
  colors: Float32Array;
  seeds: Float32Array;
  sizes: Float32Array;
  alphas: Float32Array;
  paths: Float32Array;
}

// Base counts at full (desktop) density. Mobile/tablet render a fraction of
// these so the loop stays as airy as it looks on desktop instead of clumping.
const BASE_MAIN = 2600;
const BASE_HALO = 1100;
const BASE_MIST = 480;

const teal = new THREE.Color('#4db8cc');
const deepTeal = new THREE.Color('#0a3a4d');
const gold = new THREE.Color('#F1B800');
const cream = new THREE.Color('#FFE79C');

const vertexShader = `
  attribute vec3 aScatter;
  attribute vec3 color;
  attribute float aSeed;
  attribute float aSize;
  attribute float aAlpha;
  attribute float aPath;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uOpacity;
  uniform float uScroll;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float s = aSeed * 6.28318530718;
    float tt = aPath * 6.28318530718;

    // Gentle breathing scale; scroll pushes it harder for a snappy response.
    float breathe = 1.0 + sin(uTime * 0.3 + s * 0.1) * 0.06 + uScroll * 0.56;
    vec3 p = position * breathe;

    // Organic form mutation — slow traveling waves warp the loop a little,
    // never enough to stop it reading as an infinity.
    p.x += sin(tt * 2.0 - uTime * 0.5 + s * 0.2) * 0.30;
    p.y += cos(tt * 3.0 + uTime * 0.35) * 0.24;
    p.z += sin(tt * 2.0 + uTime * 0.6) * 0.5 + cos(uTime * 0.4 + s) * 0.26;

    // Atom-like dispersion — each particle drifts slightly off the curve and
    // back, staggered, so the figure shimmers like it is made of atoms.
    float pulse = 0.5 + 0.5 * sin(uTime * 0.55 + s * 1.7);
    float drift = pulse * (0.45 + 0.5 * sin(uTime * 0.22 + aPath * 9.0)) + uScroll * 4.5;
    p += aScatter * drift;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);

    // Shimmer / iridescence: a highlight that travels along the loop + twinkle.
    float twinkle = 0.7 + 0.3 * sin(uTime * (1.0 + aSeed * 0.7) + s * 3.0);
    float flow = 0.5 + 0.5 * sin(aPath * 12.56637 - uTime * 0.9);

    vColor = color + flow * vec3(0.2, 0.14, 0.02);
    vAlpha = aAlpha * (twinkle * 0.78 + flow * 0.3) * uOpacity;

    gl_PointSize = aSize * uPixelRatio * (twinkle + 0.15) * (14.0 / -mvPosition.z);
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
    float glow = smoothstep(0.5, 0.12, dist) * 0.4;
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

function infinityPoint(t: number): [number, number, number] {
  return [
    Math.sin(t) * 6.45,
    Math.sin(t * 2) * 2.45,
    Math.cos(t * 2) * 0.72,
  ];
}

function scatterVector(seed: number, min: number, range: number): [number, number, number] {
  const dx = signedRandom(seed);
  const dy = signedRandom(seed + 1.3);
  const dz = signedRandom(seed + 2.7) * 0.6;
  const len = Math.max(0.0001, Math.hypot(dx, dy, dz));
  const mag = min + random(seed + 4.1) * range;
  return [(dx / len) * mag, (dy / len) * mag, (dz / len) * mag];
}

function writeParticle(
  data: ParticleData,
  index: number,
  position: [number, number, number],
  scatter: [number, number, number],
  color: THREE.Color,
  seed: number,
  size: number,
  alpha: number,
  path: number,
): void {
  const p = index * 3;

  data.positions[p] = position[0];
  data.positions[p + 1] = position[1];
  data.positions[p + 2] = position[2];

  data.scatter[p] = scatter[0];
  data.scatter[p + 1] = scatter[1];
  data.scatter[p + 2] = scatter[2];

  data.colors[p] = color.r;
  data.colors[p + 1] = color.g;
  data.colors[p + 2] = color.b;

  data.seeds[index] = seed;
  data.sizes[index] = size;
  data.alphas[index] = alpha;
  data.paths[index] = path;
}

function createParticles(density: number): ParticleData {
  const MAIN = Math.round(BASE_MAIN * density);
  const HALO = Math.round(BASE_HALO * density);
  const MIST = Math.round(BASE_MIST * density);
  const TOTAL = MAIN + HALO + MIST;

  const data: ParticleData = {
    positions: new Float32Array(TOTAL * 3),
    scatter: new Float32Array(TOTAL * 3),
    colors: new Float32Array(TOTAL * 3),
    seeds: new Float32Array(TOTAL),
    sizes: new Float32Array(TOTAL),
    alphas: new Float32Array(TOTAL),
    paths: new Float32Array(TOTAL),
  };

  const color = new THREE.Color();

  // Main ribbon — the crisp infinity outline.
  for (let i = 0; i < MAIN; i += 1) {
    const path = i / MAIN;
    const seed = random(i + 1);
    const t = path * Math.PI * 2 + signedRandom(i + 101) * 0.018;
    const [baseX, baseY, baseZ] = infinityPoint(t);
    const crossGlow = Math.max(0, 1 - Math.hypot(baseX, baseY) / 3.4);
    const colorMix = Math.min(1, 0.22 + random(i + 222) * 0.46 + crossGlow * 0.5);
    const thickness = 0.05 + random(i + 303) * 0.16;

    color.lerpColors(teal, gold, colorMix);

    writeParticle(
      data,
      i,
      [
        baseX + signedRandom(i + 404) * thickness,
        baseY + signedRandom(i + 505) * thickness,
        baseZ + signedRandom(i + 606) * 0.18,
      ],
      scatterVector(i + 700, 0.35, 0.95),
      color,
      seed,
      5.8 + random(i + 707) * 6.6,
      0.5 + random(i + 808) * 0.4,
      path,
    );
  }

  // Halo — soft volume hugging the ribbon.
  for (let i = 0; i < HALO; i += 1) {
    const index = MAIN + i;
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
        baseX + signedRandom(i + 1331) * haloSpread,
        baseY + signedRandom(i + 1441) * haloSpread * 0.7,
        baseZ + signedRandom(i + 1551) * 1.2,
      ],
      scatterVector(i + 1600, 0.6, 1.5),
      color,
      seed,
      8 + random(i + 1661) * 17,
      0.08 + random(i + 1771) * 0.17,
      path,
    );
  }

  // Mist — faint drifting sparkle that wanders a touch more.
  for (let i = 0; i < MIST; i += 1) {
    const index = MAIN + HALO + i;
    const seed = random(i + 1881);
    const colorMix = random(i + 1991);
    const path = random(i + 2551);
    const t = path * Math.PI * 2;
    const [baseX, baseY, baseZ] = infinityPoint(t);

    color.lerpColors(teal, cream, colorMix);

    writeParticle(
      data,
      index,
      [
        baseX + signedRandom(i + 2001) * 2.2,
        baseY + signedRandom(i + 2111) * 1.5,
        baseZ - 1.0 + signedRandom(i + 2221) * 1.6,
      ],
      scatterVector(i + 2300, 1.0, 2.6),
      color,
      seed,
      3.4 + random(i + 2331) * 5.8,
      0.05 + random(i + 2441) * 0.1,
      path,
    );
  }

  return data;
}

export default function InfinityField({ reducedMotion = false, opacity = 1, scroll = 0 }: InfinityFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const elapsedRef = useRef(0);
  const currentOpacity = useRef(opacity);
  const currentScroll = useRef(scroll);
  const scrollRef = useRef(scroll);
  const { gl, viewport } = useThree();

  // Mirror the latest scroll into a ref (read inside useFrame) without
  // mutating the ref during render.
  useEffect(() => {
    scrollRef.current = scroll;
  }, [scroll]);

  // Responsive sizing / placement / density across phone, tablet, desktop.
  const w = viewport.width;
  const tier = w < 8 ? 'phone' : w < 16 ? 'tablet' : 'desktop';

  let scale: number;
  let verticalOffset: number;
  let density: number;
  if (tier === 'phone') {
    // Open the loop up (bigger scale) and thin it out (fewer particles) so the
    // mobile field reads like the airy desktop one instead of a dense clump.
    scale = THREE.MathUtils.clamp(w / 13, 0.5, 0.64);
    verticalOffset = -0.3;
    density = 0.42;
  } else if (tier === 'tablet') {
    scale = THREE.MathUtils.clamp(w / 16.5, 0.55, 0.72);
    verticalOffset = 0.25;
    density = 0.68;
  } else {
    scale = THREE.MathUtils.clamp(w / 22, 0.82, 1.25);
    verticalOffset = 0.35;
    density = 1;
  }

  // Regenerate only when the density tier actually changes.
  const particles = useMemo(() => createParticles(density), [density]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uOpacity: { value: 1 },
      uScroll: { value: 0 },
    }),
    [gl],
  );

  useEffect(() => {
    currentOpacity.current = opacity;
    if (materialRef.current) {
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  }, [opacity]);

  useEffect(() => {
    currentScroll.current = scroll;
    if (materialRef.current) {
      materialRef.current.uniforms.uScroll.value = scroll;
    }
  }, [scroll]);

  useFrame((_state, delta) => {
    if (reducedMotion) {
      return;
    }

    elapsedRef.current += delta;
    const t = elapsedRef.current;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      currentOpacity.current = THREE.MathUtils.damp(currentOpacity.current, opacity, 6, delta);
      materialRef.current.uniforms.uOpacity.value = currentOpacity.current;
      // Snappy tracking — the scatter reacts to scroll almost immediately.
      currentScroll.current = THREE.MathUtils.damp(currentScroll.current, scrollRef.current, 14, delta);
      materialRef.current.uniforms.uScroll.value = currentScroll.current;
    }

    if (pointsRef.current) {
      const sc = currentScroll.current;
      pointsRef.current.rotation.z = Math.sin(t * 0.045) * 0.05 + sc * 0.24;
      pointsRef.current.rotation.y = Math.sin(t * 0.06) * 0.1 + sc * 0.44;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false} scale={scale} position={[0, verticalOffset, 0]}>
      <bufferGeometry key={tier}>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        <bufferAttribute attach="attributes-aScatter" args={[particles.scatter, 3]} />
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
