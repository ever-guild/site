import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface LoopFieldProps {
  reducedMotion?: boolean;
  opacity?: number;
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
  uniform float uOpacity;

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
    vAlpha = aAlpha * (shimmer + runner * 0.34) * uOpacity;

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

function torusPoint(t: number, v: number, R: number, r: number): [number, number, number] {
  return [
    (R + r * Math.cos(v)) * Math.cos(t),
    (R + r * Math.cos(v)) * Math.sin(t),
    r * Math.sin(v),
  ];
}

function createLoopParticles(): ParticleData {
  const data: ParticleData = {
    positions: new Float32Array(TOTAL_PARTICLES * 3),
    colors: new Float32Array(TOTAL_PARTICLES * 3),
    seeds: new Float32Array(TOTAL_PARTICLES),
    sizes: new Float32Array(TOTAL_PARTICLES),
    alphas: new Float32Array(TOTAL_PARTICLES),
    paths: new Float32Array(TOTAL_PARTICLES),
  };

  const color = new THREE.Color();
  const R = 5.0;
  const r = 1.6;

  for (let i = 0; i < MAIN_PARTICLES; i += 1) {
    const path = i / MAIN_PARTICLES;
    const seed = random(i + 1);
    const t = path * Math.PI * 2 + signedRandom(i + 101) * 0.018;
    const v = signedRandom(i + 201) * Math.PI;
    const [baseX, baseY, baseZ] = torusPoint(t, v, R, r);
    const colorMix = Math.min(1, 0.2 + random(i + 222) * 0.48);
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
    const v = signedRandom(i + 1021) * Math.PI;
    const [baseX, baseY, baseZ] = torusPoint(t, v, R, r);
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
        signedRandom(i + 2111) * 9.8,
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

export default function LoopField({ reducedMotion = false, opacity = 1 }: LoopFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const currentOpacity = useRef(opacity);
  const particles = useMemo(() => createLoopParticles(), []);
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
      uOpacity: { value: opacity },
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
      currentOpacity.current += (opacity - currentOpacity.current) * 0.05;
      materialRef.current.uniforms.uOpacity.value = currentOpacity.current;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.08;
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.05) * 0.1;
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
