import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';

export interface Song {
  id: number;
  artist: string;
  name: string;
  tempo: number;
  styles: number[];
}

const getAllSongs = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    await query(`
      SELECT * FROM songs;
    `).then((results) => res.status(200).json(results));
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

export default getAllSongs;
