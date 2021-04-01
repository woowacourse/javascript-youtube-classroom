import { BROWSER_HASH, STORAGE_KEYWORD } from '../constants.js';
import storage from '../storage.js';
import controllerUtil from './controllerUtil.js';
import view from '../view.js';
import BasicController from './BasicController.js';
import controller from '../controller.js';

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
      this.#activeVideoView({
        [STORAGE_KEYWORD.IS_WATCHED]: false,
      });
      return;
    }

    if (hash === BROWSER_HASH.WATCHED) {
      this.#activeVideoView({
        [STORAGE_KEYWORD.IS_WATCHED]: true,
      });
      return;
    }

    this.#activeVideoView({
      [STORAGE_KEYWORD.IS_WATCHED]: false,
    });
  };

  #activeVideoView(storageOption) {
    //TODO: storageOption 유효성 검사
    controller.video.setStorageOption(storageOption);

    const videos = storage.video.getVideosBy(storageOption);

    view.video.eraseVideos();
    view.video.hideEmptyVideoImage();

    if (videos.length === 0) {
      view.video.showEmptyVideoImage();
      return;
    }

    view.video.renderVideos(videos);
  }
}
