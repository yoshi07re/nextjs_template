import '@/styles/globals.css';
import { Inter } from 'next/font/google';

import { MainLayout } from '@/app/_layout/MainLayout';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

const siteName = 'next.js_template';
const description = 'next.jsテンプレートページ';
const url = '';

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
  },
  alternates: {
    canonical: url,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
