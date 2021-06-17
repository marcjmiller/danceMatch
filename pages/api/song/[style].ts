import { NextApiRequest, NextApiResponse } from 'next';
import { Song, songList } from '.';

const songsByStyle = (req: NextApiRequest, res: NextApiResponse<Song[]>) => {
  const { style } = req.query;
  let filteredSongs: Song[] = [];

  if (style) {
    filteredSongs = songList.filter((song) => song.styles.includes(+style[0]));
  }

  res.status(200).json(filteredSongs);
};

export default songsByStyle;
