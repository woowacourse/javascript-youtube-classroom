/* eslint-disable max-lines-per-function */
import { SAVED_VIDEO_LIST_KEY, WATCHED_VIDEO_LIST_KEY } from '../constants/constant';
import { getSaveVideoList, testSaveRequest } from '../utils/request';
import { checkSearchResult } from '../videoItem';

export default class StateController {
  printVideoLists() {
    console.log('ToWatch: ', StateController.prototype.savedToWatchVideoList);
    console.log('Watched: ', StateController.prototype.savedWatchedVideoList);
    console.log('Whole: ', StateController.prototype.wholeVideoList);
  }

  async initVideoLists() {
    if (localStorage.getItem(SAVED_VIDEO_LIST_KEY)) {
      StateController.prototype.savedToWatchVideoList = checkSearchResult(
        await testSaveRequest(JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)))
      );
    }
    if (localStorage.getItem(WATCHED_VIDEO_LIST_KEY)) {
      StateController.prototype.savedWatchedVideoList = checkSearchResult(
        await testSaveRequest(JSON.parse(localStorage.getItem(WATCHED_VIDEO_LIST_KEY)))
      );
    }
    StateController.prototype.wholeVideoList = [
      ...this.savedToWatchVideoList,
      ...this.savedWatchedVideoList,
    ];
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
    const newToWatchVideos = oldLocalToWatchVideos.filter(id => id !== videoId);
    const newWatchedVideos = [...oldLocalWatchedVideos, videoId];

    localStorage.setItem(SAVED_VIDEO_LIST_KEY, JSON.stringify(newToWatchVideos));
    localStorage.setItem(WATCHED_VIDEO_LIST_KEY, JSON.stringify(newWatchedVideos));
    StateController.prototype.savedToWatchVideoList =
      StateController.prototype.wholeVideoList.filter(video => newToWatchVideos.includes(video.id));
    StateController.prototype.savedWatchedVideoList =
      StateController.prototype.wholeVideoList.filter(video => newWatchedVideos.includes(video.id));
  }

  deleteVideo(videoId) {
    const oldLocalWatchedVideos = JSON.parse(localStorage.getItem(WATCHED_VIDEO_LIST_KEY)) || [];
    const oldLocalToWatchVideos = JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)) || [];
    const newWatchedVideos = oldLocalWatchedVideos.filter(id => id !== videoId);
    const newToWatchVideos = oldLocalToWatchVideos.filter(id => id !== videoId);

    localStorage.setItem(SAVED_VIDEO_LIST_KEY, JSON.stringify(newToWatchVideos));
    localStorage.setItem(WATCHED_VIDEO_LIST_KEY, JSON.stringify(newWatchedVideos));

    StateController.prototype.savedToWatchVideoList =
      StateController.prototype.wholeVideoList.filter(video => newToWatchVideos.includes(video.id));
    StateController.prototype.savedWatchedVideoList =
      StateController.prototype.wholeVideoList.filter(video => newWatchedVideos.includes(video.id));
  }
}

StateController.prototype.savedToWatchVideoList = [];
StateController.prototype.savedWatchedVideoList = [];
StateController.prototype.wholeVideoList = [];
