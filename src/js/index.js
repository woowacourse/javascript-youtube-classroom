import { $ } from './utils/querySelector.js';
import storage from './utils/localStorage.js';
import { throttling } from './utils/throttling.js';
import { LOCAL_STORAGE_KEY } from './utils/constant.js';
import { onModalShow } from './handler/onModalShow.js';
import { onSearchClip } from './handler/onSearchClip.js';
import { onModalScroll } from './handler/onModalScroll.js';
import { onSaveClip } from './handler/onSaveClip.js';
import { onModalClose } from './handler/onModalClose.js';
import { renderSavedClips } from './view/main.js';

export const YoutubeClassRoom = () => {
  $('[data-js="navigator__search-button"]').addEventListener(
    'click',
    onModalShow,
  );
  $('[data-js="youtube-search-modal__form"]').addEventListener(
    'submit',
    onSearchClip,
  );
  $('[data-js="youtube-search-modal__inner"]').addEventListener(
    'scroll',
    (event) => {
      throttling(onModalScroll, event);
    },
  );
  $('[data-js="youtube-search-modal__video-wrapper"]').addEventListener(
    'click',
    onSaveClip,
  );
  window.addEventListener('click', onModalClose);
};

window.onload = () => {
  YoutubeClassRoom();

  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];
  renderSavedClips(savedClips);
};
