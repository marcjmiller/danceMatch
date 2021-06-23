import Head from 'next/head';
import React, { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout: FC = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-between w-full h-screen'>
      <Head>
        <title>DanceMatch - Find a dance for your music!</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
