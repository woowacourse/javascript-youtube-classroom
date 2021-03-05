import Component from '../../core/Component.js';
import { store } from '../../index.js';
import { localStorageManager } from '../App.js';
import { $, isEmptyString } from '../../utils/utils.js';
import { LOCALSTORAGE_KEYS } from '../../constants/constants.js';

export default class VideoSearchBar extends Component {
  setup() {
    store.subscribe(this.render.bind(this));
  }

  initRender() {
    this.$target.innerHTML = `
      <form id="youtube-search-form" class="d-flex">
        <input id="youtube-search-input" name="youtube-search-input" type="text" class="w-100 mr-2 pl-2" placeholder="검색" />
        <button id="youtube-search-button" type="submit" class="btn bg-cyan-500">검색</button>
      </form>
    `;
  }

  selectDOM() {
    this.$videoSearchForm = $('#youtube-search-form');
    this.$videoSearchInput = $('#youtube-search-input');
    this.$videoSearchButton = $('#youtube-search-button');
  }

  bindEvent() {
    this.$videoSearchForm.addEventListener(
      'submit',
      this.onRequestVideo.bind(this)
    );
  }

  render(preStates, states) {
    // TODO: 조건문을 의미를 명확하게 전달 될 수 있도록 바꾸기 (ex. isUpdated)
    if (preStates.searchHistory !== states.searchHistory) {
      const latestSearchHistory = states.searchHistory[0];

      this.$videoSearchInput.value = latestSearchHistory;
    }
  }

  saveHistoryToLocalStorage(searchTerm) {
    const history = localStorageManager.getItem(
      LOCALSTORAGE_KEYS.SEARCH_HISTORY
    );

    if (history.includes(searchTerm)) {
      const indexOfSearchTerm = history.indexOf(searchTerm);

      history.splice(indexOfSearchTerm, 1);
    }

    history.unshift(searchTerm);
    localStorageManager.setItem(
      LOCALSTORAGE_KEYS.SEARCH_HISTORY,
      history.slice(0, 3)
    );
  }

  onRequestVideo(event) {
    event.preventDefault();
    const searchTerm = event.target.elements['youtube-search-input'].value;

    if (isEmptyString(searchTerm)) {
      return;
    }

    this.saveHistoryToLocalStorage(searchTerm);

    this.$props.requestVideos(searchTerm);
  }
}
