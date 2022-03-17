import { LOCALSTORAGE_KEY_SAVE } from '../constant';
import { getLocalStorage } from '../domain/localStorage';
import MainView from '../ui/mainView';
import { $ } from '../util/selector';

class MainInterferer {
  #savedItems;

  constructor() {
    this.#savedItems = [];
    this.$afterWatchVideoList = $('.after-watch-video-list');
    this.$watchedVideoList = $('.watched-video-list');
    this.mainView = new MainView(this.$afterWatchVideoList, this.$watchedVideoList);
  }

  init() {
    this.#savedItems = getLocalStorage(LOCALSTORAGE_KEY_SAVE);
    this.mainView.renderItems(this.#savedItems);
  }
}

export default MainInterferer;
