import VideoSearchBar from './VideoSearchBar.js';
import SearchTermHistory from './SearchTermHistory.js';
import VideoSearchResult from './VideoSearchResult.js';
import { $ } from '../../utils/utils.js';
import { youtubeAPIManager } from '../App.js';
import { store } from '../../index.js';
import {
  addSearchHistory,
  updateRequestPending,
  updateVideosToBeShown,
} from '../../redux/action.js';
import { ERROR_MESSAGE } from '../../constants/constants.js';

export default class VideoSearchModal {
  constructor($target) {
    this.$target = $target;
    this.$modalClose = $('.modal-close');
    this.initRender();
    this.mount();
    this.selectDOM();
    this.bindEvent();
  }

  initRender() {
    this.$target.innerHTML = `
    <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🔎 유튜브 검색</h2>
        </header>
        <section id="video-search-bar">
        </section>
        <section id="search-term-history" class="mt-2">
        </section>
        <section id="video-search-result">
        </section>
      </div>
    </div>`;
  }

  mount() {
    this.videoSearchBar = new VideoSearchBar($('#video-search-bar'), {
      requestVideos: this.requestVideos.bind(this),
    });

    this.searchTermHistory = new SearchTermHistory($('#search-term-history'), {
      requestVideos: this.requestVideos.bind(this),
    });

    this.videoSearchResult = new VideoSearchResult($('#video-search-result'), {
      requestVideos: this.requestVideos.bind(this),
    });
  }

  selectDOM() {
    this.$modalClose = $('.modal-close');
  }

  bindEvent() {
    this.$modalClose.addEventListener('click', this.onModalClose.bind(this));
    this.$target.addEventListener(
      'mousedown',
      this.onClickOutsideModal.bind(this)
    );
  }

  onClickOutsideModal(event) {
    if (event.target.closest('.modal-inner')) {
      return;
    }
    this.onModalClose();
  }

  onModalShow() {
    this.$target.classList.add('open');
  }

  onModalClose() {
    this.$target.classList.remove('open');
  }

  requestVideos(searchTerm) {
    if (searchTerm) {
      store.dispatch(addSearchHistory(searchTerm));
    }
    store.dispatch(updateRequestPending(true));

    youtubeAPIManager.setSearchTerm(searchTerm);
    youtubeAPIManager
      .requestVideos()
      .then((videoInfos) => {
        store.dispatch(updateRequestPending(false));
        store.dispatch(updateVideosToBeShown(videoInfos));
      })
      .catch((error) => alert(ERROR_MESSAGE.EXCEED_API_REQUEST_COUNT(error)));
  }
}
