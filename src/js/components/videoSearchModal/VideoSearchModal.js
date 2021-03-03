import VideoSearchBar from './VideoSearchBar.js';
import SearchTermHistory from './SearchTermHistory.js';
import VideoSearchResult from './VideoSearchResult.js';

export default class VideoSearchModal {
  constructor($target) {
    this.$target = $target;
    this.$modalClose = document.querySelector('.modal-close');
    this.render();
    this.mount();
    this.selectDOM();
    this.bindEvent();
  }

  render() {
    this.$target.innerHTML = `
    <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🔎 유튜브 검색</h2>
        </header>
        <section id="video-search-bar">
        </section>
        <section id="search-term-history" class="mt-2">
        </section>
        <section id="video-search-result">
        </section>
      </div>
    </div>`;
  }

  mount() {
    this.videoSearchBar = new VideoSearchBar(document.querySelector('#video-search-bar'));
    this.searchTermHistory = new SearchTermHistory(document.querySelector('#search-term-history'));
    this.videoSearchResult = new VideoSearchResult(document.querySelector('#video-search-result'));
  }

  selectDOM() {
    this.$modalClose = document.querySelector('.modal-close');
  }

  bindEvent() {
    this.$modalClose.addEventListener('click', this.onModalClose.bind(this))
  }

  onModalShow() {
    this.$target.classList.add("open");
  };

  onModalClose() {
    this.$target.classList.remove("open");
  };
}