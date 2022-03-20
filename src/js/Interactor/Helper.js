import Database from '../Database/index.js';
import YoutubeAPI from '../YoutubeAPI/index.js';
import { formatDate } from '../utils/index.js';
import { REDIRECT_SERVER_HOST, DATABASE_VIDEO_KEY } from '../constants/index.js';
import { _ } from '../utils/fx.js';

const Helper = {
  findVideoById: (id) => _.find(({ videoId }) => videoId === id, Database.load(DATABASE_VIDEO_KEY)),

  convertVideoToItem: ({ id, snippet }) => ({
    id: id.videoId,
    thumbnail: snippet.thumbnails.default.url,
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    date: formatDate(snippet.publishTime),
    saved: Helper.findVideoById(id.videoId) !== undefined,
  }),

  fetchVideo: (host = REDIRECT_SERVER_HOST.DUMMY) =>
    _.go(YoutubeAPI.getVideos(host), _.map(Helper.convertVideoToItem)).catch(() =>
      Helper.fetchVideo(REDIRECT_SERVER_HOST.DUMMY),
    ),

  searchVideo: (keyword) => {
    YoutubeAPI.readyToFetch(keyword);

    return Helper.fetchVideo();
  },

  saveVideo: (video) => Database.save(DATABASE_VIDEO_KEY, { ...video, checked: false }),

  loadVideo: () => Database.load(DATABASE_VIDEO_KEY),
};

export default Helper;
