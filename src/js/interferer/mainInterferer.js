import { LOCALSTORAGE_KEY_SAVE } from '../constant';
import { getLocalStorage, setLocalStorage } from '../domain/localStorage';
import MainView from '../ui/mainView';
import { on } from '../util/event';
import { $ } from '../util/selector';

class MainInterferer {
  #savedItems;

  constructor() {
    this.#savedItems = [];
    this.$afterWatchVideoList = $('.after-watch-video-list');
    this.$watchedVideoList = $('.watched-video-list');
    this.mainView = new MainView(this.$afterWatchVideoList, this.$watchedVideoList);
    on(this.$afterWatchVideoList, '@delete', (e) => this.requestDeleteAfterWatchItem(e.detail.id));
  }

  init() {
    this.#savedItems = getLocalStorage(LOCALSTORAGE_KEY_SAVE);
    this.mainView.renderItems(this.#savedItems);
  }

  requestDeleteAfterWatchItem(id) {
    const filteredItems = getLocalStorage(LOCALSTORAGE_KEY_SAVE).filter(
      (item) => item.videoId !== id,
    );
    setLocalStorage(LOCALSTORAGE_KEY_SAVE, filteredItems);
  }
}

export default MainInterferer;
