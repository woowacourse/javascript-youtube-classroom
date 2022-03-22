import { LOCALSTORAGE_KEY_SAVE, LOCALSTORAGE_KEY_WATCHED } from '../constant';
import saveMachine from '../domain/saveMachine';
import { getLocalStorage, setLocalStorage } from '../store/localStorage';
import MainView from '../ui/mainView';
import { on } from '../util/event';
import { $ } from '../util/selector';

class MainInterferer {
  #savedItems;

  #watchedItems;

  constructor() {
    this.#savedItems = [];
    this.#watchedItems = [];
    this.$watchLaterVideoList = $('.watch-later-video-list');
    this.$watchedVideoList = $('.watched-video-list');
    this.$nav = $('.nav');
    this.mainView = new MainView({
      watchLaterVideoList: this.$watchLaterVideoList,
      watchedVideoList: this.$watchedVideoList,
      nav: this.$nav,
    });

    on(this.$watchLaterVideoList, '@delete', (e) =>
      this.requestDeleteWatchLaterItem(LOCALSTORAGE_KEY_SAVE, e.detail.id),
    );
    on(this.$watchedVideoList, '@delete', (e) =>
      this.requestDeleteWatchLaterItem(LOCALSTORAGE_KEY_WATCHED, e.detail.id),
    );
    on(this.$nav, '@updatewatched', () => this.loadWatchedItemsPage());
    on(this.$nav, '@updatesaved', () => this.loadSavedItemsPage());
  }

  loadSavedItemsPage(isCallByModal) {
    this.#savedItems = saveMachine.getItemsById(getLocalStorage(LOCALSTORAGE_KEY_SAVE));
    if (isCallByModal) {
      this.mainView.turnOffWatched();
    }
    this.mainView.renderItems(this.#savedItems);
  }

  loadWatchedItemsPage() {
    this.#watchedItems = saveMachine.getItemsById(getLocalStorage(LOCALSTORAGE_KEY_WATCHED));
    this.mainView.renderItems(this.#watchedItems);
  }

  requestDeleteWatchLaterItem(key, id) {
    const filteredItems = getLocalStorage(key).filter((videoId) => videoId !== id);
    setLocalStorage(key, filteredItems);
  }
}

export default MainInterferer;
