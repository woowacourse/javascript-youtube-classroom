import { store } from '../domain/store';
import { $ } from '../utils/dom';
import { showExceptionSnackBar } from '../utils/snackBar';
import { MESSAGE, STATE, STORAGE_KEY } from '../constants';
import { getAllVideoTemplate, getVideoTemplate } from './template';

export default class Main {
  constructor() {
    this.tab = STATE.WILL;
    this.$videoContainer = $('.video-container');
    this.#renderVideos(this.tab);
    this.#addNavButtonClickEvent();
    this.#addAllCheckButtonClickEvent();
    this.#addAllDeleteButtonClickEvent();
  }

  #renderNoSavedVideo() {
    this.$videoContainer.replaceChildren();
    this.$videoContainer.insertAdjacentHTML(
      'beforeend',
      MESSAGE.NO_SAVED_VIDEO,
    );
  }

  #createVideoList(videoList) {
    this.$videoContainer.replaceChildren();

    const $saveVideoList = document.createElement('ul');
    $saveVideoList.classList.add('save-video-list');
    $saveVideoList.insertAdjacentHTML('beforeend', videoList);

    this.$videoContainer.appendChild($saveVideoList);
  }

  addVideo(video) {
    const $saveVideoList = $('.save-video-list');
    const videoTemplate = getVideoTemplate(video);
    if ($saveVideoList) {
      $saveVideoList.insertAdjacentHTML('beforeend', videoTemplate);
      return;
    }
    this.#createVideoList(videoTemplate);
  }

  removeVideo(video) {
    const $saveVideoList = $('.save-video-list');
    $saveVideoList.removeChild(video.parentNode);
    if (!$saveVideoList.firstElementChild) {
      this.#renderNoSavedVideo();
    }
  }

  #renderVideos(watched) {
    const saveVideos = store.getLocalStorage(STORAGE_KEY.VIDEO);
    const filteredVideos = saveVideos?.filter(
      video => video.watched === watched,
    );
    if (!filteredVideos || filteredVideos.length === 0) {
      this.#renderNoSavedVideo();
      return;
    }
    this.#createVideoList(getAllVideoTemplate(filteredVideos, watched));
  }

  #addNavButtonClickEvent() {
    const $willWatchVideoButton = $('#will-watch-video-button');
    const $watchedVideoButton = $('#watched-video-button');

    $willWatchVideoButton.addEventListener('click', () => {
      [$willWatchVideoButton, $watchedVideoButton].forEach(button =>
        button.classList.toggle('clicked'),
      );
      this.tab = STATE.WILL;
      this.#renderVideos(this.tab);
    });
    $watchedVideoButton.addEventListener('click', () => {
      [$willWatchVideoButton, $watchedVideoButton].forEach(button =>
        button.classList.toggle('clicked'),
      );
      this.tab = STATE.WATCHED;
      this.#renderVideos(this.tab);
    });
  }

  #addAllCheckButtonClickEvent() {
    $('#all-check').addEventListener('click', () => {
      if (!confirm(MESSAGE.ASK_ALL_CHECK)) return;

      const saveVideos = store.getLocalStorage(STORAGE_KEY.VIDEO);
      if (!saveVideos) {
        showExceptionSnackBar(MESSAGE.NO_SAVED_VIDEO);
        return;
      }

      store.removeLocalStorage(STORAGE_KEY.VIDEO);
      saveVideos.forEach(video => {
        if (video.watched === this.tab) {
          video.watched = !video.watched;
        }
        store.setLocalStorage(STORAGE_KEY.VIDEO, video);
      });

      showExceptionSnackBar(MESSAGE.MODIFY_COMPLETE);

      this.#renderVideos(this.tab);
    });
  }

  #addAllDeleteButtonClickEvent() {
    $('#all-delete').addEventListener('click', () => {
      if (!confirm(MESSAGE.ASK_ALL_DELETE)) return;

      const saveVideos = store.getLocalStorage(STORAGE_KEY.VIDEO);
      if (!saveVideos) {
        showExceptionSnackBar(MESSAGE.NO_SAVED_VIDEO);
        return;
      }

      store.removeLocalStorage(STORAGE_KEY.VIDEO);
      const newVideos = saveVideos?.filter(video => video.watched !== this.tab);

      newVideos.forEach(video => {
        store.setLocalStorage(STORAGE_KEY.VIDEO, video);
      });

      showExceptionSnackBar(MESSAGE.MODIFY_COMPLETE);

      this.#renderVideos(this.tab);
    });
  }
}
