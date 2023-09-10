'use client';

import { useMekuriAnimation, useMekuriDuration } from '@funtech-inc/mekuri';
import gsap from 'gsap';
import { useRef } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransitionAnimation = ({ children }: PageTransitionProps) => {
  const ref = useRef(null);
  const { second } = useMekuriDuration();

  useMekuriAnimation({
    onOnce: () => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            y: 64,
          },
          {
            opacity: 1,
            y: 0,
            duration: second,
            ease: 'power3.out',
          },
        );
      }
    },
    onEveryLeave: () => {
      gsap.to(ref.current, {
        opacity: 0,
        y: 40,
        duration: second,
        ease: 'power3.out',
      });
    },
    onEveryEnter: () => {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: second,
        ease: 'power3.out',
      });
    },
  });

  return (
    <div className="will-change-[opacity,transform]" ref={ref}>
      {children}
    </div>
  );
};
