import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';
import { fetchFromApi, getDanceSpeed } from '../../utils';
import { DanceStyle } from '../api/style';
import { Song } from '../api/song';

const SongsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: styleData, error: styleError, loading: styleLoading } = fetchFromApi(`/api/style/${id}`);
  const [style, setStyle] = useState({} as DanceStyle);
  const [songs, setSongs] = useState([] as Song[]);
  const { data: songData, error: songError, loading: songLoading } = fetchFromApi(`/api/song/byStyle/${id}`);
  const foundSongs = songs.length > 0;

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
              <div className='text-xl'>Here are some songs matching {style.name}:</div>
            )}
            {foundSongs ? (
              <div className=''>
                {songs.map((song, idx) => (
                  <div key={idx}>{`${song.artist} - ${song.name} - ${getDanceSpeed(song.tempo, style)}`}</div>
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
