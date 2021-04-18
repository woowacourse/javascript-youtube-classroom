import { BROWSER_HASH, STORAGE_KEYWORD } from "../constants.js";
import controllerUtil from "./controllerUtil.js";
import BasicController from "./BasicController.js";
import validation from "../utils/validation.js";
import { layoutView, videoView } from "../view/index.js";
import videoService from "../service/videoService.js";

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
    layoutView.highlightNavButton(hash);

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
    if (validation.isEmptyObject(storageOption)) {
      console.error("activeVideoView의 인자 storageOption가 빈 객체입니다.");
      return;
    }

    const videos = videoService.getVideosBy(storageOption);

    videoView.eraseVideos();
    videoView.hideEmptyVideoImage();

    if (videos.length === 0) {
      videoView.showEmptyVideoImage();
      return;
    }

    videoView.renderVideos(videos);
  }
}
