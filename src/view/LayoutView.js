import {
  ANIMATION_CLASS,
  SELECTOR_CLASS,
  SETTINGS,
  STYLE_CLASS,
} from '../constants.js';
import BasicView from './BasicView.js';

export default class LayoutView extends BasicView {
  constructor({ $nav, $snackbarWrapper }) {
    super({ $nav, $snackbarWrapper });
  }

  showSnackbar(message, isSuccess) {
    const $snackbar = this.#createSnackbar(message, isSuccess);

    this.insertElement(this._element.$snackbarWrapper, $snackbar);
    setTimeout(() => {
      this.deleteElement(this._element.$snackbarWrapper, $snackbar);
    }, SETTINGS.SNACKBAR_PERSISTENT_MILLISEC);
  }

  //TODO: 잘동작하는지 확인해보기
  highlightNavButton(hash) {
    this._element.$nav
      .querySelectorAll(`.${SELECTOR_CLASS.NAV_BUTTON}`)
      .forEach($button => {
        if ($button.dataset.id === hash) {
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
