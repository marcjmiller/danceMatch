import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/adapter';

const stylesBySong = async (req: NextApiRequest, res: NextApiResponse) => {
  const { songId } = req.query;
  try {
    const result = await query(
      `
      SELECT styles.id,styles.name,styles.avg_bpm,styles.variance 
      FROM styles
      JOIN songs_styles 
        ON songs_styles.style_id = styles.id 
      JOIN songs 
        ON songs.id = songs_styles.song_id 
      WHERE songs.id = ?;
    `,
      songId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default stylesBySong;
