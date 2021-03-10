import {
  ANIMATION_CLASS,
  SELECTOR_CLASS,
  SELECTOR_ID,
  SETTINGS,
  STYLE_CLASS,
} from '../constants.js';
import {
  $nav,
  $searchResultVideoWrapper,
  $snackbarWrapper,
} from '../elements.js';
import { $ } from '../utils/querySelector.js';
import { getVideoListTemplate } from './templates.js';
import watchingVideoView from './watchingVideoView.js';

const viewUtil = {
  //TODO: viewUtil을 view와 viewUtil로 나누기
  renderHTML($element, htmlString) {
    $element.innerHTML = htmlString;
  },

  renderSearchedVideos(processedVideos) {
    //TODO : getVideoListTemplate -> searchedVideoListTemplate
    viewUtil.renderHTML(
      $searchResultVideoWrapper,
      getVideoListTemplate(processedVideos)
    );
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
  },

  insertElement($target, $element) {
    $target.insertAdjacentElement('beforeend', $element);
  },

  insertHTML($target, htmlString) {
    $target.insertAdjacentHTML('beforeend', htmlString);
  },

  showElement($element) {
    $element.classList.remove('removed');
  },

  showElementBySelector(selector) {
    $(selector).classList.remove('removed');
  },

  showSnackbar(message, isSuccess) {
    const $snackbar = watchingVideoView.createSnackbar(message, isSuccess);
    viewUtil.insertElement($snackbarWrapper, $snackbar);
    setTimeout(() => {
      viewUtil.deleteElement($snackbarWrapper, $snackbar);
    }, SETTINGS.SNACKBAR_PERSISTENT_MILLISEC);
  },

  createSnackbar(message, isSuccess) {
    const $snackbar = document.createElement('div');
    $snackbar.className = `
      ${SELECTOR_CLASS.SNACKBAR} 
      ${STYLE_CLASS.SNACKBAR} 
      ${isSuccess ? STYLE_CLASS.SUCCESS : STYLE_CLASS.FAIL}
      ${ANIMATION_CLASS.FADE_IN_AND_OUT}
    `;
    $snackbar.innerText = message;
    return $snackbar;
  },

  hideElement($element) {
    $element.classList.add('removed');
  },

  hideElementBySelector(selector) {
    const target = $(selector);
    if (Array.isArray(target)) {
      target.forEach(item => {
        item.classList.add('removed');
      });
      return;
    }
    target.classList.add('removed');
  },

  removeStyleClass($element, removingClass) {
    $element.classList.remove(removingClass);
  },

  addStyleClass($element, removingClass) {
    $element.classList.remove(removingClass);
  },

  deleteElement($target, $element) {
    $target.removeChild($element);
  },

  confirm(message) {
    return confirm(message);
  },

  highlightNavButton(hash) {
    $nav.querySelectorAll(`.${SELECTOR_CLASS.NAV_BUTTON}`).forEach($button => {
      if ($button.dataset.id === hash) {
        $button.classList.add(STYLE_CLASS.CLICKED);
        return;
      }
      $button.classList.remove(STYLE_CLASS.CLICKED);
    });
  },
};

export default viewUtil;
