import YoutubeAPIManager from '../../model/YoutubeAPIManager.js';
import { store } from '../../index.js';
import {
  addVideos,
  addSearchHistory,
  updateRequestPending,
} from '../../redux/action.js';
import { localStorageManager } from '../App.js';

export default class VideoSearchBar {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.initRender();
    this.selectDOM();
    this.bindEvent();
    this.setup();
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  render(preStates, states) {
    if (preStates.searchHistory !== states.searchHistory) {
      this.$videoSearchInput.value = states.searchHistory[0];
    }
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
    this.$videoSearchForm = document.querySelector('#youtube-search-form');
    this.$videoSearchInput = document.querySelector('#youtube-search-input');
    this.$videoSearchButton = document.querySelector('#youtube-search-button');
  }

  bindEvent() {
    this.$videoSearchForm.addEventListener(
      'submit',
      this.onRequestVideo.bind(this)
    );
  }

  saveHistory(searchTerm) {
    const history = localStorageManager.getItem('searchHistory');
    const indexOfSearchTerm = history.indexOf(searchTerm);
    if (indexOfSearchTerm !== -1) {
      history.splice(indexOfSearchTerm, 1);
      history.unshift(searchTerm);
      localStorageManager.setItem('searchHistory', history);
      return;
    }
    history.unshift(searchTerm);
    localStorageManager.setItem('searchHistory', history.slice(0, 3));
  }

  onRequestVideo(e) {
    e.preventDefault();
    const searchTerm = e.target.elements['youtube-search-input'].value;

    if (searchTerm.trim(' ') === '') {
      return;
    }

    this.saveHistory(searchTerm);
    store.dispatch(addSearchHistory(searchTerm));
    store.dispatch(updateRequestPending(true));
    this.$props.youtubeAPIManager.setSearchTerm(searchTerm);
    this.$props.youtubeAPIManager.requestVideos().then((items) => {
      store.dispatch(updateRequestPending(false));
      store.dispatch(addVideos(items));
    });
  }
}
