import StorageEngine from '../domain/storageEngine.js';

import { $ } from '../util/domHelper.js';
import { myVideoTemplate } from '../util/template.js';
import { DELETE_VIDEO_CONFIRM_MESSAGE, NO_SAVED_VIDEOS_MESSAGE } from '../util/constants.js';

export default class MyVideosScreen {
  #nav;
  #myVideoList;
  #storageEngine;
  #currentFilter;

  constructor() {
    // 상태
    this.#currentFilter = 'videosToView';

    this.#nav = $('nav');
    this.#myVideoList = $('.my-video-list');

    this.#storageEngine = StorageEngine.instance;

    this.#myVideoList.addEventListener('click', this.#handleChangeVideoViewed);
    this.#myVideoList.addEventListener('click', this.#handleDeleteVideo);
    this.#nav.addEventListener('click', this.#renderFilteredVideos);

    const videosToView = this.#storageEngine.getFilteredVideos(false);
    this.render(videosToView);
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  render(videos) {
    if (videos.length > 0) {
      const myVideosTemplate = videos.map((datum) => myVideoTemplate(datum)).join('');

      this.#myVideoList.insertAdjacentHTML('beforeend', myVideosTemplate);

      return;
    }

    this.#renderNoSavedVideosMessage();
  }

  #handleChangeVideoViewed = (e) => {
    if (
      e.target.classList.contains('video-item__view-uncheck-button') ||
      e.target.classList.contains('video-item__view-check-button')
    ) {
      const video = e.target.closest('.video-item');
      const { videoId } = video.dataset;

      const viewStatus = e.target.classList.contains('video-item__view-uncheck-button')
        ? false
        : true;

      this.#storageEngine.changeVideoViewed(videoId, viewStatus);

      this.#myVideoList.removeChild(video);

      if (this.#myVideoList.children.length <= 0) {
        this.#renderNoSavedVideosMessage();
      }
    }
  };

  #renderFilteredVideos = (e) => {
    if (
      e.target.id === 'videos-to-view-filter-button' ||
      e.target.id === 'viewed-videos-filter-button'
    ) {
      this.clear();

      this.#currentFilter =
        e.target.id === 'viewed-videos-filter-button' ? 'viewedVideos' : 'videosToView';

      const viewStatus = e.target.id === 'viewed-videos-filter-button' ? true : false;
      const filteredVideos = this.#storageEngine.getFilteredVideos(viewStatus);

      this.render(filteredVideos);
    }
  };

  #handleDeleteVideo = (e) => {
    if (
      e.target.classList.contains('video-item__delete-button') &&
      confirm(DELETE_VIDEO_CONFIRM_MESSAGE)
    ) {
      const video = e.target.closest('.video-item');
      const { videoId } = video.dataset;

      this.#storageEngine.removeVideo(videoId);

      this.#myVideoList.removeChild(video);

      if (this.#myVideoList.children.length <= 0) {
        this.#renderNoSavedVideosMessage();
      }
    }
  };

  #renderNoSavedVideosMessage() {
    this.#myVideoList.textContent = NO_SAVED_VIDEOS_MESSAGE;
  }

  clear() {
    this.#myVideoList.replaceChildren();
  }
}
