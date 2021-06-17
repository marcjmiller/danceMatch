import React from 'react';
import { MenuIcon } from '@heroicons/react/solid';

const Header = () => {
  return (
    <div className='flex items-center justify-between w-full h-16'>
      <div className='w-16 p-2'>
        <MenuIcon className='w-8' />
      </div>
      <div className='text-xl'>DanceMatch</div>
      <div className='w-16 spacer' />
    </div>
  );
};

export default Header;
