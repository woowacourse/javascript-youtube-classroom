import { REDIRECT_SERVER_HOST, VIDEO_ID_LIST_KEY, WATCHED_ID_LIST_KEY } from './constants/contants.js';
import mockDatas from './utils/mock.js';

class ControlVideo {
  static setVideoIdListByDeleteButton(deleteVideoId, divisionSection) {
    if (divisionSection.contains('will-watch-video-list')) {
      this.changeStorageVideoList(
        this.getStorageWillWatchVideoList(),
        deleteVideoId,
        VIDEO_ID_LIST_KEY
      );
    } else if (divisionSection.contains('watched-video-list')) {
      this.changeStorageVideoList(
        this.getStorageWatchedVideoList(),
        deleteVideoId,
        WATCHED_ID_LIST_KEY
      );
    }
  }

  static setVideoIdListByClickWatchedButton(videoId, divisionSection) {
    if (divisionSection.contains('will-watch-video-list')) {
      this.changeStorageVideoList(
        this.getStorageWillWatchVideoList(),
        videoId,
        VIDEO_ID_LIST_KEY
      );
      this.addStorageVideoList(
        this.getStorageWatchedVideoList(),
        videoId,
        WATCHED_ID_LIST_KEY
      );
    } else if (divisionSection.contains('watched-video-list')) {
      this.changeStorageVideoList(
        this.getStorageWatchedVideoList(),
        videoId,
        WATCHED_ID_LIST_KEY
      );
      this.addStorageVideoList(this.getStorageWillWatchVideoList(), videoId, VIDEO_ID_LIST_KEY);
    }
  }

  static changeStorageVideoList(videoList, clickVideoId, localStorageKeyName) {
    localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(videoList.filter((videoId) => videoId !== clickVideoId))
    );
  }

  static addStorageVideoList(videoList, videoId, localStorageKeyName) {
    localStorage.setItem(localStorageKeyName, JSON.stringify([videoId, ...videoList]));
  }

  static getStorageWillWatchVideoList() {
    return JSON.parse(localStorage.getItem(VIDEO_ID_LIST_KEY)) || [];
  }

  static getStorageWatchedVideoList() {
    return JSON.parse(localStorage.getItem(WATCHED_ID_LIST_KEY)) || [];
  }
}

export default ControlVideo;
