import { $, openModal, closeModal } from './utils.js';
import { LOCAL_STORAGE_KEYS, SELECTORS } from './constants.js';
import Store from './lib/Store.js';
import WatchList from './components/WatchList.js';
import YoutubeSearchModal from './components/YoutubeSearchModal.js';

const store = new Store();

$(SELECTORS.ID.SEARCH_BUTTON).addEventListener('click', () => {
  openModal();
  $(SELECTORS.ID.YOUTUBE_SEARCH_KEYWORD_INPUT).focus();
});

$(SELECTORS.CLASS.MODAL_CLOSE).addEventListener('click', () => {
  closeModal();
});

const watchList = new WatchList(store);
const youtubeSearchModal = new YoutubeSearchModal(store);

store.subscribe(LOCAL_STORAGE_KEYS.WATCH_LIST, watchList);
store.subscribe(LOCAL_STORAGE_KEYS.WATCH_LIST, youtubeSearchModal);
store.subscribe(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST, youtubeSearchModal);

watchList.render();
youtubeSearchModal.render();
