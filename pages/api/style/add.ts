import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/adapter';

const danceResolver = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, avgBpm, variance } = req.body;
    const results = await query(
      `
        INSERT INTO styles (name, avg_bpm, variance) VALUES (?,?,?)
      `,
      [name, avgBpm, variance]
    );

    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default danceResolver;
