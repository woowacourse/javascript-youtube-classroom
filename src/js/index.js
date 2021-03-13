import $DOM from './utils/DOM.js';
import storage from './utils/localStorage.js';
import { onToggleRenderedClips } from './handler/main/onToggleRenderedClips.js';
import { hideElement, showElement } from './utils/setAttribute.js';
import { LOCAL_STORAGE_KEY } from './utils/constant.js';
import { renderSavedClips } from './view/main.js';
import initHandler from './handler/index.js';

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
  onToggleRenderedClips({
    target: $DOM.NAVIGATOR.UNWATCHED_BUTTON,
  });
};

export const YoutubeClassRoom = () => {
  clearDeletedClip();
  initDisplay();
  initHandler();
};

window.onload = () => {
  YoutubeClassRoom();
};
