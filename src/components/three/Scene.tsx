import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import InfinityField from './InfinityField';

export default function Scene() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#002835',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 18], fov: 45, near: 0.1, far: 100 }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        style={{ background: '#002835' }}
      >
        <color attach="background" args={['#002835']} />
        <fog attach="fog" args={['#002835', 18, 36]} />
        <Suspense fallback={null}>
          <InfinityField reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
