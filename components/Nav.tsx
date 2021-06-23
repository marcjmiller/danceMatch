import React from 'react';
import Link from 'next/link';

const Nav = () => {
  const navItems = [
    { path: '/', text: 'Home' },
    { path: '/styles', text: 'Dance styles' },
    { path: '/styles/add', text: 'Add a style' },
    { path: '/songs/add', text: 'Add a song' },
    { path: '/songs/search', text: 'Song search' },
  ];

  return (
    <div className='absolute inset-y-0 left-0 p-4 mt-10 w-52'>
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
