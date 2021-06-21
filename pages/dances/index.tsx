import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { fetchFromApi } from '../../utils';
import { DanceStyle } from '../api/dance';

const Home = () => {
  const [dances, setDances] = useState([] as DanceStyle[]);
  const { data, error, loading } = fetchFromApi('/api/dance');

  useEffect(() => {
    data && setDances(data);
    error && console.error(error);
  }, [data, error]);

  return (
    <Layout>
      <main>
        <div className='text-4xl'>All Dances:</div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {dances.map((dance) => (
                <li key={dance.id}>
                  {dance.name} - {dance.avgBpm} avg BPM
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
