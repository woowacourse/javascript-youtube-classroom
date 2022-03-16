import ModalManualScreen from './modalManualScreen.js';
import SearchVideoScreen from './searchVideoScreen.js';
import VideoManualScreen from './videoManualScreen.js';

export default class ScreenManager {
  constructor() {
    new ModalManualScreen();
    new SearchVideoScreen();
    new VideoManualScreen();
  }
}
