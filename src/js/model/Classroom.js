import { getVideoItemsFromLocalStorage, saveVideoItemToLocalStorage } from '../utils/localStorage.js';

export class Classroom {
  #videoList;
  constructor() {
    this.#videoList;
    this.cache = {};
  }

  getVideoItems() {
    this.videoList = getVideoItemsFromLocalStorage();
  }

  saveClassroomToLocalStorage() {
    saveVideoItemToLocalStorage(this.videoList);
  }

  saveVideoToVideoList(video) {
    this.videoList.push(video);
    this.saveClassroomToLocalStorage();
  }

  removeVideoItemByVideoId(target) {
    this.videoList = this.videoList.filter((video) => video.id !== target.id);
    this.saveClassroomToLocalStorage();
  }

  moveVideoToWillSeeVideoById(target) {
    this.videoList.forEach((video) => {
      if (target.id === video.id) {
        video.watchLater = true;
      }
    });

    this.saveClassroomToLocalStorage();
  }

  moveVideoToAlreadyWatchedVideoById(target) {
    this.videoList.forEach((video) => {
      if (target.id === video.id) {
        video.watchLater = false;
      }
    });

    this.saveClassroomToLocalStorage();
  }

  saveExecutionToCache(target) {
    this.cache[target.id] = {
      title: target.parentNode.parentNode.childNodes[3].innerText,
      channelName: target.parentNode.parentNode.childNodes[5].innerText,
      publishedDate: target.parentNode.parentNode.childNodes[7].innerText,
      id: target.id,
      watchLater: !target.parentNode.childNodes[1].classList.contains('clicked'),
      removed: target.classList.contains('discard-button'),
    };
  }

  rollbackExecution(target) {
    this.cache[target.id];
  }

  hasNoWillSeeVideo() {
    return !this.videoList.some((video) => video.watchLater === true);
  }
  hasNoAlreadyWatchVideo() {
    return !this.videoList.some((video) => video.watchLater === false);
  }
}
