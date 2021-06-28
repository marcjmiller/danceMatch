import React, { useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';

const AddSong = () => {
  const [artist, setArtist] = useState('');
  const [name, setName] = useState('');
  const [tempo, setTempo] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setArtist('');
    setName('');
    setTempo(0);
  };

  const handleSubmitSong = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/song/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artist, name, tempo }),
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
      <main className='flex flex-col items-center w-auto' onKeyDown={(e) => e.key === 'Enter' && handleSubmitSong}>
        <div className='text-2xl'>Add a Song:</div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='artist'>Artist: </label>
          <input
            id='artist'
            className='p-1 border border-black rounded'
            placeholder='Artist'
            value={artist}
            onChange={({ target: { value } }) => setArtist(value)}
            autoFocus
          />
        </div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='name'>Name: </label>
          <input
            id='name'
            className='p-1 border border-black rounded'
            placeholder='Name'
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
        </div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='tempo'>Tempo: </label>
          <input
            id='tempo'
            type='number'
            className='p-1 border border-black rounded'
            value={tempo}
            onChange={({ target: { value } }) => setTempo(+value)}
          />
        </div>
        <div
          className='w-40 p-1 mt-2 text-center bg-blue-300 rounded shadow-lg cursor-pointer hover:bg-blue-500 hover:text-white active:shadow-none'
          onClick={handleSubmitSong}
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

export default AddSong;
