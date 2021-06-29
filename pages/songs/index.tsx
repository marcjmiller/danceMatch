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
      <main>
        <div className='text-4xl'>All Songs:</div>
        <div className='flex justify-center'>
          {loading ? (
            <Spinner />
          ) : (
            <ul>
              {songs.map((song) => (
                <li key={song.id}>{`${song.artist} - ${song.name} - ${song.tempo}BPM`}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default GetAllSongs;
