import { LOCALSTORAGE_KEY_SAVE, LOCALSTORAGE_KEY_WATCHED } from '../constant';
import { getLocalStorage, setLocalStorage } from '../domain/localStorage';
import MainView from '../ui/mainView';
import { on } from '../util/event';
import { $ } from '../util/selector';

class MainInterferer {
  #savedItems;

  #watchedItems;

  constructor() {
    this.#savedItems = [];
    this.#watchedItems = [];
    this.$afterWatchVideoList = $('.after-watch-video-list');
    this.$watchedVideoList = $('.watched-video-list');
    this.$nav = $('.nav');
    this.mainView = new MainView(this.$afterWatchVideoList, this.$watchedVideoList, this.$nav);
    on(this.$afterWatchVideoList, '@delete', (e) =>
      this.requestDeleteAfterWatchItem(LOCALSTORAGE_KEY_SAVE, e.detail.id),
    );
    on(this.$watchedVideoList, '@delete', (e) =>
      this.requestDeleteAfterWatchItem(LOCALSTORAGE_KEY_WATCHED, e.detail.id),
    );
    on(this.$nav, '@updatewatched', () => this.initWatchedItems());
    on(this.$nav, '@updatesaved', () => this.initSavedItems());
  }

  initSavedItems() {
    this.#savedItems = getLocalStorage(LOCALSTORAGE_KEY_SAVE);
    this.mainView.renderItems(this.$afterWatchVideoList, this.#savedItems);
  }

  initWatchedItems() {
    this.#watchedItems = getLocalStorage(LOCALSTORAGE_KEY_WATCHED);
    this.mainView.renderItems(this.$watchedVideoList, this.#watchedItems);
  }

  requestDeleteAfterWatchItem(key, id) {
    const filteredItems = getLocalStorage(key).filter((item) => item.videoId !== id);
    setLocalStorage(key, filteredItems);
  }
}

export default MainInterferer;
