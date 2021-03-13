import { LOCAL_STORAGE_KEYS, SELECTORS } from './constants.js';
import Store from './lib/Store.js';
import WatchList from './components/WatchList.js';
import YoutubeSearchModal from './components/YoutubeSearchModal.js';
import ModalManager from './components/ModalManager.js';

const store = new Store();

const modalManager = new ModalManager();
const watchList = new WatchList(store);
const youtubeSearchModal = new YoutubeSearchModal(store);

store.subscribe(LOCAL_STORAGE_KEYS.WATCH_LIST, watchList);
store.subscribe(LOCAL_STORAGE_KEYS.WATCH_LIST, youtubeSearchModal);
store.subscribe(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST, youtubeSearchModal);

modalManager.init();
watchList.render();
youtubeSearchModal.render();
