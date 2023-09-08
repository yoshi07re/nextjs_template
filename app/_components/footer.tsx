'use client';

import Link from 'next/link';

const LINKS = [
  {
    href: '/',
    title: 'home',
  },
  {
    href: '/page1',
    title: 'page1',
  },
];

export const Footer = () => {
  return (
    <footer className="mt-auto px-24 py-4">
      <nav className="flex justify-center gap-4">
        {LINKS.map((li, i) => (
          <li key={i}>
            <Link href={li.href} scroll={false}>
              {li.title}
            </Link>
          </li>
        ))}
      </nav>
    </footer>
  );
};
