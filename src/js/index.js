import storage from './utils/localStorage.js';
import { throttling } from './utils/throttling.js';
import { LOCAL_STORAGE_KEY } from './utils/constant.js';
import { onModalShow } from './handler/onModalShow.js';
import { onSearchByKeyword, onSearchClip } from './handler/onSearchClip.js';
import { onModalScroll } from './handler/onModalScroll.js';
import { onSaveClip } from './handler/onSaveClip.js';
import { onModalClose } from './handler/onModalClose.js';
import { renderSavedClips } from './view/main.js';
import { hideElement, showElement } from './utils/setAttribute.js';
import { onToggleRenderedClips } from './handler/onToggleRenderedClips.js';
import { onButtonContainer } from './handler/onButtonContainer.js';
import { onWindowInput } from './handler/onWindowInput.js';
import $DOM from './utils/DOM.js';

const clearDeletedClip = () => {
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];
  const filterdSavedClips = savedClips.filter(
    (savedClip) => !savedClip.isDeleted,
  );

  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, filterdSavedClips);
};

const initDisplay = () => {
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];

  if (savedClips.length === 0) {
    showElement($DOM.SAVE_PAGE.NOT_FOUND);
    return;
  }

  hideElement($DOM.SAVE_PAGE.NOT_FOUND);
  renderSavedClips(savedClips);
};

export const YoutubeClassRoom = () => {
  $DOM.NAVIGATOR.SEARCH_BUTTON.addEventListener('click', onModalShow);
  $DOM.SEARCH_MODAL.FORM.addEventListener('submit', onSearchClip);
  $DOM.SEARCH_MODAL.CHIP_CONTAINER.addEventListener('click', onSearchByKeyword);
  $DOM.SEARCH_MODAL.INNER.addEventListener('scroll', (event) => {
    throttling(onModalScroll, event);
  });
  $DOM.SEARCH_MODAL.VIDEO_WRAPPER.addEventListener('click', onSaveClip);
  $DOM.NAVIGATOR.CONTAINER.addEventListener('click', onToggleRenderedClips);
  $DOM.SAVE_PAGE.VIDEO_WRAPPER.addEventListener('click', onButtonContainer);

  window.addEventListener('keyup', onWindowInput);
  window.addEventListener('click', onModalClose);
};

window.onload = () => {
  YoutubeClassRoom();
  clearDeletedClip();
  initDisplay();
  onToggleRenderedClips({
    target: $DOM.NAVIGATOR.UNWATCHED_BUTTON,
  });
};
