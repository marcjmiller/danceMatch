import React, { useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';

const AddStyle = () => {
  const [name, setName] = useState('');
  const [avgBpm, setAvgBpm] = useState(0);
  const [variance, setVariance] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setName('');
    setAvgBpm(0);
    setVariance(0);
  };

  const handleSubmitDance = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/dance/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avgBpm, variance }),
      });
      setSubmitting(false);
      if (res.ok) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <main className='flex flex-col items-center w-auto' onKeyDown={(e) => e.key === 'Enter' && handleSubmitDance}>
        <div className='text-2xl'>Add a Style:</div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='name'>Name: </label>
          <input
            id='name'
            className='input'
            placeholder='Name'
            value={name}
            onChange={({ target: { value } }) => setName(value.toString())}
            autoFocus
          />
        </div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='bpm'>Avg BPM: </label>
          <input
            id='bpm'
            type='number'
            className='input'
            value={avgBpm}
            onChange={({ target: { value } }) => setAvgBpm(+value)}
          />
        </div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='variance'>Variance: </label>
          <input
            id='variance'
            type='number'
            className='input'
            value={variance}
            onChange={({ target: { value } }) => setVariance(+value)}
          />
        </div>
        <div
          className='w-40 p-1 mt-2 text-center bg-blue-300 rounded shadow-lg cursor-pointer hover:bg-blue-500 hover:text-white active:shadow-none'
          onClick={handleSubmitDance}
        >
          {submitting ? (
            <span className='flex items-center justify-center'>
              <Spinner />
              Submitting
            </span>
          ) : (
            'Submit'
          )}
        </div>
      </main>
    </Layout>
  );
};

export default AddStyle;
