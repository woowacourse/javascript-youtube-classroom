import { $, openModal, closeModal } from './utils.js';
import { SELECTORS } from './constants.js';
import Store from './lib/Store.js';
import WatchList from './components/WatchList.js';
import YoutubeSearchManager from './components/YoutubeSearchManager.js';

const store = new Store();

// Note: modal 관련 이벤트 메소드는 추후 2단계에서 새로운 컴포넌트를 만들어 옮길 예정입니다.
$(SELECTORS.ID.SEARCH_BUTTON).addEventListener('click', openModal);
$(SELECTORS.CLASS.MODAL_CLOSE).addEventListener('click', closeModal);

const watchList = new WatchList(store);
const youtubeSearchManager = new YoutubeSearchManager(store, watchList);

store.subscribe(watchList);
store.subscribe(youtubeSearchManager);

watchList.render();
youtubeSearchManager.render();
