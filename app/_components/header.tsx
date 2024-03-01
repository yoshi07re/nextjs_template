'use client';

import Link from 'next/link';

const Links = [
  {
    href: '/',
    title: 'home',
  },
  {
    href: '/page1',
    title: 'page1',
  },
  {
    href: '/page2',
    title: 'page2',
  },
];

export const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-[999] w-full px-6 pt-4">
      <nav>
        <ul className="flex justify-end gap-4">
          {Links.map((li, i) => (
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
