import { $, createElement } from '@Utils/dom';
import { SNACKBAR_TYPE, SNACKBAR_CONSIST_TIME } from '@Constants';

class SnackBar {
  constructor() {
    this.container = $('#snackbar-container');
    this.timer;
  }

  open(message, type) {
    if (this.container.childElementCount >= 3) {
      this.close();
    }
    const snackbar = createElement('DIV', {
      className: `snackbar show ${type === SNACKBAR_TYPE.ERROR ? 'error' : 'primary'}`,
      textContent: message,
    });

    this.container.append(snackbar);
    this.timer = setTimeout(() => {
      this.close();
    }, SNACKBAR_CONSIST_TIME);
  }

  close() {
    this.container.children[0].remove();
  }
}

export default new SnackBar();
