import { CLASS, SELECTOR, SNACK_BAR } from '../constants/constant.js';

class SnackBarView {
  #throttle;

  constructor() {
    this.#throttle = null;
  }

  showSnackBar = text => {
    const $snackBar = document.querySelector(SELECTOR.SNACK_BAR);
    $snackBar.innerHTML = text;

    if (!this.#throttle) {
      $snackBar.classList.toggle(CLASS.SHOW);
      this.#throttle = setTimeout(() => {
        this.#throttle = null;
        $snackBar.classList.toggle(CLASS.SHOW);
      }, SNACK_BAR.VISIBLE_TIME);
    }
  };
}

export default SnackBarView;
