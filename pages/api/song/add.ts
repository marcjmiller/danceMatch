import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/adapter';

const songResolver = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { artist, name, tempo } = req.body;
    const result = await query(
      `
        INSERT INTO songs (artist, name, tempo) VALUES (?,?,?)
      `,
      [artist, name, tempo]
    );

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default songResolver;
