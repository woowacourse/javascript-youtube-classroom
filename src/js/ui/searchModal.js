import throttle from '../util/throttle.js';
import EventFactory from '../event/EventFactory.js';

class SearchModal {
  constructor() {
    this.$searchInputKeyword = document.querySelector('#search-input-keyword');
    this.$searchButton = document.querySelector('#search-button');
    this.$videoListContainer = document.querySelector('.video-list');
    this.scrollVideoContainerHandler = throttle(
      this.scrollVideoContainerHandler.bind(this),
      1000,
    );
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
      }
    }
  }

  saveVideo({ target }) {
    if (!target.classList.contains('video-item__save-button')) {
      return;
    }
    try {
      EventFactory.generate('SAVE_VIDEO', { target: target.dataset });
      target.classList.add('hide');
    } catch (err) {
      alert(err.message);
    }
  }

  scrollVideoContainerHandler() {
    const { offsetHeight, scrollHeight, scrollTop } = this.$videoListContainer;
    if (scrollTop === 0 || this.errored.isExisted) return;
    if (offsetHeight + scrollTop >= scrollHeight) {
      EventFactory.generate('SEARCH_VIDEO', {
        errored: this.errored,
        initial: false,
      });
    }
  }
}

export default SearchModal;
