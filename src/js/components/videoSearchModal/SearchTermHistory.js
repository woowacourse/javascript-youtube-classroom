import { store } from '../../index.js';
import {
  addSearchHistory,
  addVideos,
  updateRequestPending,
} from '../../redux/action.js';
import { localStorageManager, youtubeAPIManager } from '../App.js';
import { ERROR_MESSAGE } from '../../constants/constants.js';

export default class SearchTermHistory {
  constructor($target) {
    this.$target = $target;
    this.initRender();
    this.selectDOM();
    this.setup();
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  onRequestVideo(e) {
    const searchTerm = e.target.textContent;

    store.dispatch(addSearchHistory(searchTerm));
    store.dispatch(updateRequestPending(true));

    youtubeAPIManager.setSearchTerm(searchTerm);
    youtubeAPIManager
      .requestVideos()
      .then((items) => {
        store.dispatch(updateRequestPending(false));
        store.dispatch(addVideos(items));
      })
      .catch((error) => alert(ERROR_MESSAGE.EXCEED_API_REQUEST_COUNT(error)));
  }

  chipsTemplate(searchHistory) {
    const fragment = document.createDocumentFragment();

    searchHistory.forEach((history) => {
      const button = document.createElement('button');
      button.classList.add('chip');
      button.textContent = history;
      button.addEventListener('click', this.onRequestVideo.bind(this));
      fragment.appendChild(button);
    });

    return fragment;
  }

  render(preStates, states) {
    if (preStates.searchHistory !== states.searchHistory) {
      this.$chips.innerHTML = '';
      this.$chips.appendChild(this.chipsTemplate(states.searchHistory));
      localStorageManager.setItem('searchHistory', states.searchHistory);
    }
  }

  initRender() {
    const fragment = document.createDocumentFragment();
    const searchHistory = document.createElement('span');
    searchHistory.classList.add('text-gray-700');
    searchHistory.textContent = '최근 검색어: ';

    const chips = document.createElement('div');
    chips.classList.add('chips');

    chips.appendChild(
      this.chipsTemplate(localStorageManager.getItem('searchHistory'))
    );

    fragment.appendChild(searchHistory);
    fragment.appendChild(chips);

    this.$target.appendChild(fragment);
  }

  selectDOM() {
    this.$chips = this.$target.querySelector('.chips');
  }
}
