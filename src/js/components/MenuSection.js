import { $ } from "../utils/dom.js";

class MenuSection {
  constructor(openModal) {
    this.openModal = openModal;
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

    const selectedBtn = menuNames.find(name => target.classList.contains(name));

    if (selectedBtn === "menu-section__video-search-btn") {
      this.openModal();
    }
  }
}
export default MenuSection;
