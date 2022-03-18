import StorageEngine from '../domain/storageEngine.js';

import { $ } from '../util/domHelper.js';
import { myVideoTemplate } from '../util/template.js';
import { DELETE_VIDEO_CONFIRM_MESSAGE, NO_SAVED_VIDEOS_MESSAGE } from '../util/constants.js';

export default class MyVideosScreen {
  #myVideoList;
  #storageEngine;
  #nav;

  constructor() {
    this.#myVideoList = $('.my-video-list');
    this.#nav = $('nav');

    this.#storageEngine = StorageEngine.instance;

    this.#myVideoList.addEventListener('click', this.#handleCheckVideoViewed);
    this.#myVideoList.addEventListener('click', this.#handleDeleteVideo);
    this.#myVideoList.addEventListener('click', this.#handleUncheckVideoViewed);
    this.#nav.addEventListener('click', this.#renderFilteredVideos);

    const savedVideos = this.#storageEngine.getSavedVideos();
    this.#render(savedVideos);
  }

  #render(videos) {
    if (videos.length > 0) {
      const myVideosTemplate = videos.map((datum) => myVideoTemplate(datum)).join('');

      this.#myVideoList.insertAdjacentHTML('beforeend', myVideosTemplate);

      return;
    }

    this.#renderNoSavedVideosMessage();
  }

  #handleCheckVideoViewed = (e) => {
    if (e.target.classList.contains('video-item__view-check-button')) {
      const video = e.target.closest('.video-item');
      const { videoId } = video.dataset;

      this.#storageEngine.changeVideoViewed(videoId, true);

      this.#myVideoList.removeChild(video);
      this.#renderNoSavedVideosMessage();
    }
  };

  #handleUncheckVideoViewed = (e) => {
    if (e.target.classList.contains('video-item__view-uncheck-button')) {
      const video = e.target.closest('.video-item');
      const { videoId } = video.dataset;

      this.#storageEngine.changeVideoViewed(videoId, false);

      this.#myVideoList.removeChild(video);
      this.#renderNoSavedVideosMessage();
    }
  };

  #renderFilteredVideos = (e) => {
    if (
      e.target.id === 'videos-to-view-filter-button' ||
      e.target.id === 'viewed-videos-filter-button'
    ) {
      this.#clear();

      const viewStatus = e.target.id === 'viewed-videos-filter-button' ? true : false;
      const filteredVideos = this.#storageEngine.getFilteredVideos(viewStatus);

      this.#render(filteredVideos);
    }
  };

  #clear() {
    this.#myVideoList.replaceChildren();
  }

  #handleDeleteVideo = (e) => {
    if (
      e.target.classList.contains('video-item__delete-button') &&
      confirm(DELETE_VIDEO_CONFIRM_MESSAGE)
    ) {
      const video = e.target.closest('.video-item');
      const { videoId } = video.dataset;

      this.#storageEngine.removeVideo(videoId);

      this.#myVideoList.removeChild(video);
      this.#renderNoSavedVideosMessage();
    }
  };

  #renderNoSavedVideosMessage() {
    if (this.#myVideoList.children.length <= 0) {
      this.#myVideoList.textContent = NO_SAVED_VIDEOS_MESSAGE;
    }
  }
}
