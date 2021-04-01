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

    if (hash === BROWSER_HASH.FAVORITE) {
      this.#activeVideoView({
        [STORAGE_KEYWORD.IS_FAVORITE]: true,
      });
      return;
    }

    this.#activeVideoView({
      [STORAGE_KEYWORD.IS_WATCHED]: false,
    });
  };

  #activeVideoView(storageOption = {}) {
    if (controllerUtil.isEmptyObject(storageOption)) {
      console.error('activeVideoView의 인자 storageOption가 빈 객체입니다.');
      return;
    }

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
