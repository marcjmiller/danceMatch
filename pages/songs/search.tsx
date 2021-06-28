import React, { useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';

const Search = () => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSearch = () => {
    setSubmitting(true);
    alert('searching!');
    setSubmitting(false);
  };

  return (
    <Layout>
      <main>
        <div className='flex flex-col items-center'>
          <div className='text-xl'>Find a song</div>
          <div className='flex items-center justify-between w-full py-2'>
            <label htmlFor='Name'>Name: </label>
            <input
              id='Name'
              className='p-1 ml-2 border border-black rounded'
              placeholder='Name'
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              autoFocus
            />
          </div>
          <div className='flex items-center justify-between w-full py-2'>
            <label htmlFor='Artist'>Artist: </label>
            <input
              id='Artist'
              className='p-1 ml-2 border border-black rounded'
              placeholder='Artist'
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              autoFocus
            />
          </div>
          <div
            className='w-40 p-1 mt-2 text-center bg-blue-300 rounded shadow-lg cursor-pointer hover:bg-blue-500 hover:text-white active:shadow-none'
            onClick={handleSearch}
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
        </div>
      </main>
    </Layout>
  );
};

export default Search;
