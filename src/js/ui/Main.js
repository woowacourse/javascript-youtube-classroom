import { MESSAGE, STORAGE_KEY } from '../constants';
import { store } from '../domain/store';
import { $, $$ } from '../utils/dom';
import { showExceptionSnackBar } from '../utils/snackBar';
import { getVideoTemplate } from './template';

export default class Main {
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
    this.addWatchButtonClickEvent();
    this.addDeleteButtonClickEvent();
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

  addWatchButtonClickEvent() {
    $$('.watch-button').forEach(button =>
      button.addEventListener('click', e => {
        const { videoId } = e.target.dataset;
        const saveVideos = store.getLocalStorage(STORAGE_KEY);

        store.removeLocalStorage(STORAGE_KEY);
        saveVideos.forEach(video => {
          if (video.videoId === videoId) {
            video.watched = !video.watched;
          }
          store.setLocalStorage(STORAGE_KEY, video);
        });

        showExceptionSnackBar(MESSAGE.MODIFY_COMPLETE);

        if (this.tab === 'will') {
          this.renderVideo(false);
        } else if (this.tab === 'watched') {
          this.renderVideo(true);
        }
      }),
    );
  }

  addDeleteButtonClickEvent() {
    $$('.delete-button').forEach(button =>
      button.addEventListener('click', e => {
        if (!confirm(MESSAGE.ASK_DELETE)) return;
        const { videoId } = e.target.dataset;
        const saveVideos = store.getLocalStorage(STORAGE_KEY);

        store.removeLocalStorage(STORAGE_KEY);
        saveVideos.forEach(video => {
          if (video.videoId !== videoId) {
            store.setLocalStorage(STORAGE_KEY, video);
          }
        });

        showExceptionSnackBar(MESSAGE.MODIFY_COMPLETE);

        if (this.tab === 'will') {
          this.renderVideo(false);
        } else if (this.tab === 'watched') {
          this.renderVideo(true);
        }
      }),
    );
  }
}
