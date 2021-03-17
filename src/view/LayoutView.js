import {
  ANIMATION_CLASS,
  SELECTOR_CLASS,
  SETTINGS,
  STYLE_CLASS,
} from '../constants.js';
import BasicView from './BasicView.js';

export default class LayoutView extends BasicView {
  constructor($nav) {
    super({ $nav });
  }

  highlightNavButton(hash) {
    this._element.$nav
      .querySelectorAll(`.${SELECTOR_CLASS.NAV_BUTTON}`)
      .forEach($button => {
        if ($button.dataset.id === hash) {
          $button.classList.add(STYLE_CLASS.CLICKED);
          return;
        }
        $button.classList.remove(STYLE_CLASS.CLICKED);
      });
  }

  confirm(message) {
    return confirm(message);
  }

  alert(message) {
    return alert(message);
  }
}
