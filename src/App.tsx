import './App.scss';
import { SectionProvider } from './contexts/SectionContext';
import Scene from './components/three/Scene';
import SectionNav from './components/ui/SectionNav';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Team from './components/sections/Team';
import Services from './components/sections/Services';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

function App() {
  return (
    <SectionProvider>
      <div className="App">
        <Scene />
        <SectionNav />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Team />
          <Services />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </SectionProvider>
  );
}

export default App;
