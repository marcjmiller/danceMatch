import { useState } from 'react';
import Spinner from '../../components/icons/Spinner';
import Layout from '../../components/Layout';

const AddStyle = () => {
  const [style, setStyle] = useState({
    name: '',
    avgBpm: 0,
    variance: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const isFormValid = style.name !== '' && style.avgBpm > 0;

  const resetForm = () => {
    setStyle({
      name: '',
      avgBpm: 0,
      variance: 0,
    });
  };

  const handleSubmitDance = async () => {
    if (isFormValid) {
      setSubmitting(true);
      try {
        const { name, avgBpm, variance } = style;
        const res = await fetch('/api/dance/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, avgBpm, variance }),
        });
        setSubmitting(false);
        if (res.ok) {
          resetForm();
          setSubmitting(true);
          try {
            const { name, avgBpm, variance } = style;
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
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setStyle((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Layout>
      <main className='flex flex-col items-center w-auto' onKeyDown={(e) => e.key === 'Enter' && handleSubmitDance}>
        <div className='text-2xl'>Add a Style:</div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='name'>Name: </label>
          <input
            id='name'
            name='name'
            className='input'
            placeholder='Name'
            value={style.name}
            onChange={onChange}
            autoFocus
          />
        </div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='avgBpm'>Avg BPM: </label>
          <input id='avgBpm' name='avgBpm' type='number' className='input' value={style.avgBpm} onChange={onChange} />
        </div>
        <div className='flex items-center justify-between w-full py-2'>
          <label htmlFor='variance'>Variance: </label>
          <input
            id='variance'
            name='variance'
            type='number'
            className='input'
            value={style.variance}
            onChange={onChange}
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
