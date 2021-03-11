import {
  CLASS,
  CONFIRM_MESSAGE,
  SELECTOR,
  SNACK_BAR,
} from '../constants/constant.js';
import { $, $$, handleVideosLoad, toggleSelectorClass } from '../utils/util.js';
class SavedController {
  constructor(storage, savedView, navView, snackBarView) {
    this.storage = storage;
    this.savedView = savedView;
    this.navView = navView;
    this.snackBarView = snackBarView;
  }

  init() {
    this.loadSavedVideos();
    this.handleVideosToWatch();
    this.handleVideosWatched();
    this.handleToggleVideosWatched();
  }

  // 페이지 접속하면 저장된 영상들 불러오는 메서드
  loadSavedVideos = () => {
    const savedVideos = this.storage.myVideos;

    if (savedVideos.length === 0) {
      toggleSelectorClass($(SELECTOR.SEARCH_VIDEO_WRAPPER), CLASS.SHOW, true);
      return;
    }
    this.savedView.renderSavedVideos(savedVideos);
    handleVideosLoad($$(SELECTOR.VIDEO_IFRAME));
  };

  filterVideos({ showWatched }) {
    if (this.storage.showWatched === showWatched) return;

    this.navView.toggleNavButton(showWatched);

    const filteredVideos = this.storage.filterVideos(showWatched);

    this.savedView.renderSavedVideos(filteredVideos);
    handleVideosLoad($$(SELECTOR.VIDEO_IFRAME));
  }

  deleteVideo(target) {
    if (!confirm(CONFIRM_MESSAGE.DELETE_VIDEO)) return;
    this.storage.deleteSelectedVideo(target);
    this.savedView.hideSelectedVideo(target);

    if (this.storage.savedVideoCount === 0) {
      toggleSelectorClass($(SELECTOR.SEARCH_VIDEO_WRAPPER), CLASS.SHOW, true);
    }
    this.snackBarView.showSnackBar(SNACK_BAR.DELETE_MESSAGE);
  }

  toggleVideoWatched(target) {
    this.storage.updateVideoWatched(target);

    target.classList.toggle(CLASS.OPACITY_HOVER);

    if (this.storage.showWatched !== null) {
      this.savedView.hideSelectedVideo(target);
    }

    this.snackBarView.showSnackBar(SNACK_BAR.LIST_MODIFIED_MESSAGE);
  }

  handleToggleVideosWatched() {
    $(SELECTOR.SEARCH_VIDEO_WRAPPER).addEventListener('click', ({ target }) => {
      if (target.classList.contains(CLASS.WATCHED)) {
        this.toggleVideoWatched(target);
      }

      if (target.classList.contains(CLASS.DELETE)) {
        this.deleteVideo(target);
      }
    });
  }

  handleVideosToWatch() {
    $(SELECTOR.TO_WATCH_VIDEOS_BUTTON).addEventListener('click', () => {
      this.filterVideos({ showWatched: false });
    });
  }
  handleVideosWatched() {
    $(SELECTOR.WATCHED_VIDEOS_BUTTON).addEventListener('click', () => {
      this.filterVideos({ showWatched: true });
    });
  }
}

export default SavedController;
