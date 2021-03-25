import { BROWSER_HASH } from '../constants.js';
import { watchingVideoStorage, watchedVideoStorage } from '../store.js';
import controllerUtil from './controllerUtil.js';

import {
  watchingVideoView,
  watchedVideoView,
  layoutView,
} from '../view/index.js';

const hashController = {
  initRouteEventListeners() {
    window.onhashchange = hashController.routeByHash;
    window.onload = hashController.routeByHash;
  },

  routeByHash() {
    const hash = controllerUtil.parseHash(location.hash);
    layoutView.highlightNavButton(hash);

    if (hash === BROWSER_HASH.WATCHING) {
      activeWatchingVideoShow();
      return;
    }

    if (hash === BROWSER_HASH.WATCHED) {
      activeWatchedVideoShow();
      return;
    }

    activeWatchingVideoShow();
  },
};

function activeWatchingVideoShow() {
  const videos = watchingVideoStorage.getItem();
  watchedVideoView.eraseVideos();
  watchedVideoView.hideEmptyVideoImage();

  if (videos.length === 0) {
    watchingVideoView.showEmptyVideoImage();
    return;
  }

  watchingVideoView.renderVideos(videos);
}

function activeWatchedVideoShow() {
  watchingVideoView.eraseVideos();
  watchingVideoView.hideEmptyVideoImage();

  const videos = watchedVideoStorage.getItem();

  if (videos.length === 0) {
    watchedVideoView.showEmptyVideoImage();
    return;
  }

  watchedVideoView.renderVideos(videos);
}

export default hashController;
