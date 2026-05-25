import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 150;
const CONNECT_DIST = 4;
const MAX_CONNECT = 3;
const MOUSE_RADIUS = 8;
const MOUSE_STRENGTH = 0.02;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions, velocities };
  }, []);

  const maxLines = COUNT * MAX_CONNECT;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const positions = posAttr.array as Float32Array;
    const lineGeo = linesRef.current.geometry;
    const lineArr = lineGeo.attributes.position.array as Float32Array;

    // Convert pointer to world position on z=0 plane
    const v = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
    v.unproject(state.camera);
    v.sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / v.z;
    const mousePos = v.multiplyScalar(distance).add(state.camera.position);

    const time = state.clock.elapsedTime;
    let lineIdx = 0;

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Noise-like drift
      positions[ix] += particles.velocities[ix] * delta * 60 + Math.sin(time * 0.3 + i) * 0.002 * delta * 60;
      positions[iy] += particles.velocities[iy] * delta * 60 + Math.cos(time * 0.2 + i * 0.5) * 0.002 * delta * 60;
      positions[iz] += particles.velocities[iz] * delta * 60;

      // Mouse attraction
      const dx = mousePos.x - positions[ix];
      const dy = mousePos.y - positions[iy];
      const d2 = dx * dx + dy * dy;
      if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 0.01) {
        const d = Math.sqrt(d2);
        const f = (1 - d / MOUSE_RADIUS) * MOUSE_STRENGTH * delta * 60;
        positions[ix] += (dx / d) * f;
        positions[iy] += (dy / d) * f;
      }

      // Soft bounds
      if (positions[ix] > 25) positions[ix] -= 0.01 * delta * 60;
      if (positions[ix] < -25) positions[ix] += 0.01 * delta * 60;
      if (positions[iy] > 20) positions[iy] -= 0.01 * delta * 60;
      if (positions[iy] < -20) positions[iy] += 0.01 * delta * 60;

      // Connections
      let connections = 0;
      for (let j = i + 1; j < COUNT && connections < MAX_CONNECT; j++) {
        const jx = j * 3;
        const jy = j * 3 + 1;
        const jz = j * 3 + 2;
        const cdx = positions[ix] - positions[jx];
        const cdy = positions[iy] - positions[jy];
        const cdz = positions[iz] - positions[jz];
        if (cdx * cdx + cdy * cdy + cdz * cdz < CONNECT_DIST * CONNECT_DIST) {
          const li = lineIdx * 6;
          lineArr[li] = positions[ix];
          lineArr[li + 1] = positions[iy];
          lineArr[li + 2] = positions[iz];
          lineArr[li + 3] = positions[jx];
          lineArr[li + 4] = positions[jy];
          lineArr[li + 5] = positions[jz];
          lineIdx++;
          connections++;
        }
      }
    }

    posAttr.needsUpdate = true;
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx * 2);
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#00343d"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00343d" transparent opacity={0.15} depthWrite={false} />
      </lineSegments>
    </group>
  );
}
