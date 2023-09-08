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
      millisecond={600}
      scrollRestoration={'restore'}
      mode="wait"
      trigger={pathname}
    >
      {children}
    </MekuriContext>
  );
};
