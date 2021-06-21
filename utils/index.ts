import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { DanceStyle } from '../pages/api/dance';

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching: ${error}`);
      }
    };

    fetchData();
  }, [url]);
  return { data, error, loading };
};

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