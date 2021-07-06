import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/adapter';

const songsByStyle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { styleId } = req.query;
    const result = await query(
      `
        SELECT songs.artist,songs.name,songs.tempo 
        FROM songs 
        JOIN songs_styles 
          ON songs_styles.song_id = songs.id 
        JOIN styles 
          ON styles.id = songs_styles.style_id 
        WHERE styles.id = ?;
      `,
      styleId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default songsByStyle;
