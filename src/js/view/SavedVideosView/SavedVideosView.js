import {
  DELETE_CONFIRM_MESSAGE,
  SAVED_VIDEO_PAGINATION_COUNT,
  TAB_NAMES,
} from '../../constants/constants';

import { removeCommonElements, removeElementList, selectDom } from '../util/util';
import { noSavedVideosTemplate, savedVideoElementTemplate } from './SavedVideosTemplate';

class SavedVideosView {
  #savedVideos;

  #videoList;

  #currentTabName;

  #otherTabName;

  #unrenderedVideoIdArray;

  #renderedVideoIdArray;

  #endOfList;

  #observer;

  #tabButtons;

  #manageVideoStorage;

  constructor(manageVideoStorage) {
    this.#manageVideoStorage = manageVideoStorage;
    this.#savedVideos = selectDom('.saved-videos');
    this.#videoList = selectDom('.video-list', this.#savedVideos);
    [this.#currentTabName, this.#otherTabName] = [TAB_NAMES.UNWATCHED, TAB_NAMES.WATCHED];
    this.#unrenderedVideoIdArray = this.#getCurrentTabIds();
    this.#renderedVideoIdArray = [];
    this.#endOfList = selectDom('.end-of-list');
    this.#observer = this.#loadMoreObserver();
    this.#renderVideoList();
    this.#observer.observe(this.#endOfList);
    this.#tabButtons = document.querySelectorAll('.tab-button');
    this.#tabButtons.forEach((button) => button.addEventListener('click', this.handleTabSwitch));
  }

  handleTabSwitch = ({ target }) => {
    const { dataset } = target;

    this.#tabButtons.forEach((button) => {
      button.classList.remove('current');
      button.disabled = true;
    });

    this.#switchTab(dataset.tabName);
    target.classList.add('current');

    this.#tabButtons.forEach((button) => {
      button.disabled = false;
    });
  };

  #switchTab(tabName) {
    if (tabName === this.#currentTabName) return;

    [this.#currentTabName, this.#otherTabName] = [this.#otherTabName, this.#currentTabName];
    this.#removeAllVideos();

    this.#renderVideoList();
    this.#observer.observe(this.#endOfList);
  }

  #renderVideoList = () => {
    const videos = this.#unrenderedVideoIdArray.splice(0, SAVED_VIDEO_PAGINATION_COUNT);

    if (this.#renderedVideoIdArray.length === 0 && videos.length === 0) {
      this.#renderNoSavedVideoTemplate();
      return;
    }

    const noSavedVideos = selectDom('.no-saved-videos', this.#savedVideos);
    noSavedVideos?.remove();

    const newVideoIdArray = removeCommonElements(videos, this.#renderedVideoIdArray);
    this.#renderNewVideos(newVideoIdArray);
  };

  renderVideoListUpdate = () => {
    this.#unrenderedVideoIdArray = this.#getCurrentTabIds();
    this.#renderVideoList();
  };

  #loadMoreObserver() {
    return new IntersectionObserver(
      (entries) => {
        if (this.#unrenderedVideoIdArray.length === 0) {
          this.#observer.unobserve(this.#endOfList);
          return;
        }
        if (entries[0].isIntersecting) {
          this.#renderVideoList();
        }
      },
      { threshold: 1 }
    );
  }

  #renderNewVideos(newVideoIdArray) {
    if (newVideoIdArray.length === 0) return;

    const videoObjectArray = newVideoIdArray.map((id) => {
      const videoObjects = this.#manageVideoStorage.getCachedVideoObjects();
      return videoObjects[id];
    });
    const videoElementList = this.#createVideoElements(videoObjectArray);
    this.#videoList.append(...videoElementList);
    this.#renderedVideoIdArray = [...this.#renderedVideoIdArray, ...newVideoIdArray];
  }

  #renderNoSavedVideoTemplate() {
    this.#videoList.childNodes.removeAllChildren();
    if (!selectDom('.no-saved-videos', this.#savedVideos)) {
      this.#savedVideos.append(noSavedVideosTemplate());
    }
  }

  #removeAllVideos() {
    this.#videoList.childNodes.removeAllChildren();
    this.#unrenderedVideoIdArray = this.#getCurrentTabIds();
    this.#renderedVideoIdArray = [];
  }

  #removeDeletedVideos() {
    const videosIdArray = this.#getCurrentTabIds();

    const deletedVideoIdArray = removeCommonElements(this.#renderedVideoIdArray, videosIdArray);
    const toDeleteArray = [...this.#videoList.childNodes].filter((child) =>
      deletedVideoIdArray.includes(child.dataset.videoId)
    );

    removeElementList(toDeleteArray);
    this.#renderedVideoIdArray = removeCommonElements(
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
    this.#manageVideoStorage.toggleWatchStatus(videoId);
    this.#removeDeletedVideos();
  }

  #unsaveVideo(videoId) {
    if (window.confirm(DELETE_CONFIRM_MESSAGE)) {
      this.#manageVideoStorage.removeFromStorage(videoId);
      this.#removeDeletedVideos();
    }
  }

  #getCurrentTabIds() {
    return this.#manageVideoStorage.getFilteredIdFromStorage(
      'watched',
      this.#currentTabName === 'watched'
    );
  }
}

export default SavedVideosView;
