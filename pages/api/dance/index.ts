// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export interface DanceStyle {
  id: number;
  name: string;
}

export const styles: DanceStyle[] = [
  { id: 1, name: 'Bachata' },
  { id: 2, name: 'Cha Cha' },
  { id: 3, name: 'East Coast Swing' },
  { id: 4, name: 'Foxtrot' },
  { id: 5, name: 'Merengue' },
  { id: 6, name: 'Rhumba' },
  { id: 7, name: 'Salsa' },
  { id: 8, name: 'Tango' },
  { id: 9, name: 'Viennese Waltz' },
  { id: 10, name: 'Waltz' },
  { id: 11, name: 'West Coast Swing' },
];

const danceResolver = (req: NextApiRequest, res: NextApiResponse<DanceStyle[]>) => {
  res.status(200).json(styles);
};

export default danceResolver;
