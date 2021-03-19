import $DOM from '../../utils/DOM.js';
import storage from '../../utils/localStorage.js';
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_VALUE,
} from '../../utils/constant.js';
import { hideElement, showElement } from '../../utils/setAttribute.js';
import { isEmptyDisplayClipCountFromCurrentTab } from '../shared/isEmptyDisplayClipCountFromCurrentTab.js';

const deActivateButton = () => {
  $DOM.NAVIGATOR.WATCHED_BUTTON.classList.remove('active');
  $DOM.NAVIGATOR.UNWATCHED_BUTTON.classList.remove('active');
  $DOM.NAVIGATOR.LIKED_BUTTON.classList.remove('active');
};

const activateButton = (target) => {
  target.classList.add('active');
};

const setSelected = (target) => {
  deActivateButton();
  activateButton(target);
};

const targetSectionClassName = [
  'watched-section',
  'unwatched-section',
  'liked-section',
];

const deActivateTargetSection = () => {
  targetSectionClassName.forEach((className) => {
    $DOM.SAVE_PAGE.VIDEO_WRAPPER.classList.remove(className);
  });
};

const activateTargetSection = (targetClassName) => {
  $DOM.SAVE_PAGE.VIDEO_WRAPPER.classList.add(targetClassName);
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

  let targetIndex = 0;
  storage.set(LOCAL_STORAGE_KEY.CURRENT_TAB, '볼 영상');
  if (isUnwatchedButton) {
    targetIndex = 1;
    storage.set(LOCAL_STORAGE_KEY.CURRENT_TAB, '본 영상');
  }

  if (isLikedButton) {
    targetIndex = 2;
    storage.set(LOCAL_STORAGE_KEY.CURRENT_TAB, '좋아하는 영상');
  }

  deActivateTargetSection();
  activateTargetSection(targetSectionClassName[targetIndex]);

  const currentTab = storage.get(LOCAL_STORAGE_KEY.CURRENT_TAB) || '볼 영상';
  if (isEmptyDisplayClipCountFromCurrentTab[currentTab](savedClips)) {
    showElement($DOM.SAVE_PAGE.NOT_FOUND);
    return;
  }

  hideElement($DOM.SAVE_PAGE.NOT_FOUND);
};
