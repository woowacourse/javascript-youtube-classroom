import VideoSearchModal from './videoSearchModal/videoSearchModal.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.states = {
      searchedVideos: [],
    };
  }

  run() {
    this.initRender();
    this.mount();
    this.selectorDOM();
    this.bindEvent();
  }

  initRender() {
    this.$target.innerHTML = `
    <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4">
        <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
        <nav class="d-flex justify-center">
          <button class="btn bg-cyan-100 mx-1">👁️ 볼 영상</button>
          <button class="btn mx-1">✅ 본 영상</button>
          <button id="search-button" class="btn mx-1">
            🔍 동영상 검색
          </button>
        </nav>
      </header>
      <main class="mt-10">
        <section class="video-wrapper">
        </section>
      </main>
    </div>
    <div class="modal">
    </div>
  </div>`;
  }

  mount() {
    this.viewSearchModal = new VideoSearchModal(
      document.querySelector('.modal')
    );
  }

  selectorDOM() {
    this.$searchButton = document.querySelector('#search-button');
  }

  bindEvent() {
    this.$searchButton.addEventListener('click', () =>
      this.viewSearchModal.onModalShow()
    );
  }
}
