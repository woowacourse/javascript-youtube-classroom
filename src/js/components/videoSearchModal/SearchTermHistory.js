import { store } from '../../index.js';
import {
  addSearchHistory,
  addVideos,
  updateRequestPending,
} from '../../redux/action.js';
import { localStorageManager } from '../App.js';

export default class SearchTermHistory {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
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
    this.$props.youtubeAPIManager.setSearchTerm(searchTerm);
    this.$props.youtubeAPIManager.requestVideos().then((items) => {
      store.dispatch(addVideos(items));
    });
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

  // TODO : 최초 Render시 기존에 저장된 히스토리가 있는지 확인해야함.
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
