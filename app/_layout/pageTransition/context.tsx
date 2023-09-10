'use client';

import { MekuriContext } from '@funtech-inc/mekuri';
import { usePathname } from 'next/navigation';

interface PageTransitionContextProps {
  children: React.ReactNode;
}

export const PageTransitionContext = ({
  children,
}: PageTransitionContextProps) => {
  const pathname = usePathname();
  return (
    <MekuriContext
      millisecond={800}
      scrollRestoration={{
        scrollRestoration: 'restore',
        onEnter: (pos) => {
          window.scrollTo({ top: pos });
        },
      }}
      mode="wait"
      trigger={pathname}
    >
      {children}
    </MekuriContext>
  );
};
