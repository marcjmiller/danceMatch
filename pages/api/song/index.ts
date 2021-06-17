// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export interface Song {
  id: number;
  artist: string;
  name: string;
  tempo: number;
  styles: number[];
}

export const songList: Song[] = [
  { id: 1, artist: 'Maroon 5', name: 'Sugar', tempo: 120, styles: [1, 3, 5, 10] },
  { id: 2, artist: 'Train', name: 'Marry Me', tempo: 87, styles: [9, 10] },
  { id: 3, artist: 'Camila Cabello', name: 'Liar', tempo: 98, styles: [1, 6, 10] },
];

const songResolver = (req: NextApiRequest, res: NextApiResponse<Song[]>) => {
  res.status(200).json(songList);
};

export default songResolver;
