export default class SavedVideoListView {
  #$emptyScreen;

  #$container;

  constructor($emptyScreen, $container) {
    this.#$emptyScreen = $emptyScreen;
    this.#$container = $container;
  }

  renderHTML(html) {
    this.#$container.replaceChildren();
    this.#$container.insertAdjacentHTML('beforeend', html);
  }

  emptyScreen() {
    this.#controllScreen('add');
  }

  videoScreen() {
    this.#controllScreen('remove');
  }

  #controllScreen(order) {
    this.#$emptyScreen.classList[order]('empty');
  }
}
