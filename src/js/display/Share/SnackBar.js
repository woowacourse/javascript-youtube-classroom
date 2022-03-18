import { $ } from '@Utils/dom';
import { SNACKBAR_TYPE, SNACKBAR_CONSIST_TIME } from '@Constants';

class SnackBar {
  constructor() {
    this.container = $('#snackbar');
    this.$description = $('#snackbar-description', this.container);
    this.timer;
  }

  open(message, type) {
    this.container.classList.add('show');
    type === SNACKBAR_TYPE.ERROR
      ? this.container.classList.add('error')
      : this.container.classList.remove('error');
    this.$description.textContent = message;

    this.timer = setTimeout(() => {
      this.close();
    }, SNACKBAR_CONSIST_TIME);
  }

  close() {
    this.container.classList.remove('show');
    clearTimeout(this.timer);
  }
}

export default new SnackBar();
