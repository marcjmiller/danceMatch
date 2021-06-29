import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';
import { fetchFromApi } from '../../utils';
import { Song } from '../api/song';

const SongDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [song, setSong] = useState([] as Song[]);

  const { data, loading, error } = fetchFromApi(`/api/song/${id}`);

  useEffect(() => {
    data && setSong(data);
    error && console.error(error);
  }, [data, error]);

  return (
    <Layout>
      <main>
        <div>{loading ? <Spinner /> : `${song[0]?.artist} - ${song[0]?.name}`}</div>
      </main>
    </Layout>
  );
};

export default SongDetails;
