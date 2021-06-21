import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { fetchFromApi } from '../../utils';
import { Song } from '../api/song';

const Home = () => {
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
            <span>loading</span>
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

export default Home;
