import { SELECTOR_CLASS, STORAGE_KEYWORD } from "../constants";
import { layoutView } from "../view";
import BasicController from "./BasicController.js";
import { SNACKBAR_MESSAGE, CONFIRM_MESSAGE } from "../constants.js";
import { $videoWrapper } from "../elements";
import controller from "../controller";
import { videoService } from "../service/";

export default class VideoController extends BasicController {
  constructor() {
    super();
  }

  initEvent() {
    $videoWrapper.addEventListener("click", this.onVideoInteract);
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
    if (!layoutView.confirm(CONFIRM_MESSAGE.VIDEO_DELETE)) {
      return;
    }

    const videoId = button.dataset.videoId;

    videoService.popVideoById(videoId);
    controller.hash.routeByHash();
    layoutView.showSnackbar(SNACKBAR_MESSAGE.VIDEO_DELETE_SUCCESS, true);
  }

  #moveVideoByCheckButton(button) {
    const videoId = button.dataset.videoId;
    const isWatchedBefore = videoService.getVideoById(videoId)[
      STORAGE_KEYWORD.IS_WATCHED
    ];

    videoService.setVideoProperty(videoId, {
      [STORAGE_KEYWORD.IS_WATCHED]: !isWatchedBefore,
    });
    layoutView.showCheckSnackbar(!isWatchedBefore);
    controller.hash.routeByHash();
  }

  #moveVideoByFavoriteButton(button) {
    const videoId = button.dataset.videoId;
    const isFavoriteBefore = videoService.getVideoById(videoId)[
      STORAGE_KEYWORD.IS_FAVORITE
    ];

    videoService.setVideoProperty(videoId, {
      [STORAGE_KEYWORD.IS_FAVORITE]: !isFavoriteBefore,
    });
    layoutView.showFavoriteSnackbar(!isFavoriteBefore);
    controller.hash.routeByHash();
  }
}
