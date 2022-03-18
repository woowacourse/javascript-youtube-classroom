import { DELETE_CONFIRM_MESSAGE } from '../../constants/constants';
import {
  getOneFromStorage,
  toggleWatchStatus,
  removeFromStorage,
  getFilteredIdFromStorage,
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
        const videoObjectArray = newVideoIdArray.map((id) => getOneFromStorage(id));
        const videoElementList = this.#createVideoElements(videoObjectArray);
        this.#videoList.append(...videoElementList);
        this.#renderedVideoIdArray = [...this.#renderedVideoIdArray, ...newVideoIdArray];
      }
    } catch (e) {
      this.#renderErrorTemplate(e.message);
    }
  }

  #renderNoSavedVideoTemplate() {
    removeElementList([...this.#videoList.childNodes]);
    if (!selectDom('.no-saved-videos')) {
      this.#savedVideos.append(noSavedVideosTemplate());
    }
  }

  #renderErrorTemplate(message) {
    if (!selectDom('.no-saved-videos')) {
      this.#savedVideos.append(errorTemplate(message));
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
      element.addEventListener('click', this.#handleVideoItemButtons);
      return element;
    });
  }

  #handleVideoItemButtons = ({ target }) => {
    if (target.classList.contains('video-item__watched-button')) {
      this.#moveToWatchedList(target);
    }
    if (target.classList.contains('video-item__unsave-button')) {
      this.#unsaveVideo(target);
    }
  };

  #moveToWatchedList(target) {
    const { videoId } = target.dataset;
    toggleWatchStatus(videoId);
    this.#removeDeletedVideos();
  }

  #unsaveVideo(target) {
    if (window.confirm(DELETE_CONFIRM_MESSAGE)) {
      const { videoId } = target.dataset;
      removeFromStorage(videoId);
      this.#removeDeletedVideos();
    }
  }
}

export default SavedVideosView;
