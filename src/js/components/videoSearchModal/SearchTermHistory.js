import { store } from '../../index.js';
import { addSearchHistory, addVideos } from '../../redux/action.js';

export default class SearchTermHistory {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.initRender();
    this.setup();
    this.selectDOM();
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  onClick(e) {
    const searchTerm = e.target.textContent;
    store.dispatch(addSearchHistory(searchTerm));
    this.$props.youtubeAPIManager.setSearchTerm(searchTerm);
    this.$props.youtubeAPIManager.requestVideos().then((items) => {
      store.dispatch(addVideos(items));
    });
  }

  render(preStates, states) {
    if (preStates.searchHistory !== states.searchHistory) {
      const frag = document.createDocumentFragment();

      states.searchHistory.forEach((history) => {
        const button = document.createElement('button');
        button.classList.add('chip');
        button.textContent = history;
        button.addEventListener('click', this.onClick.bind(this));
        frag.appendChild(button);
      });

      this.$chips.innerHTML = '';
      this.$chips.appendChild(frag);
    }
  }

  // TODO : 최초 Render시 기존에 저장된 히스토리가 있는지 확인해야함.
  initRender() {
    this.$target.innerHTML = `
      <span class="text-gray-700">최근 검색어: </span>
      <div class="chips">
      </div>
    `;
  }

  selectDOM() {
    this.$chips = this.$target.querySelector('.chips');
  }
}
