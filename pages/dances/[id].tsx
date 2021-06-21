import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { fetchFromApi, getDanceSpeed, useFetch } from '../../utils';
import { styles } from '../api/dance';
import { Song } from '../api/song';

const SongsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [songs, setSongs] = useState([] as Song[]);
  const { data, error, loading } = fetchFromApi(`/api/song/${id}`);
  const foundSongs = songs.length > 0;
  
  useEffect(() => {
    data && setSongs(data);
    error && console.error(error);
  }, [data, error]);

  return (
    <Layout>
      <main>
        <div className='flex w-full h-full p-2 text-center'>
          <div className=''>
            <div className='text-lg'>Here are some songs matching {id && styles[+id].name}:</div>
            {error ? (
              <div>{error}</div>
            ) : loading ? (
              <div>Loading...</div>
            ) : foundSongs ? (
              <div className=''>
                {songs.map((song, idx) => (
                  <div key={idx}>{`${song.artist} - ${song.name} - ${getDanceSpeed(song.tempo, styles[+id!])}`}</div>
                ))}
              </div>
            ) : (
              <div>No songs found!</div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SongsById;
