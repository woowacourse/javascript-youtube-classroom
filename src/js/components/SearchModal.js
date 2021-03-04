import { $ } from "../utils/dom.js";

class SearchModal {
  constructor() {
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$target = $(".search-modal");
    this.$searchInput = $(".search-modal__input");
    this.$videoWrapper = $(".search-modal__video-wrapper");
  }

  bindEvent() {
    this.$target.addEventListener("submit", e => {
      e.preventDefault();

      this.handleSearchKeyword();
    });
  }

  showLoadingAnimation() {
    const skeletonCardTemplate = `
    <div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>`;

    this.$videoWrapper.innerHTML = skeletonCardTemplate.repeat(10);
  }

  hideLoadingAnimation() {}

  handleSearchKeyword() {
    // 로딩창 보임
    this.showLoadingAnimation(); // TEST
    // 요청

    // 로딩창 제거
    // this.hideLoadingAnimation();
  }

  showModal() {
    this.$target.classList.add("open");
  }
}

export default SearchModal;
