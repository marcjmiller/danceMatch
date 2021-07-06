import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Spinner from '../../../components/icons/Spinner';
import Layout from '../../../components/Layout';
import { fetchFromApi, getDanceSpeed } from '../../../utils';
import { Song } from '../../api/song';
import { DanceStyle } from '../../api/style';

const SongsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [songs, setSongs] = useState([] as Song[]);
  const [style, setStyle] = useState({} as DanceStyle);
  const { data: songData, error: songError, loading: songLoading } = fetchFromApi(`/api/song/byStyle/${id}`);
  const { data: styleData, error: styleError, loading: styleLoading } = fetchFromApi(`/api/style/${id}`);
  const foundSongs = !songLoading && !styleLoading && songs.length > 0;

  useEffect(() => {
    styleData && setStyle(styleData[0]);
    songData && setSongs(songData);
    songError && console.error(songError);
    styleError && console.error(styleError);
  }, [styleData, styleError, songData, songError]);

  return (
    <Layout>
      <main>
        <div className='flex w-full h-full p-2 text-center'>
          <div className=''>
            {songLoading || styleLoading ? (
              <Spinner />
            ) : (
              style && <div className='text-xl'>Here are some songs matching <span className='text-blue-400'>{style.name}</span>:</div>
            )}
            {foundSongs && style ? (
              <div className=''>
                <div className=''>
                  <div className='flex font-bold'>
                    <div className='w-1/3'>Artist</div>
                    <div className='w-1/3'>Song</div>
                    <div className='w-1/3'>Speed</div>
                  </div>
                  {songs.map((song, idx) => (
                    <div className='flex' key={idx}>
                      <div className='w-1/3'>{song.artist}</div>
                      <div className='w-1/3'>{song.name}</div>
                      <div className='w-1/3'>{getDanceSpeed(song.tempo, style)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              !songLoading && <div>No songs found!</div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SongsById;
