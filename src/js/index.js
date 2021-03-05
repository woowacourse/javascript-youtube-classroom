import { $ } from './utils.js';
import { SELECTORS } from './constants.js';
import Store from './lib/Store.js';
import WatchList from './components/WatchList.js';
import YoutubeSearchManager from './components/YoutubeSearchManager.js';

const store = new Store();

// TODO: onModal 메소드들 위치 수정
const onModalShow = () => {
  $(SELECTORS.CLASS.MODAL).classList.add(SELECTORS.STATUS.MODAL_OPEN);
};

const onModalClose = () => {
  $(SELECTORS.CLASS.MODAL).classList.remove(SELECTORS.STATUS.MODAL_OPEN);
};

$(SELECTORS.ID.SEARCH_BUTTON).addEventListener('click', onModalShow);
$(SELECTORS.CLASS.MODAL_CLOSE).addEventListener('click', onModalClose);

const watchList = new WatchList(store);
const youtubeSearchManager = new YoutubeSearchManager(store);

store.subscribe(watchList);
store.subscribe(youtubeSearchManager);

watchList.render();
youtubeSearchManager.render();
