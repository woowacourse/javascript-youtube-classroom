import { CLASS, SELECTOR, STORAGE } from '../constants/constant.js';
import { $, $$, setJSONToLocalStorage } from '../utils/util.js';
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
      this.savedView.renderNotFoundSavedVideo();
      return;
    }
    this.savedView.renderSavedVideos(savedVideos);
    this.handleSavedVideoLoad();
  };

  filterVideos({ showWatched }) {
    if (this.storage.showWatched === showWatched) return;

    this.navView.toggleNavButton(showWatched);
    this.storage.filterVideos(showWatched);

    const filteredVideos = this.storage.filterVideos(showWatched);
    if (filteredVideos.length === 0) {
      this.savedView.renderNotFoundSavedVideo();
      return;
    }

    this.savedView.renderSavedVideos(filteredVideos);
    this.handleSavedVideoLoad();
  }

  deleteVideo(target) {
    if (!confirm('정말로 영상을 삭제하시겠습니까?')) return;
    this.storage.deleteSelectedVideo(target);
    this.savedView.hideSelectedVideo(target);

    if (this.storage.savedVideoCount === 0) {
      this.savedView.renderNotFoundSavedVideo();
    }
    this.snackBarView.showSnackBar('영상을 목록에서 제거했습니다');
  }

  toggleVideoWatched(target) {
    this.storage.updateVideoWatched(target);

    target.classList.toggle('opacity-hover');

    if (this.storage.showWatched !== null) {
      this.savedView.hideSelectedVideo(target);
    }

    this.snackBarView.showSnackBar(`해당 영상의 저장 목록 위치를 변경했습니다`);
  }

  handleToggleVideosWatched() {
    $('#saved-video-wrapper').addEventListener('click', ({ target }) => {
      if (target.classList.contains('watched')) {
        this.toggleVideoWatched(target);
      }

      if (target.classList.contains('delete')) {
        this.deleteVideo(target);
      }
    });
  }

  handleVideosToWatch() {
    $('#towatch-videos-button').addEventListener('click', () => {
      this.filterVideos({ showWatched: false });
    });
  }
  handleVideosWatched() {
    $('#watched-videos-button').addEventListener('click', () => {
      this.filterVideos({ showWatched: true });
    });
  }

  // TODO: search.js와 중복 - 빼야함
  removeSkeleton = event => {
    const article = event.target.closest('article');
    article.classList.remove(CLASS.SKELETON);
  };

  handleSavedVideoLoad() {
    $$(SELECTOR.VIDEO_IFRAME).forEach(iframe => {
      iframe.addEventListener('load', event => this.removeSkeleton(event));
    });
  }
}

export default SavedController;
