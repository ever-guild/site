import React, { createContext, useContext, useState, useCallback } from 'react';

interface SectionContextValue {
  activeId: string;
  setActiveId: (id: string) => void;
}

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string>('hero');

  const handleSetActiveId = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <SectionContext.Provider value={{ activeId, setActiveId: handleSetActiveId }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext(): SectionContextValue {
  const ctx = useContext(SectionContext);
  if (!ctx) {
    throw new Error('useSectionContext must be used within SectionProvider');
  }
  return ctx;
}
