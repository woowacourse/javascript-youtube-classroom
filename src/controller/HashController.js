import { BROWSER_HASH } from '../constants.js';
import storage from '../storage.js';
import controllerUtil from './controllerUtil.js';
import view from '../view.js';
import BasicController from './BasicController.js';

export default class HashController extends BasicController {
  constructor() {
    super();
  }

  initEvent() {
    window.onhashchange = this.routeByHash;
    window.onload = this.routeByHash;
  }

  routeByHash = () => {
    const hash = controllerUtil.parseHash(location.hash);
    view.layout.highlightNavButton(hash);

    if (hash === BROWSER_HASH.WATCHING) {
      this.#activeWatchingVideoShow();
      return;
    }

    if (hash === BROWSER_HASH.WATCHED) {
      this.#activeWatchedVideoShow();
      return;
    }

    this.#activeWatchingVideoShow();
  };

  #activeWatchingVideoShow() {
    const videos = storage.watchingVideo.getItem();
    view.watchedVideo.eraseVideos();
    view.watchedVideo.hideEmptyVideoImage();

    if (videos.length === 0) {
      view.watchingVideo.showEmptyVideoImage();
      return;
    }

    view.watchingVideo.renderVideos(videos);
  }

  #activeWatchedVideoShow() {
    view.watchingVideo.eraseVideos();
    view.watchingVideo.hideEmptyVideoImage();

    const videos = storage.watchedVideo.getItem();

    if (videos.length === 0) {
      view.watchedVideo.showEmptyVideoImage();
      return;
    }

    view.watchedVideo.renderVideos(videos);
  }
}
