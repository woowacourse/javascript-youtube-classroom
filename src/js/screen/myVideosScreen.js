import StorageEngine from '../domain/storageEngine.js';

import { $ } from '../util/domHelper.js';
import { myVideoTemplate } from '../util/template.js';

export default class MyVideosScreen {
  #myVideoList;
  #storageEngine;

  constructor() {
    this.#myVideoList = $('.my-video-list');
    this.#storageEngine = StorageEngine.instance;

    this.#render();
  }

  #render() {
    const savedVideos = this.#storageEngine.getSavedVideos();

    if (savedVideos.length > 0) {
      const myVideoListTemplate = savedVideos.map((datum) => myVideoTemplate(datum)).join('');

      this.#myVideoList.insertAdjacentHTML('beforeend', myVideoListTemplate);
    }
  }

  // #renderMyVideos() {
  //   const myVideos = this.storageEngine.getSavedVideos();
  //   this.#searchResultScreen.render(myVideos);
  // }
}
