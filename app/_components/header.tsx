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

export const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-[999] w-full px-6 pt-4">
      <nav>
        <ul className="flex justify-end gap-4">
          {LINKS.map((li, i) => (
            <li key={i}>
              <Link href={li.href} scroll={false}>
                {li.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
