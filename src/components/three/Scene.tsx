import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';

export default function Scene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 30], fov: 75 }}
        frameloop="always"
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
