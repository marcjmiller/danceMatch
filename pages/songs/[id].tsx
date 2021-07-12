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
    stylesError && console.error(stylesError);
  }, [data, error, styleError, stylesError, styleData]);

  const getStyles = () => {
    return styles.map((style, idx) => (
      <div className='style' key={idx}>
        {style.name} - {getDanceSpeed(song[0].tempo, style)} speed
      </div>
    ));
  };

  const handleAssociateStyle = async (styleId: string) => {
    await fetch(`/api/song/associate/${song[0].id}/${styleId}`);
    setTimeout(() => {
      router.reload();
    }, 1000)
  };

  return (
    <Layout>
      <main>
        {!data || !styleData || loading || styleLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className='text-xl styles'>
              Styles for <span className='text-blue-500'>{`${song[0]?.artist} - ${song[0]?.name}`}</span>:
            </div>
            {styles.length > 0 && song[0] ? getStyles() : <div>No styles found!</div>}
            {addingStyle ? (
              <select
                className='w-full border border-black rounded style-select'
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
                className='mt-2 button'
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
