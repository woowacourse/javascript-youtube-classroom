import { CLASS, SELECTOR, STORAGE } from '../constants/constant.js';
import { $, $$, setJSONToLocalStorage } from '../utils/util.js';
class SavedController {
  constructor(storage, savedView, navView) {
    this.storage = storage;
    this.savedView = savedView;
    this.navView = navView;
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

  // 볼 영상 필터링 메서드, 본 영상 필터링 메서드(파라미터 받아서)
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

  // 볼영상 handler - true

  deleteVideo(target) {
    if (!confirm('정말로 영상을 삭제하시겠습니까?')) return;
    this.storage.deleteSelectedVideo(target);
    this.savedView.hideSelectedVideo(target);

    if (this.storage.savedVideoCount === 0) {
      this.savedView.renderNotFoundSavedVideo();
    }
  }

  toggleVideoWatched(target) {
    this.storage.updateVideoWatched(target);

    target.classList.toggle('opacity-hover');

    if (this.storage.showWatched !== null) {
      this.savedView.hideSelectedVideo(target);
    }
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
  // 본영상 handler
  handleVideosWatched() {
    $('#watched-videos-button').addEventListener('click', () => {
      this.filterVideos({ showWatched: true });
    });
  }
  // 비디오 video-infos button handler들 (이벤트 위임으로 구현하기!!)

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
