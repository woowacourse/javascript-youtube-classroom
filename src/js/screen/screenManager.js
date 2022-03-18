import ModalManualScreen from './modalManualScreen.js';
import SearchVideoScreen from './searchVideoScreen.js';
import WatchVideoScreen from './watchVideoScreen.js';

export default class ScreenManager {
  constructor() {
    new ModalManualScreen();
    new SearchVideoScreen();
    new WatchVideoScreen();
  }
}
