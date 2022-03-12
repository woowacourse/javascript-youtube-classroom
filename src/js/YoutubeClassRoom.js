import HomeView from './View/HomeView';
import SearchModalView from './View/SearchModalView';
import SearchVideoManager from './SearchVideoManager';
import SaveVideoManager from './SaveVideoManager';
import { validateSearchKeyword } from './validation';
import { ALERT_MESSAGE } from './constants';
import { debounce } from './util';
import Storage from './Storage';

export default class YoutubeClassRoom {
  constructor() {
    this.storage = new Storage();
    this.searchVideoManager = new SearchVideoManager(this.storage);
    this.saveVideoManager = new SaveVideoManager(this.storage);
    this.homeView = new HomeView();
    this.searchModalView = new SearchModalView();


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
    this.searchModalView.updateOnKeywordSearchLoading();
    this.searchVideoManager
      .search(keyword)
      .then((videos) => {
        this.searchModalView.updateOnSearchDataReceived(videos);
      })
      .catch(() => {
        this.searchModalView.updateSearchErrorResult();
      });
  }

  searchOnScroll(e) {
    if (this.impossibleToLoadMore(e)) return;
    this.searchModalView.updateOnScrollLoading();
    this.searchVideoManager
      .search()
      .then((videos) => {
        this.searchModalView.updateOnSearchDataReceived(videos);
      })
      .catch(() => {
        this.searchModalView.updateSearchErrorResult();
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
    if (scrollTop + clientHeight + 10 < scrollHeight) return true;
    if (this.searchVideoManager.isLastPage) {
      alert(ALERT_MESSAGE.NO_MORE_SEARCH_RESULT);
      return true;
    }
    return false;
  }
}
