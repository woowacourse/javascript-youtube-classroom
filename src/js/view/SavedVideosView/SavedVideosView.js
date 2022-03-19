import { DELETE_CONFIRM_MESSAGE } from '../../constants/constants';
import {
  toggleWatchStatus,
  removeFromStorage,
  getFilteredIdFromStorage,
  getAllFromStorage,
} from '../../domain/storage';
import { removeArrayIntersection, removeElementList, selectDom } from '../util/util';
import {
  errorTemplate,
  noSavedVideosTemplate,
  savedVideoElementTemplate,
} from './SavedVideosTemplate';

class SavedVideosView {
  #savedVideos;

  #videoList;

  #currentTabName;

  #otherTabName;

  #unrenderedVideoIdArray;

  #renderedVideoIdArray;

  #endOfList;

  #observer;

  constructor() {
    this.#savedVideos = selectDom('.saved-videos');
    this.#videoList = selectDom('.video-list', this.#savedVideos);
    this.#currentTabName = 'unwatched';
    this.#otherTabName = 'watched';
    this.#unrenderedVideoIdArray = this.#getCurrentTabIds();
    this.#renderedVideoIdArray = [];
    this.#endOfList = selectDom('.end-of-list');
    this.#observer = this.#loadMoreObserver();
    this.renderVideoList();
    this.#observer.observe(this.#endOfList);
  }

  renderTab(tabName) {
    if (tabName === this.#currentTabName) return;

    [this.#currentTabName, this.#otherTabName] = [this.#otherTabName, this.#currentTabName];
    this.#removeAllVideos();

    this.renderVideoList();
    this.#observer.observe(this.#endOfList);
  }

  renderVideoList = () => {
    const videos = this.#unrenderedVideoIdArray.splice(0, 10);

    if (this.#renderedVideoIdArray.length === 0 && videos.length === 0) {
      this.#renderNoSavedVideoTemplate();
      return;
    }

    const noSavedVideos = selectDom('.no-saved-videos', this.#savedVideos);
    noSavedVideos?.remove();

    const newVideoIdArray = removeArrayIntersection(videos, this.#renderedVideoIdArray);
    this.#renderNewVideos(newVideoIdArray);
  };

  renderOnModalClose = () => {
    this.#unrenderedVideoIdArray = this.#getCurrentTabIds();
    this.renderVideoList();
  };

  #loadMoreObserver() {
    return new IntersectionObserver(
      (entries) => {
        if (this.#unrenderedVideoIdArray.length === 0) {
          this.#observer.unobserve(this.#endOfList);
          return;
        }
        if (entries[0].isIntersecting) {
          this.renderVideoList();
        }
      },
      { threshold: 1 }
    );
  }

  #renderNewVideos(newVideoIdArray) {
    try {
      if (newVideoIdArray.length !== 0) {
        const videoObjectArray = newVideoIdArray.map((id) => getAllFromStorage()[id]);
        const videoElementList = this.#createVideoElements(videoObjectArray);
        this.#videoList.append(...videoElementList);
        this.#renderedVideoIdArray = [...this.#renderedVideoIdArray, ...newVideoIdArray];
      }
    } catch (e) {
      this.#savedVideos.append(errorTemplate());
    }
  }

  #renderNoSavedVideoTemplate() {
    removeElementList([...this.#videoList.childNodes]);
    if (!selectDom('.no-saved-videos', this.#savedVideos)) {
      this.#savedVideos.append(noSavedVideosTemplate());
    }
  }

  #removeAllVideos() {
    removeElementList([...this.#videoList.childNodes]);
    this.#unrenderedVideoIdArray = this.#getCurrentTabIds();
    this.#renderedVideoIdArray = [];
  }

  #removeDeletedVideos(videos) {
    const videosIdArray = videos || this.#getCurrentTabIds();

    const deletedVideoIdArray = removeArrayIntersection(this.#renderedVideoIdArray, videosIdArray);
    const toDeleteArray = [...this.#videoList.childNodes].filter((child) =>
      deletedVideoIdArray.includes(child.dataset.videoId)
    );
    removeElementList(toDeleteArray);
    this.#renderedVideoIdArray = removeArrayIntersection(
      this.#renderedVideoIdArray,
      deletedVideoIdArray
    );
    if (this.#renderedVideoIdArray.length === 0) this.#renderNoSavedVideoTemplate();
  }

  #createVideoElements(videoObjectArray) {
    return videoObjectArray.map((object) => {
      const element = savedVideoElementTemplate(object, this.#currentTabName);
      const videoButtonHandler = (e) => this.#handleVideoItemButtons(e, object.videoId);
      element.addEventListener('click', videoButtonHandler);
      return element;
    });
  }

  #handleVideoItemButtons = ({ target }, videoId) => {
    if (target.classList.contains('video-item__watched-button')) {
      this.#moveToWatchedList(videoId);
    }
    if (target.classList.contains('video-item__unsave-button')) {
      this.#unsaveVideo(videoId);
    }
  };

  #moveToWatchedList(videoId) {
    toggleWatchStatus(videoId);
    this.#removeDeletedVideos();
  }

  #unsaveVideo(videoId) {
    if (window.confirm(DELETE_CONFIRM_MESSAGE)) {
      removeFromStorage(videoId);
      this.#removeDeletedVideos();
    }
  }

  #getCurrentTabIds() {
    return getFilteredIdFromStorage('watched', this.#currentTabName === 'watched');
  }
}

export default SavedVideosView;
