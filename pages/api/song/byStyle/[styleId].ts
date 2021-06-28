import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/db';

const songsByStyle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { styleId } = req.query;

  if (styleId) {
    let filteredSongs = await query(
      `
      SELECT songs.artist,songs.name 
      FROM songs 
      JOIN songs_styles 
        ON songs_styles.song_id = songs.id 
      JOIN styles 
        ON styles.id = songs_styles.style_id 
      WHERE styles.id = ?;
    `,
      styleId
    );
    res.status(200).json(filteredSongs);
  }
};

export default songsByStyle;
