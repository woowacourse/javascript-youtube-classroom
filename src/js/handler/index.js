import initMainHandler from './main/index.js';
import initModalHandler from './modal/index.js';
import initWindowHandler from './window/index.js';

export default function () {
  initMainHandler();
  initModalHandler();
  initWindowHandler();
}
