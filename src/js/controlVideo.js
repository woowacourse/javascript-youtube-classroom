import { ERROR_MESSAGE, REDIRECT_SERVER_HOST, VIDEO_ID_LIST_KEY, WATCHED_ID_LIST_KEY } from './constants/contants.js';
import mockDatas from './utils/mock.js';

class ControlVideo {
  static setVideoIdListByDeleteButton(deleteVideoId, divisionSection) {
    if (divisionSection.contains('will-watch-video-list')) {
      this.changeLocalStroageVideoList(
        this.getStorageVideoList(),
        deleteVideoId,
        VIDEO_ID_LIST_KEY
      );
    } else if (divisionSection.contains('watched-video-list')) {
      this.changeLocalStroageVideoList(
        this.getStorageWatchedVideoList(),
        deleteVideoId,
        WATCHED_ID_LIST_KEY
      );
    }
  }

  static setVideoIdListByClickWatchedButton(videoId, divisionSection) {
    if (divisionSection.contains('will-watch-video-list')) {
      this.changeLocalStroageVideoList(
        this.getStorageVideoList(),
        videoId,
        VIDEO_ID_LIST_KEY
      );
      this.addLocalStorageVideoList(
        this.getStorageWatchedVideoList(),
        videoId,
        WATCHED_ID_LIST_KEY
      );
    } else if (divisionSection.contains('watched-video-list')) {
      this.changeLocalStroageVideoList(
        this.getStorageWatchedVideoList(),
        videoId,
        WATCHED_ID_LIST_KEY
      );
      this.addLocalStorageVideoList(this.getStorageVideoList(), videoId, VIDEO_ID_LIST_KEY);
    }
  }

  static changeLocalStroageVideoList(videoList, clickVideoId, localStorageKeyName) {
    localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(videoList.filter((videoId) => videoId !== clickVideoId))
    );
  }

  static addLocalStorageVideoList(videoList, videoId, localStorageKeyName) {
    localStorage.setItem(localStorageKeyName, JSON.stringify([videoId, ...videoList]));
  }

  static getStorageVideoList() {
    return JSON.parse(localStorage.getItem(VIDEO_ID_LIST_KEY)) || [];
  }

  static getStorageWatchedVideoList() {
    return JSON.parse(localStorage.getItem(WATCHED_ID_LIST_KEY)) || [];
  }
}

export default ControlVideo;
