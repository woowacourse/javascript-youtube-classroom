import Component from '../../core/Component.js';
import { store } from '../../index.js';
import { $, isEmptyString } from '../../utils/utils.js';
import { SELECTORS, ERROR_MESSAGES } from '../../constants/constants.js';
import {
  saveHistoryToLocalStorage,
  showSnackBar,
} from '../../utils/youtubeClassRoomUtils.js';

export default class VideoSearchBar extends Component {
  setup() {
    store.subscribe(this.render.bind(this));
  }

  initRender() {
    this.$target.innerHTML = `
      <form id="youtube-search-form" class="d-flex">
        <input id="youtube-search-input" name="youtube-search-input" type="text" class="w-100 mr-2 pl-2" placeholder="검색" aria-label="비디오 검색 입력창" required/>
        <button id="youtube-search-button" type="submit" class="btn bg-cyan-500">검색</button>
      </form>
    `;
  }

  selectDOM() {
    this.$videoSearchForm = $(SELECTORS.SEARCH_MODAL.VIDEO_SEARCH_BAR.FORM_ID);
    this.$videoSearchInput = $(
      SELECTORS.SEARCH_MODAL.VIDEO_SEARCH_BAR.INPUT_ID
    );
    this.$videoSearchButton = $(
      SELECTORS.SEARCH_MODAL.VIDEO_SEARCH_BAR.SUBMIT_BUTTON_ID
    );
    this.$snackbar = $(SELECTORS.VIDEO_LIST.SNACKBAR);
  }

  bindEvent() {
    this.$videoSearchForm.addEventListener(
      'submit',
      this.onRequestVideo.bind(this)
    );
  }

  render(preStates, states) {
    if (preStates.searchHistory !== states.searchHistory) {
      const latestSearchHistory = states.searchHistory[0];

      this.$videoSearchInput.value = latestSearchHistory;
    }
  }

  onRequestVideo(event) {
    event.preventDefault();

    const searchTerm = event.target.elements[
      'youtube-search-input'
    ].value.trim();

    if (isEmptyString(searchTerm)) {
      this.$videoSearchInput.focus();
      this.$videoSearchInput.value = '';
      showSnackBar(this.$snackbar, ERROR_MESSAGES.EMPTY_SEARCH_TERM);
      return;
    }

    saveHistoryToLocalStorage(searchTerm);

    this.$props.requestVideos(searchTerm);
  }
}
