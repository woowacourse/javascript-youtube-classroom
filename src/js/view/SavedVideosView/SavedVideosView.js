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
    this.#unrenderedVideoIdArray = getFilteredIdFromStorage(
      'watched',
      this.#currentTabName === 'watched'
    );
    this.#renderedVideoIdArray = [];
    this.#endOfList = selectDom('.end-of-list');
    this.#observer = this.#loadMoreObserver();
    this.renderVideoList();
    this.#observer.observe(this.#endOfList);
  }

  async renderTab(tabName) {
    if (tabName === this.#currentTabName) return;

    [this.#currentTabName, this.#otherTabName] = [this.#otherTabName, this.#currentTabName];
    this.#clearAllVideos();

    await this.renderVideoList();
    this.#observer.observe(this.#endOfList);
  }

  renderVideoList = async () => {
    const videos = this.#unrenderedVideoIdArray.splice(0, 10);

    if (this.#renderedVideoIdArray.length === 0 && videos.length === 0) {
      this.#renderNoSavedVideoTemplate();
      return;
    }

    const noSavedVideos = selectDom('.no-saved-videos');
    noSavedVideos?.remove();

    const newVideoIdArray = removeArrayIntersection(videos, this.#renderedVideoIdArray);
    await this.#renderNewVideos(newVideoIdArray);
  };

  renderOnModalClose = async () => {
    this.#unrenderedVideoIdArray = getFilteredIdFromStorage(
      'watched',
      this.#currentTabName === 'watched'
    );
    this.renderVideoList();
  };

  #clearAllVideos() {
    removeElementList([...this.#videoList.childNodes]);
    this.#unrenderedVideoIdArray = getFilteredIdFromStorage(
      'watched',
      this.#currentTabName === 'watched'
    );
    this.#renderedVideoIdArray = [];
  }

  async #renderNewVideos(newVideoIdArray) {
    try {
      if (newVideoIdArray.length !== 0) {
        const videoObjectArray = newVideoIdArray.map((id) => getAllFromStorage()[id]);
        const videoElementList = this.#createVideoElements(videoObjectArray);
        this.#videoList.append(...videoElementList);
        this.#renderedVideoIdArray = [...this.#renderedVideoIdArray, ...newVideoIdArray];
      }
    } catch (e) {
      if (!selectDom('.no-saved-videos')) {
        this.#savedVideos.append(errorTemplate());
      }
    }
  }

  #renderNoSavedVideoTemplate() {
    removeElementList([...this.#videoList.childNodes]);
    if (!selectDom('.no-saved-videos')) {
      this.#savedVideos.append(noSavedVideosTemplate());
    }
  }

  #removeDeletedVideos(videos) {
    const videosIdArray =
      videos || getFilteredIdFromStorage('watched', this.#currentTabName === 'watched');

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

  #loadMoreObserver() {
    return new IntersectionObserver(
      async (entries) => {
        if (this.#unrenderedVideoIdArray.length === 0) {
          this.#observer.unobserve(this.#endOfList);
          return;
        }
        if (entries[0].isIntersecting) {
          await this.renderVideoList();
        }
      },
      { threshold: 1 }
    );
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
}

export default SavedVideosView;
