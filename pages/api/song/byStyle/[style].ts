import { NextApiRequest, NextApiResponse } from 'next';
import { Song } from '..';

const songsByStyle = (req: NextApiRequest, res: NextApiResponse<Song[]>) => {
  const { style } = req.query;
  let filteredSongs: Song[] = [];

  // TODO: Implement this again using the DB and many-many relationships table
  // if (style) {
  //   filteredSongs = songList.filter((song) => song.styles.includes(+style[0]));
  // }

  res.status(200).json(filteredSongs);
};

export default songsByStyle;
