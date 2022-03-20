export default class SavedVideoListView {
  #$emptyScreen;

  #$container;

  constructor($emptyScreen, $container) {
    this.#$emptyScreen = $emptyScreen;
    this.#$container = $container;
  }

  bindClickButtons(checkButtonHandler) {
    this.#$container.addEventListener('click', (e) => {
      if (e.target.classList[0] === 'video-item__check-button')
        checkButtonHandler(e.target.dataset.videoId);
    });
  }

  renderScreenByVideos(videos) {
    if (videos.length > 0) {
      this.render(videos);
      this.videoScreen();
    } else {
      this.emptyScreen();
    }
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
