import {
  ANIMATION_CLASS,
  SELECTOR_CLASS,
  SETTINGS,
  SNACKBAR_MESSAGE,
  STYLE_CLASS,
} from '../constants.js';
import BasicView from './BasicView.js';
import { $nav, $snackbarWrapper } from '../elements.js';

export default class LayoutView extends BasicView {
  constructor() {
    super();
  }

  showCheckSnackbar(isWatchedAfter) {
    if (isWatchedAfter) {
      this.showSnackbar(SNACKBAR_MESSAGE.WATCHED_VIDEO_SAVE_SUCCESS, true);
      return;
    }

    this.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS, true);
  }

  showFavoriteSnackbar(isFavoriteAfter) {
    if (isFavoriteAfter) {
      this.showSnackbar(SNACKBAR_MESSAGE.FAVORITE_VIDEO_SAVE_SUCCESS, true);
      return;
    }

    this.showSnackbar(SNACKBAR_MESSAGE.FAVORITE_VIDEO_CANCEL_SUCCESS, true);
  }

  showSnackbar(message, isSuccess) {
    const $snackbar = this.#createSnackbar(message, isSuccess);

    this.insertElement($snackbarWrapper, $snackbar);
    setTimeout(() => {
      this.deleteElement($snackbarWrapper, $snackbar);
    }, SETTINGS.SNACKBAR_PERSISTENT_MILLISEC);
  }

  highlightNavButton(hashId) {
    $nav.querySelectorAll(`.${SELECTOR_CLASS.NAV_BUTTON}`).forEach($button => {
      if ($button.dataset.hashId === hashId) {
        $button.classList.add(STYLE_CLASS.NAV_CLICKED);
        return;
      }

      $button.classList.remove(STYLE_CLASS.NAV_CLICKED);
    });
  }

  confirm(message) {
    return confirm(message);
  }

  #createSnackbar(message, isSuccess) {
    const $snackbar = document.createElement('div');

    $snackbar.className = `
      ${SELECTOR_CLASS.SNACKBAR} 
      ${STYLE_CLASS.SNACKBAR} 
      ${isSuccess ? STYLE_CLASS.SUCCESS : STYLE_CLASS.FAIL}
      ${ANIMATION_CLASS.FADE_IN_AND_OUT}
    `;
    $snackbar.innerText = message;

    return $snackbar;
  }
}
