import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface InfinityFieldProps {
  reducedMotion?: boolean;
}

interface ParticleData {
  positions: Float32Array;
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
  attribute vec3 color;
  attribute float aSeed;
  attribute float aSize;
  attribute float aAlpha;
  attribute float aPath;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float slowSeed = aSeed * 6.28318530718;
    float current = uTime * 0.36;

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

    vColor = color + runner * vec3(0.42, 0.25, 0.02);
    vAlpha = aAlpha * (shimmer + runner * 0.34);

    gl_PointSize = aSize * uPixelRatio * shimmer * (13.0 / -mvPosition.z);
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

function writeParticle(
  data: ParticleData,
  index: number,
  position: [number, number, number],
  color: THREE.Color,
  seed: number,
  size: number,
  alpha: number,
  path: number,
): void {
  const pointIndex = index * 3;

  data.positions[pointIndex] = position[0];
  data.positions[pointIndex + 1] = position[1];
  data.positions[pointIndex + 2] = position[2];
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

function createInfinityParticles(): ParticleData {
  const data: ParticleData = {
    positions: new Float32Array(TOTAL_PARTICLES * 3),
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
        baseX + signedRandom(i + 404) * thickness,
        baseY + signedRandom(i + 505) * thickness,
        baseZ + signedRandom(i + 606) * 0.18,
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
        baseX + signedRandom(i + 1331) * haloSpread,
        baseY + signedRandom(i + 1441) * haloSpread * 0.7,
        baseZ + signedRandom(i + 1551) * 1.2,
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

    color.lerpColors(teal, warmWhite, colorMix);
    writeParticle(
      data,
      index,
      [
        signedRandom(i + 2001) * 9.8,
        signedRandom(i + 2111) * 5.3,
        -4.6 + signedRandom(i + 2221) * 2.2,
      ],
      color,
      seed,
      3.2 + random(i + 2331) * 5.6,
      0.04 + random(i + 2441) * 0.12,
      random(i + 2551),
    );
  }

  return data;
}

export default function InfinityField({ reducedMotion = false }: InfinityFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const particles = useMemo(() => createInfinityParticles(), []);
  const { gl, viewport } = useThree();
  const isCompact = viewport.width < 8;
  const scale = isCompact
    ? Math.min(0.52, Math.max(0.42, viewport.width / 14.8))
    : Math.min(1.08, Math.max(0.56, viewport.width / 13.8));
  const verticalOffset = isCompact ? -0.9 : 0.35;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
    }),
    [gl],
  );

  useFrame((state) => {
    if (reducedMotion) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsed;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(elapsed * 0.1) * 0.12;
      pointsRef.current.rotation.z = Math.sin(elapsed * 0.08) * 0.025;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false} scale={scale} position={[0, verticalOffset, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
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
