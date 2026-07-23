import { useEffect } from 'react';
import './App.scss';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Team from './components/sections/Team';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

function App() {
  useEffect(() => {
    const scrollToHashTarget = () => {
      const targetId = window.location.hash.slice(1);

      if (!targetId) {
        return;
      }

      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
      });
    };

    scrollToHashTarget();
    window.addEventListener('hashchange', scrollToHashTarget);

    return () => window.removeEventListener('hashchange', scrollToHashTarget);
  }, []);

  return (
    <div className="App">
      <div className="App__scroll-sentinel" data-scroll-sentinel aria-hidden="true" />
      <div className="App__background" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Team />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
