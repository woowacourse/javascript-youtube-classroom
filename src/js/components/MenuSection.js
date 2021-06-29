import { $ } from "../utils/dom.js";
import { CLASS_NAME, MENU } from "../utils/constants.js";

class MenuSection {
  constructor(props) {
    this.props = props;
    this._selectDOM();
    this._bindEvent();
  }

  _initState() {
    this.clickedMenu = MENU.WATCH_LATER;
  }

  setState({ clickedMenu }) {
    this.clickedMenu = clickedMenu ?? this.clickedMenu;

    this._render();
  }

  _selectDOM() {
    this.$target = $(`.${CLASS_NAME.MENU_SECTION}`);
    this.$watchLaterBtn = $(`.${CLASS_NAME.WATCH_LATER_BTN}`);
    this.$watchedBtn = $(`.${CLASS_NAME.WATCHED_BTN}`);
    this.$likedBtn = $(`.${CLASS_NAME.LIKED_BTN}`);
    this.$videoSearchBtn = $(`.${CLASS_NAME.VIDEO_SEARCH_BTN}`);
  }

  _bindEvent() {
    this.$target.addEventListener("click", e => {
      if (!e.target.classList.contains(CLASS_NAME.MENU_BTN)) return;

      this._handleSelectMenu(e.target);
    });
  }

  _handleSelectMenu(target) {
    const menuNames = [
      CLASS_NAME.WATCH_LATER_BTN,
      CLASS_NAME.WATCHED_BTN,
      CLASS_NAME.LIKED_BTN,
      CLASS_NAME.VIDEO_SEARCH_BTN,
    ];

    const selectedMenu = menuNames.find(name => target.classList.contains(name));

    this._changeMenuBtnColor(target);
    this._getMatchedAction(selectedMenu)();
  }

  _changeMenuBtnColor(target) {
    [this.$watchLaterBtn, this.$watchedBtn].forEach($btn => $btn.classList.remove("bg-cyan-100"));

    if (!target.classList.contains(CLASS_NAME.VIDEO_SEARCH_BTN)) {
      target.classList.add("bg-cyan-100");
    }
  }

  _getMatchedAction(selectedMenu) {
    const menuAction = {
      [CLASS_NAME.WATCH_LATER_BTN]: () => {
        this.props.changeMenu(MENU.WATCH_LATER);
      },
      [CLASS_NAME.WATCHED_BTN]: () => {
        this.props.changeMenu(MENU.WATCHED);
      },
      [CLASS_NAME.LIKED_BTN]: () => {
        this.props.changeMenu(MENU.LIKED);
      },
      [CLASS_NAME.VIDEO_SEARCH_BTN]: () => {
        this.props.openModal();
      },
    };

    return menuAction[selectedMenu] || menuAction[MENU.WATCH_LATER];
  }

  _render() {
    const mappingMenu = {
      [MENU.WATCH_LATER]: this.$watchLaterBtn,
      [MENU.WATCHED]: this.$watchedBtn,
      [MENU.LIKED]: this.$likedBtn,
    };

    [this.$watchLaterBtn, this.$watchedBtn, this.$likedBtn].forEach($btn =>
      $btn.classList.remove("bg-cyan-100"),
    );
    mappingMenu[this.clickedMenu]?.classList.add("bg-cyan-100");
  }
}

export default MenuSection;
