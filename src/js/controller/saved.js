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
    this.#loadSavedVideos();
    this.#handleVideosToWatch();
    this.#handleVideosWatched();
    this.#handleVideoButtons();
  }

  // 페이지 접속하면 저장된 영상들 불러오는 메서드
  #loadSavedVideos = () => {
    const savedVideos = this.#storageModel.myVideos;

    if (savedVideos.length === 0) {
      toggleSelectorClass($(SELECTOR.SEARCH_VIDEO_WRAPPER), CLASS.SHOW, true);
      return;
    }
    this.#savedView.renderSavedVideos(savedVideos);
    handleVideosLoad($$(SELECTOR.VIDEO_IFRAME));
  };

  #filterVideos({ showWatched }) {
    if (this.#storageModel.showWatched === showWatched) return;

    this.#savedView.toggleNavButton(showWatched);

    const filteredVideos = this.#storageModel.filterVideos(showWatched);

    this.#savedView.renderSavedVideos(filteredVideos);
    handleVideosLoad($$(SELECTOR.VIDEO_IFRAME));
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
    target.classList.toggle(CLASS.OPACITY_HOVER);

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
