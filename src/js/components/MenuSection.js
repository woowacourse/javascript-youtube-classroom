import { $ } from "../utils/dom.js";

class MenuSection {
  constructor(props) {
    this.props = props;
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$target = $(".menu-section");
    this.$watchLaterBtn = $(".menu-section__watch-later-btn");
    this.$watchedBtn = $(".menu-section__watched-btn");
    this.$videoSearchBtn = $(".menu-section__video-search-btn");
  }

  bindEvent() {
    this.$target.addEventListener("click", this.handleSelectMenu.bind(this));
  }

  handleSelectMenu({ target }) {
    const menuNames = [
      "menu-section__watch-later-btn",
      "menu-section__watched-btn",
      "menu-section__video-search-btn",
    ];

    const selectedMenu = menuNames.find(name => target.classList.contains(name));

    this.getMatchedAction(selectedMenu)();
  }

  getMatchedAction(selectedMenu) {
    const menuAction = {
      ["menu-section__watch-later-btn"]: () => {
        console.log("볼 영상");
      },
      ["menu-section__watched-btn"]: () => {
        console.log("본 영상");
      },
      ["menu-section__video-search-btn"]: this.props.openModal,
    };

    return menuAction[selectedMenu];
  }
}
export default MenuSection;
