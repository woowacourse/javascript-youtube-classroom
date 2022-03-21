import { on } from '../util/event';
import searchMachine from '../domain/SearchMachine';
import ErrorView from '../ui/errorView';
import ModalView from '../ui/modalView';
import SearchResultView from '../ui/searchResultView';
import SkeletonView from '../ui/skeletonView';
import { $ } from '../util/selector';
import saveMachine from '../domain/saveMachine';
import { LOCALSTORAGE_KEY_SEARCHED } from '../constant';

class ModalInterferer {
  #keyword;

  #pageToken;

  constructor() {
    this.#pageToken = '';
    this.#keyword = '';
    this.$videoListContainer = $('.video-list');
    this.$searchInputKeyword = $('#search-input-keyword');
    this.$searchButton = $('#search-button');
    this.$searchModalButton = $('#search-modal-button');
    this.$searchResult = $('.search-result');
    this.$modalContainer = $('.modal-container');

    this.scrollHandler = this.scrollVideoContainerHandler();
  }

  init() {
    this.bindEvents();
    this.initViews();
  }

  bindEvents() {
    on(this.$searchInputKeyword, '@submit', (e) => this.requestKeywordChange(e.detail.input));
    on(this.$searchButton, '@submit', (e) => this.requestKeywordChange(e.detail.input));
    on(this.$videoListContainer, '@search', (e) =>
      this.scrollHandler.requestAdditionalSearchResult(
        e.detail.offsetHeight,
        e.detail.scrollHeight,
        e.detail.scrollTop,
      ),
    );
  }

  initViews() {
    this.searchResultView = new SearchResultView(
      this.$videoListContainer,
      this.$searchInputKeyword,
      this.$searchResult,
    );
    this.errorView = new ErrorView(this.$videoListContainer);
    this.skeletonView = new SkeletonView(this.$videoListContainer);
    this.mainView = new ModalView({
      target: this.$videoListContainer,
      modalContainer: this.$modalContainer,
      searchInput: this.$searchInputKeyword,
      searchModalButton: this.$searchModalButton,
      searchButton: this.$searchButton,
      resetEmptyResult: this.searchResultView.resetEmptyResult.bind(this),
    });
  }

  requestKeywordChange(data) {
    try {
      this.scrollHandler.setError(false);
      this.#keyword = searchMachine.changeKeyword(data);
      this.#pageToken = '';
      this.searchResultView.reset();
      this.searchVideo();
    } catch (err) {
      alert(err.message);
    }
  }

  searchVideo() {
    this.skeletonView.renderSkeletonImage();
    this.requestSearchVideos();
  }

  requestSearchVideos() {
    searchMachine
      .searchByKeyword(this.#keyword, this.#pageToken)
      .then(({ videos, nextPageToken }) => {
        saveMachine.saveSearchedResult(LOCALSTORAGE_KEY_SEARCHED, videos);
        this.searchResultView.renderSearchResult(videos);
        this.#pageToken = nextPageToken;
      })
      .catch((err) => {
        console.log(err);
        this.scrollHandler.setError(true);
        this.errorView.renderNetworkError(err);
      })
      .finally(() => this.skeletonView.removeSkeletonImage());
  }

  scrollVideoContainerHandler() {
    let requestErrored = false;

    return {
      requestAdditionalSearchResult: (offsetHeight, scrollHeight, scrollTop) => {
        if (scrollTop === 0 || requestErrored) return;
        if (offsetHeight + scrollTop >= scrollHeight) {
          this.searchVideo();
        }
      },

      setError: (isErrored) => {
        requestErrored = isErrored;
      },
    };
  }
}

export default ModalInterferer;
