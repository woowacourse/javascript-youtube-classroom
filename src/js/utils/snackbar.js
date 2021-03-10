import { $ } from './dom.js';
import { VALUE } from './constants.js';

const snackbar = $('#snackbar');

export default function popSnackbar(message) {
  snackbar.setText(message);
  snackbar.addClass('show');

  setTimeout(() => {
    snackbar.removeClass('show');
    snackbar.setText('');
  }, VALUE.SNACKBAR_TIME);
}
