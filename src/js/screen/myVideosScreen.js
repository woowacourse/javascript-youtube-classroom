import StorageEngine from '../domain/storageEngine.js';

import { $ } from '../util/domHelper.js';
import { myVideoTemplate } from '../util/template.js';

export default class MyVideosScreen {
  #myVideoList;
  #storageEngine;
  #viewedVideosTabButton;

  constructor() {
    this.#myVideoList = $('.my-video-list');
    this.#viewedVideosTabButton = $('#viewed-videos-tab-button');

    this.#storageEngine = StorageEngine.instance;

    this.#myVideoList.addEventListener('click', this.#handleCheckVideoViewed);
    this.#viewedVideosTabButton.addEventListener('click', this.#changeToViewedVideosTab);

    this.#render();
  }

  #render() {
    const savedVideos = this.#storageEngine.getViewableVideos();

    if (savedVideos.length > 0) {
      const myVideoListTemplate = savedVideos.map((datum) => myVideoTemplate(datum)).join('');

      this.#myVideoList.insertAdjacentHTML('beforeend', myVideoListTemplate);
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

  #changeToViewedVideosTab = () => {
    this.#clear();

    const viewedVideos = this.#storageEngine.getViewedVideos();
    const viewedVideosTemplate = viewedVideos.map((video) => myVideoTemplate(video)).join('');

    this.#myVideoList.insertAdjacentHTML('beforeend', viewedVideosTemplate);
  };

  #clear() {
    this.#myVideoList.replaceChildren();
  }
}
