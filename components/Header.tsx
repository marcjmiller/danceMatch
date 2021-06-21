import React from 'react';
import { MenuIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';

const Header = () => {
  const router = useRouter();
  console.log(router.asPath);
  return (
    <div className='flex items-center justify-between w-full h-16'>
      <div className='w-16 p-2'>
        <MenuIcon className='w-8' />
      </div>
      <div className='text-xl'>DanceMatch</div>
      {router.asPath === '/' ? (
        <div className='w-16 p-2 spacer' />
      ) : (
        <div className='w-16 p-2 text-center cursor-pointer' onClick={() => router.back()}>
          Back
        </div>
      )}
    </div>
  );
};

export default Header;
