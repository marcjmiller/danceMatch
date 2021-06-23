import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { fetchFromApi } from '../utils';
import { DanceStyle } from './api/style';

const Home = () => {
  const router = useRouter();
  const [dances, setDances] = useState([] as DanceStyle[]);
  const { data, error, loading } = fetchFromApi('/api/style');

  useEffect(() => {
    data && setDances(data);
    error && console.error(error);
  }, [data, error]);

  return (
    <Layout>
      <main className='flex flex-col items-center'>
        <div className='text-4xl text-center'>Welcome to DanceMatch!</div>
        <div className='flex flex-wrap justify-center'>
          To get started, pick a style:{' '}
          <select
            onChange={({ target: { value } }) => router.push(`/styles/${value}`)}
            required
            className='ml-2 border border-black rounded'
            defaultValue=''
          >
            <option value='' hidden disabled>
              I want to...
            </option>
            {!loading &&
              dances.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
          </select>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
