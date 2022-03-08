class MainPage {
  constructor() {
    this.$searchModalButton = document.querySelector("#search-modal-button");
    this.$modalContainer = document.querySelector(".modal-container");
    this.$dimmer = document.querySelector(".dimmer");
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    this.$searchModalButton.addEventListener(
      "click",
      this.toggleModalContainerView.bind(this)
    );
    this.$dimmer.addEventListener(
      "click",
      this.toggleModalContainerView.bind(this)
    );
  }

  toggleModalContainerView() {
    this.$modalContainer.classList.toggle("hide");
  }
}

export default MainPage;
