'use client';

import { Mekuri, MekuriFreezer } from '@funtech-inc/mekuri';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context';
import { usePathname } from 'next/navigation';

interface PageTransitionLayoutProps {
  children: React.ReactNode;
}

export const PageTransitionLayout = ({
  children,
}: PageTransitionLayoutProps) => {
  const pathname = usePathname();
  return (
    <Mekuri>
      <MekuriFreezer key={pathname} routerContext={LayoutRouterContext}>
        {children}
      </MekuriFreezer>
    </Mekuri>
  );
};
