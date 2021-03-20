import { BROWSER_HASH } from '../constants.js';
import { watchingVideoModel, watchedVideoModel } from '../store.js';
import controllerUtil from './controllerUtil.js';

import { watchingVideoView, watchedVideoView, layoutView } from '../view/index.js';

const controller = {
  initRouteEventListeners() {
    window.onhashchange = routeByHash;
    window.onload = routeByHash;
  },
};

function routeByHash() {
  const hash = controllerUtil.parseHash(location.hash);
  layoutView.highlightNavButton(hash);
  if (hash === BROWSER_HASH.WATCHING) {
    showWatchingVideo();
    return;
  }
  if (hash === BROWSER_HASH.WATCHED) {
    showWatchedVideo();
    return;
  }
  showWatchingVideo();
}

function showWatchingVideo() {
  const videos = watchingVideoModel.getItem();
  watchedVideoView.eraseVideos();
  watchedVideoView.hideEmptyVideoImage();
  if (videos.length === 0) {
    watchingVideoView.showEmptyVideoImage();
    return;
  }
  watchingVideoView.renderVideos(videos);
}

function showWatchedVideo() {
  watchingVideoView.eraseVideos();
  watchingVideoView.hideEmptyVideoImage();

  const videos = watchedVideoModel.getItem();
  if (videos.length === 0) {
    watchedVideoView.showEmptyVideoImage();
    return;
  }
  watchedVideoView.renderVideos(videos);
}

export default controller;
