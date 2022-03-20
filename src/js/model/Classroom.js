import { getVideoItemsFromLocalStorage, saveVideoItemToLocalStorage } from '../utils/localStorage.js';

export class Classroom {
  #videoList;
  constructor() {
    this.#videoList;
  }

  getVideoItems() {
    this.videoList = getVideoItemsFromLocalStorage();
  }

  saveClassroomToLocalStorage() {
    saveVideoItemToLocalStorage(this.videoList);
  }

  removeVideoItemByVideoId(targetId) {
    this.videoList = this.videoList.filter((video) => video.id !== targetId);
    this.saveClassroomToLocalStorage();
  }

  moveVideoToWillSeeVideoById(targetId) {
    this.videoList.forEach((video) => {
      if (targetId === video.id) {
        video.watchLater = true;
      }
    });
    this.saveClassroomToLocalStorage();
  }

  moveVideoToAlreadyWatchedVideoById(targetId) {
    this.videoList.forEach((video) => {
      if (targetId === video.id) {
        video.watchLater = false;
      }
    });
    this.saveClassroomToLocalStorage();
  }

  hasNoWillSeeVideo() {
    return !this.videoList.some((video) => video.watchLater === true);
  }
  hasNoAlreadyWatchVideo() {
    return !this.videoList.some((video) => video.watchLater === false);
  }
}
