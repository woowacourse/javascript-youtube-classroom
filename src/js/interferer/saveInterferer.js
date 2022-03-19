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
    on(this.$videoListContainer, '@save', (e) => this.saveVideo(e.detail.newVideo));
    on(this.$watchLaterVideoList, '@watched', (e) => this.saveWatchedVideo(e.detail.watchedVideo));
    on(this.$watchedVideoList, '@watchlater', (e) => this.saveVideo(e.detail.newVideo));
  }

  saveVideo(newVideo) {
    try {
      saveMachine.saveToLocalStorage(LOCALSTORAGE_KEY_SAVE, newVideo);
      this.mainInterferer.loadSavedItemsPage();
    } catch (err) {
      alert(err.message);
    }
  }

  saveWatchedVideo(watchedVideo) {
    saveMachine.saveToLocalStorage(LOCALSTORAGE_KEY_WATCHED, watchedVideo);
  }
}

export default SaveInterferer;
