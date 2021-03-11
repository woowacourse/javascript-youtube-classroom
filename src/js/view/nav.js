import { CLASS, SELECTOR } from '../constants/constant.js';
import { $, toggleSelectorClass } from '../utils/util.js';

class NavView {
  toggleNavButton = watched => {
    toggleSelectorClass(
      $(SELECTOR.TO_WATCH_VIDEOS_BUTTON),
      CLASS.BG_CYAN,
      !watched
    );
    toggleSelectorClass(
      $(SELECTOR.WATCHED_VIDEOS_BUTTON),
      CLASS.BG_CYAN,
      watched
    );
  };
}

export default NavView;
