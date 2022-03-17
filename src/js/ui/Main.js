import { store } from '../domain/store';
import { $ } from '../utils/dom';
import { MESSAGE, STATE, STORAGE_KEY } from '../constants';
import { getVideoTemplate } from './template';

export default class Main {
  constructor() {
    this.tab = STATE.WILL;
    this.$videoContainer = $('.video-container');
    this.renderVideo(this.tab);
    this.addNavButtonClickEvent();
  }

  renderNoSavedVideo() {
    this.$videoContainer.replaceChildren();
    this.$videoContainer.insertAdjacentHTML(
      'beforeend',
      MESSAGE.NO_SAVED_VIDEO,
    );
  }

  renderVideo(watched) {
    const saveVideos = store.getLocalStorage(STORAGE_KEY);
    const filteredVideos = saveVideos?.filter(
      video => video.watched === watched,
    );
    if (!filteredVideos || filteredVideos.length === 0) {
      this.renderNoSavedVideo();
      return;
    }

    this.$videoContainer.replaceChildren();
    const $saveVideoList = document.createElement('ul');
    $saveVideoList.classList.add('save-video-list');
    $saveVideoList.insertAdjacentHTML(
      'beforeend',
      getVideoTemplate(filteredVideos),
    );
    this.$videoContainer.appendChild($saveVideoList);
  }

  addNavButtonClickEvent() {
    const $willWatchVideoButton = $('#will-watch-video-button');
    const $watchedVideoButton = $('#watched-video-button');

    $willWatchVideoButton.addEventListener('click', () => {
      [$willWatchVideoButton, $watchedVideoButton].forEach(button =>
        button.classList.toggle('clicked'),
      );
      this.tab = STATE.WILL;
      this.renderVideo(this.tab);
    });
    $watchedVideoButton.addEventListener('click', () => {
      [$willWatchVideoButton, $watchedVideoButton].forEach(button =>
        button.classList.toggle('clicked'),
      );
      this.tab = STATE.WATCHED;
      this.renderVideo(this.tab);
    });
  }
}
