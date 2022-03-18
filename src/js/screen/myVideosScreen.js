import StorageEngine from '../domain/storageEngine.js';

import { $ } from '../util/domHelper.js';
import { myVideoTemplate } from '../util/template.js';
import { DELETE_VIDEO_CONFIRM_MESSAGE } from '../util/constants.js';

export default class MyVideosScreen {
  #myVideoList;
  #storageEngine;
  #viewedVideosFilterButton;

  constructor() {
    this.#myVideoList = $('.my-video-list');
    this.#viewedVideosFilterButton = $('#viewed-videos-filter-button');

    this.#storageEngine = StorageEngine.instance;

    this.#myVideoList.addEventListener('click', this.#handleCheckVideoViewed);
    this.#myVideoList.addEventListener('click', this.#handleDeleteVideo);
    this.#viewedVideosFilterButton.addEventListener('click', this.#renderViewedVideos);

    const savedVideos = this.#storageEngine.getSavedVideos();
    this.#render(savedVideos);
  }

  #render(videos) {
    if (videos.length > 0) {
      const myVideosTemplate = videos.map((datum) => myVideoTemplate(datum)).join('');

      this.#myVideoList.insertAdjacentHTML('beforeend', myVideosTemplate);
    }
  }

  #handleCheckVideoViewed = (e) => {
    if (e.target.classList.contains('video-item__view-check-button')) {
      const video = e.target.closest('.video-item');
      const { videoId } = video.dataset;

      this.#storageEngine.checkVideoViewed(videoId);

      this.#myVideoList.removeChild(video);
    }
  };

  #renderViewedVideos = () => {
    this.#clear();

    const viewedVideos = this.#storageEngine.getViewedVideos();

    this.#render(viewedVideos);
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

      // console.log(e.target, e.currentTarget, videoId);
    }
  };
}
