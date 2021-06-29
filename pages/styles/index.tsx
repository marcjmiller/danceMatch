import React, { useEffect, useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';
import { fetchFromApi } from '../../utils';
import { DanceStyle } from '../api/style';

const GetAllDances = () => {
  const [dances, setDances] = useState([] as DanceStyle[]);
  const { data, error, loading } = fetchFromApi('/api/style');

  useEffect(() => {
    data && setDances(data);
    error && console.error(error);
  }, [data, error]);

  const getDanceInfo = (dance: DanceStyle) => {
    const minBpm = Number(dance.avg_bpm) - Number(dance.variance);
    const maxBpm = Number(dance.avg_bpm) + Number(dance.variance);

    return `${dance.name} - ${minBpm}-${maxBpm} BPM, ${dance.avg_bpm} Average BPM`;
  };

  return (
    <Layout>
      <main>
        <div className='text-4xl'>All Dances:</div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <ul>
              {dances.map((dance) => (
                <li key={dance.id}>{getDanceInfo(dance)}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default GetAllDances;
