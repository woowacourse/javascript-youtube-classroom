import throttle from '../util/throttle.js';
import SearchMachine from '../domain/SearchMachine.js';
import { SearchModalPresenter } from '../presenter/SearchModalPresenter.js';

class SearchModal {
  constructor(appendList, storage) {
    this.$searchInputKeyword = document.querySelector('#search-input-keyword');
    this.$searchButton = document.querySelector('#search-button');
    this.$videoListContainer = document.querySelector('.video-list');
    this.scrollHandler = this.scrollVideoContainerHandler();
    this.requestAdditionalSearchResult = throttle(
      this.scrollHandler.requestAdditionalSearchResult,
      1000,
    ).bind(this);
    this.machine = new SearchMachine();
    this.videoStorage = storage;
    this.appendList = appendList;
    this.searchModalPresenter = new SearchModalPresenter();
    this.bindEvent();
  }

  bindEvent() {
    this.$searchInputKeyword.addEventListener(
      'keypress',
      this.submitKeywordHandler.bind(this),
    );
    this.$searchButton.addEventListener(
      'click',
      this.submitKeywordHandler.bind(this),
    );
    this.$videoListContainer.addEventListener(
      'click',
      this.saveVideo.bind(this),
    );
    this.$videoListContainer.addEventListener(
      'scroll',
      this.requestAdditionalSearchResult.bind(this),
    );
  }

  submitKeywordHandler(event) {
    if (
      (event.type === 'keypress' && event.key === 'Enter') ||
      event.type === 'click'
    ) {
      try {
        this.scrollHandler.setError(false);
        this.machine.keyword = this.$searchInputKeyword.value;
        this.initVideoState();
        this.searchVideo();
      } catch (err) {
        alert(err);
      }
    }
  }

  initVideoState() {
    this.searchModalPresenter.renderInitState();
    this.machine.initPageToken();
  }

  saveVideo({ target }) {
    if (!target.classList.contains('video-item__save-button')) {
      return;
    }

    try {
      const newVideo = target.dataset.id;
      this.machine.saveVideoToLocalStorage(newVideo);
      this.appendList(target.dataset);
      this.videoStorage.appendVideo(target.dataset);
      target.classList.add('hide');
    } catch (err) {
      alert(err.message);
    }
  }

  scrollVideoContainerHandler() {
    let errored = false;

    return {
      requestAdditionalSearchResult: () => {
        const { offsetHeight, scrollHeight, scrollTop } =
          this.$videoListContainer;
        if (scrollTop === 0 || errored) return;
        if (offsetHeight + scrollTop >= scrollHeight) {
          this.searchVideo();
        }
      },

      setError: (isErrored) => {
        errored = isErrored;
      },
    };
  }

  searchVideo() {
    this.searchModalPresenter.renderSkeletonImage();
    this.machine
      .search()
      .then((items) => this.searchModalPresenter.renderResult(items))
      .catch((err) => {
        this.scrollHandler(true);
        this.searchModalPresenter.renderNetworkError(err);
      })
      .finally(this.searchModalPresenter.removeSkeleton);
  }
}

export default SearchModal;
