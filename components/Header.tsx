import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import Nav from './Nav';

const Header = () => {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className='flex items-center justify-between w-full h-16 header'>
      <div className='w-16 p-2 m-2 nav'>
        {navOpen ? (
          <XIcon className='w-8 m-auto cursor-pointer' onClick={() => setNavOpen(!navOpen)} />
        ) : (
          <MenuIcon className='w-8 m-auto cursor-pointer' onClick={() => setNavOpen(!navOpen)} />
        )}
        {navOpen && <Nav />}
      </div>
      <div className='text-xl title'>DanceMatch</div>
      {router.asPath === '/' ? (
        <div className='w-16 p-2 m-2 spacer' />
      ) : (
        <div
          className='w-16 p-2 m-2 text-center border border-black rounded-lg cursor-pointer'
          onClick={() => router.push('/')}
        >
          Home
        </div>
      )}
    </div>
  );
};

export default Header;
