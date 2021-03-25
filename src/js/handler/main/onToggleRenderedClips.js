import $DOM from '../../utils/DOM.js';
import storage from '../../utils/localStorage.js';
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_VALUE,
  YOUTUBE,
} from '../../utils/constant.js';
import { hideElement, showElement } from '../../utils/setAttribute.js';
import { isEmptyDisplayClipCountFromCurrentTab } from '../shared/isEmptyDisplayClipCountFromCurrentTab.js';

const deActivateButton = (target) => {
  target.classList.remove('active');
};

const activateButton = (target) => {
  target.classList.add('active');
};

const setSelected = (target) => {
  [
    $DOM.NAVIGATOR.WATCHED_BUTTON,
    $DOM.NAVIGATOR.UNWATCHED_BUTTON,
    $DOM.NAVIGATOR.LIKED_BUTTON,
  ].forEach((button) => deActivateButton(button));
  activateButton(target);
};

const TARGET_SECTION_CLASSNAME = {
  UNWATCHED_SECTION: 'unwatched-section',
  WATCHED_SECTION: 'watched-section',
  LIKED_SECTION: 'liked-section',
};

const deActivateTargetSection = () => {
  $DOM.SAVE_PAGE.VIDEO_WRAPPER.classList.remove(
    ...Object.values(TARGET_SECTION_CLASSNAME),
  );
};

export const onToggleRenderedClips = ({ target }) => {
  if (
    target.dataset.js === 'navigator__search-button' ||
    target.dataset.js === 'navigator'
  ) {
    return;
  }

  const isWatchedButton = target.dataset.js === 'navigator__watched-button';
  const isUnwatchedButton = target.dataset.js === 'navigator__unwatched-button';
  const isLikedButton = target.dataset.js === 'navigator__liked-button';

  setSelected(target);
  storage.set(
    LOCAL_STORAGE_KEY.CURRENT_TAB,
    isWatchedButton
      ? LOCAL_STORAGE_VALUE.WATCHED
      : LOCAL_STORAGE_VALUE.UNWATCHED,
  );

  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? {};

  deActivateTargetSection();

  if (isUnwatchedButton) {
    $DOM.SAVE_PAGE.VIDEO_WRAPPER.classList.add(
      TARGET_SECTION_CLASSNAME.UNWATCHED_SECTION,
    );
    storage.set(LOCAL_STORAGE_KEY.CURRENT_TAB, YOUTUBE.CURRENT_TAB.WATCHED);
  }

  if (isWatchedButton) {
    $DOM.SAVE_PAGE.VIDEO_WRAPPER.classList.add(
      TARGET_SECTION_CLASSNAME.WATCHED_SECTION,
    );
    storage.set(LOCAL_STORAGE_KEY.CURRENT_TAB, YOUTUBE.CURRENT_TAB.UNWATCHED);
  }

  if (isLikedButton) {
    $DOM.SAVE_PAGE.VIDEO_WRAPPER.classList.add(
      TARGET_SECTION_CLASSNAME.LIKED_SECTION,
    );
    storage.set(LOCAL_STORAGE_KEY.CURRENT_TAB, YOUTUBE.CURRENT_TAB.LIKE_CLIP);
  }

  const currentTab =
    storage.get(LOCAL_STORAGE_KEY.CURRENT_TAB) || YOUTUBE.CURRENT_TAB.WATCHED;
  if (isEmptyDisplayClipCountFromCurrentTab[currentTab](savedClips)) {
    showElement($DOM.SAVE_PAGE.NOT_FOUND);
    return;
  }

  hideElement($DOM.SAVE_PAGE.NOT_FOUND);
};
