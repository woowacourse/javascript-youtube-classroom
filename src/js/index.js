import storage from './utils/localStorage.js';
import { throttling } from './utils/throttling.js';
import { LOCAL_STORAGE_KEY } from './utils/constant.js';
import { onModalShow } from './handler/modal/visibility/onModalShow.js';
import { onModalScroll } from './handler/modal/scroll/onModalScroll.js';
import { onSaveClip } from './handler/modal/save/onSaveClip.js';
import { onModalClose } from './handler/modal/visibility/onModalClose.js';
import { renderSavedClips } from './view/main.js';
import { hideElement, showElement } from './utils/setAttribute.js';
import { onToggleRenderedClips } from './handler/main/onToggleRenderedClips.js';
import { onButtonContainer } from './handler/main/onButtonContainer.js';
import { onWindowInput } from './handler/window/onWindowInput.js';
import $DOM from './utils/DOM.js';
import { onSearchClip } from './handler/modal/search/onSearchClip.js';
import { onSearchByKeyword } from './handler/modal/search/onSearchBykeyword.js';
import { onToggleColorMode } from './handler/main/onToggleColorMode.js';

const initDisplay = () => {
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? {};
  const sortedSavedClipsArray = Object.keys(savedClips)
    .sort((a, b) => savedClips[b].savedAt - savedClips[a].savedAt)
    .map((id) => savedClips[id]);

  if (sortedSavedClipsArray.length === 0) {
    showElement($DOM.SAVE_PAGE.NOT_FOUND);
    return;
  }

  hideElement($DOM.SAVE_PAGE.NOT_FOUND);
  renderSavedClips(sortedSavedClipsArray);
  onToggleRenderedClips({
    target: $DOM.NAVIGATOR.UNWATCHED_BUTTON,
  });
};

const YoutubeClassRoom = () => {
  $DOM.NAVIGATOR.CONTAINER.addEventListener('click', onToggleRenderedClips);
  $DOM.NAVIGATOR.SEARCH_BUTTON.addEventListener('click', onModalShow);

  $DOM.TOGGLE_THUMB.addEventListener('click', onToggleColorMode);

  $DOM.SEARCH_MODAL.FORM.addEventListener('submit', onSearchClip);
  $DOM.SEARCH_MODAL.CHIP_CONTAINER.addEventListener('click', onSearchByKeyword);
  $DOM.SEARCH_MODAL.VIDEO_WRAPPER.addEventListener('click', onSaveClip);
  $DOM.SEARCH_MODAL.INNER.addEventListener('scroll', (event) => {
    throttling(onModalScroll, event);
  });

  $DOM.SAVE_PAGE.VIDEO_WRAPPER.addEventListener('click', onButtonContainer);

  window.addEventListener('keyup', onWindowInput);
  window.addEventListener('click', onModalClose);
};

window.onload = () => {
  YoutubeClassRoom();
  initDisplay();
};
