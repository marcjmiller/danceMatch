import { useEffect, useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';
import { fetchFromApi } from '../../utils';
import { Song } from '../api/song';

const GetAllSongs = () => {
  const [songs, setSongs] = useState([] as Song[]);
  const { data, error, loading } = fetchFromApi('/api/song');

  useEffect(() => {
    data && setSongs(data);
    error && console.error(error);
  }, [data, error]);

  return (
    <Layout>
      <main className='w-1/2'>
        <div className='text-4xl'>All Songs:</div>
        <div className='flex justify-center w-full'>
          {loading ? (
            <Spinner />
          ) : (
            <div className='flex flex-col w-full'>
              <div className='flex font-bold'>
                <div className='w-1/3'>Artist</div>
                <div className='w-1/3'>Song</div>
                <div className='w-1/3'>Tempo (BPM)</div>
              </div>
              {songs.map((song) => (
                <div className='flex' key={song.id}>
                  <div className='w-1/3'>{song.artist}</div>
                  <div className='w-1/3'>{song.name}</div>
                  <div className='w-1/3'>{song.tempo} BPM</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default GetAllSongs;
