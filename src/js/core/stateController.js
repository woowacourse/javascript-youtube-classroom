/* eslint-disable max-lines-per-function */
import { SAVED_VIDEO_LIST_KEY, WATCHED_VIDEO_LIST_KEY } from '../constants/constant';
import { getSaveVideoList, testSaveRequest } from '../utils/request';
import { checkSearchResult } from '../videoItem';

export default class StateController {
  async initVideoLists() {
    if (!localStorage.getItem(SAVED_VIDEO_LIST_KEY)) {
      localStorage.setItem(SAVED_VIDEO_LIST_KEY, '[]');
    }
    if (!localStorage.getItem(WATCHED_VIDEO_LIST_KEY)) {
      localStorage.setItem(WATCHED_VIDEO_LIST_KEY, '[]');
    }
    if (localStorage.getItem(SAVED_VIDEO_LIST_KEY)) {
      StateController.savedToWatchVideoList = checkSearchResult(
        await testSaveRequest(JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)))
      );
    }
    if (localStorage.getItem(WATCHED_VIDEO_LIST_KEY)) {
      StateController.savedWatchedVideoList = checkSearchResult(
        await testSaveRequest(JSON.parse(localStorage.getItem(WATCHED_VIDEO_LIST_KEY)))
      );
    }
    StateController.wholeVideoList = [
      ...StateController.savedToWatchVideoList,
      ...StateController.savedWatchedVideoList,
    ];
  }

  updateWholeVideoList(videoList) {
    StateController.wholeVideoList.push(...videoList);
  }

  saveVideo(videoId) {
    const oldLocalToWatchVideos = JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)) || [];
    if (oldLocalToWatchVideos.includes(videoId)) {
      return;
    }
    const newToWatchVideos = [...oldLocalToWatchVideos, videoId];
    localStorage.setItem(SAVED_VIDEO_LIST_KEY, JSON.stringify(newToWatchVideos));
    StateController.savedToWatchVideoList = StateController.wholeVideoList.filter(video =>
      newToWatchVideos.includes(video.id)
    );
  }

  watchVideo(videoId) {
    const oldLocalToWatchVideos = JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)) || [];
    const oldLocalWatchedVideos = JSON.parse(localStorage.getItem(WATCHED_VIDEO_LIST_KEY)) || [];
    const newToWatchVideos = oldLocalToWatchVideos.filter(id => id !== videoId);
    const newWatchedVideos = [...oldLocalWatchedVideos, videoId];

    localStorage.setItem(SAVED_VIDEO_LIST_KEY, JSON.stringify(newToWatchVideos));
    localStorage.setItem(WATCHED_VIDEO_LIST_KEY, JSON.stringify(newWatchedVideos));
    StateController.savedToWatchVideoList = StateController.wholeVideoList.filter(video =>
      newToWatchVideos.includes(video.id)
    );
    StateController.savedWatchedVideoList = StateController.wholeVideoList.filter(video =>
      newWatchedVideos.includes(video.id)
    );
  }

  deleteVideo(videoId) {
    const oldLocalWatchedVideos = JSON.parse(localStorage.getItem(WATCHED_VIDEO_LIST_KEY)) || [];
    const oldLocalToWatchVideos = JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)) || [];
    const newWatchedVideos = oldLocalWatchedVideos.filter(id => id !== videoId);
    const newToWatchVideos = oldLocalToWatchVideos.filter(id => id !== videoId);

    localStorage.setItem(SAVED_VIDEO_LIST_KEY, JSON.stringify(newToWatchVideos));
    localStorage.setItem(WATCHED_VIDEO_LIST_KEY, JSON.stringify(newWatchedVideos));

    StateController.savedToWatchVideoList = StateController.wholeVideoList.filter(video =>
      newToWatchVideos.includes(video.id)
    );
    StateController.savedWatchedVideoList = StateController.wholeVideoList.filter(video =>
      newWatchedVideos.includes(video.id)
    );
  }
}

StateController.prototype.savedToWatchVideoList = [];
StateController.prototype.savedWatchedVideoList = [];
StateController.prototype.wholeVideoList = [];
