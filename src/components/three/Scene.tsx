import { Canvas } from '@react-three/fiber';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const InfinityField = lazy(() => import('./InfinityField'));

// Feature-detect WebGL so environments without a GPU context (headless scanners,
// locked-down devices, blocked WebGL) degrade gracefully to the flat background
// instead of throwing an uncaught Three.js error.
function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

// Overall scroll progress (0..1) – subtly feeds the loop's scale & drift.
function useScrollMorph(): number {
  const [morph, setMorph] = useState(0);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const next = maxScroll > 0
        ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
        : 0;
      setMorph((current) => (Math.abs(current - next) < 0.001 ? current : next));
    };

    const handle = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', update);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return morph;
}

export default function Scene() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isPhone = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const scroll = useScrollMorph();
  // Fade the field down to 20% of its base opacity as the page scrolls.
  const baseOpacity = isPhone ? 0.55 : isTablet ? 0.82 : 1;
  const particleOpacity = baseOpacity * (1 - scroll * 0.8);

  const [webglReady] = useState(supportsWebGL);

  const wrapperStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    background: '#001D25',
  } as const;

  if (!webglReady) {
    return <div aria-hidden="true" style={wrapperStyle} />;
  }

  return (
    <div aria-hidden="true" style={wrapperStyle}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 18], fov: 45, near: 0.1, far: 100 }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        style={{ background: '#001D25' }}
      >
        <color attach="background" args={['#001D25']} />
        <fog attach="fog" args={['#001D25', 18, 36]} />
        <Suspense fallback={null}>
          <InfinityField
            reducedMotion={reducedMotion}
            opacity={particleOpacity}
            scroll={scroll}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
