import Link from 'next/link';
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

    return (
      <div className='flex style-row'>
        <div className='w-1/3 text-blue-400 hover:text-blue-500'><Link href={`/songs/byStyle/${dance.id}`}>{dance.name}</Link></div>
        <div className='w-1/3'>{`${minBpm}-${maxBpm} BPM`}</div>
        <div className='w-1/3'>{dance.avg_bpm}</div>
      </div>
    );
  };

  return (
    <Layout>
      <main className='w-1/2'>
        <div className='text-4xl'>All Styles:</div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div className='flex flex-col w-full'>
              <div className='flex font-bold'>
                <div className='w-1/3'>Name</div>
                <div className='w-1/3'>Tempo</div>
                <div className='w-1/3'>Avg Tempo</div>
              </div>
              {dances.map((dance) => (
                <div className='' key={dance.id}>
                  {getDanceInfo(dance)}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default GetAllDances;
