import $DOM from '../../utils/DOM.js';
import { throttling } from '../../utils/throttling.js';
import { onSaveClip } from './save/onSaveClip.js';
import { onSearchClip } from './search/onSearchClip.js';
import { onModalScroll } from './scroll/onModalScroll.js';
import { onSearchByKeyword } from './search/onSearchBykeyword.js';

export default function () {
  $DOM.SEARCH_MODAL.FORM.addEventListener('submit', onSearchClip);
  $DOM.SEARCH_MODAL.CHIP_CONTAINER.addEventListener('click', onSearchByKeyword);
  $DOM.SEARCH_MODAL.VIDEO_WRAPPER.addEventListener('click', onSaveClip);
  $DOM.SEARCH_MODAL.INNER.addEventListener('scroll', (event) => {
    throttling(onModalScroll, event);
  });
}
