import { SELECTOR_CLASS, STORAGE_KEYWORD } from '../constants';
import storage from '../storage';
import view from '../view';
import BasicController from './BasicController.js';
import { SNACKBAR_MESSAGE, CONFIRM_MESSAGE } from '../constants.js';
import { $videoWrapper } from '../elements';
import controller from '../controller';

export default class VideoController extends BasicController {
  #videoStorage;

  constructor() {
    super();
  }

  setStorageOption(storageOption) {
    this.#videoStorage = storageOption;
  }

  initEvent() {
    $videoWrapper.addEventListener('click', this.onVideoInteract);
  }

  onVideoInteract = ({ target }) => {
    if (target.classList.contains(SELECTOR_CLASS.CLIP_CHECK_BUTTON)) {
      this.#moveVideoByCheckButton(target);
      return;
    }

    if (target.classList.contains(SELECTOR_CLASS.CLIP_FAVORITE_BUTTON)) {
      this.#moveVideoByFavoriteButton(target);
      return;
    }

    if (target.classList.contains(SELECTOR_CLASS.CLIP_DELETE_BUTTON)) {
      this.#deleteVideo(target);
      return;
    }
  };

  #deleteVideo(button) {
    if (!view.layout.confirm(CONFIRM_MESSAGE.VIDEO_DELETE)) {
      return;
    }

    const videoId = button.dataset.videoId;

    storage.video.popVideoByVideoId(videoId);
    controller.hash.routeByHash();
    view.layout.showSnackbar(SNACKBAR_MESSAGE.VIDEO_DELETE_SUCCESS, true);
  }

  #moveVideoByCheckButton(button) {
    const videoId = button.dataset.videoId;
    const isWatchedBefore = storage.video.getVideoById(videoId)[
      STORAGE_KEYWORD.IS_WATCHED
    ];
    const isWatchedAfter = !isWatchedBefore;

    storage.video.setVideoProperty(videoId, {
      [STORAGE_KEYWORD.IS_WATCHED]: isWatchedAfter,
    });
    controller.hash.routeByHash();

    view.layout.showCheckSnackbar(isWatchedAfter);
  }

  #moveVideoByFavoriteButton(button) {
    const videoId = button.dataset.videoId;
    const isFavoriteBefore = storage.video.getVideoById(videoId)[
      STORAGE_KEYWORD.IS_FAVORITE
    ];
    const isFavoriteAfter = !isFavoriteBefore;

    storage.video.setVideoProperty(videoId, {
      [STORAGE_KEYWORD.IS_FAVORITE]: isFavoriteAfter,
    });
    controller.hash.routeByHash();

    view.layout.showFavoriteSnackbar(isFavoriteAfter);
  }
}
