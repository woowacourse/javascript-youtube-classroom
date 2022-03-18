import storage from '../../domain/storage';
import getSearchResult from '../../domain/VideoListAPI';
import { removeElementList, selectDom } from '../../util/util';
import getSkeletonTemplateArray, { removeAllSkeletons } from '../Skeleton';
import { noSavedVideosTemplate, savedVideoElementTemplate } from './SavedVideosTemplate';

class SavedVideosView {
  constructor() {
    this.savedVideos = selectDom('.saved-videos');
    this.videoList = selectDom('.video-list', this.savedVideos);
    this.currentTabName = 'unwatched';
    this.otherTabName = 'watched';
    this.unrenderedVideoIdArray = storage.getFromStorage(this.currentTabName);
    this.renderedVideoIdArray = [];
    this.#addLoadMoreVideoObserver();
    this.renderVideoList();
  }

  async renderTab(tabName) {
    if (tabName === this.currentTabName) return;
    this.otherTabName = this.currentTabName;
    this.currentTabName = tabName;
    this.unrenderedVideoIdArray = storage.getFromStorage(this.currentTabName);
    this.#clearAllVideos();
    this.#addLoadMoreVideoObserver();
    await this.renderVideoList();
  }

  renderVideoList = async () => {
    const videos = this.unrenderedVideoIdArray.splice(0, 10);
    if (videos.length === 0) {
      this.#renderNoSavedVideoTemplate();
      return;
    }
    const noSavedVideos = selectDom('.no-saved-videos');
    noSavedVideos?.remove();
    const newVideoIdArray = videos.filter((id) => !this.renderedVideoIdArray.includes(id));
    if (newVideoIdArray.length !== 0) {
      await this.#renderNewVideos(newVideoIdArray);
      this.renderedVideoIdArray = [...this.renderedVideoIdArray, ...newVideoIdArray];
      this.#addLoadMoreVideoObserver();
    }
  };

  renderOnModalClose = async () => {
    this.unrenderedVideoIdArray = storage.getFromStorage(this.currentTabName);
    this.#clearAllVideos();
    this.renderVideoList();
  };

  async #renderNewVideos(newVideoIdArray) {
    this.videoList.append(...getSkeletonTemplateArray(newVideoIdArray.length));
    const videoObjectArray = await getSearchResult(newVideoIdArray);
    const videoElementList = this.#createVideoElements(videoObjectArray);
    removeAllSkeletons(this.videoList);
    this.videoList.append(...videoElementList);
  }

  #clearAllVideos() {
    [...this.videoList.childNodes].forEach((child) => {
      child.remove();
    });
    this.renderedVideoIdArray = [];
  }

  #removeDeletedVideos(videos) {
    const videosIdArray = videos || storage.getFromStorage(this.currentTabName);
    const deletedVideoIdArray = this.renderedVideoIdArray.filter(
      (id) => !videosIdArray.includes(id)
    );
    const toDeleteArray = [...this.videoList.childNodes].filter((child) =>
      deletedVideoIdArray.includes(child.dataset.videoId)
    );
    toDeleteArray.forEach((element) => element.remove());

    this.renderedVideoIdArray = this.renderedVideoIdArray.filter(
      (id) => !deletedVideoIdArray.includes(id)
    );
    if (this.renderedVideoIdArray.length === 0) this.#renderNoSavedVideoTemplate();
  }

  #addLoadMoreVideoObserver() {
    const endOfList = selectDom('.end-of-list');
    if (this.renderedVideoIdArray.length < 10) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (this.unrenderedVideoIdArray.length === 0) observer.unobserve(endOfList);
        if (entries[0].isIntersecting) {
          this.renderVideoList();
        }
      },
      { threshold: 1 }
    );
    observer.observe(endOfList);
  }

  #createVideoElements(videoObjectArray) {
    return videoObjectArray.map((object) => {
      const element = savedVideoElementTemplate(object, this.currentTabName);
      element.addEventListener('click', this.#handleVideoItemButtons);
      return element;
    });
  }

  #renderNoSavedVideoTemplate() {
    removeElementList(this.videoList.childNodes);
    if (!selectDom('.no-saved-videos')) {
      this.savedVideos.append(noSavedVideosTemplate());
    }
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
    storage.moveVideo({ from: this.currentTabName, to: this.otherTabName, value: videoId });
    this.#removeDeletedVideos();
  }

  #unsaveVideo(target) {
    if (window.confirm('해당 영상의 저장을 취소합니다. 계속하시겠습니까?')) {
      const { videoId } = target.dataset;
      storage.removeFromStorage(this.currentTabName, videoId);
      this.#removeDeletedVideos();
    }
  }
}

export default SavedVideosView;
