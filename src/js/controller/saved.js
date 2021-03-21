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
    this.#handleLazyLoad();
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

  #filterVideos(target, filterOption) {
    this.#savedView.toggleNavButton(target);
    this.#renderSavedVideo(this.#storageModel.filterVideos(filterOption));
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

  #toggleVideoButtons(target) {
    this.#storageModel.updateVideoButtons(target);
    toggleSelectorClass(target, CLASS.OPACITY_HOVER);

    switch (this.#storageModel.filterOption) {
      case 'all':
        return;

      case 'liked':
        if (target.classList.contains('watched')) {
          break;
        }
        this.#savedView.hideSelectedVideo(target);

      case 'watched':
      case 'willWatch':
        if (target.classList.contains('thumbs-up')) {
          break;
        }
        this.#savedView.hideSelectedVideo(target);

      default:
        return;
    }

    this.#handleShowSnackbar(target);
  }

  #handleShowSnackbar(target) {
    if (target.classList.contains(CLASS.WATCHED)) {
      this.#snackBarView.showSnackBar(SNACK_BAR.LIST_MODIFIED_MESSAGE);
      return;
    }

    if (target.classList.contains(CLASS.LIKE)) {
      if (target.classList.contains(CLASS.OPACITY_HOVER)) {
        this.#snackBarView.showSnackBar(SNACK_BAR.CANCEL_LIKED_MESSAGE);
        return;
      }

      this.#snackBarView.showSnackBar(SNACK_BAR.LIKED_MESSAGE);
      return;
    }
  }

  #handleVideoButtons() {
    $(SELECTOR.SAVED_VIDEO_WRAPPER).addEventListener('click', ({ target }) => {
      if (
        target.classList.contains(CLASS.WATCHED) ||
        target.classList.contains(CLASS.LIKE)
      ) {
        this.#toggleVideoButtons(target);
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

  #handleLazyLoad() {
    const options = {
      root: null,
      rootMargin: '0px 0px 30px 0px',
      threshold: 0,
    };

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const videos = document.querySelectorAll('iframe');
    videos.forEach(el => {
      io.observe(el);
    });
  }
}

export default SavedController;
