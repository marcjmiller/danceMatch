import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/adapter';

export interface Song {
  id: number;
  artist: string;
  name: string;
  tempo: number;
}

const getAllSongs = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await query(
      `
        SELECT * FROM songs;
      `
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllSongs;
