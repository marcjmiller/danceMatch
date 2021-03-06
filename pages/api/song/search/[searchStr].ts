import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/adapter';

const songSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { searchStr } = req.query;
    const queryStr = [searchStr, '%'].join('');
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
