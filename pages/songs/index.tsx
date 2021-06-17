import { InferGetServerSidePropsType } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import { Song } from '../api/song';

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <main>
        <div className='text-4xl'>All Songs:</div>
        <div className='flex justify-center'>
          <ul>
            {data.map((song) => (
              <li key={song.id}>{`${song.artist} - ${song.name} - ${song.tempo}BPM`}</li>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/song');
  const data: Song[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default Home;
