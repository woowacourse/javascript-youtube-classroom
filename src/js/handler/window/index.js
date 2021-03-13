import { onWindowInput } from './onWindowInput.js';
import { onModalClose } from '../modal/visibility/onModalClose.js';

export default function () {
  window.addEventListener('keyup', onWindowInput);
  window.addEventListener('click', onModalClose);
}
