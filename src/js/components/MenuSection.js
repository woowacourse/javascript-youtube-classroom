import { $ } from "../utils/dom.js";
import { CLASS_NAME } from "../utils/constants.js";

class MenuSection {
  constructor(props) {
    this.props = props;
    this.selectDOM();
    this.bindEvent();
  }

  initState() {
    this.clickedMenu = "watch-later";
  }

  setState({ clickedMenu }) {
    this.clickedMenu = clickedMenu ?? this.clickedMenu;

    this.render();
  }

  selectDOM() {
    this.$target = $(`.${CLASS_NAME.MENU_SECTION}`);
    this.$watchLaterBtn = $(`.${CLASS_NAME.WATCH_LATER_BTN}`);
    this.$watchedBtn = $(`.${CLASS_NAME.WATCHED_BTN}`);
    this.$videoSearchBtn = $(`.${CLASS_NAME.VIDEO_SEARCH_BTN}`);
  }

  bindEvent() {
    this.$target.addEventListener("click", e => {
      if (!e.target.classList.contains("menu-btn")) return;

      this.handleSelectMenu(e.target);
    });
  }

  handleSelectMenu(target) {
    const menuNames = [
      CLASS_NAME.WATCH_LATER_BTN,
      CLASS_NAME.WATCHED_BTN,
      CLASS_NAME.VIDEO_SEARCH_BTN,
    ];

    const selectedMenu = menuNames.find(name => target.classList.contains(name));

    this.changeMenuBtnColor(target);
    this.getMatchedAction(selectedMenu)();
  }

  changeMenuBtnColor(target) {
    [this.$watchLaterBtn, this.$watchedBtn].forEach($btn => $btn.classList.remove("bg-cyan-100"));

    if (!target.classList.contains("menu-section__video-search-btn")) {
      target.classList.add("bg-cyan-100");
    }
  }

  getMatchedAction(selectedMenu) {
    const menuAction = {
      [CLASS_NAME.WATCH_LATER_BTN]: () => {
        this.props.changeMenu("watch-later");
      },
      [CLASS_NAME.WATCHED_BTN]: () => {
        this.props.changeMenu("watched");
      },
      [CLASS_NAME.VIDEO_SEARCH_BTN]: this.props.openModal,
    };

    return menuAction[selectedMenu];
  }

  render() {
    const mappingMenu = {
      ["watch-later"]: this.$watchLaterBtn,
      ["watched"]: this.$watchedBtn,
    };

    [this.$watchLaterBtn, this.$watchedBtn].forEach($btn => $btn.classList.remove("bg-cyan-100"));
    mappingMenu[this.clickedMenu].classList.add("bg-cyan-100");
  }
}

export default MenuSection;
