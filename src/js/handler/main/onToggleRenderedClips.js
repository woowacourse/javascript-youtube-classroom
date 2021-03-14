import $DOM from '../../utils/DOM.js';
import storage from '../../utils/localStorage.js';
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_VALUE,
} from '../../utils/constant.js';

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
  if (target.dataset.js === 'navigator__search-button') {
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

  let targetIndex = 0;
  if (isUnwatchedButton) {
    targetIndex = 1;
  }

  if (isLikedButton) {
    targetIndex = 2;
  }

  deActivateTargetSection();
  activateTargetSection(targetSectionClassName[targetIndex]);
};
