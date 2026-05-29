import { lazy, Suspense } from 'react';
import './App.scss';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Team from './components/sections/Team';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

const Scene = lazy(() => import('./components/three/Scene'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Team />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
