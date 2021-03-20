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
    this.#handleFilteredVideos();
    this.#handleVideoButtons();
  }

  #renderSavedVideo = videos => {
    this.#savedView.renderSavedVideos(videos);
    handleVideosLoad($$(SELECTOR.VIDEO_IFRAME));
  };

  #loadSavedVideos = () => {
    if (this.#storageModel.savedVideoCount === 0) {
      toggleSelectorClass($(SELECTOR.SEARCH_VIDEO_WRAPPER), CLASS.SHOW, true);
      return;
    }

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

    if (this.#storageModel.savedVideoCount === 0) {
      toggleSelectorClass($(SELECTOR.SEARCH_VIDEO_WRAPPER), CLASS.SHOW, true);
    }

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

  #handleFilteredVideos() {
    $('nav').addEventListener('click', ({ target }) => {
      if (target.classList.contains('btn')) {
        switch (`#${target.id}`) {
          case SELECTOR.WATCHED_VIDEOS_BUTTON:
            this.#storageModel.filterOption = 'watched';
            return this.#filterVideos(target, 'watched');

          case SELECTOR.TO_WATCH_VIDEOS_BUTTON:
            this.#storageModel.filterOption = 'willWatch';
            return this.#filterVideos(target, 'willWatch');

          case SELECTOR.LIKED_VIDEOS_BUTTON:
            this.#storageModel.filterOption = 'liked';
            return this.#filterVideos(target, 'liked');

          default:
            this.#storageModel.filterOption = 'all';
            return this.#storageModel.savedVideos;
        }
      }
    });
  }
}

export default SavedController;
