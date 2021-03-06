import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/adapter';

const danceById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const result = await query(
      `
        SELECT * from styles where id = ?
      `,
      id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default danceById;
