import { ERROR_MESSAGE, REDIRECT_SERVER_HOST, VIDEO_ID_LIST_KEY } from './constants/contants.js';
import mockDatas from './utils/mock.js';

class SaveVideo {
  constructor() {
    this.saveVideoIdList = this.getStorageVideoList();
  }

  setStorageVideoList(videoId) {
    this.saveVideoIdList = [videoId, ...this.saveVideoIdList];
    localStorage.setItem(VIDEO_ID_LIST_KEY, JSON.stringify(this.saveVideoIdList));
  }

  getStorageVideoList() {
    return JSON.parse(localStorage.getItem(VIDEO_ID_LIST_KEY)) || [];
  }

  getSaveVideoList = async () => {
    const url = new URL('youtube/v3/search', REDIRECT_SERVER_HOST);
    const params = new URLSearchParams({
      part: 'snippet',
      id: [...this.saveVideoIdList],
    });
    url.search = params.toString();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.CANNOT_GET_YOUTUBE_VIDEO);
    }
    const { items } = await response.json();
    return items;
    // return mockDatas;
  };
}

export default SaveVideo;
