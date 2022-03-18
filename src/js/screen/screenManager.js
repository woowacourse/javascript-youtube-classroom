import ModalManualScreen from './modalManualScreen.js';
import SearchVideoScreen from './searchVideoScreen.js';

export default class ScreenManager {
  constructor() {
    new ModalManualScreen();
    new SearchVideoScreen();
  }
}
