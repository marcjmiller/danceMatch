import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/adapter';

const associateSong = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const songId = slug[0];
    const styleId = slug[1];
    const result = await query(
      `
        INSERT INTO songs_styles (song_id, style_id) values (?,?)
      `,
      [songId, styleId]
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default associateSong;
