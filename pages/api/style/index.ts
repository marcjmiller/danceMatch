import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';

export interface DanceStyle {
  id: number;
  name: string;
  avg_bpm: number;
  variance: number;
}

const getAllStyles = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    await query(`
    SELECT * FROM styles;
  `).then((results) => res.status(200).json(results));
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

export default getAllStyles;
