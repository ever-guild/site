import React, { Suspense } from 'react';
import './App.scss';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';

const Team = React.lazy(() => import('./components/sections/Team'));
const Services = React.lazy(() => import('./components/sections/Services'));
const Contact = React.lazy(() => import('./components/sections/Contact'));
const Footer = React.lazy(() => import('./components/sections/Footer'));

function DeferredSectionsFallback() {
  return (
    <div className="App__deferred-skeleton" aria-hidden="true">
      <div className="App__deferred-head" />
      <div className="App__deferred-grid">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function App() {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setIsReady(true));
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  React.useEffect(() => {
    const syncLayoutViewportWidth = () => {
      document.documentElement.style.setProperty(
        '--app-layout-viewport-width',
        `${window.innerWidth}px`,
      );
    };

    syncLayoutViewportWidth();
    window.addEventListener('resize', syncLayoutViewportWidth);
    window.visualViewport?.addEventListener('resize', syncLayoutViewportWidth);

    return () => {
      window.removeEventListener('resize', syncLayoutViewportWidth);
      window.visualViewport?.removeEventListener('resize', syncLayoutViewportWidth);
    };
  }, []);

  return (
    <div className={`App ${isReady ? 'App--ready' : ''}`}>
      <div className="App__scroll-sentinel" data-scroll-sentinel aria-hidden="true" />
      <div className="App__background" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<DeferredSectionsFallback />}>
          <Team />
          <Services />
          <Contact />
        </Suspense>
      </main>
      <div className="App__landing-end">
        <a className="App__top" href="#hero" aria-label="Back to top">
          <span>Top</span>
          <ArrowUp className="App__top-icon" size={15} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
