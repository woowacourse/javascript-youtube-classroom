import { $ } from "../utils/dom.js";
import { CLASS_NAME } from "../utils/constants.js";

class MenuSection {
  constructor(props) {
    this.props = props;
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$target = $(`.${CLASS_NAME.MENU_SECTION}`);
    this.$watchLaterBtn = $(`.${CLASS_NAME.WATCH_LATER_BTN}`);
    this.$watchedBtn = $(`.${CLASS_NAME.WATCHED_BTN}`);
    this.$videoSearchBtn = $(`.${CLASS_NAME.VIDEO_SEARCH_BTN}`);
  }

  bindEvent() {
    this.$target.addEventListener("click", this.handleSelectMenu.bind(this));
  }

  handleSelectMenu({ target }) {
    const menuNames = [
      CLASS_NAME.WATCH_LATER_BTN,
      CLASS_NAME.WATCHED_BTN,
      CLASS_NAME.VIDEO_SEARCH_BTN,
    ];

    const selectedMenu = menuNames.find(name => target.classList.contains(name));

    this.getMatchedAction(selectedMenu)();
  }

  getMatchedAction(selectedMenu) {
    const menuAction = {
      [CLASS_NAME.WATCH_LATER_BTN]: () => {
        console.log("볼 영상");
      },
      [CLASS_NAME.WATCHED_BTN]: () => {
        console.log("본 영상");
      },
      [CLASS_NAME.VIDEO_SEARCH_BTN]: this.props.openModal,
    };

    return menuAction[selectedMenu];
  }
}
export default MenuSection;
