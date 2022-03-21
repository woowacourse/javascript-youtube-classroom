import saveMachine from '../domain/saveMachine';
import SaveView from '../ui/saveView';
import { on } from '../util/event';
import { $ } from '../util/selector';
import { LOCALSTORAGE_KEY_SAVE, LOCALSTORAGE_KEY_WATCHED } from '../constant/index';

class SaveInterferer {
  constructor(mainInterferer) {
    this.$videoListContainer = $('.video-list');
    this.$watchLaterVideoList = $('.watch-later-video-list');
    this.$watchedVideoList = $('.watched-video-list');
    this.saveView = new SaveView(this.$videoListContainer);
    this.mainInterferer = mainInterferer;
  }

  init() {
    on(this.$videoListContainer, '@save', (e) => this.saveVideo(e.detail.id));
    on(this.$watchLaterVideoList, '@watched', (e) => this.saveWatchedVideo(e.detail.id));
    on(this.$watchedVideoList, '@watchlater', (e) => this.saveWatchLaterVideo(e.detail.id));
  }

  saveVideo(id) {
    try {
      this.saveWatchLaterVideo(id);
      this.mainInterferer.loadSavedItemsPage(true);
    } catch (err) {
      alert(err.message);
    }
  }

  saveWatchLaterVideo(id) {
    saveMachine.saveToLocalStorage(LOCALSTORAGE_KEY_SAVE, id);
  }

  saveWatchedVideo(id) {
    saveMachine.saveToLocalStorage(LOCALSTORAGE_KEY_WATCHED, id);
  }
}

export default SaveInterferer;
