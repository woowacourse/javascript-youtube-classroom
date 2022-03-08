import SearchModal from "./searchModal.js";

class MainPage {
  constructor() {
    this.$searchModalButton = document.querySelector("#search-modal-button");
    this.modalComponent = new SearchModal();
    this.$dimmer = document.querySelector(".dimmer");
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    this.$searchModalButton.addEventListener(
      "click",
      this.modalComponent.toggleModalContainerView.bind(this.modalComponent)
    );
    this.$dimmer.addEventListener(
      "click",
      this.modalComponent.toggleModalContainerView.bind(this.modalComponent)
    );
  }
}

export default MainPage;
