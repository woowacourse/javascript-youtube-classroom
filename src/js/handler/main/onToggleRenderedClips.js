import $DOM from '../../utils/DOM.js';
import storage from '../../utils/localStorage.js';
import { LOCAL_STORAGE_KEY } from '../../utils/constant.js';

const sections = {
  'navigator__unwatched-button': 'unwatched-section',
  'navigator__watched-button': 'watched-section',
  'navigator__like-button': 'like-section',
};

const setSelected = (selectedButton) => {
  $DOM.NAVIGATOR.BUTTONS.forEach((button) =>
    button.classList.remove('bg-cyan-100'),
  );

  selectedButton.classList.add('bg-cyan-100');
};

const setSection = (selected) => {
  const savePageVideoWrapper = $DOM.SAVE_PAGE.VIDEO_WRAPPER;
  savePageVideoWrapper.classList.remove('watched-section');
  savePageVideoWrapper.classList.remove('unwatched-section');
  savePageVideoWrapper.classList.remove('like-section');

  savePageVideoWrapper.classList.add(sections[selected.dataset.js]);
};

export const onToggleRenderedClips = ({ target }) => {
  if (!sections.hasOwnProperty(target.dataset.js)) {
    return;
  }

  setSelected(target);
  setSection(target);
  storage.set(LOCAL_STORAGE_KEY.CURRENT_TAB, target.dataset.js);
};
