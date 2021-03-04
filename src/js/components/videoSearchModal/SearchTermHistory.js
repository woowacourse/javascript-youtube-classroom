import { store } from '../../index.js';

export default class SearchTermHistory {
  constructor($target) {
    this.$target = $target;
    this.initRender();
    this.setup();
    this.selectDOM();
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  render(preStates, states) {
    if (preStates.searchHistory !== states.searchHistory) {
      const template = states.searchHistory
        .map((searchTerm) => `<a class="chip">${searchTerm}</a>`)
        .join('');
      this.$chips.innerHTML = template;
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
