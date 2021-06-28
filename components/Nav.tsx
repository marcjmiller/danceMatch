import React from 'react';
import Link from 'next/link';
import { Router, useRouter } from 'next/dist/client/router';

const Nav = () => {
  const router = useRouter();
  console.log(router.asPath);
  const navItems = [
    { path: '/', text: 'Home' },
    { path: '/styles', text: 'All styles' },
    { path: '/styles/add', text: 'Add a style' },
    { path: '/songs', text: 'All songs' },
    { path: '/songs/add', text: 'Add a song' },
    { path: '/songs/search', text: 'Song search' },
  ];

  return (
    <div className='absolute inset-y-0 left-0 p-4 mt-10 w-52 navMenu'>
      <ul>
        {navItems.map((navItem, index) => (
          <li key={index}>
            <Link href={navItem.path}>{navItem.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
