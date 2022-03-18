import { $, debounce, showSnackbar } from '../dom';
import SearchResultView from './SearchResultView';
import { ALERT_MESSAGE, SCROLL_BUFFER_SECOND, SCROLL_BUFFER_HEIGHT } from '../constants';
import { validateSearchKeyword } from '../validation';

export default class SearchModalView {
  #modal;

  constructor(searchManager, saveVideoManager) {
    this.#modal = $('#search-modal');

    this.searchResultView = new SearchResultView();

    this.searchManager = searchManager;
    this.saveVideoManager = saveVideoManager;

    this.bindEvents();
  }

  bindEvents() {
    $('.dimmer').addEventListener('click', this.closeModal);
    $('#search-form').addEventListener('submit', this.onSubmitSearchKeyword.bind(this));
    this.#modal.addEventListener('searchOnScroll', debounce(this.searchOnScroll.bind(this), SCROLL_BUFFER_SECOND));
  }

  closeModal() {
    $('#modal-container').classList.add('hide');
  }

  onSubmitSearchKeyword(e) {
    e.preventDefault();
    const keyword = $('#search-input-keyword').value;
    try {
      validateSearchKeyword(keyword);
    } catch ({ message }) {
      return alert(message);
    }
    this.searchOnSubmitKeyword(keyword);
  }

  searchOnSubmitKeyword(keyword) {
    this.searchResultView.resetSearchResultVideoList();
    this.searchResultView.updateOnLoading();
    this.searchAndShowResult(keyword);
  }

  searchOnScroll(e) {
    if (this.impossibleToLoadMore(e)) return;
    this.searchResultView.updateOnLoading();
    this.searchAndShowResult();
  }

  searchAndShowResult(keyword) {
    this.searchManager
      .search(keyword)
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
    if (scrollTop + clientHeight + SCROLL_BUFFER_HEIGHT < scrollHeight) return true;
    if (this.searchManager.isLastPage) {
      showSnackbar(ALERT_MESSAGE.NO_MORE_SEARCH_RESULT);
      return true;
    }
    return false;
  }

  addSaveButton(id) {
    this.searchResultView.addSaveButton(id);
  }
}
