import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/db';

const songSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchStr } = req.query;
  const queryStr = [searchStr, '%'].join('');
  try {
    const result = await query(
      `
      SELECT * FROM songs WHERE artist LIKE ? OR name LIKE ?;
    `,
      [queryStr, queryStr]
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default songSearch;
