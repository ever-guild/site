import React, { Suspense, lazy } from 'react';
import './App.scss';

const ParticleScene = lazy(() => import('./components/three/Scene'));
const Navbar = lazy(() => import('./components/sections/Navbar'));
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Services = lazy(() => import('./components/sections/Services'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/sections/Footer'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <ParticleScene />
      </Suspense>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
