import throttle from '../util/throttle.js';
import SearchMachine from '../domain/SearchMachine.js';
import SearchModalPresenter from '../presenter/SearchModalPresenter.js';
import EventFactory from '../event/EventFactory.js';

class SearchModal {
  constructor(appendList, storage) {
    this.$searchInputKeyword = document.querySelector('#search-input-keyword');
    this.$searchButton = document.querySelector('#search-button');
    this.$videoListContainer = document.querySelector('.video-list');
    this.scrollVideoContainerHandler = throttle(
      this.scrollVideoContainerHandler.bind(this),
      1000,
    );
    this.machine = new SearchMachine();
    this.videoStorage = storage;
    this.appendList = appendList;
    this.bindEvent();
    this.errored = { isExisted: false };
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
      this.scrollVideoContainerHandler.bind(this),
    );
  }

  submitKeywordHandler(event) {
    if (
      (event.type === 'keypress' && event.key === 'Enter') ||
      event.type === 'click'
    ) {
      try {
        EventFactory.generate('SEARCH_VIDEO', {
          keyword: this.$searchInputKeyword.value,
          errored: this.errored,
          initial: true,
        });
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
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
    const { offsetHeight, scrollHeight, scrollTop } = this.$videoListContainer;
    if (scrollTop === 0 || this.errored.error) return;
    if (offsetHeight + scrollTop >= scrollHeight) {
      EventFactory.generate('SEARCH_VIDEO', {
        errored: this.errored,
        initial: false,
      });
    }
  }
}

export default SearchModal;
