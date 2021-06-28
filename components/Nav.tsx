import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';

const Nav = () => {
  const router = useRouter();
  console.log(router.asPath);
  const navItems = [
    { path: '/', text: 'Home' },
    { path: '', text: 'STYLES' },
    { path: '/styles', text: 'All styles' },
    { path: '/styles/add', text: 'Add a style' },
    { path: '', text: 'SONGS' },
    { path: '/songs', text: 'All songs' },
    { path: '/songs/add', text: 'Add a song' },
    { path: '/songs/search', text: 'Song search' },
  ];

  return (
    <div className='absolute inset-y-0 left-0 p-4 mt-10 w-52 navMenu'>
      <ul className='text-sm nav'>
        {navItems.map((navItem, index) =>
          navItem.path ? (
            <li className={index > 0 ? 'ml-2' : ''} key={index}>
              <Link href={navItem.path}>{navItem.text}</Link>
            </li>
          ) : (
            <div className='flex'>
              <div className='w-4 text-transparent transform translate-y-1.5 border-t-2 border-black mr-1' />
              <div className='text-xs font-bold category'>{navItem.text}</div>
              <div className='w-4 text-transparent transform translate-y-1.5 border-t-2 border-black ml-1' />
            </div>
          )
        )}
      </ul>
    </div>
  );
};

export default Nav;
