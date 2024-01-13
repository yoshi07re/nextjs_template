'use client';

import Lenis from '@studio-freight/lenis';
import { createContext, useEffect, useState } from 'react';

export const LenisContext = createContext<Lenis | null>(null);

const useLenis = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({ duration: 0.8 });
    const raf = (time: number) => {
      instance.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return lenis;
};

interface LenisLayoutProps {
  children: React.ReactNode;
}

export const LenisLayout = ({ children }: LenisLayoutProps) => {
  const lenis = useLenis();

  return (
    <>
      <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
    </>
  );
};
