import youtubeSearchAPI from '../api/youtubeSearchapi.js';
import { checkValidSearchInput } from '../util/validator.js';
import VideoFactory from './VideoFactory.js';

const searchMachine = {
  changeKeyword(value) {
    checkValidSearchInput(value);
    return value;
  },

  async search(keyword, pageToken) {
    const data = await youtubeSearchAPI.searchByPage(keyword, pageToken);
    const videos = data.items.map((item) => VideoFactory.generate(item));

    return { videos, nextPageToken: data.nextPageToken };
  },
};

export default searchMachine;
