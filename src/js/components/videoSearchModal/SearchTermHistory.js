import Component from '../../core/Component.js';
import { store } from '../../index.js';
import { $, createElement, localStorageGetItem } from '../../utils/utils.js';
import { LOCALSTORAGE_KEYS, SELECTORS } from '../../constants/constants.js';
import { saveHistoryToLocalStorage } from '../../utils/youtubeClassRoomUtils.js';

export default class SearchTermHistory extends Component {
  setup() {
    store.subscribe(this.render.bind(this));
  }

  initRender() {
    const fragment = document.createDocumentFragment();
    const searchHistory = createElement({
      tag: 'span',
      classes: ['text-gray-700'],
      textContent: '최근 검색어: ',
    });

    const chips = createElement({ tag: 'div', classes: ['chips'] });

    chips.appendChild(
      this.chipsTemplate(localStorageGetItem(LOCALSTORAGE_KEYS.SEARCH_HISTORY))
    );

    fragment.appendChild(searchHistory);
    fragment.appendChild(chips);

    this.$target.appendChild(fragment);
  }

  selectDOM() {
    this.$chips = $(
      SELECTORS.SEARCH_MODAL.SEARCH_TERM_HISTORY.CHIPS_CLASS,
      this.$target
    );
  }

  render(preStates, states) {
    if (preStates.searchHistory !== states.searchHistory) {
      this.$chips.innerHTML = '';
      this.$chips.appendChild(this.chipsTemplate(states.searchHistory));
    }
  }

  chipsTemplate(searchHistory) {
    const fragment = document.createDocumentFragment();

    searchHistory.forEach((history) => {
      const button = createElement({
        tag: 'button',
        classes: ['chip'],
        textContent: history,
      });

      button.addEventListener('click', this.onRequestVideo.bind(this));
      fragment.appendChild(button);
    });

    return fragment;
  }

  onRequestVideo(event) {
    const searchTerm = event.target.textContent;

    saveHistoryToLocalStorage(searchTerm);
    this.$props.requestVideos(searchTerm);
  }
}
