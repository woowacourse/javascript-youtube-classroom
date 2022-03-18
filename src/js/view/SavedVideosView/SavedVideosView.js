import { DELETE_CONFIRM_MESSAGE } from '../../constants/constants';
import storage from '../../domain/storage';
import getVideoList from '../../domain/VideoListAPI';
import { removeArrayIntersection, removeElementList, selectDom } from '../../util/util';
import { addSkeletonsToContainer, removeAllSkeletons } from '../Skeleton';
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

  constructor() {
    this.#savedVideos = selectDom('.saved-videos');
    this.#videoList = selectDom('.video-list', this.#savedVideos);
    this.#currentTabName = 'unwatched';
    this.#otherTabName = 'watched';
    this.#unrenderedVideoIdArray = storage.getFromStorage(this.#currentTabName);
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

    if (this.renderVideoList === 0 && videos.length === 0) {
      this.#renderNoSavedVideoTemplate();
      return;
    }

    const noSavedVideos = selectDom('.no-saved-videos');
    noSavedVideos?.remove();

    const newVideoIdArray = removeArrayIntersection(videos, this.#renderedVideoIdArray);
    await this.#renderNewVideos(newVideoIdArray);
  };

  renderOnModalClose = async () => {
    this.#unrenderedVideoIdArray = storage.getFromStorage(this.#currentTabName);
    this.renderVideoList();
  };

  #clearAllVideos() {
    removeElementList([...this.#videoList.childNodes]);
    this.#unrenderedVideoIdArray = storage.getFromStorage(this.#currentTabName);
    this.#renderedVideoIdArray = [];
  }

  async #renderNewVideos(newVideoIdArray) {
    if (newVideoIdArray.length !== 0) {
      addSkeletonsToContainer(this.#videoList, newVideoIdArray.length);

      const videoObjectArray = await getVideoList(newVideoIdArray);
      const videoElementList = this.#createVideoElements(videoObjectArray);

      removeAllSkeletons(this.#videoList);

      this.#videoList.append(...videoElementList);

      this.#renderedVideoIdArray = [...this.#renderedVideoIdArray, ...newVideoIdArray];
    }
  }

  #renderNoSavedVideoTemplate() {
    removeElementList([...this.#videoList.childNodes]);
    if (!selectDom('.no-saved-videos')) {
      this.#savedVideos.append(noSavedVideosTemplate());
    }
  }

  #removeDeletedVideos(videos) {
    const videosIdArray = videos || storage.getFromStorage(this.#currentTabName);

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
    storage.moveVideo({ from: this.#currentTabName, to: this.#otherTabName, value: videoId });
    this.#removeDeletedVideos();
  }

  #unsaveVideo(target) {
    if (window.confirm(DELETE_CONFIRM_MESSAGE)) {
      const { videoId } = target.dataset;
      storage.removeFromStorage(this.#currentTabName, videoId);
      this.#removeDeletedVideos();
    }
  }
}

export default SavedVideosView;
