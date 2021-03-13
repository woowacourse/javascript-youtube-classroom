import $DOM from '../../utils/DOM.js';
import { onModalShow } from '../modal/visibility/onModalShow.js';
import { onButtonContainer } from './onButtonContainer.js';
import { onToggleRenderedClips } from './onToggleRenderedClips.js';

export default function () {
  $DOM.NAVIGATOR.CONTAINER.addEventListener('click', onToggleRenderedClips);
  $DOM.NAVIGATOR.SEARCH_BUTTON.addEventListener('click', onModalShow);

  $DOM.SAVE_PAGE.VIDEO_WRAPPER.addEventListener('click', onButtonContainer);
}
