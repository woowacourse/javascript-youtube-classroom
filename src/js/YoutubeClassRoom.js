import HomeView from './View/HomeView';
import SearchModalView from './View/SearchModalView';
import SearchVideoManager from './SearchVideoManager';
import SaveVideoManager from './SaveVideoManager';
import { validateSearchKeyword } from './validation';
import { ALERT_MESSAGE } from './constants';
import { debounce } from './util';
import SearchResultView from './View/SearchResultView';

export default class YoutubeClassRoom {
  constructor() {
    this.homeView = new HomeView();
    this.searchModalView = new SearchModalView();
    this.searchResultView = new SearchResultView();
    this.searchVideoManager = new SearchVideoManager();
    this.saveVideoManager = new SaveVideoManager();

    this.bindEvents();
  }

  bindEvents() {
    this.searchModalView.modal.addEventListener('searchKeyword', this.onSubmitSearchKeyword.bind(this));
    this.searchModalView.modal.addEventListener('searchOnScroll', debounce(this.searchOnScroll.bind(this), 100));
    this.searchModalView.modal.addEventListener('saveVideo', this.onClickVideoSaveButton.bind(this));
  }

  onSubmitSearchKeyword(e) {
    const { keyword } = e.detail;
    try {
      validateSearchKeyword(keyword);
    } catch ({ message }) {
      alert(message);
      return;
    }
    this.searchOnSubmitKeyword(keyword);
  }

  onClickVideoSaveButton(e) {
    const { target } = e.detail;
    const { videoId } = target.parentNode.dataset;
    try {
      this.saveVideoManager.saveVideoById(videoId);
    } catch ({ message }) {
      return alert(message);
    }
    target.remove();
  }

  searchOnSubmitKeyword(keyword) {
    this.searchResultView.resetSearchResultVideoList();
    this.searchResultView.updateOnLoading();
    this.searchVideoManager
      .search(keyword)
      .then((videos) => {
        const checkedVideos = this.addSavedInfoToVideos(videos);
        this.searchResultView.updateOnSearchDataReceived(checkedVideos);
      })
      .catch(() => {
        this.searchResultView.showErrorResult();
      });
  }

  searchOnScroll(e) {
    if (this.impossibleToLoadMore(e)) return;
    this.searchResultView.updateOnLoading();
    this.searchVideoManager
      .search()
      .then((videos) => {
        const checkedVideos = this.addSavedInfoToVideos(videos);
        this.searchResultView.updateOnSearchDataReceived(checkedVideos);
      })
      .catch(() => {
        this.searchResultView.showErrorResult();
      });
  }

  addSavedInfoToVideos(videos) {
    return videos.map((video) => ({
      ...video,
      saved: this.saveVideoManager.findVideoById(video.id),
    }));
  }

  impossibleToLoadMore(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.detail;
    if (scrollTop + clientHeight + 20 < scrollHeight) return true;
    if (this.searchVideoManager.isLastPage) {
      alert(ALERT_MESSAGE.NO_MORE_SEARCH_RESULT);
      return true;
    }
    return false;
  }
}
