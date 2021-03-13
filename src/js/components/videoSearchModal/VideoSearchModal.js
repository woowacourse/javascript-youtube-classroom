import VideoSearchBar from './VideoSearchBar.js';
import SearchTermHistory from './SearchTermHistory.js';
import VideoSearchResult from './VideoSearchResult.js';
import Component from '../../core/Component.js';
import { $ } from '../../utils/utils.js';
import { youtubeAPIManager } from '../App.js';
import { store } from '../../index.js';
import {
  addSearchHistory,
  updateRequestPending,
  updateVideosToBeShown,
} from '../../redux/action.js';
import { SELECTORS } from '../../constants/constants.js';
import { pauseAllIframeVideo } from '../../utils/youtubeClassRoomUtils.js';

export default class VideoSearchModal extends Component {
  constructor($target) {
    super($target);
    this.mount();
  }

  initRender() {
    this.$target.innerHTML = `
    <div class="video-search-overlay w-100"></div>
    <div class="modal-inner p-8">
        <button class="modal-close" aria-label="검색창 닫기">
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
    this.videoSearchBar = new VideoSearchBar(
      $(SELECTORS.SEARCH_MODAL.VIDEO_SEARCH_BAR.SECTION_ID),
      { requestVideos: this.requestVideos.bind(this) }
    );

    this.searchTermHistory = new SearchTermHistory(
      $(SELECTORS.SEARCH_MODAL.SEARCH_TERM_HISTORY.SECTION_ID),
      { requestVideos: this.requestVideos.bind(this) }
    );

    this.videoSearchResult = new VideoSearchResult(
      $(SELECTORS.SEARCH_MODAL.VIDEO_SEARCH_RESULT.SECTION_ID),
      { requestVideos: this.requestVideos.bind(this) }
    );
  }

  selectDOM() {
    this.$modalClose = $(SELECTORS.SEARCH_MODAL.MODAL_CLOSE_BUTTON_CLASS);
    this.$overlay = $(SELECTORS.SEARCH_MODAL.MODAL_OVERLAY_CLASS);
  }

  bindEvent() {
    this.$modalClose.addEventListener('click', this.onModalClose.bind(this));
    this.$target.addEventListener(
      'mousedown',
      this.onClickOutsideModal.bind(this)
    );
  }

  onClickOutsideModal(event) {
    if (event.target === this.$overlay) {
      this.onModalClose();
    }
  }

  onModalShow() {
    pauseAllIframeVideo();

    $('body').classList.add('overflow-hidden');
    this.$target.classList.add('open');

    const latestSearchTerm = store.getStates().searchHistory[0];

    if (latestSearchTerm) {
      this.requestVideos(latestSearchTerm);
    }
    this.videoSearchBar.$videoSearchInput.focus();
  }

  onModalClose() {
    pauseAllIframeVideo();
    $('body').classList.remove('overflow-hidden');
    this.$target.classList.remove('open');
  }

  requestVideos(searchTerm) {
    if (searchTerm) {
      store.dispatch(addSearchHistory(searchTerm));
      youtubeAPIManager.setSearchTerm(searchTerm);
    }

    store.dispatch(updateRequestPending(true));

    youtubeAPIManager
      .requestVideos()
      .then((videoInfos) => {
        store.dispatch(updateRequestPending(false));
        store.dispatch(updateVideosToBeShown(videoInfos));
      })
      .catch((error) => {
        this.videoSearchResult.removeSkeletons();
        store.dispatch(updateRequestPending(false));
        alert(error);
      });
  }
}
