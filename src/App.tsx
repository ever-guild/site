import './App.scss';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Team from './components/sections/Team';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

function App() {
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
      <div className="App__landing-end">
        <a className="App__top" href="#hero" aria-label="Back to top">
          <span>Top</span>
          <ArrowUp className="App__top-icon" size={15} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </div>
      <Footer />
    </div>
  );
}

export default App;
