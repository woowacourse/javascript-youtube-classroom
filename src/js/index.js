import { onModalShow } from './handler/onModalShow.js';
import { closeModal } from './view/modal.js';
import { $ } from './utils/querySelector.js';
import { onSearchClip } from './handler/onSearchClip.js';
import { onModalScroll } from './handler/onModalScroll.js';
import { onSaveClip } from './handler/onSaveClip.js';
import { renderSavedClips } from './view/main.js';
import storage from './utils/localStorage.js';
import { LOCAL_STORAGE_KEY } from './utils/constant.js';

let timer;
const throttling = (func) => {
  if (!timer) {
    timer = setTimeout(() => {
      timer = null;
      func();
    }, 2000);
  }
};

export const YoutubeClassRoom = () => {
  $('#search-button').addEventListener('click', onModalShow);
  $('.modal-close').addEventListener('click', closeModal);
  $('[data-js="youtube-search-modal__form"]').addEventListener(
    'submit',
    onSearchClip,
  );
  document.addEventListener('scroll', () => {
    throttling(onModalScroll);
  });
  $('[data-js="youtube-search-modal__video-wrapper"]').addEventListener(
    'click',
    onSaveClip,
  );
};

window.onload = () => {
  YoutubeClassRoom();

  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];
  renderSavedClips(savedClips);
};
