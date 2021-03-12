import { $, openModal, closeModal } from './utils.js';
import { LOCAL_STORAGE_KEYS, SELECTORS } from './constants.js';
import Store from './lib/Store.js';
import WatchList from './components/WatchList.js';
import YoutubeSearchManager from './components/YoutubeSearchManager.js';

const store = new Store();

$(SELECTORS.ID.SEARCH_BUTTON).addEventListener('click', () => {
  openModal();
  $(SELECTORS.ID.YOUTUBE_SEARCH_KEYWORD_INPUT).focus();
});

$(SELECTORS.CLASS.MODAL_CLOSE).addEventListener('click', () => {
  closeModal();
});

const watchList = new WatchList(store);
const youtubeSearchManager = new YoutubeSearchManager(store);

store.subscribe(LOCAL_STORAGE_KEYS.WATCH_LIST, watchList);
store.subscribe(LOCAL_STORAGE_KEYS.WATCH_LIST, youtubeSearchManager);
store.subscribe(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST, youtubeSearchManager);

watchList.render();
youtubeSearchManager.render();
