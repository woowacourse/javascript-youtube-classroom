/* eslint-disable max-lines-per-function */
import { SAVED_VIDEO_LIST_KEY, WATCHED_VIDEO_LIST_KEY } from '../constants/constant';
import { getSaveVideoList } from '../utils/request';

export default class StateController {
  constructor() {
    this.initVideoLists();
    this.printVideoLists();
  }

  printVideoLists() {
    console.log('ToWatch: ', StateController.prototype.savedToWatchVideoList);
    console.log('Watched: ', StateController.prototype.savedWatchedVideoList);
  }

  initVideoLists() {
    if (localStorage.getItem(SAVED_VIDEO_LIST_KEY)) {
      StateController.prototype.savedToWatchVideoList = getSaveVideoList(
        JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY))
      );
    }
    if (localStorage.getItem(WATCHED_VIDEO_LIST_KEY)) {
      StateController.prototype.savedWatchedVideoList = getSaveVideoList(
        JSON.parse(localStorage.getItem(WATCHED_VIDEO_LIST_KEY))
      );
    }
  }

  updateWholeVideoList(videoList) {
    StateController.prototype.wholeVideoList.push(...videoList);
  }

  saveVideo(videoId) {
    const oldLocalToWatchVideos = JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)) || [];
    if (oldLocalToWatchVideos.includes(videoId)) {
      return;
    }
    const newToWatchVideos = [...oldLocalToWatchVideos, videoId];
    localStorage.setItem(SAVED_VIDEO_LIST_KEY, JSON.stringify(newToWatchVideos));
    StateController.prototype.savedToWatchVideoList =
      StateController.prototype.wholeVideoList.filter(video => newToWatchVideos.includes(video.id));
  }

  watchVideo(videoId) {
    const oldLocalToWatchVideos = JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)) || [];
    const oldLocalWatchedVideos = JSON.parse(localStorage.getItem(WATCHED_VIDEO_LIST_KEY)) || [];
    const newToWatchVideos = oldLocalToWatchVideos.filter(video => video.id !== videoId);
    const newWatchedVideos = [...oldLocalWatchedVideos, videoId];

    localStorage.setItem(SAVED_VIDEO_LIST_KEY, JSON.stringify(newToWatchVideos));
    localStorage.setItem(WATCHED_VIDEO_LIST_KEY, JSON.stringify(newWatchedVideos));
    StateController.prototype.savedToWatchVideoList =
      StateController.prototype.wholeVideoList.filter(video => newToWatchVideos.includes(video.id));
    StateController.prototype.savedWatchedVideoList =
      StateController.prototype.wholeVideoList.filter(video => newWatchedVideos.includes(video.id));
  }

  deleteVideo(videoId) {
    const oldLocalWatchedVideos = JSON.parse(localStorage.get(WATCHED_VIDEO_LIST_KEY)) || [];
    const newWatchedVideos = oldLocalWatchedVideos.filter(video => video.id !== videoId);

    localStorage.setItem(WATCHED_VIDEO_LIST_KEY, JSON.stringify(newWatchedVideos));
    StateController.prototype.savedWatchedVideoList =
      StateController.prototype.wholeVideoList.filter(video => newWatchedVideos.includes(video.id));
  }
}

StateController.prototype.savedToWatchVideoList = [];
StateController.prototype.savedWatchedVideoList = [];
StateController.prototype.wholeVideoList = [];
