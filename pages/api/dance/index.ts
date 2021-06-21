import type { NextApiRequest, NextApiResponse } from 'next';

export interface DanceStyle {
  id: number;
  name: string;
  avgBpm: number;
  variance: number;
}

export const styles: DanceStyle[] = [
  { id: 1, name: 'Bachata', avgBpm: 128, variance: 8 },
  { id: 2, name: 'Cha Cha', avgBpm: 115, variance: 5 },
  { id: 3, name: 'East Coast Swing', avgBpm: 134, variance: 10 },
  { id: 4, name: 'Foxtrot', avgBpm: 115, variance: 5 },
  { id: 5, name: 'Merengue', avgBpm: 61, variance: 3 },
  { id: 6, name: 'Rhumba', avgBpm: 96, variance: 6 },
  { id: 7, name: 'Salsa', avgBpm: 200, variance: 50 },
  { id: 8, name: 'Tango', avgBpm: 124, variance: 4 },
  { id: 9, name: 'Viennese Waltz', avgBpm: 165, variance: 9 },
  { id: 10, name: 'Waltz', avgBpm: 87, variance: 3 },
  { id: 11, name: 'West Coast Swing', avgBpm: 114, variance: 14 },
];

const danceResolver = (req: NextApiRequest, res: NextApiResponse<DanceStyle[]>) => {
  res.status(200).json(styles);
};

export default danceResolver;
