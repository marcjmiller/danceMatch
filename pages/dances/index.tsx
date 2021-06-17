import { InferGetServerSidePropsType } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import { DanceStyle } from '../api/dance';

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <main>
        <div className='text-4xl'>All Dances:</div>
        <div className='flex justify-center'>
          <ul>
            {data.map((opt) => (
              <li key={opt.id}>{opt.name}</li>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/dance');
  const data: DanceStyle[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default Home;
