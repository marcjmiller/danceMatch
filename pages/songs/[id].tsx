import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';
import { fetchFromApi, getDanceSpeed } from '../../utils';
import { Song } from '../api/song';
import { DanceStyle } from '../api/style';

const SongDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [song, setSong] = useState([] as Song[]);
  const [styles, setStyles] = useState([] as DanceStyle[]);
  const [addingStyle, setAddingStyle] = useState(false);

  const { data, loading, error } = fetchFromApi(`/api/song/${id}`);
  const { data: styleData, loading: styleLoading, error: styleError } = fetchFromApi(`/api/style/bySong/${id}`);
  const { data: stylesData, error: stylesError, loading: stylesLoading } = fetchFromApi('/api/style');

  useEffect(() => {
    data && setSong(data);
    styleData && setStyles(styleData);
    error && console.error(error);
    styleError && console.error(styleError);
  }, [data, error, styleError, styleData]);

  const getStyles = () => {
    return styles.map((style, idx) => (
      <div key={idx}>
        {style.name} - {getDanceSpeed(song[0].tempo, style)} speed
      </div>
    ));
  };

  const handleAssociateStyle = (styleId: string) => {
    fetch(`/api/song/associate/${song[0].id}/${styleId}`);
    router.push(router.asPath);
  };

  return (
    <Layout>
      <main>
        {loading || styleLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className='text-xl'>
              Styles for <span className='text-blue-500'>{`${song[0]?.artist} - ${song[0]?.name}`}</span>:
            </div>
            {styles.length > 0 ? getStyles() : <div>No styles found!</div>}
            {addingStyle ? (
              <select
                className='w-full border border-black rounded'
                defaultValue=''
                onChange={({ target: { value } }) => handleAssociateStyle(value)}
              >
                <option value='' hidden disabled>
                  Select a style
                </option>
                {!stylesLoading &&
                  stylesData.map((opt: DanceStyle) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
              </select>
            ) : (
              <div
                onClick={() => setAddingStyle(!addingStyle)}
                className='p-1 mt-2 text-center bg-blue-300 rounded shadow-lg cursor-pointer select-none hover:bg-blue-500 hover:text-white active:shadow-none'
              >
                Add Style
              </div>
            )}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default SongDetails;
