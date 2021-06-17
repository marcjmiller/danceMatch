import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Song } from '../api/song';

const Songs = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>ID: {id}</div>
      <div>Artist: {data.artist}</div>
      <div>Dance Styles: {data.styles}</div>
      <div>Tempo: {data.tempo}BPM</div>
    </>
  );
};

export default Songs;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/songs');
  const data: Song = await res.json();

  return {
    props: {
      data,
    },
  };
};
