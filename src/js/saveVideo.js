import { ERROR_MESSAGE, REDIRECT_SERVER_HOST, VIDEO_ID_LIST_KEY, WATCHED_ID_LIST_KEY } from './constants/contants.js';
import mockDatas from './utils/mock.js';

class SaveVideo {
  constructor() {
    this.saveVideoIdList = this.getStorageVideoList();
    this.watchedVideoList = this.getStorageWatchedVideoList();
  }

  deleteVideoList(videoId) {
    console.log(videoId);
  }

  setStorageVideoList(videoId) {
    this.saveVideoIdList = [videoId, ...this.saveVideoIdList];
    localStorage.setItem(VIDEO_ID_LIST_KEY, JSON.stringify(this.saveVideoIdList));
  }

  getStorageVideoList() {
    return JSON.parse(localStorage.getItem(VIDEO_ID_LIST_KEY)) || [];
  }

  setStorageWatchedVideoList(watchedVideoId) {
    this.saveVideoIdList = this.saveVideoIdList.filter((v) => v !== watchedVideoId);
    localStorage.setItem(VIDEO_ID_LIST_KEY, JSON.stringify(this.saveVideoIdList));
    this.watchedVideoList = [watchedVideoId, ...this.watchedVideoList];
    localStorage.setItem(WATCHED_ID_LIST_KEY, JSON.stringify(this.watchedVideoList));
  }

  getStorageWatchedVideoList() {
    return JSON.parse(localStorage.getItem(WATCHED_ID_LIST_KEY)) || [];
  }

  getSaveVideoList = async (videoIdList) => {
    const url = new URL('youtube/v3/search', REDIRECT_SERVER_HOST);
    // const url = new URL('youtube/v3/videos', 'https://youtube.googleapis.com');
    const params = new URLSearchParams({
      part: 'snippet',
      regionCode: 'kr',
      id: [...videoIdList],
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
