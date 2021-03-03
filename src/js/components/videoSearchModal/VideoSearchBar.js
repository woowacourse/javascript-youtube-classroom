export default class VideoSearchBar {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
      <form class="d-flex">
        <input id="youtube-search-input" type="text" class="w-100 mr-2 pl-2" placeholder="검색" />
        <button id="youtube-search-button" type="button" class="btn bg-cyan-500">검색</button>
      </form>
    `;
  }
}