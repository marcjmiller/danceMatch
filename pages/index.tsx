import { InferGetServerSidePropsType } from 'next';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { DanceStyle, styles } from './api/dance';
import { Song } from './api/song';

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [danceStyle, setDanceStyle] = useState(0);
  const [songs, setSongs] = useState([] as Song[]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/song/${danceStyle}`)
      .then((resSongs) => resSongs.json())
      .then((res) => setSongs(res || []));
  }, [danceStyle]);

  return (
    <Layout>
      <main className='flex flex-col items-center'>
        <div className='text-4xl'>Welcome to DanceMatch!</div>
        <div className='flex justify-center'>
          To get started, pick a dance:{' '}
          <select
            onChange={(event) => setDanceStyle(+event.target.value)}
            required
            className='ml-2 border border-black rounded'
          >
            <option value='' hidden selected disabled>
              I want to...
            </option>
            {data.map((opt, idx) => (
              <option key={idx} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
        {danceStyle > 0 && (
          <div className='flex flex-col mt-4'>
            {songs.length > 0 && songs.map((song, idx) => <div key={idx}>{`${song.artist} - ${song.name}`}</div>)}
          </div>
        )}
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/dance');
  const data: DanceStyle[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default Home;
