import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/adapter';

export interface DanceStyle {
  id: number;
  name: string;
  avg_bpm: number;
  variance: number;
}

const getAllStyles = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await query(
      `
        SELECT * FROM styles;
      `
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllStyles;
