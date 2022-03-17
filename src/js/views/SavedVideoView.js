import { $ } from './utils.js';
import { SELECTOR } from '../constants/index.js';

export default class SavedVideoView {
  constructor() {
    this.bindSavedVideoList();
  }

  bindSavedVideoList() {
    $(SELECTOR.PLAYLIST_VIDEO).addEventListener('click', this.#changeVideoListContents.bind(this, 'add'));
    $(SELECTOR.WATCHED_VIDEO).addEventListener('click', this.#changeVideoListContents.bind(this, 'remove'));
  }

  #changeVideoListContents(option) {
    $(SELECTOR.APP).classList[option]('hide_videolist');
  }
}
