import HomeView from './View/HomeView';
import SearchModalView from './View/SearchModalView';
import SearchVideoManager from './SearchVideoManager';
import SaveVideoManager from './SaveVideoManager';
import { validateSearchKeyword } from './validation';

let timerId;

export default class YoutubeClassRoom {
  constructor() {
    this.homeView = new HomeView();
    this.searchModalView = new SearchModalView();
    this.searchVideoManager = new SearchVideoManager();
    this.saveVideoManager = new SaveVideoManager();

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('searchKeyword', this.onSubmitSearchKeyword.bind(this));
    window.addEventListener('searchOnScroll', this.onScrollSearchResultList.bind(this));
    window.addEventListener('saveVideo', this.onClickVideoSaveButton.bind(this));
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

  onScrollSearchResultList(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.detail;
    if (timerId) {
      clearTimeout(timerId);
    }
    if (scrollTop + clientHeight + 20 >= scrollHeight) {
      timerId = setTimeout(this.searchOnScroll.bind(this), 1000);
    }
  }

  onClickVideoSaveButton(e) {
    const { target } = e.detail;
    const { videoId } = target.parentNode.dataset;
    try {
      this.saveVideoManager.saveVideoById(videoId);
    } catch ({ message }) {
      alert(message);
      return;
    }
    target.remove();
  }

  searchOnSubmitKeyword(keyword) {
    this.searchModalView.updateOnKeywordSearchLoading();
    this.searchVideoManager
      .search(keyword)
      .then((videos) => {
        const checkedVideos = videos.map((video) => ({
          ...video,
          saved: this.saveVideoManager.findVideoById(video.id),
        }));
        this.searchModalView.updateOnSearchDataReceived(checkedVideos);
      })
      .catch((e) => {
        this.searchModalView.updateSearchErrorResult();
      });
  }

  searchOnScroll() {
    if (this.searchVideoManager.isLastPage) {
      return alert('마지막 검색결과까지 모두 출력되었습니다.');
    }
    this.searchModalView.updateOnScrollLoading();
    this.searchVideoManager
      .search()
      .then((videos) => {
        const checkedVideos = videos.map((video) => ({
          ...video,
          saved: this.saveVideoManager.findVideoById(video.id),
        }));
        this.searchModalView.updateOnSearchDataReceived(checkedVideos);
      })
      .catch((e) => {
        this.searchModalView.updateSearchErrorResult();
      });
  }
}
