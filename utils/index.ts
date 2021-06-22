import useSWR from 'swr';
import { DanceStyle } from '../pages/api/dance';

export const fetchFromApi = (path: string) => {
  const {data, error} = useSWR(path, fetcher);
  const loading = !data && !error;

  return {data, error, loading}
}

export const getDanceSpeed = (bpm: number, dance: DanceStyle) => {
  if (bpm < dance.avgBpm - dance.variance) {
    return `Slow ${dance.name}`;
  } else if (bpm > dance.avgBpm + dance.variance) {
    return `Fast ${dance.name}`;
  }
  return `Average ${dance.name}`;
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());