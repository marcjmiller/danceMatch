import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Spinner from '../../../components/icons/Spinner';
import Layout from '../../../components/Layout';
import { fetchFromApi } from '../../../utils';
import { Song } from '../../api/song';

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { data, loading, error } = fetchFromApi(`/api/song/search/${search}`);
  const [selectedSong, setSelectedSong] = useState([] as Song[]);

  useEffect(() => {
    data?.length > 0 && setSelectedSong(data);
    error && console.error(error);
  }, [data, error]);

  const handleGo = () => {
    router.push(`/songs/${selectedSong[0].id}`);
  };

  return (
    <Layout>
      <main>
        <div className='flex flex-col items-center'>
          <div className='text-xl'>Find a song</div>
          <div className='flex items-center justify-between w-full py-2'>
            <label htmlFor='Search'>Search: </label>
            <input
              id='Search'
              className='input'
              placeholder='Name / Artist'
              value={search}
              onChange={({ target: { value } }) => setSearch(value)}
              list='songNames'
              autoFocus
            />
            <datalist id='songNames'>
              {selectedSong.map((song, idx) => (
                <option key={idx} value={`${song.artist} - ${song.name}`} />
              ))}
            </datalist>
            <div
              className='p-1 text-center bg-blue-300 rounded shadow-lg cursor-pointer hover:bg-blue-500 hover:text-white active:shadow-none'
              onClick={handleGo}
            >
              Go
            </div>
            <Spinner className={`ml-2 ${loading ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Search;
