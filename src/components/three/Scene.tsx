import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import InfinityField from './InfinityField';

function useScrollMorph(): number {
  const [morph, setMorph] = useState(0);

  useEffect(() => {
    let rafId: number;
    const sections = ['hero', 'about', 'team', 'services', 'skills', 'contact'];
    const morphStart = 0.56;

    const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

    const getMorphForScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const sectionTops = sections
        .map((id) => document.getElementById(id)?.offsetTop)
        .filter((top): top is number => typeof top === 'number');

      if (sectionTops.length !== sections.length) {
        return 0;
      }

      if (scrollTop >= maxScroll - 2) {
        return sectionTops.length - 1;
      }

      for (let i = 0; i < sectionTops.length - 1; i += 1) {
        const start = sectionTops[i];
        const end = sectionTops[i + 1];

        if (scrollTop >= start && scrollTop < end) {
          const progress = clamp01((scrollTop - start) / Math.max(1, end - start));

          if (progress < morphStart) {
            return i;
          }

          return i + clamp01((progress - morphStart) / (1 - morphStart));
        }
      }

      if (scrollTop < sectionTops[0]) {
        return 0;
      }

      return sectionTops.length - 1;
    };

    const update = () => {
      const nextMorph = getMorphForScroll();
      setMorph((current) => (Math.abs(current - nextMorph) < 0.001 ? current : nextMorph));
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
  const isMobile = useMediaQuery('(max-width: 767px)');
  const morph = useScrollMorph();
  const particleOpacity = isMobile ? 0.84 : 1;

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
          <InfinityField
            reducedMotion={reducedMotion}
            opacity={particleOpacity}
            morphTarget={morph}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
