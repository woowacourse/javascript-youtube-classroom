import { $ } from './utils.js';
import { SELECTOR } from '../constants/index.js';

export default class SavedVideoView {
  constructor() {
    this.bindSavedVideoList();
  }

  bindSavedVideoList() {
    $('#playlist_video').addEventListener('click', this.#changeVideoListContents.bind(this, 'add'));
    $('#watched_video').addEventListener('click', this.#changeVideoListContents.bind(this, 'remove'));
  }

  #changeVideoListContents(option) {
    $('#app').classList[option]('hide_videolist');
  }
}
