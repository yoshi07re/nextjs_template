import { Footer } from '@/app/_components/footer';
import { Header } from '@/app/_components/header';
import { PageTransition } from '@/app/_layout/PageTransition';
import { UseAppHook } from '@/hooks/useAppHook';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <div>
        <PageTransition>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </PageTransition>
      </div>
      <UseAppHook />
    </>
  );
};
