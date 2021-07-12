import React, { useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';

const AddSong = () => {
  const [song, setSong] = useState({
    artist: '',
    name: '',
    tempo: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const isFormValid = song.artist !== '' && song.name !== '' && song.tempo > 0;

  const resetForm = () => {
    setSong({
      artist: '',
      name: '',
      tempo: 0,
    });
  };

  const handleSubmitSong = async () => {
    if (isFormValid) {
      setSubmitting(true);
      try {
        const { artist, name, tempo } = song;
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
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSong((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Layout>
      <main className='flex flex-col items-center w-auto' onKeyDown={(e) => e.key === 'Enter' && handleSubmitSong}>
        <div className='text-2xl'>Add a Song:</div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='artist'>Artist: </label>
          <input
            id='artist'
            name='artist'
            className='input artist'
            placeholder='Artist'
            value={song.artist}
            onChange={onChange}
            autoFocus
          />
        </div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='name'>Name: </label>
          <input id='name' name='name' className='input name' placeholder='Name' value={song.name} onChange={onChange} />
        </div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='tempo'>Tempo: </label>
          <input id='tempo' name='tempo' type='number' className='input tempo' value={song.tempo} onChange={onChange} />
        </div>
        <div
          className='w-40 mt-2 button'
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
