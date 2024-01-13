import { Footer } from '@/app/_components/footer';
import { Header } from '@/app/_components/header';
import { LenisLayout } from '@/app/_layout/LenisLayout';
import { PageTransition } from '@/app/_layout/PageTransition';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <LenisLayout>
      <div>
        <Header />
        <PageTransition>
          <div className="flex min-h-screen flex-col overflow-hidden">
            <main>{children}</main>
            <Footer />
          </div>
        </PageTransition>
      </div>
    </LenisLayout>
  );
};
