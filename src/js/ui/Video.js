import { MESSAGE, STORAGE_KEY } from '../constants';
import { store } from '../domain/store';
import { $ } from '../utils/dom';
import { getVideoTemplate } from './template';

export default class Video {
  constructor() {
    this.tab = 'will';
    this.renderVideo(false);
    this.addNavButtonClickEvent();
  }

  renderNoSavedVideo() {
    $('.video-container').replaceChildren();
    $('.video-container').insertAdjacentHTML(
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

    const $videoContainer = $('.video-container');
    $videoContainer.replaceChildren();
    const $saveVideoList = document.createElement('ul');
    $saveVideoList.classList.add('save-video-list');
    $saveVideoList.insertAdjacentHTML(
      'beforeend',
      getVideoTemplate(filteredVideos),
    );
    $videoContainer.appendChild($saveVideoList);
  }

  addNavButtonClickEvent() {
    const $willWatchVideoButton = $('#will-watch-video-button');
    const $watchedVideoButton = $('#watched-video-button');

    $willWatchVideoButton.addEventListener('click', () => {
      [$willWatchVideoButton, $watchedVideoButton].forEach(button =>
        button.classList.toggle('clicked'),
      );
      this.renderVideo(false);
      this.tab = 'will';
    });
    $watchedVideoButton.addEventListener('click', () => {
      [$willWatchVideoButton, $watchedVideoButton].forEach(button =>
        button.classList.toggle('clicked'),
      );
      this.renderVideo(true);
      this.tab = 'watched';
    });
  }
}
