import { MESSAGE, STORAGE_KEY } from '../constants';
import { store } from '../domain/store';
import { $ } from '../utils/dom';

export default class Video {
  constructor() {
    const saveDatas = store.getLocalStorage(STORAGE_KEY);
    if (!saveDatas) {
      this.renderNoSavedVideo(false);
    }
  }

  renderNoSavedVideo() {
    $('.video-container').replaceChildren();
    $('.video-container').insertAdjacentHTML(
      'beforeend',
      MESSAGE.NO_SAVED_VIDEO,
    );
  }
}
