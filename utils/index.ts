import useSWR from 'swr';
import { DanceStyle } from '../pages/api/style';

export const fetchFromApi = (path: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(path, fetcher);
  const loading = !data && !error;

  return { data, error, loading };
};

export const getDanceSpeed = (bpm: number, dance: DanceStyle) => {
  if (bpm < dance.avg_bpm - dance.variance) {
    return `Slow`;
  } else if (bpm > dance.avg_bpm + dance.variance) {
    return `Fast`;
  }
  return `Average`;
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
