import {
  CLASS,
  CONFIRM_MESSAGE,
  NAV,
  SELECTOR,
  SNACK_BAR,
} from '../constants/constant.js';
import { $, $$, handleVideosLoad, toggleSelectorClass } from '../utils/util.js';
class SavedController {
  #storageModel;
  #savedView;
  #snackBarView;

  constructor({ model, view }) {
    this.#storageModel = model.storageModel;
    this.#savedView = view.savedView;
    this.#snackBarView = view.snackBarView;
  }

  init() {
    this.#storageModel.init();
    this.#loadSavedVideos();
    this.#handleNav();
    +this.#handleVideoButtons();
  }

  #renderSavedVideo = videos => {
    this.#savedView.renderSavedVideos(videos);
    handleVideosLoad($$(SELECTOR.VIDEO_IFRAME));
  };

  #loadSavedVideos = () => {
    this.#renderSavedVideo(this.#storageModel.savedVideos);
  };

  #filterVideos(navValue) {
    if (this.#storageModel.navValue === navValue) return;

    this.#savedView.toggleNavButton(navValue);
    this.#renderSavedVideo(this.#storageModel.filterVideos(navValue));
  }

  #deleteVideo(target) {
    if (!confirm(CONFIRM_MESSAGE.DELETE_VIDEO)) return;

    this.#storageModel.updateVideoState(target);
    this.#savedView.hideSelectedVideo(target);
    this.#snackBarView.showSnackBar(SNACK_BAR.DELETE_MESSAGE);
  }

  #toggleVideoWatched(target) {
    this.#storageModel.updateVideoState(target);
    toggleSelectorClass(target, CLASS.OPACITY_HOVER);

    if (this.#storageModel.navValue !== null) {
      this.#savedView.hideSelectedVideo(target);
    }

    this.#snackBarView.showSnackBar(SNACK_BAR.LIST_MODIFIED_MESSAGE);
  }

  #toggleVideoLiked(target) {
    this.#storageModel.updateVideoState(target);
    toggleSelectorClass(target, CLASS.OPACITY_HOVER);

    if (target.classList.contains(CLASS.OPACITY_HOVER)) {
      this.#snackBarView.showSnackBar(SNACK_BAR.REMOVE_LIKE_MESSAGE);

      return;
    }
    this.#snackBarView.showSnackBar(SNACK_BAR.ADDED_LIKE_MESSAGE);
  }

  // TODO : 비디오내 버튼들 도 객체화해서 할수 없나? - 없으면 한번만 확인하게..
  #handleVideoButtons() {
    $(SELECTOR.SAVED_VIDEO_WRAPPER).addEventListener('click', ({ target }) => {
      switch (true) {
        case target.classList.contains(CLASS.WATCHED):
          this.#toggleVideoWatched(target);
          break;

        case target.classList.contains(CLASS.LIKED):
          this.#toggleVideoLiked(target);
          break;

        case target.classList.contains(CLASS.DELETE):
          this.#deleteVideo(target);
          break;
      }
    });
  }

  #handleNav() {
    $(SELECTOR.NAV).addEventListener('click', ({ target }) => {
      if (target.tagName === 'BUTTON' && target.id !== NAV.SEARCH_MODAL) {
        this.#filterVideos(target.id);
      }
    });
  }
}

export default SavedController;
