import {
  CLASS,
  CONFIRM_MESSAGE,
  SELECTOR,
  SNACK_BAR,
} from '../constants/constant.js';
import { $, $$, handleVideosLoad, toggleSelectorClass } from '../utils/util.js';
class SavedController {
  #storageModel;
  #savedView;
  #snackBarView;

  constructor(storageModel, savedView, snackBarView) {
    this.#storageModel = storageModel;
    this.#savedView = savedView;
    this.#snackBarView = snackBarView;
  }

  init() {
    this.#storageModel.init();
    this.#loadSavedVideos();
    this.#handleVideosToWatch();
    this.#handleVideosWatched();
    this.#handleVideoButtons();
  }

  #renderSavedVideo = videos => {
    this.#savedView.renderSavedVideos(videos);
    handleVideosLoad($$(SELECTOR.VIDEO_IFRAME));
  };

  #loadSavedVideos = () => {
    this.#renderSavedVideo(this.#storageModel.savedVideos);
  };

  #filterVideos({ showWatched }) {
    if (this.#storageModel.showWatched === showWatched) return;

    this.#savedView.toggleNavButton(showWatched);
    this.#renderSavedVideo(this.#storageModel.filterVideos(showWatched));
  }

  #deleteVideo(target) {
    if (!confirm(CONFIRM_MESSAGE.DELETE_VIDEO)) return;

    this.#storageModel.deleteSelectedVideo(target);
    this.#savedView.hideSelectedVideo(target);
    this.#snackBarView.showSnackBar(SNACK_BAR.DELETE_MESSAGE);
  }

  #toggleVideoWatched(target) {
    this.#storageModel.updateVideoWatched(target);
    toggleSelectorClass(target, CLASS.OPACITY_HOVER);

    if (this.#storageModel.showWatched !== null) {
      this.#savedView.hideSelectedVideo(target);
    }

    this.#snackBarView.showSnackBar(SNACK_BAR.LIST_MODIFIED_MESSAGE);
  }

  #handleVideoButtons() {
    $(SELECTOR.SAVED_VIDEO_WRAPPER).addEventListener('click', ({ target }) => {
      if (target.classList.contains(CLASS.WATCHED)) {
        this.#toggleVideoWatched(target);
      }

      if (target.classList.contains(CLASS.DELETE)) {
        this.#deleteVideo(target);
      }
    });
  }

  #handleVideosToWatch() {
    $(SELECTOR.TO_WATCH_VIDEOS_BUTTON).addEventListener('click', () => {
      this.#filterVideos({ showWatched: false });
    });
  }

  #handleVideosWatched() {
    $(SELECTOR.WATCHED_VIDEOS_BUTTON).addEventListener('click', () => {
      this.#filterVideos({ showWatched: true });
    });
  }
}

export default SavedController;
