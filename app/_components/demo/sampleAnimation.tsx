'use client';

import { useMekuriAnimation, useMekuriDuration } from '@funtech-inc/mekuri';
import { gsap } from 'gsap';
import { useRef } from 'react';

export const SampleAnimation = ({
  children,
  dir,
}: {
  children: React.ReactNode;
  dir: 'x' | 'y';
}) => {
  const ref = useRef(null);
  const { second } = useMekuriDuration();
  useMekuriAnimation({
    onOnce: () => {
      if (ref.current) {
        gsap.to(ref.current, {
          opacity: 1,
          duration: second,
          ease: 'power3.out',
        });
      }
    },
    onEnter: ({ intersectionObserver }) => {
      intersectionObserver(ref, (isIntersecting) => {
        if (isIntersecting && ref.current) {
          gsap.fromTo(
            ref.current,
            {
              opacity: 0,
              willChange: 'opacity,transform',
              y: dir === 'y' ? 24 : 0,
              x: dir === 'x' ? 24 : 0,
            },
            {
              opacity: 1,
              willChange: 'auto',
              y: 0,
              x: 0,
              duration: second,
              ease: 'power3.out',
            },
          );
        } else if (ref.current) {
          gsap.set(ref.current, {
            opacity: 1,
          });
        }
      });
    },
    onLeave: () => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: dir === 'y' ? -24 : 0,
          x: dir === 'x' ? -24 : 0,
          duration: second,
          ease: 'power3.out',
        });
      }
    },
  });
  return (
    <div className="opacity-0" ref={ref}>
      {children}
    </div>
  );
};
